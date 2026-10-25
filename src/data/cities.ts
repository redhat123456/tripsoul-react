import type { CityData } from '@/types'

/**
 * 景点数据库（GCJ-02 坐标，示意数据）
 * 新增城市时只需在此追加一个条目，UI 会自动生成对应按钮
 */
export const CITY_DATA: Record<string, CityData> = {
  beijing: {
    name: '北京',
    center: [39.9042, 116.4074],
    tips: '北京景点跨度大，建议地铁出行；故宫、国博需提前预约。',
    foods: '烤鸭、铜锅涮肉、炸酱面、卤煮火烧、豆汁焦圈',
    pois: [
      { name: '故宫博物院', lat: 39.9163, lng: 116.3972, tags: ['culture'], dur: '3-4小时', desc: '六百年紫禁城，明清皇家宫殿之巅', score: 9.8 },
      { name: '天安门广场', lat: 39.9035, lng: 116.3976, tags: ['culture'], dur: '1小时', desc: '世界最大城市广场，看一次升旗', score: 9.5 },
      { name: '景山公园', lat: 39.925, lng: 116.39, tags: ['nature', 'culture'], dur: '1.5小时', desc: '登顶万春亭，俯瞰故宫全景', score: 9.0 },
      { name: '颐和园', lat: 39.9998, lng: 116.2754, tags: ['nature', 'culture'], dur: '3-4小时', desc: '皇家园林博物馆，昆明湖泛舟', score: 9.6 },
      { name: '天坛公园', lat: 39.8822, lng: 116.4066, tags: ['culture'], dur: '2-3小时', desc: '祈年殿与回音壁，祭天建筑群', score: 9.4 },
      { name: '南锣鼓巷', lat: 39.9366, lng: 116.403, tags: ['culture', 'shopping', 'food'], dur: '2小时', desc: '老北京胡同与文艺小店', score: 8.6 },
      { name: '什刹海', lat: 39.936, lng: 116.385, tags: ['nature', 'nightlife', 'food'], dur: '2小时', desc: '后海酒吧街，傍晚最美', score: 8.8 },
      { name: '前门大街', lat: 39.896, lng: 116.398, tags: ['shopping', 'food'], dur: '2小时', desc: '老字号云集，铛铛车体验', score: 8.5 },
      { name: '王府井大街', lat: 39.9138, lng: 116.4107, tags: ['shopping', 'food'], dur: '2小时', desc: '百年金街，小吃夜市', score: 8.3 },
      { name: '798 艺术区', lat: 39.984, lng: 116.4955, tags: ['culture', 'shopping'], dur: '2-3小时', desc: '工业风艺术聚落，看展拍照', score: 8.7 },
      { name: '奥林匹克公园', lat: 39.9929, lng: 116.3966, tags: ['nature', 'family'], dur: '2小时', desc: '鸟巢水立方，夜景灯光秀', score: 8.8 },
      { name: '三里屯太古里', lat: 39.936, lng: 116.455, tags: ['shopping', 'nightlife'], dur: '2小时', desc: '潮流地标，夜生活聚集地', score: 8.4 },
      { name: '国家博物馆', lat: 39.905, lng: 116.401, tags: ['culture', 'family'], dur: '3小时', desc: '中华文明通史陈列，免费需预约', score: 9.3 },
      { name: '簋街', lat: 39.932, lng: 116.434, tags: ['food', 'nightlife'], dur: '1.5小时', desc: '麻辣小龙虾一条街，越夜越热闹', score: 8.2 },
    ],
  },
  shanghai: {
    name: '上海',
    center: [31.2304, 121.4737],
    tips: '外滩夜景必看；迪士尼需单独留一整天；地铁覆盖极广。',
    foods: '生煎包、小笼包、本帮红烧肉、蟹粉拌面、排骨年糕',
    pois: [
      { name: '外滩', lat: 31.2397, lng: 121.4998, tags: ['culture', 'nightlife'], dur: '1.5小时', desc: '万国建筑群对望陆家嘴天际线', score: 9.7 },
      { name: '东方明珠', lat: 31.2397, lng: 121.5063, tags: ['family'], dur: '2-3小时', desc: '登塔 360° 俯瞰浦江两岸', score: 9.2 },
      { name: '豫园·城隍庙', lat: 31.2273, lng: 121.4921, tags: ['culture', 'food'], dur: '2-3小时', desc: '明代园林 + 南翔小笼', score: 9.0 },
      { name: '南京路步行街', lat: 31.234, lng: 121.475, tags: ['shopping', 'food'], dur: '2小时', desc: '中华商业第一街', score: 8.5 },
      { name: '武康路', lat: 31.209, lng: 121.439, tags: ['culture', 'shopping'], dur: '1.5小时', desc: '梧桐掩映的历史名街，武康大楼打卡', score: 8.9 },
      { name: '田子坊', lat: 31.211, lng: 121.469, tags: ['culture', 'shopping'], dur: '1.5小时', desc: '石库门里的文创弄堂', score: 8.4 },
      { name: '新天地', lat: 31.219, lng: 121.476, tags: ['nightlife', 'shopping'], dur: '1.5小时', desc: '石库门改造的时尚街区', score: 8.5 },
      { name: '静安寺', lat: 31.223, lng: 121.445, tags: ['culture'], dur: '1小时', desc: '闹市中的千年古刹，金顶辉煌', score: 8.6 },
      { name: '上海博物馆', lat: 31.229, lng: 121.47, tags: ['culture', 'family'], dur: '3小时', desc: '青铜书画馆藏一流，免费', score: 9.1 },
      { name: '迪士尼乐园', lat: 31.144, lng: 121.657, tags: ['family'], dur: '全天', desc: '奇妙一整天，烟花秀别错过', score: 9.5 },
      { name: '陆家嘴滨江', lat: 31.24, lng: 121.503, tags: ['nature', 'nightlife'], dur: '1.5小时', desc: '滨江步道看对岸外滩夜景', score: 8.8 },
    ],
  },
  hangzhou: {
    name: '杭州',
    center: [30.2741, 120.1551],
    tips: '西湖建议骑行环游；春季赏茶最佳；灵隐寺清晨人少。',
    foods: '西湖醋鱼、龙井虾仁、东坡肉、片儿川、定胜糕',
    pois: [
      { name: '西湖·断桥残雪', lat: 30.259, lng: 120.152, tags: ['nature', 'culture'], dur: '2小时', desc: '白娘子传说地，西湖十景之首', score: 9.6 },
      { name: '灵隐寺', lat: 30.242, lng: 120.096, tags: ['culture'], dur: '2-3小时', desc: '江南禅宗名刹，飞来峰石刻', score: 9.4 },
      { name: '雷峰塔', lat: 30.231, lng: 120.149, tags: ['culture'], dur: '1.5小时', desc: '登塔览西湖全景，夕阳绝佳', score: 9.0 },
      { name: '龙井村', lat: 30.217, lng: 120.118, tags: ['nature', 'food'], dur: '2小时', desc: '茶园漫步，品一杯明前龙井', score: 9.0 },
      { name: '九溪烟树', lat: 30.21, lng: 120.115, tags: ['nature'], dur: '2小时', desc: '溪流茶园秘境，徒步天堂', score: 9.1 },
      { name: '西溪湿地', lat: 30.276, lng: 120.068, tags: ['nature', 'family'], dur: '3-4小时', desc: '城市绿肺，摇橹船穿行芦苇荡', score: 9.2 },
      { name: '河坊街', lat: 30.242, lng: 120.167, tags: ['food', 'shopping', 'culture'], dur: '2小时', desc: '南宋御街古味小吃', score: 8.5 },
      { name: '湖滨银泰 in77', lat: 30.255, lng: 120.16, tags: ['shopping', 'nightlife'], dur: '2小时', desc: '西湖边的潮流商圈，音乐喷泉', score: 8.6 },
      { name: '苏堤春晓', lat: 30.242, lng: 120.14, tags: ['nature'], dur: '1.5小时', desc: '骑行苏堤，一步一景', score: 9.3 },
    ],
  },
  chengdu: {
    name: '成都',
    center: [30.5728, 104.0668],
    tips: '大熊猫基地务必早上去（熊猫上午最活跃）；火锅点微辣起步。',
    foods: '火锅、串串香、担担面、钟水饺、兔头、冰粉',
    pois: [
      { name: '大熊猫繁育研究基地', lat: 30.733, lng: 104.147, tags: ['family', 'nature'], dur: '3-4小时', desc: '看滚滚吃竹子打滚，早去最佳', score: 9.8 },
      { name: '宽窄巷子', lat: 30.667, lng: 104.06, tags: ['culture', 'food', 'shopping'], dur: '2小时', desc: '清代少城遗存，茶馆慢生活', score: 8.8 },
      { name: '锦里古街', lat: 30.645, lng: 104.049, tags: ['food', 'culture', 'nightlife'], dur: '2小时', desc: '三国主题古街，夜景灯笼很美', score: 8.6 },
      { name: '武侯祠', lat: 30.646, lng: 104.048, tags: ['culture'], dur: '2小时', desc: '三国迷圣地，红墙竹影出片', score: 9.0 },
      { name: '春熙路·太古里', lat: 30.657, lng: 104.083, tags: ['shopping', 'nightlife', 'food'], dur: '2-3小时', desc: '爬墙大熊猫 IFS，时尚与市井交融', score: 8.9 },
      { name: '人民公园', lat: 30.659, lng: 104.06, tags: ['nature', 'culture'], dur: '1.5小时', desc: '鹤鸣茶社喝盖碗茶，体验掏耳朵', score: 8.7 },
      { name: '杜甫草堂', lat: 30.659, lng: 104.027, tags: ['culture', 'nature'], dur: '2小时', desc: '诗圣故居，园林清幽', score: 8.8 },
      { name: '都江堰', lat: 30.997, lng: 103.618, tags: ['culture', 'nature'], dur: '半天', desc: '两千年水利工程奇迹', score: 9.3 },
      { name: '建设路小吃街', lat: 30.675, lng: 104.1, tags: ['food', 'nightlife'], dur: '1.5小时', desc: '本地人的深夜食堂', score: 8.4 },
    ],
  },
  xian: {
    name: '西安',
    center: [34.3416, 108.9398],
    tips: '兵马俑务必请讲解；城墙建议傍晚骑行看落日；回民街深处更地道。',
    foods: '肉夹馍、羊肉泡馍、biangbiang面、凉皮、镜糕',
    pois: [
      { name: '秦始皇兵马俑', lat: 34.384, lng: 109.2785, tags: ['culture', 'family'], dur: '3-4小时', desc: '世界第八大奇迹，地下军团', score: 9.9 },
      { name: '西安城墙', lat: 34.258, lng: 108.94, tags: ['culture', 'nature'], dur: '2小时', desc: '保存最完整的古城墙，骑行一圈', score: 9.4 },
      { name: '大雁塔·大唐不夜城', lat: 34.218, lng: 108.964, tags: ['culture', 'nightlife'], dur: '3小时', desc: '盛唐天街灯火璀璨，免费演出多', score: 9.5 },
      { name: '回民街', lat: 34.262, lng: 108.938, tags: ['food'], dur: '2小时', desc: '千年回坊，深夜也热气腾腾', score: 8.7 },
      { name: '陕西历史博物馆', lat: 34.222, lng: 108.951, tags: ['culture', 'family'], dur: '3小时', desc: '周秦汉唐国宝云集，提前预约', score: 9.6 },
      { name: '钟鼓楼广场', lat: 34.261, lng: 108.939, tags: ['culture', 'nightlife'], dur: '1小时', desc: '晨钟暮鼓，古城中心地标', score: 8.9 },
      { name: '华清宫', lat: 34.361, lng: 109.213, tags: ['culture'], dur: '2-3小时', desc: '杨贵妃温泉宫，长恨歌演出', score: 8.8 },
      { name: '小雁塔·西安博物院', lat: 34.243, lng: 108.938, tags: ['culture', 'nature'], dur: '1.5小时', desc: '清幽古塔，人少景美', score: 8.5 },
    ],
  },
}

/** 每天的线路颜色 */
export const DAY_COLORS = ['#2563eb', '#ea580c', '#16a34a', '#9333ea', '#e11d48']

/** 节奏对应的每日行程点数量 */
export const PACE_SLOTS: Record<string, number> = { relaxed: 3, normal: 4, intense: 5 }

export const PACE_LABELS: Record<string, string> = { relaxed: '悠闲', normal: '适中', intense: '暴走' }

export const INTEREST_OPTIONS = [
  { tag: 'culture', label: '🏛️ 历史人文' },
  { tag: 'nature', label: '🌿 自然风光' },
  { tag: 'food', label: '🍜 地道美食' },
  { tag: 'shopping', label: '🛍️ 逛街购物' },
  { tag: 'family', label: '👨‍👩‍👧 亲子乐园' },
  { tag: 'nightlife', label: '🌃 夜生活' },
]
