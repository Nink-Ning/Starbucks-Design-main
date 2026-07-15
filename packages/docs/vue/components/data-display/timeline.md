---
sidebar_position: 1
---

# 时间轴 Timeline

按照时间顺序或倒序规则的展示信息内容。

## 基本用法

基本使用

<preview path="./demos/timeline/basic.vue" title="基本用法"></preview>


## 自定义标签

可以通过 `label` 插槽自定义标签

<preview path="./demos/timeline/custom-tag.vue" title="自定义标签"></preview>


## 横向时间轴

可以通过 `direction` 设置展示横向时间轴

<preview path="./demos/timeline/horizontal-timeline.vue" title="横向时间轴"></preview>


## 自定义节点

可以通过属性 `dotColor`, `dotType` 设置节点的颜色以及节点类型。同时可通过 `dot` 直接传入 DOM 自定义节点样式。优先级高于 `dotColor` 和 `dotType`

<preview path="./demos/timeline/custom-node.vue" title="自定义节点"></preview>


## 自定义节点内容

自定义节点内容

<preview path="./demos/timeline/custom-node-content.vue" title="自定义节点内容"></preview>


## 标签文本位置

通过 `labelPosition` 可以设置标签文本的位置。

<preview path="./demos/timeline/label-position.vue" title="标签文本位置"></preview>


## 时间轴展示类型

设置 `mode=alternate`时将会交替展示内容。同时可以通过设置 `TimelineItem` 的 `positon`属性控制时间轴节点的位置.

<preview path="./demos/timeline/timeline-type.vue" title="时间轴展示类型"></preview>


## 幽灵节点

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过`slot#pending-dot`定制其轴点。

<preview path="./demos/timeline/ghost-node.vue" title="幽灵节点"></preview>


## 自定义轴线样式

自定义轴线的示例。

<preview path="./demos/timeline/custom-axis-style.vue" title="自定义轴线样式"></preview>


## 纵向时间轴

竖直方向的时间轴。

<preview path="./demos/timeline/vertical-timeline.vue" title="纵向时间轴"></preview>


## API


### `<timeline>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|reverse|是否倒序|`boolean`|`false`|
|direction|时间轴方向|`'horizontal' \| 'vertical'`|`'vertical'`|
|mode|时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。|`'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'`|`'left'`|
|pending|是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。|`boolean\|string`|`-`|
|label-position|设置标签文本的位置|`'relative' \| 'same'`|`'same'`|
### `<timeline>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|dot|幽灵节点|-|




### `<timeline-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|dot-color|节点颜色|`string`|`-`|
|dot-type|节点类型：空心圆/实心圆|`'hollow' \| 'solid'`|`'solid'`|
|line-type|时间轴类型：实线/虚线/点状线|`'solid' \| 'dashed' \| 'dotted'`|`'solid'`|
|line-color|时间轴颜色|`string`|`-`|
|label|标签文本|`string`|`-`|
|position|Item 位置|`PositionType`|`-`|
### `<timeline-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|dot|自定义节点|-||
|label|自定义标签|-|2.50.0|



