---
name: starbucks-vue-card
description: "Starbucks UI Vue 卡片 Card 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-card>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 卡片 Card

## 简介

常规的内容容器，可承载文字、列表、图片、段落，常用于模块划分和内容概览。

## 基本用法

```vue
<template>
  <div :style="{ display: 'flex' }">
    <a-card :style="{ width: '360px' }" title="Starbucks Card">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Starbucks's core product, Toutiao ("Headlines"), is a content platform in
      China and around the world. Toutiao started out as a news recommendation
      engine and gradually evolved into a platform delivering content in various
      formats.
    </a-card>
  </div>
</template>
```

## API

### `<card>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|bordered|是否有边框|`boolean`|`true`|
|loading|是否为加载中|`boolean`|`false`|
|hoverable|是否可悬浮|`boolean`|`false`|
|size|卡片尺寸|`'medium' \| 'small'`|`'medium'`|
|header-style|自定义标题区域样式|`CSSProperties`|`() => ({})`|
|body-style|内容区域自定义样式|`CSSProperties`|`() => ({})`|
|title|卡片标题|`string`|`-`|
|extra|卡片右上角的操作区域|`string`|`-`|

### `<card>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|actions|卡片底部的操作组|-|
|cover|卡片封面|-|
|extra|卡片右上角的操作区域|-|
|title|卡片标题|-|

### `<card-meta>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|标题|`string`|`-`|
|description|描述|`string`|`-`|

### `<card-meta>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|description|描述|-|
|title|标题|-|
|avatar|头像|-|

### `<card-grid>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|hoverable|是否可以悬浮|`boolean`|`false`|

## 常用模式

- **鼠标悬浮样式**：指定 `hoverable` 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。
- **无边框卡片**：设置 `bordered` 为 `false` 来使用无边框卡片。
- **简洁卡片**：卡片可以只有内容区域。
- **更灵活的内容展示**：使用 `Card.Meta` 支持更加灵活的内容（封面、头像、 标题、描述信息）
- **栅格卡片**：在系统概览页面常常和栅格进行配合。
- **网络型内嵌卡片**：通过 `Card.Grid` 来使用卡片内容区隔模式。
- **内部卡片**：卡片中可以嵌套其他卡片组件。
- **支持更多内容配置**：`actions` slot 可以用于展示底部按钮组。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
