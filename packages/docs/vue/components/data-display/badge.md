---
sidebar_position: 1
---

# 徽标数 Badge

一般出现在图标或文字的右上角。提供及时、重要的信息提示。

## 独立使用

`default slot` 为空时，将会独立展示徽标。

<preview path="./demos/badge/standalone.vue" title="独立使用"></preview>


## 基本用法

基本用法。只需指定 `count`或者 `content slot`，即可显示徽标。

<preview path="./demos/badge/basic.vue" title="基本用法"></preview>


## 颜色

我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

<preview path="./demos/badge/color.vue" title="颜色"></preview>


## 小红点

设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。

<preview path="./demos/badge/dot-badge.vue" title="小红点"></preview>


## 最大值

设置 `max-count`，可以限制最大显示的徽标数值，超过将会加 `+` 后缀。`max-count` 默认为 `99`。

<preview path="./demos/badge/max-value.vue" title="最大值"></preview>


## 状态点

设置 `status`，可以得到不同的状态点。`normal - 正常` `processing - 进行中` `success - 成功` `warning - 提醒` `danger - 危险`。

<preview path="./demos/badge/status-dot.vue" title="状态点"></preview>


## 文本内容

设置 `text`，可设置自定义提示内容。

<preview path="./demos/badge/text-content.vue" title="文本内容"></preview>


## API


### `<badge>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|自定义提示内容|`string`|`-`|
|dot|显示为小红点|`boolean`|`false`|
|dot-style|徽标的样式|`object`|`-`|
|max-count|徽标最大显示数值，如果count超过这个数值会显示为maxCount|`number`|`99`|
|offset|设置徽标位置的偏移|`number[]`|`[]`|
|color|内置的一些颜色|`ColorType \| string`|`-`|
|status|徽标的状态类型|`'normal' \| 'processing' \| 'success' \| 'warning' \| 'danger'`|`-`|
|count|徽标显示的数字|`number`|`-`|



