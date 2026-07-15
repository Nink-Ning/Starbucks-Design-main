---
name: starbucks-vue-color-picker
description: "Starbucks UI Vue 颜色选择器 ColorPicker 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-color-picker>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 颜色选择器 ColorPicker

## 简介

基本用法

## 基本用法

```vue
<template>
  <a-space>
    <a-color-picker  v-model="value" />
    <a-color-picker defaultValue="#165DFF" showText disabledAlpha/>
  </a-space>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('#165DFF')
</script>
```

## API

### `<color-picker>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string`|`-`|
|default-value|默认值（非受控状态）|`string`|`-`|
|format|颜色值的格式|`'hex' \| 'rgb'`|`-`|
|size|尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|show-text|显示颜色值|`boolean`|`false`|
|show-history|显示历史颜色|`boolean`|`false`|
|show-preset|显示预设颜色|`boolean`|`false`|
|disabled|禁用|`boolean`|`false`|
|disabled-alpha|禁用透明通道|`boolean`|`false`|
|hide-trigger|没有触发元素，只显示颜色面板|`boolean`|`false`|
|trigger-props|接受所有 [Trigger](../other/trigger.md) 组件的Props|`Partial<TriggerProps>`|`-`|
|history-colors|历史颜色的颜色数组|`string[]`|`-`|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<color-picker>` 事件

|事件名|描述|参数|
|---|---|---|
|change|颜色值改变时触发|value: `string`|
|popup-visible-change|颜色面板展开和收起时触发|visible: `boolean`<br>value: `string`|

## 常用模式

- **基本使用**：基本用法
- **尺寸**：颜色选择器定义了四种尺寸（`mini`,`small`, `medium`, `large`），分别为 24px，28px，32px，36px。
- **禁用**：设置 `disabled` 禁用选择器。
- **颜色格式**：通过 `format` 设置颜色值的格式，支持 `hex` 和 `rgb`。
- **预设颜色和历史颜色**：通过 `showPreset` 和 `showHistory` 开启预设颜色和历史颜色区域。历史颜色需要用户自行控制展示内容。
- **触发器**：可以通过 `trigger-props` 设置触发器的所有属性。
- **自定义触发元素**：自定义触发元素。
- **只使用面板**：只用颜色选择面板。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
