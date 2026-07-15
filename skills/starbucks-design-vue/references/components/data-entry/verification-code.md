---
name: starbucks-vue-verification-code
description: "Starbucks UI Vue 验证码输入 VerificationCode 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-verification-code>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 验证码输入 VerificationCode

## 简介

验证码输入框的基本用法。

## 基本用法

```vue
<template>
  <a-verification-code v-model="value" style="width: 300px" @finish="onFinish" />
</template>

<script setup>
import { ref } from 'vue';
import { Message} from '@sbux/starbucks-design-vue';

const value = ref('654321');
const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
```

## API

### `<verification-code>` 属性

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

### `<verification-code>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|value: ` string `|
|finish|填充完成时触发|value: ` string `|
|input|输入时触发|inputValue: ` string `<br>index: ` number `<br>ev: `Event`|

## 常用模式

- **基本使用**：验证码输入框的基本用法。
- **不同状态**：禁用状态、只读状态、错误状态。
- **密码模式**：指定 `masked = true`可开启密码模式
- **自定义分隔符**：指定 `separator` 可以自定义渲染分隔符。
- **配合表单使用**：配合表单使用实现校验。
- **格式化输入**：通过 `formatter` 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
