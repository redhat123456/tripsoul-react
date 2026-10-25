import { useEffect, useState } from 'react'
import './App.css'
import { Header } from '@/components/Header'
import { PlanForm } from '@/components/PlanForm'
import { ItineraryPanel } from '@/components/ItineraryPanel'
import { ChatPanel } from '@/components/ChatPanel'
import { MapView } from '@/components/MapView'
import { AboutDialog } from '@/components/AboutDialog'
import { CITY_DATA } from '@/data/cities'
import { aiPlan } from '@/lib/planner'
import { focusStop, onMarkerClick } from '@/lib/mapManager'
import { useChat } from '@/hooks/useChat'
import { useDarkMode } from '@/hooks/useDarkMode'
import type { Pace, StopRef, TripPlan } from '@/types'

type TabKey = 'plan' | 'itinerary' | 'chat'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'plan', label: '✨ 智能规划' },
  { key: 'itinerary', label: '🗺️ 我的行程' },
  { key: 'chat', label: '💬 AI 助手' },
]

function App() {
  const [tab, setTab] = useState<TabKey>('plan')
  const [city, setCity] = useState('beijing')
  const [days, setDays] = useState(3)
  const [pace, setPace] = useState<Pace>('normal')
  const [interests, setInterests] = useState<string[]>(['culture', 'nature', 'food'])
  const [plan, setPlan] = useState<TripPlan | null>(null)
  const [selected, setSelected] = useState<StopRef | null>(null)
  const [generating, setGenerating] = useState(false)
  const [thinkStep, setThinkStep] = useState('')
  const [aboutOpen, setAboutOpen] = useState(false)
  const { dark, toggle: toggleDark } = useDarkMode()

  const chat = useChat(city, !!plan)

  // 地图标记点击 → 联动列表
  useEffect(() => {
    onMarkerClick((di, si) => {
      setSelected({ day: di, idx: si })
      focusStop(di, si)
      setTab('itinerary')
    })
  }, [])

  const toggleInterest = (tag: string) => {
    setInterests((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  /** 生成行程（带 AI 思考动画） */
  const generate = () => {
    if (generating) return
    setGenerating(true)
    const steps = [
      '正在分析你的兴趣偏好…',
      `检索 ${CITY_DATA[city].name} 口碑景点与美食…`,
      '按动线距离进行每日聚类…',
      '编排时间表与用餐节点…',
      '生成专属行程完成 ✨',
    ]
    setThinkStep(steps[0])
    let i = 0
    const timer = setInterval(() => {
      i++
      if (i < steps.length) {
        setThinkStep(steps[i])
        return
      }
      clearInterval(timer)
      setGenerating(false)
      const newPlan = aiPlan(city, days, pace, interests.length ? interests : ['culture'])
      setPlan(newPlan)
      setSelected(null)
      setTab('itinerary')
      const total = newPlan.plan.reduce((a, d) => a + d.stops.length, 0)
      chat.say(
        `为你生成了 ${CITY_DATA[city].name} ${days} 日行程 🎉\n共 ${total} 个行程点，已按就近动线分日排好。` +
          '点击任意行程点，地图会带你飞过去～还想调整可以直接跟我说。',
      )
    }, 550)
  }

  /** 列表/地图点击行程点 */
  const handleSelectStop = (di: number, si: number) => {
    setSelected({ day: di, idx: si })
    focusStop(di, si)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100 text-gray-800 dark:bg-slate-950 dark:text-slate-200 transition-colors">
      <Header dark={dark} onToggleDark={toggleDark} onOpenAbout={() => setAboutOpen(true)} />
      <main className="flex-1 flex min-h-0">
        {/* 左侧面板 */}
        <aside className="w-[420px] shrink-0 bg-white border-r border-gray-200 dark:bg-slate-800 dark:border-slate-700 flex flex-col min-h-0 transition-colors">
          <div className="flex border-b border-gray-200 dark:border-slate-700 shrink-0 h-[46px]">
            {TABS.map((t) => (
              <div
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 text-center leading-[46px] text-sm cursor-pointer select-none border-b-2 ${
                  tab === t.key
                    ? 'text-blue-600 dark:text-violet-300 border-blue-600 dark:border-violet-400 font-semibold'
                    : 'text-gray-500 dark:text-slate-400 border-transparent'
                }`}
              >
                {t.label}
              </div>
            ))}
          </div>

          {tab === 'plan' && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <PlanForm
                city={city}
                days={days}
                pace={pace}
                interests={interests}
                generating={generating}
                thinkStep={thinkStep}
                onCityChange={setCity}
                onDaysChange={setDays}
                onPaceChange={setPace}
                onToggleInterest={toggleInterest}
                onGenerate={generate}
              />
            </div>
          )}
          {tab === 'itinerary' && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ItineraryPanel
                plan={plan}
                selected={selected}
                onSelectStop={handleSelectStop}
                onRegenerate={generate}
              />
            </div>
          )}
          {tab === 'chat' && <ChatPanel messages={chat.messages} onSend={chat.send} />}
        </aside>

        {/* 右侧地图 */}
        <MapView city={city} plan={plan} dark={dark} />
      </main>

      {/* 关于弹窗 */}
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}

export default App
