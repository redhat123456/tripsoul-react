# 途灵 TripSoul · AI 互动旅行规划器

React + TypeScript + Vite + Tailwind CSS 构建的地图 × AI 旅行规划器，支持黑夜模式、「关于」弹窗，并配置了 GitHub Actions 自动构建部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev      # 本地热更新 http://localhost:5173
npm run build    # 构建产物输出到 dist/
npm run preview  # 预览构建产物
```

## 自动部署（GitHub Pages）

推送代码到 `main` 分支会自动触发 `.github/workflows/deploy.yml`：安装依赖 → 构建 → 部署到 GitHub Pages。

**首次使用只需配置一次：**

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
2. 仓库 **Settings → Secrets and variables → Actions → New repository secret**
   新增 `VITE_TMAP_KEY` = 你的腾讯地图 Key（[申请地址](https://lbs.qq.com/dev/console/key/manage)）
3. 推送代码即可自动发布；Actions 页面可查看每次构建状态

发布地址形如：`https://<用户名>.github.io/tripsoul-react/`

> 注意：公开部署的页面使用腾讯地图**必须配置自己的 Key**。未配置时本地开发走 WorkBuddy 密钥代理仍可正常预览，但部署到 GitHub 后地图不会加载。

## 目录结构

```
src/
├── components/     UI 组件（Header / PlanForm / ItineraryPanel / ChatPanel / MapView / AboutDialog）
├── config/about.ts 关于页面的作者信息与链接（改这里即可）
├── data/cities.ts  城市景点数据库（加城市、加景点）
├── hooks/          聊天、黑夜模式 Hook
├── lib/
│   ├── planner.ts      AI 行程引擎（打分 / 就近分日聚类 / 时间轴）
│   ├── assistant.ts    AI 助手应答规则（接入真实大模型时替换此文件）
│   ├── mapManager.ts   腾讯地图封装（标记 / 路线 / 信息窗）
│   └── mapLoader.ts    地图 SDK 加载（自有密钥 / 本地代理）
└── types/          类型定义
```
