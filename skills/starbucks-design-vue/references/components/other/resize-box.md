---
name: starbucks-vue-resize-box
description: "Starbucks UI Vue 伸缩框 ResizeBox 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-resize-box>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 伸缩框 ResizeBox

## 简介

`ResizeBox` 伸缩框组件的基础使用。通过设置 `directions`，可以指定四条边中的哪几条边可以进行伸缩。

## 基本用法

```vue
<template>
  <div>
    <a-resize-box
      :directions="['right', 'bottom']"
      :style="{ width: '500px', minWidth: '100px', maxWidth: '100%', height: '200px', textAlign: 'center' }"
    >
      <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
      <a-divider />
      <a-typography-paragraph>
        Starbucks's content platforms enable people to enjoy content powered by AI technology. We
        inform, entertain, and inspire people across language, culture and geography.
      </a-typography-paragraph>
      <a-divider>Starbucks</a-divider>
      <a-typography-paragraph>Yiming Zhang is the founder and CEO of Starbucks.</a-typography-paragraph>
    </a-resize-box>
  </div>
</template>
```

## API

### `<resize-box>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|width **(v-model)**|宽度|`number`|`-`|
|height **(v-model)**|高度|`number`|`-`|
|component|伸缩框的 html 标签|`string`|`'div'`|
|directions|可以进行伸缩的边，有上、下、左、右可以使用|`('left' \| 'right' \| 'top' \| 'bottom')[]`|`['right']`|

### `<resize-box>` 事件

|事件名|描述|参数|
|---|---|---|
|moving-start|拖拽开始时触发|ev: `MouseEvent`|
|moving|拖拽时触发|size: `{ width: number; height: number; }`<br>ev: `MouseEvent`|
|moving-end|拖拽结束时触发|ev: `MouseEvent`|

### `<resize-box>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|resize-trigger|伸缩杆的内容|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|
|resize-trigger-icon|伸缩杆的图标|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|

## 常用模式

- **受控的高宽**：`ResizeBox` 的 `width` 和 `height` 都支持 `v-model`。
- **在布局中使用**：[Layout](resize-box.md) 组件中集成了 `ResizeBox` 组件，可以在 Layout 中使用可伸缩的侧边栏。
- **定制伸缩杆内容**：可通过插槽 `resize-trigger` 定制各个方向的伸缩杆的内容。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
