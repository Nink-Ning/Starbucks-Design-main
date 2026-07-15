---
sidebar_position: 1
---

# 复选框 Checkbox

在一组数据中，用户可通过复选框选择一个或多个数据。

## 全选

在实现全选的功能时，可以通过 `indeterminate` 属性展示半选效果。

<preview path="./demos/checkbox/select-all.vue" title="全选"></preview>


## 基本用法

复选框的基本用法。

<preview path="./demos/checkbox/basic.vue" title="基本用法"></preview>


## 受控

通过 `v-model` (`model-value`) 属性控制是否选中

<preview path="./demos/checkbox/controlled.vue" title="受控"></preview>


## 自定义复选框

使用 #checkbox 插槽自定义复选框的展示

<preview path="./demos/checkbox/custom-checkbox.vue" title="自定义复选框"></preview>


## 禁用状态

禁用复选框。

<preview path="./demos/checkbox/disabled.vue" title="禁用状态"></preview>


## 复选框组

通过 `<a-checkbox-group>` 组件展示复选框组。设置 `direction="vertical"` 可以展示竖向的复选框组。

<preview path="./demos/checkbox/checkbox-group.vue" title="复选框组"></preview>


## 布局

使用 `<a-checkbox-group>` 传入 `<a-checkbox>`，配合 `<a-grid>` 组件实现灵活的布局。

<preview path="./demos/checkbox/layout.vue" title="布局"></preview>


## 限制可勾选数量

通过设置 `max` 限制最多可被勾选的项目数。

<preview path="./demos/checkbox/limit-checked.vue" title="限制可勾选数量"></preview>


## 复选框组选项

`a-checkbox-group` 通过 `options` 属性设置子元素

<preview path="./demos/checkbox/checkbox-group-options.vue" title="复选框组选项"></preview>


## API


### `<checkbox>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`boolean \| Array<string \| number \| boolean>`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string\|number\|boolean`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|
### `<checkbox>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| (string \| number \| boolean)[] `<br>ev: `Event`|
### `<checkbox>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.18.0|




### `<checkbox-group>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Array<string \| number \| boolean>`|`-`||
|default-value|默认值（非受控状态）|`Array<string \| number \| boolean>`|`[]`||
|max|支持最多选中的数量|`number`|`-`|2.36.0|
|options|选项|`Array<string \| number \| CheckboxOption>`|`-`|2.27.0|
|direction|复选框的排列方向|`Direction`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||
### `<checkbox-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `(string \| number \| boolean)[]`<br>ev: `Event`|
### `<checkbox-group>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.27.0|
|label|checkbox 文案内容|data: `CheckboxOption`|2.27.0|




### CheckboxOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|



