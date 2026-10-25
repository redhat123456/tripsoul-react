/** 全局类型定义 */

export type Pace = 'relaxed' | 'normal' | 'intense'

export interface Poi {
  name: string
  lat: number
  lng: number
  tags: string[]
  dur: string
  desc: string
  score: number
}

export interface CityData {
  name: string
  center: [number, number]
  tips: string
  foods: string
  pois: Poi[]
}

export interface Stop {
  poi: Poi
  time: string
  kind: 'spot' | 'food'
}

export interface DayPlan {
  day: number
  stops: Stop[]
}

export interface TripPlan {
  city: string
  days: number
  pace: Pace
  interests: string[]
  plan: DayPlan[]
}

export interface PlanConfig {
  city: string
  days: number
  pace: Pace
  interests: string[]
}

export interface ChatMsg {
  id: number
  who: 'me' | 'ai'
  text: string
  typing?: boolean
}

export interface StopRef {
  day: number
  idx: number
}
