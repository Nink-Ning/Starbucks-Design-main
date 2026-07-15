---
sidebar_position: 1
---

# 列表 List

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## 竖排列表样式

这是一个包括分页、右侧内容、下方列表操作的示例。

<preview path="./demos/list/vertical-list.vue" title="竖排列表样式"></preview>


## 增加操作项

通过 `actions` 来为列表添加操作项。

<preview path="./demos/list/extra-actions.vue" title="增加操作项"></preview>


## 基本使用

列表的基本使用方法。可用于承载文字、列表、图片和段落。

<preview path="./demos/list/basic-usage.vue" title="基本使用"></preview>


## 格栅列表

通过 `grid` 属性来配置格栅列表。

<preview path="./demos/list/grid-list.vue" title="格栅列表"></preview>


## 列表元素

使用 `list-item-meta` 组件可快速指定头像、标题、文字。

<preview path="./demos/list/list-item.vue" title="列表元素"></preview>


## 响应式栅格

通过 `grid.sm` 等响应式参数动态设置每个单项横跨的列数，注意此时不要设置 `grid.span`。

<preview path="./demos/list/responsive-grid.vue" title="响应式栅格"></preview>


## 滚动

通过设置 `max-height` 属性限制列表的最大高度。通过 `reach-bottom` 事件可以监听列表触底的事件。

<preview path="./demos/list/scroll.vue" title="滚动"></preview>


## 不同尺寸

列表组件提供了三种大小 `small, medium, large` ，可根据业务需求自行选择。

<preview path="./demos/list/sizes.vue" title="不同尺寸"></preview>


## 无限长列表

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。
在使用虚拟列表时，如果列表元素之间高度变化较大可能导致滚动时视口出现空白区域，可通过调整 `virtualListProps.buffer` 属性解决，使用方式。

<preview path="./demos/list/infinite-list.vue" title="无限长列表"></preview>


## API


### `<list>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|列表数据，需要和 `item` 插槽同时使用|`any[]`|`-`||
|size|列表大小|`'small' \| 'medium' \| 'large'`|`'medium'`||
|bordered|是否显示边框|`boolean`|`true`||
|split|是否显示分割线|`boolean`|`true`||
|loading|是否为加载中状态|`boolean`|`false`||
|hoverable|是否显示选中样式|`boolean`|`false`||
|pagination-props|列表分页配置|`PaginationProps`|`-`||
|grid-props|列表栅格配置|`object`|`-`||
|max-height|列表的最大高度|`string \| number`|`0`||
|bottom-offset|触发到达底部的距离阈值|`number`|`0`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 VirtualListProps|`VirtualListProps`|`-`||
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|2.38.0|
### `<list>` Events

|事件名|描述|参数|
|---|---|---|
|scroll|列表滚动时触发|-|
|reach-bottom|当列表到达底部时触发|-|
|page-change|表格分页发生改变时触发|page: `number`|
|page-size-change|表格每页数据数量发生改变时触发|pageSize: `number`|
### `<list>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|scrollIntoView|虚拟滚动到某个元素|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-|
### `<list>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|scroll-loading|滚动加载状态时，滚动到底部的提示|-|2.20.0|
|item|列表项|index: `number`<br>item: `any`||
|empty|空白展示|-||
|footer|底部信息|-||
|header|头部信息|-||




### `<list-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action-layout|操作组排列方向|`Direction`|`'horizontal'`|
### `<list-item>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|meta|meta信息|-|
|extra|额外内容|-|
|actions|操作组|-|




### `<list-item-meta>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|标题|`string`|`-`|
|description|描述内容|`string`|`-`|
### `<list-item-meta>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|avatar|头像|-|
|title|标题|-|
|description|描述内容|-|




### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|2.34.1|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|2.34.1|



