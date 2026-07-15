---
name: starbucks-vue-tabs
description: "Starbucks UI Vue 标签页 Tabs 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-tabs>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 标签页 Tabs

## 简介

标签页的基本使用方法。

## 基本用法

```vue
<template>
  <a-tabs default-active-key="2">
    <a-tab-pane key="1" title="Tab 1">
      Content of Tab Panel 1
    </a-tab-pane>
    <a-tab-pane key="2" title="Tab 2">
      Content of Tab Panel 2
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
```

## API

### `<tabs>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|active-key **(v-model)**|当前选中的标签的 `key`|`string\|number`|`-`||
|default-active-key|默认选中的标签的`key`（非受控状态，为空时选中第一个标签页）|`string\|number`|`-`||
|position|选项卡的位置|`'left' \| 'right' \| 'top' \| 'bottom'`|`'top'`||
|size|选项卡的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|type|选项卡的类型|`'line' \| 'card' \| 'card-gutter' \| 'text' \| 'rounded' \| 'capsule'`|`'line'`||
|direction|选项卡的方向|`'horizontal' \| 'vertical'`|`'horizontal'`||
|editable|是否开启可编辑模式|`boolean`|`false`||
|show-add-button|是否显示增加按钮（仅在可编辑模式可用）|`boolean`|`false`||
|destroy-on-hide|是否在不显示标签时销毁内容|`boolean`|`false`|2.27.0|
|lazy-load|是否在首次展示标签时挂载内容|`boolean`|`false`||
|justify|高度撑满容器，只在水平模式下生效。|`boolean`|`false`||
|animation|是否开启选项内容过渡动画|`boolean`|`false`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<tabs>` 事件

|事件名|描述|参数|
|---|---|---|
|change|当前标签值改变时触发|key: ` string \| number `|
|tab-click|用户点击标签时触发|key: ` string \| number `|
|add|用户点击增加按钮时触发|-|
|delete|用户点击删除按钮时触发|key: ` string \| number `|

### `<tabs>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|extra|选项卡额外内容|-|

### `<tab-pane>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|选项卡的标题|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|closable|是否允许关闭此选项卡（仅在可编辑模式生效）|`boolean`|`true`||
|destroy-on-hide|是否在不显示标签时销毁内容|`boolean`|`false`|2.27.0|

### `<tab-pane>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|title|选项卡标题|-|

## 常用模式

- **带图标的页签**：带有图标的标签页。
- **位置**：通过 `position` 属性可以自定义标签栏的位置。
- **不同类型**：通过 `type` 可以设置标签的类型。
- **懒加载**：通过设置 lazy-load 属性，可以让面板在首次激活时渲染。
- **附加内容**：通过 `extra` 插槽可以自定义额外显示内容。
- **动态增减标签页**：通过设置 `:editable="true"` 可以开启动态增减标签页。仅在 `line` | `card` | `card-gutter` 生效
- **触发方式**：通过 `trigger` 指定触发方式。
- **滚动**：支持通过滚轮或者触摸板进行滚动操作，且可以通过 `scrollPosition` 属性设置滚动位置。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
