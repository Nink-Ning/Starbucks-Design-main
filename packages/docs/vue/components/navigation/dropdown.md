---
sidebar_position: 1
---

# 下拉菜单 Dropdown

页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。

## 基本用法

下拉菜单的基本用法。下拉菜单开启后会为触发元素添加 `arco-dropdown-open` 类名。

<preview path="./demos/dropdown/basic.vue" title="基本用法"></preview>


## 按钮下拉框

可以使用 `<dropdown-button>` 组件用来展示右边是额外相关功能菜单的按钮。
`2.16.0` 版本添加支持。

<preview path="./demos/dropdown/button-dropdown.vue" title="按钮下拉框"></preview>


## 右键菜单

移入区域后，可点击鼠标右键触发。

<preview path="./demos/dropdown/context-menu.vue" title="右键菜单"></preview>


## 分组选项

通过 `<dgroup>` 组件使用分组选项。

<preview path="./demos/dropdown/group-options.vue" title="分组选项"></preview>


## 带图标的选项

通过 `icon` 插槽在选项前添加图标。

<preview path="./demos/dropdown/option-with-icon.vue" title="带图标的选项"></preview>


## 弹出方向

通过 `position` 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下。

<preview path="./demos/dropdown/popup-direction.vue" title="弹出方向"></preview>


## 多级菜单

带有多级菜单的下拉框。

<preview path="./demos/dropdown/multi-level-menu.vue" title="多级菜单"></preview>


## 触发方式

通过 `trigger` 指定触发方式。

<preview path="./demos/dropdown/trigger.vue" title="触发方式"></preview>


## API


### `<dropdown>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`||
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bottom'`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|popup-max-height|弹出框最大高度|`boolean\|number`|`true`|2.29.0|
|hide-on-select|是否在用户选择后隐藏弹出框|`boolean`|`true`|2.43.0|
### `<dropdown>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|
|select|用户选择时触发|value: `string \| number \| Record<string, any> \| undefined `<br>ev: `Event`|
### `<dropdown>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|content|内容|-||
|footer|页脚|-|2.10.0|




### `<doption>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string\|number\|object`|`-`|
|disabled|是否禁用|`boolean`|`false`|
### `<doption>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击按钮时触发|ev: `MouseEvent`|
### `<doption>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|




### `<dgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|分组标题|`string`|`-`|
### `<dgroup>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|分组标题|-|2.10.0|




### `<dsubmenu>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（2.16.0 版本后暂无用处）|`string\|number`|`-`||
|disabled|是否禁用|`boolean`|`false`|2.10.0|
|trigger|触发方式|`'hover' \| 'click'`|`'click'`|2.10.0|
|position|弹出位置|`'rt' \| 'lt'`|`'rt'`|2.10.0|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|option-props|自定义选项属性|`object`|`-`|2.29.0|
### `<dsubmenu>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|
### `<dsubmenu>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-|2.29.0|
|content|子菜单内容|-||
|footer|页脚|-|2.10.0|




### `<dropdown-button>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`|
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`|
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'br'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|type|按钮类型|`string`|`-`|
|size|按钮大小|`string`|`-`|
|button-props|按钮属性|`ButtonProps`|`-`|
|hide-on-select|是否在用户选择后隐藏弹出框|`boolean`|`true`|
### `<dropdown-button>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|下拉框显示状态发生改变时触发|visible: `boolean`|
|click|点击按钮时触发|ev: `MouseEvent`|
|select|用户选择时触发|value: `string \| number \| Record<string, any> \| undefined`<br>ev: `Event`|
### `<dropdown-button>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|按钮图标|popupVisible: `boolean`|
|content|内容|-|



