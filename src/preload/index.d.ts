import { ElectronAPI } from '@electron-toolkit/preload'

/** 主进程暴露给渲染进程的自定义 API */
export interface AppApi {
  ping: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: AppApi
  }
}
