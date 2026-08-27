import './QuickCategories.css'
import {
  Monitor,
  FileText,
  BarChart3,
  Video,
  Image,
  Code2,
  PenTool,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react'

const categories = [
  { key: 'ppt', label: 'PPT', icon: Monitor },
  { key: 'doc', label: '文档', icon: FileText },
  { key: 'data', label: '数据分析', icon: BarChart3 },
  { key: 'video', label: '视频', icon: Video },
  { key: 'image', label: '图像', icon: Image },
  { key: 'product', label: '产品开发', icon: Code2 },
  { key: 'content', label: '内容创作', icon: PenTool },
  { key: 'more', label: '', icon: MoreHorizontal, isMore: true },
]

function QuickCategories() {
  const handleClick = (key: string) => {
    console.log('Category clicked:', key)
  }

  return (
    <div className="quick-categories">
      {categories.map((cat) => {
        const Icon = cat.icon
        return (
          <div
            key={cat.key}
            className={`category-chip ${cat.isMore ? 'more' : ''}`}
            onClick={() => handleClick(cat.key)}
          >
            <Icon size={16} strokeWidth={2} className="chip-icon" />
            {!cat.isMore && <span>{cat.label}</span>}
            {cat.isMore && <ChevronRight size={12} strokeWidth={2} />}
          </div>
        )
      })}
    </div>
  )
}

export default QuickCategories
