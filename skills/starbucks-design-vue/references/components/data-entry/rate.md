---
name: starbucks-vue-rate
description: "Starbucks UI Vue 评分 Rate 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-rate>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 评分 Rate

## 简介

评分组件基本用法。

## 基本用法

```vue
<template>
  <a-rate/>
</template>
```

## API

### `<rate>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|count|评分的总数|`number`|`5`||
|model-value **(v-model)**|绑定值|`number`|`-`||
|default-value|默认值|`number`|`0`||
|allow-half|是否允许半选|`boolean`|`false`||
|allow-clear|是否允许清除|`boolean`|`false`||
|grading|是否开启笑脸分级|`boolean`|`false`||
|readonly|是否为只读状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|color|颜色|`string \| Record<string, string>`|`-`|2.18.0|

### `<rate>` 事件

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `number`|
|hover-change|鼠标移动到数值上时触发|value: `number`|

### `<rate>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|character|符号|index: `number`|

## 常用模式

- **半选**：指定 `allow-half` 来开启半选。
- **自定义颜色**：通过 color 可以自定义颜色。另外可以通过对象形式自定义不同分值时的颜色。
- **只读模式**：通过设置 `readonly` 属性让评分组件为只读状态。
- **支持清除**：通过设置 `allow-clear` 来允许清除评分。
- **自定义评分字符**：可以将星星替换为其他字符，比如表情、字母，数字，字体图标甚至中文。
- **任意长度的评分**：通过指定 `count` 来指定任意长度的评分组件。
- **笑脸分级**：通过 `grading` 使用笑脸分级。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
