---
sidebar_position: 1
---

# 滑动输入条 Slider

滑动型输入器，展示当前值和可选范围。

## 基本用法

滑动输入条的基本用法。

<preview path="./demos/slider/basic.vue" title="基本用法"></preview>


## 禁用状态

禁用滑动输入条。

<preview path="./demos/slider/disabled.vue" title="禁用状态"></preview>


## 显示输入框

当设置 `show-input` 时，将显示输入框。

<preview path="./demos/slider/show-input.vue" title="显示输入框"></preview>


## 添加文本标签

通过设置 `marks` 可以添加文本标签。

<preview path="./demos/slider/add-text-label.vue" title="添加文本标签"></preview>


## 范围选择

通过设置 `range` 可开启范围选择，此时 `modelValue` 为数组。

<preview path="./demos/slider/range-select.vue" title="范围选择"></preview>


## 设置步长

通过 `step` 设置步长，默认步长为 1。建议设置能够被 `max-min` 整除的值，否则会出现可选最大值小于 `max` 的情况。当设置 `show-ticks` 时，显示步长刻度线。

<preview path="./demos/slider/set-step.vue" title="设置步长"></preview>


## 自定义提示

通过设置 `format-tooltip` 可以自定义提示文字。

<preview path="./demos/slider/custom-tooltip.vue" title="自定义提示"></preview>


## 竖直滑动条

设置 `direction="vertical"` ，将会显示竖直的滑动条。

<preview path="./demos/slider/vertical-slider.vue" title="竖直滑动条"></preview>


## API


### `<slider>` Props

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
### `<slider>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `number \| [number, number]`|



