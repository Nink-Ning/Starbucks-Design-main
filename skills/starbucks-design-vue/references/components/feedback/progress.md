---
name: starbucks-vue-progress
description: "Starbucks UI Vue 进度条 Progress 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-progress>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 进度条 Progress

## 简介

简单的进度条。

## 基本用法

```vue
<template>
  <a-progress :percent="0.2" :style="{width:'50%'}" />
  <br/>
  <br/>
  <a-progress :percent="0.3" :style="{width:'50%'}">
    <template v-slot:text="scope" >
      进度 {{scope.percent * 100}}%
    </template>
  </a-progress>
</template>
```

## API

### `<progress>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|进度条的类型|`'line' \| 'circle'`|`'line'`|
|size|进度条的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|percent|进度条当前的百分比|`number`|`0`|
|steps|开启步骤条模式，并设置步骤数|`number`|`0`|
|animation|是否开启过渡动画|`boolean`|`false`|
|stroke-width|进度条的线宽|`number`|`-`|
|width|进度条的长度|`number\|string`|`-`|
|color|进度条的颜色|`string\|object`|`-`|
|track-color|进度条的轨道颜色|`string`|`-`|
|show-text|是否显示文字|`boolean`|`true`|
|status|进度条状态|`'normal' \| 'success' \| 'warning' \| 'danger'`|`-`|

## 常用模式

- **进度条状态**：通过 `status` 指定进度条状态
- **环形进度条**：设置 `type="circle"` 将会展示环形进度条。
- **迷你进度条**：设置 `size="mini"` 展示微型进度条。
- **进度条大小**：通过 `size` 设置进度条的大小
- **渐变进度条**：`color` 传入对象时， 会作为 `linear-gradient` 的属性值设置渐变色。
- **步骤进度条**：通过设置 `steps` 展示步骤进度条。
- **剩余进度条的颜色**：可以通过 trackColor 设置剩余进度条的颜色

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
