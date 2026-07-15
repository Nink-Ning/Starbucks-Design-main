---
name: starbucks-vue-back-top
description: "Starbucks UI Vue 返回顶部 BackTop 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-back-top>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 返回顶部 BackTop

## 简介

当容器滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。

## 基本用法

```vue
<template>
  <div class="wrapper">
    <ul id="basic-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <a-back-top target-container="#basic-demo" :style="{position:'absolute'}" />
  </div>
</template>

<style scoped lang="less">
.wrapper {
  position: relative;

  ul {
    height: 200px;
    overflow-y: auto;

    li {
      line-height: 30px;
    }
  }
}
</style>
```

## API

### `<back-top>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visible-height|显示回到顶部按钮的触发滚动高度|`number`|`200`|
|target-container|滚动事件的监听容器|`string \| HTMLElement`|`-`|
|easing|滚动动画的缓动方式，可选值参考 [BTween](https://github.com/PengJiyuan/b-tween)|`string`|`'quartOut'`|
|duration|滚动动画的持续时间|`number`|`200`|

## 常用模式

- **自定义按钮**：可以自定义返回按钮。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 底层能力组件优先服务明确场景，避免为了样式效果直接暴露复杂配置。
- 涉及滚动、弹层和 DOM 容器时，先确认挂载容器和边界行为。
