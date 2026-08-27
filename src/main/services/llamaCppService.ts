import * as fs from 'fs'
import * as path from 'path'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
  id?: string
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
  modelPath?: string
}

export interface GenerationParams {
  temperature: number
  topK: number
  topP: number
  minP: number
  seed: number
  maxTokens: number
  repeatPenalty: number
  repeatLastTokens: number
  frequencyPenalty: number
  presencePenalty: number
  dryRepeatPenalty: number
  dryRepeatBase: number
  dryRepeatAllowedLength: number
}

export interface ModelParams {
  contextSize: number
  gpuLayers: number
  batchSize: number
  threads: number
  chatWrapper: 'auto' | string
  flashAttention: boolean
}

export const defaultGenerationParams: GenerationParams = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  minP: 0.05,
  seed: 0,
  maxTokens: 2048,
  repeatPenalty: 1.1,
  repeatLastTokens: 64,
  frequencyPenalty: 0,
  presencePenalty: 0,
  dryRepeatPenalty: 0,
  dryRepeatBase: 1.75,
  dryRepeatAllowedLength: 2,
}

export const defaultModelParams: ModelParams = {
  contextSize: 4096,
  gpuLayers: 99,
  batchSize: 512,
  threads: 0,
  chatWrapper: 'auto',
  flashAttention: true,
}

// node-llama-cpp 是 ESM 模块，需要动态 import
type Llama = any
type LlamaModel = any
type LlamaContext = any
type LlamaChatSession = any

let llamaInstance: Llama | null = null
let currentModel: LlamaModel | null = null
let currentContext: LlamaContext | null = null
let currentSession: LlamaChatSession | null = null
let currentModelPath: string = ''
let currentAbortController: AbortController | null = null
let currentSystemPrompt: string = ''
let currentChatWrapper: string = 'auto'

async function getLlamaModule() {
  return import('node-llama-cpp')
}

async function getLlama(): Promise<any> {
  if (!llamaInstance) {
    const { getLlama } = await getLlamaModule()
    llamaInstance = await getLlama()
    console.log('[Llama] 初始化完成，设备:', llamaInstance.gpu ? 'GPU (Metal)' : 'CPU')
  }
  return llamaInstance
}

/**
 * 读取模型文件信息
 */
export async function readModelInfo(modelPath: string) {
  const { readGgufFileInfo } = await getLlamaModule()
  const info: any = await readGgufFileInfo(modelPath)
  const meta = info.metadata || {}
  const general = meta.general || {}
  const llm = meta.llm || {}
  return {
    architecture: llm.architecture || llm.architecture_type,
    contextLength: llm.context_length || llm.contextLength,
    name: general.name || general.basename,
    size: general.size || general.parameter_count,
    quantVersion: general.quantization_version || general.quantizationVersion,
    fileSize: fs.statSync(modelPath).size,
    fileName: path.basename(modelPath),
  }
}

function resolveChatWrapper(wrapper: string, mod: any): any {
  if (wrapper === 'auto') return 'auto'
  const map: Record<string, string> = {
    qwen: 'QwenChatWrapper',
    llama3: 'Llama3ChatWrapper',
    llama3_1: 'Llama3_1ChatWrapper',
    llama3_2: 'Llama3_2LightweightChatWrapper',
    llama2: 'Llama2ChatWrapper',
    mistral: 'MistralChatWrapper',
    chatml: 'ChatMLChatWrapper',
    deepseek: 'DeepSeekChatWrapper',
    gemma: 'GemmaChatWrapper',
    gemma4: 'Gemma4ChatWrapper',
    falcon: 'FalconChatWrapper',
    alpaca: 'AlpacaChatWrapper',
    functionary: 'FunctionaryChatWrapper',
    general: 'GeneralChatWrapper',
  }
  const cls = map[wrapper.toLowerCase()]
  if (cls && mod[cls]) {
    return new mod[cls]()
  }
  return 'auto'
}

/**
 * 创建新的聊天会话
 */
async function createSession(systemPrompt?: string) {
  if (!currentContext) return null

  const mod = await getLlamaModule()
  const { LlamaChatSession } = mod

  const chatWrapper = resolveChatWrapper(currentChatWrapper, mod)
  const session = new LlamaChatSession({
    contextSequence: currentContext.getSequence(),
    chatWrapper: chatWrapper || 'auto',
    systemPrompt: systemPrompt || undefined,
  })

  return session
}

/**
 * 加载模型
 */
export async function loadModel(
  modelPath: string,
  params: Partial<ModelParams> = {},
  systemPrompt: string = ''
): Promise<void> {
  if (currentModel && currentModelPath === modelPath) {
    // 同一个模型，只更新系统提示词（如果变了）
    if (systemPrompt !== currentSystemPrompt) {
      currentSystemPrompt = systemPrompt
      currentSession = await createSession(systemPrompt)
      console.log('[Llama] 系统提示词已更新')
    }
    return
  }

  // 卸载旧模型
  if (currentSession || currentContext || currentModel) {
    await unloadModel()
  }

  if (!fs.existsSync(modelPath)) {
    throw new Error(`模型文件不存在: ${modelPath}`)
  }

  const merged: ModelParams = { ...defaultModelParams, ...params }
  currentChatWrapper = merged.chatWrapper
  currentSystemPrompt = systemPrompt

  const llama = await getLlama()

  console.log('[Llama] 加载模型:', path.basename(modelPath))
  currentModel = await llama.loadModel({
    modelPath,
    gpuLayers: merged.gpuLayers,
  })
  currentModelPath = modelPath

  console.log('[Llama] 创建上下文，contextSize:', merged.contextSize)
  currentContext = await currentModel.createContext({
    contextSize: merged.contextSize,
    batchSize: merged.batchSize,
    threads: merged.threads === 0 ? undefined : merged.threads,
    flashAttention: merged.flashAttention ? 'auto' : false,
  })

  console.log('[Llama] 创建会话')
  currentSession = await createSession(systemPrompt)

  console.log('[Llama] 模型就绪')
}

/**
 * 卸载模型
 */
export async function unloadModel(): Promise<void> {
  if (currentAbortController) {
    currentAbortController.abort()
    currentAbortController = null
  }
  // 注意：不要手动 dispose session，context dispose 时会自动处理
  // 手动 dispose session 会导致 sequence 被释放，后续无法复用
  currentSession = null
  if (currentContext) {
    await currentContext.dispose()
    currentContext = null
  }
  if (currentModel) {
    await currentModel.dispose()
    currentModel = null
  }
  currentModelPath = ''
  currentSystemPrompt = ''
  console.log('[Llama] 模型已卸载')
}

/**
 * 生成聊天回复
 */
export async function chat(
  userMessage: string,
  params: Partial<GenerationParams> = {},
  onToken?: (token: string) => void
): Promise<string> {
  if (!currentSession) {
    throw new Error('模型未加载')
  }

  const merged: GenerationParams = { ...defaultGenerationParams, ...params }
  const controller = new AbortController()
  currentAbortController = controller

  console.log('[Llama] 生成回复，消息长度:', userMessage.length)
  const startTime = Date.now()

  const result = await currentSession.prompt(userMessage, {
    temperature: merged.temperature,
    topK: merged.topK,
    topP: merged.topP,
    minP: merged.minP,
    seed: merged.seed || undefined,
    maxTokens: merged.maxTokens,
    signal: controller.signal,
    stopOnAbortSignal: true,
    onTextChunk: onToken,
    repeatPenalty:
      merged.repeatPenalty > 1
        ? {
            penalty: merged.repeatPenalty,
            lastTokens: merged.repeatLastTokens,
            frequencyPenalty: merged.frequencyPenalty,
            presencePenalty: merged.presencePenalty,
          }
        : false,
    dryRepeatPenalty:
      merged.dryRepeatPenalty > 0
        ? {
            strength: merged.dryRepeatPenalty,
            base: merged.dryRepeatBase,
            allowedLength: merged.dryRepeatAllowedLength,
            lastTokens: null,
          }
        : undefined,
  })

  const elapsed = Date.now() - startTime
  console.log('[Llama] 回复完成，耗时:', elapsed + 'ms', '长度:', result.length)

  currentAbortController = null
  return result
}

/**
 * 中止生成
 */
export function abortGeneration(): void {
  if (currentAbortController) {
    currentAbortController.abort()
    currentAbortController = null
    console.log('[Llama] 生成已中止')
  }
}

/**
 * 清空聊天历史
 */
export function resetChatHistory(): void {
  if (currentSession) {
    currentSession.resetChatHistory()
    console.log('[Llama] 聊天历史已清空')
  }
}

/**
 * 设置系统提示词
 */
export async function setSystemPrompt(systemPrompt: string): Promise<void> {
  if (!currentContext) return

  currentSystemPrompt = systemPrompt
  // 不 dispose 旧 session，直接替换引用，让 GC 处理
  // 手动 dispose 会释放底层 sequence，导致 "Object is disposed" 错误
  currentSession = await createSession(systemPrompt)

  console.log('[Llama] 系统提示词已更新')
}

/**
 * 获取当前状态
 */
export function getStatus() {
  return {
    modelLoaded: !!currentModel,
    modelPath: currentModelPath,
    contextSize: currentContext?.contextSize ?? 0,
    isGenerating: !!currentAbortController,
    gpu: llamaInstance?.gpu ? 'metal' : 'cpu',
  }
}
