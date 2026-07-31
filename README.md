# ui

`ui` 是一个中文 UI 风格、设计规则、组件模式、动效和前端提示词资料库。它面向需要快速查找视觉方向、理解设计原则并复制可用代码的设计师与前端开发者，最终以 GitHub Pages 静态站发布。

当前仓库处于专业模式的迁移设计阶段，应用代码尚未建立。产品事实见 [`spec.md`](spec.md)，源到目标的映射见 [`migration-map.md`](migration-map.md)，一次性生产级实施合同见 [`plan.md`](plan.md)，新窗口执行入口见 [`next-window-prompt.md`](next-window-prompt.md)。

## 当前确定的实现方向

- Astro 静态生成 + React Islands + TypeScript 严格类型。
- Tailwind CSS 4 与集中设计 tokens。
- 中文首发；文案集中到类型化字典，未来可接入 i18n。
- GitHub Pages 正式地址为 `https://luckymaomi.github.io/ui/`，项目路径为 `/ui/`。
- 浏览器端完成搜索、筛选、主题切换、演示、复制和下载，不依赖后端、数据库、登录或业务持久化。

## 开发入口

应用实现必须提供根目录 `start.py` 作为唯一的本地生产效果入口：

```powershell
python .\start.py --check
python .\start.py
```

`start.py` 默认执行正式构建，再将未经改写的 `dist/` 挂载到 `http://127.0.0.1:4567/ui/` 并打开浏览器。本地预览与 GitHub Pages 发布使用同一构建产物合同，因此页面、样式、脚本、资源和交互效果一致。`npm.cmd run dev` 只服务热更新开发，不作为最终效果验收入口。

当前尚不存在可运行的 `package.json`、`start.py` 或应用实现；以上是已确认且必须在实施窗口完成的入口合同，不能表述为当前已经可运行。

## 验证

应用骨架建立后，完整验证入口将统一为 `npm.cmd run verify`，并包含 `start.py` 对同一 `dist/` 的本地 `/ui/` 正向烟测。当前尚无可运行验证命令。

## 授权

本项目采用 MIT License，版权人为 `luckymaomi`，详见 [`LICENSE`](LICENSE)。贡献要求见 [`CONTRIBUTING.md`](CONTRIBUTING.md)，安全问题见 [`SECURITY.md`](SECURITY.md)。
