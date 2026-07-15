---
name: starbucks-vue-dropdown
description: "Starbucks UI Vue 下拉菜单 Dropdown 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-dropdown>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 下拉菜单 Dropdown

## 简介

下拉菜单的基本用法。下拉菜单开启后会为触发元素添加 `arco-dropdown-open` 类名。

## 基本用法

```vue
<template>
  <a-space size="large">
    <a-dropdown @select="handleSelect">
      <a-button>Click Me</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption disabled>Option 2</a-doption>
        <a-doption :value="{ value: 'Option3' }">Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown @select="handleSelect" disabled>
      <a-button disabled>Click Me</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption disabled>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
    <a-dropdown @select="handleSelect" :popup-max-height="false">
      <a-button>No Max Height <icon-down/></a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption disabled>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
        <a-doption>Option 4</a-doption>
        <a-doption>Option 5</a-doption>
        <a-doption>Option 6</a-doption>
        <a-doption>Option 7</a-doption>
        <a-doption>Option 8</a-doption>
        <a-doption>Option 9</a-doption>
      </template>
    </a-dropdown>
  </a-space>
</template>

<script>
export default {
  setup() {
    const handleSelect = (v) => {
      console.log(v)
    };

    return {
      handleSelect
    }
  },
}
</script>

<style>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
```

## API

### `<dropdown>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`||
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bottom'`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|popup-max-height|弹出框最大高度|`boolean\|number`|`true`|2.29.0|
|hide-on-select|是否在用户选择后隐藏弹出框|`boolean`|`true`|2.43.0|

### `<dropdown>` 事件

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|
|select|用户选择时触发|value: `string \| number \| Record<string, any> \| undefined `<br>ev: `Event`|

### `<dropdown>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|content|内容|-||
|footer|页脚|-|2.10.0|

### `<doption>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string\|number\|object`|`-`|
|disabled|是否禁用|`boolean`|`false`|

### `<doption>` 事件

|事件名|描述|参数|
|---|---|---|
|click|点击按钮时触发|ev: `MouseEvent`|

### `<doption>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|

### `<dgroup>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|分组标题|`string`|`-`|

### `<dgroup>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|分组标题|-|2.10.0|

### `<dsubmenu>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（2.16.0 版本后暂无用处）|`string\|number`|`-`||
|disabled|是否禁用|`boolean`|`false`|2.10.0|
|trigger|触发方式|`'hover' \| 'click'`|`'click'`|2.10.0|
|position|弹出位置|`'rt' \| 'lt'`|`'rt'`|2.10.0|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|option-props|自定义选项属性|`object`|`-`|2.29.0|

### `<dsubmenu>` 事件

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|

### `<dsubmenu>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-|2.29.0|
|content|子菜单内容|-||
|footer|页脚|-|2.10.0|

### `<dropdown-button>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`|
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`|
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'br'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|type|按钮类型|`string`|`-`|
|size|按钮大小|`string`|`-`|
|button-props|按钮属性|`ButtonProps`|`-`|
|hide-on-select|是否在用户选择后隐藏弹出框|`boolean`|`true`|

### `<dropdown-button>` 事件

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|
|click|点击按钮时触发|ev: `MouseEvent`|
|select|用户选择时触发|value: `string \| number \| Record<string, any> \| undefined`<br>ev: `Event`|

### `<dropdown-button>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|icon|按钮图标|popupVisible: `boolean`|
|content|内容|-|

## 常用模式

- **弹出方向**：通过 `position` 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下。
- **触发方式**：通过 `trigger` 指定触发方式。
- **按钮下拉框**：可以使用 `<dropdown-button>` 组件用来展示右边是额外相关功能菜单的按钮。`2.16.0` 版本添加支持。
- **分组选项**：通过 `<dgroup>` 组件使用分组选项。
- **多级菜单**：带有多级菜单的下拉框。
- **右键菜单**：移入区域后，可点击鼠标右键触发。
- **带图标的选项**：通过 `icon` 插槽在选项前添加图标。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
