---
name: starbucks-vue-grid
description: "Starbucks UI Vue 栅格 Grid 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-grid>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 栅格 Grid

## 简介

展示了最基本的 24 等分应用。

## 基本用法

```vue
<template>
  <div class="grid-demo-background">
    <a-space direction="vertical" :size="16" style="display: block;">
      <a-row class="grid-demo">
        <a-col :span="24">
          <div>24 - 100%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="12">
          <div>12 - 50%</div>
        </a-col>
        <a-col :span="12">
          <div>12 - 50%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
        <a-col :span="8">
          <div>8 - 33.33%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
        <a-col :span="6">
          <div>6 - 25%</div>
        </a-col>
      </a-row>
      <a-row class="grid-demo">
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
        <a-col :span="4">
          <div>4 - 16.66%</div>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<style scoped>
.grid-demo-background {
  background-image: linear-gradient(
    90deg,
    var(--color-fill-2) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    var(--color-fill-2) 8.33333333%,
    var(--color-fill-2) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    var(--color-fill-2) 16.66666667%,
    var(--color-fill-2) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    var(--color-fill-2) 25%,
    var(--color-fill-2) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    var(--color-fill-2) 33.33333333%,
    var(--color-fill-2) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    var(--color-fill-2) 41.66666667%,
    var(--color-fill-2) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    var(--color-fill-2) 50%,
    var(--color-fill-2) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    var(--color-fill-2) 58.33333333%,
    var(--color-fill-2) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    var(--color-fill-2) 66.66666667%,
    var(--color-fill-2) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    var(--color-fill-2) 75%,
    var(--color-fill-2) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    var(--color-fill-2) 83.33333333%,
    var(--color-fill-2) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    var(--color-fill-2) 91.66666667%,
    var(--color-fill-2) 95.83333333%,
    transparent 95.83333333%
  );
}
.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

## API

### `<row>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|gutter|栅格间隔，单位是`px` 栅格间隔。可传入响应式对象写法 { xs: 4, sm: 6, md: 12}，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。|`number\| ResponsiveValue\| [number \| ResponsiveValue, number \| ResponsiveValue]`|`0`||
|justify|水平对齐方式 (`justify-content`)|`'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'`|`'start'`||
|align|竖直对齐方式 ( `align-items` )|`'start' \| 'center' \| 'end' \| 'stretch'`|`'start'`||
|div|开启这个选项`Row`和`Col`都会被当作div而不会附带任何Grid相关的类和样式|`boolean`|`false`||
|wrap|`Col` 是否支持换行|`boolean`|`true`|2.13.0|

### `<col>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|span|栅格占位格数|`number`|`24`||
|offset|栅格左侧的间隔格数，间隔内不可以有栅格|`number`|`-`||
|order|对元素进行排序|`number`|`-`||
|xs|< 576px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|sm|>= 576px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|md|>= 768px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|lg|>= 992px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|xl|>= 1200px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|xxl|>= 1600px 响应式栅格|`number \| { [key: string]: any }`|`-`||
|flex|设置 flex 布局属性|`number \| string \| 'initial' \| 'auto' \| 'none'`|`-`|2.10.0|

### `<grid>` 属性 (2.15.0)

响应式配置从 `2.18.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|cols|每一行展示的列数|`number \| ResponsiveValue`|`24`|
|row-gap|行与行之间的间距|`number \| ResponsiveValue`|`0`|
|col-gap|列与列之间的间距|`number \| ResponsiveValue`|`0`|
|collapsed|是否折叠|`boolean`|`false`|
|collapsed-rows|折叠时显示的行数|`number`|`1`|

### `<grid-item>` 属性 (2.15.0)

响应式配置从 `2.18.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|span|跨越的格数|`number \| ResponsiveValue`|`1`|
|offset|左侧的间隔格数|`number \| ResponsiveValue`|`0`|
|suffix|是否是后缀元素|`boolean`|`false`|

### ResponsiveValue

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|xxl|>= 1600px 响应式配置|`number`|`-`|
|xl|>= 1200px 响应式配置|`number`|`-`|
|lg|>= 992px 响应式配置|`number`|`-`|
|md|>= 768px 响应式配置|`number`|`-`|
|sm|>= 576px 响应式配置|`number`|`-`|
|xs|< 576px 响应式配置|`number`|`-`|

## 常用模式

- **栅格偏移**：指定 `offset` 可以对栅格进行平移操作。
- **区块间隔**：通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。
- **水平布局**：通过 `justify` 来进行水平布局。
- **垂直布局**：通过 `align` 来进行垂直布局。
- **排序**：通过 `order` 来进行元素排序。
- **响应式布局**：预置六种响应尺寸, 分别为 `xs`, `sm`, `md`, `lg`, `xl`, `xxl`。
- **其他属性的响应式**：`span`, `offset`, `order` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。比如 `:xs="8"` 相当于 `:xs="{ span: 8 }"`。
- **Flex 用法**：通过设置 `Col` 组件的 `flex` 属性，可以任意配置 flex 布局。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 布局组件只处理结构和间距，不在其中承载业务状态。
- 响应式页面优先组合 `a-grid`、`a-row`、`a-col` 和 `a-space`。
