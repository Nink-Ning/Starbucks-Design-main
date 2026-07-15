---
sidebar_position: 1
---

# 描述列表 Descriptions

一般用于详情页的信息展示。

## 标签文本对齐

标签文本可以设置左对齐右对齐，也可以设置垂直的排列方式。

<preview path="./demos/descriptions/label-align.vue" title="标签文本对齐"></preview>


## 基本用法

简单地成组展示多个只读字段，一般用于详情页的信息。

<preview path="./demos/descriptions/basic.vue" title="基本用法"></preview>


## 带边框样式

带边框和背景颜色的列表。

<preview path="./demos/descriptions/bordered-style.vue" title="带边框样式"></preview>


## 布局示例

`span` 所占列数大于 `column` 可放置的数据个数时，`span` 会被设置为 `column` 的值，当行剩余列数不够放置下一列时将自动换行，每行末尾列会自动填充剩余量。

<preview path="./demos/descriptions/layout-example.vue" title="布局示例"></preview>


## 布局模式

有水平排列、垂直排列、行内水平排列、行内垂直排列四种布局模式。

<preview path="./demos/descriptions/layout-mode.vue" title="布局模式"></preview>


## 单列样式

单列的描述列表样式。

<preview path="./demos/descriptions/single-column.vue" title="单列样式"></preview>


## API


### `<descriptions>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|描述列表的数据|`DescData[]`|`[]`||
|column|每行放置的数据个数。2.20.0 版本支持响应式配置，配置可参考 Grid|`number \| ResponsiveValue`|`3`||
|title|描述列表的标题|`string`|`-`||
|layout|描述列表的排列方式|`'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'`|`'horizontal'`||
|align|文字的对齐位置|`TextAlign \| { label?: TextAlign; value?: TextAlign }`|`'left'`||
|size|描述列表的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|bordered|是否显示边框|`boolean`|`false`||
|label-style|数据标签的样式|`CSSProperties`|`-`||
|value-style|数据内容的样式|`CSSProperties`|`-`||
|table-layout|描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分。|`'auto' \| 'fixed'`|`'auto'`|2.38.0|
### `<descriptions>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|value|数据内容|value: `string`<br>index: `number`<br>data: `DescData`|
|label|数据标签|label: `string`<br>index: `number`<br>data: `DescData`|
|title|标题|-|




### `<descriptions-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|span|所占列数|`number`|`1`|2.18.0|
|label|标签|`string`|`-`|2.18.0|
### `<descriptions-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|标签|-|2.18.0|




### DescData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|标签|`string \| RenderFunction`|`-`|
|value|数据|`string \| RenderFunction`|`-`|
|span|所占列数|`number`|`1`|



