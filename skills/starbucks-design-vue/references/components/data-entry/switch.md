---
name: starbucks-vue-switch
description: "Starbucks UI Vue 开关 Switch 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-switch>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 开关 Switch

## 简介

开关的基本用法。

## 基本用法

```vue
<template>
  <a-switch />
</template>
```

## API

### `<switch>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string\|number\|boolean`|`-`||
|default-checked|默认选中状态（非受控状态）|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|type|开关的类型|`'circle' \| 'round' \| 'line'`|`'circle'`||
|size|开关的大小|`'small' \| 'medium'`|`'medium'`||
|checked-value|选中时的值|`string\|number\|boolean`|`true`|2.12.0|
|unchecked-value|未选中时的值|`string\|number\|boolean`|`false`|2.12.0|
|checked-color|选中时的开关颜色|`string`|`-`|2.12.0|
|unchecked-color|未选中时的开关颜色|`string`|`-`|2.12.0|
|before-change|switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。|`(  newValue: string \| number \| boolean) => Promise<boolean \| void> \| boolean \| void`|`-`|2.37.0|
|checked-text|打开状态时的文案（`type='line'`和`size='small'`时不生效）|`string`|`-`|2.45.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<switch>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| string \| number `<br>ev: `Event`|
|focus|组件获得焦点时触发|ev: `FocusEvent`|
|blur|组件失去焦点时触发|ev: `FocusEvent`|

### `<switch>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|checked-icon|打开状态时，按钮上的图标|-|
|unchecked-icon|关闭状态时，按钮上的图标|-|
|checked|打开状态时的文案（`type='line'`和`size='small'`时不生效）|-|
|unchecked|关闭状态时的文案（`type='line'`和`size='small'`时不生效）|-|

## 常用模式

- **开关类型**：开关分为 `circle` - **圆形（默认）**、`round` - **圆角**、`line` - **线性**三种类型。
- **开关尺寸**：开关分为 `small`、`medium` 两种尺寸。
- **禁用状态**：禁用开关。
- **自定义开关的颜色**：通过 `checked-color` 和 `unchecked-color` 可以自定义开关的颜色。
- **自定义开关的值**：通过 `checked-value` 和 `unchecked-value` 可以自定义开关的值。
- **切换拦截**：设置 `beforeChange` 函数，函数的返回值将用于判断是否阻止切换。
- **加载中状态**：通过设置 `loading` 使开关处于加载中状态，此时开关不可点击。
- **自定义文案**：自定义开关的打开/关闭状态的文字。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
