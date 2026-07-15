---
sidebar_position: 1
---

# 菜单 Menu

收纳、排列并展示一系列选项的列表。

## 响应式收缩

设置 `breakpoint` 可触发响应式收缩。

<preview path="./demos/menu/responsive-shrink.vue" title="响应式收缩"></preview>


## 缩起内嵌菜单

通过 `collapsed` 来指定菜单收起。

<preview path="./demos/menu/collapse-inline-menu.vue" title="缩起内嵌菜单"></preview>


## 深色模式导航

通过 `theme` 指定主题，分为 `light` 和 `dark` 两种。

<preview path="./demos/menu/dark-nav.vue" title="深色模式导航"></preview>


## 顶部导航菜单

设置 `mode` 为 `horizontal` 时，使用水平菜单。

<preview path="./demos/menu/top-nav-menu.vue" title="顶部导航菜单"></preview>


## 悬浮按钮菜单

指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

<preview path="./demos/menu/hover-button-menu.vue" title="悬浮按钮菜单"></preview>


## 悬浮菜单

指定 `mode` 为 `pop` 可以使用悬浮菜单。

<preview path="./demos/menu/hover-menu.vue" title="悬浮菜单"></preview>


## 不同大小菜单

通过 `style` 自由指定菜单的宽度和菜单项的高度。

<preview path="./demos/menu/menu-sizes.vue" title="不同大小菜单"></preview>


## 内嵌菜单

菜单内可以嵌入多个子项，通过 `openKeys` 可以设置默认打开的子项。

<preview path="./demos/menu/inline-menu.vue" title="内嵌菜单"></preview>


## API


### `<menu>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|theme|菜单的主题|`'light' \| 'dark'`|`'light'`||
|mode|菜单的模式|`'vertical' \| 'horizontal' \| 'pop' \| 'popButton'`|`'vertical'`||
|level-indent|层级之间的缩进量|`number`|`-`||
|auto-open|默认展开所有多级菜单|`boolean`|`false`||
|collapsed **(v-model)**|是否折叠菜单|`boolean`|`-`||
|default-collapsed|默认是否折叠菜单|`boolean`|`false`||
|collapsed-width|折叠菜单宽度|`number`|`-`||
|accordion|开启手风琴效果|`boolean`|`false`||
|auto-scroll-into-view|是否自动滚动选中项目到可见区域|`boolean`|`false`||
|show-collapse-button|是否内置折叠按钮|`boolean`|`false`||
|selected-keys **(v-model)**|选中的菜单项 key 数组|`string[]`|`-`||
|default-selected-keys|默认选中的菜单项 key 数组|`string[]`|`[]`||
|open-keys **(v-model)**|展开的子菜单 key 数组|`string[]`|`-`||
|default-open-keys|默认展开的子菜单 key 数组|`string[]`|`[]`||
|scroll-config|滚动到可见区域的配置项，接收所有scroll-into-view-if-needed的参数|`{ [key: string]: any }`|`-`||
|trigger-props|弹出模式下可接受所有 `Trigger` 的 `Props`|`TriggerProps`|`-`||
|tooltip-props|弹出模式下可接受所有 `ToolTip` 的 `Props`|`object`|`-`||
|auto-open-selected|默认展开选中的菜单|`boolean`|`false`|2.8.0|
|breakpoint|响应式的断点, 详见响应式栅格|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|2.18.0|
|popup-max-height|弹出框的最大高度|`boolean \| number`|`true`|2.23.0|
### `<menu>` Events

|事件名|描述|参数|
|---|---|---|
|collapse|折叠状态改变时触发|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|menu-item-click|点击菜单项时触发|key: `string`|
|sub-menu-click|点击子菜单时触发|key: `string`<br>openKeys: `string[]`|
### `<menu>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|collapse-icon|折叠图标|collapsed: `boolean`|
|expand-icon-right|向右展开的图标|-|
|expand-icon-down|向下展开的图标|-|




### `<sub-menu>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|子菜单的标题|`string`|`-`||
|selectable|弹出模式下，是否将多级菜单头也作为一个菜单项，支持点击选中等状态|`boolean`|`false`||
|popup|是否强制使用弹出模式，`level` 表示当前子菜单的层级|`boolean \| ((level: number) => boolean)`|`false`||
|popup-max-height|弹出框的最大高度|`boolean \| number`|`true`|2.23.0|
### `<sub-menu>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|标题|-||
|expand-icon-right|向右展开的图标|-||
|expand-icon-down|向下展开的图标|-||
|icon|菜单的图标|-|2.11.0|




### `<menu-item-group>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|菜单组的标题|`string`|`-`|
### `<menu-item-group>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|




### `<menu-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|disabled|是否禁用|`boolean`|`false`|
### `<menu-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|菜单的图标|-|2.11.0|




## FAQ

### `<MenuItem>` 和 `<SubMenu>` 组件的 `key` 属性为必填
在 `<Menu>` 组件中使用 `<MenuItem>` 和 `<SubMenu>` 组件时，请传入唯一的 `key` 属性。
组件内部在进行计算时会依赖此值，如果没有赋值会导致部分场景下异常


