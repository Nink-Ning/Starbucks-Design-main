---
sidebar_position: 1
---

# 数字输入框 InputNumber

仅允许输入数字格式的输入框。

## 基本用法

通过鼠标或者键盘输入范围内的标准数值。

<preview path="./demos/input-number/basic.vue" title="基本用法"></preview>


## 格式化展示值

通过 `formatter` 和 `parser` 配合使用可以定义输入框展示值。

<preview path="./demos/input-number/format-display.vue" title="格式化展示值"></preview>


## 按钮模式

指定 `mode` 为 `button` 来使用带按钮的数字输入框。

<preview path="./demos/input-number/button-mode.vue" title="按钮模式"></preview>


## v-model 的触发事件

数字输入框默认在 blur 或者按下 Enter 时会修改绑定的值，通过设置属性 model-event="input" 让组件在输入时修改绑定的值。
注意：在此模式下，输入时的值会超出设置的 min/max，组件会在失焦时修正值的大小。

<preview path="./demos/input-number/v-model-trigger.vue" title="v-model 的触发事件"></preview>


## 精度和步长

通过 `precision` 来设置数字精度。当 `precision` 小于 `step` 的小数位时，精度取 `step` 的小数个数。

<preview path="./demos/input-number/precision-step.vue" title="精度和步长"></preview>


## 前缀与后缀

通过指定 `prefix` 和 `suffix` 插槽来在输入框内添加前缀和后缀。

<preview path="./demos/input-number/prefix-suffix.vue" title="前缀与后缀"></preview>


## 四种尺寸

设置 `size` 可以使用四种尺寸（`mini`, `small`, `medium`, `large`）的数字输入框。高度分别对应`24px`、`28px`、`32px`、`36px`。

<preview path="./demos/input-number/four-sizes.vue" title="四种尺寸"></preview>


## 自定义图标

通过指定 `plus` 和 `minus` 插槽来修改数值增减操作的图标。

<preview path="./demos/input-number/custom-icon.vue" title="自定义图标"></preview>


## API


### `<input-number>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`number`|`-`||
|default-value|默认值（非受控模式）|`number`|`-`||
|mode|模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）|`'embed' \| 'button'`|`'embed'`||
|precision|数字精度|`number`|`-`||
|step|数字变化步长|`number`|`1`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|max|最大值|`number`|`Infinity`||
|min|最小值|`number`|`-Infinity`||
|formatter|定义输入框展示值|`func`|`-`||
|parser|从 `formatter` 转换为数字，和 `formatter` 搭配使用|`func`|`-`||
|placeholder|输入框提示文字|`string`|`-`||
|hide-button|是否隐藏按钮|`boolean`|`false`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-clear|是否允许清空输入框|`boolean`|`false`||
|model-event|触发 `v-model` 的事件|`'change' \| 'input'`|`'change'`||
|read-only|只读|`boolean`|`false`|2.33.1|
|input-attrs|内部 input 元素的属性|`object`|`-`|2.52.0|
### `<input-number>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: ` number \| undefined `<br>ev: `Event`||
|focus|输入框获取焦点时触发|ev: `FocusEvent`||
|blur|输入框失去焦点时触发|ev: `FocusEvent`||
|clear|用户点击清除按钮时触发|ev: `Event`|2.23.0|
|input|输入时触发|value: ` number \| undefined `<br>inputValue: `string`<br>ev: `Event`|2.27.0|
|keydown|按下键盘时触发|ev: `MouseEvent`|2.56.0|
### `<input-number>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|
### `<input-number>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|minus|数值减少图标|-|
|plus|数值增加图标|-|
|append|后置标签|-|
|prepend|前置标签|-|
|suffix|后缀|-|
|prefix|前缀|-|



