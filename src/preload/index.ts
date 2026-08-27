import { contextBridge, ipcRenderer } from 'electron'

export interface LlamaApi {
  pickModel: () => Promise<string | null>
  readModelInfo: (modelPath: string) => Promise<{ success: boolean; info?: any; error?: string }>
  loadModel: (
    modelPath: string,
    params?: any,
    systemPrompt?: string
  ) => Promise<{ success: boolean; error?: string }>
  unloadModel: () => Promise<{ success: boolean; error?: string }>
  chat: (
    requestId: string,
    message: string,
    params?: any
  ) => Promise<{ success: boolean; content?: string; error?: string }>
  onChatToken: (requestId: string, callback: (token: string) => void) => () => void
  abort: () => Promise<{ success: boolean }>
  resetHistory: () => Promise<{ success: boolean }>
  setSystemPrompt: (prompt: string) => Promise<{ success: boolean; error?: string }>
  getStatus: () => Promise<any>
}

const llamaApi: LlamaApi = {
  pickModel: () => ipcRenderer.invoke('llama:pick-model'),
  readModelInfo: (modelPath) => ipcRenderer.invoke('llama:read-model-info', modelPath),
  loadModel: (modelPath, params, systemPrompt) =>
    ipcRenderer.invoke('llama:load-model', modelPath, params, systemPrompt),
  unloadModel: () => ipcRenderer.invoke('llama:unload-model'),
  chat: (requestId, message, params) =>
    ipcRenderer.invoke('llama:chat', requestId, message, params),
  onChatToken: (requestId, callback) => {
    const handler = (_event: any, token: string) => callback(token)
    ipcRenderer.on(`llama:chat-token:${requestId}`, handler)
    return () => {
      ipcRenderer.removeListener(`llama:chat-token:${requestId}`, handler)
    }
  },
  abort: () => ipcRenderer.invoke('llama:abort'),
  resetHistory: () => ipcRenderer.invoke('llama:reset-history'),
  setSystemPrompt: (prompt) => ipcRenderer.invoke('llama:set-system-prompt', prompt),
  getStatus: () => ipcRenderer.invoke('llama:status'),
}

contextBridge.exposeInMainWorld('llama', llamaApi)
