---
sidebar_position: 1
---

# 单选框 Radio

在一组相关且互斥数据中，用户仅能选择一个选项。

## 基本用法

单选框的基本用法。

<preview path="./demos/radio/basic.vue" title="基本用法"></preview>


## 按钮类型的单选框组

通过指定 `type="button"` ，可以显示按钮类型的单选框组。

<preview path="./demos/radio/button-radio-group.vue" title="按钮类型的单选框组"></preview>


## 受控

通过 `v-model` (`model-value`) 属性控制是否选中

<preview path="./demos/radio/controlled.vue" title="受控"></preview>


## 自定义单选框

使用 #radio 插槽自定义复选框的展示

<preview path="./demos/radio/custom-radio.vue" title="自定义单选框"></preview>


## 单选框组方向

通过设置 `direction="vertical"` 可以展示竖直的单选框组。

<preview path="./demos/radio/radio-group-direction.vue" title="单选框组方向"></preview>


## 单选框组

通过 `<a-radio-group>` 组件展示单选框组。

<preview path="./demos/radio/radio-group.vue" title="单选框组"></preview>


## 布局

使用 `<a-radio-group>` 传入 `<a-radio>`，配合 `<a-grid>` 组件实现灵活的布局。

<preview path="./demos/radio/layout.vue" title="布局"></preview>


## 单选框组选项

`a-radio-group` 通过 `options` 属性设置子元素

<preview path="./demos/radio/radio-group-options.vue" title="单选框组选项"></preview>


## 按钮类型单选框组的尺寸

按钮类型的单选框组分为 `mini`、`small`、`medium`、`large` 四种尺寸。

<preview path="./demos/radio/button-radio-group-size.vue" title="按钮类型单选框组的尺寸"></preview>


## API


### `<radio>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string \| number \| boolean`|`true`|
|type|单选的类型|`'radio' \| 'button'`|`'radio'`|
|disabled|是否禁用|`boolean`|`false`|
### `<radio>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` string \| number \| boolean `<br>ev: `Event`|
### `<radio>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|radio|自定义单选框|checked: `boolean`<br>disabled: `boolean`|2.18.0|




### `<radio-group>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`||
|default-value|默认值（非受控状态）|`string \| number \| boolean`|`''`||
|type|单选框组的类型|`'radio' \| 'button'`|`'radio'`||
|size|单选框组的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|options|选项|`Array<string \| number \| RadioOption>`|`-`|2.27.0|
|direction|单选框组的方向|`'horizontal' \| 'vertical'`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||
### `<radio-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` string \| number \| boolean `|
### `<radio-group>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|radio|自定义单选框|checked: `boolean`<br>disabled: `boolean`|2.27.0|
|label|radio 文案内容|data: `RadioOption`|2.27.0|




### RadioOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|



