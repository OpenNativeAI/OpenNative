import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
})

export function renderMarkdown(text: string): string {
  if (!text) return ''
  // 折叠空行，避免被解析为多段落
  const normalized = text
    .replace(/\n{3,}/g, '\n')
    .replace(/\n{2}/g, '\n')
  const rawHtml = marked.parse(normalized, { async: false }) as string
  const sanitized = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'strong', 'em', 'u', 's', 'del', 'ins',
      'ul', 'ol', 'li',
      'blockquote',
      'code', 'pre',
      'a',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img',
      'div',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt'],
  })
  // 强制把所有 <p> 标签加上内联样式 margin=0，覆盖浏览器默认
  return sanitized.replace(/<p(\s[^>]*)?>/g, '<p style="margin:0;padding:0;line-height:1.4;">')
}
