---
name: starbucks-vue-menu
description: "Starbucks UI Vue 菜单 Menu 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-menu>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 菜单 Menu

## 简介

设置 `mode` 为 `horizontal` 时，使用水平菜单。

## 基本用法

```vue
<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
        />
      </a-menu-item>
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
</template>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
```

## API

### `<menu>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|theme|菜单的主题|`'light' \| 'dark'`|`'light'`||
|mode|菜单的模式|`'vertical' \| 'horizontal' \| 'pop' \| 'popButton'`|`'vertical'`||
|level-indent|层级之间的缩进量|`number`|`-`||
|auto-open|默认展开所有多级菜单|`boolean`|`false`||
|collapsed **(v-model)**|是否折叠菜单|`boolean`|`-`||
|default-collapsed|默认是否折叠菜单|`boolean`|`false`||
|collapsed-width|折叠菜单宽度|`number`|`-`||
|accordion|开启手风琴效果|`boolean`|`false`||
|auto-scroll-into-view|是否自动滚动选中项目到可见区域|`boolean`|`false`||
|show-collapse-button|是否内置折叠按钮|`boolean`|`false`||
|selected-keys **(v-model)**|选中的菜单项 key 数组|`string[]`|`-`||
|default-selected-keys|默认选中的菜单项 key 数组|`string[]`|`[]`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<menu>` 事件

|事件名|描述|参数|
|---|---|---|
|collapse|折叠状态改变时触发|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|menu-item-click|点击菜单项时触发|key: `string`|
|sub-menu-click|点击子菜单时触发|key: `string`<br>openKeys: `string[]`|

### `<menu>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|collapse-icon|折叠图标|collapsed: `boolean`|
|expand-icon-right|向右展开的图标|-|
|expand-icon-down|向下展开的图标|-|

### `<sub-menu>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|子菜单的标题|`string`|`-`||
|selectable|弹出模式下，是否将多级菜单头也作为一个菜单项，支持点击选中等状态|`boolean`|`false`||
|popup|是否强制使用弹出模式，`level` 表示当前子菜单的层级|`boolean \| ((level: number) => boolean)`|`false`||
|popup-max-height|弹出框的最大高度|`boolean \| number`|`true`|2.23.0|

### `<sub-menu>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|title|标题|-||
|expand-icon-right|向右展开的图标|-||
|expand-icon-down|向下展开的图标|-||
|icon|菜单的图标|-|2.11.0|

### `<menu-item-group>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|菜单组的标题|`string`|`-`|

### `<menu-item-group>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|

### `<menu-item>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|disabled|是否禁用|`boolean`|`false`|

### `<menu-item>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|菜单的图标|-|2.11.0|

## 常用模式

- **顶部导航菜单**：设置 `mode` 为 `horizontal` 时，使用水平菜单。
- **深色模式导航**：通过 `theme` 指定主题，分为 `light` 和 `dark` 两种。
- **缩起内嵌菜单**：通过 `collapsed` 来指定菜单收起。
- **响应式收缩**：设置 `breakpoint` 可触发响应式收缩。
- **内嵌菜单**：菜单内可以嵌入多个子项，通过 `openKeys` 可以设置默认打开的子项。
- **不同大小菜单**：通过 `style` 自由指定菜单的宽度和菜单项的高度。
- **悬浮菜单**：指定 `mode` 为 `pop` 可以使用悬浮菜单。
- **悬浮按钮菜单**：指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 导航状态应与路由或业务状态保持单一来源，避免组件内部状态和路由不同步。
- 菜单、分页、步骤等受控状态优先使用 `v-model` 或命名 `v-model:*`。
