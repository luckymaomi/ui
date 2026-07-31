# 新窗口执行提示词

你现在负责在 `C:\Users\Administrator\Desktop\repository\ui` 完成 `ui` 项目的一次性生产级静态迁移。不要重新讨论产品方向，不要创建第二套计划；当前唯一执行合同是根目录 `plan.md`。

需求、产品事实、迁移地图和专业计划基线已提交到本地 `master`。不要重复提交初始化文档；直接从当前工作区开始建立应用骨架并执行计划。

## 开始前必须读取

按顺序完整读取：

1. `AGENTS.md`
2. `spec.md`
3. `README.md`
4. `migration-map.md`
5. `plan.md`
6. `rapid-dev-skill.md`
7. `.agents/skills/ui-dev/SKILL.md`
8. `.agents/skills/plan/SKILL.md`

源项目只读研究目录是 `C:\Users\Administrator\Desktop\repository\stylekit`。不要修改源项目，不要读取旧提交/旧分支寻找兼容行为，不要把源 Next.js 后端架构复制到目标。

## 当前确认的产品

这是一个中文首发的纯前端 UI 风格与设计规则资料库，服务前端设计师、产品设计师和前端开发者。必须完整迁移风格库、场景筛选、风格详情和 136+ 展示页、动效、鼠标交互、动效词汇、组件样式、配方、模板、颜色/渐变/阴影/背景、字体/字号/间距、设计原则、视觉层级、UI 提示词、前端指南、搜索、筛选、主题切换、交互演示、复制代码、复制提示词和浏览器/静态文件下载。

目标技术栈已经敲定：Astro static + React Islands + TypeScript strict + Tailwind CSS 4，GitHub Pages 正式地址 `https://luckymaomi.github.io/ui/`，资源基路径 `/ui/`，分支 `master`，MIT 版权人 `luckymaomi`。英文不进入首发验收；文案集中为类型化字典，为未来 i18n 留接入点。

本地生产效果必须与 GitHub Pages 一样。根目录必须实现 `start.py`：默认执行正式构建，随后不改写 `dist/`，而是把同一份 `dist/` 挂载到 `http://127.0.0.1:4567/ui/` 并打开浏览器。Astro 开发服务器只用于热更新，不是最终效果验收入口。

## 执行规则

- 这是专业模式：每完成一个可验证切片，立即更新 `plan.md` checklist、当前事实和验证记录；新事实推翻设计时先更新计划再改实现。
- 先完成全局语义调查、唯一事实 owner 和源到目标映射，再写应用代码；不要边猜边批量复制。
- 断裂式重建唯一静态主干，不保留兼容别名、旧 locale 双轨、旧 API、server action 或过渡层。
- 只交生产级闭环：静态构建、目录/详情/展示、搜索/筛选、主题、交互、复制、下载、资源基路径、可访问结构、文档和验证必须一起完成。
- 只写正向测试。测试保护真实结果：目录可用、搜索/筛选返回、详情内容可渲染、演示产生状态变化、复制/下载成功、静态页面可访问、GitHub Pages `/ui/` 子路径可用。不要写旧文件/旧路由/旧字符串/旧依赖不存在的反向测试，也不要用源码扫描冒充删除验收。
- 视觉审美由 owner 人工验收；自动证据只覆盖结构、加载、焦点、状态、交互、构建和目标路径。
- PowerShell 运行包管理器使用 `npm.cmd`、`npx.cmd`。不要把未来能力写成已完成，不要把一次构建绿灯写成视觉验收通过。
- `start.py` 只使用 Python 标准库，支持 `--check`、`--port`、`--no-build`、`--no-open`，正确处理构建失败、端口失败和 Ctrl+C；本地生产验收与 GitHub Pages 必须消费同一静态产物合同。
- 不读取、输出、提交密钥、令牌、个人数据或私有配置。
- 不要 commit、push、发布或部署，除非我在当前窗口明确授权；默认保持 `master`。

## 必须完成的工作顺序

1. 检查工作区、分支、远端和初始化文件；保护已有改动。
2. 按 `migration-map.md` 建立 Astro/React/TypeScript/Tailwind 骨架、锁文件、`verify` 命令、根目录 `start.py` 和部署配置。
3. 编写一次性确定性迁移器，把 `stylekit` 的静态数据、143 个风格条目/展示、57 个动效、143 个配方、36 个模板、资源、原则、指南和提示词迁移到 `ui/src/content` 与 `ui/public`。正常构建不依赖源目录。
4. 以 Astro `getStaticPaths` 生成唯一中文根路径；使用 `/ui/` base 和 trailing slash，确保 GitHub Pages 深层页面刷新。
5. 用 Astro 静态页面 + React Islands 实现目录、详情、展示、动效、模板、资源、指南、搜索、筛选、主题、交互、复制和下载。
6. 逐项核对本地资源、字体、代码/提示词展示、reduced-motion、键盘焦点、响应式自然流和可访问结构。
7. 完成 GitHub Pages workflow、README、spec、migration map、项目 skill 和计划收口。
8. 运行 `python .\start.py --check`，再用 `start.py` 托管正式 `dist/`，在本地 `/ui/` 完成与发布候选相同的页面和交互验收。
9. 运行短验证和完整验证；失败从首个真实根因修复，不靠重复运行掩盖问题。

## 验证命令

应用骨架成立后，按改动范围运行：

```powershell
npm.cmd run check
npm.cmd run lint
npm.cmd test
npm.cmd run build
python .\start.py --check
npm.cmd run verify
```

另用 `start.py --no-build --no-open` 启动同一 `dist/`，通过静态请求/已授权 Playwright 正向检查首页、风格目录、代表性详情与展示、动效、模板、搜索、场景筛选、主题切换、复制、下载和 `/ui/` 深层刷新。最终报告必须明确实际命令、退出码、正向路径结果、未验证项和剩余风险。

## 收口条件

只有当 `plan.md` 的实现、正向测试、文档、构建、静态预览和人工验收项都有真实证据时，才报告完成。外部发布仍需 owner 在执行窗口明确授权；未授权时先完成本地生产候选并明确记录外部操作状态。
