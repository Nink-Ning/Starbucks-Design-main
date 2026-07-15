---
sidebar_position: 1
---

# 折叠面板 Collapse

可以折叠 / 展开的内容区域。

## 手风琴模式

通过 `accordion` 开启手风琴模式，同时只能打开一个面板。

<preview path="./demos/collapse/accordion.vue" title="手风琴模式"></preview>


## 基本用法

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

<preview path="./demos/collapse/basic.vue" title="基本用法"></preview>


## 无边框模式

通过设置 `bordered="false"` 隐藏边框。

<preview path="./demos/collapse/borderless.vue" title="无边框模式"></preview>


## 自定义样式

自定义面板样式。

<preview path="./demos/collapse/custom-style.vue" title="自定义样式"></preview>


## 隐藏时销毁

通过设置 `destroy-on-hide` 可以让面板内容在隐藏时销毁。

<preview path="./demos/collapse/destroy-on-hide.vue" title="隐藏时销毁"></preview>


## 展开图标

为展开项自定义展开图标

<preview path="./demos/collapse/expand-icon.vue" title="展开图标"></preview>


## 额外节点

通过 `extra` 可以设置额外节点。`extra` 单击可以以设置 `stop` 修饰符，以阻止当前项目展开。

<preview path="./demos/collapse/extra-node.vue" title="额外节点"></preview>


## 展开图标位置

通过 `expand-icon-position` 属性设置展开图标的位置。

<preview path="./demos/collapse/expand-icon-position.vue" title="展开图标位置"></preview>


## 嵌套面板

面板多层嵌套。

<preview path="./demos/collapse/nested-panel.vue" title="嵌套面板"></preview>


## API


### `<collapse>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|active-key **(v-model)**|当前展开的面板的 `key`|`(string \| number)[]`|`-`||
|default-active-key|默认展开的面板的 `key` （非受控模式）|`(string \| number)[]`|`[]`||
|accordion|是否开启手风琴模式|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`-`|2.33.0|
|expand-icon-position|展开图标显示的位置|`'left' \| 'right'`|`'left'`||
|bordered|是否显示边框|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|
### `<collapse>` Events

|事件名|描述|参数|
|---|---|---|
|change|展开的面板发生改变时触发|activeKey: `(string \| number)[]`<br>ev: `Event`|




### `<collapse-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|header|面板的标题|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|show-expand-icon|是否显示展开图标|`boolean`|`true`||
|destroy-on-hide|是否在隐藏时销毁内容|`boolean`|`false`|2.27.0|
### `<collapse-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|extra|额外内容|-||
|expand-icon|展开图标|active: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'`|2.33.0|
|header|面板的标题|-||



## FAQ

### `<CollapseItem>` 组件的 `key` 属性为必填
在 `<Collapse>` 组件中每个 `<CollapseItem>` 都需要指定唯一的 `key` 属性，`key` 对应 `activeKey` 中的值。


