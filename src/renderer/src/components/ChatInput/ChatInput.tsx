import { useState } from 'react'
import './ChatInput.css'
import {
  Plus,
  Link,
  ChevronDown,
  Monitor,
  Layers,
  Bot,
  Mic,
  ArrowUp,
  FolderOpen,
} from 'lucide-react'

function ChatInput() {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (inputValue.trim()) {
      console.log('Submit:', inputValue)
    }
  }

  return (
    <div className="input-card">
      {/* 输入区 */}
      <div className="input-area">
        <div className={`input-placeholder ${inputValue ? 'hidden' : ''}`}>
          帮你整理论文综述、编写 PPT、分析 Excel 等日常工作，输出专业级工作成果。
        </div>
        <textarea
          className="input-textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          rows={1}
        />
      </div>

      {/* 工具栏 */}
      <div className="input-toolbar">
        <div className="toolbar-left">
          <button className="tool-btn" title="添加附件">
            <Plus size={16} strokeWidth={2} />
          </button>

          <button className="tool-btn">
            <Link size={16} strokeWidth={2} />
            手动审批
            <ChevronDown size={12} strokeWidth={2} className="tool-btn-chevron" />
          </button>

          <div className="mode-pills">
            <div className="mode-pill" title="PPT 模式">
              <Monitor size={14} strokeWidth={2} />
            </div>
            <div className="mode-pill" title="文档模式">
              <Layers size={14} strokeWidth={2} />
            </div>
            <div className="mode-pill" title="其他模式">
              <Bot size={14} strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="toolbar-right">
          <button className="tool-btn">
            Auto Mode
            <ChevronDown size={12} strokeWidth={2} className="tool-btn-chevron" />
          </button>

          <button className="tool-btn" title="语音输入">
            <Mic size={16} strokeWidth={2} />
          </button>

          <button className="send-btn" onClick={handleSubmit} title="发送">
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 选择文件夹 */}
      <div className="workspace-bar">
        <div className="workspace-left">
          <FolderOpen size={16} strokeWidth={2} className="workspace-icon" />
          <span className="workspace-text">选择文件夹（可选）</span>
        </div>
        <div className="workspace-right">
          <Link size={16} strokeWidth={2} className="workspace-link-icon" />
        </div>
      </div>
    </div>
  )
}

export default ChatInput
