---
name: starbucks-vue-avatar
description: "Starbucks UI Vue 头像 Avatar 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-avatar>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 头像 Avatar

## 简介

头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。

## 基本用法

```vue
<template>
  <a-space size="large">
    <a-avatar>A</a-avatar>
    <a-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </a-avatar>
    <a-avatar :style="{ backgroundColor: '#14a9f8' }">Starbucks</a-avatar>
    <a-avatar :style="{ backgroundColor: '#00d0b6' }">Design</a-avatar>
    <a-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </a-avatar>
  </a-space>
</template>

<script>
import { IconUser } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconUser },
};
</script>
```

## API

### `<avatar>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|shape|头像的形状，有圆形(circle)和正方形(square)两种|`'circle' \| 'square'`|`'circle'`||
|image-url|自定义头像图片地址，如果传入该属性，会默认渲染img标签|`string`|`-`|2.40.0|
|size|头像的尺寸大小，单位是 `px`。未填写时使用样式中的大小 `40px`|`number`|`-`||
|auto-fix-font-size|是否自动根据头像尺寸调整字体大小|`boolean`|`true`||
|trigger-type|可点击的头像交互类型|`'mask' \| 'button'`|`'button'`||
|trigger-icon-style|交互图标的样式|`CSSProperties`|`-`||
|object-fit|图片在容器内的的适应类型|`ObjectFit`|`-`|2.52.0|

### `<avatar>` 事件

|事件名|描述|参数|
|---|---|---|
|click|点击回调|ev: `MouseEvent`|
|error|图片加载错误|-|
|load|图片加载成功|-|

### `<avatar>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|trigger-icon|可点击的头像交互图标|-|

### `<avatar-group>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|shape|头像的形状，有圆形(circle)和正方形(square)两种|`'circle' \| 'square'`|`'circle'`||
|size|头像的尺寸大小，单位是 `px`|`number`|`-`||
|auto-fix-font-size|是否自动根据头像尺寸调整字体大小|`boolean`|`true`||
|max-count|头像组最多显示的头像数量，多余头像将以 `+x` 的形式展示。|`number`|`0`||
|z-index-ascend|头像组内的头像 `z-index` 递增，默认是递减。|`boolean`|`false`||
|max-style|多余头像样式。|`CSSProperties`|`-`|2.7.0|
|max-popover-trigger-props|多余头像气泡的 `TriggerProps`|`TriggerProps`|`-`|2.7.0|

## 常用模式

- **大小和形状**：通过设置 `size` 字段，可以调节头像的大小，默认大小为 `40px`。设置 `shape` 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。
- **头像组**：使用 `Avatar.Group` 可以使用头像组功能，可通过 `size` 指定头像的大小。
- **交互按钮**：可以通过 `trigger-icon` `trigger-type` 来定制交互按钮，类型有 `mask (遮罩)` 和 `button (按钮)` 两种。
- **自动调整字体大小**：如果头像是文字的话，会自动调节字体大小，来适应头像框。
- **自定义头像路径**：自定义头像图片路径

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
