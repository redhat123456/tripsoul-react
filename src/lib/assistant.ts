import { CITY_DATA } from '@/data/cities'

/**
 * AI 助手应答逻辑（内置旅行智能体，规则引擎）
 * 后续接入真实大模型时，只需替换本文件实现
 */
export function aiReply(q: string, cityKey: string, hasPlan: boolean): string {
  const city = CITY_DATA[cityKey]
  const has = (...ks: string[]) => ks.some((k) => q.includes(k))

  if (has('推荐', '去哪', '哪里好玩', '目的地')) {
    return (
      '根据当前热度，我的推荐 👇\n· 🐼 成都：吃货与熊猫控的天堂，节奏巴适\n· 🏯 西安：盛唐夜色 + 兵马俑，历史感拉满\n' +
      '· 🌊 杭州：骑行西湖，春天喝明前龙井\n· 🌃 上海：摩登都市与梧桐老街的双面魅力\n在左侧选好城市，我来帮你一键生成行程～'
    )
  }
  if (has('美食', '吃', '小吃', '餐厅')) {
    return (
      `${city.name}的必吃清单 🍜\n` +
      city.foods
        .split('、')
        .map((f) => '· ' + f)
        .join('\n') +
      '\n\n生成行程时勾上「地道美食」，我会把美食点直接排进每日动线里。'
    )
  }
  if (has('轻松', '优化', '调整', '太累', '慢一点')) {
    if (!hasPlan) return '你还没有生成行程哦～先在「智能规划」页生成一版，我再帮你优化。'
    return '可以这样做 👇\n1️⃣ 把旅行节奏切到「🍵 悠闲」，每日景点自动减少\n2️⃣ 去掉一个兴趣标签，行程更聚焦\n3️⃣ 点击「🎲 换一版」让 AI 重新聚类动线\n要不要现在就去调一下？'
  }
  if (has('注意', '提醒', '贴士', '准备')) {
    return `${city.name}旅行贴士 💡\n${city.tips}\n另外：身份证随身带、热门场馆提前预约、导航地铁优先。`
  }
  if (has('你好', 'hi', '嗨', '在吗')) {
    return '我在呀 🧭 想去哪儿玩？告诉我城市和天数，剩下的交给途灵。'
  }
  if (has('谢谢', '感谢')) {
    return '不客气～祝你旅途愉快 ✈️ 有新想法随时来找我。'
  }
  return '这个问题有点超出我的旅行脑容量啦 😅 不过关于「目的地推荐、当地美食、行程优化、注意事项」我都很熟，随便问～'
}
