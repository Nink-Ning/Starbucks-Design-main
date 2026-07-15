---
name: starbucks-vue-timeline
description: "Starbucks UI Vue 时间轴 Timeline 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-timeline>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 时间轴 Timeline

## 简介

基本使用

## 基本用法

```vue
<template>
  <div :style="{ marginBottom: '40px' }">
    <a-typography-text :style="{ verticalAlign: 'middle', marginRight: '8px' }">
      Reverse
    </a-typography-text>
    <a-radio-group
      @change="onChange"
      style="{ marginBottom: '30px' }"
      :modelValue="isReverse"
    >
      <a-radio :value="false">No Reverse</a-radio>
      <a-radio :value="true">Reverse</a-radio>
    </a-radio-group>
  </div>
  <a-timeline :reverse="isReverse">
    <a-timeline-item label="2017-03-10">The first milestone</a-timeline-item>
    <a-timeline-item label="2018-05-12">The second milestone</a-timeline-item>
    <a-timeline-item label="2020-09-30">The third milestone</a-timeline-item>
  </a-timeline>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isReverse = ref(false);

    const onChange = (bool) => {
      isReverse.value = bool;
    };

    return {
      isReverse,
      onChange
    }
  },
};
</script>
```

## API

### `<timeline>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|reverse|是否倒序|`boolean`|`false`|
|direction|时间轴方向|`'horizontal' \| 'vertical'`|`'vertical'`|
|mode|时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。|`'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'`|`'left'`|
|pending|是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入字符串时，会作为节点内容展示。|`boolean\|string`|`-`|
|label-position|设置标签文本的位置|`'relative' \| 'same'`|`'same'`|

### `<timeline>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|dot|幽灵节点|-|

### `<timeline-item>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|dot-color|节点颜色|`string`|`-`|
|dot-type|节点类型：空心圆/实心圆|`'hollow' \| 'solid'`|`'solid'`|
|line-type|时间轴类型：实线/虚线/点状线|`'solid' \| 'dashed' \| 'dotted'`|`'solid'`|
|line-color|时间轴颜色|`string`|`-`|
|label|标签文本|`string`|`-`|
|position|Item 位置|`PositionType`|`-`|

### `<timeline-item>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|dot|自定义节点|-||
|label|自定义标签|-|2.50.0|

## 常用模式

- **自定义节点内容**：自定义节点内容
- **自定义节点**：可以通过属性 `dotColor`, `dotType` 设置节点的颜色以及节点类型。同时可通过 `dot` 直接传入 DOM 自定义节点样式。优先级高于 `dotColor` 和 `dotType`
- **自定义轴线样式**：自定义轴线的示例。
- **幽灵节点**：当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过`slot#pending-dot`定制其轴点。
- **时间轴展示类型**：设置 `mode=alternate`时将会交替展示内容。同时可以通过设置 `TimelineItem` 的 `positon`属性控制时间轴节点的位置.
- **纵向时间轴**：竖直方向的时间轴。
- **横向时间轴**：可以通过 `direction` 设置展示横向时间轴
- **标签文本位置**：通过 `labelPosition` 可以设置标签文本的位置。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
