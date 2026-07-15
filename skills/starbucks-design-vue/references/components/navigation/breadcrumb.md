---
name: starbucks-vue-breadcrumb
description: "Starbucks UI Vue 面包屑 Breadcrumb 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-breadcrumb>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 面包屑 Breadcrumb

## 简介

面包屑的基本用法。

## 基本用法

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Channel</a-breadcrumb-item>
    <a-breadcrumb-item>News</a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

## API

### `<breadcrumb>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|max-count|最多展示的面包屑数量（0表示不限制）|`number`|`0`||
|routes|设置路径|`BreadcrumbRoute[]`|`-`|2.36.0|
|separator|分隔符文字|`string\|number`|`-`|2.36.0|
|custom-url|自定义链接地址|`(paths: string[]) => string`|`-`|2.36.0|

### `<breadcrumb>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|more-icon|自定义更多图标|-|2.36.0|
|item-render|routes 设置时生效，自定义渲染面包屑|route: `BreadcrumbRoute`<br>routes: `BreadcrumbRoute[]`<br>paths: `string[]`|2.36.0|
|separator|自定义分隔符|-||

### `<breadcrumb-item>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|separator|分隔符文字|`string\|number`|`-`|2.36.0|
|droplist|下拉菜单内容|`BreadcrumbRoute['children']`|`-`|2.36.0|
|dropdown-props|下拉菜单属性|`DropDownProps`|`-`|2.36.0|

### `<breadcrumb-item>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|droplist|自定义下拉菜单|-|2.36.0|
|separator|自定义分隔符|-|2.36.0|

### BreadcrumbRoute

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|面包屑名称|`string`|`-`|
|path|跳转路径 (`a`标签的`href`)|`string`|`-`|
|children|下拉菜单展示项|`{    label: string;    path: string;  }[]`|`-`|

### 使用提示

同名的自定义插槽优先级是高于属性的

## 常用模式

- **自定义分隔符**：通过 `separator` 属性或插槽自定义分隔符。面包屑子项也可通过 `separator` 属性或插槽自定义分隔符，且优先级高于父项。
- **自定义尺寸**：通过指定样式来自定义面包屑的尺寸。
- **自定义图标**：可以在内容中使用自定义图标。
- **参数化配置**：通过 `routes` 来传递面包屑数据。若是要自定义面包屑的话，建议使用 `<a-breadcrumb-item />` 组件。默认使用 `a` 标签的 `href` 属性绑定路径，可通过 `item` 插槽自定义渲染。
- **带有下拉菜单**：通过 `droplist` 或者 `routes` 来指定下拉菜单。
- **显示省略**：通过 `max-count` 来指定面包屑的最多渲染数量，超出的部分将显示为省略号。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
