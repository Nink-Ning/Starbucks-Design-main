---
name: starbucks-vue-statistic
description: "Starbucks UI Vue 数值显示 Statistic 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-statistic>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 数值显示 Statistic

## 简介

当需要突出某个或某组数字或展示带描述的统计类数据时使用。

## 基本用法

```vue
<template>
  <a-space size="large">
    <a-statistic title="Downloads" :value="125670" show-group-separator />
    <a-statistic extra="Comments" :value="40509" :precision="2" />
  </a-space>
</template>
```

## API

### `<statistic>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|数值显示的标题|`string`|`-`||
|value|数值显示的值|`number \| Date`|`-`||
|format|数值显示的格式 [dayjs](https://day.js.org/docs/en/display/format)（日期模式使用）|`string`|`'HH:mm:ss'`||
|extra|额外的显示内容|`string`|`-`||
|start|是否开始动画|`boolean`|`true`||
|precision|小数保留位数（数字模式使用）|`number`|`0`||
|separator|进位分隔符（数字模式使用）|`string`|`-`||
|show-group-separator|是否展示进位分隔符（数字模式使用）|`boolean`|`false`||
|animation|是否开启动画|`boolean`|`false`||
|animation-duration|动画的过度时间|`number`|`2000`||
|value-from|动画的起始值|`number`|`-`||
|placeholder|提示文字（当 value 为 undefined 时显示）|`string`|`-`|2.28.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<statistic>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|prefix|前缀|-|
|suffix|后缀|-|
|extra|额外内容|-|

### `<countdown>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|倒计时的标题|`string`|`-`||
|value|倒计时的值|`number`|`() => Date.now() + 300000`||
|now|用于修正初始化时间显示不正确|`number`|`() => Date.now()`||
|format|倒计时的展示格式 [dayjs](https://day.js.org/docs/en/display/format)|`string`|`'HH:mm:ss'`||
|start|是否开始倒计时|`boolean`|`true`||
|value-style|自定义显示值的样式|`CSSProperties`|`-`|2.32.0|

### `<countdown>` 事件

|事件名|描述|参数|
|---|---|---|
|finish|倒计时完成后触发的回调|-|

### `<countdown>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|

## 常用模式

- **自定义前缀&后缀**：通过 `prefix` 和 `suffix` 插槽可以添加前后缀。
- **数值动画**：通过 `animation` 可以开启数值动画。
- **倒计时组件**：倒计时组件 `countdown` 的基本使用方法。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
