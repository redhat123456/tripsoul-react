import { DAY_COLORS } from '@/data/cities'
import { ensureMapSdk } from '@/lib/mapLoader'
import type { TripPlan } from '@/types'

/**
 * 腾讯地图 GL JS 封装层
 * - 组件不直接触碰 TMap 全局对象，统一通过本模块操作地图
 * - 模块级单例，规避 React StrictMode 双调用导致的重复初始化
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
let map: any = null
let markers: any = null
let polylines: any = null
let infoWin: any = null
let currentPlan: TripPlan | null = null
let markerClickHandler: ((day: number, idx: number) => void) | null = null

const TMap = () => (window as any).TMap

/** 等待 SDK 加载完成后初始化地图（幂等） */
export function initMap(container: HTMLElement, center: [number, number], onReady?: () => void) {
  if (map) {
    onReady?.()
    return
  }
  // 注入地图 SDK（自动选择自有密钥 / 本地代理模式）
  ensureMapSdk()
  if (!TMap()) {
    const timer = setInterval(() => {
      if (TMap()) {
        clearInterval(timer)
        initMap(container, center, onReady)
      }
    }, 200)
    return
  }
  const T = TMap()
  const c = new T.LatLng(center[0], center[1])
  map = new T.Map(container, { zoom: 12, center: c })
  infoWin = new T.InfoWindow({ map, position: c, content: '' })
  infoWin.close()
  onReady?.()
}

/** 切换城市时移动视野 */
export function setCityCenter(center: [number, number]) {
  if (!map) return
  const T = TMap()
  map.setCenter(new T.LatLng(center[0], center[1]))
  map.setZoom(12)
}

/** 注册标记点击回调（React 侧用于联动列表高亮） */
export function onMarkerClick(cb: (day: number, idx: number) => void) {
  markerClickHandler = cb
}

/** 生成带序号的彩色图钉图标（内联 SVG，避免引用外部图片） */
function numIcon(num: number, color: string): string {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='38'>" +
    `<path d='M14 0C6.8 0 1 5.8 1 13c0 9.6 13 25 13 25s13-15.4 13-25C27 5.8 21.2 0 14 0z' fill='${color}'/>` +
    "<circle cx='14' cy='13' r='9' fill='#ffffff'/>" +
    `<text x='14' y='17.5' text-anchor='middle' font-size='11' font-weight='bold' fill='${color}'>${num}</text></svg>`
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

/** 将行程渲染到地图：编号图钉 + 每日彩色虚线路线 + 视野自适应 */
export function renderPlan(plan: TripPlan) {
  if (!map) return
  const T = TMap()
  currentPlan = plan

  try {
    doRender(T, plan)
  } catch (e) {
    // 地图渲染异常不应影响页面其它部分
    console.error('[途灵] 地图行程渲染失败：', e)
  }
}

function doRender(T: any, plan: TripPlan) {
  if (markers) {
    markers.setMap(null)
    markers = null
  }
  if (polylines) {
    polylines.setMap(null)
    polylines = null
  }

  const markerGeos: any[] = []
  const linePaths: any[] = []
  const styles: Record<string, any> = {}
  const lineStyles: Record<string, any> = {}
  const bounds = new T.LatLngBounds()

  plan.plan.forEach((d, di) => {
    const color = DAY_COLORS[di % DAY_COLORS.length]
    const path: any[] = []
    d.stops.forEach((s, si) => {
      const pos = new T.LatLng(s.poi.lat, s.poi.lng)
      path.push(pos)
      bounds.extend(pos)
      const sid = `m${di}-${si}`
      styles[sid] = new T.MarkerStyle({
        width: 28,
        height: 38,
        anchor: { x: 14, y: 38 },
        src: numIcon(si + 1, color),
      })
      markerGeos.push({
        id: `${di}-${si}`,
        styleId: sid,
        position: pos,
        properties: { title: s.poi.name },
      })
    })
    if (path.length > 1) {
      const lid = `ls${di}`
      lineStyles[lid] = new T.PolylineStyle({
        color,
        width: 4,
        borderWidth: 1,
        borderColor: '#ffffff',
        lineCap: 'round',
        dashStyle: 'dash',
      })
      // 注意：PolylineGeometry 的顶点字段是 paths（复数），不是 path
      linePaths.push({ id: `line${di}`, styleId: lid, paths: path })
    }
  })

  markers = new T.MultiMarker({ map, styles, geometries: markerGeos })
  if (linePaths.length) {
    polylines = new T.MultiPolyline({ map, styles: lineStyles, geometries: linePaths })
  }

  setTimeout(() => map.fitBounds(bounds, { padding: 80 }), 100)

  markers.on('click', (e: any) => {
    const [di, si] = e.geometry.id.split('-').map(Number)
    markerClickHandler?.(di, si)
  })
}

/** 聚焦某个行程点：打开信息窗并居中 */
export function focusStop(di: number, si: number) {
  if (!map || !currentPlan) return
  const T = TMap()
  const s = currentPlan.plan[di].stops[si]
  const pos = new T.LatLng(s.poi.lat, s.poi.lng)
  infoWin.setPosition(pos)
  infoWin.setContent(
    `<div style='padding:6px 4px;max-width:230px'>` +
      `<b style='font-size:14px'>${si + 1}. ${s.poi.name}</b>` +
      `<div style='font-size:12px;color:#6b7280;margin:4px 0'>${s.time} · 建议 ${s.poi.dur} · 评分 ${s.poi.score}</div>` +
      `<div style='font-size:12px;line-height:1.6'>${s.poi.desc}</div></div>`,
  )
  infoWin.open()
  map.setCenter(pos)
}

/** 清理图层（组件卸载时使用；单页应用一般无需调用） */
export function clearLayers() {
  if (markers) {
    markers.setMap(null)
    markers = null
  }
  if (polylines) {
    polylines.setMap(null)
    polylines = null
  }
}
