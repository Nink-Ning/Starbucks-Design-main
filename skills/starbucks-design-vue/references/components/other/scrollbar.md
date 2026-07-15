---
name: starbucks-vue-scrollbar
description: "Starbucks UI Vue 滚动条 Scrollbar 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-scrollbar>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 滚动条 Scrollbar

## 简介

滚动条组件基本用法。scrollbar 的默认插槽需要唯一的子元素。

## 基本用法

```vue
<template>
  <a-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: var(--color-primary-light-4);">Content</div>
  </a-scrollbar>
</template>
```

## API

### `<scrollbar>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|类型|`'track' \| 'embed'`|`'embed'`|
|outer-class|外层的类名|`string\|object\|array`|`-`|
|outer-style|外层的样式|`StyleValue`|`-`|

### `<scrollbar>` 事件

|事件名|描述|参数|
|---|---|---|
|scroll|滚动时触发|-|

### `<scrollbar>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|scrollTo|滚动|options: `number \| {left?: number;top?: number}`<br>y: `number`|-||
|scrollTop|纵向滚动|top: `number`|-|2.40.0|
|scrollLeft|横向滚动|left: `number`|-|2.40.0|

## 常用模式

- **滚动条类型**：设置 `type` 属性改变滚动条类型，`track` 类型会显示滚动条轨道。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
