---
sidebar_position: 1
---

# 按钮 Button

按钮是一种命令组件，可发起一个即时操作。

## 基本用法

按钮分为 `primary` - **主要按钮**、`secondary` - **次要按钮（默认）**、`dashed` - **虚线按钮**、`outline` - **线形按钮**、`text` - **文本按钮**五种类型。

<preview path="./demos/button/basic.vue" title="基本用法"></preview>


## 禁用状态

按钮的禁用状态。

<preview path="./demos/button/disabled.vue" title="禁用状态"></preview>


## 组合按钮

通过 `<a-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。

<preview path="./demos/button/button-group.vue" title="组合按钮"></preview>


## 图标按钮

按钮可以嵌入图标。在只设置图标时，按钮的宽高相等。

<preview path="./demos/button/icon.vue" title="图标按钮"></preview>


## 加载中状态

通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。
通过设置 `loading-fixed-width` 可以在加载中时保持按钮宽度不变。

<preview path="./demos/button/loading-state.vue" title="加载中状态"></preview>


## 长按钮

通过设置 `long` 属性，使按钮的宽度跟随容器的宽度。

<preview path="./demos/button/long.vue" title="长按钮"></preview>


## 按钮形状

按钮分为 `square` - **长方形（默认）**、`circle` - **圆形**、`round` - **全圆角**三种形状。

<preview path="./demos/button/shape.vue" title="按钮形状"></preview>


## 按钮尺寸

按钮分为 `mini`、`small`、`medium`、`large` 四种尺寸。高度分别为：`24px`、`28px`、`32px`、`36px`。推荐（默认）尺寸为 `medium`。可在不同场景及不同业务需求选择适合尺寸。

<preview path="./demos/button/button-size.vue" title="按钮尺寸"></preview>


## 按钮状态

按钮的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种，可以与按钮类型同时使用。

<preview path="./demos/button/button-status.vue" title="按钮状态"></preview>


## API


### `<button>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`'secondary'`|
|shape|按钮的形状|`BorderShape`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|long|按钮的宽度是否随容器自适应。|`boolean`|`false`|
|loading|按钮是否为加载中状态|`boolean`|`false`|
|loading-fixed-width|当 loading 的时候，不改变按钮的宽度。|`boolean`|`false`|
|disabled|按钮是否禁用|`boolean`|`false`|
|html-type|设置 `button` 的原生 `type` 属性，可选值参考 HTML标准|`HTMLButtonElement['type']`|`'button'`|
|autofocus|设置 `button` 的原生 `autofocus` 属性，可选值参考 HTML标准|`boolean`|`false`|
|href|设置跳转链接。设置此属性时，按钮渲染为a标签。|`string`|`-`|
### `<button>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击按钮时触发|ev: `MouseEvent`|
### `<button>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|




### `<button-group>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`-`|
|shape|按钮的形状|`BorderShape`|`-`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`|
|disabled|全部子按钮是否禁用|`boolean`|`false`|



