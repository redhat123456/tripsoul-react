import { CITY_DATA, INTEREST_OPTIONS } from '@/data/cities'
import type { Pace } from '@/types'

interface PlanFormProps {
  city: string
  days: number
  pace: Pace
  interests: string[]
  generating: boolean
  thinkStep: string
  onCityChange: (city: string) => void
  onDaysChange: (days: number) => void
  onPaceChange: (pace: Pace) => void
  onToggleInterest: (tag: string) => void
  onGenerate: () => void
}

const PACES: { key: Pace; label: string }[] = [
  { key: 'relaxed', label: '🍵 悠闲' },
  { key: 'normal', label: '🚶 适中' },
  { key: 'intense', label: '⚡ 暴走' },
]

export function PlanForm(props: PlanFormProps) {
  return (
    <div className="p-4">
      {/* 目的地城市 */}
      <div className="mb-4">
        <label className="block text-[13px] font-semibold mb-2">目的地城市</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(CITY_DATA).map(([key, c]) => (
            <div
              key={key}
              onClick={() => props.onCityChange(key)}
              className={`border rounded-[10px] py-2 text-center text-[13px] cursor-pointer transition-all select-none ${
                props.city === key
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-violet-600 dark:border-violet-500'
                  : 'bg-white border-gray-200 hover:border-blue-600 hover:text-blue-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-violet-400 dark:hover:text-violet-300'
              }`}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* 旅行天数 */}
      <div className="mb-4">
        <label className="block text-[13px] font-semibold mb-2">旅行天数</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={5}
            value={props.days}
            onChange={(e) => props.onDaysChange(+e.target.value)}
            className="flex-1 accent-blue-600"
          />
          <span className="text-base font-bold text-blue-600 dark:text-violet-300 min-w-[52px] text-right">
            {props.days} 天
          </span>
        </div>
      </div>

      {/* 旅行节奏 */}
      <div className="mb-4">
        <label className="block text-[13px] font-semibold mb-2">旅行节奏</label>
        <div className="flex border border-gray-200 dark:border-slate-600 rounded-[10px] overflow-hidden">
          {PACES.map((p) => (
            <div
              key={p.key}
              onClick={() => props.onPaceChange(p.key)}
              className={`flex-1 text-center py-2 text-[13px] cursor-pointer select-none ${
                props.pace === p.key
                  ? 'bg-blue-600 text-white dark:bg-violet-600'
                  : 'bg-white dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* 兴趣偏好 */}
      <div className="mb-4">
        <label className="block text-[13px] font-semibold mb-2">兴趣偏好（可多选）</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((o) => (
            <span
              key={o.tag}
              onClick={() => props.onToggleInterest(o.tag)}
              className={`border rounded-full px-3.5 py-1.5 text-[13px] cursor-pointer transition-all select-none ${
                props.interests.includes(o.tag)
                  ? 'bg-blue-100 border-blue-600 text-blue-600 font-semibold dark:bg-violet-900/50 dark:border-violet-500 dark:text-violet-300'
                  : 'bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300'
              }`}
            >
              {o.label}
            </span>
          ))}
        </div>
      </div>

      {/* 生成按钮 */}
      <button
        onClick={props.onGenerate}
        disabled={props.generating}
        className="w-full py-3 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-violet-600 dark:to-purple-600 shadow-lg shadow-blue-600/30 dark:shadow-violet-700/40 hover:-translate-y-px transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        🪄 AI 生成行程
      </button>

      {/* AI 思考动画 */}
      {props.generating && (
        <div className="border border-gray-200 dark:border-slate-600 rounded-xl px-3.5 py-3 mt-3.5 text-[12.5px] text-gray-500 dark:text-slate-400 leading-loose bg-indigo-50/40 dark:bg-violet-900/20">
          🧠 {props.thinkStep}
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-slate-400 mt-2.5 leading-relaxed">
        途灵内置 AI 行程引擎会综合你的兴趣、节奏与景点间距离， 自动分配每日动线、安排用餐与夜游，并在地图上绘制路线。
        <br />
        也可以在「AI 助手」页直接和它聊天调整行程。
      </p>
    </div>
  )
}
