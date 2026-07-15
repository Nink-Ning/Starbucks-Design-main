---
name: starbucks-vue-skeleton
description: "Starbucks UI Vue 骨架屏 Skeleton 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-skeleton>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 骨架屏 Skeleton

## 简介

骨架屏组件提供 `<a-skeleton-line>` 和 `<a-skeleton-shape>` 两种组件，用户可根据需要组合使用。

## 基本用法

```vue
<template>
  <a-skeleton>
    <a-space direction="vertical" :style="{width:'100%'}" size="large">
      <a-skeleton-line :rows="3" />
      <a-skeleton-shape />
    </a-space>
  </a-skeleton>
</template>
```

## API

### `<skeleton>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|loading|是否展示骨架屏（加载中状态）|`boolean`|`true`|
|animation|是否开启骨架屏动画|`boolean`|`false`|

### `<skeleton-line>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|rows|展示的行数|`number`|`1`|
|widths|线型骨架的宽度|`Array<number \| string>`|`[]`|
|line-height|线型骨架的行高|`number`|`20`|
|line-spacing|线型骨架的行间距|`number`|`15`|

### `<skeleton-shape>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|shape|图形骨架的形状|`'square' \| 'circle'`|`'square'`|
|size|图形骨架的大小|`'small' \| 'medium' \| 'large'`|`'medium'`|

## 常用模式

- **图形骨架屏**：图形骨架屏分为 `square` - **正方形（默认）**、 `circle` - **圆形**两种形状，并提供 `small`、`medium`、`large` 三种尺寸。
- **动画**：通过设置 `animation` 属性，让骨架屏显示动画效果。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
