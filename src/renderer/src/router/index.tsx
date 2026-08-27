import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import WorkLayout from '../layouts/WorkLayout'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Engine from '../pages/Engine'
import About from '../pages/About'

/** 应用路由入口
 *  注意：Electron 生产环境通过 file:// 加载页面，必须使用 HashRouter
 */
const AppRouter = (): React.JSX.Element => (
  <HashRouter>
    <Routes>
      {/* Work 模式布局（侧边栏 + 主内容） */}
      <Route element={<WorkLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/engine" element={<Engine />} />
      </Route>

      {/* 传统顶部导航布局 */}
      <Route element={<MainLayout />}>
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>
)

export default AppRouter
