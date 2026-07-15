---
name: starbucks-vue-affix
description: "Starbucks UI Vue 固钉 Affix 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-affix>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 固钉 Affix

## 简介

基本用法，不设置固定位置时，当页面滚动元素不可见时，元素固定在页面最顶部。

## 基本用法

```vue
<template>
  <a-affix>
    <a-button type="primary">Affix Top</a-button>
  </a-affix>
</template>
```

## API

### `<affix>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|offset-top|距离窗口顶部达到指定偏移量后触发|`number`|`0`|
|offset-bottom|距离窗口底部达到指定偏移量后触发|`number`|`-`|
|target|滚动容器，默认是 `window`|`string \| HTMLElement \| Window`|`-`|
|target-container|`target`的外层滚动元素，默认是 `window`。`Affix `将会监听该元素的滚动事件，并实时更新固钉的位置。主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题|`string \| HTMLElement \| Window`|`-`|

### `<affix>` 事件

|事件名|描述|参数|
|---|---|---|
|change|固定状态发生改变时触发|fixed: `boolean`|

### `<affix>` 方法

|方法名|描述|参数|返回值|
|---|---|---|---|
|updatePosition|更新位置|-|-|

## 常用模式

- **顶部固定**：当页面滚动或浏览器窗口改变时，元素向上滚动到距顶部一定距离时固定。
- **底部固定**：当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。
- **固定状态改变回调**：当固定状态发生改变时，会触发事件。
- **滚动容器**：用 `target` 设置需要监听其滚动事件的元素，默认为 window。`target` 指定为非 window 容器时，可能会出现 `target`外层元素滚动，固钉元素跑出滚动容器的问题。这个时候可以通过传入`targetContainer`传入`target`外层的滚动元素。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
