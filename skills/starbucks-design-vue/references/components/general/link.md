---
name: starbucks-vue-link
description: "Starbucks UI Vue 链接 Link 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-link>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 链接 Link

## 简介

链接的基本用法。

## 基本用法

```vue
<template>
  <a-space>
    <a-link href="link">Link</a-link>
    <a-link href="link" disabled>Link</a-link>
  </a-space>
</template>
```

## API

### `<link>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|href|链接地址|`string`|`-`||
|status|链接的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`||
|hoverable|鼠标悬浮时存在底色|`boolean`|`true`|2.7.0|
|icon|图标|`boolean`|`false`|2.7.0|
|loading|链接是否为加载中状态|`boolean`|`false`|2.37.0|
|disabled|链接是否禁用|`boolean`|`false`||

### `<link>` 事件

|事件名|描述|参数|
|---|---|---|
|click|点击时触发|ev: `MouseEvent`|

## 常用模式

- **链接的状态**：链接的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种。
- **悬浮状态底色**：可以通过 hoverable 属性设置是否在悬浮状态时隐藏底色。
- **图标**：通过 `icon` 设置带图标的链接，设置为 `true` 时候显示默认图标。
- **加载中状态**：通过设置 `loading` 可以让链接处于加载中状态。处于加载中状态的链接不会触发点击事件。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 基础组件保持语义清晰，主操作、次操作和危险操作要用不同 `type` 或 `status` 区分。
- 图标、按钮、链接等交互元素要同时考虑禁用、加载和可访问文本。
