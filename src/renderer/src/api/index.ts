/** 渲染进程访问主进程能力的统一入口（IPC 封装层）
 *  所有与主进程的通信都应通过这里，避免在组件中裸用 window.*
 */

export const ipc = {
  /** 测试主进程连通性 */
  ping: (): void => window.api.ping()
}

export default ipc
