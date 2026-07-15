---
name: starbucks-vue-input
description: "Starbucks UI Vue 输入框 Input 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-input>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 输入框 Input

## 简介

输入框的基本用法。

## 基本用法

```vue
<template>
  <a-space>
    <a-input :style="{width:'320px'}" placeholder="Please enter something" allow-clear />
    <a-input :style="{width:'320px'}" default-value="content" placeholder="Please enter something" allow-clear />
  </a-space>
</template>
```

## API

### `<input>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控状态）|`string`|`''`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-clear|是否允许清空输入框|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|readonly|是否为只读状态|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|placeholder|提示文字|`string`|`-`||
|max-length|输入值的最大长度，errorOnly 属性在 2.12.0 版本添加|`number \| { length: number; errorOnly?: boolean }`|`0`||
|show-word-limit|是否显示字数统计|`boolean`|`false`||
|word-length|字符长度的计算方法|`(value: string) => number`|`-`||
|word-slice|字符截取方法，同 wordLength 一起使用|`(value: string, maxLength: number) => string`|`-`|2.12.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<input>` 事件

|事件名|描述|参数|
|---|---|---|
|input|用户输入时触发|value: `string`<br>ev: `Event`|
|change|仅在输入框失焦或按下回车时触发|value: `string`<br>ev: `Event`|
|press-enter|用户按下回车时触发|ev: `KeyboardEvent`|
|clear|用户点击清除按钮时触发|ev: `MouseEvent`|
|focus|输入框获取焦点时触发|ev: `FocusEvent`|
|blur|输入框失去焦点时触发|ev: `FocusEvent`|

### `<input>` 方法

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|

### `<input>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|append|后置标签|-|
|prepend|前置标签|-|
|suffix|后缀元素|-|
|prefix|前缀元素|-|

### `<input-password>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visibility **(v-model)**|是否可见，受控属性|`boolean`|`-`|
|default-visibility|默认是否可见，非受控|`boolean`|`true`|
|invisible-button|是否显示可见按钮|`boolean`|`true`|

### `<input-password>` 事件

|事件名|描述|参数|
|---|---|---|
|visibility-change|visibility 改变时触发|visible: `boolean`|

### `<input-search>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|search-button|是否为后置按钮模式|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|button-text|搜索按钮的文字，使用后会替换原本的图标|`string`|`-`|2.16.0|
|button-props|搜索按钮的属性|`ButtonProps`|`-`||

### `<input-search>` 事件

|事件名|描述|参数|
|---|---|---|
|search|单击搜索按钮时触发|value: `string`<br>ev: `MouseEvent`|

## 常用模式

- **输入框状态**：输入框可以设置禁用和错误状态。
- **输入框尺寸**：输入框定义了四种默认尺寸 `mini, small, medium, large` ，分别为 `24px, 28px, 32px, 36px` 。
- **前缀与后缀**：通过指定 `prefix` 和 `suffix` 插槽来在输入框内添加前缀和后缀。
- **前置、后置标签**：通过指定 `prepend` 和 `append` 插槽在输入框前后添加元素。
- **字数统计**：设置 `max-length` 可以限制最大字数，配合 `show-word-limit` 可以显示字数统计。
- **输入框组合**：通过 `input-group` 可以组合使用输入框。
- **搜索框**：带有搜索按钮的输入框，用于内容检索。
- **自定义搜索按钮**：自定义搜索按钮的内容

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
