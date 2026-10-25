import { useEffect, useRef } from 'react'
import { CITY_DATA, DAY_COLORS } from '@/data/cities'
import { initMap, renderPlan, setCityCenter } from '@/lib/mapManager'
import type { TripPlan } from '@/types'

interface MapViewProps {
  city: string
  plan: TripPlan | null
  dark: boolean
}

export function MapView({ city, plan, dark }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)

  // 初始化地图（幂等，兼容 StrictMode 双调用）
  useEffect(() => {
    if (!containerRef.current) return
    initMap(containerRef.current, CITY_DATA[city].center, () => {
      readyRef.current = true
      // 若初始化前已有行程（理论上不会），补渲染
      if (plan) renderPlan(plan)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 切换城市
  useEffect(() => {
    if (readyRef.current) setCityCenter(CITY_DATA[city].center)
  }, [city])

  // 渲染行程
  useEffect(() => {
    if (readyRef.current && plan) renderPlan(plan)
  }, [plan])

  return (
    // isolate 建立独立层叠上下文：避免地图 SDK 内部 z-index 高达 1000 的图层
    // 溢出到全局层叠上下文，从而遮挡并拦截「关于」弹窗等浮层的点击
    <section className="flex-1 relative min-w-0 isolate z-0">
      {/* map-night：黑夜模式下对底图做反色处理 */}
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${dark ? 'map-night' : ''}`}
      />

      {/* 图例 */}
      {plan && (
        <div className="absolute right-3.5 bottom-7 bg-white/95 dark:bg-slate-800/95 dark:text-slate-200 rounded-[10px] px-3.5 py-2.5 text-xs shadow-md z-[5]">
          {plan.plan.map((d, di) => (
            <div key={d.day} className="flex items-center gap-2 my-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: DAY_COLORS[di % DAY_COLORS.length] }}
              />
              Day {d.day}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
