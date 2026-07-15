---
name: starbucks-vue-slider
description: "Starbucks UI Vue 滑动输入条 Slider 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-slider>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 滑动输入条 Slider

## 简介

滑动输入条的基本用法。

## 基本用法

```vue
<template>
  <a-slider :default-value="50" :style="{ width: '200px' }" />
</template>
```

## API

### `<slider>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`number \| [number, number]`|`-`||
|default-value|默认值（非受控状态）|`number \| [number, number]`|`0`||
|step|滑动的步长|`number`|`1`||
|min|滑动范围的最小值|`number`|`0`||
|marks|设置显示的标签|`Record<number, string>`|`-`||
|max|滑动范围的最大值|`number`|`100`||
|direction|滑动输入条的方向|`Direction`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||
|show-ticks|是否显示刻度线|`boolean`|`false`||
|show-input|是否显示输入框|`boolean`|`false`||
|range|是否开启范围选择|`boolean`|`false`||
|show-tooltip|是否显示tooltip|`boolean`|`true`|2.42.0|

### `<slider>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `number \| [number, number]`|

## 常用模式

- **禁用状态**：禁用滑动输入条。
- **设置步长**：通过 `step` 设置步长，默认步长为 1。建议设置能够被 `max-min` 整除的值，否则会出现可选最大值小于 `max` 的情况。当设置 `show-ticks` 时，显示步长刻度线。
- **添加文本标签**：通过设置 `marks` 可以添加文本标签。
- **范围选择**：通过设置 `range` 可开启范围选择，此时 `modelValue` 为数组。
- **显示输入框**：当设置 `show-input` 时，将显示输入框。
- **竖直滑动条**：设置 `direction="vertical"` ，将会显示竖直的滑动条。
- **自定义提示**：通过设置 `format-tooltip` 可以自定义提示文字。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
