import { CITY_DATA, PACE_SLOTS } from '@/data/cities'
import type { DayPlan, Pace, Poi, TripPlan } from '@/types'

/** 两点间球面距离（km） */
export function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLng = (b.lng - a.lng) * rad
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

type ScoredPoi = Poi & { aiScore: number }

/**
 * AI 行程引擎：
 * 1. 兴趣打分（命中兴趣加分 + 基础口碑分）
 * 2. 分层选点（景点与美食分开配额，保证每天有一餐特色）
 * 3. 就近贪心分日聚类，避免来回折返
 * 4. 编排时间轴：上午景点 → 午餐 → 下午景点 → 晚餐/夜游
 */
export function aiPlan(cityKey: string, days: number, pace: Pace, interests: string[]): TripPlan {
  const city = CITY_DATA[cityKey]
  const perDay = PACE_SLOTS[pace]

  // 1. 兴趣打分
  const scored: ScoredPoi[] = city.pois.map((p) => {
    const hits = p.tags.filter((t) => interests.includes(t)).length
    const isFood = p.tags.includes('food')
    return { ...p, aiScore: p.score + hits * 2 + (isFood ? 0.5 : 0) }
  })

  // 2. 分层选点
  const spots = scored.filter((p) => !p.tags.includes('food') || p.tags.length > 1)
  const foods = scored.filter((p) => p.tags.includes('food'))
  const needSpots = days * perDay
  const picked: ScoredPoi[] = []
  const pool = [...spots].sort((a, b) => b.aiScore - a.aiScore)
  while (picked.length < needSpots && pool.length) picked.push(pool.shift()!)
  const pickedFoods = [...foods]
    .sort((a, b) => b.aiScore - a.aiScore)
    .filter((f) => !picked.some((p) => p.name === f.name))
    .slice(0, days)

  // 3. 分日聚类：就近贪心串联
  const dayBuckets: ScoredPoi[][] = Array.from({ length: days }, () => [])
  const remaining = [...picked]
  for (let d = 0; d < days; d++) {
    let cur =
      remaining.length > 0
        ? remaining.splice(Math.floor(Math.random() * Math.min(2, remaining.length)), 1)[0]
        : null
    if (!cur) break
    dayBuckets[d].push(cur)
    while (dayBuckets[d].length < perDay && remaining.length) {
      let bestI = 0
      let bestD = Infinity
      remaining.forEach((p, i) => {
        const dd = haversine(cur!, p)
        if (dd < bestD) {
          bestD = dd
          bestI = i
        }
      })
      cur = remaining.splice(bestI, 1)[0]
      dayBuckets[d].push(cur)
    }
  }

  // 4. 拼装时间轴
  const plan: DayPlan[] = []
  for (let d = 0; d < days; d++) {
    const stops: DayPlan['stops'] = []
    const items = dayBuckets[d]
    const food = pickedFoods[d]
    const timeline =
      pace === 'relaxed'
        ? ['09:30', '12:00', '14:30', '18:30', '20:00']
        : pace === 'normal'
          ? ['09:00', '11:30', '13:30', '16:00', '19:00']
          : ['08:30', '10:30', '13:00', '15:30', '18:30']

    items.forEach((p, i) => {
      stops.push({ poi: p, time: timeline[Math.min(i, timeline.length - 1)], kind: 'spot' })
    })
    if (food) {
      const lunchIdx = Math.min(1, stops.length)
      stops.splice(lunchIdx, 0, { poi: food, time: '12:00', kind: 'food' })
    }
    // 夜游点挪到最后
    const nightI = stops.findIndex((s) => s.poi.tags.includes('nightlife'))
    if (nightI > -1 && nightI < stops.length - 1) {
      const [n] = stops.splice(nightI, 1)
      n.time = '20:00'
      stops.push(n)
    }
    plan.push({ day: d + 1, stops: stops.slice(0, perDay + 1) })
  }
  return { city: cityKey, days, pace, interests, plan }
}

/** 行程统计：总点数与动线总距离 */
export function planStats(plan: TripPlan) {
  let totalSpots = 0
  let totalDist = 0
  plan.plan.forEach((d) => {
    totalSpots += d.stops.length
    for (let i = 1; i < d.stops.length; i++) {
      totalDist += haversine(d.stops[i - 1].poi, d.stops[i].poi)
    }
  })
  return { totalSpots, totalDist }
}

/** 单日动线距离 */
export function dayDistance(day: DayPlan): number {
  let dist = 0
  for (let i = 1; i < day.stops.length; i++) {
    dist += haversine(day.stops[i - 1].poi, day.stops[i].poi)
  }
  return dist
}

/** 导出纯文本行程 */
export function planToText(plan: TripPlan): string {
  const city = CITY_DATA[plan.city]
  let txt = `【途灵 TripSoul】 ${city.name} ${plan.days} 日行程\n`
  plan.plan.forEach((d) => {
    txt += `\nDay ${d.day}\n`
    d.stops.forEach((s) => {
      txt += `  ${s.time}  ${s.poi.name}（${s.poi.dur}）\n`
    })
  })
  txt += `\n💡 ${city.tips}`
  return txt
}
