---
name: starbucks-vue-watermark
description: "Starbucks UI Vue 水印 Watermark 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-watermark>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 水印 Watermark

## 简介

水印的基本用法。

## 基本用法

```vue
<template>
  <a-watermark content="arco.design">
    <div style="width: 100%; height: 350px;" />
  </a-watermark>
</template>
```

## API

### `<watermark>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|content|水印文字内容|`string \| string[]`|`-`|
|image|图片源，建议使用 2 倍或 3 倍图|`string`|`-`|
|width|水印宽度（默认为内容宽度）|`number`|`-`|
|height|水印高度（默认为内容高度）|`number`|`-`|
|gap|水印间的间距|`[number, number]`|`() => [90, 90]`|
|offset|距离容器左上角的偏移量，默认为水印间距的一半|`[number, number]`|`[gap[0]/2, gap[1]/2]`|
|rotate|旋转角度|`number`|`-22`|
|font|水印字体样式，具体参数配置看 [WatermarkFont](#WatermarkFont)|`WatermarkFont`|`-`|
|z-index|水印层级|`number`|`6`|
|alpha|透明度|`number`|`1`|
|anti-tamper|水印防篡改|`boolean`|`true`|
|grayscale|灰阶水印|`boolean`|`false`|

> 仅列出常用项，低频属性按需查阅官方 API。

### WatermarkFont

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|color|字体颜色|`string`|`rgba(0, 0, 0, 0.15)`|
|fontSize|字体大小|`number`|`16`|
|fontFamily|字体类型|`string`|`sans-serif`|
|fontStyle|字体样式|`'none' \| 'normal' \| 'italic' \| 'oblique'`|`normal`|
|textAlign|字体对齐方式|`'start' \| 'end' \| 'left' \| 'right' \| 'center'`|`center`|
|fontWeight|字体粗细|`'normal' \| 'bold' \| 'bolder' \| 'lighter' \| number`|`normal`|

## 常用模式

- **基本使用**：水印的基本用法。
- **多行文本**：通过 content 设置字符串数组可指定多行文字水印内容。
- **图片水印**：通过 image 设置图片水印。建议使用 2 倍或 3 倍图（支持Base64）。
- **自定义**：通过自定义参数以实现更多的水印效果。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
