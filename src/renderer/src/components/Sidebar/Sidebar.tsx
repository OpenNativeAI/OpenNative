import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import {
  Boxes,
  Clock,
  Layers,
  Settings,
  MessageSquare,
  LayoutGrid,
  FolderOpen,
  Home,
  List,
  KanbanSquare,
  Search,
  PanelLeft,
  Bot,
} from 'lucide-react'

type TabKey = 'work' | 'code' | 'design' | 'engine'

const menuItems = [
  { key: 'new-task', label: '新建任务', icon: Clock, shortcut: '⌘^N' },
  { key: 'plugins', label: '插件市场', icon: Layers },
  { key: 'automation', label: '自动化', icon: Settings },
  { key: 'assistant', label: '办公助理', icon: MessageSquare },
  { key: 'templates', label: '模板库', icon: LayoutGrid },
  { key: 'files', label: '我的文件', icon: FolderOpen },
]

/** 每个 Tab 自己的任务列表（按需扩展） */
const taskListsByTab: Record<TabKey, Array<{ name: string; icon: typeof Home; count?: number }>> = {
  work: [
    { name: '收件箱', icon: Home, count: 12 },
    { name: '今日待办', icon: FolderOpen, count: 5 },
    { name: '本周计划', icon: FolderOpen, count: 8 },
    { name: '已完成', icon: FolderOpen },
  ],
  code: [
    { name: '进行中', icon: Home, count: 3 },
    { name: '待 Review', icon: FolderOpen, count: 7 },
    { name: 'Bug 列表', icon: FolderOpen, count: 2 },
    { name: '已完成', icon: FolderOpen },
  ],
  design: [
    { name: '草稿', icon: Home, count: 4 },
    { name: '评审中', icon: FolderOpen, count: 1 },
    { name: '已交付', icon: FolderOpen },
  ],
  engine: [
    { name: '当前对话', icon: Home },
    { name: '历史会话', icon: FolderOpen, count: 9 },
    { name: '常用模型', icon: FolderOpen },
  ],
}

/** 每个顶部标签对应的路由（暂未实现页面的标签保留 undefined，仅做本地高亮） */
const tabRoutes: Partial<Record<TabKey, string>> = {
  work: '/',
  engine: '/engine',
}

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<TabKey>(() =>
    location.pathname === '/engine' ? 'engine' : 'work',
  )
  const [activeMenu, setActiveMenu] = useState('new-task')

  // 路由变化时同步标签高亮（如浏览器前进/后退）
  useEffect(() => {
    setActiveTab(location.pathname === '/engine' ? 'engine' : 'work')
  }, [location.pathname])

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab)
    const route = tabRoutes[tab]
    if (route) navigate(route)
  }

  return (
    <aside className="sidebar">
      {/* 标题栏区域（拖拽区 + logo + 头部图标） */}
      <div className="sidebar-titlebar">
        <div className="sidebar-titlebar-left">
          <div className="sidebar-logo" title="OpenNative">
            <PanelLeft size={16} strokeWidth={2} />
          </div>
          <div className="sidebar-header-icons">
            <div className="header-icon-btn" title="搜索">
              <Search size={18} strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* 顶部标签页 */}
      <div className="sidebar-tabs">
        <div
          className={`tab ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => handleTabClick('work')}
        >
          <Boxes size={16} strokeWidth={2} />
          Work
        </div>
        <div
          className={`tab ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => handleTabClick('code')}
        >
          Code
        </div>
        <div
          className={`tab ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => handleTabClick('design')}
        >
          Design
        </div>
        <div
          className={`tab ${activeTab === 'engine' ? 'active' : ''}`}
          onClick={() => handleTabClick('engine')}
        >
          <Bot size={16} strokeWidth={2} />
          Engine
        </div>
      </div>

      {/* 菜单 */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.key}
              className={`menu-item ${activeMenu === item.key ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.key)}
            >
              <span className="menu-icon">
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="menu-label">{item.label}</span>
              {item.shortcut && (
                <span className="menu-shortcut">{item.shortcut}</span>
              )}
            </div>
          )
        })}

        {/* 任务列表分组 */}
        <div className="menu-section-header">
          <span className="section-title">
            {activeTab === 'work' && '任务列表'}
            {activeTab === 'code' && '代码任务'}
            {activeTab === 'design' && '设计任务'}
            {activeTab === 'engine' && '对话列表'}
          </span>
          <div className="section-actions">
            <div className="section-action-btn" title="看板视图">
              <KanbanSquare size={16} strokeWidth={2} />
            </div>
            <div className="section-action-btn" title="列表视图">
              <List size={16} strokeWidth={2} />
            </div>
          </div>
        </div>

        {taskListsByTab[activeTab].map((task, idx) => {
          const Icon = task.icon
          return (
            <div key={`${activeTab}-${idx}`} className="submenu-item">
              <Icon size={16} strokeWidth={2} className="submenu-icon" />
              <span className="submenu-label">{task.name}</span>
              {task.count !== undefined && (
                <span className="submenu-count">{task.count}</span>
              )}
            </div>
          )
        })}
      </nav>

      {/* 底部用户信息 */}
      <div className="sidebar-footer">
        <div className="footer-settings-btn" title="设置">
          <Settings size={18} strokeWidth={2} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
