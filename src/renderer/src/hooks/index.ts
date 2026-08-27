import { useState } from 'react'
import type { AppVersions } from '../types'

/** 读取运行时版本信息（Electron / Chromium / Node） */
export function useVersions(): AppVersions {
  const [versions] = useState<AppVersions>(() => {
    const versions = window.electron.process.versions
    return {
      electron: versions.electron ?? '',
      chrome: versions.chrome ?? '',
      node: versions.node ?? ''
    }
  })
  return versions
}
