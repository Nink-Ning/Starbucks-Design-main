---
name: starbucks-vue-select
description: "Starbucks UI Vue 选择器 Select 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-select>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 选择器 Select

## 简介

选择器的基本用法。通过 `trigger-props` 属性自定义下拉框的属性，比如可以让下拉框自动适应最小宽度。

## 基本用法

```vue

<template>
  <a-space direction="vertical" size="large">
    <a-select :style="{width:'320px'}" placeholder="Please select ...">
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
    <a-select :style="{width:'320px'}" placeholder="Please select ...">
      <a-option :value="true">是</a-option>
      <a-option :value="false">否</a-option>
    </a-select>
    <a-select defaultValue="Beijing" :style="{width:'320px'}" placeholder="Please select ..." disabled>
      <a-option>Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
    <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ...">
      <a-option v-for="item of data" :value="item" :label="item.label" />
    </a-select>
    <div>Select Value: {{ value }}</div>
    <a-select :style="{width:'160px'}" placeholder="Select" :trigger-props="{ autoFitPopupMinWidth: true }">
      <a-option>Beijing-Beijing-Beijing</a-option>
      <a-option>Shanghai</a-option>
      <a-option>Guangzhou</a-option>
      <a-option disabled>Disabled</a-option>
    </a-select>
    
  </a-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      other: 'extra'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```

## API

### `<select>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string\| number\| boolean\| Record<string, any>\| (string \| number \| boolean \| Record<string, any>)[]`|`-`||
|default-value|默认值（非受控模式）|`string\| number\| boolean\| Record<string, unknown>\| (string \| number \| boolean \| Record<string, unknown>)[]`|`'' \| []`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控模式）|`string`|`''`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|placeholder|占位符|`string`|`-`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|allow-clear|是否允许清空|`boolean`|`false`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<select>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: ` string \| number \| boolean \| Record<string, any> \| (string \| number \| boolean \| Record<string, any>)[] `||
|input-value-change|输入框的值发生改变时触发|inputValue: `string`||
|popup-visible-change|下拉框的显示状态改变时触发|visible: `boolean`||
|clear|点击清除按钮时触发|-||
|remove|点击标签的删除按钮时触发|removed: `string \| number \| boolean \| Record<string, any> \| undefined`||
|search|用户搜索时触发|inputValue: `string`||
|dropdown-scroll|下拉菜单发生滚动时触发|-||
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|-||
|exceed-limit|多选超出限制时触发|value: `string \| number \| boolean \| Record<string, any> \| undefined`<br>ev: `Event`|2.18.0|

### `<select>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|trigger|自定义触发元素|-|2.22.0|
|prefix|前缀元素|-|2.22.0|
|search-icon|选择框的搜索图标|-|2.16.0|
|loading-icon|选择框的加载中图标|-|2.16.0|
|arrow-icon|选择框的箭头图标|-|2.16.0|
|footer|下拉框的页脚|-||
|header|下拉框的页头|-|2.43.0|
|label|选择框的显示内容|data: `SelectOptionData`||
|option|选项内容|data: `SelectOptionData`||
|empty|选项为空时的显示内容|-||

### `<option>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（如不填，会从内容中获取）|`string\|number\|boolean\|object`|`-`||
|label|选项标签（如不填，会从内容中获取）|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tag-props|展示的标签属性|`TagProps`|`-`|2.8.0|
|extra|额外数据。2.18.0 版本废弃，可使用对象形式的 value 扩展数据|`object`|`-`|2.10.0|
|index|用于手动指定选项的 index|`number`|`-`|2.20.0|

### `<optgroup>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项组的标题|`string`|`-`|

### `<optgroup>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选项组的标题|-|2.10.0|

```ts
/**
 * @zh 选项
 * @en Option
 */
type Option = string | number | SelectOptionData | SelectOptionGroup;

/**
 * @zh 筛选
 * @en Filter
 */
type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);
```

### SelectOptionData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string \| number \| boolean \| Record<string, unknown>`|`-`|
|label|选项内容|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|tagProps|选项对应的多选标签的属性|`any`|`-`|
|render|自定义渲染|`RenderFunction`|`-`|

### SelectOptionGroup

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|isGroup|是否为选项组|`true`|`-`|
|label|选项组标题|`string`|`-`|
|options|选项组中的选项|`SelectOption[]`|`-`|

### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|2.34.1|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|2.34.1|

## 常用模式

- **允许清除**：通过设置 `allow-clear` ，显示清除按钮。
- **多选选择器**：通过设置 `multiple` ，可以让选择器支持多选。此外通过 `max-tag-count` 可以设置最多显示的标签个数。
- **选择框大小**：选择框分为 `mini`、`small`、`medium`、`large` 四种尺寸。
- **加载中**：选择框和下拉菜单显示加载中状态。
- **下拉菜单的页头**：自定义下拉菜单的页头
- **下拉菜单的页脚**：自定义下拉菜单的页脚
- **无边框模式**：设置 `bordered="false"` 开启无边框模式，常用于沉浸式使用。
- **允许创建**：通过设置 `allow-create` ，让选择器可以创建选项中不存在的条目。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
