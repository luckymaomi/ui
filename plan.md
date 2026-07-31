# ui 当前任务：一次性静态迁移到生产级 GitHub Pages

> 本文件在 owner 明确启用专业模式后成为本次任务的唯一执行合同。目标是从同级 `stylekit` 仓库完成一次性、断裂式、可验证的前端内容迁移，建立 `ui` 的唯一静态主干；不交 demo、不留兼容壳、不维护旧 Next.js 后端路径。除非 owner 明确授权，执行窗口不 commit、push、发布或部署。

## 需求文档

### 用户与问题

`ui` 服务前端设计师、产品设计师和前端开发者。用户需要按场景快速找到视觉风格，理解颜色/字体/间距/层级/设计原则，查看真实交互展示，并把代码或 UI 提示词带入自己的项目。产品是资料与展示工具，不是社区、账户系统、工作区或运营后台。

### 正向主路径

1. 打开首页，进入风格库、场景入口或某个设计资源类别。
2. 通过搜索、场景、分类、视觉类型和主题筛选找到目标内容。
3. 打开风格详情，阅读设计规则、颜色、字号比例、间距、视觉层级、组件模板、代码和提示词。
4. 打开风格展示、动效或鼠标交互页面，在浏览器中完成交互演示。
5. 使用复制代码、复制提示词或下载按钮获取可继续使用的静态内容。
6. 返回列表、改变筛选、切换主题并继续浏览，全程不依赖账号或服务器状态。

### 必须交付的范围

- 当前风格目录及 136+ 展示页；本次源快照已核验为 143 个风格条目、143 个具体风格展示目录。
- 场景筛选、搜索、风格详情、动效、鼠标交互、动效词汇表。
- 组件样式、配方、模板、颜色、渐变、阴影、背景纹理。
- 字体、字号比例、间距、设计原则、视觉层级。
- UI 提示词、前端设计指南、代码示例、提示词示例。
- 主题切换、交互演示、复制代码、复制提示词、浏览器端静态文件下载。
- 中文首发；英文不进入首发验收，文案集中并类型化以保留未来 i18n 接入点。

### 产品与环境约束

- 目标技术栈：Astro 静态生成、React Islands、TypeScript strict、Tailwind CSS 4。
- 目标交付：GitHub Pages 项目站，正式地址 `https://luckymaomi.github.io/ui/`，资源基路径 `/ui/`。
- 本地生产效果入口固定为根目录 `start.py`：默认正式构建并直接托管同一 `dist/` 到 `http://127.0.0.1:4567/ui/`，本地验收与线上发布不得使用两套页面或构建路径。
- 生产运行时只有静态 HTML/CSS/JS/资源；浏览器状态只服务当前页面交互。
- 源项目由 owner 提供且位于 `../stylekit`；迁移只在 `ui` 目录形成新主干，不修改源项目。
- 当前无必须保留的业务生产数据或外部 API 合同，因此按断裂式重建处理；源项目的历史后端行为不构成兼容目标。

## 当前事实

### 目标仓库事实

- 仓库：`C:\Users\Administrator\Desktop\repository\ui`。
- 分支：`master`；远端：`https://github.com/luckymaomi/ui.git`。
- GitHub Pages 正式地址已由 owner 确认为 `https://luckymaomi.github.io/ui/`，项目资源基路径为 `/ui/`。
- MIT License 版权人已由 owner 确认为 `luckymaomi`，版权年份为 2026。
- owner 已确认本地预览必须与 GitHub Pages 用户可见效果一致；`start.py` 必须托管正式 `dist/`，开发热更新服务器不承担最终验收。
- 已存在 `AGENTS.md`、`spec.md`、`README.md`、`rapid-dev-skill.md`、项目 skills、MIT `LICENSE`、贡献与安全文档。
- 当前只有初始化文档和 skill；没有 `package.json`、Astro 配置、应用源码、测试、构建产物或部署 workflow。
- 初始化扫描建议阶段为 `requirements`；owner 已明确进入专业模式，本计划因此成为当前合同。

### 源仓库事实

- `stylekit` 使用 Next.js 16、React 19、TypeScript 5 和 Tailwind CSS 4。
- 源仓库有 291 个 `page.tsx`、76 个 `route.*` API 文件，`public` 静态资源约 7.31 MiB。
- `lib/style-preview/styles` 有 143 个风格预览数据文件；`app/styles/<slug>/showcase` 有 143 个具体展示目录，另有动态详情/展示壳。
- `lib/animations` 当前有 57 个动画目录及预览；`lib/recipes` 有 143 个按风格组织的配方条目；`app/templates` 有 36 个模板页面。
- 可保留内容主要位于 `lib/styles`、`lib/animations`、`lib/recipes`、`lib/templates`、`lib/prompts`、`lib/component-patterns`、颜色/渐变/阴影/间距/排版/原则目录，以及风格 showcase React 内容和本地 public 资源。
- 源仓库同时含登录、收藏、用户、管理员、投稿、评论、评分、workspace、Supabase、邮件、分析、Vercel Analytics、Vibeloft、Sentry、博客、商业实验、CLI/MCP/API 等边界；这些不进入目标主干。
- 源仓库的 `app/[locale]` 与非 locale 页面存在重复入口；目标以中文根路径为唯一公共路由，不复制 locale 双轨。

### 规则与测试事实

- `rapid-dev-skill.md` 要求事实调查、文档/实现/测试同步、专业模式维护本计划、目标环境验证和明确披露未验证项。
- Kitty、LLM2API 与 ohmyflight 的开发规则共同要求：先调查唯一事实 owner，断裂式重建，不保留兼容路径；长期测试保护真实正向结果，不以旧文件/旧字符串缺席证明删除。
- owner 明确要求本任务只写正向测试；因此计划不包含旧功能缺席测试、反向源码扫描测试或删除断言。

## 失败测试

当前没有可执行的产品测试，原因是 `ui` 还没有应用入口和依赖清单；当前阶段不能把未来功能写成“已通过”。本节只记录启动前的事实，不创建负性测试。

进入实现后，失败首先以正向用户结果表达：构建不能产出静态站、预期页面无法访问、搜索/筛选不能返回匹配资料、展示没有可观察交互、复制/下载不能产生结果，或 GitHub Pages `/ui/` 路径资源无法加载。每个结果只保留最有证明力的一层。

## 目标

完成后，`ui` 是一个单一、可从干净环境重建的中文静态 UI 资料库：

1. `npm.cmd run verify` 在干净安装后成功完成 `astro check`、lint、正向测试和生产构建。
2. Astro 生成首页、所有目录页、风格详情/展示、动效/词汇、鼠标交互、组件、配方、模板、色彩、排版、原则、视觉层级、提示词和指南页面。
3. 页面和资料来自目标仓库内的类型化静态数据与本地资源；构建完成后不需要环境变量、数据库、API Route、登录 session 或服务器进程。
4. 搜索/筛选、主题切换、交互 demo、复制和下载在浏览器中闭环；用户可以从发现内容到获取内容，不产生远程业务状态。
5. 143 个源风格条目与对应展示内容在目标目录中可追踪，所有迁移条目具有唯一 slug 和唯一数据 owner，代码/提示词可渲染、复制或下载。
6. 站点在 GitHub Pages 项目路径 `/ui/` 下的内部链接、CSS、JS、字体、图片、刷新访问和深层页面访问均可用。
7. `python .\start.py` 从同一生产构建生成并托管 `dist/` 到本地 `/ui/`；本地生产预览与 GitHub Pages 使用同一静态产物合同，页面、样式、脚本、资源和交互效果一致。
8. 页面具备可键盘操作、稳定焦点、清晰层级、响应式自然流和不溢出结果；视觉审美由 owner 在目标浏览器完成最终人工验收。

## 不做范围

本次不实现登录、用户/个人主页、收藏、管理员后台、投稿、评论、评分、workspace、项目保存、Supabase、邮件/订阅、分析统计/埋点、Vercel Analytics、Vibeloft、Sentry、博客/更新日志/关于/支持/退款/隐私等非设计内容、产品验证、商业实验、Experience Pack、GitHub Star 实时统计、PWA、CLI、MCP、服务端 API 或任何需要后端持久化的产品能力。

这些内容只作为迁移边界管理，不进入运行时、文档能力列表或长期测试；不通过负向测试证明删除。

## 设计

### 1. 目标目录与事实 owner

```text
ui/
  start.py                  构建并托管生产 dist 的本地唯一验收入口
  src/
    pages/                 Astro 公共路由，全部静态生成
    layouts/               页面壳、SEO、主题属性和基路径链接
    components/            Astro 展示组件与 React Islands
    content/               迁移后的类型化目录与中文文案
      styles/              143 个风格条目、tokens、规则、组件代码、提示词
      animations/          57 个动效条目与演示数据
      recipes/             143 个配方条目
      templates/           36 个模板条目与静态入口
      resources/           colors/gradients/shadows/backgrounds/typography/spacing
      principles/          design-principles/visual-hierarchy/guides/prompts
    lib/                   搜索、筛选、主题、复制、下载和路径工具
    styles/                全局 CSS、设计 tokens、主题变量
  public/                  本地图片、字体、静态展示资源
  tools/                   一次性迁移器、目录完整性和构建烟测
  tests/                   正向目录、数据、交互和构建烟测
  .github/workflows/       GitHub Pages 构建与发布 workflow
```

`spec.md` 拥有产品事实；`migration-map.md` 拥有源到目标映射；`src/content` 拥有迁移后的静态数据；`src/lib` 拥有浏览器交互规则；页面只负责组合和呈现，不重复定义目录事实。

### 2. 页面与路由

- 首页 `/`：产品入口、主要类别、场景入口和可搜索风格入口。
- 风格 `/styles`、`/styles/[slug]`、`/styles/[slug]/showcase`：`getStaticPaths` 从唯一风格目录生成。
- 动效 `/animations`、`/animations/[slug]`、`/animations/vocabulary`；鼠标交互 `/mouse-interactions`。
- 组件 `/component-patterns`；配方 `/recipes`、`/recipes/[id]`；模板 `/templates` 与 36 个具体模板页面。
- 资源 `/colors`、`/gradients`、`/shadows`、`/backgrounds`、`/typography`、`/type-scale`、`/spacing`。
- 原则与指南 `/design-principles`、`/visual-hierarchy`、`/guide`、`/guides`、`/ui-prompts` 及当前提示词分类页。
- 目标路径取消 `[locale]` 双轨，只保留中文根路径；旧 Next 路由不建立兼容转发。
- 生产构建使用 `trailingSlash: "always"` 和 `base: "/ui"`，保证 GitHub Pages 深层静态路径可直接刷新。

### 3. 数据迁移

1. 先读取 `migration-map.md`，建立源文件、目标 owner、消费者和验收证据清单。
2. 编写一次性确定性迁移工具，从 `../stylekit` 的当前源文件提取静态内容，生成目标 `src/content`；迁移器只在迁移阶段运行，正常构建不依赖源仓库。
3. 以源 `lib/styles/meta`/registry 和 `lib/style-preview/styles` 形成一个风格目录 owner，统一 slug、中文名、分类、场景、颜色、tokens、规则、组件代码、提示词和展示关联。
4. 迁移动效 registry/meta/preview、鼠标交互、组件模式、recipes、templates、prompts、guides、colors、gradients、shadows、backgrounds、typography、type-scale、spacing、design-principles 和 visual-hierarchy。
5. 展示组件只迁移浏览器可执行的 React 内容；Next server wrapper、`next/image`、server action、API fetch 和登录/收藏/分析注入改由 Astro 页面壳与 React island 接线。
6. 静态资源复制到 `public/` 并生成确定性 asset manifest；所有图片、字体、代码和下载内容使用基路径工具解析。
7. 中文文案进入 `src/content/i18n/zh.ts` 或同等类型化目录；英文源字段只在未来 i18n 结构需要时保留为可选数据，不生成英文公共路由。

### 4. 交互与浏览器状态

- 搜索使用构建时生成的轻量索引和浏览器本地匹配；不请求搜索 API。
- 场景/分类/类型筛选使用 URL query 与 React island 状态，刷新后可复现当前筛选，不保存业务数据。
- 主题使用 `data-theme` + CSS variables，优先响应系统主题，允许当前浏览器偏好记忆；不建立用户账户同步。
- 复制工具优先使用 Clipboard API，失败时提供可选中的文本/下载出口；下载使用 `Blob`、`URL.createObjectURL` 和确定性文件名。
- 动效和鼠标演示只使用本地 CSS、Web APIs、Anime/GSAP 等已核验的浏览器依赖；每个演示有清晰的静态初始状态、交互状态和 reduced-motion 处理。
- React Islands 只包裹需要浏览器状态的区域；静态内容和 SEO 文本保持 Astro HTML，减少 JS 体积和水合边界。

### 5. 依赖与构建边界

- 运行依赖最小化为 Astro、React/React DOM、Tailwind CSS 4、TypeScript、必要的图标/动画/类名工具；是否保留 CodeMirror、GSAP、Anime 等逐项按实际展示消费者确认。
- 不引入 Supabase、邮件、分析、Sentry、Vercel runtime、Next server、ORM 或任何后端 SDK。
- `astro.config.mjs` 设置 `output: "static"`、`site`、`base`、静态 trailing slash 和必要集成。
- `package.json` 统一提供 `dev`、`build`、`preview`、`check`、`lint`、`test`、`test:e2e`、`verify`；PowerShell 验证统一使用 `npm.cmd`/`npx.cmd`。
- GitHub workflow 使用 Node LTS、锁文件安装、构建并上传 `dist/`；发布步骤只在 owner 授权后执行。

### 6. 本地生产预览与发布同源

- 根目录必须提供只使用 Python 标准库的 `start.py`，默认端口 `4567`，默认绑定 `127.0.0.1`，默认先执行 `npm.cmd run build`（非 Windows 使用 `npm run build`）。
- 构建成功后，脚本不复制、不重写 `dist/`；本地 HTTP handler 将 URL 前缀 `/ui/` 直接映射到 `dist/`，根路径只负责跳转到 `/ui/`。
- 默认打开 `http://127.0.0.1:4567/ui/`；支持 `--port`、`--no-build`、`--no-open` 和 `--check`。`Ctrl+C` 干净停止本地服务器，构建或端口失败返回非零退出码和可读错误。
- `--check` 正向确认 Python 入口、`package.json`、npm 命令和构建配置可用；自动 smoke 在已有 `dist/` 上启动 `start.py --no-build --no-open`，访问 `/ui/` 代表性页面后终止进程。
- GitHub Pages workflow 与 `start.py` 使用相同锁文件、Node 版本约束、Astro 配置和 `npm run build`；构建过程不写入时间戳、随机值或环境专属页面分支，保证同一提交可确定性重建同一用户可见结果。
- `npm.cmd run dev` 只用于源码热更新和开发反馈；视觉验收、正向浏览器 smoke 和发布候选检查一律使用 `start.py` 托管的生产 `dist/`。

### 7. 错误、恢复与安全

- 静态页面加载失败由 GitHub Pages 和构建产物验证负责；页面不依赖运行时远程服务。
- Clipboard 不可用时保留可读代码和下载出口；下载失败时给出用户可观察状态，不静默吞错。
- 所有用户可复制内容经过确定性序列化和安全的文本渲染；HTML/代码展示不执行未审查脚本。
- 不读取、打印、提交密钥、令牌、个人数据或私有配置；workflow 不写入 secret。
- 所有页面支持 `prefers-reduced-motion`，演示失败不阻塞目录、详情、复制和下载主路径。

### 8. 正向测试原则

只测试重建后仍有产品意义的正向结果：

- 类型化目录加载后能提供完整的风格/动效/配方/模板记录。
- 目录搜索与场景筛选能返回预期匹配内容。
- 详情页能渲染规则、tokens、组件代码和提示词。
- 展示/动效/鼠标演示在浏览器中能产生可观察状态变化。
- 复制和下载能生成对应内容。
- 生产构建能提供目标页面及内部资源。
- `/ui/` 基路径下代表性页面能被静态服务器访问和刷新。

不新增旧功能缺席、旧路径不存在、依赖不存在或字符串不存在的负向测试。

## 实施任务

### A. 需求、事实与迁移基线

- [x] 阅读 `rapid-dev-skill.md`、`AGENTS.md`、`ui-dev`、`plan` skill。
- [x] 阅读并参考 `kitty`、`llm2api`、`ohmyflight` 的开发规则，确认全局调查、断裂式重建和正向测试要求。
- [x] 盘点 `ui` 分支、远端、初始化文件和当前工作区。
- [x] 盘点 `stylekit` 的依赖、页面、API、静态资源、风格/动效/配方/模板和可保留数据域。
- [x] 固化 `spec.md`、`README.md` 和 `migration-map.md` 的当前事实与边界。
- [x] owner 确认 GitHub Pages 正式地址 `https://luckymaomi.github.io/ui/`、项目路径 `/ui/` 与 MIT 版权人 `luckymaomi`。

### B. 静态工程骨架

- [ ] 建立 Astro + React + TypeScript strict + Tailwind 4 项目入口和锁文件。
- [ ] 配置 `astro.config` 的 static output、site、base `/ui/`、trailing slash、React integration 和构建目录。
- [ ] 建立 ESLint、TypeScript、Vitest、Playwright/静态 smoke、统一 `verify` 命令和 UTF-8 文件规则。
- [ ] 实现根目录 `start.py`，让一次命令完成生产构建、`/ui/` 前缀静态托管和自动打开浏览器；完成 `--check`、`--port`、`--no-build`、`--no-open` 与 Ctrl+C 收口。
- [ ] 建立全局 CSS tokens、明暗主题、字体加载、可访问焦点和响应式基础布局。
- [ ] 建立 `src/layouts`、`src/components`、`src/lib`、`src/content`、`public`、`tools`、`tests` 的唯一职责边界。

### C. 迁移器与内容目录

- [ ] 编写确定性迁移工具并先用源目录样本运行，输出目标类型和 manifest。
- [ ] 迁移 143 个风格条目、tokens、规则、组件模板、提示词和颜色映射。
- [ ] 迁移 143 个风格展示实现，改造 Next wrapper 为 React island/静态展示组件并保持每个 slug 的唯一关联。
- [ ] 迁移 57 个动效、动效词汇表、鼠标交互和 reduced-motion 处理。
- [ ] 迁移 143 个配方、36 个模板、组件样式、颜色/渐变/阴影/背景、排版、设计原则、视觉层级、提示词和指南。
- [ ] 迁移并审计本地图片、字体、代码资源，生成基路径正确的 asset manifest。
- [ ] 为所有内容建立类型化中文字典、稳定 slug、元数据和搜索字段。

### D. 公共页面与交互

- [ ] 实现首页、全局 layout、导航、面包屑、主题按钮、页脚和可访问的移动/桌面自然流。
- [ ] 实现风格列表、场景筛选、搜索和风格详情/展示页的静态生成。
- [ ] 实现动效列表/详情/词汇、鼠标交互、组件样式、配方和模板页面。
- [ ] 实现颜色、渐变、阴影、背景、字体、字号比例、间距、设计原则、视觉层级、提示词和指南页面。
- [ ] 实现代码/提示词展示、复制反馈、下载反馈和代表性浏览器交互 demo。
- [ ] 完成移动/桌面布局、键盘焦点、语义标题、图片替代文本、reduced-motion 和加载/交互状态。

### E. 边界收敛与文档

- [ ] 让正常构建只消费 `ui` 自己的静态 source；不把 `stylekit` 路径、Next server wrapper 或运行时 API 带入目标构建。
- [ ] 逐项核对 package、Astro config、路由、layout、组件、文案、资源和 workflow 的当前边界，删除迁移过程中产生的无主文件。
- [ ] 同步 `spec.md`、`README.md`、`AGENTS.md`、`CONTRIBUTING.md` 和项目 skill 的验证入口；未验证项保持明确标记。
- [ ] 完成 GitHub Pages workflow、README 部署说明和 `/ui/` 基路径本地复现配置。
- [ ] 文档明确区分热更新开发入口与 `start.py` 生产验收入口，并保证本地和 GitHub Pages 使用同一 `dist/` 合同。

### F. 正向验证与发布候选

- [ ] 运行类型检查、lint、正向目录/数据测试、交互测试和生产构建。
- [ ] 用静态 HTTP 预览服务验证首页、目录、详情、展示、动效、模板、资源和提示词代表性路径。
- [ ] 用 Playwright 或等价浏览器正向 smoke 验证搜索、场景筛选、主题切换、演示、复制和下载。
- [ ] 对 `dist/` 进行 GitHub Pages `/ui/` 子路径预览，确认资源、内部链接和深层页面刷新。
- [ ] 使用 `python .\start.py --check` 和实际 `start.py --no-build --no-open` 正向 smoke，确认本地 `/ui/` 消费的就是生产 `dist/`。
- [ ] owner 在目标浏览器人工验收视觉层级、颜色、间距、字号、比例、动效节奏和整体可读性。
- [ ] 回填本计划所有实际命令、通过项、未验证项和剩余风险；只有全部必需正向路径闭环后才可申请提交/发布。

## 验证计划

### 本地短验证

在每个大切片完成后按改动范围运行：

```powershell
npm.cmd run check
npm.cmd run lint
npm.cmd test
npm.cmd run build
python .\start.py --check
```

命令必须使用目标仓库自己的 `package.json`，不能把源项目 Next 命令当作目标验证。

### 完整验证入口

最终统一入口：

```powershell
npm.cmd run verify
```

`verify` 至少串联：`check`、`lint`、正向 Vitest、生产 `build`、`start.py` 托管同一 `dist/` 的静态预览 smoke 和已授权的浏览器正向 smoke。预计超过一分钟的完整浏览器/发布候选验证由 owner 在目标环境执行；Agent 不用重复运行掩盖不稳定。

### 正向场景矩阵

| 场景 | 观察结果 |
| --- | --- |
| 首页与全局导航 | 首页 HTML、CSS、字体和本地资源加载，导航可到达主要类别 |
| 风格目录 | 目录生成，搜索和场景筛选返回匹配条目 |
| 风格详情 | 颜色、tokens、规则、组件代码和提示词可读且可复制 |
| 风格展示 | 代表性展示页加载并产生交互状态变化 |
| 动效/鼠标交互 | 预览可操作，reduced-motion 仍保留内容可读性 |
| 配方/模板/指南 | 静态内容、代码和提示词可渲染，下载结果可生成 |
| 主题切换 | 页面主题变量更新，焦点和内容层级保持清晰 |
| 复制/下载 | 浏览器得到对应文本或文件，UI 给出完成反馈 |
| GitHub Pages 子路径 | `/ui/` 下深层页面、资源和刷新访问成功 |
| 本地生产预览 | `start.py` 构建并托管同一 `dist/` 到 `/ui/`，代表性页面与交互结果和发布候选一致 |

### 人工验收

owner 负责最终视觉判断：颜色、间距、字号、比例、视觉层级、风格展示还原度、动效节奏、移动/桌面阅读顺序和整体设计质量。Agent 自动证据只覆盖结构、加载、状态、交互和构建事实，不把构建绿灯表述成审美通过。

## 收口

- 完成事实：待实现后回填；当前仅完成需求确认、规则阅读、源项目研究和计划/地图建立。
- 实际命令：待实现窗口按 `npm.cmd run verify`、静态预览 smoke 和授权的浏览器正向 smoke 回填。
- 通过项：当前已通过目标仓库初始化扫描、分支/远端核对和源项目只读盘点；应用实现尚未开始。
- 未验证项：Astro 工程、`start.py`、静态构建、所有迁移页面、交互、GitHub Pages 发布物和 owner 视觉验收均尚未验证。
- 剩余风险：源展示组件与 Next 特定 API 的迁移适配、个别本地资源的基路径和源内容授权边界仍需在实现与发布前核对。
- 外部操作：需求与专业计划基线已提交到本地 `master`；尚未 push、未发布、未部署。应用实现提交仍需在实现完成并经验证后单独授权。
