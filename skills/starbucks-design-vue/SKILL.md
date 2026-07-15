---
name: starbucks-design-vue
description: "Starbucks UI Vue 组件库参考，面向 Vue 3 和 `@sbux/starbucks-design-vue`。当用户要求构建 Vue 页面、创建 Vue UI、使用 Starbucks Vue 编写前端代码、开发 Vue 仪表盘或应用，或提到 Starbucks UI Vue、`@sbux/starbucks-design-vue`、`a-button`、`a-table`、`a-form`、`a-modal`、`a-select`、`Message`、任意 Starbucks Vue 组件名时使用。覆盖安装、全局注册、按需加载、主题、国际化、Vue 3 Composition API 约定、组件属性/事件/插槽、示例、表单、表格、弹窗、导航、数据录入、数据展示、反馈和响应式布局。"
---

# Starbucks UI Vue Skill

`@sbux/starbucks-design-vue` 是 Starbucks UI 的 Vue 3 组件库实现。

## 关键约定

编写 Starbucks UI Vue 代码时始终遵守这些规则：

- 使用 Vue 3。新代码优先使用 `<script setup lang="ts">` 和 Composition API。
- 完整引入：

```ts
import { createApp } from 'vue';
import StarbucksVue from '@sbux/starbucks-design-vue';
import '@sbux/starbucks-design-vue/dist/starbucks.css';
import App from './App.vue';

const app = createApp(App);
app.use(StarbucksVue);
app.mount('#app');
```

- 组件与服务从根包导入：`import { Button, Table, Form, Message } from '@sbux/starbucks-design-vue'`。
- 图标从图标入口导入：`import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon'`。
- 样式完整引入使用 `@sbux/starbucks-design-vue/dist/starbucks.css`。手动按需引入时使用组件样式，例如 `@sbux/starbucks-design-vue/es/button/style/css.js`。
- 默认全局组件标签使用 `a-` 前缀：`<a-button>`、`<a-table>`、`<a-form>`、`<a-form-item>`。
- 模板中的属性使用 kebab-case：`html-type`、`show-jumper`、`row-selection`。
- 事件使用 Vue 语法：`@click`、`@change`、`@page-change`、`@submit-success`。
- 双向绑定使用 `v-model` 或命名形式：`v-model:visible`、`v-model:selected-keys`、`v-model:current`。
- 插槽使用 `#slot-name`；作用域插槽参数以组件文档为准。
- 表单使用 `:model`、`field` 和校验规则；子输入控件用 `v-model`。
- 日期时间组件内部使用 `dayjs`；不要引入 Moment.js。
- 优先使用本 skill 中的 Vue 示例。不要套用 React 专属 API，例如 `Form.useForm`、JSX children 或 `Component.Sub`。

## Skill 索引

需要完整属性、事件、插槽、示例和使用要点时，加载对应参考文件。

### 安装与配置

| 主题 | 文件 | 适用场景 |
|---|---|---|
| 安装 | [getting-started.md](references/overview/getting-started.md) | 安装 `@sbux/starbucks-design-vue`、注册 StarbucksVue、引入样式、配置按需加载 |
| 全局配置 | [config-provider.md](references/overview/config-provider.md) | 使用 `app.use(StarbucksVue, options)` 或 `<a-config-provider>` 配置语言、前缀、尺寸等 |
| 国际化 | [internationalization.md](references/overview/internationalization.md) | 语言包和 `<a-config-provider :locale="...">` | | [internationalization.md](references/overview/internationalization.md) | 语言包和 `<a-config-provider :locale="...">` |
| 架构约定 | [architecture.md](references/overview/architecture.md) | Vue 3 SFC 结构、导入、`v-model`、属性、事件、插槽、组件注册 |

### 通用

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Button | [button.md](references/components/general/button.md) | 操作按钮、加载按钮、图标按钮、按钮组 |
| ConfigProvider | [config-provider.md](references/components/general/config-provider.md) | 全局语言、前缀、尺寸、滚动更新等配置 |
| Icon | [icon.md](references/components/general/icon.md) | 内置图标、图标注册、按需导入、iconfont.cn |
| Link | [link.md](references/components/general/link.md) | 链接及其状态、图标链接 |
| Typography | [typography.md](references/components/general/typography.md) | 标题、段落、文本、省略、复制、编辑 |

### 布局

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Divider | [divider.md](references/components/layout/divider.md) | 水平或垂直分割线 |
| Grid | [grid.md](references/components/layout/grid.md) | 24 栅格、响应式行列布局 |
| Layout | [layout.md](references/components/layout/layout.md) | 页面骨架、页头、侧边栏、内容区、页脚 |
| Space | [space.md](references/components/layout/space.md) | 行内或块级元素间距 |

### 导航

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Breadcrumb | [breadcrumb.md](references/components/navigation/breadcrumb.md) | 页面层级和路由面包屑 |
| Dropdown | [dropdown.md](references/components/navigation/dropdown.md) | 下拉菜单和命令浮层 |
| Menu | [menu.md](references/components/navigation/menu.md) | 侧边导航、顶部导航、子菜单 |
| PageHeader | [page-header.md](references/components/navigation/page-header.md) | 页头、返回操作、面包屑、额外操作 |
| Pagination | [pagination.md](references/components/navigation/pagination.md) | 分页、跳转、页大小切换 |
| Steps | [steps.md](references/components/navigation/steps.md) | 步骤流程和进度 |

### 数据录入

| 组件 | 文件 | 适用场景 |
|---|---|---|
| AutoComplete | [auto-complete.md](references/components/data-entry/auto-complete.md) | 输入建议和搜索补全 |
| Cascader | [cascader.md](references/components/data-entry/cascader.md) | 多级级联选择 |
| Checkbox | [checkbox.md](references/components/data-entry/checkbox.md) | 多选、全选、半选状态 |
| ColorPicker | [color-picker.md](references/components/data-entry/color-picker.md) | 颜色选择 |
| DatePicker | [date-picker.md](references/components/data-entry/date-picker.md) | 日期、周、月、季度、年、范围选择 |
| Form | [form.md](references/components/data-entry/form.md) | 表单、校验、动态字段、布局、提交处理 |
| Input | [input.md](references/components/data-entry/input.md) | 文本输入、搜索、密码、文本域相关模式 |
| InputNumber | [input-number.md](references/components/data-entry/input-number.md) | 数字输入、精度、最小/最大值 |
| InputTag | [input-tag.md](references/components/data-entry/input-tag.md) | 标签输入和编辑 |
| Mention | [mention.md](references/components/data-entry/mention.md) | 在文本中提及用户或主题 |
| Radio | [radio.md](references/components/data-entry/radio.md) | 单选和单选组 |
| Rate | [rate.md](references/components/data-entry/rate.md) | 评分 |
| Select | [select.md](references/components/data-entry/select.md) | 选择器、多选、搜索、选项插槽 |
| Slider | [slider.md](references/components/data-entry/slider.md) | 滑动输入和范围输入 |
| Switch | [switch.md](references/components/data-entry/switch.md) | 布尔开关 |
| Textarea | [textarea.md](references/components/data-entry/textarea.md) | 多行文本输入 |
| TimePicker | [time-picker.md](references/components/data-entry/time-picker.md) | 时间和时间范围选择 |
| Transfer | [transfer.md](references/components/data-entry/transfer.md) | 两栏穿梭选择 |
| TreeSelect | [tree-select.md](references/components/data-entry/tree-select.md) | 树形数据选择 |
| Upload | [upload.md](references/components/data-entry/upload.md) | 文件上传、拖拽上传、图片上传 |
| VerificationCode | [verification-code.md](references/components/data-entry/verification-code.md) | 验证码或 OTP 输入 |

### 数据展示

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Avatar | [avatar.md](references/components/data-display/avatar.md) | 用户头像和头像组 |
| Badge | [badge.md](references/components/data-display/badge.md) | 数字徽标、状态点、通知标记 |
| Calendar | [calendar.md](references/components/data-display/calendar.md) | 日历展示 |
| Card | [card.md](references/components/data-display/card.md) | 内容卡片和卡片栅格 |
| Carousel | [carousel.md](references/components/data-display/carousel.md) | 轮播图 |
| Collapse | [collapse.md](references/components/data-display/collapse.md) | 折叠面板 |
| Comment | [comment.md](references/components/data-display/comment.md) | 评论展示和嵌套评论 |
| Descriptions | [descriptions.md](references/components/data-display/descriptions.md) | 键值详情展示 |
| Empty | [empty.md](references/components/data-display/empty.md) | 空状态 |
| Image | [image.md](references/components/data-display/image.md) | 图片展示和预览 |
| List | [list.md](references/components/data-display/list.md) | 列表和虚拟列表 |
| OverflowList | [overflow-list.md](references/components/data-display/overflow-list.md) | 折叠溢出的列表项 |
| Popover | [popover.md](references/components/data-display/popover.md) | 富内容气泡卡片 |
| Statistic | [statistic.md](references/components/data-display/statistic.md) | 数值、倒计时、指标 |
| Table | [table.md](references/components/data-display/table.md) | 表格、列、排序、筛选、选择、虚拟滚动 |
| Tabs | [tabs.md](references/components/data-display/tabs.md) | 标签页、可编辑标签页、卡片式标签页 |
| Tag | [tag.md](references/components/data-display/tag.md) | 标签、可选标签、可关闭标签 |
| Timeline | [timeline.md](references/components/data-display/timeline.md) | 时间线和活动流 |
| Tooltip | [tooltip.md](references/components/data-display/tooltip.md) | 悬浮或聚焦文字提示 |
| Tree | [tree.md](references/components/data-display/tree.md) | 树形层级数据 |

### 反馈

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Alert | [alert.md](references/components/feedback/alert.md) | 行内警告提示 |
| Drawer | [drawer.md](references/components/feedback/drawer.md) | 抽屉面板和抽屉表单 |
| Message | [message.md](references/components/feedback/message.md) | 全局轻量提示 |
| Modal | [modal.md](references/components/feedback/modal.md) | 对话框、确认流程、弹窗表单 |
| Notification | [notification.md](references/components/feedback/notification.md) | 富内容全局通知 |
| Popconfirm | [popconfirm.md](references/components/feedback/popconfirm.md) | 轻量确认气泡 |
| Progress | [progress.md](references/components/feedback/progress.md) | 线形/环形进度 |
| Result | [result.md](references/components/feedback/result.md) | 成功、错误、404 等结果状态 |
| Skeleton | [skeleton.md](references/components/feedback/skeleton.md) | 骨架屏加载占位 |
| Spin | [spin.md](references/components/feedback/spin.md) | 加载中 |

### 其他

| 组件 | 文件 | 适用场景 |
|---|---|---|
| Affix | [affix.md](references/components/other/affix.md) | 滚动时固定元素 |
| Anchor | [anchor.md](references/components/other/anchor.md) | 页内锚点导航 |
| BackTop | [back-top.md](references/components/other/back-top.md) | 回到顶部 |
| ResizeBox | [resize-box.md](references/components/other/resize-box.md) | 可伸缩容器和分割面板 |
| Scrollbar | [scrollbar.md](references/components/other/scrollbar.md) | 自定义滚动条 |
| Split | [split.md](references/components/other/split.md) | 面板分割 |
| Trigger | [trigger.md](references/components/other/trigger.md) | 基础弹出触发和定位 |
| Watermark | [watermark.md](references/components/other/watermark.md) | 文字或图片水印 |

### 模式

| 主题 | 文件 | 适用场景 |
|---|---|---|
| 表单模式 | [form-patterns.md](references/patterns/form-patterns.md) | 复杂表单、校验、动态字段、表单提交 |
| 表格模式 | [table-patterns.md](references/patterns/table-patterns.md) | 远程表格、插槽、行选择、分页 |
| 弹窗模式 | [modal-patterns.md](references/patterns/modal-patterns.md) | 弹窗表单、确认、全局反馈 |
| 受控值 | [controlled-uncontrolled.md](references/patterns/controlled-uncontrolled.md) | `v-model`、`default-*`、受控/非受控状态 |
| 响应式设计 | [responsive-design.md](references/patterns/responsive-design.md) | 栅格断点、响应式表单、自适应仪表盘 |
