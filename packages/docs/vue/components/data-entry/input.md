---
sidebar_position: 1
---

# 输入框 Input

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。

## 基本用法

输入框的基本用法。

<preview path="./demos/input/basic.vue" title="基本用法"></preview>


## 输入框组合

通过 `input-group` 可以组合使用输入框。

<preview path="./demos/input/input-group.vue" title="输入框组合"></preview>


## 密码输入框

用于输入密码。

<preview path="./demos/input/password-input.vue" title="密码输入框"></preview>


## 前缀与后缀

通过指定 `prefix` 和 `suffix` 插槽来在输入框内添加前缀和后缀。

<preview path="./demos/input/prefix-suffix.vue" title="前缀与后缀"></preview>


## 前置、后置标签

通过指定 `prepend` 和 `append` 插槽在输入框前后添加元素。

<preview path="./demos/input/addon-tags.vue" title="前置、后置标签"></preview>


## 自定义搜索按钮

自定义搜索按钮的内容

<preview path="./demos/input/custom-search-button.vue" title="自定义搜索按钮"></preview>


## 搜索框（加载中）

通过 `loading` 属性可以让搜索框展示加载中状态。

<preview path="./demos/input/search-box-loading.vue" title="搜索框（加载中）"></preview>


## 搜索框

带有搜索按钮的输入框，用于内容检索。

<preview path="./demos/input/search-box.vue" title="搜索框"></preview>


## 输入框尺寸

输入框定义了四种默认尺寸 `mini, small, medium, large` ，分别为 `24px, 28px, 32px, 36px` 。

<preview path="./demos/input/input-size.vue" title="输入框尺寸"></preview>


## 输入框状态

输入框可以设置禁用和错误状态。

<preview path="./demos/input/input-status.vue" title="输入框状态"></preview>


## 字数统计

设置 `max-length` 可以限制最大字数，配合 `show-word-limit` 可以显示字数统计。

<preview path="./demos/input/word-count.vue" title="字数统计"></preview>


## API


### `<input>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控状态）|`string`|`''`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-clear|是否允许清空输入框|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|readonly|是否为只读状态|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|placeholder|提示文字|`string`|`-`||
|max-length|输入值的最大长度，errorOnly 属性在 2.12.0 版本添加|`number \| { length: number; errorOnly?: boolean }`|`0`||
|show-word-limit|是否显示字数统计|`boolean`|`false`||
|word-length|字符长度的计算方法|`(value: string) => number`|`-`||
|word-slice|字符截取方法，同 wordLength 一起使用|`(value: string, maxLength: number) => string`|`-`|2.12.0|
|input-attrs|内部 input 元素的属性|`object`|`-`|2.27.0|
|prepend|前置标签|`string`|`-`|2.57.0|
|append|后置标签|`string`|`-`|2.57.0|
### `<input>` Events

|事件名|描述|参数|
|---|---|---|
|input|用户输入时触发|value: `string`<br>ev: `Event`|
|change|仅在输入框失焦或按下回车时触发|value: `string`<br>ev: `Event`|
|press-enter|用户按下回车时触发|ev: `KeyboardEvent`|
|clear|用户点击清除按钮时触发|ev: `MouseEvent`|
|focus|输入框获取焦点时触发|ev: `FocusEvent`|
|blur|输入框失去焦点时触发|ev: `FocusEvent`|
### `<input>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|
### `<input>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|append|后置标签|-|
|prepend|前置标签|-|
|suffix|后缀元素|-|
|prefix|前缀元素|-|








### `<input-password>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visibility **(v-model)**|是否可见，受控属性|`boolean`|`-`|
|default-visibility|默认是否可见，非受控|`boolean`|`true`|
|invisible-button|是否显示可见按钮|`boolean`|`true`|
### `<input-password>` Events

|事件名|描述|参数|
|---|---|---|
|visibility-change|visibility 改变时触发|visible: `boolean`|




### `<input-search>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|search-button|是否为后置按钮模式|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|button-text|搜索按钮的文字，使用后会替换原本的图标|`string`|`-`|2.16.0|
|button-props|搜索按钮的属性|`ButtonProps`|`-`||
### `<input-search>` Events

|事件名|描述|参数|
|---|---|---|
|search|单击搜索按钮时触发|value: `string`<br>ev: `MouseEvent`|



