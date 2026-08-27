/** 通用工具函数 */

/** 判断当前是否为开发环境 */
export const isDev = (): boolean => import.meta.env.DEV

/** 格式化版本号，如 39.2.6 -> v39.2.6 */
export const formatVersion = (version: string): string => `v${version}`
