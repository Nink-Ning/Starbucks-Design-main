---
sidebar_position: 1
---

# 返回顶部 BackTop

可一键返回顶部的按钮。

## 基本用法

当容器滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。

<preview path="./demos/back-top/basic.vue" title="基本用法"></preview>


## 自定义按钮

可以自定义返回按钮。

<preview path="./demos/back-top/custom-button.vue" title="自定义按钮"></preview>


## API


### `<back-top>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|visible-height|显示回到顶部按钮的触发滚动高度|`number`|`200`|
|target-container|滚动事件的监听容器|`string \| HTMLElement`|`-`|
|easing|滚动动画的缓动方式，可选值参考 BTween|`string`|`'quartOut'`|
|duration|滚动动画的持续时间|`number`|`200`|



