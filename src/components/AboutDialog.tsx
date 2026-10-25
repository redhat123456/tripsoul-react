import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ABOUT } from '@/config/about'

interface AboutDialogProps {
  open: boolean
  onClose: () => void
}

export function AboutDialog({ open, onClose }: AboutDialogProps) {
  // ESC 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const year = new Date().getFullYear()
  const yearRange = year > ABOUT.startYear ? `${ABOUT.startYear} - ${year}` : `${ABOUT.startYear}`

  // 通过 Portal 挂载到 body，并使用最高层级，确保不被地图图层遮挡
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/45 dark:bg-black/70"
      style={{ zIndex: 2147483647 }}
      onClick={onClose}
    >
      <div
        className="relative w-[480px] max-w-[92vw] bg-white dark:bg-slate-800 rounded-lg shadow-2xl px-10 py-8 text-center text-gray-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          aria-label="关闭"
        >
          ×
        </button>

        <h2 className="text-[15px] font-bold mb-6">关于</h2>

        <p className="text-[13.5px] font-semibold mb-3">{ABOUT.appDesc}</p>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">作者：{ABOUT.authorName}</p>

        {/* 头像 */}
        {ABOUT.avatar ? (
          <img
            src={ABOUT.avatar}
            alt={ABOUT.authorName}
            referrerPolicy="no-referrer"
            /* 头像加载失败时隐藏，露出下方同尺寸渐变占位，避免出现破图 */
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden'
            }}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-8 border-4 border-gray-100 dark:border-slate-700 bg-gradient-to-br from-blue-500 to-indigo-600"
          />
        ) : (
          <div className="w-28 h-28 rounded-full mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl border-4 border-gray-100 dark:border-slate-700">
            🧭
          </div>
        )}

        {/* 链接 */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {ABOUT.links.map((l, i) => (
            <span key={l.label} className="flex items-center gap-6">
              {i > 0 && <span className="text-gray-300 dark:text-slate-600">|</span>}
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer text-[13px] text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-blue-600 transition-colors"
              >
                {l.label}
              </a>
            </span>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 dark:text-slate-500">
          © {yearRange} · {ABOUT.authorName} · All Rights Reserved
        </p>
      </div>
    </div>,
    document.body,
  )
}
