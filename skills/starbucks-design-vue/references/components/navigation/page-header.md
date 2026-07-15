---
name: starbucks-vue-page-header
description: "Starbucks UI Vue 页头 PageHeader 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-page-header>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 页头 PageHeader

## 简介

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

## 基本用法

```vue
<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }" >
    <a-page-header
      :style="{ background: 'var(--color-bg-2)' }"
      title="StarbucksDesign"
      subtitle="StarbucksDesign Vue 2.0"
    >
      <template #extra>
        <a-radio-group type="button" default-value="large">
          <a-radio value="mini">Mini</a-radio>
          <a-radio value="small">Small</a-radio>
          <a-radio value="large">Large</a-radio>
        </a-radio-group>
      </template>
    </a-page-header>
  </div>
</template>
```

## API

### `<page-header>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|页头的主标题|`string`|`-`|
|subtitle|页头的次标题|`string`|`-`|
|show-back|是否显示返回按钮|`boolean`|`true`|

### `<page-header>` 事件

|事件名|描述|参数|
|---|---|---|
|back|点击返回按钮时触发|event: `Event`|

### `<page-header>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|breadcrumb|面包屑|-||
|back-icon|返回按钮|-|2.36.0|
|title|主标题|-||
|subtitle|次标题|-||
|extra|额外的展示内容|-||

## 常用模式

- **带有面包屑**：在页头中展示面包屑。
- **透明底色**：默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。
- **组合示例**：页头的完整示例。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
