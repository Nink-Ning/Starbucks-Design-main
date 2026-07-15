---
name: starbucks-getting-started
description: "Starbucks UI installation and setup guide. Use for installing @sbux/starbucks-design-react, importing styles, configuring on-demand loading (babel-plugin-import or tree-shaking), and TypeScript setup."
user-invocable: false
---

# 快速开始

## 安装

```bash
# npm
npm install @sbux/starbucks-design-react

# yarn
yarn add @sbux/starbucks-design-react

# pnpm
pnpm add @sbux/starbucks-design-react
```

**Peer Dependencies**: `react >= 18`、`react-dom >= 18`

## 全量引入

```tsx
import React from 'react';

// Starbucks UI 主题自动注入，无需手动引入 CSS

function App() {
  return (
    <div>
      <Button type="primary">Hello Starbucks</Button>
    </div>
  );
}
```

## 按需加载（推荐）

Starbucks UI 底层使用 Arco Design，按需加载配置与 Arco Design 一致。

### 方式一：使用 babel-plugin-import

```bash
npm install babel-plugin-import --save-dev
```

```json
// .babelrc 或 babel.config.js
{
  "plugins": [
    ["import", { "libraryName": "@arco-design/web-react", "libraryDirectory": "es", "style": true }]
  ]
}
```

### 方式二：使用 ESM tree-shaking

```tsx
import Button from '@arco-design/web-react/es/Button';
import '@arco-design/web-react/es/Button/style/css';
```

## 图标库

图标从 Arco Design 图标包导入（`@arco-design/web-react` 已作为依赖安装）：

```tsx
import { IconSearch, IconPlus } from '@arco-design/web-react/icon';

<Button icon={<IconSearch />}>搜索</Button>
```

## TypeScript 支持

Starbucks UI 使用 TypeScript 编写，内置完整类型定义，无需额外安装 `@types`。

```tsx

```

所有组件 Props 类型均可通过 `import type { XxxProps }` 导入。

## 浏览器兼容性

支持所有现代浏览器及 IE11+（需 polyfill）。

| 浏览器 | 版本 |
|--------|------|
| Chrome | 最新 2 个版本 |
| Firefox | 最新 2 个版本 |
| Safari | 最新 2 个版本 |
| Edge | 最新 2 个版本 |
| IE | 11 (需 polyfill) |

## 关键依赖

`@sbux/starbucks-design-react` 依赖 `@arco-design/web-react`（>=2.63.0），底层依赖会自动安装。

| 依赖 | 用途 |
|------|------|
| `@arco-design/web-react` | 底层 Arco Design 组件库 |
| `dayjs` | 日期时间处理 |
