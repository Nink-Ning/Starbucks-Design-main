---
name: starbucks-vue-layout
description: "Starbucks UI Vue 布局 Layout 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-layout>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 布局 Layout

## 简介

典型的页面布局。

## 基本用法

```vue
<template>
  <div class="layout-demo">
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider theme="dark">Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-content>Content</a-layout-content>
        <a-layout-sider>Sider</a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
    <br />
    <a-layout style="height: 400px;">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider style="width: 64px;">Sider</a-layout-sider>
        <a-layout-sider style="width: 206px; margin-left: 1px;">Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}


.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```

## API

### `<layout>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|has-sider|表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动|`boolean`|`false`|

### `<layout-header>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|

### `<layout-content>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|

### `<layout-footer>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|

### `<layout-sider>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|theme|主题颜色|`'dark' \| 'light'`|`'light'`|
|collapsed|当前收起状态|`boolean`|`-`|
|default-collapsed|默认的收起状态|`boolean`|`false`|
|collapsible|是否可收起|`boolean`|`false`|
|width|宽度|`number`|`200`|
|collapsed-width|收缩宽度|`number`|`48`|
|reverse-arrow|翻转折叠提示箭头的方向，当 Sider 在右边时可以使用|`boolean`|`false`|
|breakpoint|触发响应式布局的断点, 详见[响应式栅格](grid.md)|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|
|resize-directions|可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。详情请看 [ResizeBox](../other/resize-box.md)。|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`-`|
|hide-trigger|隐藏底部折叠触发器|`boolean`|`false`|

### `<layout-sider>` 事件

|事件名|描述|参数|
|---|---|---|
|collapse|展开-收起时的事件，有点击 trigger 以及响应式反馈两种方式可以触发|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|breakpoint|触发响应式布局断点时的事件|collapsed: `boolean`|

### `<layout-sider>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|trigger|自定义底部折叠触发器|collapsed: `boolean`|

## 常用模式

- **自定义按钮 Icon**：通过设置 `Menu.Sider` 的 `trigger` 属性，实现自定义收起按钮的图标。
- **自定义收起按钮**：设置`Menu.Sider` 的`hide-trigger`属性为`true`后，`Sider` 内置的缩起按钮不会显示。此时可自定义收起按钮。
- **响应式侧边栏**：左侧 Slider 可以结合 Menu 设置为展开/收起状态, 设置`breakpoint`可触发响应式收缩。
- **可伸缩侧边栏**：可以用鼠标进行拖拽放大缩小的侧边栏，需要用到的参数：`resizeDirections`。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 布局组件只处理结构和间距，不在其中承载业务状态。
- 响应式页面优先组合 `a-grid`、`a-row`、`a-col` 和 `a-space`。
