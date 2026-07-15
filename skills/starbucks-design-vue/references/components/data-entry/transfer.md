---
name: starbucks-vue-transfer
description: "Starbucks UI Vue 数据穿梭框 Transfer 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-transfer>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 数据穿梭框 Transfer

## 简介

数据穿梭框的基本用法。

## 基本用法

```vue
<template>
  <a-transfer :data="data" :default-value="value" />
</template>

<script>
export default {
  setup() {
    const data = Array(8).fill(undefined).map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`
    }));
    const value = ['option1', 'option3', 'option5'];

    return {
      data,
      value
    }
  },
}
</script>
```

## API

### `<transfer>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|穿梭框的数据|`TransferItem[]`|`[]`||
|model-value **(v-model)**|目标选择框中的值|`string[]`|`-`||
|default-value|目标选择框中默认的值（非受控状态）|`string[]`|`[]`||
|selected **(v-model)**|选中的选项值|`string[]`|`-`||
|default-selected|默认选中的选项值（非受控状态）|`string[]`|`[]`||
|disabled|是否禁用|`boolean`|`false`||
|simple|是否开启简单模式（点击选项即移动）|`boolean`|`false`||
|one-way|是否开启单向模式（仅可移动到目标选择框）|`boolean`|`false`||
|show-search|是否显示搜索框|`boolean`|`false`||
|show-select-all|是否展示全选勾选框|`boolean`|`true`|2.39.0|
|title|源选择框和目标选择框的标题|`string[]`|`['Source', 'Target']`||
|source-input-search-props|源选择框的搜索框配置|`object`|`-`|2.51.1|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<transfer>` 事件

|事件名|描述|参数|
|---|---|---|
|change|目标选择框的值改变时触发|value: `string[]`|
|select|选中的值改变时触发|selected: `string[]`|
|search|用户搜索时触发|value: `string`<br>type: `'target'\|'source'`|

### `<transfer>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|source|源面板|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|source-title|源标题插槽|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|to-target-icon|移至目标图标插槽|-|2.52.0|
|to-source-icon|移至源图标插槽|-|2.52.0|
|target|目标面板|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|target-title|目标标题插槽|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|item|选项|value: `string`<br>label: `string`||

### TransferItem

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项的值|`string`|`-`|
|label|选项的标签|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|

## 常用模式

- **基本使用**：数据穿梭框的基本用法。
- **搜索**：通过设置 `show-search` 来使用带搜索框的穿梭框，可以自定义搜索函数。
- **单向**：通过设置 `one-way` ，使用单向模式的穿梭框。
- **自定义选项渲染**：通过 `item` 插槽自定义选项的渲染内容。
- **简单模式**：通过设置 `simple` 来开启简单模式，点击选项即可移动。
- **树型穿梭框**：通过穿梭框自定义接口可以实现树型穿梭框。
- **自定义标题栏**：通过 `source-title` ,`target-title` 插槽自定义标题栏的渲染内容

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
