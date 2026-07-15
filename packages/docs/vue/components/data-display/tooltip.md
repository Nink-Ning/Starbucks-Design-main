---
sidebar_position: 1
---

# 文字气泡 Tooltip

鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。

## 基本用法

鼠标移入，气泡出现，鼠标移出，气泡消失。

<preview path="./demos/tooltip/basic.vue" title="基本用法"></preview>


## 自定义背景颜色

通过 `background-color` 属性自定义背景颜色。

<preview path="./demos/tooltip/custom-bg-color.vue" title="自定义背景颜色"></preview>


## 迷你尺寸

适用于小场景或数字气泡样式。

<preview path="./demos/tooltip/mini-size.vue" title="迷你尺寸"></preview>


## 位置

文字气泡支持 12 个不同的方位。分别为：`上左`、`上`、`上右`、`下左`、`下`、`下右`、`左上`、`左`、`左下`、`右上`、`右`、`右下`。

<preview path="./demos/tooltip/placement.vue" title="位置"></preview>


## API


### `<tooltip>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|文字气泡是否可见|`boolean`|`-`|
|default-popup-visible|文字气泡默认是否可见（非受控模式）|`boolean`|`false`|
|disabled|文字气泡是否禁用|`boolean`|`false`|
|content|文字气泡内容|`string`|`-`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|mini|是否展示为迷你尺寸|`boolean`|`false`|
|background-color|弹出框的背景颜色|`string`|`-`|
|content-class|弹出框内容的类名|`ClassName`|`-`|
|content-style|弹出框内容的样式|`CSSProperties`|`-`|
|arrow-class|弹出框箭头的类名|`ClassName`|`-`|
|arrow-style|弹出框箭头的样式|`CSSProperties`|`-`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
### `<tooltip>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|文字气泡显示状态改变时触发|visible: `boolean`|
### `<tooltip>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|content|内容|-|



