---
name: starbucks-vue-button
description: "Starbucks UI Vue 按钮 Button 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-button>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 按钮 Button

## 简介

按钮分为 `primary` - **主要按钮**、`secondary` - **次要按钮（默认）**、`dashed` - **虚线按钮**、`outline` - **线形按钮**、`text` - **文本按钮**五种类型。

## 基本用法

```vue
<template>
  <a-space>
    <a-button type="primary">Primary</a-button>
    <a-button>Secondary</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="outline">Outline</a-button>
    <a-button type="text">Text</a-button>
  </a-space>
</template>
```

## API

### `<button>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`'secondary'`|
|shape|按钮的形状|`BorderShape`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|long|按钮的宽度是否随容器自适应。|`boolean`|`false`|
|loading|按钮是否为加载中状态|`boolean`|`false`|
|disabled|按钮是否禁用|`boolean`|`false`|
|html-type|设置 `button` 的原生 `type` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")|`HTMLButtonElement['type']`|`'button'`|
|autofocus|设置 `button` 的原生 `autofocus` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")|`boolean`|`false`|
|href|设置跳转链接。设置此属性时，按钮渲染为a标签。|`string`|`-`|

### `<button>` 事件

|事件名|描述|参数|
|---|---|---|
|click|点击按钮时触发|ev: `MouseEvent`|

### `<button>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|

### `<button-group>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`-`|
|shape|按钮的形状|`BorderShape`|`-`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`|
|disabled|全部子按钮是否禁用|`boolean`|`false`|

## 常用模式

- **图标按钮**：按钮可以嵌入图标。在只设置图标时，按钮的宽高相等。
- **按钮形状**：按钮分为 `square` - **长方形（默认）**、`circle` - **圆形**、`round` - **全圆角**三种形状。
- **按钮尺寸**：按钮分为 `mini`、`small`、`medium`、`large` 四种尺寸。高度分别为：`24px`、`28px`、`32px`、`36px`。推荐（默认）尺寸为 `medium`。可在不同场景及不同业务需求选择适合尺寸。
- **按钮状态**：按钮的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种，可以与按钮类型同时使用。
- **禁用状态**：按钮的禁用状态。
- **加载中状态**：通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。
- **长按钮**：通过设置 `long` 属性，使按钮的宽度跟随容器的宽度。
- **组合按钮**：通过 `<a-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 基础组件保持语义清晰，主操作、次操作和危险操作要用不同 `type` 或 `status` 区分。
- 图标、按钮、链接等交互元素要同时考虑禁用、加载和可访问文本。
