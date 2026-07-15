---
name: starbucks-vue-empty
description: "Starbucks UI Vue 空状态 Empty 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-empty>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 空状态 Empty

## 简介

空状态组件的基本用法。

## 基本用法

```vue
<template>
  <a-empty />
</template>
```

## API

### `<empty>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|description|描述内容|`string`|`-`||
|img-src|自定义图片的地址|`string`|`-`||
|in-config-provider|是否在 ConfigProvider 中使用|`boolean`|`false`|2.47.0|

### `<empty>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|image|图片/图标|-|

## 常用模式

- **自定义图片和文案**：通过 `image` 插槽自定义图标、图片，或通过内容修改文案。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
