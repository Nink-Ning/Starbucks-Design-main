---
name: starbucks-vue-trigger
description: "Starbucks UI Vue 触发器 Trigger 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-trigger>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 触发器 Trigger

## 简介

这个例子展示了触发器的最基础的使用。触发器默认是没有弹出框的样式的。以下示例均为官网添加的样式。

## 基本用法

```vue
<template>
  <a-space>
    <a-trigger position="top" auto-fit-position :unmount-on-close="false">
      <span>Hover Me</span>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="click" :unmount-on-close="false">
      <a-button>Click Me</a-button>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="focus">
      <a-input placeholder="Focus on me" />
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
  </a-space>
</template>

<style scoped>
.demo-basic {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
```

## API

### `<trigger>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|popup-visible **(v-model)**|弹出框是否可见|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|trigger|触发方式|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'hover'`||
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'bottom'`||
|disabled|触发器是否禁用|`boolean`|`false`||
|popup-offset|弹出框的偏移量（弹出框距离触发器的偏移距离）|`number`|`0`||
|popup-translate|弹出框的移动距离|`TriggerPopupTranslate`|`-`||
|show-arrow|弹出框是否显示箭头|`boolean`|`false`||
|align-point|弹出框是否跟随鼠标|`boolean`|`false`||
|popup-hover-stay|是否在移出触发器，并移入弹出框时保持弹出框显示|`boolean`|`true`||
|blur-to-close|是否在触发器失去焦点时关闭弹出框|`boolean`|`true`||
|click-to-close|是否在点击触发器时关闭弹出框|`boolean`|`true`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<trigger>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|popup-visible-change|弹出框显示状态改变时触发|visible: `boolean`||
|show|弹出框显示后（动画结束）触发|-|2.18.0|
|hide|弹出框隐藏后（动画结束）触发|-|2.18.0|

### `<trigger>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|content|弹出框内容|-|

### 类型定义

```ts
type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };
```

## 常用模式

- **多层嵌套**：弹出层可以嵌套在另一个弹出层内。
- **多个触发方式**：通过`trigger`传入数组，可以设置多个触发方式。
- **跟随鼠标显示弹出框**：设置`align-point`属性，可以使弹出层出现在鼠标位置。
- **滚动容器**：通过设置 `update-at-scroll` 监听容器的滚动。
- **显示箭头元素**：通过`show-arrow`属性，可以展示默认的箭头元素。也可以通过`arrow-class`或`arrow-style`进行定制。
- **弹窗偏移量**：通过`popup-translate`属性，可以设置弹窗在原本位置的基础上进行额外的位置调整。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
