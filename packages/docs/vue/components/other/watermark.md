---
sidebar_position: 1
---

# 水印 Watermark

用于给页面的指定区域加上水印。

## 基本使用

水印的基本用法。

<preview path="./demos/watermark/basic-usage.vue" title="基本使用"></preview>


## 自定义

通过自定义参数以实现更多的水印效果。

<preview path="./demos/watermark/custom.vue" title="自定义"></preview>


## 图片水印

通过 image 设置图片水印。建议使用 2 倍或 3 倍图（支持 Base64）。

<preview path="./demos/watermark/image-watermark.vue" title="图片水印"></preview>


## 多行文本

通过 content 设置字符串数组可指定多行文字水印内容。

<preview path="./demos/watermark/multi-line.vue" title="多行文本"></preview>


## API


### `<watermark>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|content|水印文字内容|`string \| string[]`|`-`|
|image|图片源，建议使用 2 倍或 3 倍图|`string`|`-`|
|width|水印宽度（默认为内容宽度）|`number`|`-`|
|height|水印高度（默认为内容高度）|`number`|`-`|
|gap|水印间的间距|`[number, number]`|`() => [90, 90]`|
|offset|距离容器左上角的偏移量，默认为水印间距的一半|`[number, number]`|`[gap[0]/2, gap[1]/2]`|
|rotate|旋转角度|`number`|`-22`|
|font|水印字体样式，具体参数配置看 WatermarkFont|`WatermarkFont`|`-`|
|z-index|水印层级|`number`|`6`|
|alpha|透明度|`number`|`1`|
|anti-tamper|水印防篡改|`boolean`|`true`|
|grayscale|灰阶水印|`boolean`|`false`|
|repeat|是否重复水印|`boolean`|`true`|
|staggered|是否错开排列|`boolean`|`true`|




### WatermarkFont

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|color|字体颜色|`string`|`rgba(0, 0, 0, 0.15)`|
|fontSize|字体大小|`number`|`16`|
|fontFamily|字体类型|`string`|`sans-serif`|
|fontStyle|字体样式|`'none' \| 'normal' \| 'italic' \| 'oblique'`|`normal`|
|textAlign|字体对齐方式|`'start' \| 'end' \| 'left' \| 'right' \| 'center'`|`center`|
|fontWeight|字体粗细|`'normal' \| 'bold' \| 'bolder' \| 'lighter' \| number`|`normal`|




