---
sidebar_position: 1
---

# 空状态 Empty

指当前场景没有对应的数据内容，呈现出的一种状态。

## 基本用法

空状态组件的基本用法。

<preview path="./demos/empty/basic.vue" title="基本用法"></preview>


## 自定义图片和文案

通过 `image` 插槽自定义图标、图片，或通过内容修改文案。

<preview path="./demos/empty/custom-image-text.vue" title="自定义图片和文案"></preview>


## API


### `<empty>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|description|描述内容|`string`|`-`||
|img-src|自定义图片的地址|`string`|`-`||
|in-config-provider|是否在 ConfigProvider 中使用|`boolean`|`false`|2.47.0|
### `<empty>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|image|图片/图标|-|



