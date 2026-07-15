---
name: starbucks-vue-collapse
description: "Starbucks UI Vue 折叠面板 Collapse 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-collapse>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 折叠面板 Collapse

## 简介

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

## 基本用法

```vue
<template>
  <a-collapse :default-active-key="['1', 2]">
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :key="2" disabled>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
    <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
  </a-collapse>
</template>
```

## API

### `<collapse>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|active-key **(v-model)**|当前展开的面板的 `key`|`(string \| number)[]`|`-`||
|default-active-key|默认展开的面板的 `key` （非受控模式）|`(string \| number)[]`|`[]`||
|accordion|是否开启手风琴模式|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`-`|2.33.0|
|expand-icon-position|展开图标显示的位置|`'left' \| 'right'`|`'left'`||
|bordered|是否显示边框|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|

### `<collapse>` 事件

|事件名|描述|参数|
|---|---|---|
|change|展开的面板发生改变时触发|activeKey: `(string \| number)[]`<br>ev: `Event`|

### `<collapse-item>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|header|面板的标题|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|

### `<collapse-item>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|extra|额外内容|-||
|expand-icon|展开图标|active: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'`|2.33.0|
|header|面板的标题|-||

## 常用模式

- **手风琴模式**：通过 `accordion` 开启手风琴模式，同时只能打开一个面板。
- **嵌套面板**：面板多层嵌套。
- **无边框模式**：通过设置 `bordered="false"` 隐藏边框。
- **额外节点**：通过 `extra` 可以设置额外节点。`extra` 单击可以以设置 `stop` 修饰符，以阻止当前项目展开。
- **展开图标**：为展开项自定义展开图标
- **自定义样式**：自定义面板样式。
- **展开图标位置**：通过 `expand-icon-position` 属性设置展开图标的位置。
- **隐藏时销毁**：通过设置 `destroy-on-hide` 可以让面板内容在隐藏时销毁。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
