# ui 迁移项目地图

本文件只拥有 `stylekit -> ui` 的源到目标映射、迁移顺序和证据入口。产品范围以 [`spec.md`](spec.md) 为准，执行合同以 [`plan.md`](plan.md) 为准。

## 1. 项目边界

| 项目 | 路径 | 当前事实 |
| --- | --- | --- |
| 源项目 | `../stylekit` | Next.js 16、React 19、TypeScript、Tailwind 4；含静态内容、展示组件和后端/运营边界 |
| 目标项目 | `.` | `ui`，Astro 静态站；当前只有初始化文档，没有应用实现 |
| 目标分支 | `master` | 已确认 |
| 目标远端 | `https://github.com/luckymaomi/ui.git` | 已确认 |
| 目标发布 | GitHub Pages | 正式地址 `https://luckymaomi.github.io/ui/`，项目路径 `/ui/`，已由 owner 确认 |

## 2. 源项目盘点基线

- `app` 有 291 个 `page.tsx`；`app` 有 76 个 `route.*` API 文件。
- `public` 静态资源约 7.31 MiB。
- `lib/style-preview/styles` 有 143 个风格预览数据文件。
- `app/styles/<slug>/showcase` 有 143 个具体展示目录；另有 `[slug]` 动态详情与展示壳。
- `lib/animations` 有 57 个可迁移动效目录/预览。
- `lib/recipes` 有 143 个风格配方条目。
- `app/templates` 有 36 个具体模板页面。
- `app/[locale]` 与非 locale 页面存在重复的公共内容入口；目标只生成中文根路径。

数字是当前源快照的迁移基线，不是产品成熟度指标；迁移器生成的 manifest 是实现阶段的唯一条目校验入口。

## 3. 目标目录地图

| 目标区域 | 事实 owner | 内容/职责 |
| --- | --- | --- |
| `src/content/styles` | 风格目录 registry | 风格元数据、tokens、颜色、规则、组件代码、提示词、场景和 showcase 关联 |
| `src/content/animations` | 动效 registry | 动效元数据、代码片段、预览参数、词汇关联 |
| `src/content/recipes` | 配方 registry | 143 个风格配方与渲染字段 |
| `src/content/templates` | 模板 catalog | 36 个模板条目、中文说明、风格关联、代码/入口数据 |
| `src/content/resources` | 资源目录 | 颜色、渐变、阴影、背景、字体、字号比例和间距 |
| `src/content/principles` | 设计规则目录 | 设计原则、视觉层级、前端指南、UI 提示词 |
| `src/content/i18n/zh` | 中文文案字典 | 首发中文文案；未来 locale 只从这里接入 |
| `src/pages` | Astro 路由 | 静态列表、详情、展示和资源页面；不拥有目录数据 |
| `src/components` | 展示层 | Astro 结构组件和 React Islands；不保存业务状态 |
| `src/lib` | 浏览器交互规则 | 搜索、筛选、主题、复制、下载、基路径和文本序列化 |
| `public` | 静态资源 | 本地图片、字体和演示资产；使用基路径安全引用 |
| `tools` | 迁移/生成工具 | 一次性确定性迁移器、manifest 和静态构建 smoke，不作为运行时 API |

## 4. 源到目标映射

| 源路径/领域 | 目标处理 | 目标落点 | 正向证据 |
| --- | --- | --- | --- |
| `lib/styles/meta.ts`、`registry.ts`、`types.ts` | 提取唯一风格元数据并规范类型 | `src/content/styles/index.ts` + `styles/*.ts` | 风格目录能生成并可搜索 |
| `lib/styles/*-tokens.ts`、风格主体文件 | 保留颜色、tokens、规则、组件代码和提示词；拆出不需要的运营字段 | `src/content/styles` | 详情页显示并可复制 |
| `lib/style-preview/styles/*.tsx` | 作为静态展示数据/组件迁移 | `src/components/showcases` | 143 个 showcase manifest 与代表页 smoke |
| `app/styles/[slug]` | 去掉 Next page wrapper，改为 Astro `getStaticPaths` | `src/pages/styles/[slug].astro` | 风格详情深层页可访问 |
| `app/styles/<slug>/showcase` | 去掉 Next layout/server 依赖，保留浏览器展示 | `src/pages/styles/[slug]/showcase.astro` + React islands | 展示交互产生状态变化 |
| `lib/animations/*`、`meta.ts`、`vocabulary.ts` | 提取动效 registry、代码和预览参数 | `src/content/animations` | 列表、详情、词汇页可访问 |
| `app/[locale]/animations`、`app/animations` | 合并为中文根路径 | `src/pages/animations` | 动效路径静态生成 |
| `app/mouse-interactions` | 保留内容，改为 Astro 页面与本地 island | `src/pages/mouse-interactions.astro` | 鼠标演示正向 smoke |
| `lib/component-patterns`、`app/component-patterns` | 保留组件模式静态数据与页面 | `src/content/resources/components`、`src/pages/component-patterns.astro` | 组件样式可读/复制 |
| `lib/recipes`、`app/[locale]/recipes`、`app/recipes` | 保留配方数据，合并 locale 双轨 | `src/content/recipes`、`src/pages/recipes` | 配方列表和详情可访问 |
| `lib/templates`、`app/templates/*` | 提取 catalog 与可展示模板内容，改掉 Next wrapper | `src/content/templates`、`src/pages/templates` | 36 个模板入口可访问 |
| `lib/color`、`lib/gradients`、`lib/shadows`、`lib/backgrounds` | 保留静态资源资料和浏览器计算 | `src/content/resources`、对应 Astro 页面 | 资源页面内容可读 |
| `lib/typography`、`lib/type-scale`、`lib/spacing` | 保留字体、字号比例、间距数据 | `src/content/resources/typography` | 资源页面内容可读 |
| `lib/design-principles`、`lib/visual-hierarchy`、`lib/guides` | 保留设计规则与指南 | `src/content/principles` | 原则/指南页面可访问 |
| `lib/prompts`、`app/*prompts` | 保留中文 UI 提示词与代码片段 | `src/content/principles/prompts` | 提示词可读、复制、下载 |
| `public` 中被保留的本地图片/字体/展示资源 | 生成 asset manifest 后复制并改用基路径 | `public` | 构建后资源实际加载 |
| `lib/export` 中纯文本序列化逻辑 | 只保留安全的浏览器 Blob/Clipboard 逻辑 | `src/lib/copy.ts`、`src/lib/download.ts` | 复制/下载正向 smoke |
| `lib/search/synonyms.ts` | 仅保留与静态目录搜索相关的同义词规则 | `src/lib/search` | 搜索返回匹配资料 |

## 5. 源内容不进入目标运行时的边界

以下领域不迁移为目标页面、数据 owner、依赖或运行时入口：登录/用户/个人主页/收藏、admin/admin-login、投稿/评论/评分、workspace/project 保存、Supabase、邮件/订阅、分析/埋点/Vercel Analytics/Vibeloft/Sentry、博客/更新/关于/支持/退款/隐私/条款、产品验证/商业实验/Experience Pack、GitHub Star/PWA、CLI/MCP/API/server route。

这是迁移边界记录，不转化为负向测试。实现窗口通过源选择、依赖审查、构建配置和真实正向路径共同收敛唯一静态主干。

## 6. 路由归一化

| 源公共入口 | 目标唯一入口 |
| --- | --- |
| `/styles` 与 `/zh/styles` | `/styles/` |
| `/styles/[slug]` 与 `/zh/styles/[slug]` | `/styles/[slug]/` |
| `/styles/[slug]/showcase` 与 locale 版本 | `/styles/[slug]/showcase/` |
| `/animations` 与 `/zh/animations` | `/animations/` |
| `/recipes` 与 `/zh/recipes` | `/recipes/` |
| `/templates` 与 locale 版本 | `/templates/` |
| 资源/原则/提示词的 locale 与非 locale 入口 | 中文根路径对应入口 |

不建立旧入口转发；GitHub Pages 只发布目标路径。

## 7. 迁移顺序

1. 先建立目标 Astro 骨架和数据类型，不改源仓库。
2. 迁移风格 registry、tokens、静态资源和一个代表性 showcase，先证明数据/展示合同。
3. 批量生成剩余风格详情/showcase，并以 manifest 驱动完整性检查。
4. 迁移动效、鼠标交互、组件、配方、模板和资源领域。
5. 接入搜索、筛选、主题、复制、下载和所有公共页面。
6. 完成依赖/基路径/资源/文案审计，运行正向验证和人工视觉验收。
7. 生成 GitHub Pages workflow 与发布候选 artifact；发布动作等待 owner 授权。

## 8. 迁移风险与处理

| 风险 | 处理 |
| --- | --- |
| Next server wrapper 或 `next/image` 混入 | 迁移器只提取浏览器组件和静态数据，页面壳由 Astro 重建 |
| 展示组件依赖后端/登录/收藏 | showcase 只接收静态 props；交互状态由 island 管理 |
| `/ui/` 基路径导致资源错链 | 集中 `withBase()` 工具 + 构建后深层页面 smoke |
| 单个数据条目字段缺失 | 迁移器输出类型错误和 manifest；修复源映射后再构建 |
| 动效偏好影响可读性 | reduced-motion 分支保留静态内容和操作入口 |
| 源内容/资源授权信息不清 | 首次提交和发布前由 owner 核对；不复制归属不清的第三方内容 |
