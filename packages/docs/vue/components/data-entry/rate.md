---
sidebar_position: 1
---

# 评分 Rate

用于评分或打星的组件。

## 基本用法

评分组件基本用法。

<preview path="./demos/rate/basic.vue" title="基本用法"></preview>


## 自定义评分字符

可以将星星替换为其他字符，比如表情、字母，数字，字体图标甚至中文。

<preview path="./demos/rate/custom-rate-character.vue" title="自定义评分字符"></preview>


## 支持清除

通过设置 `allow-clear` 来允许清除评分。

<preview path="./demos/rate/allow-clear.vue" title="支持清除"></preview>


## 自定义颜色

通过 color 可以自定义颜色。另外可以通过对象形式自定义不同分值时的颜色。

<preview path="./demos/rate/custom-color.vue" title="自定义颜色"></preview>


## 任意长度的评分

通过指定 `count` 来指定任意长度的评分组件。

<preview path="./demos/rate/arbitrary-rate.vue" title="任意长度的评分"></preview>


## 笑脸分级

通过 `grading` 使用笑脸分级。

<preview path="./demos/rate/smiley-rating.vue" title="笑脸分级"></preview>


## 半选

指定 `allow-half` 来开启半选。

<preview path="./demos/rate/indeterminate.vue" title="半选"></preview>


## 只读模式

通过设置 `readonly` 属性让评分组件为只读状态。

<preview path="./demos/rate/readonly.vue" title="只读模式"></preview>


## API


### `<rate>` Props

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
### `<rate>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `number`|
|hover-change|鼠标移动到数值上时触发|value: `number`|
### `<rate>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|character|符号|index: `number`|



