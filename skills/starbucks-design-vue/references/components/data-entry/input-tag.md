---
name: starbucks-vue-input-tag
description: "Starbucks UI Vue 标签输入框 InputTag 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-input-tag>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 标签输入框 InputTag

## 简介

标签输入框的基本用法。

## 基本用法

```vue
<template>
  <a-input-tag :default-value="['test']" :style="{width:'320px'}" placeholder="Please Enter" allow-clear/>
</template>
```

## API

### `<input-tag>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`(string \| number \| TagData)[]`|`-`||
|default-value|默认值（非受控状态）|`(string \| number \| TagData)[]`|`[]`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控状态）|`string`|`''`||
|placeholder|占位符|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|readonly|是否为只读模式|`boolean`|`false`||
|allow-clear|是否允许清空|`boolean`|`false`||
|size|输入框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|max-tag-count|最多展示的标签个数，`0` 表示不限制|`number`|`0`||
|retain-input-value|是否保留输入框的内容|`boolean \| { create?: boolean; blur?: boolean }`|`false`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<input-tag>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|value: `(string \| number \| TagData)[]`<br>ev: `Event`|
|input-value-change|输入值发生改变时触发|inputValue: `string`<br>ev: `Event`|
|press-enter|按下回车键时触发|inputValue: `string`<br>ev: `KeyboardEvent`|
|remove|点击标签的删除按钮时触发|removed: `string \| number`<br>ev: `Event`|
|clear|点击清除按钮时触发|ev: `MouseEvent`|
|focus|输入框获取焦点时触发|ev: `FocusEvent`|
|blur|输入框失去焦点时触发|ev: `FocusEvent`|

### `<input-tag>` 方法

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|

### `<input-tag>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|tag|输入框标签的显示内容|data: `TagData`|
|prefix|前缀元素|-|
|suffix|后缀元素|-|

### TagData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|标签值|`string \| number`|`-`|
|label|标签内容|`string`|`-`|
|closable|是否可关闭|`boolean`|`false`|
|tagProps|标签属性|`TagProps`|`-`|

## 常用模式

- **输入框状态**：输入框有禁用、只读和错误三种状态。
- **最多展示标签数量**：设置最多展示标签数量。
- **输入框尺寸**：输入框分为 `mini`、`small`、`medium`、`large` 四种尺寸。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
