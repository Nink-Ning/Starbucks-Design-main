---
sidebar_position: 1
---

# 锚点 Anchor

通过锚点可以快速找到信息内容在当前页面的位置。

## 固钉样式

示例中的锚点会显示在页面右侧。
设置 `affix=true` 时，锚点会以内置固钉模式展示。通过 `affix-style` 可以自定义固钉容器样式。

<preview path="./demos/anchor/affix-style.vue" title="固钉样式"></preview>


## 基本用法

锚点的基础用法。

<preview path="./demos/anchor/basic.vue" title="基本用法"></preview>


## 滚动偏移量

可以设置 `boundary` 来自定义锚点滚动偏移量。

<preview path="./demos/anchor/scroll-offset.vue" title="滚动偏移量"></preview>


## 是否改变 hash

可以设置点击锚点时不改变浏览器地址中的 hash。

<preview path="./demos/anchor/change-hash.vue" title="是否改变 hash"></preview>


## 横向 Anchor

横向 Anchor，不支持嵌套。

<preview path="./demos/anchor/horizontal-anchor.vue" title="横向 Anchor"></preview>


## 无轴线模式

设置 `line-less` 时，可以使用不展示左侧轴线的锚点样式。

<preview path="./demos/anchor/no-axis.vue" title="无轴线模式"></preview>


## 静态位置

设置 `affix=false` 后，锚点不会随页面滚动固定。

<preview path="./demos/anchor/static-position.vue" title="静态位置"></preview>


## API


### `<anchor>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|boundary|滚动边界值，设置该值为数字后，将会在距离滚动容器 `boundary` 距离时停止滚动。|`'start' \| 'end' \| 'center' \| 'nearest' \| number`|`'start'`|
|line-less|是否显示左侧轴线|`boolean`|`false`|
|affix|是否固定|`boolean`|`false`|
|affix-style|设置 Affix 组件的样式|`CSSProperties`|`-`|
|offset-top|距离窗口顶部的偏移量|`number`|`0`|
|offset-bottom|距离窗口底部的偏移量|`number`|`-`|
|direction|锚点方向|`'vertical' \| 'horizontal'`|`'vertical'`|
|target-offset|锚点区域边界相对于滚动容器顶部的偏移量。未设置时，默认值为滚动容器高度的一半|`number`|`-`|
|scroll-container|滚动容器|`string \| HTMLElement \| Window`|`-`|
|change-hash|是否改变hash。设置为 `false` 时点击锚点不会改变页面的 hash|`boolean`|`true`|
|smooth|是否使用平滑滚动|`boolean`|`true`|
### `<anchor>` Events

|事件名|描述|参数|
|---|---|---|
|select|用户点击链接时触发|hash: ` string \| undefined `<br>preHash: `string`|
|change|链接发生改变时触发|hash: `string`|




### `<anchor-link>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|锚点链接的文本内容|`string`|`-`|
|href|锚点链接的地址|`string`|`-`|



