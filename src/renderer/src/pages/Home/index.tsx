import ChatInput from '../../components/ChatInput'
import QuickCategories from '../../components/QuickCategories'
import SuggestionList from '../../components/SuggestionList'
import { Bell } from 'lucide-react'
import './Home.css'

const Home = (): React.JSX.Element => {
  return (
    <>
      {/* 顶部栏（与侧边栏标题栏等高，统一拖拽区） */}
      <div className="work-main-header">
        <div className="header-bell" title="通知">
          <Bell size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-hero">
          <h1 className="chat-hero-title">Hello, I'm OpenNative</h1>
        </div>

        <ChatInput />
        <QuickCategories />
        <SuggestionList />
      </div>
    </>
  )
}

export default Home
