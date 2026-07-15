---
name: starbucks-vue-overflow-list
description: "Starbucks UI Vue 折叠列表 OverflowList 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-overflow-list>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 折叠列表 OverflowList

## 简介

折叠列表的基本使用方法。

## 基本用法

```vue
<template>
  <a-form auto-label-width>
    <a-form-item label="Tag Number">
      <a-input-number v-model="number" :min="0" :max="20" style="width: 200px"/>
    </a-form-item>
    <a-form-item label="List Width">
      <a-slider v-model="width" :min="0" :max="800" />
    </a-form-item>
  </a-form>
  <div :style="{width:`${width}px`,marginTop:'20px'}">
    <a-overflow-list>
      <div>DIV Element</div>
      <a-tag v-for="item of tags" :key="item">Tag{{item}}</a-tag>
    </a-overflow-list>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  setup() {
    const width = ref(500);
    const number = ref(10);
    const tags = computed(() => Array.from({length: number.value}, (_, idx) => idx + 1));

    return {
      width,
      number,
      tags
    }
  }
}
</script>
```

## API

### `<overflow-list>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|min|最少展示的元素个数|`number`|`0`|
|margin|项目间隔|`number`|`8`|
|from|折叠方向|`'start' \| 'end'`|`'end'`|

### `<overflow-list>` 事件

|事件名|描述|参数|
|---|---|---|
|change|溢出数量改变时触发|value: `number`|

### `<overflow-list>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|overflow|折叠元素|number: `number`|

## 常用模式

- **基本使用**：折叠列表的基本使用方法。
- **折叠方向**：通过 `from` 属性可以设置折叠的方向。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
