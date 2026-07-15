---
sidebar_position: 1
---

# 链接 Link

链接的基本样式。

## 基本用法

链接的基本用法。

<preview path="./demos/link/basic.vue" title="基本用法"></preview>


## 悬浮状态底色

可以通过 hoverable 属性设置是否在悬浮状态时隐藏底色。

<preview path="./demos/link/hover-bg.vue" title="悬浮状态底色"></preview>


## 图标

通过 `icon` 设置带图标的链接，设置为 `true` 时候显示默认图标。

<preview path="./demos/link/icon.vue" title="图标"></preview>


## 加载中状态

通过设置 `loading` 可以让链接处于加载中状态。处于加载中状态的链接不会触发点击事件。

<preview path="./demos/link/loading-state.vue" title="加载中状态"></preview>


## 链接的状态

链接的状态分为 `normal` - **正常（默认）**、`success` - **成功**、`warning` - **警告**、`danger` - **危险**四种。

<preview path="./demos/link/link-status.vue" title="链接的状态"></preview>


## API



### `<link>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|href|链接地址|`string`|`-`||
|status|链接的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`||
|hoverable|鼠标悬浮时存在底色|`boolean`|`true`|2.7.0|
|icon|图标|`boolean`|`false`|2.7.0|
|loading|链接是否为加载中状态|`boolean`|`false`|2.37.0|
|disabled|链接是否禁用|`boolean`|`false`||
### `<link>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击时触发|ev: `MouseEvent`|



