---
sidebar_position: 1
---

# 卡片 Card

将信息分类后分标题、详情等区域聚合展现，一般作为简洁介绍或者信息的大盘和入口。

## 支持更多内容配置

`actions` slot 可以用于展示底部按钮组。

<preview path="./demos/card/more-content.vue" title="支持更多内容配置"></preview>


## 基本用法

常规的内容容器，可承载文字、列表、图片、段落，常用于模块划分和内容概览。

<preview path="./demos/card/basic.vue" title="基本用法"></preview>


## 无边框卡片

设置 `bordered` 为 `false` 来使用无边框卡片。

<preview path="./demos/card/borderless-card.vue" title="无边框卡片"></preview>


## 简洁卡片

卡片可以只有内容区域。

<preview path="./demos/card/simple-card.vue" title="简洁卡片"></preview>


## 网络型内嵌卡片

通过 `Card.Grid` 来使用卡片内容区隔模式。

<preview path="./demos/card/network-card.vue" title="网络型内嵌卡片"></preview>


## 鼠标悬浮样式

指定 `hoverable` 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。

<preview path="./demos/card/hover-style.vue" title="鼠标悬浮样式"></preview>


## 内部卡片

卡片中可以嵌套其他卡片组件。

<preview path="./demos/card/inner-card.vue" title="内部卡片"></preview>


## 更灵活的内容展示

使用 `Card.Meta` 支持更加灵活的内容（封面、头像、 标题、描述信息）

<preview path="./demos/card/flexible-content.vue" title="更灵活的内容展示"></preview>


## 栅格卡片

在系统概览页面常常和栅格进行配合。

<preview path="./demos/card/grid-card.vue" title="栅格卡片"></preview>


## API


### `<card>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|bordered|是否有边框|`boolean`|`true`|
|loading|是否为加载中|`boolean`|`false`|
|hoverable|是否可悬浮|`boolean`|`false`|
|size|卡片尺寸|`'medium' \| 'small'`|`'medium'`|
|header-style|自定义标题区域样式|`CSSProperties`|`() => ({})`|
|body-style|内容区域自定义样式|`CSSProperties`|`() => ({})`|
|title|卡片标题|`string`|`-`|
|extra|卡片右上角的操作区域|`string`|`-`|
### `<card>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|actions|卡片底部的操作组|-|
|cover|卡片封面|-|
|extra|卡片右上角的操作区域|-|
|title|卡片标题|-|




### `<card-meta>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|标题|`string`|`-`|
|description|描述|`string`|`-`|
### `<card-meta>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|description|描述|-|
|title|标题|-|
|avatar|头像|-|




### `<card-grid>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|hoverable|是否可以悬浮|`boolean`|`false`|



