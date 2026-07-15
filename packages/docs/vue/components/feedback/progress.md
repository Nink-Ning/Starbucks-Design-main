---
sidebar_position: 1
---

# 进度条 Progress

给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。

## 基本用法

简单的进度条。

<preview path="./demos/progress/basic.vue" title="基本用法"></preview>


## 环形进度条

设置 `type="circle"` 将会展示环形进度条。

<preview path="./demos/progress/circle-progress.vue" title="环形进度条"></preview>


## 渐变进度条

`color` 传入对象时， 会作为 `linear-gradient` 的属性值设置渐变色。

<preview path="./demos/progress/gradient-progress.vue" title="渐变进度条"></preview>


## 迷你进度条

设置 `size="mini"` 展示微型进度条。

<preview path="./demos/progress/mini-progress.vue" title="迷你进度条"></preview>


## 进度条大小

通过 `size` 设置进度条的大小

<preview path="./demos/progress/progress-size.vue" title="进度条大小"></preview>


## 进度条状态

通过 `status` 指定进度条状态

<preview path="./demos/progress/progress-status.vue" title="进度条状态"></preview>


## 步骤进度条

通过设置 `steps` 展示步骤进度条。

<preview path="./demos/progress/step-progress.vue" title="步骤进度条"></preview>


## 剩余进度条的颜色

可以通过 trackColor 设置剩余进度条的颜色

<preview path="./demos/progress/remaining-color.vue" title="剩余进度条的颜色"></preview>


## API


### `<progress>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|进度条的类型|`'line' \| 'circle'`|`'line'`|
|size|进度条的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|percent|进度条当前的百分比|`number`|`0`|
|steps|开启步骤条模式，并设置步骤数|`number`|`0`|
|animation|是否开启过渡动画|`boolean`|`false`|
|stroke-width|进度条的线宽|`number`|`-`|
|width|进度条的长度|`number\|string`|`-`|
|color|进度条的颜色|`string\|object`|`-`|
|track-color|进度条的轨道颜色|`string`|`-`|
|show-text|是否显示文字|`boolean`|`true`|
|status|进度条状态|`'normal' \| 'success' \| 'warning' \| 'danger'`|`-`|



