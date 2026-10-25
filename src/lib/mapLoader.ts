/**
 * 腾讯地图 GL JS 加载器
 *
 * 两种模式：
 * 1. 自有密钥模式 —— 部署到 GitHub Pages 时使用。构建时把 VITE_TMAP_KEY 注入
 *    index.html（见 index.html 中的 %VITE_TMAP_KEY%），SDK URL 带上自己的 key。
 * 2. 密钥代理模式 —— WorkBuddy 本地预览时使用。SDK 不携带 key，内部请求走本地代理，
 *    前端零密钥。
 *
 * 模式判断在运行时完成，无需分别在本地和 CI 上维护两份代码。
 */

const SDK = 'https://map.qq.com/api/gljs?v=1.exp&libraries=service'

/** index.html 注入的自有密钥；未配置时 Vite 会原样保留 %VITE_TMAP_KEY% */
function getOwnKey(): string {
  const raw = (window as unknown as Record<string, unknown>).__TMAP_KEY__
  if (typeof raw !== 'string') return ''
  const key = raw.trim()
  // 未注入环境变量时保留占位符，视为「未配置密钥」
  if (!key || key.includes('%')) return ''
  return key
}

let loaded = false

/** 按需注入地图 SDK（幂等） */
export function ensureMapSdk() {
  if (loaded) return
  loaded = true

  const key = getOwnKey()
  if (key) {
    // 线上部署：使用自己的密钥
    const s = document.createElement('script')
    s.id = 'tmap-sdk'
    s.src = `${SDK}&key=${encodeURIComponent(key)}`
    document.head.appendChild(s)
    return
  }

  // 本地预览：启用密钥代理（该地址由 WorkBuddy 运行时替换）
  const proxy = (window as unknown as Record<string, unknown>).__TMAP_PROXY__
  if (typeof proxy === 'string' && proxy) {
    ;(window as unknown as Record<string, unknown>)._TMapSecurityConfig = {
      serviceHost: proxy,
    }
  }
  const s = document.createElement('script')
  s.id = 'tmap-sdk'
  s.src = SDK
  document.head.appendChild(s)
}
