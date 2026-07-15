---
name: starbucks-vue-split
description: "Starbucks UI Vue 面板分割 Split 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-split>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 面板分割 Split

## 简介

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

## 基本用法

```vue
<template>
  <div>
    <a-split :style="{
        height: '200px',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)'
      }"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <a-typography-paragraph>Left</a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph>Right</a-typography-paragraph>
      </template>
    </a-split>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 0.5
    }
  }
}
</script>
```

## API

### `<split>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|component|分割框的 html 标签|`string`|`'div'`|
|direction|分割的方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|size **(v-model)**|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|default-size|默认分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`0.5`|
|min|最小阈值，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|max|最大阈值，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|disabled|是否禁用|`boolean`|`false`|

### `<split>` 事件

|事件名|描述|参数|
|---|---|---|
|move-start|开始拖拽之前触发|-|
|moving|拖拽时触发|-|
|move-end|拖拽结束之后触发|-|

### `<split>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|first|第一个面板的内容|-|
|resize-trigger|伸缩杆的内容|-|
|resize-trigger-icon|伸缩杆的图标|-|
|second|第二个面板的内容|-|

## 常用模式

- **面板分割嵌套**：面板分割可以嵌套使用。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
