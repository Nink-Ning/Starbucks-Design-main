---
name: starbucks-vue-mention
description: "Starbucks UI Vue 提及 Mention 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-mention>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 提及 Mention

## 简介

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## 基本用法

```vue
<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <a-mention v-model="value" :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="enter something" />
    <a-mention v-model="text" :data="['Bytedance', 'Bytedesign', 'Bytenumner']" type="textarea" placeholder="enter something" />
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    const text = ref('');

    return {
      value,
      text
    }
  }
}
</script>
```

## API

### `<mention>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控状态）|`string`|`''`||
|data|用于自动补全的数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|prefix|触发自动补全的关键字|`string \| string[]`|`'@'`||
|split|选中项的前后分隔符|`string`|`' '`||
|type|输入框或文本域|`'input' \| 'textarea'`|`'input'`||
|disabled|是否禁用|`boolean`|`false`||
|allow-clear|是否允许清空输入框|`boolean`|`false`|2.23.0|

### `<mention>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: `string`||
|search|动态搜索时触发，2.47.0 版本增加 prefix 参数|value: `string`<br>prefix: `string`||
|select|选择下拉选项时触发|value: `string \| number \| Record<string, any> \| undefined`||
|clear|用户点击清除按钮时触发|-|2.23.0|
|focus|文本框获取焦点时触发|ev: `FocusEvent`|2.42.0|
|blur|文本框失去焦点时触发|ev: `FocusEvent`|2.42.0|

### `<mention>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|focus|使输入框获取焦点|-|-|2.24.0|
|blur|使输入框失去焦点|-|-|2.24.0|

### `<mention>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|option|选项内容|data: `OptionInfo`|2.13.0|

## 常用模式

- **基本使用**：用于在输入中提及某人或某事，常用于发布、聊天或评论功能。
- **自定义触发字符**：指定 `prefix` 来自定义触发字符。默认为 `@`，可以自定义为任意字符。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
