---
sidebar_position: 1
---

# 标签 Tag

用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。

## 基本用法

标签的基本用法

<preview path="./demos/tag/basic.vue" title="基本用法"></preview>


## 带边框的标签

通过参数 `bordered`，可以显示带边框的标签。

<preview path="./demos/tag/bordered-tag.vue" title="带边框的标签"></preview>


## 可选中

通过设置 `checkable` ，可以实现点击选中的效果。

<preview path="./demos/tag/selectable.vue" title="可选中"></preview>


## 可关闭标签

通过 `closable` 属性控制标签是否可关闭。可关闭标签可通过 `close` 事件执行一些关闭后操作，也可通过 `visible` 属性控制标签的显示或隐藏。

<preview path="./demos/tag/closable-tab.vue" title="可关闭标签"></preview>


## 标签的颜色

我们提供多种预设色彩的标签样式，通过 `color` 设置不同颜色。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

<preview path="./demos/tag/tag-color.vue" title="标签的颜色"></preview>


## 动态编辑标签

可动态添加和删除标签。

<preview path="./demos/tag/dynamic-edit-tag.vue" title="动态编辑标签"></preview>


## 带图标的标签

可通过 `icon` 插槽在标签中加入图标。

<preview path="./demos/tag/tag-with-icon.vue" title="带图标的标签"></preview>


## 加载中状态

标签的加载中状态。

<preview path="./demos/tag/loading-state.vue" title="加载中状态"></preview>


## 标签的尺寸

标签的大小分为：`small`、`medium`、`large` 三种，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为 `medium`。

<preview path="./demos/tag/tag-size.vue" title="标签的尺寸"></preview>


## API


### `<tag>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|color|标签的颜色|`'red' \| 'orangered' \| 'orange' \| 'gold' \| 'lime' \| 'green' \| 'cyan' \| 'blue' \| 'arcoblue' \| 'purple' \| 'pinkpurple' \| 'magenta' \| 'gray'`|`-`||
|size|标签的大小|`'small' \| 'medium' \| 'large'`|`'medium'`||
|bordered|是否显示边框|`boolean`|`false`|2.33.0|
|visible **(v-model)**|标签是否可见|`boolean`|`-`||
|default-visible|标签默认是否可见|`boolean`|`true`||
|loading|标签是否为加载中状态|`boolean`|`false`||
|closable|标签是否可关闭|`boolean`|`false`||
|checkable|标签是否可选中|`boolean`|`false`||
|checked **(v-model)**|标签是否选中（标签可选中时可用）|`boolean`|`-`||
|default-checked|标签默认选中状态（标签可选中时可用）|`boolean`|`true`||
|nowrap|标签内容不换行|`boolean`|`false`|2.56.1|
### `<tag>` Events

|事件名|描述|参数|
|---|---|---|
|close|点击关闭按钮时触发|ev: `MouseEvent`|
|check|用户选中时触发（仅在可选中模式下触发）|checked: `boolean`<br>ev: `MouseEvent`|
### `<tag>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|
|close-icon|关闭按钮的图标|-|



