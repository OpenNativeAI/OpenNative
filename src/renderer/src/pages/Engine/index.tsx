import { useState, useRef, useEffect } from 'react'
import './Engine.css'
import { renderMarkdown } from '../../utils/markdown'
import {
  Plus,
  ArrowUp,
  Trash2,
  Settings,
  HardDrive,
  Zap,
  Loader2,
  StopCircle,
  MessageSquare,
  FolderOpen,
  X,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Conversation {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

interface ModelInfo {
  architecture?: string
  contextLength?: number
  name?: string
  size?: number
  fileSize?: number
  fileName?: string
}

interface GenerationParams {
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

interface ModelParams {
  contextSize: number
  gpuLayers: number
  batchSize: number
  threads: number
  chatWrapper: string
  flashAttention: boolean
}

const defaultGenParams: GenerationParams = {
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

const defaultModelParams: ModelParams = {
  contextSize: 4096,
  gpuLayers: 99,
  batchSize: 512,
  threads: 0,
  chatWrapper: 'auto',
  flashAttention: true,
}

declare global {
  interface Window {
    llama?: any
  }
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB'
}

export default function Engine() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConvId, setActiveConvId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [modelPath, setModelPath] = useState('')
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [loadingModel, setLoadingModel] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a helpful, respectful and honest assistant. Always answer as helpfully as possible.'
  )
  const [genParams, setGenParams] = useState<GenerationParams>(defaultGenParams)
  const [modelParams, setModelParams] = useState<ModelParams>(defaultModelParams)
  const [error, setError] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 自动调整 textarea 高度
  useEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
    }
  }, [input])

  // 创建默认会话
  useEffect(() => {
    const convId = genId()
    const conv: Conversation = {
      id: convId,
      title: '新对话',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setConversations([conv])
    setActiveConvId(convId)
  }, [])

  // 检查状态
  useEffect(() => {
    checkStatus()
  }, [])

  async function checkStatus() {
    if (!window.llama) return
    try {
      const status = await window.llama.getStatus()
      setModelLoaded(status.modelLoaded)
    } catch (e) {
      // ignore
    }
  }

  async function handlePickModel() {
    if (!window.llama) return
    const path = await window.llama.pickModel()
    if (!path) return
    setModelPath(path)
    setModelLoaded(false)
    setError('')

    // 读取模型信息
    try {
      const res = await window.llama.readModelInfo(path)
      if (res.success && res.info) {
        setModelInfo(res.info)
      }
    } catch (e) {
      // ignore
    }
  }

  async function handleLoadModel() {
    if (!modelPath || !window.llama) return
    setLoadingModel(true)
    setError('')
    try {
      const res = await window.llama.loadModel(modelPath, modelParams, systemPrompt)
      if (res.success) {
        setModelLoaded(true)
      } else {
        setError(res.error || '加载模型失败')
      }
    } catch (e: any) {
      setError(e.message || '加载模型失败')
    } finally {
      setLoadingModel(false)
      checkStatus()
    }
  }

  async function handleUnloadModel() {
    if (!window.llama) return
    await window.llama.unloadModel()
    setModelLoaded(false)
    checkStatus()
  }

  function newConversation() {
    const id = genId()
    const conv: Conversation = {
      id,
      title: '新对话',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setConversations((prev) => [conv, ...prev])
    setActiveConvId(id)
    setMessages([])
    if (window.llama && modelLoaded) {
      window.llama.resetHistory()
    }
  }

  async function handleSend() {
    if (!input.trim() || isGenerating || !modelLoaded || !window.llama) return

    const userMsg: ChatMessage = {
      id: genId(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    }
    const assistantId = genId()
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setIsGenerating(true)

    const requestId = genId()
    const cleanup = window.llama.onChatToken(requestId, (token: string) => {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== assistantId) return m
          const newContent = m.content + token
          // 去掉开头的空白字符
          const trimmed = m.content === '' ? newContent.replace(/^\s+/, '') : newContent
          return { ...m, content: trimmed }
        })
      )
    })

    try {
      const res = await window.llama.chat(requestId, userMsg.content, genParams)
      if (!res.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: `错误: ${res.error}` } : m
          )
        )
      } else if (res.content && res.content !== '') {
        // 如果流式返回的内容和最终结果不一致，以最终结果为准
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: res.content!.trim() } : m
          )
        )
      }
    } catch (e: any) {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: `错误: ${e.message}` } : m))
      )
    } finally {
      cleanup()
      setIsGenerating(false)
    }
  }

  async function handleStop() {
    if (!window.llama) return
    await window.llama.abort()
    setIsGenerating(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function updateGenParam<K extends keyof GenerationParams>(key: K, value: GenerationParams[K]) {
    setGenParams((prev) => ({ ...prev, [key]: value }))
  }

  function updateModelParam<K extends keyof ModelParams>(key: K, value: ModelParams[K]) {
    setModelParams((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="engine-container">
      {/* 聊天区域 */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-left">
            <h2 className="chat-title">
              {conversations.find((c) => c.id === activeConvId)?.title || '新对话'}
            </h2>
            {modelInfo && (
              <div className="chat-model-tag">
                <Zap size={12} />
                {modelInfo.name || modelInfo.fileName}
                {modelInfo.contextLength && ` · ${modelInfo.contextLength} ctx`}
              </div>
            )}
          </div>
          <div className="chat-header-right">
            {modelLoaded && (
              <button className="header-btn" onClick={newConversation} title="新对话">
                <Plus size={16} />
              </button>
            )}
            <button
              className="header-btn"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              title="设置"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="messages-container">
          {messages.length === 0 && error && (
            <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
              <div className="error-text">{error}</div>
            </div>
          )}

          {messages.map((msg) => {
            const isPlaceholder =
              !msg.content && msg.role === 'assistant' && isGenerating
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="message user">
                  <div className="message-content">{msg.content}</div>
                </div>
              )
            }
            const html = msg.content ? renderMarkdown(msg.content) : ''
            return (
              <div key={msg.id} className="message assistant">
                {isPlaceholder ? (
                  <div className="message-content">...</div>
                ) : (
                  <div
                    className="message-content markdown-body"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                modelLoaded ? '输入消息，Enter 发送，Shift+Enter 换行' : '请先加载模型'
              }
              disabled={!modelLoaded || isGenerating}
              rows={1}
            />
            <div className="input-toolbar">
              <div className="input-toolbar-left">
                <button className="toolbar-icon-btn" title="添加">
                  <Plus size={20} />
                </button>
              </div>
              <div className="input-toolbar-right">
                {isGenerating && (
                  <Loader2 size={18} className="spin generating-spinner" />
                )}
                {modelInfo && (
                  <button
                    className="model-selector-btn"
                    onClick={() => setRightPanelOpen(true)}
                    title="模型设置"
                  >
                    <span className="model-selector-name">
                      {modelInfo.name || modelInfo.fileName || '未选择模型'}
                    </span>
                    <ChevronDown size={14} />
                  </button>
                )}
                {isGenerating ? (
                  <button className="send-btn stop" onClick={handleStop} title="停止">
                    <StopCircle size={18} />
                  </button>
                ) : (
                  <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!modelLoaded || !input.trim()}
                    title="发送"
                  >
                    <ArrowUp size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧参数面板 */}
      {rightPanelOpen && (
        <div className="right-sidebar">
          <div className="panel-header">
            <span className="panel-title">设置</span>
            <button className="icon-btn" onClick={() => setRightPanelOpen(false)} title="收起">
              <X size={16} />
            </button>
          </div>

          <div className="panel-content">
            {/* 模型设置 */}
            <div className="setting-section">
              <div className="section-title">
                <HardDrive size={16} />
                模型
              </div>

              <div className="setting-row">
                <label>模型文件</label>
                <div className="file-picker-row">
                  <div className="file-path">
                    {modelInfo?.fileName || modelPath.split('/').pop() || '未选择'}
                  </div>
                  <button className="btn-sm" onClick={handlePickModel}>
                    <FolderOpen size={14} />
                    选择
                  </button>
                </div>
                {modelInfo && (
                  <div className="model-meta">
                    {modelInfo.architecture && <span>{modelInfo.architecture}</span>}
                    {modelInfo.contextLength && <span>{modelInfo.contextLength} ctx</span>}
                    {modelInfo.fileSize && <span>{formatBytes(modelInfo.fileSize)}</span>}
                  </div>
                )}
              </div>

              <div className="setting-row">
                <label>
                  上下文大小 <span className="value">{modelParams.contextSize}</span>
                </label>
                <input
                  type="range"
                  min={512}
                  max={32768}
                  step={512}
                  value={modelParams.contextSize}
                  onChange={(e) => updateModelParam('contextSize', Number(e.target.value))}
                  disabled={modelLoaded}
                />
              </div>

              <div className="setting-row">
                <label>
                  GPU 层数 <span className="value">{modelParams.gpuLayers}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={modelParams.gpuLayers}
                  onChange={(e) => updateModelParam('gpuLayers', Number(e.target.value))}
                  disabled={modelLoaded}
                />
              </div>

              <div className="setting-row">
                <label>
                  Batch Size <span className="value">{modelParams.batchSize}</span>
                </label>
                <input
                  type="range"
                  min={32}
                  max={2048}
                  step={32}
                  value={modelParams.batchSize}
                  onChange={(e) => updateModelParam('batchSize', Number(e.target.value))}
                  disabled={modelLoaded}
                />
              </div>

              <div className="setting-row">
                <label>
                  线程数 <span className="value">{modelParams.threads === 0 ? '自动' : modelParams.threads}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={16}
                  step={1}
                  value={modelParams.threads}
                  onChange={(e) => updateModelParam('threads', Number(e.target.value))}
                  disabled={modelLoaded}
                />
              </div>

              <div className="setting-row">
                <label>聊天模板</label>
                <select
                  value={modelParams.chatWrapper}
                  onChange={(e) => updateModelParam('chatWrapper', e.target.value)}
                  disabled={modelLoaded}
                >
                  <option value="auto">自动检测</option>
                  <option value="qwen">Qwen / 通义千问</option>
                  <option value="llama3">Llama 3</option>
                  <option value="llama3_1">Llama 3.1</option>
                  <option value="llama3_2">Llama 3.2</option>
                  <option value="llama2">Llama 2</option>
                  <option value="mistral">Mistral</option>
                  <option value="chatml">ChatML</option>
                  <option value="deepseek">DeepSeek</option>
                  <option value="gemma">Gemma</option>
                  <option value="gemma4">Gemma 4</option>
                  <option value="falcon">Falcon</option>
                  <option value="alpaca">Alpaca</option>
                  <option value="general">通用</option>
                </select>
              </div>

              <div className="setting-row checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    checked={modelParams.flashAttention ? true : false}
                    onChange={(e) => updateModelParam('flashAttention', e.target.checked)}
                    disabled={modelLoaded}
                  />
                  Flash Attention
                </label>
              </div>

              {modelLoaded ? (
                <button className="secondary-btn full" onClick={handleUnloadModel}>
                  <Trash2 size={14} />
                  卸载模型
                </button>
              ) : (
                <button
                  className="primary-btn full"
                  onClick={handleLoadModel}
                  disabled={!modelPath || loadingModel}
                >
                  {loadingModel ? (
                    <>
                      <Loader2 size={14} className="spin" />
                      加载中...
                    </>
                  ) : (
                    <>
                      <Zap size={14} />
                      加载模型
                    </>
                  )}
                </button>
              )}

              {modelLoaded && (
                <div className="hint-text">修改模型参数需先卸载模型</div>
              )}
            </div>

            {/* 系统提示词 */}
            <div className="setting-section">
              <div className="section-title">
                <MessageSquare size={16} />
                系统提示词
              </div>
              <textarea
                className="system-prompt-textarea"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                onBlur={() => {
                  if (modelLoaded && window.llama && systemPrompt.trim()) {
                    window.llama.resetHistory()
                    window.llama.setSystemPrompt(systemPrompt)
                  }
                }}
                placeholder="你是一个有用的助手..."
                rows={4}
              />
              <button
                className="btn-sm full"
                onClick={() => {
                  if (modelLoaded && window.llama) {
                    window.llama.resetHistory()
                    window.llama.setSystemPrompt(systemPrompt)
                  }
                }}
                disabled={!modelLoaded}
              >
                <RotateCcw size={12} />
                应用并重置对话
              </button>
            </div>

            {/* 生成参数 */}
            <div className="setting-section">
              <div className="section-title">
                <Settings size={16} />
                生成参数
              </div>

              <div className="setting-row">
                <label>
                  温度 <span className="value">{genParams.temperature.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.05}
                  value={genParams.temperature}
                  onChange={(e) => updateGenParam('temperature', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  Top-P <span className="value">{genParams.topP.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={genParams.topP}
                  onChange={(e) => updateGenParam('topP', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  Top-K <span className="value">{genParams.topK}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={genParams.topK}
                  onChange={(e) => updateGenParam('topK', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  Min-P <span className="value">{genParams.minP.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.01}
                  value={genParams.minP}
                  onChange={(e) => updateGenParam('minP', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  最大生成长度 <span className="value">{genParams.maxTokens}</span>
                </label>
                <input
                  type="range"
                  min={128}
                  max={8192}
                  step={128}
                  value={genParams.maxTokens}
                  onChange={(e) => updateGenParam('maxTokens', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  随机种子 <span className="value">{genParams.seed || '随机'}</span>
                </label>
                <input
                  type="number"
                  value={genParams.seed}
                  onChange={(e) => updateGenParam('seed', Number(e.target.value))}
                  min={0}
                />
              </div>

              <div className="setting-row">
                <label>
                  重复惩罚 <span className="value">{genParams.repeatPenalty.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={2}
                  step={0.05}
                  value={genParams.repeatPenalty}
                  onChange={(e) => updateGenParam('repeatPenalty', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  重复惩罚窗口 <span className="value">{genParams.repeatLastTokens}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={256}
                  step={8}
                  value={genParams.repeatLastTokens}
                  onChange={(e) => updateGenParam('repeatLastTokens', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  频率惩罚 <span className="value">{genParams.frequencyPenalty.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.05}
                  value={genParams.frequencyPenalty}
                  onChange={(e) => updateGenParam('frequencyPenalty', Number(e.target.value))}
                />
              </div>

              <div className="setting-row">
                <label>
                  存在惩罚 <span className="value">{genParams.presencePenalty.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.05}
                  value={genParams.presencePenalty}
                  onChange={(e) => updateGenParam('presencePenalty', Number(e.target.value))}
                />
              </div>

              <div className="setting-subsection">
                <div className="subsection-title">DRY 重复惩罚</div>

                <div className="setting-row">
                  <label>
                    强度 <span className="value">{genParams.dryRepeatPenalty.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.05}
                    value={genParams.dryRepeatPenalty}
                    onChange={(e) => updateGenParam('dryRepeatPenalty', Number(e.target.value))}
                  />
                </div>

                <div className="setting-row">
                  <label>
                    基数 <span className="value">{genParams.dryRepeatBase.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.05}
                    value={genParams.dryRepeatBase}
                    onChange={(e) => updateGenParam('dryRepeatBase', Number(e.target.value))}
                  />
                </div>

                <div className="setting-row">
                  <label>
                    允许长度 <span className="value">{genParams.dryRepeatAllowedLength}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={genParams.dryRepeatAllowedLength}
                    onChange={(e) =>
                      updateGenParam('dryRepeatAllowedLength', Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <button
                className="btn-sm full"
                onClick={() => setGenParams(defaultGenParams)}
              >
                <RotateCcw size={12} />
                恢复默认参数
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
