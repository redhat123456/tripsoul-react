import { useEffect, useRef, useState } from 'react'
import type { ChatMsg } from '@/types'

interface ChatPanelProps {
  messages: ChatMsg[]
  onSend: (q: string) => void
}

const QUICK_QUESTIONS = [
  { q: '推荐一个旅行目的地', label: '推荐目的地' },
  { q: '当地有什么美食？', label: '当地美食' },
  { q: '帮我优化一下行程', label: '优化行程' },
  { q: '旅行注意事项', label: '注意事项' },
]

export function ChatPanel({ messages, onSend }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages])

  const handleSend = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q) return
    onSend(q)
    setInput('')
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* 消息区 */}
      <div className="flex-1 overflow-y-auto p-4" ref={logRef}>
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[88%] mb-3 text-[13px] leading-relaxed ${m.who === 'me' ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`text-[11px] text-gray-500 dark:text-slate-400 mb-1 ${m.who === 'me' ? 'text-right' : ''}`}>
              {m.who === 'me' ? '我' : '途灵 AI'}
            </div>
            <div
              className={`px-3.5 py-2.5 rounded-xl whitespace-pre-line ${
                m.who === 'me'
                  ? 'bg-blue-600 text-white rounded-tr-sm dark:bg-violet-600'
                  : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-200 rounded-tl-sm'
              }`}
            >
              {m.typing ? (
                <span className="inline-flex gap-1 py-1">
                  {[0, 1, 2].map((i) => (
                    <i
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </span>
              ) : (
                m.text
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 快捷提问 */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-2.5">
        {QUICK_QUESTIONS.map((item) => (
          <span
            key={item.q}
            onClick={() => handleSend(item.q)}
            className="text-[11.5px] border border-dashed border-gray-300 text-gray-500 rounded-full px-2.5 py-1 cursor-pointer hover:text-blue-600 hover:border-blue-600 transition-colors dark:border-slate-600 dark:text-slate-400 dark:hover:text-violet-300 dark:hover:border-violet-400"
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* 输入栏 */}
      <div className="shrink-0 flex gap-2 px-4 py-3 border-t border-gray-200 dark:border-slate-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="向途灵提问，回车发送…"
          className="flex-1 border border-gray-200 dark:border-slate-600 rounded-[10px] px-3 py-2.5 text-[13px] outline-none focus:border-blue-600 dark:focus:border-violet-400 bg-white dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
        />
        <button
          onClick={() => handleSend()}
          className="rounded-[10px] px-5 bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors dark:bg-violet-600 dark:hover:bg-violet-500"
        >
          发送
        </button>
      </div>
    </div>
  )
}
