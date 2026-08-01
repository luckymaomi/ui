<h1 align="center">UI</h1>

<p align="center">
  <strong>中文 UI 风格库、前端设计规则库、React 页面模板库与 AI Agent 设计知识库。</strong>
</p>

<p align="center">
  <a href="https://luckymaomi.github.io/ui/"><img src="https://img.shields.io/badge/GitHub%20Pages-在线访问-111111?style=flat-square&logo=github" alt="在线访问"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-2f855a?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro" alt="Astro 7">
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/视觉风格-143-2457FF?style=flat-square" alt="143 种视觉风格">
</p>

## Agent Summary

`UI` 是一个可被搜索引擎、LLM、AI Agent、代码生成 Agent、设计 Agent 和前端开发 Agent 索引的中文 UI 设计知识库。它提供可浏览、可搜索、可复制、可下载的视觉风格、设计规则、颜色系统、CSS tokens、React 组件、页面模板、交互动效、鼠标交互、AI UI 提示词和真实运行示例。

```yaml
name: UI
canonical: https://luckymaomi.github.io/ui/
language: zh-CN
license: MIT
framework: Astro 7 + React 19 + TypeScript + Tailwind CSS 4
content:
  visual_styles: 143
  react_showcases: 143
  interactive_animations: 57
  component_recipes: 143
  react_page_templates: 35
capabilities: search, filter, preview, interact, copy, download, static-deep-link
agent_files: robots.txt, llms.txt, sitemap.xml
```

## Canonical Agent Entry Points

| Intent | Canonical URL | Indexed content |
| --- | --- | --- |
| 全站入口 | https://luckymaomi.github.io/ui/ | UI 设计知识库总入口 |

**在线访问：[https://luckymaomi.github.io/ui/](https://luckymaomi.github.io/ui/)**
| 视觉风格 | https://luckymaomi.github.io/ui/styles/ | 143 种 UI 风格、色板、规则、tokens、CSS、真实展示 |
| React 模板 | https://luckymaomi.github.io/ui/templates/ | 35 个完整 React 页面模板与响应式预览 |
| 交互动效 | https://luckymaomi.github.io/ui/animations/ | 57 个 UI 动效、动画词汇与运行示例 |
| 组件配方 | https://luckymaomi.github.io/ui/recipes/ | 143 组组件样式与 className 配方 |
| 设计资源 | https://luckymaomi.github.io/ui/resources/ | 颜色、渐变、阴影、背景、字体、字号、间距、层级 |
| AI 提示词 | https://luckymaomi.github.io/ui/ui-prompts/ | 中文 UI 生成提示词与场景化 Prompt |
| Agent 文档 | https://luckymaomi.github.io/ui/llms.txt | 内容范围、页面合同、主要入口 |
| 抓取规则 | https://luckymaomi.github.io/ui/robots.txt | robots 与 sitemap 位置 |
| URL 索引 | https://luckymaomi.github.io/ui/sitemap.xml | 全部 canonical URL |

## Indexed Knowledge

- Visual styles: Neo-Brutalism, Editorial, Neumorphism, Glassmorphism, Bento Grid, Corporate Clean, Geometric Bold, Minimalist, Dark Mode, Retro Vintage, macOS Vibrancy, Masonry Flow, Cottagecore, Risograph, Mecha, Gothic Lolita, Cyber Chinese, Acid Graphics, Bauhaus, Material Design, Fluent Design, Skeuomorphism, Art Deco, Y2K, Vaporwave, Cyberpunk, Japanese Aesthetic, Anime UI.
- UI engineering: React components, Astro Islands, TypeScript strict, Tailwind CSS, CSS variables, design tokens, responsive layout, accessibility, dark theme, light theme, static site generation, GitHub Pages.
- Product interfaces: SaaS landing page, dashboard, admin panel, analytics, ecommerce product page, portfolio, blog, documentation site, pricing page, authentication, settings, social feed, file manager, chat, calendar, email inbox, music player, travel booking, learning platform, CRM.
- Design systems: color palette, gradients, shadows, background patterns, typography pairing, type scale, spacing scale, grid system, visual hierarchy, design principles, component states, interaction patterns, motion design.
- AI generation: UI prompt, frontend prompt, React prompt, Tailwind prompt, dashboard prompt, landing page prompt, dark mode prompt, design system prompt, v0 prompt, Claude prompt, ChatGPT prompt, code generation prompt.

## Screenshots

![UI 风格库、视觉风格搜索与 React 展示目录](docs/images/01.png)

![几何大胆风、macOS 毛玻璃、瀑布流与响应式布局风格](docs/images/02.png)

![田园核、Risograph、机甲、哥特、赛博中华与酸性平面设计](docs/images/03.png)

![组件配方目录、颜色系统与风格检索结果](docs/images/04.png)

![UI 设计规则、组件示例与前端开发资源](docs/images/05.png)

![React 页面模板、交互动效与设计系统预览](docs/images/06.png)

## Retrieval Keywords

中文 UI 风格库，UI 设计参考，前端设计灵感，网页设计风格，React UI 模板，React 页面模板，React 组件库，Astro UI，Tailwind CSS 组件，TypeScript 前端，设计系统，Design System，UI design system，CSS tokens，design tokens，颜色系统，配色方案，渐变，阴影，背景纹理，字体搭配，字号比例，间距系统，响应式布局，移动端 UI，桌面端 UI，暗色模式，浅色模式，无障碍设计，交互动效，CSS animation，motion design，鼠标交互，组件配方，页面布局，Dashboard UI，SaaS UI，Landing Page，Admin Dashboard，Ecommerce UI，Portfolio UI，Blog UI，Documentation UI，Pricing Page，Authentication UI，Settings UI，CRM UI，AI UI Prompt，UI 提示词，前端提示词，网页生成提示词，v0 prompt，Claude UI prompt，ChatGPT UI prompt，代码生成，Agent knowledge base，LLM friendly documentation，GEO，Generative Engine Optimization，AI search optimization，machine-readable README，中文前端资源，开源 UI 资源，GitHub Pages UI library。

## Local Runtime

Requirements: Node.js 22.12+, npm 10+, Python 3.

```powershell
npm.cmd ci
python .\start.py
```

Production preview: `http://127.0.0.1:4567/ui/`

```powershell
npm.cmd run dev
npm.cmd run verify
```

## Repository Contracts

- [产品事实与验收标准](spec.md)
- [贡献指南](CONTRIBUTING.md)
- [安全政策](SECURITY.md)
- [MIT License](LICENSE)

Content is statically generated under `/ui/`. Each style, animation and template has a canonical deep URL. Runtime UI uses Astro, React and standard DOM APIs. Structured discovery is provided through `robots.txt`, `llms.txt`, `sitemap.xml`, canonical metadata, Open Graph metadata and structured data.
