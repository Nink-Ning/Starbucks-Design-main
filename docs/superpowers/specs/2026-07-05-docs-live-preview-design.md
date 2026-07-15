# 文档站代码块实时预览设计

## 问题

当前文档站（Vue 和 React）的组件示例只有代码块，没有实时渲染的组件预览。用户只能看到源代码，看不到组件实际长什么样。

## 目标

让 Vue 和 React 文档站的所有组件示例都显示「上方实时预览 + 下方源代码」的交互卡片，**不改动 markdown 文档的内容逻辑**。

## 框架现状

| | Vue 文档 | React 文档 |
|---|---|---|
| **站点框架** | VitePress | Docusaurus v3.6.0 |
| **当前状态** | `DemoPreview.vue` 已注册但未使用；markdown 用 ` ```vue ` 纯代码块 | `@docusaurus/theme-live-codeblock` 已安装配置；markdown 用 ` ```jsx live ` 但预览可能未生效 |
| **目标体验** | 预览 + 代码（只读，可复制） | 预览 + 代码（只读，可复制） |

---

## Vue 文档方案

### 技术选型：`vite-plugin-markdown-preview`

基于 Vite 插件 + markdown-it 的社区方案，自动拦截 ```` ```vue preview```` 代码块，将 `<template>` 提取为实时 Vue 组件渲染在预览区，原始代码展示在下方。

### 配置变更

**新增依赖：**

```json
// packages/docs/vue/package.json
{
  "devDependencies": {
    "vite-plugin-markdown-preview": "^x.x.x"
  }
}
```

**VitePress 配置：**

```ts
// packages/docs/vue/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import { MarkdownPreview } from 'vite-plugin-markdown-preview'

export default defineConfig({
  vite: {
    plugins: [MarkdownPreview()],
  },
  markdown: {
    config(md) {
      // 注册 markdown-it 预览插件
    },
  },
})
```

**主题适配：**

改造 `DemoPreview.vue` 为 `vite-plugin-markdown-preview` 所需的 `CodePreview` 组件，保留现有布局（上方预览区 + 下方代码区），复用已有的 CSS 样式。

### Markdown 变更

所有 ` ```vue ` → ` ```vue preview `（全局机械替换，不涉及内容改动）。

### 变更文件清单

```
packages/docs/vue/
├── package.json                           ← +vite-plugin-markdown-preview
├── .vitepress/
│   ├── config.ts                          ← +vite.plugins + markdown.config
│   └── theme/
│       ├── DemoPreview.vue                ← 改造为 CodePreview 适配组件
│       └── index.ts                       ← 注册 CodePreview
└── components/**/*.md                     ← ```vue → ```vue preview
```

---

## React 文档方案

### 技术基础

`@docusaurus/theme-live-codeblock` (v3.6.0) 已安装并注册，依赖 `react-live` 实现实时预览。markdown 中 ` ```jsx live ` 代码块会被编译为可交互的 React 组件。

### 诊断步骤

1. 启动 React 文档 dev server，观察 console 是否有报错
2. 检查 `react-live` 是否正确安装（为 `theme-live-codeblock` 的 peer dependency）
3. 确认组件 import 路径 `@sbux/starbucks-design-react` 在预览环境中可解析
4. 如需注册全局组件（如 Space、Button 等），通过 swizzle `ReactLiveScope` 全局导入

### 可能的修复

**若 `react-live` 缺失：**

```json
// packages/docs/react/package.json
{
  "dependencies": {
    "react-live": "^3.x"
  }
}
```

**若组件作用域未注册：**

```tsx
// packages/docs/react/src/theme/ReactLiveScope/index.tsx (swizzle)
import * as StarbucksUI from '@sbux/starbucks-design-react';

const ReactLiveScope = {
  ...StarbucksUI,
  // 其他全局变量
};

export default ReactLiveScope;
```

### 变更文件清单（预计）

```
packages/docs/react/
├── package.json                           ← 可能 +react-live
├── docusaurus.config.ts                   ← 可能 +liveCodeBlock 配置
└── src/theme/ReactLiveScope/
    └── index.tsx                          ← swizzle，注册全局组件
```

---

## 效果预期

完成后，每个组件 demo 将显示为：

```
┌─────────────────────────────────────┐
│  [Primary] [Secondary] [Dashed] ...  │  ← 实时渲染的组件预览
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ ```vue preview                      │  ← 语法高亮的源代码
│ <template>                          │     （可复制，只读）
│   <Space>                           │
│     <Button type="primary">...</    │
│   </Space>                          │
│ </template>                         │
│ ```                                 │
└─────────────────────────────────────┘
```

---

## 不做的事

- 不在线可编辑（不引入 CodeSandbox / StackBlitz）
- 不改变 markdown 内容逻辑
- 不重构 DemoPreview.vue 的布局设计（已有样式复用）
- 不新增全局依赖重（如 monaco-editor）
