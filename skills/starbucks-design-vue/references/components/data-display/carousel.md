---
name: starbucks-vue-carousel
description: "Starbucks UI Vue 图片轮播 Carousel 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-carousel>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 图片轮播 Carousel

## 简介

基本用法

## 基本用法

```vue
<template>
  <a-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :default-current="2"
    @change="handleChange"
  >
    <a-carousel-item v-for="image in images">
      <img
        :src="image"
        :style="{
          width: '100%',
        }"
      />
    </a-carousel-item>
  </a-carousel>
</template>

<script>
export default {
  setup() {
    const images = [
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    ];
    const handleChange=(value)=>{
      console.log(value)
    }
    return {
      images,
      handleChange
    }
  },
};
</script>
```

## API

### `<carousel>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|current **(v-model)**|当前展示索引|`number`|`-`|
|default-current|当前展示索引|`number`|`1`|
|auto-play|是否自动循环展示，或者传入 `{ interval: 自动切换的时间间隔(默认: 3000), hoverToPause: 鼠标悬浮时是否暂停自动切换(默认: true) }` 进行高级配置|`boolean \| CarouselAutoPlayConfig`|`false`|
|move-speed|幻灯片移动速率(ms)|`number`|`500`|
|animation-name|切换动画|`'slide' \| 'fade' \| 'card'`|`'slide'`|
|trigger|幻灯片切换触发方式, click/hover 指示器|`'click' \| 'hover'`|`'click'`|
|direction|幻灯片移动方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|show-arrow|切换箭头显示时机|`'always' \| 'hover' \| 'never'`|`'always'`|
|arrow-class|切换箭头样式|`string`|`''`|
|indicator-type|指示器类型，可为小方块和小圆点或不显示|`'line' \| 'dot' \| 'slider' \| 'never'`|`'dot'`|
|indicator-position|指示器位置|`'bottom' \| 'top' \| 'left' \| 'right' \| 'outer'`|`'bottom'`|
|indicator-class|指示器的样式|`string`|`''`|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<carousel>` 事件

|事件名|描述|参数|
|---|---|---|
|change|幻灯片发生切换时的回调函数|index: `number`<br>prevIndex: `number`<br>isManual: `boolean`|

## 常用模式

- **自动切换**：可以通过 `autoPlay` 设置是否自动切换。可设置 `moveSpeed`, `timingFunc` 实现不同切换幻灯片效果。
- **指示器**：可以指定指示器类型：`dot` | `line` | `slider` 和位置 `left` | `right` | `top` | `bottom` | `outer`。
- **切换方向**：默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来使用垂直方向切换。
- **卡片化**：当页面宽度方向空间空余，但高度方向空间多余时，可指定 `animation` 为 `card` 使用卡片化风格。
- **渐隐切换**：指定 `animation` 为 `fade` 使用渐隐切换效果。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
