import { useEffect, useRef, useState } from 'react'
import { CITY_DATA, DAY_COLORS, PACE_LABELS } from '@/data/cities'
import { dayDistance, planStats, planToText } from '@/lib/planner'
import type { StopRef, TripPlan } from '@/types'

interface ItineraryPanelProps {
  plan: TripPlan | null
  selected: StopRef | null
  onSelectStop: (day: number, idx: number) => void
  onRegenerate: () => void
}

export function ItineraryPanel({ plan, selected, onSelectStop, onRegenerate }: ItineraryPanelProps) {
  const [copied, setCopied] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  // 选中点变化时滚动到对应卡片
  useEffect(() => {
    if (!selected || !bodyRef.current) return
    const el = bodyRef.current.querySelector(`#stop-${selected.day}-${selected.idx}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [selected])

  if (!plan) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500 dark:text-slate-400 py-12 px-4 text-[13px] leading-loose">
          <span className="text-4xl block mb-2">🗺️</span>
          还没有行程
          <br />
          先在「智能规划」页告诉途灵你的偏好
          <br />
          让 AI 为你生成一份专属旅程吧
        </div>
      </div>
    )
  }

  const city = CITY_DATA[plan.city]
  const { totalSpots, totalDist } = planStats(plan)

  const handleCopy = () => {
    navigator.clipboard.writeText(planToText(plan)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="p-4" ref={bodyRef}>
      {/* 统计 */}
      <div className="flex gap-2 mb-3.5">
        {[
          { v: String(plan.days), k: '天数' },
          { v: String(totalSpots), k: '行程点' },
          { v: totalDist.toFixed(1) + 'km', k: '动线总览' },
          { v: PACE_LABELS[plan.pace], k: '节奏' },
        ].map((s) => (
          <div
            key={s.k}
            className="flex-1 bg-blue-100 dark:bg-violet-900/40 rounded-[10px] py-2.5 px-1.5 text-center"
          >
            <b className="block text-base text-blue-600 dark:text-violet-300">{s.v}</b>
            <span className="text-[11px] text-gray-500 dark:text-slate-400">{s.k}</span>
          </div>
        ))}
      </div>

      {/* 工具行 */}
      <div className="flex gap-2 mb-3.5">
        <button
          onClick={handleCopy}
          className="flex-1 py-2 text-[12.5px] border border-gray-200 bg-white rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-violet-400 dark:hover:text-violet-300"
        >
          {copied ? '✅ 已复制' : '📋 复制行程文字'}
        </button>
        <button
          onClick={onRegenerate}
          className="flex-1 py-2 text-[12.5px] border border-gray-200 bg-white rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-violet-400 dark:hover:text-violet-300"
        >
          🎲 换一版
        </button>
      </div>

      {/* 每日行程 */}
      {plan.plan.map((d, di) => {
        const color = DAY_COLORS[di % DAY_COLORS.length]
        return (
          <div key={d.day} className="mb-3.5">
            <div
              className="flex items-center gap-2 px-2.5 py-2 rounded-[10px] text-white text-[13px] font-bold mb-2"
              style={{ background: color }}
            >
              Day {d.day}
              <span className="ml-auto font-normal text-[11px] opacity-90">
                约 {dayDistance(d).toFixed(1)} km
              </span>
            </div>
            {d.stops.map((s, si) => {
              const active = selected?.day === di && selected?.idx === si
              return (
                <div
                  key={si}
                  id={`stop-${di}-${si}`}
                  onClick={() => onSelectStop(di, si)}
                  className={`relative flex gap-2.5 px-2.5 py-2 border rounded-[10px] mb-2 cursor-pointer transition-all ${
                    active
                      ? 'border-blue-600 bg-blue-50 dark:border-violet-500 dark:bg-violet-900/30'
                      : 'border-gray-200 bg-white hover:border-blue-600 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:hover:border-violet-400 dark:hover:shadow-violet-900/40'
                  }`}
                >
                  {/* 同一天内相邻地点的连接线：使用当天主题色（向上连接上一站） */}
                  {si > 0 && (
                    <span
                      className="absolute left-[21px] w-[2px] rounded-full pointer-events-none"
                      style={{ background: color, top: -8, height: 16 }}
                    />
                  )}
                  {/* 向下连接下一站 */}
                  {si < d.stops.length - 1 && (
                    <span
                      className="absolute left-[21px] w-[2px] rounded-full pointer-events-none"
                      style={{ background: color, top: 32, bottom: -8 }}
                    />
                  )}

                  <div
                    className="relative z-10 w-6 h-6 shrink-0 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ background: color }}
                  >
                    {si + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <b className="text-[13.5px] block">
                      {s.kind === 'food' ? '🍜 ' : ''}
                      {s.poi.name}
                    </b>
                    <div className="text-[11.5px] text-gray-500 dark:text-slate-400 mt-0.5">
                      {s.poi.dur} · {s.poi.desc}
                    </div>
                  </div>
                  <div className="text-[11px] text-blue-600 dark:text-violet-300 whitespace-nowrap font-semibold">
                    {s.time}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      <p className="text-xs text-gray-500 dark:text-slate-400 mt-2.5 leading-relaxed">
        💡 {city.tips}
        <br />
        🍜 当地味道：{city.foods}
      </p>
    </div>
  )
}
