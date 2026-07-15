---
name: starbucks-vue-popconfirm
description: "Starbucks UI Vue 气泡确认框 Popconfirm 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-popconfirm>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 气泡确认框 Popconfirm

## 简介

气泡确认框的基本用法。

## 基本用法

```vue
<template>
  <a-popconfirm content="Are you sure you want to delete?">
    <a-button>Click To Delete</a-button>
  </a-popconfirm>
</template>
```

## API

### `<popconfirm>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|content|内容|`string`|`-`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|popup-visible **(v-model)**|气泡确认框是否可见|`boolean`|`-`|
|default-popup-visible|气泡确认框默认是否可见（非受控模式）|`boolean`|`false`|
|type|气泡确认框的类型|`'info' \| 'success' \| 'warning' \| 'error'`|`'info'`|
|ok-text|确认按钮的内容|`string`|`-`|
|cancel-text|取消按钮的内容|`string`|`-`|
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`|
|ok-button-props|确认按钮的Props|`ButtonProps`|`-`|
|cancel-button-props|取消按钮的Props|`ButtonProps`|`-`|
|content-class|弹出框内容的类名|`ClassName`|`-`|
|content-style|弹出框内容的样式|`CSSProperties`|`-`|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<popconfirm>` 事件

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|气泡确认框的显隐状态改变时触发|visible: `boolean`|
|ok|点击确认按钮时触发|-|
|cancel|点击取消按钮时触发|-|

### `<popconfirm>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|
|content|内容|-|

## 常用模式

- **自定义按钮**：自定义按钮的文字或图标。
- **弹出位置**：`popconfirm` 支持 12 个不同的方位。分别为：`上左` `上` `上右` `下左` `下` `下右` `左上` `左` `左下` `右上` `右` `右下`。
- **确认框类型**：通过 `type` 属性可以设置确认框类型。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
