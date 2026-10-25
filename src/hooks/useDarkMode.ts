import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tripsoul-theme'

/** 黑白（暗色）模式切换：通过 <html> 上的 dark class 驱动 Tailwind dark: 变体，并持久化到 localStorage */
export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}
