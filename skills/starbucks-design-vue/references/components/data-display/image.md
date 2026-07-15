---
name: starbucks-vue-image
description: "Starbucks UI Vue 图片 Image 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-image>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 图片 Image

## 简介

需要查看图片的时候，简单的设置 `src` 属性，就能获得一个有预览图片功能的组件。

## 基本用法

```vue
<template>
  <a-image
    width="200"
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
  />
</template>
```

## API

### `<image>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|src|图片获取地址|`string`|`-`||
|width|图片显示宽度|`string \| number`|`-`||
|height|图片显示高度|`string \| number`|`-`||
|title|标题|`string`|`-`||
|description|描述，将显示在底部，如果 alt 没有值，则会将其设置给 alt|`string`|`-`||
|fit|确定图片如何适应容器框|`'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'`|`-`||
|alt|图片的文字描述|`string`|`-`||
|hide-footer|是否隐藏 footer（2.36.0 版本支持 'never' 参数，支持在加载错误时显示底部内容）|`boolean \| 'never'`|`false`||
|footer-position|底部显示的位置|`'inner' \| 'outer'`|`'inner'`||
|show-loader|是否显示加载中效果|`boolean`|`false`||
|preview|是否开启预览|`boolean`|`true`||
|preview-visible **(v-model)**|控制预览的打开状态，可与 previewVisibleChange 配合使用|`boolean`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<image>` 事件

|事件名|描述|参数|
|---|---|---|
|preview-visible-change|预览的打开和关闭事件|visible: `boolean`|

### `<image>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|error|自定义错误状态内容|-|
|error-icon|自定义错误状态的图标|-|
|loader|自定义加载状态效果|-|
|extra|底部额外内容|-|

### `<image-preview>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|src|图片获取地址|`string`|`-`|
|visible **(v-model)**|是否可见|`boolean`|`-`|
|default-visible|默认是否可见，非受控|`boolean`|`false`|
|mask-closable|点击 mask 是否触发关闭|`boolean`|`true`|
|closable|是否显示关闭按钮|`boolean`|`true`|
|actions-layout|操作项的布局|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|设置弹出框的挂载点，同 `teleport` 的 `to`，缺省值是 document.body|`HTMLElement \| string`|`-`|
|esc-to-close|是否支持 ESC 键关闭预览|`boolean`|`true`|
|wheel-zoom|是否开启滚轮缩放|`boolean`|`true`|
|keyboard|是否开启键盘控制|`boolean`|`true`|
|default-scale|默认缩放比|`number`|`1`|
|zoom-rate|缩放速率，仅对滚动缩放生效|`number`|`1.1`|

### `<image-preview>` 事件

|事件名|描述|参数|
|---|---|---|
|close|关闭事件|-|

### `<image-preview>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|actions|自定义额外的操作项|-|2.17.0|

### `<image-preview-group>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|src-list|图片列表（设置了本属性之后，将不再收集 a-image 子组件的图片信息）|`string[]`|`-`|
|current **(v-model)**|当前展示的图片的下标|`number`|`-`|
|default-current|第一张展示的图片的下标|`number`|`0`|
|infinite|是否无限循环|`boolean`|`false`|
|visible **(v-model)**|是否可见，受控属性|`boolean`|`-`|
|default-visible|默认是否可见，非受控|`boolean`|`false`|
|mask-closable|点击 mask 是否触发关闭|`boolean`|`true`|
|closable|是否显示关闭按钮|`boolean`|`true`|
|actions-layout|控制条的布局|`string[]`|`[  'fullScreen',  'rotateRight',  'rotateLeft',  'zoomIn',  'zoomOut',  'originalSize',]`|
|popup-container|设置弹出框的挂载点，同 `teleport` 的 `to`，缺省值是 document.body|`string \| HTMLElement`|`-`|

### `<image-preview-group>` 事件

|事件名|描述|参数|
|---|---|---|
|change|切换图片|index: `number`|
|visible-change|预览的打开和关闭|visible: `boolean`|

### `<image-preview-group>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|actions|自定义额外的操作项|-|2.46.0|

### `<image-preview-action>` 属性 (2.17.0)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|name|名称|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|

## 常用模式

- **显示 Caption**：通过设置 `title` 和 `description` 可以将图片的标题和描述显示在图片内部或者底部，显示的位置通过 `footerPosition` 控制。
- **额外操作**：组件提供了具名插槽 `extra` 供用户在页脚定制额外的内容。
- **错误状态**：当加载图片失败的时候显示的内容。
- **加载状态**：默认情况下，加载效果是不显示的，可通过设置 `showLoader` 为 `true` 显示默认加载效果。如果默认加载效果不符合需求, 还可以通过 具名插槽 `loader` 自行设置加载样式。
- **渐进加载**：大图可通过给 `loader` 传递一个小一些的图片，让其在原图未被加载成功时显示，以此来模拟渐进加载。
- **自定义预览操作栏**：通过设置 `actionsLayout` 可以调整预览操作栏中功能按钮的顺序，同时可以过滤功能按钮，只有在 `actionsLayout` 中的按钮才会出现。
- **多图预览**：用 `<a-image-preview-group>` 包裹 `<a-image>` 组件即可进行多图预览。
- **单独使用预览组件**：`a-image-preview` 可单独使用，需要手动控制 `visible`。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
