---
name: starbucks-vue-radio
description: "Starbucks UI Vue 单选框 Radio 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-radio>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 单选框 Radio

## 简介

单选框的基本用法。

## 基本用法

```vue
<template>
  <a-space size="large">
    <a-radio value="radio">Radio</a-radio>
    <a-radio value="disabled radio" :default-checked="true" disabled>Disabled Radio</a-radio>
  </a-space>
</template>
```

## API

### `<radio>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string \| number \| boolean`|`true`|
|type|单选的类型|`'radio' \| 'button'`|`'radio'`|
|disabled|是否禁用|`boolean`|`false`|

### `<radio>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` string \| number \| boolean `<br>ev: `Event`|

### `<radio>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|radio|自定义单选框|checked: `boolean`<br>disabled: `boolean`|2.18.0|

### `<radio-group>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`||
|default-value|默认值（非受控状态）|`string \| number \| boolean`|`''`||
|type|单选框组的类型|`'radio' \| 'button'`|`'radio'`||
|size|单选框组的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|options|选项|`Array<string \| number \| RadioOption>`|`-`|2.27.0|
|direction|单选框组的方向|`'horizontal' \| 'vertical'`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||

### `<radio-group>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` string \| number \| boolean `|

### `<radio-group>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|radio|自定义单选框|checked: `boolean`<br>disabled: `boolean`|2.27.0|
|label|radio 文案内容|data: `RadioOption`|2.27.0|

### RadioOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|

## 常用模式

- **受控**：通过 `v-model` (`model-value`) 属性控制是否选中
- **单选框组**：通过 `<a-radio-group>` 组件展示单选框组。
- **单选框组选项**：`a-radio-group` 通过 `options` 属性设置子元素
- **单选框组方向**：通过设置 `direction="vertical"` 可以展示竖直的单选框组。
- **按钮类型的单选框组**：通过指定 `type="button"` ，可以显示按钮类型的单选框组。
- **按钮类型单选框组的尺寸**：按钮类型的单选框组分为 `mini`、`small`、`medium`、`large` 四种尺寸。
- **布局**：使用 `<a-radio-group>` 传入 `<a-radio>`，配合 `<a-grid>` 组件实现灵活的布局。
- **自定义单选框**：使用 #radio 插槽自定义复选框的展示

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
