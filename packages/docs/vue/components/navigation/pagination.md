---
sidebar_position: 1
---

# 分页 Pagination

采用分页控制单页内的信息数量，也可进行页面跳转。

## 全部展示

展示全部配置项。

<preview path="./demos/pagination/show-all.vue" title="全部展示"></preview>


## 基本用法

分页的基本用法，`total` 属性为必填项。

<preview path="./demos/pagination/basic.vue" title="基本用法"></preview>


## 自定义分页按钮

可以通过插槽自定义分页按钮内容

<preview path="./demos/pagination/custom-pager-button.vue" title="自定义分页按钮"></preview>


## 更多页码

当页码较大时，会使用更多页码的分页样式。

<preview path="./demos/pagination/more-pages.vue" title="更多页码"></preview>


## 页码跳转

通过设置 `show-jumper`，显示页码跳转输入框。

<preview path="./demos/pagination/page-jumper.vue" title="页码跳转"></preview>


## 每页条数

通过设置 `show-page-size`， 展示每页条数选择器。

<preview path="./demos/pagination/page-size.vue" title="每页条数"></preview>


## 简洁模式

通过设置 `simple` 属性开启简洁模式。

<preview path="./demos/pagination/simple-mode.vue" title="简洁模式"></preview>


## 分页尺寸

分页分为 `mini`、`small`、`medium`、`large` 四种尺寸。

<preview path="./demos/pagination/pagination-size.vue" title="分页尺寸"></preview>


## 展示总数

通过设置 `show-total` 属性显示数据总数。

<preview path="./demos/pagination/show-total.vue" title="展示总数"></preview>


## API


### `<pagination>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|total **(必填)**|数据总数|`number`|`-`||
|current **(v-model)**|当前的页数|`number`|`-`||
|default-current|默认的页数（非受控状态）|`number`|`1`||
|page-size **(v-model)**|每页展示的数据条数|`number`|`-`||
|default-page-size|默认每页展示的数据条数（非受控状态）|`number`|`10`||
|disabled|是否禁用|`boolean`|`false`||
|hide-on-single-page|单页时是否隐藏分页|`boolean`|`false`||
|simple|是否为简单模式|`boolean`|`false`||
|show-total|是否显示数据总数|`boolean`|`false`||
|show-more|是否显示更多按钮|`boolean`|`false`||
|show-jumper|是否显示跳转|`boolean`|`false`||
|show-page-size|是否显示数据条数选择器|`boolean`|`false`||
|page-size-options|数据条数选择器的选项列表|`number[]`|`[10, 20, 30, 40, 50]`||
|page-size-props|数据条数选择器的Props|`SelectProps`|`-`||
|size|分页选择器的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|page-item-style|分页按钮的样式|`CSSProperties`|`-`||
|active-page-item-style|当前分页按钮的样式|`CSSProperties`|`-`||
|base-size|计算显示省略的基础个数。显示省略的个数为 `baseSize + 2 * bufferSize`|`number`|`6`||
|buffer-size|显示省略号时，当前页码左右显示的页码个数|`number`|`2`||
|auto-adjust|是否在改变数据条数时调整页码|`boolean`|`true`|2.34.0|
### `<pagination>` Events

|事件名|描述|参数|
|---|---|---|
|change|页码改变时触发|current: `number`|
|page-size-change|数据条数改变时触发|pageSize: `number`|
### `<pagination>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|total|总数|total: `number`|2.9.0|
|page-item-ellipsis|分页按钮（省略）|-|2.9.0|
|page-item-step|分页按钮（步）|type: `'previous'\|'next'`The type of page item step|2.9.0|
|page-item|分页按钮|page: `number`The page number of the paging button|2.9.0|



