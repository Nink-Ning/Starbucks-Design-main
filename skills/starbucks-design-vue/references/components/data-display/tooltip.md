---
name: starbucks-vue-tooltip
description: "Starbucks UI Vue 文字气泡 Tooltip 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-tooltip>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 文字气泡 Tooltip

## 简介

鼠标移入，气泡出现，鼠标移出，气泡消失。

## 基本用法

```vue
<template>
  <a-space>
    <a-tooltip content="This is tooltip content">
      <a-button>Mouse over to display tooltip</a-button>
    </a-tooltip>
    <a-tooltip content="This is a two-line tooltip content.This is a two-line tooltip content.">
      <a-button>Mouse over to display tooltip</a-button>
    </a-tooltip>
  </a-space>
</template>
```

## API

### `<tooltip>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|文字气泡是否可见|`boolean`|`-`|
|default-popup-visible|文字气泡默认是否可见（非受控模式）|`boolean`|`false`|
|disabled|文字气泡是否禁用|`boolean`|`false`|
|content|文字气泡内容|`string`|`-`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|mini|是否展示为迷你尺寸|`boolean`|`false`|
|background-color|弹出框的背景颜色|`string`|`-`|
|content-class|弹出框内容的类名|`ClassName`|`-`|
|content-style|弹出框内容的样式|`CSSProperties`|`-`|
|arrow-class|弹出框箭头的类名|`ClassName`|`-`|
|arrow-style|弹出框箭头的样式|`CSSProperties`|`-`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|

### `<tooltip>` 事件

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|文字气泡显示状态改变时触发|visible: `boolean`|

### `<tooltip>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|content|内容|-|

## 常用模式

- **迷你尺寸**：适用于小场景或数字气泡样式。
- **位置**：文字气泡支持 12 个不同的方位。分别为：`上左`、`上`、`上右`、`下左`、`下`、`下右`、`左上`、`左`、`左下`、`右上`、`右`、`右下`。
- **自定义背景颜色**：通过 `background-color` 属性自定义背景颜色。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
