---
sidebar_position: 1
---

# 分割线 Divider

划分内容区域，对模块做分隔。

## 基本用法

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

<preview path="./demos/divider/basic.vue" title="基本用法"></preview>


## 竖直分割线

指定 `direction` 为 `vertical` 即可使用竖直分割线。竖直分割线不能带文字。

<preview path="./demos/divider/vertical-divider.vue" title="竖直分割线"></preview>


## 带有文字的分割线

通过 `orientation` 为分割线添加描述文字。

<preview path="./demos/divider/divider-with-text.vue" title="带有文字的分割线"></preview>


## API


### `<divider>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|direction|分割线的方向，是水平还是竖直|`'horizontal' \| 'vertical'`|`'horizontal'`||
|orientation|分割线文字的位置|`'left' \| 'center' \| 'right'`|`'center'`||
|type|分割线样式类型|`'solid' \| 'dashed' \| 'dotted' \| 'double'`|`-`|2.35.0|
|size|分割线宽度/高度|`number`|`-`|2.35.0|
|margin|分割线上下 margin (垂直方向时为左右 margin)|`number \| string`|`-`|2.35.0|



