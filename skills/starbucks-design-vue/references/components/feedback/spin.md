---
name: starbucks-vue-spin
description: "Starbucks UI Vue 加载中 Spin 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-spin>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 加载中 Spin

## 简介

用于展示加载中的状态。

## 基本用法

```vue
<template>
  <a-spin />
</template>
```

## API

### `<spin>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|size|尺寸|`number`|`-`|
|loading|是否为加载中状态（仅在容器模式下生效）|`boolean`|`false`|
|dot|是否使用点类型的动画|`boolean`|`false`|
|tip|提示内容|`string`|`-`|
|hide-icon|是否隐藏图标|`boolean`|`false`|

### `<spin>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|tip|自定义提示内容|-|
|element|自定义元素|-|
|icon|自定义图标（自动旋转）|-|

## 常用模式

- **不同尺寸**：设置 `size` 可以得到不同尺寸的加载图标。
- **点类型指示符**：通过 `dot` 属性，可以展示点类型的指示符。
- **容器中**：可以给任意内容添加加载中指示符。
- **添加描述文案**：通过 `tip` 属性添加描述文案。
- **自定义图标**：通过 `#icon` 插槽可以自定义图标。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
