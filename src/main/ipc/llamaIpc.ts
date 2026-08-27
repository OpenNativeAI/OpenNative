import { ipcMain, dialog } from 'electron'
import * as llama from '../services/llamaCppService'

export function registerLlamaIpc() {
  // 选择模型文件
  ipcMain.handle('llama:pick-model', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'GGUF 模型文件', extensions: ['gguf'] }],
    })
    if (result.canceled || result.filePaths.length === 0) return null
    return result.filePaths[0]
  })

  // 读取模型信息
  ipcMain.handle('llama:read-model-info', async (_event, modelPath: string) => {
    try {
      const info = await llama.readModelInfo(modelPath)
      return { success: true, info }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })

  // 加载模型
  ipcMain.handle(
    'llama:load-model',
    async (
      _event,
      modelPath: string,
      params?: Partial<llama.ModelParams>,
      systemPrompt?: string
    ) => {
      try {
        await llama.loadModel(modelPath, params, systemPrompt || '')
        return { success: true }
      } catch (err: any) {
        return { success: false, error: err.message }
      }
    }
  )

  // 卸载模型
  ipcMain.handle('llama:unload-model', async () => {
    try {
      await llama.unloadModel()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })

  // 聊天
  ipcMain.handle(
    'llama:chat',
    async (
      event,
      requestId: string,
      message: string,
      params?: Partial<llama.GenerationParams>
    ) => {
      try {
        const result = await llama.chat(message, params, (token) => {
          event.sender.send(`llama:chat-token:${requestId}`, token)
        })
        return { success: true, content: result }
      } catch (err: any) {
        return { success: false, error: err.message }
      }
    }
  )

  // 中止生成
  ipcMain.handle('llama:abort', () => {
    llama.abortGeneration()
    return { success: true }
  })

  // 清空聊天历史
  ipcMain.handle('llama:reset-history', () => {
    llama.resetChatHistory()
    return { success: true }
  })

  // 设置系统提示词
  ipcMain.handle('llama:set-system-prompt', async (_event, systemPrompt: string) => {
    try {
      await llama.setSystemPrompt(systemPrompt)
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })

  // 获取状态
  ipcMain.handle('llama:status', () => {
    return llama.getStatus()
  })
}
