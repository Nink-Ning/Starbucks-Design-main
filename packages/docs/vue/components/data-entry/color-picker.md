---
sidebar_position: 1
---

# 颜色选择器 ColorPicker

用于选择和展示颜色

## 基本使用

基本用法

<preview path="./demos/color-picker/basic-usage.vue" title="基本使用"></preview>


## 预设颜色和历史颜色

通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。

<preview path="./demos/color-picker/preset-colors.vue" title="预设颜色和历史颜色"></preview>


## 禁用

设置 `disabled` 禁用选择器。

<preview path="./demos/color-picker/disabled.vue" title="禁用"></preview>


## 颜色格式

通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。

<preview path="./demos/color-picker/color-format.vue" title="颜色格式"></preview>


## 只使用面板

只用颜色选择面板。

<preview path="./demos/color-picker/panel-only.vue" title="只使用面板"></preview>


## 尺寸

颜色选择器定义了四种尺寸（`mini`,`small`, `medium`, `large`），分别为 24px，28px，32px，36px。

<preview path="./demos/color-picker/size.vue" title="尺寸"></preview>


## 自定义触发元素

自定义触发元素。

<preview path="./demos/color-picker/custom-trigger.vue" title="自定义触发元素"></preview>


## 触发器

可以通过 `trigger-props` 设置触发器的所有属性。

<preview path="./demos/color-picker/trigger.vue" title="触发器"></preview>


## API


### `<color-picker>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string`|`-`|
|default-value|默认值（非受控状态）|`string`|`-`|
|format|颜色值的格式|`'hex' \| 'rgb'`|`-`|
|size|尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|show-text|显示颜色值|`boolean`|`false`|
|show-history|显示历史颜色|`boolean`|`false`|
|show-preset|显示预设颜色|`boolean`|`false`|
|disabled|禁用|`boolean`|`false`|
|disabled-alpha|禁用透明通道|`boolean`|`false`|
|hide-trigger|没有触发元素，只显示颜色面板|`boolean`|`false`|
|trigger-props|接受所有 Trigger 组件的Props|`Partial<TriggerProps>`|`-`|
|history-colors|历史颜色的颜色数组|`string[]`|`-`|
|preset-colors|预设颜色的颜色数组|`string[]`|`() => colors`|
### `<color-picker>` Events

|事件名|描述|参数|
|---|---|---|
|change|颜色值改变时触发|value: `string`|
|popup-visible-change|颜色面板展开和收起时触发|visible: `boolean`<br>value: `string`|



