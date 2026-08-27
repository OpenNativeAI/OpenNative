import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './WorkLayout.css'

/** Work 布局：左侧边栏 + 右侧主内容区 */
const WorkLayout = (): React.JSX.Element => {
  return (
    <div className="work-layout">
      <Sidebar />
      <main className="work-main">
        <Outlet />
      </main>
    </div>
  )
}

export default WorkLayout
