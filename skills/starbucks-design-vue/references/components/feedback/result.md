---
name: starbucks-vue-result
description: "Starbucks UI Vue 结果页 Result 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-result>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 结果页 Result

## 简介

展示结果状态。

## 基本用法

```vue
<template>
  <a-result title="This is title content" subtitle="This is subtitle content">
    <template #extra>
      <a-space>
        <a-button type="secondary">Again</a-button>
        <a-button type="primary">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>
```

## API

### `<result>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|status|结果页显示的状态|`'info' \| 'success' \| 'warning' \| 'error' \| '403' \| '404' \| '500' \| null`|`'info'`|
|title|标题内容|`string`|`-`|
|subtitle|子标题内容|`string`|`-`|

### `<result>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-||
|title|标题|-||
|subtitle|副标题|-||
|extra|操作区|-|2.8.0|
|default|默认插槽|-|2.8.0|

## 常用模式

- **成功状态**：展示成功状态。
- **警告状态**：展示警告状态。
- **错误状态**：展示错误状态。
- **HTTP状态码 403**：没有当前页面的访问权限。
- **HTTP状态码 404**：页面未找到
- **HTTP状态码 500**：通常表示服务器错误
- **自定义状态**：自定义状态。需要传入指定的图标
- **完整功能**：完整功能

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
