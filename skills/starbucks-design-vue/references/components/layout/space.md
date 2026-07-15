---
name: starbucks-vue-space
description: "Starbucks UI Vue 间距 Space 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-space>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 间距 Space

## 简介

间距组件的基本用法。

## 基本用法

```vue
<template>
  <a-space>
    <a-typography-text>Space:</a-typography-text>
    <a-tag v-if="false" color='arcoblue'>Tag</a-tag>
    <a-button type="primary">Item1</a-button>
    <a-button type="primary">Item2</a-button>
    <a-switch defaultChecked />
  </a-space>
</template>
```

## API

### `<space>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|align|对齐方式|`'start' \| 'end' \| 'center' \| 'baseline'`|`-`||
|direction|间距方向|`'vertical' \| 'horizontal'`|`'horizontal'`||
|size|间距大小，支持分别制定横向和竖向的间距|`number \| 'mini' \| 'small' \| 'medium' \| 'large' \| [SpaceSize, SpaceSize]`|`'small'`||
|wrap|环绕类型的间距，用于折行的场景。|`boolean`|`false`||
|fill|充满整行|`boolean`|`false`|2.11.0|

### `<space>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|split|设置分隔符|-|

### 类型定义
```ts
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';
```

## 常用模式

- **垂直间距**：可以设置垂直方向排列的间距。
- **尺寸**：内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。
- **对齐**：内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。
- **环绕间距**：环绕类型的间距，四周都有间距，一般用于换行的场景。
- **分隔符**：为相邻子元素设置分隔符。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 布局组件只处理结构和间距，不在其中承载业务状态。
- 响应式页面优先组合 `a-grid`、`a-row`、`a-col` 和 `a-space`。
