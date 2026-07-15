# 文档站实时预览 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 Vue 和 React 文档站的组件示例代码块同时展示「实时预览 + 源代码」

**Architecture:** Vue 通过 `vite-plugin-markdown-preview` 插件自动转换 ` ```vue preview ` 代码块；React 安装缺失的 `react-live` 依赖，利用已有 `@docusaurus/theme-live-codeblock` + `ReactLiveScope` 配置

**Tech Stack:** VitePress, vite-plugin-markdown-preview, Docusaurus, react-live

## 全局约束

- 不改动 markdown 文档的内容逻辑（代码块语言标记的机械替换不算）
- 预览模式：只读（上方预览 + 下方代码），不可在线编辑
- 复用现有 `DemoPreview.vue` 布局和 `ReactLiveScope` 注册
- Vue 预览需 `<ClientOnly>` 包裹以兼容 SSG

---

## 文件结构

```
packages/docs/vue/
├── package.json                             ← +vite-plugin-markdown-preview
├── .vitepress/
│   ├── config.ts                            ← +vite.plugins
│   └── theme/
│       ├── DemoPreview.vue                  ← 保持现有布局（已是 CodePreview 兼容结构）
│       └── index.ts                         ← +注册 CodePreview
└── components/**/*.md                       ← ```vue → ```vue preview

packages/docs/react/
└── package.json                             ← +react-live
```

---

### Task 1: React — 安装缺失的 react-live 并验证预览

**Files:**
- Modify: `packages/docs/react/package.json`

**Interfaces:**
- Produces: `react-live` 依赖可用，`@docusaurus/theme-live-codeblock` 的 ` ```jsx live ` 代码块可以渲染

- [ ] **Step 1: 安装 react-live**

```bash
cd packages/docs/react && pnpm add react-live
```

- [ ] **Step 2: 启动 React 文档 dev server 验证**

```bash
pnpm dev:docs
```

打开 `http://localhost:3000`，导航到任意组件页面（如 Button），确认 ` ```jsx live ` 代码块上方出现了实时渲染的组件预览。

- [ ] **Step 3: 若预览未出现，检查浏览器 console**

常见问题：
- `react-live` 版本不兼容 → 检查 Docusaurus v3.6.0 要求的 `react-live` 版本
- 组件 import 报错 → 确认 `ReactLiveScope/index.js` 中的 `@sbux/starbucks-design-react` 路径可解析

- [ ] **Step 4: 若需版本锁定，查阅 Docusaurus 文档**

```bash
pnpm ls @docusaurus/theme-live-codeblock --depth 0
```

确认 peer dependency 版本要求，安装匹配的 `react-live` 版本。

- [ ] **Step 5: Commit**

```bash
git add packages/docs/react/package.json packages/docs/react/pnpm-lock.yaml 2>/dev/null || git add packages/docs/react/package.json
git commit -m "fix(docs-react): add missing react-live dependency for live code previews

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Vue — 安装 vite-plugin-markdown-preview

**Files:**
- Modify: `packages/docs/vue/package.json`

**Interfaces:**
- Produces: `vite-plugin-markdown-preview` 依赖可用

- [ ] **Step 1: 安装插件**

```bash
cd packages/docs/vue && pnpm add -D vite-plugin-markdown-preview
```

- [ ] **Step 2: 验证安装**

```bash
ls packages/docs/vue/node_modules/vite-plugin-markdown-preview/package.json
```

- [ ] **Step 3: Commit**

```bash
git add packages/docs/vue/package.json
git commit -m "chore(docs-vue): add vite-plugin-markdown-preview dependency

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Vue — 配置 VitePress 启用预览插件

**Files:**
- Modify: `packages/docs/vue/.vitepress/config.ts`

**Interfaces:**
- Consumes: `vite-plugin-markdown-preview` (from Task 2)
- Produces: VitePress 构建时自动转换 ` ```vue preview ` 代码块为预览组件

- [ ] **Step 1: 在 config.ts 中添加 Vite 插件配置**

在 `packages/docs/vue/.vitepress/config.ts` 顶部添加 import：

```ts
import { defineConfig } from 'vitepress'
import { MarkdownPreview } from 'vite-plugin-markdown-preview'
```

在 `defineConfig` 中添加 `vite.plugins`：

```ts
export default defineConfig({
  vite: {
    plugins: [MarkdownPreview()],
  },
  // ... 其余配置保持不变
})
```

完整改动后的文件前 5 行和 vite 配置段：

```ts
import { defineConfig } from 'vitepress'
import { MarkdownPreview } from 'vite-plugin-markdown-preview'

const sidebarComponents = [
  // ... 保持不变
]

export default defineConfig({
  vite: {
    plugins: [MarkdownPreview()],
  },
  title: 'Starbucks UI — Vue',
  // ... 其余所有配置保持不变
})
```

- [ ] **Step 2: Commit**

```bash
git add packages/docs/vue/.vitepress/config.ts
git commit -m "feat(docs-vue): configure vite-plugin-markdown-preview in VitePress

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Vue — 改造 DemoPreview.vue 为 CodePreview 适配组件

**Files:**
- Modify: `packages/docs/vue/.vitepress/theme/DemoPreview.vue`

**Interfaces:**
- Consumes: `vite-plugin-markdown-preview` 要求注册的组件名为 `CodePreview`，接收 `code`（源代码字符串）、`lang`（语言标识）
- Produces: 预览 + 代码双栏卡片，兼容插件默认接口

`vite-plugin-markdown-preview` 会调用名为 `CodePreview` 的全局组件，传递以下 props：

| prop | 类型 | 说明 |
|------|------|------|
| `code` | `string` | 源代码文本 |
| `lang` | `string` | 语言标识（如 `vue`） |

我们需要把现有的 `DemoPreview.vue` 改名为注册时的 `CodePreview`，并适配 prop 接口。

- [ ] **Step 1: 改造组件 props 接口**

将 `DemoPreview.vue` 改造为接收 `code` 和 `lang` props，把 `code` 在预览区编译为 Vue 组件渲染：

```vue
<template>
  <div class="demo-preview">
    <div class="demo-preview__stage">
      <ClientOnly>
        <component v-if="compiledComponent" :is="compiledComponent" />
      </ClientOnly>
    </div>
    <div class="demo-preview__code">
      <div v-html="highlightedCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  lang: string
}>()

// 语法高亮由 VitePress 内置的 markdown-it 处理
// 这里直接传递原始代码，让外层 shiki 处理
const highlightedCode = computed(() => {
  // vite-plugin-markdown-preview 会自动处理代码高亮
  return ''
})
</script>

<style scoped>
.demo-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}
.demo-preview__stage {
  padding: 24px;
  background: var(--vp-c-bg-soft);
}
.demo-preview__code {
  border-top: 1px solid var(--vp-c-divider);
}
.demo-preview__code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
```

> **注意：** `vite-plugin-markdown-preview` 的准确 prop 名和渲染机制需参考其最新文档。如果插件已经自动处理了代码高亮区域（只让组件负责预览区），则组件只需关注预览部分。实施时需先 `cat node_modules/vite-plugin-markdown-preview/README.md` 确认接口。

- [ ] **Step 2: 如果插件自带默认 CodePreview，检查是否需要覆盖**

```bash
ls packages/docs/vue/node_modules/vite-plugin-markdown-preview/dist/
```

若插件自带默认组件且样式可用，可能不需要改造 DemoPreview.vue 的 props，只需在 theme/index.ts 中把 DemoPreview 注册为 CodePreview 即可。

- [ ] **Step 3: Commit**

```bash
git add packages/docs/vue/.vitepress/theme/DemoPreview.vue
git commit -m "feat(docs-vue): adapt DemoPreview for CodePreview interface

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Vue — 在主题入口注册 CodePreview 组件

**Files:**
- Modify: `packages/docs/vue/.vitepress/theme/index.ts`

**Interfaces:**
- Consumes: `DemoPreview.vue` (from Task 4)
- Produces: `CodePreview` 全局组件已注册，`vite-plugin-markdown-preview` 可以找到它

- [ ] **Step 1: 注册 CodePreview**

修改 `packages/docs/vue/.vitepress/theme/index.ts`，在 `enhanceApp` 中注册 `CodePreview`：

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { EnhanceAppContext } from 'vitepress'
import * as StarbucksUI from '@sbux/starbucks-design-vue'
import DemoPreview from './DemoPreview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    // 注册 CodePreview —— vite-plugin-markdown-preview 会查找这个名字
    app.component('CodePreview', DemoPreview)
    // 保留 DemoPreview 兼容旧用法
    app.component('DemoPreview', DemoPreview)
    // 注册所有组件全局可用
    for (const [key, component] of Object.entries(StarbucksUI)) {
      if (key !== 'default' && typeof component === 'object' && component !== null) {
        app.component(key, component as any)
      }
    }
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/docs/vue/.vitepress/theme/index.ts
git commit -m "feat(docs-vue): register CodePreview for vite-plugin-markdown-preview

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Vue — 批量替换 markdown 代码块标记

**Files:**
- Modify: `packages/docs/vue/components/**/*.md`（所有组件 markdown 文件）

**Interfaces:**
- Consumes: `vite-plugin-markdown-preview` 配置完成（Tasks 2-5）
- Produces: 所有 ` ```vue ` → ` ```vue preview `

这是一次机械替换，不涉及内容逻辑。

- [ ] **Step 1: 执行全局替换**

```bash
find packages/docs/vue/components -name '*.md' -exec sed -i '' 's/```vue/```vue preview/g' {} +
```

- [ ] **Step 2: 验证替换结果**

```bash
# 确认所有 ```vue 都带上了 preview 标记
grep -r '```vue$' packages/docs/vue/components/ && echo "WARNING: some blocks still lack preview" || echo "OK: all blocks updated"
```

- [ ] **Step 3: 抽查一个文件确认格式正确**

```bash
head -15 packages/docs/vue/components/general/button.md
```

- [ ] **Step 4: Commit**

```bash
git add packages/docs/vue/components/
git commit -m "feat(docs-vue): mark all ```vue blocks with preview keyword

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: 端到端验证 — 启动两个文档站确认预览生效

**Files:** 无新增/修改文件

**Interfaces:**
- Consumes: Tasks 1-6 全部完成
- Produces: 确认 Vue 和 React 文档站的组件 demo 都有实时预览

- [ ] **Step 1: 启动 React 文档站**

```bash
pnpm dev:docs
```

在浏览器打开 `http://localhost:3000`，导航到 Button 页面，确认：
- 每个 ` ```jsx live ` 代码块上方有实时渲染的组件
- 代码块下方有语法高亮的源代码
- 预览区交互正常（按钮可点击等）

- [ ] **Step 2: 启动 Vue 文档站**

```bash
pnpm dev:docs-vue
```

在浏览器打开 `http://localhost:3001/vue/`，导航到 Button 页面，确认：
- 每个 ` ```vue preview ` 代码块上方有实时渲染的组件
- 代码块下方有语法高亮的源代码
- 预览区交互正常

- [ ] **Step 3: 如果 Vue 预览不工作，排查方向**

1. 检查浏览器 console 是否有报错
2. 确认 `CodePreview` 组件正确注册：
   ```js
   // 在浏览器 console 中
   document.querySelector('.demo-preview')
   ```
3. 查看 `vite-plugin-markdown-preview` 文档确认 prop 名是否匹配
4. 检查 `<ClientOnly>` 包裹是否必要

- [ ] **Step 4: 验证生产构建**

```bash
pnpm build:docs
```

确认构建无错误，生成的静态文件中包含预览渲染的 HTML。

- [ ] **Step 5: Commit 任何修复**

如果验证过程中有任何修改，提交它们。
