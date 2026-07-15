---
sidebar_position: 1
---

# 警告提示 Alert

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。

## 操作项

通过 `#action` 插槽自定义操作按钮

<preview path="./demos/alert/actions.vue" title="操作项"></preview>


## 顶部公告

通过设置 `banner`，可将警告提示作为顶部公告使用（去除边框和圆角）。

<preview path="./demos/alert/top-alert.vue" title="顶部公告"></preview>


## 基本用法

展现需要关注的信息，适用于简短的警告提示。

<preview path="./demos/alert/basic.vue" title="基本用法"></preview>


## 可关闭

通过设置 `closable`，可开启关闭按钮。

<preview path="./demos/alert/closable.vue" title="可关闭"></preview>


## 自定义关闭元素

指定 `close-element` slot，自定义关闭元素。

<preview path="./demos/alert/custom-close-element.vue" title="自定义关闭元素"></preview>


## 隐藏图标

通过设置 `:show-icon="false"` 来隐藏图标。

<preview path="./demos/alert/hide-icon.vue" title="隐藏图标"></preview>


## 提示标题

通过设置 `title` 可以给警告提示添加标题。

<preview path="./demos/alert/tip-title.vue" title="提示标题"></preview>


## 提示类型

警告提示有 `info`、`success`、`warning`、`error` 四种类型。2.41.0 版本新增 `normal` 类型，此类型下默认不展示图标。

<preview path="./demos/alert/tip-type.vue" title="提示类型"></preview>


## API


### `<alert>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|警告提示的类型。2.41.0 新增 `normal` 类型|`info \| success \| warning \| error \| normal`|`'info'`|
|show-icon|是否展示图标|`boolean`|`true`|
|closable|是否展示关闭按钮|`boolean`|`false`|
|title|警告提示的标题|`string`|`-`|
|banner|是否作为顶部公告使用（去除边框和圆角）|`boolean`|`false`|
|center|内容是否居中显示|`boolean`|`false`|
### `<alert>` Events

|事件名|描述|参数|
|---|---|---|
|close|点击关闭按钮时触发|ev: `MouseEvent`|
|after-close|关闭动画结束后触发|-|
### `<alert>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-||
|title|标题|-||
|action|操作项|-||
|close-element|关闭元素|-|2.36.0|



