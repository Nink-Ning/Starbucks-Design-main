---
name: starbucks-vue-anchor
description: "Starbucks UI Vue 锚点 Anchor 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-anchor>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 锚点 Anchor

## 简介

锚点的基础用法

## 基本用法

```vue
<template>
  <a-anchor>
    <a-anchor-link href="#basic">Basic</a-anchor-link>
    <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
    <a-anchor-link href="#affix">
      Affix
      <template #sublist>
        <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
        <a-anchor-link href="#hash">Hash mode</a-anchor-link>
      </template>
    </a-anchor-link>
  </a-anchor>
</template>
```

## API

### `<anchor>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|boundary|滚动边界值，设置该值为数字后，将会在距离滚动容器 `boundary` 距离时停止滚动。|`'start' \| 'end' \| 'center' \| 'nearest' \| number`|`'start'`|
|line-less|是否显示左侧轴线|`boolean`|`false`|
|scroll-container|滚动容器|`string \| HTMLElement \| Window`|`-`|
|change-hash|是否改变hash。设置为 `false` 时点击锚点不会改变页面的 hash|`boolean`|`true`|
|smooth|是否使用平滑滚动|`boolean`|`true`|

### `<anchor>` 事件

|事件名|描述|参数|
|---|---|---|
|select|用户点击链接时触发|hash: ` string \| undefined `<br>preHash: `string`|
|change|链接发生改变时触发|hash: `string`|

### `<anchor-link>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|锚点链接的文本内容|`string`|`-`|
|href|锚点链接的地址|`string`|`-`|

## 常用模式

- **无轴线模式**：设置 `line-less` 时，可以使用无左侧轴线的锚点样式。
- **固钉位置**：使用 `affix` 组件可以让锚点固定在页面之内。
- **锚点滚动偏移量**：可以设置 `boundary` 来定制锚点滚动偏移量。
- **是否改变hash**：可以设置点击锚点而不改变浏览器历史。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
