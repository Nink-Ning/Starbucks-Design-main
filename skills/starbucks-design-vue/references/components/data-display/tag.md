---
name: starbucks-vue-tag
description: "Starbucks UI Vue 标签 Tag 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-tag>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 标签 Tag

## 简介

标签的基本用法

## 基本用法

```vue
<template>
  <a-space>
    <a-tag>Default</a-tag>
    <a-tag>Tag 1</a-tag>
    <a-tag>Tag 2</a-tag>
    <a-tag>
      <template #icon>
        <icon-check-circle-fill />
      </template>
      Complete
    </a-tag>
  </a-space>
</template>
```

## API

### `<tag>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|color|标签的颜色|`'red' \| 'orangered' \| 'orange' \| 'gold' \| 'lime' \| 'green' \| 'cyan' \| 'blue' \| 'arcoblue' \| 'purple' \| 'pinkpurple' \| 'magenta' \| 'gray'`|`-`||
|size|标签的大小|`'small' \| 'medium' \| 'large'`|`'medium'`||
|bordered|是否显示边框|`boolean`|`false`|2.33.0|
|visible **(v-model)**|标签是否可见|`boolean`|`-`||
|default-visible|标签默认是否可见|`boolean`|`true`||
|loading|标签是否为加载中状态|`boolean`|`false`||
|closable|标签是否可关闭|`boolean`|`false`||
|checkable|标签是否可选中|`boolean`|`false`||
|checked **(v-model)**|标签是否选中（标签可选中时可用）|`boolean`|`-`||
|default-checked|标签默认选中状态（标签可选中时可用）|`boolean`|`true`||
|nowrap|标签内容不换行|`boolean`|`false`|2.56.1|

### `<tag>` 事件

|事件名|描述|参数|
|---|---|---|
|close|点击关闭按钮时触发|ev: `MouseEvent`|
|check|用户选中时触发（仅在可选中模式下触发）|checked: `boolean`<br>ev: `MouseEvent`|

### `<tag>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|
|close-icon|关闭按钮的图标|-|

## 常用模式

- **可关闭标签**：通过 `closable` 属性控制标签是否可关闭。可关闭标签可通过 `close` 事件执行一些关闭后操作，也可通过 `visible` 属性控制标签的显示或隐藏。
- **动态编辑标签**：可动态添加和删除标签。
- **可选中**：通过设置 `checkable` ，可以实现点击选中的效果。
- **标签的颜色**：我们提供多种预设色彩的标签样式，通过 `color` 设置不同颜色。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。
- **标签的尺寸**：标签的大小分为：`small`、`medium`、`large` 三种，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为 `medium`。
- **加载中状态**：标签的加载中状态。
- **带图标的标签**：可通过 `icon` 插槽在标签中加入图标。
- **带边框的标签**：通过参数 `bordered`，可以显示带边框的标签。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
