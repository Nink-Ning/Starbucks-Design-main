---
name: starbucks-vue-alert
description: "Starbucks UI Vue 警告提示 Alert 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-alert>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 警告提示 Alert

## 简介

展现需要关注的信息，适用于简短的警告提示。

## 基本用法

```vue
<template>
  <a-alert>This is an info alert.</a-alert>
</template>
```

## API

### `<alert>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|警告提示的类型。2.41.0 新增 `normal` 类型|`info \| success \| warning \| error \| normal`|`'info'`|
|show-icon|是否展示图标|`boolean`|`true`|
|closable|是否展示关闭按钮|`boolean`|`false`|
|title|警告提示的标题|`string`|`-`|
|banner|是否作为顶部公告使用（去除边框和圆角）|`boolean`|`false`|
|center|内容是否居中显示|`boolean`|`false`|

### `<alert>` 事件

|事件名|描述|参数|
|---|---|---|
|close|点击关闭按钮时触发|ev: `MouseEvent`|
|after-close|关闭动画结束后触发|-|

### `<alert>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-||
|title|标题|-||
|action|操作项|-||
|close-element|关闭元素|-|2.36.0|

## 常用模式

- **提示类型**：警告提示有 `info`、`success`、`warning`、`error` 四种类型。2.41.0 版本新增 `normal` 类型，此类型下默认不展示图标。
- **提示标题**：通过设置 `title` 可以给警告提示添加标题。
- **可关闭**：通过设置 `closable`，可开启关闭按钮。
- **自定义关闭元素**：指定 `close-element` slot，自定义关闭元素。
- **隐藏图标**：通过设置 `:show-icon="false"` 来隐藏图标。
- **操作项**：通过 `#action` 插槽自定义操作按钮
- **顶部公告**：通过设置 `banner`，可将警告提示作为顶部公告使用（去除边框和圆角）。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
