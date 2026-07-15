# Vue 文档站迁移至 vitepress-demo-preview 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Vue 文档站从自建 demo 预览系统迁移到 vitepress-demo-preview 插件

**Architecture:** 安装 `@vitepress-demo-preview/component` + `plugin` → 替换 config.ts 中的自定义 Vite 插件为 markdown-it 插件 → 替换 theme 中的 DemoPreview 为 AntDesignContainer → 脚本提取 575 个内联 demo 为独立 `.vue` 文件 → 更新 markdown 文件

**Tech Stack:** VitePress, Vue 3, @vitepress-demo-preview (component + plugin), Node.js (迁移脚本)

**Spec:** `docs/superpowers/specs/2026-07-05-vitepress-demo-preview-migration-design.md`

## Global Constraints

- 所有路径基于 `packages/docs/vue/`
- 使用 pnpm 管理依赖
- 组件库包名：`@sbux/starbucks-design-vue`（re-export from `@arco-design/web-vue`）
- Vue SFC demo 文件放在 `demos/<组件名>/` 子目录
- 使用 `<preview path="..." title="..."></preview>` 组件形式（非容器形式）
- 容器风格：AntDesignContainer

---

### Task 1: 安装依赖

**Files:**
- Modify: `packages/docs/vue/package.json`

- [ ] **Step 1: 安装 @vitepress-demo-preview 包**

```bash
cd packages/docs/vue && pnpm add @vitepress-demo-preview/component@^2.5.1 @vitepress-demo-preview/plugin@^1.4.0
```

Expected: 两个包安装成功，`package.json` 自动更新

- [ ] **Step 2: 验证 package.json 变更**

```bash
node -e "const p = require('./packages/docs/vue/package.json'); console.log(p.dependencies['@vitepress-demo-preview/component'], p.dependencies['@vitepress-demo-preview/plugin'])"
```

Expected: 输出两个版本号

- [ ] **Step 3: 提交**

```bash
git add packages/docs/vue/package.json packages/docs/vue/pnpm-lock.yaml
git commit -m "chore(docs-vue): add @vitepress-demo-preview component and plugin dependencies

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: 更新 config.ts — 删除自定义 Vite 插件，加入 markdown-it 插件

**Files:**
- Modify: `packages/docs/vue/.vitepress/config.ts`

**Interfaces:**
- Consumes: `@vitepress-demo-preview/plugin` 的 `containerPreview` 和 `componentPreview`
- Produces: 干净的 VitePress 配置，通过 markdown-it 处理 `<preview>` 标签

- [ ] **Step 1: 删除自定义插件相关代码**

删除以下内容：
- Line 2: `import type { Plugin } from 'vite'`
- Line 3: `import { createHash } from 'crypto'`
- Line 4: `import path from 'path'`
- Lines 117-187: `demoStore` 变量 + `hash()` 函数 + `createMarkdownDemoPlugin()` 函数（全部）
- Line 196: `vite.plugins: [createMarkdownDemoPlugin()]` → 删除整个 `vite` 配置块

- [ ] **Step 2: 添加新的 import**

在文件顶部 import 区域添加：

```ts
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
```

- [ ] **Step 3: 更新 markdown.config**

将当前的 `markdown.config(md) { }` 替换为：

```ts
markdown: {
  config(md) {
    md.use(containerPreview)
    md.use(componentPreview)
  },
},
```

- [ ] **Step 4: 验证最终 config.ts**

```bash
cd packages/docs/vue && npx tsc --noEmit .vitepress/config.ts 2>&1 || true
```

Expected: 无 TypeScript 错误（ignore 可能的项目级配置问题）

- [ ] **Step 5: 提交**

```bash
git add packages/docs/vue/.vitepress/config.ts
git commit -m "refactor(docs-vue): replace custom Vite demo plugin with vitepress-demo-preview markdown-it plugins

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: 更新 theme/index.ts — 替换 DemoPreview 为 AntDesignContainer

**Files:**
- Modify: `packages/docs/vue/.vitepress/theme/index.ts`

**Interfaces:**
- Consumes: `AntDesignContainer` from `@vitepress-demo-preview/component`
- Produces: 全局注册 `demo-preview` 组件 + 保留所有库组件的全局注册

- [ ] **Step 1: 更新 import**

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { EnhanceAppContext } from 'vitepress'
import * as StarbucksUI from '@sbux/starbucks-design-vue'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
```

- [ ] **Step 2: 更新 enhanceApp**

将 `DemoPreview` 相关的注册替换为 `AntDesignContainer`：

```ts
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    // Register vitepress-demo-preview container
    app.component('demo-preview', AntDesignContainer)

    // Register all library components globally so they work in demos without imports
    for (const [key, component] of Object.entries(StarbucksUI)) {
      if (key !== 'default' && typeof component === 'object' && component !== null) {
        app.component(key, component as any)
        // Register A-prefixed alias for Arco Design compatibility
        app.component('A' + key, component as any)
      }
    }
  }
}
```

- [ ] **Step 3: 提交**

```bash
git add packages/docs/vue/.vitepress/theme/index.ts
git commit -m "refactor(docs-vue): replace DemoPreview with AntDesignContainer from vitepress-demo-preview

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: 删除 DemoPreview.vue

**Files:**
- Delete: `packages/docs/vue/.vitepress/theme/DemoPreview.vue`

- [ ] **Step 1: 删除文件**

```bash
rm packages/docs/vue/.vitepress/theme/DemoPreview.vue
```

- [ ] **Step 2: 提交**

```bash
git add packages/docs/vue/.vitepress/theme/DemoPreview.vue
git commit -m "refactor(docs-vue): remove custom DemoPreview component, replaced by vitepress-demo-preview

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: 创建迁移脚本

**Files:**
- Create: `packages/docs/vue/scripts/migrate-demos.ts`

**Interfaces:**
- Consumes: `packages/docs/vue/components/**/*.md`
- Produces: `packages/docs/vue/components/**/demos/<component>/*.vue` + 更新后的 `.md` 文件

- [ ] **Step 1: 创建迁移脚本**

写入 `packages/docs/vue/scripts/migrate-demos.ts`：

```ts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { readdirSync } from 'fs'

// ─── 中文标题 → 英文 slug 映射表 ─────────────────────────────────
const TITLE_MAP: Record<string, string> = {
  '基本用法': 'basic',
  '基本使用': 'basic-usage',
  '自定义图标': 'custom-icon',
  '虚拟列表': 'virtual-list',
  '双向绑定': 'v-model',
  '禁用状态': 'disabled',
  '加载中状态': 'loading-state',
  '加载中': 'loading',
  '尺寸': 'size',
  '不同尺寸': 'sizes',
  'Type': 'type',
  '自定义节点': 'custom-node',
  '自定义触发元素': 'custom-trigger',
  '异步关闭': 'async-close',
  '禁用': 'disabled',
  '回退选项': 'fallback',
  '触发方式': 'trigger',
  '自定义字段名': 'custom-field-name',
  '自定义样式': 'custom-style',
  '自定义分隔符': 'custom-separator',
  '自定义按钮': 'custom-button',
  '字数统计': 'word-count',
  '只使用面板': 'panel-only',
  '允许搜索': 'searchable',
  '允许清除': 'clearable',
  '远程搜索': 'remote-search',
  '消息类型': 'message-type',
  '无边框模式': 'borderless',
  '位置': 'placement',
  '搜索': 'search',
  '输入框状态': 'input-status',
  '输入框尺寸': 'input-size',
  '受控': 'controlled',
  '前缀与后缀': 'prefix-suffix',
  '前缀': 'prefix',
  '默认值': 'default-value',
  '可关闭': 'closable',
  '函数调用': 'function-call',
  '滚动容器': 'scroll-container',
  '滚动': 'scroll',
  '附加内容': 'extra-content',
  '范围选择器': 'range-picker',
  '多选': 'multiple',
  '对齐': 'alignment',
  '动态加载': 'dynamic-load',
  '弹出位置': 'popup-position',
  '错误状态': 'error',
  '布局': 'layout',
  '最多展示标签数量': 'max-tags',
  '最大值': 'max-value',
  '组合示例': 'combined',
  '组合使用': 'combined-usage',
  '组合按钮': 'button-group',
  '纵向时间轴': 'vertical-timeline',
  '总结行': 'summary-row',
  '子选项懒加载': 'lazy-load-options',
  '子树懒加载': 'lazy-load-tree',
  '自适应高度': 'auto-height',
  '自动切换': 'auto-switch',
  '自动调整字体大小': 'auto-font',
  '自动标签宽度': 'auto-label-width',
  '自定义状态': 'custom-status',
  '自定义轴线样式': 'custom-axis-style',
  '自定义预览操作栏': 'custom-preview-actions',
  '自定义颜色': 'custom-color',
  '自定义渲染': 'custom-render',
  '自定义选择框展示内容': 'custom-select-display',
  '自定义选项渲染': 'custom-option-render',
  '自定义文案': 'custom-text',
  '自定义图片和文案': 'custom-image-text',
  '自定义头像路径': 'custom-path',
  '自定义提示': 'custom-tooltip',
  '自定义搜索按钮': 'custom-search-button',
  '自定义输入框的展示值': 'custom-input-display',
  '自定义收起按钮': 'custom-collapse-button',
  '自定义上传请求': 'custom-upload-request',
  '自定义上传节点': 'custom-upload-node',
  '自定义筛选菜单': 'custom-filter-menu',
  '自定义前缀&后缀': 'custom-prefix-suffix',
  '自定义评分字符': 'custom-rate-character',
  '自定义面板渲染': 'custom-panel-render',
  '自定义空状态元素': 'custom-empty',
  '自定义开关的值': 'custom-switch-value',
  '自定义开关的颜色': 'custom-switch-color',
  '自定义节点内容': 'custom-node-content',
  '自定义关闭元素': 'custom-close-element',
  '自定义关闭按钮': 'custom-close-button',
  '自定义复选框': 'custom-checkbox',
  '自定义分页按钮': 'custom-pager-button',
  '自定义单选框': 'custom-radio',
  '自定义触发字符': 'custom-trigger-char',
  '自定义尺寸': 'custom-size',
  '自定义操作按钮': 'custom-action-button',
  '自定义表格元素': 'custom-table-element',
  '自定义表单组件': 'custom-form-component',
  '自定义表单校验状态': 'custom-form-validation',
  '自定义标题栏': 'custom-title-bar',
  '自定义标签': 'custom-tag',
  '自定义背景颜色': 'custom-bg-color',
  '自定义按钮 Icon': 'custom-icon-button',
  '自定义 TreeData 的字段名称': 'custom-tree-data-fields',
  '自定义 data 的字段名称': 'custom-data-fields',
  '自定义': 'custom',
  '状态点': 'status-dot',
  '周选择器': 'week-picker',
  '指示器': 'indicator',
  '只读模式': 'readonly',
  '支持清除': 'allow-clear',
  '支持更多内容配置': 'more-content',
  '折叠方向': 'collapse-direction',
  '照片墙': 'picture-wall',
  '长按钮': 'long',
  '展示总数': 'show-total',
  '展开子菜单': 'expand-submenu',
  '展开行': 'expand-row',
  '展开图标位置': 'expand-icon-position',
  '展开图标': 'expand-icon',
  '栅格偏移': 'grid-offset',
  '栅格卡片': 'grid-card',
  '栅格布局': 'grid-layout',
  '增加操作项': 'extra-actions',
  '在布局中使用': 'in-layout',
  '允许创建': 'allow-create',
  '月份选择器': 'month-picker',
  '预设颜色和历史颜色': 'preset-colors',
  '预设时间快捷选择': 'preset-time',
  '右键菜单': 'context-menu',
  '幽灵节点': 'ghost-node',
  '用户头像上传': 'avatar-upload',
  '隐藏图标': 'hide-icon',
  '隐藏时销毁': 'destroy-on-hide',
  '隐藏连接线': 'hide-connector',
  '隐藏灰色日期': 'hide-gray-dates',
  '已上传的文件列表': 'file-list',
  '移除前校验': 'before-remove',
  '页码跳转': 'page-jumper',
  '验证表单2': 'form-validation-2',
  '验证表单': 'form-validation',
  '颜色格式': 'color-format',
  '颜色': 'color',
  '严格选择模式': 'strict-mode',
  '选择框大小': 'select-size',
  '悬浮状态底色': 'hover-bg',
  '悬浮菜单': 'hover-menu',
  '悬浮按钮菜单': 'hover-button-menu',
  '行选择器（单选框）': 'row-selector-radio',
  '行选择器': 'row-selector',
  '笑脸分级': 'smiley-rating',
  '小型步骤条': 'mini-steps',
  '小红点': 'dot-badge',
  '消息提示': 'message-tip',
  '响应式栅格': 'responsive-grid',
  '响应式收缩': 'responsive-shrink',
  '响应式的 Grid 布局': 'responsive-grid-layout',
  '响应式侧边栏': 'responsive-sidebar',
  '响应式布局': 'responsive',
  '限制上传数量': 'limit-upload',
  '限制可勾选数量': 'limit-checked',
  '显示输入框': 'show-input',
  '显示省略': 'show-ellipsis',
  '显示连接线': 'show-connector',
  '显示箭头元素': 'show-arrow',
  '显示 Caption': 'show-caption',
  '下拉选择的头部': 'dropdown-header',
  '下拉框的页头和页脚': 'dropdown-header-footer',
  '下拉菜单的页头': 'dropdown-menu-header',
  '下拉菜单的页脚': 'dropdown-menu-footer',
  '下拉菜单滚动': 'dropdown-scroll',
  '无轴线模式': 'no-axis',
  '无限长列表': 'infinite-list',
  '无边框卡片': 'borderless-card',
  '文件夹上传': 'folder-upload',
  '文本域状态': 'textarea-status',
  '文本省略和提示': 'text-ellipsis',
  '文本内容': 'text-content',
  '文本': 'text',
  '网络型内嵌卡片': 'network-card',
  '完整功能': 'full-featured',
  '拖拽上传': 'drag-upload',
  '拖拽锚点': 'drag-anchor',
  '拖拽': 'drag',
  '图形骨架屏': 'shape-skeleton',
  '图片水印': 'image-watermark',
  '图标列表样式': 'icon-list-style',
  '图标按钮': 'icon',
  '图标': 'icon',
  '透明底色': 'transparent-bg',
  '头像组': 'group',
  '跳过确认': 'skip-confirm',
  '添加文本标签': 'add-text-label',
  '添加描述文案': 'add-description',
  '提示类型': 'tip-type',
  '提示标题': 'tip-title',
  '缩起内嵌菜单': 'collapse-inline-menu',
  '搜索树': 'search-tree',
  '搜索框（加载中）': 'search-box-loading',
  '搜索框': 'search-box',
  '四种尺寸': 'four-sizes',
  '水平布局': 'horizontal-layout',
  '数值动画': 'number-animation',
  '竖直滑动条': 'vertical-slider',
  '竖直分割线': 'vertical-divider',
  '竖直步骤条': 'vertical-steps',
  '竖排列表样式': 'vertical-list',
  '树型穿梭框': 'tree-transfer',
  '树形数据展示': 'tree-data',
  '鼠标悬浮样式': 'hover-style',
  '输入框组合': 'input-group',
  '受控的高宽': 'controlled-size',
  '手风琴模式': 'accordion',
  '手动上传': 'manual-upload',
  '是否改变 hash': 'change-hash',
  '时间轴展示类型': 'timeline-type',
  '十二小时制': '12-hour',
  '剩余进度条的颜色': 'remaining-color',
  '省略': 'ellipsis',
  '深色模式导航': 'dark-nav',
  '设置时区': 'set-timezone',
  '设置回填方式': 'set-fill-mode',
  '设置步长': 'set-step',
  '设置 value 格式': 'set-value-format',
  '上传前校验': 'before-upload',
  '容器中': 'in-container',
  '日历内容定制': 'calendar-content',
  '任意长度的评分': 'arbitrary-rate',
  '确认框类型': 'confirm-type',
  '确认对话框': 'confirm-dialog',
  '全选': 'select-all',
  '全屏': 'fullscreen',
  '全局禁用': 'global-disabled',
  '全局提示的位置': 'notification-position',
  '全部展示': 'show-all',
  '区块间隔': 'block-gap',
  '区分大小写': 'case-sensitive',
  '切换拦截': 'switch-intercept',
  '切换方向': 'switch-direction',
  '嵌套数据': 'nested-data',
  '嵌套评论': 'nested-comment',
  '嵌套面板': 'nested-panel',
  '嵌套抽屉': 'nested-drawer',
  '前置、后置标签': 'addon-tags',
  '其他属性的响应式': 'responsive-props',
  '配合表单使用': 'with-form',
  '排序和筛选': 'sort-filter',
  '排序': 'sort',
  '年份选择器': 'year-picker',
  '内嵌菜单': 'inline-menu',
  '内部卡片': 'inner-card',
  '描述信息': 'description',
  '面板分割嵌套': 'split-nested',
  '密码输入框': 'password-input',
  '密码模式': 'password-mode',
  '迷你进度条': 'mini-progress',
  '迷你箭头步骤条': 'mini-arrow-steps',
  '迷你尺寸': 'mini-size',
  '每页条数': 'page-size',
  '路径模式': 'path-mode',
  '列表元素': 'list-item',
  '链接的状态': 'link-status',
  '联动选择框': 'linked-select',
  '懒加载': 'lazy-load',
  '控制下拉框的展开收起': 'control-dropdown',
  '可选中': 'selectable',
  '可拖拽表格': 'draggable-table',
  '可拖动': 'draggable',
  '可伸缩侧边栏': 'collapsible-sidebar',
  '可切换步骤条': 'switchable-steps',
  '可交互': 'interactive',
  '可关闭标签': 'closable-tab',
  '可编辑表格': 'editable-table',
  '开关类型': 'switch-type',
  '开关尺寸': 'switch-size',
  '卡片日历': 'card-calendar',
  '卡片化': 'card-style',
  '静态位置': 'static-position',
  '警告状态': 'warning',
  '精度和步长': 'precision-step',
  '禁用选项': 'disabled-option',
  '禁用部分时间选项': 'disabled-time',
  '进度条状态': 'progress-status',
  '进度条大小': 'progress-size',
  '节点占一行': 'node-full-row',
  '节点占据一整行。': 'node-full-row',
  '交互按钮': 'interactive-button',
  '箭头步骤条': 'arrow-steps',
  '渐隐切换': 'fade-switch',
  '渐进加载': 'progressive-load',
  '渐变进度条': 'gradient-progress',
  '简洁模式': 'simple-mode',
  '简洁卡片': 'simple-card',
  '简单模式': 'simple',
  '加载状态': 'loading',
  '季度选择器': 'quarter-picker',
  '级联菜单': 'cascade-menu',
  '回复框': 'reply-box',
  '环形进度条': 'circle-progress',
  '环绕间距': 'wrap-spacing',
  '横向时间轴': 'horizontal-timeline',
  '横向 Anchor': 'horizontal-anchor',
  '滚动条类型': 'scrollbar-type',
  '滚动偏移量': 'scroll-offset',
  '滚动到指定表单字段': 'scroll-to-field',
  '挂载位置': 'mount-position',
  '挂载节点': 'mount-node',
  '固定状态改变回调': 'fixed-change-callback',
  '固定列': 'fixed-column',
  '固钉样式': 'affix-style',
  '更新延迟': 'update-delay',
  '更新通知内容': 'update-notification',
  '更新内容': 'update-content',
  '更灵活的内容展示': 'flexible-content',
  '更多页码': 'more-pages',
  '跟随鼠标显示弹出框': 'follow-mouse',
  '格栅列表': 'grid-list',
  '格式化展示值': 'format-display',
  '格式化输入': 'format-input',
  '复选框组选项': 'checkbox-group-options',
  '复选框组': 'checkbox-group',
  '复选框多选': 'checkbox-multi',
  '分组选项': 'group-options',
  '分组表头与固定列': 'group-header-fixed',
  '分组表头': 'group-header',
  '分组': 'group',
  '分页尺寸': 'pagination-size',
  '分页': 'pagination',
  '分隔符': 'separator',
  '范围选择': 'range-select',
  '额外信息和帮助信息': 'extra-info',
  '额外节点': 'extra-node',
  '额外的页脚': 'extra-footer',
  '额外操作': 'extra-actions',
  '多选选择器': 'multi-select',
  '多选模式': 'multi-mode',
  '多行文本': 'multi-line',
  '多图预览': 'multi-image-preview',
  '多级菜单': 'multi-level-menu',
  '多个触发方式': 'multi-trigger',
  '多层嵌套': 'multi-level-nest',
  '对话框的宽度': 'dialog-width',
  '段落': 'paragraph',
  '独立使用': 'standalone',
  '动态增减标签页': 'dynamic-tabs',
  '动态控制选取范围': 'dynamic-range',
  '动态表单': 'dynamic-form',
  '动态编辑标签': 'dynamic-edit-tag',
  '动画': 'animation',
  '定制组件图标': 'custom-component-icon',
  '定制预设范围位置': 'custom-preset-position',
  '定制伸缩杆内容': 'custom-resize-bar',
  '定制日期单元格': 'custom-date-cell',
  '定制节点图标': 'custom-node-icon',
  '定制回填方式': 'custom-fill-mode',
  '定制格式': 'custom-format',
  '定制额外节点': 'custom-extra-node',
  '定制步长': 'custom-step',
  '定制按钮文字': 'custom-button-text',
  '顶部固定': 'top-fixed',
  '顶部公告': 'top-alert',
  '顶部导航菜单': 'top-nav-menu',
  '调整列宽': 'resize-column',
  '点状步骤条': 'dot-steps',
  '点类型指示符': 'dot-indicator',
  '底部固定': 'bottom-fixed',
  '倒计时组件': 'countdown',
  '导航步骤条': 'nav-steps',
  '弹窗偏移量': 'popup-offset',
  '弹出框的页脚': 'popup-footer',
  '弹出方向': 'popup-direction',
  '弹出层表单': 'popup-form',
  '单元格合并': 'cell-merge',
  '单选框组选项': 'radio-group-options',
  '单选框组方向': 'radio-group-direction',
  '单选框组': 'radio-group',
  '单向': 'one-way',
  '单列样式': 'single-column',
  '单独使用预览组件': 'standalone-preview',
  '单独使用多图预览组件': 'standalone-image-preview',
  '带有下拉菜单': 'with-dropdown',
  '带有文字的分割线': 'divider-with-text',
  '带有面包屑': 'with-breadcrumb',
  '带图标的页签': 'tab-with-icon',
  '带图标的选项': 'option-with-icon',
  '带图标的标签': 'tag-with-icon',
  '带时间的日期选择': 'datetime-picker',
  '带复选框的树': 'tree-checkbox',
  '带边框样式': 'bordered-style',
  '带边框的标签': 'bordered-tag',
  '大小和形状': 'size-shape',
  '垂直间距': 'vertical-gap',
  '垂直布局': 'vertical-layout',
  '触发器': 'trigger',
  '抽屉位置': 'drawer-position',
  '成功状态': 'success',
  '操作项': 'actions',
  '参数化配置': 'parameterized',
  '步骤进度条': 'step-progress',
  '步骤错误': 'step-error',
  '布局示例': 'layout-example',
  '布局模式': 'layout-mode',
  '不同状态': 'status-variants',
  '不同类型': 'variants',
  '不同大小菜单': 'menu-sizes',
  '不可选取的时间': 'disabled-times',
  '表头吸顶': 'sticky-header',
  '表格属性': 'table-props',
  '表格滚动': 'table-scroll',
  '表单异步校验': 'async-validation',
  '表单布局': 'form-layout',
  '标题': 'title',
  '标签文本位置': 'label-position',
  '标签文本对齐': 'label-align',
  '标签放置位置': 'label-placement',
  '标签的颜色': 'tag-color',
  '标签的尺寸': 'tag-size',
  '半选': 'indeterminate',
  '按钮状态': 'button-status',
  '按钮形状': 'shape',
  '按钮下拉框': 'button-dropdown',
  '按钮模式': 'button-mode',
  '按钮类型的单选框组': 'button-radio-group',
  '按钮类型单选框组的尺寸': 'button-radio-group-size',
  '按钮尺寸': 'button-size',
  '按钮类型': 'button-type',
  'v-model 的触发事件': 'v-model-trigger',
  'UTC 时间': 'utc-time',
  'Tips': 'tips',
  'RTL 视图': 'rtl-view',
  'HTTP状态码 500': 'http-500',
  'HTTP状态码 404': 'http-404',
  'HTTP状态码 403': 'http-403',
  'Grid 布局': 'grid-layout',
  'Flex 用法': 'flex-usage',
  '全局提示的位置': 'notification-position',
  'FAQ': 'faq',
}

// ─── 工具函数 ────────────────────────────────────────────

function slugify(title: string): string {
  if (TITLE_MAP[title]) return TITLE_MAP[title]
  // Fallback: remove non-alphanumeric, lowercase, replace spaces with hyphens
  console.warn(`  ⚠ No mapping for title: "${title}" — using fallback slug`)
  const fallback = title
    .toLowerCase()
    .replace(/[^\w\s一-鿿-]/g, '') // keep Chinese chars
    .replace(/\s+/g, '-')
    .slice(0, 40)
  return fallback || 'unnamed'
}

function findPrecedingHeading(lines: string[], fenceLineIdx: number): string | null {
  for (let i = fenceLineIdx - 1; i >= 0; i--) {
    const m = lines[i].match(/^##\s+(.+)/)
    if (m) return m[1].trim()
  }
  return null
}

function extractDemoContent(fenceContent: string): string {
  // Remove leading/trailing whitespace
  return fenceContent.trim()
}

function extractComponentName(filePath: string): string {
  // e.g., .../components/data-display/avatar.md → "avatar"
  return filePath.split('/').pop()!.replace(/\.md$/, '')
}

// ─── 主逻辑 ──────────────────────────────────────────────

const COMPONENTS_DIR = join(__dirname, '..', 'components')

function migrateFile(mdPath: string): { demos: number; title: string } {
  const content = readFileSync(mdPath, 'utf-8')
  const lines = content.split('\n')
  const componentName = extractComponentName(mdPath)
  const demosDir = join(dirname(mdPath), 'demos', componentName)
  const titleSlugCounts: Record<string, number> = {}

  let result = ''
  let i = 0
  let demoCount = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim().match(/^```vue\s+preview\s*$/)) {
      // Find the content between fences
      let fenceContent = ''
      i++
      while (i < lines.length && !lines[i].trim().match(/^```$/)) {
        fenceContent += lines[i] + '\n'
        i++
      }
      // Skip closing ```
      i++

      // Find preceding heading for title
      const heading = findPrecedingHeading(lines, i - fenceContent.split('\n').length - 2)
      const title = heading || `Demo ${demoCount + 1}`
      let slug = slugify(title)

      // Handle duplicate slugs
      if (titleSlugCounts[slug] !== undefined) {
        titleSlugCounts[slug]++
        slug = `${slug}-${titleSlugCounts[slug]}`
      } else {
        titleSlugCounts[slug] = 0
      }

      // Write demo file
      if (!existsSync(demosDir)) {
        mkdirSync(demosDir, { recursive: true })
      }
      const demoPath = join(demosDir, `${slug}.vue`)
      writeFileSync(demoPath, extractDemoContent(fenceContent), 'utf-8')

      // Generate replacement
      const relPath = `./demos/${componentName}/${slug}.vue`
      result += `<preview path="${relPath}" title="${title}"></preview>\n\n`

      demoCount++
    } else {
      result += line + '\n'
      i++
    }
  }

  writeFileSync(mdPath, result, 'utf-8')
  return { demos: demoCount, title: componentName }
}

// ─── 入口 ─────────────────────────────────────────────────

function main() {
  const categories = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  let total = 0

  for (const category of categories) {
    const categoryDir = join(COMPONENTS_DIR, category)
    const mdFiles = readdirSync(categoryDir)
      .filter(f => f.endsWith('.md'))

    for (const mdFile of mdFiles) {
      const mdPath = join(categoryDir, mdFile)
      const { demos, title } = migrateFile(mdPath)
      if (demos > 0) {
        console.log(`  ✅ ${category}/${title}.md → ${demos} demos extracted`)
        total += demos
      }
    }
  }

  console.log(`\n🎉 Done! ${total} demos extracted across ${categories.length} categories.`)
}

main()
```

- [ ] **Step 2: 验证脚本语法**

```bash
cd packages/docs/vue && npx tsx --eval "console.log('tsx available')" 2>&1 || pnpm add -D tsx
```

Expected: tsx 可用（用于运行 TypeScript 脚本）

- [ ] **Step 3: Dry-run 测试（只解析不写入）**

先手动验证一个文件：

```bash
cd packages/docs/vue && npx tsx scripts/migrate-demos.ts
```

Expected: 输出每个文件的提取结果

- [ ] **Step 4: 提交**

```bash
git add packages/docs/vue/scripts/
git commit -m "feat(docs-vue): add demo migration script (vue preview → vitepress-demo-preview)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: 运行迁移脚本

**Files:**
- Create: `packages/docs/vue/components/**/demos/<component>/*.vue`（575 个文件）
- Modify: `packages/docs/vue/components/**/*.md`（73 个文件）

- [ ] **Step 1: 运行迁移脚本**

```bash
cd packages/docs/vue && npx tsx scripts/migrate-demos.ts
```

Expected: 无错误，输出 `✅ Done! XXX demos extracted.`

- [ ] **Step 2: 抽查验证**

验证一个 markdown 文件是否正确更新：

```bash
head -30 packages/docs/vue/components/data-display/avatar.md
```

Expected: `` ```vue preview `` 已被替换为 `<preview path="..." title="..."></preview>`

验证 demo 文件是否正确创建：

```bash
ls packages/docs/vue/components/data-display/demos/avatar/
```

Expected: 看到 `basic.vue`、`auto-font.vue`、`group.vue` 等文件

验证 demo 文件内容正确：

```bash
cat packages/docs/vue/components/data-display/demos/avatar/basic.vue
```

Expected: 完整的 Vue SFC（template + script setup）

- [ ] **Step 3: 统计结果**

```bash
echo "Demo files:" && find packages/docs/vue/components -path '*/demos/*.vue' | wc -l
echo "Still has vue preview fences:" && grep -rl '```vue preview' packages/docs/vue/components/ --include="*.md" | wc -l
```

Expected: `Demo files: 575`、`Still has vue preview fences: 0`

- [ ] **Step 4: 清理新增的 devDependency**

如果 tsx 是临时安装的，从 devDependencies 移除：

```bash
cd packages/docs/vue && pnpm remove tsx 2>/dev/null; echo "ok"
```

- [ ] **Step 5: 提交**

```bash
git add packages/docs/vue/components/
git commit -m "feat(docs-vue): migrate 575 demos from inline ```vue preview to vitepress-demo-preview format

- Extract all inline Vue SFC demos into demos/<component>/*.vue files
- Replace ```vue preview fences with <preview path=\"...\" title=\"...\"> tags
- 73 markdown files updated, 575 demo files created

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: 验证

- [ ] **Step 1: 启动开发服务器**

```bash
cd packages/docs/vue && pnpm dev
```

Expected: VitePress 成功启动，无编译错误

- [ ] **Step 2: 浏览器验证（由人工完成）**

打开 `http://localhost:3001/vue/`，检查：
- Avatar 页面：demo 卡片正确渲染
- Button 页面：所有 demo 正确渲染
- 代码切换（显示/隐藏）按钮功能正常
- 复制代码按钮功能正常
- 随机抽查 5-10 个组件页面

- [ ] **Step 3: 构建验证**

```bash
cd packages/docs/vue && pnpm build
```

Expected: 构建成功，无报错

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "chore(docs-vue): final verification after vitepress-demo-preview migration

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 验证清单

| 检查项 | 验证方式 |
|--------|----------|
| `pnpm dev:docs-vue` 正常启动 | 无编译错误 |
| Demo 卡片正确渲染 | 浏览器检查 Avatar / Button / Input 页面 |
| 代码切换功能 | 点击 "显示源代码" / "隐藏源代码" |
| 复制代码功能 | 点击复制按钮 |
| `pnpm build:docs`（vue 部分）成功 | 构建无报错 |
| 无残留的 `preview ```vue fence` | `grep -rl '```vue preview' components/` 为空 |
| 无残留的旧代码引用 | `grep -rl 'DemoPreview' .vitepress/` 为空 |
