---
name: starbucks-vue-date-picker
description: "Starbucks UI Vue 日期选择器 DatePicker 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-date-picker>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 日期选择器 DatePicker

## 简介

日期输入器的基础使用。

## 基本用法

```vue
<template>
  <a-date-picker style="width: 200px;" />
</template>
```

## API

### `Common` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|locale|国际化配置，用于覆盖locale中的 `datePicker` 字段|`Record<string, any>`|`-`||
|hide-trigger|没有触发元素，只显示选择面板|`boolean`|`false`||
|allow-clear|是否允许清除|`boolean`|`true`||
|readonly|是否为只读|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|日期选择器的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|shortcuts|预设时间范围快捷选择|`ShortcutType[]`|`[]`||
|shortcuts-position|预设范围在面板上的位置，默认放在下方，侧边一般用于大量预设时间的场景|`'left' \| 'bottom' \| 'right'`|`'bottom'`||
|position|弹出的框的位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bl'`||
|popup-visible|控制弹出框的打开或者关闭状态|`boolean`|`-`||
|default-popup-visible|默认弹出框是打开或者关闭|`boolean`|`false`||
|trigger-props|可以传入 `Trigger` 组件的参数|`TriggerProps`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `Common` Events

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|value: `Date \| string \| number \| undefined`<br>date: `Date \| undefined`<br>dateString: `string \| undefined`|
|select|选中日期发生改变但组件值未改变|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|popup-visible-change|打开或关闭弹出框|visible: `boolean`|
|ok|点击确认按钮|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|clear|点击清除按钮|-|
|select-shortcut|点击快捷选项|shortcut: `ShortcutType`|
|picker-value-change|面板日期改变|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|

### `Common` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|prefix|输入框前缀|-|2.41.0|
|suffix-icon|输入框后缀图标|-||
|icon-next-double|双箭头往后翻页图标|-||
|icon-prev-double|双箭头往前翻页图标|-||
|icon-next|单箭头往后翻页图标|-||
|icon-prev|单箭头往前翻页图标|-||
|cell|自定义日期单元格的内容|date: `Date`||
|extra|额外的页脚|-||

### `<date-picker>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string \| ((current: Date) => string)`|`-`||
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|show-time|是否增加时间选择|`boolean`|`false`||
|time-picker-props|时间显示的参数，参考 [TimePickerProps](time-picker.md)|`Partial<TimePickerProps>`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|disabled-date|不可选取的日期|`(current?: Date) => boolean`|`-`||
|disabled-time|不可选取的时间|`(current: Date) => DisabledTimeProps`|`-`||
|show-now-btn|是否显示 `showTime` 时，选择当前时间的按钮|`boolean`|`true`||

### `<month-picker>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`|
|default-value|默认值|`Date \| string \| number`|`-`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY-MM'`|

### `<year-picker>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`|
|default-value|默认值|`Date \| string \| number`|`-`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY'`|

### `<quarter-picker>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY-[Q]Q'`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。|`string`|`'YYYY-MM'`|2.16.0|

### `<week-picker>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'gggg-wo'`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。|`string`|`'YYYY-MM-DD'`|2.16.0|
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|

### `<range-picker>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|mode|范围选择器的类型|`'date' \| 'year' \| 'quarter' \| 'month' \| 'week'`|`'date'`||
|model-value **(v-model)**|绑定值|`(Date \| string \| number)[]`|`-`||
|default-value|默认值|`(Date \| string \| number)[]`|`-`||
|picker-value|默认面板显示的日期|`(Date \| string \| number)[]`|`-`||
|default-picker-value|面板显示的日期|`(Date \| string \| number)[]`|`-`||
|disabled|是否禁用|`boolean \| boolean[]`|`false`||
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`-`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。如果没有指定，将格式化为字符串，格式同 `format`。|`'timestamp' \| 'Date' \| string`|`-`|2.16.0|
|show-time|是否增加时间选择|`boolean`|`false`||
|time-picker-props|时间显示的参数，参考 [TimePickerProps](time-picker.md)|`Partial<TimePickerProps>`|`-`||
|placeholder|提示文案|`string[]`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<range-picker>` 事件

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|value: `(Date \| string \| number \| undefined)[] \| undefined`<br>date: `(Date \| undefined)[] \| undefined`<br>dateString: `(string \| undefined)[] \| undefined`|
|select|选中日期发生改变但组件值未改变|value: `(Date \| string \| number \| undefined)[]`<br>date: `(Date \| undefined)[]`<br>dateString: `(string \| undefined)[]`|
|popup-visible-change|打开或关闭弹出框|visible: `boolean`|
|ok|点击确认按钮|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|
|clear|点击清除按钮|-|
|select-shortcut|点击快捷选项|shortcut: `ShortcutType`|
|picker-value-change|面板日期改变|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|

### ShortcutType

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项的内容|`string \| number \| (() => VNode)`|`-`|
|value|选项值|`(Date \| string \| number)    \| (Date \| string \| number)[]    \| (() => (Date \| string \| number) \| (Date \| string \| number)[])`|`-`|
|format|解析值所使用的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`-`|

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

- **月份选择器**：月份输入器的基础使用。
- **年份选择器**：年份输入器的基础使用。
- **季度选择器**：季度选择器的使用。
- **周选择器**：周选择器提供了一种选择星期的简单方法。也可以指定一周的起始日。
- **带时间的日期选择**：使用 `showTime` 可以使用带时间的日期选择。
- **范围选择器**：范围输入器的基础使用。
- **默认值**：日期输入器有默认值的情况。
- **不可选取的时间**：使用 `disabledDate` 可以禁用某些日期。使用 `disabledTime` 可以禁用时间，需要配合 `showTime` 使用。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
