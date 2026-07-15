---
name: starbucks-vue-auto-complete
description: "Starbucks UI Vue 自动补全 AutoComplete 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-auto-complete>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 自动补全 AutoComplete

## 简介

自动补全的基础用法

## 基本用法

```vue
<template>
  <a-auto-complete :data="data" @search="handleSearch" :style="{width:'360px'}" placeholder="please enter something"/>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleSearch(value) {
      if (value) {
        this.data = [...Array(5)].map((_, index) => `${value}-${index}`)
        console.log(this.data)
      } else {
        this.data = []
      }
    }
  }
}
</script>
```

## API

### `<auto-complete>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控模式）|`string`|`''`||
|disabled|是否禁用|`boolean`|`false`||
|data|用于自动提示的数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`||
|strict|是否为严格校验模式|`boolean`|`false`||
|filter-option|自定义选项过滤方法|`FilterOption`|`true`||
|trigger-props|trigger 组件属性|`TriggerProps`|`-`|2.14.0|
|allow-clear|是否允许清空输入框|`boolean`|`false`|2.23.0|
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`|2.50.0|

### `<auto-complete>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|绑定值发生改变时触发|value: `string`||
|search|用户搜索时触发|value: `string`||
|select|选择选项时触发|value: `string`||
|clear|用户点击清除按钮时触发|ev: `Event`|2.23.0|
|dropdown-scroll|下拉菜单发生滚动时触发|ev: `Event`|2.52.0|
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|ev: `Event`|2.52.0|

### `<auto-complete>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|focus|使输入框获取焦点|-|-|2.40.0|
|blur|使输入框失去焦点|-|-|2.40.0|

### `<auto-complete>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|option|选项内容|data: `OptionInfo`|2.13.0|
|footer|弹出框的页脚|-||

## 常用模式

- **区分大小写**：使用 `strict` 属性来指明在匹配时严格区分大小写。
- **弹出框的页脚**：自定义弹出框的页脚

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
