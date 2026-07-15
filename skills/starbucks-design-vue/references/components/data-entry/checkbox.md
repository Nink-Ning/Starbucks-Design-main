---
name: starbucks-vue-checkbox
description: "Starbucks UI Vue 复选框 Checkbox 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-checkbox>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 复选框 Checkbox

## 简介

复选框的基本用法。

## 基本用法

```vue
<template>
  <a-checkbox value="1">Option 1</a-checkbox>
</template>
```

## API

### `<checkbox>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`boolean \| Array<string \| number \| boolean>`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string\|number\|boolean`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|

### `<checkbox>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| (string \| number \| boolean)[] `<br>ev: `Event`|

### `<checkbox>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.18.0|

### `<checkbox-group>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Array<string \| number \| boolean>`|`-`||
|default-value|默认值（非受控状态）|`Array<string \| number \| boolean>`|`[]`||
|max|支持最多选中的数量|`number`|`-`|2.36.0|
|options|选项|`Array<string \| number \| CheckboxOption>`|`-`|2.27.0|
|direction|复选框的排列方向|`Direction`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||

### `<checkbox-group>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `(string \| number \| boolean)[]`<br>ev: `Event`|

### `<checkbox-group>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.27.0|
|label|checkbox 文案内容|data: `CheckboxOption`|2.27.0|

### CheckboxOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|

## 常用模式

- **受控**：通过 `v-model` (`model-value`) 属性控制是否选中
- **禁用状态**：禁用复选框。
- **复选框组**：通过 `<a-checkbox-group>` 组件展示复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组。
- **复选框组选项**：`a-checkbox-group` 通过 `options` 属性设置子元素
- **限制可勾选数量**：通过设置 `max` 限制最多可被勾选的项目数。
- **全选**：在实现全选的功能时，可以通过 `indeterminate` 属性展示半选效果。
- **布局**：使用 `<a-checkbox-group>` 传入 `<a-checkbox>`，配合 `<a-grid>` 组件实现灵活的布局。
- **自定义复选框**：使用 #checkbox 插槽自定义复选框的展示

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
