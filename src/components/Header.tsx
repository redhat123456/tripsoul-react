interface HeaderProps {
  dark: boolean
  onToggleDark: () => void
  onOpenAbout: () => void
}

export function Header({ dark, onToggleDark, onOpenAbout }: HeaderProps) {
  return (
    <header className="h-[58px] shrink-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-slate-900 dark:via-violet-900 dark:to-indigo-900 text-white flex items-center px-6 gap-3 shadow-md z-10 transition-colors">
      <div className="w-[34px] h-[34px] rounded-[10px] bg-white/20 flex items-center justify-center text-lg">
        🧭
      </div>
      <h1 className="text-lg font-bold tracking-wide">途灵 TripSoul</h1>
      <span className="text-xs opacity-85">AI 互动旅行规划器</span>
      <div className="flex-1" />

      {/* 右上角操作区 */}
      <button
        onClick={onOpenAbout}
        className="flex items-center gap-1.5 text-[13px] bg-white/15 hover:bg-white/25 dark:bg-white/10 dark:hover:bg-violet-500/40 transition-colors px-3.5 py-1.5 rounded-lg"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        关于
      </button>
      <button
        onClick={onToggleDark}
        title={dark ? '切换到白天模式' : '切换到黑夜模式'}
        className="w-[34px] h-[34px] flex items-center justify-center bg-white/15 hover:bg-white/25 dark:bg-white/10 dark:hover:bg-violet-500/40 transition-colors rounded-lg"
      >
        {dark ? (
          /* 太阳：白天模式 */
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          /* 月亮：黑夜模式 */
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  )
}
