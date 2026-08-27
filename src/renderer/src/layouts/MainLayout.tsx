import { NavLink, Outlet } from 'react-router-dom'
import { useAppStore } from '../store'
import { useVersions } from '../hooks'

/** 主布局：头部导航 + 内容区 + 底部信息栏 */
const MainLayout = (): React.JSX.Element => {
  const appName = useAppStore((s) => s.appName)
  const versions = useVersions()

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">{appName}</h1>
        <nav className="app-nav">
          <NavLink to="/" end>
            首页
          </NavLink>
          <NavLink to="/about">关于</NavLink>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        Electron {versions.electron} · Chromium {versions.chrome} · Node {versions.node}
      </footer>
    </div>
  )
}

export default MainLayout
