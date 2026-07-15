---
sidebar_position: 1
---

# 间距 Space

设置组件之间的间距

## 对齐

内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

<preview path="./demos/space/alignment.vue" title="对齐"></preview>


## 基本用法

间距组件的基本用法。

<preview path="./demos/space/basic.vue" title="基本用法"></preview>


## 尺寸

内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

<preview path="./demos/space/size.vue" title="尺寸"></preview>


## 分隔符

为相邻子元素设置分隔符。

<preview path="./demos/space/separator.vue" title="分隔符"></preview>


## 垂直间距

可以设置垂直方向排列的间距。

<preview path="./demos/space/vertical-gap.vue" title="垂直间距"></preview>


## 环绕间距

环绕类型的间距，四周都有间距，一般用于换行的场景。

<preview path="./demos/space/wrap-spacing.vue" title="环绕间距"></preview>


## API


### `<space>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|align|对齐方式|`'start' \| 'end' \| 'center' \| 'baseline'`|`-`||
|direction|间距方向|`'vertical' \| 'horizontal'`|`'horizontal'`||
|size|间距大小，支持分别制定横向和竖向的间距|`number \| 'mini' \| 'small' \| 'medium' \| 'large' \| [SpaceSize, SpaceSize]`|`'small'`||
|wrap|环绕类型的间距，用于折行的场景。|`boolean`|`false`||
|fill|充满整行|`boolean`|`false`|2.11.0|
### `<space>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|split|设置分隔符|-|



## Type
```ts
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';
```

