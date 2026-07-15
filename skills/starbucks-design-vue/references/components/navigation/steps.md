---
name: starbucks-vue-steps
description: "Starbucks UI Vue 步骤条 Steps 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-steps>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 步骤条 Steps

## 简介

步骤条的基本用法。

## 基本用法

```vue
<template>
  <div>
    <a-steps :current="2">
      <a-step>Succeeded</a-step>
      <a-step>Processing</a-step>
      <a-step>Pending</a-step>
    </a-steps>
    <a-divider/>
    <div style="line-height: 140px; text-align: center; color: #C9CDD4; ">
      Step 2 Content
    </div>
  </div>
</template>
```

## API

### `<steps>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|步骤条的类型|`'default' \| 'arrow' \| 'dot' \| 'navigation'`|`'default'`|
|direction|步骤条的显示方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|label-placement|标签描述文字放置的位置|`'horizontal' \| 'vertical'`|`'horizontal'`|
|current **(v-model)**|当前步骤数|`number`|`-`|
|default-current|默认的步骤数（非受控状态）|`number`|`1`|
|status|当前步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`'process'`|
|line-less|是否使用无连接线样式|`boolean`|`false`|
|small|是否使用小型步骤条|`boolean`|`false`|
|changeable|是否可以点击切换|`boolean`|`false`|

### `<steps>` 事件

|事件名|描述|参数|
|---|---|---|
|change|步骤数发生改变时触发|step: `number`<br>ev: `Event`|

### `<step>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|步骤的标题|`string`|`-`|
|description|步骤的描述信息|`string`|`-`|
|status|步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`-`|
|disabled|是否禁用|`boolean`|`false`|

### `<step>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|node|节点|step: `number`<br>status: `string`|
|icon|图标|step: `number`<br>status: `string`|
|description|描述内容|-|

## 常用模式

- **描述信息**：通过设置 `description` 可以添加描述信息。
- **标签放置位置**：通过设置 `label-placement` 可以改变标签描述文字放置的位置。放置位置分为 `horizontal` - **放置在图标右侧（默认）**、`vertical` - **放置在图标下方**两种。
- **步骤错误**：通过设置 `status="error"` 来展示错误状态。
- **自定义图标**：通过 `#icon` 插槽可以自定义节点图标。
- **隐藏连接线**：通过设置 `line-less` 可以使用无连接线模式。
- **竖直步骤条**：竖直方向的步骤条。
- **箭头步骤条**：通过设置 `type="arrow"`，可以使用箭头类型的步骤条。**注意**：仅支持水平步骤条。
- **点状步骤条**：通过设置 `type="dot"` ， 可以使用点状的步骤条。此模式没有 small 尺寸。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
