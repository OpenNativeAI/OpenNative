import { create } from 'zustand'

interface AppState {
  /** 应用名称 */
  appName: string
  setAppName: (name: string) => void
}

/** 应用级全局状态 */
export const useAppStore = create<AppState>()((set) => ({
  appName: 'OpenNative',
  setAppName: (appName) => set({ appName })
}))
