---
name: starbucks-vue-calendar
description: "Starbucks UI Vue 日历 Calendar 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-calendar>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 日历 Calendar

## 简介

展示和选择日历

## 基本用法

```vue

<template>
  <a-calendar v-model="value" />
  select: {{value}}
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(new Date('2023-01-01'));

    return {
      value
    }
  },
}
</script>
```

## API

### `<calendar>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`date`|`-`|
|default-value|默认值（非受控状态）|`date`|`-`|
|mode|模式|`'month' \| 'year'`|`-`|
|default-mode|默认模式|`'month' \| 'year'`|`'month'`|
|modes|显示的模式|`('month' \| 'year')[]`|`['month', 'year']`|

### `<calendar>` 事件

|事件名|描述|参数|
|---|---|---|
|change|选择的日期改变时触发|date: `Date`|
|panel-change|日期面板改变时触发|date: `Date`|

### `<calendar>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|header|自定义头部内容|year: `number`<br>month: `number`|2.53.0|
|default|自定义单元格内容|year: `number`<br>month: `number`<br>date: `number`|2.53.0|

## 常用模式

- **基础使用**：直接使用全局 `a-` 前缀组件，按需绑定属性、事件和插槽。
- **受控状态**：涉及值或显隐时优先使用 `v-model` 或命名 `v-model:*`。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
