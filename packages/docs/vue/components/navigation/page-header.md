---
sidebar_position: 1
---

# 页头 PageHeader

页头位于页容器顶部，起到了内容概览和引导页级操作的作用。包括面包屑、标题等内容。

## 基本用法

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

<preview path="./demos/page-header/basic.vue" title="基本用法"></preview>


## 带有面包屑

在页头中展示面包屑。

<preview path="./demos/page-header/with-breadcrumb.vue" title="带有面包屑"></preview>


## 组合示例

页头的完整示例。

<preview path="./demos/page-header/combined.vue" title="组合示例"></preview>


## 透明底色

默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。

<preview path="./demos/page-header/transparent-bg.vue" title="透明底色"></preview>


## API


### `<page-header>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|页头的主标题|`string`|`-`|
|subtitle|页头的次标题|`string`|`-`|
|show-back|是否显示返回按钮|`boolean`|`true`|
### `<page-header>` Events

|事件名|描述|参数|
|---|---|---|
|back|点击返回按钮时触发|event: `Event`|
### `<page-header>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|breadcrumb|面包屑|-||
|back-icon|返回按钮|-|2.36.0|
|title|主标题|-||
|subtitle|次标题|-||
|extra|额外的展示内容|-||



