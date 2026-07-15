---
name: starbucks-vue-time-picker
description: "Starbucks UI Vue 时间选择器 TimePicker 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-time-picker>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 时间选择器 TimePicker

## 简介

时间输入器的基础用法。

## 基本用法

```vue
<template>
  <a-time-picker style="width: 194px;" />
</template>
```

## API

### `<time-picker>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|选择器类型|`'time' \| 'time-range'`|`'time'`|
|model-value **(v-model)**|绑定值|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|default-value|默认值|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|allow-clear|是否允许清除|`boolean`|`true`|
|readonly|是否为只读模式|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'HH:mm:ss'`|
|placeholder|提示文案|`string \| string[]`|`-`|
|size|输入框尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
|use12-hours|12 小时制|`boolean`|`false`|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<time-picker>` 事件

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|timeString: `string \| Array<string \| undefined> \| undefined`<br>time: `date \| Array<date \| undefined> \| undefined`|
|select|选择时间但未触发组件值变化|timeString: `string \| Array<string \| undefined>`<br>time: `Date \| Array<Date \| undefined>`|
|clear|点击清除按钮|-|
|popup-visible-change|弹出框展开和收起|visible: `boolean`|

### `<time-picker>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|prefix|输入框前缀|-|2.41.0|
|suffix-icon|输入框后缀图标|-||
|extra|额外的页脚|-||

### 字符串解析格式

格式|输出|描述

---|---|---:

`YY`|21|两位数的年份

`YYYY`|2021|四位数年份

`M`|1-12|月份，从 1 开始

`MM`|01-12|月份，两位数

`MMM`|Jan-Dec|缩写的月份名称

`MMMM`|January-December|完整的月份名称

`D`|1-31|月份里的一天

`DD`|01-31|月份里的一天，两位数

`d`|0-6|一周中的一天，星期天是 0

`dd`|Su-Sa|最简写的一周中一天的名称

`ddd`|Sun-Sat|简写的一周中一天的名称

`dddd`|Sunday-Saturday|一周中一天的名称

`H`|0-23|小时

`HH`|00-23|小时，两位数

`h`|1-12|小时, 12 小时制

`hh`|01-12|小时, 12 小时制, 两位数

`m`|0-59|分钟

`mm`|00-59|分钟，两位数

`s`|0-59|秒

`ss`|00-59|秒，两位数

`S`|0-9|数百毫秒，一位数

`SS`|00-99|几十毫秒，两位数

`SSS`|000-999|毫秒，三位数字

`Z`|-5:00|UTC 的偏移量

`ZZ`|-0500|UTC 的偏移量，数字前面加上 0

`A`|AM PM|-

`a`|am pm|-

`Do`|1st... 3st|带序号的月份中的某天

`X`|1410715640.579|Unix 时间戳

`x`|1410715640579|Unix 毫秒时间戳

## 常用模式

- **范围选择器**：时间输入器的范围选择器。
- **双向绑定**：支持 `v-model` 进行数据的双向绑定。
- **默认值**：只有默认值的情况，可通过 `defaultValue` 传递。
- **尺寸**：有四种尺寸可供选择。
- **禁用**：禁用状态。
- **禁用部分时间选项**：通过设置 `disabledHours` `disabledMinutes` `disabledSeconds`，可以禁用 时 / 分 / 秒的部分选项。
- **跳过确认**：跳过确认步骤，直接点击选择时间。
- **定制格式**：通过设置 `format`，可以定制需要显示的时、分、秒。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
