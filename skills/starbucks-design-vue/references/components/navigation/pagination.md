---
name: starbucks-vue-pagination
description: "Starbucks UI Vue 分页 Pagination 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-pagination>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 分页 Pagination

## 简介

分页的基本用法，`total` 属性为必填项。

## 基本用法

```vue
<template>
  <a-pagination :total="50"/>
</template>
```

## API

### `<pagination>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|total **(必填)**|数据总数|`number`|`-`||
|current **(v-model)**|当前的页数|`number`|`-`||
|default-current|默认的页数（非受控状态）|`number`|`1`||
|page-size **(v-model)**|每页展示的数据条数|`number`|`-`||
|default-page-size|默认每页展示的数据条数（非受控状态）|`number`|`10`||
|disabled|是否禁用|`boolean`|`false`||
|hide-on-single-page|单页时是否隐藏分页|`boolean`|`false`||
|simple|是否为简单模式|`boolean`|`false`||
|show-total|是否显示数据总数|`boolean`|`false`||
|show-more|是否显示更多按钮|`boolean`|`false`||
|show-jumper|是否显示跳转|`boolean`|`false`||
|show-page-size|是否显示数据条数选择器|`boolean`|`false`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<pagination>` 事件

|事件名|描述|参数|
|---|---|---|
|change|页码改变时触发|current: `number`|
|page-size-change|数据条数改变时触发|pageSize: `number`|

### `<pagination>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|total|总数|total: `number`|2.9.0|
|page-item-ellipsis|分页按钮（省略）|-|2.9.0|
|page-item-step|分页按钮（步）|type: `'previous'\|'next'`The type of page item step|2.9.0|
|page-item|分页按钮|page: `number`The page number of the paging button|2.9.0|

## 常用模式

- **更多页码**：当页码较大时，会使用更多页码的分页样式。
- **每页条数**：通过设置 `show-page-size`， 展示每页条数选择器。
- **页码跳转**：通过设置 `show-jumper`，显示页码跳转输入框。
- **分页尺寸**：分页分为 `mini`、`small`、`medium`、`large` 四种尺寸。
- **简洁模式**：通过设置 `simple` 属性开启简洁模式。
- **展示总数**：通过设置 `show-total` 属性显示数据总数。
- **全部展示**：展示全部配置项。
- **自定义分页按钮**：可以通过插槽自定义分页按钮内容

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
