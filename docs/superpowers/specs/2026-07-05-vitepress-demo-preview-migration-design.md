# Vue 文档站迁移至 vitepress-demo-preview 设计文档

## 背景

当前 Vue 文档站（`packages/docs/vue/`）使用自建的 demo 预览系统：自定义 Vite 插件 + `DemoPreview.vue` + 主题注册。该方案存在以下问题：

1. **Bug**：预览渲染不稳定，DemoPreview 的 slot 机制与实际渲染存在 gap
2. **UI/UX 不够好**：缺乏代码复制、折叠等标准功能
3. **维护成本高**：~70 行 Vite 插件 + 独立 Vue 组件，均为自建代码

目标：用社区标准方案 `vitepress-demo-preview` 替换整个自建系统。

## 目标插件

- **仓库**: [flingyp/vitepress-demo-preview](https://github.com/flingyp/vitepress-demo-preview)
- **包**: `@vitepress-demo-preview/component` + `@vitepress-demo-preview/plugin`
- **原理**: markdown-it 插件，通过 `<preview path="...">` 标签或 `:::preview` 容器语法引用独立 `.vue` demo 文件
- **容器风格**: AntDesignContainer（与 Arco Design 视觉接近）

## 影响范围

- **73 个 markdown 文件**，共 **575 个 `preview ```vue` 代码块**
- 配置文件：`config.ts`、`theme/index.ts`
- 删除：`DemoPreview.vue`
- 新增：575 个 demo `.vue` 文件

## 架构变更

```
当前（自定义方案）                          →    目标（vitepress-demo-preview）
═══════════════════════════════════════════     ═══════════════════════════════════════

config.ts 内置 Vite 插件                        config.ts 使用 markdown-it 插件
  ├─ 拦截 .md 文件                               ├─ md.use(containerPreview)
  ├─ 提取 ```vue preview fence                   ├─ md.use(componentPreview)
  ├─ 写入虚拟模块 (demoStore Map)                └─ 删除所有自定义插件代码
  └─ 替换为 <DemoPreview ... />

theme/index.ts                                  theme/index.ts
  ├─ 注册 DemoPreview                              ├─ 注册 demo-preview → AntDesignContainer
  └─ 全局注册所有组件 ✅ 保留                      ├─ 导入插件 CSS
                                                    └─ 全局注册所有组件 ✅ 保留

theme/DemoPreview.vue    ❌ 删除

组件 .md 文件                                     组件 .md 文件
  ```vue preview                                    <preview path="./demos/avatar/basic.vue"
    <template>...</template>                          title="基本用法"></preview>
    <script setup>...</script>
    ```

                                                  demos/avatar/
                                                    ├─ basic.vue          ← 独立 SFC 文件
                                                    ├─ auto-font.vue
                                                    └─ ...
```

## 文件结构

```
packages/docs/vue/
├── .vitepress/
│   ├── config.ts                        ← 删除 Vite 插件，加入 markdown-it plugin
│   └── theme/
│       ├── index.ts                     ← 替换 DemoPreview 为 AntDesignContainer
│       ├── custom.css                   ← 保留不变
│       └── DemoPreview.vue              ← ❌ 删除
├── components/
│   ├── general/
│   │   ├── button.md
│   │   ├── link.md
│   │   ├── ...
│   │   └── demos/
│   │       ├── button/
│   │       │   ├── basic.vue
│   │       │   ├── status.vue
│   │       │   ├── size.vue
│   │       │   └── ...
│   │       └── ...
│   ├── data-display/
│   │   ├── avatar.md
│   │   └── demos/
│   │       ├── avatar/
│   │       │   ├── basic.vue
│   │       │   ├── auto-font.vue
│   │       │   ├── group.vue
│   │       │   ├── interactive.vue
│   │       │   ├── custom-path.vue
│   │       │   └── size-shape.vue
│   │       └── ...
│   └── ...（7 个分类）
└── package.json                         ← 新增 @vitepress-demo-preview/component & plugin
```

### demo 文件命名

用 markdown 中 `## 标题` 对应的英文 slug：
- `基本用法` → `basic`
- `自动调整字体大小` → `auto-font`
- `交互按钮` → `interactive`
- 映射表覆盖不到的回退为拼音

## 配置变更

### package.json

```diff
  "dependencies": {
    "@sbux/starbucks-design-vue": "workspace:*",
+   "@vitepress-demo-preview/component": "^2.5.1",
+   "@vitepress-demo-preview/plugin": "^1.4.0"
  }
```

### .vitepress/config.ts

删除 ~70 行自定义插件代码（`createHash`、`demoStore`、`createMarkdownDemoPlugin()` 等），替换为：

```ts
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// 在 markdown.config 中：
md.use(containerPreview)
md.use(componentPreview)
```

### .vitepress/theme/index.ts

```ts
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// enhanceApp 中：
app.component('demo-preview', AntDesignContainer)
// 全局组件注册保留不变
```

## 迁移脚本

脚本负责 575 个 demo 的自动提取。核心逻辑：

1. 遍历所有 `.md` 文件
2. 解析 frontmatter（跳过）
3. 找到所有 `preview ```vue` fence 块
4. 提取 `<template>`、`<script setup>`、`<style scoped>` 内容
5. 找到 fence 前面的 `## 标题`，映射为英文 slug
6. 写入 `demos/<组件名>/<slug>.vue`
7. 将 fence 替换为 `<preview path="./demos/<组件名>/<slug>.vue" title="中文标题"></preview>`
8. 写回 `.md` 文件

### 标题 → slug 映射规则

维护一个中文标题到英文 slug 的映射表，覆盖常用标题：

| 中文标题 | slug |
|----------|------|
| 基本用法 | basic |
| 按钮类型 | type |
| 按钮状态 | status |
| 按钮尺寸 | size |
| 图标按钮 | icon |
| 文字按钮 | link |
| 按钮形状 | shape |
| 长按钮 | long |
| 按钮组 | group |
| 加载状态 | loading |
| 禁用状态 | disabled |
| 头像组 | group |
| 交互按钮 | interactive |
| 自定义头像路径 | custom-path |
| 大小和形状 | size-shape |
| 自动调整字体大小 | auto-font |
| 响应式布局 | responsive |
| ... | ... |

未匹配到的标题使用拼音 slug 作为回退。

## 边界情况

| 情况 | 处理 |
|------|------|
| 只有 `<template>`，无 script/style | 写入纯 template |
| 有 `<template>` + `<script setup>` | 完整写入 SFC |
| 有 `<template>` + `<script setup>` + `<style scoped>` | 完整写入 SFC |
| 有 `<template>` + `<style scoped>`（无 script） | 写入 template + style |
| 空的 `<template></template>` | 保留原样 |
| 重复标题（多个 `## 基本用法`） | 加后缀：`basic`、`basic-2` |
| import 语句 | 保留（`@sbux/starbucks-design-vue` 的 import） |

## 实施步骤

| 步骤 | 内容 |
|------|------|
| 1 | 安装 `@vitepress-demo-preview/component` + `@vitepress-demo-preview/plugin` |
| 2 | 更新 `config.ts`：删除 Vite 插件代码，加 markdown-it 配置 |
| 3 | 更新 `theme/index.ts`：替换 DemoPreview 为 AntDesignContainer |
| 4 | 删除 `DemoPreview.vue` |
| 5 | 编写并运行迁移脚本，提取 575 个 demo → 独立 `.vue` 文件 |
| 6 | 更新 73 个 `.md` 文件 |
| 7 | `pnpm dev:docs-vue` 验证，按分类逐个检查 |

## 验证标准

- `pnpm dev:docs-vue` 正常启动，无报错
- 每个组件页面的 demo 卡片正确渲染
- 代码切换（显示/隐藏）功能正常
- 复制代码功能正常
- `pnpm build:docs`（vue 部分）构建成功
