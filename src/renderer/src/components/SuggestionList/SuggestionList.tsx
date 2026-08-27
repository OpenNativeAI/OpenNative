import './SuggestionList.css'
import { Sparkles, ArrowUp } from 'lucide-react'

const suggestions = [
  {
    id: 1,
    badge: '前端设计工具集',
    text: '为 SaaS 产品制作一个清晰的价格页面',
    hasBadge: true,
  },
  {
    id: 2,
    text: '跟踪主要竞品动态，整理风险和市场机会',
    hasBadge: false,
  },
  {
    id: 3,
    text: '根据研究材料撰写一份结构规范的分析报告',
    hasBadge: false,
  },
  {
    id: 4,
    text: '汇总本周任务、数据和风险，生成一份管理层周报',
    hasBadge: false,
  },
]

function SuggestionList() {
  const handleClick = (text: string) => {
    console.log('Suggestion clicked:', text)
  }

  return (
    <div className="suggestion-list">
      {suggestions.map((item) => (
        <div
          key={item.id}
          className="suggestion-item"
          onClick={() => handleClick(item.text)}
        >
          <div className="suggestion-left">
            {item.hasBadge ? (
              <>
                <span className="suggestion-badge">
                  <Sparkles size={14} strokeWidth={2} />
                  {item.badge}
                </span>
                <span className="suggestion-text">{item.text}</span>
              </>
            ) : (
              <span className="suggestion-text suggestion-text-indented">
                {item.text}
              </span>
            )}
          </div>
          <ArrowUp size={16} strokeWidth={2} className="suggestion-arrow" />
        </div>
      ))}
    </div>
  )
}

export default SuggestionList
