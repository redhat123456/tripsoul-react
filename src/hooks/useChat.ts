import { useCallback, useRef, useState } from 'react'
import { aiReply } from '@/lib/assistant'
import type { ChatMsg } from '@/types'

const WELCOME: ChatMsg = {
  id: 0,
  who: 'ai',
  text: '你好呀，我是途灵 🧭 你的旅行灵感伙伴。\n你可以问我：\n· “帮我推荐一个适合 3 天的城市”\n· “北京有什么必吃的美食？”\n· “现在生成的行程能再轻松一点吗？”',
}

/** 聊天状态管理：消息列表 + 模拟 AI 打字回复 */
export function useChat(cityKey: string, hasPlan: boolean) {
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME])
  const idRef = useRef(1)
  const ctxRef = useRef({ cityKey, hasPlan })
  ctxRef.current = { cityKey, hasPlan }

  /** AI 主动说话（先显示打字动画，再替换为内容） */
  const say = useCallback((text: string) => {
    const id = idRef.current++
    setMessages((prev) => [...prev, { id, who: 'ai', text: '', typing: true }])
    setTimeout(
      () => {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text, typing: false } : m)))
      },
      700 + Math.random() * 500,
    )
  }, [])

  /** 用户提问 → AI 应答 */
  const send = useCallback(
    (q: string) => {
      const text = q.trim()
      if (!text) return
      setMessages((prev) => [...prev, { id: idRef.current++, who: 'me', text }])
      const reply = aiReply(text, ctxRef.current.cityKey, ctxRef.current.hasPlan)
      say(reply)
    },
    [say],
  )

  return { messages, say, send }
}
