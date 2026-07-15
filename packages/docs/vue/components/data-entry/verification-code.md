---
sidebar_position: 1
---

# 验证码输入 VerificationCode

验证码输入组件

## 基本使用

验证码输入框的基本用法。

<preview path="./demos/verification-code/basic-usage.vue" title="基本使用"></preview>


## 配合表单使用

配合表单使用实现校验。

<preview path="./demos/verification-code/with-form.vue" title="配合表单使用"></preview>


## 格式化输入

通过 `formatter` 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

<preview path="./demos/verification-code/format-input.vue" title="格式化输入"></preview>


## 密码模式

指定 `masked = true`可开启密码模式

<preview path="./demos/verification-code/password-mode.vue" title="密码模式"></preview>


## 自定义分隔符

指定 `separator` 可以自定义渲染分隔符。

<preview path="./demos/verification-code/custom-separator.vue" title="自定义分隔符"></preview>


## 不同状态

禁用状态、只读状态、错误状态。

<preview path="./demos/verification-code/status-variants.vue" title="不同状态"></preview>


## API


### `<verification-code>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string`|`-`|
|default-value|默认值（非受控状态）|`string`|`''`|
|length|验证码的长度，根据长度渲染对应个数的输入框|`number`|`6`|
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|disabled|是否禁用|`boolean`|`false`|
|masked|是否密码模式|`boolean`|`false`|
|readonly|只读|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|separator|分隔符。可在不同索引的输入框后自定义渲染分隔符|`(index: number, character: string) => VNode`|`-`|
|formatter|格式化函数，当用户输入值改变时触发|`(inputValue: string, index: number, value: string) => string \| boolean`|`-`|
### `<verification-code>` Events

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|value: ` string `|
|finish|填充完成时触发|value: ` string `|
|input|输入时触发|inputValue: ` string `<br>index: ` number `<br>ev: `Event`|



