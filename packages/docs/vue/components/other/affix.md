---
sidebar_position: 1
---

# 固钉 Affix

将页面元素钉在可视范围。当内容区域比较长，需要滚动页面时，固钉可以将内容固定在屏幕上。常用于侧边菜单和按钮组合。

## 基本用法

基本用法，不设置固定位置时，当页面滚动元素不可见时，元素固定在页面最顶部。

<preview path="./demos/affix/basic.vue" title="基本用法"></preview>


## 底部固定

当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。

<preview path="./demos/affix/bottom-fixed.vue" title="底部固定"></preview>


## 滚动容器

用 `target` 设置需要监听其滚动事件的元素，默认为 window。

`target` 指定为非 window 容器时，可能会出现 `target`外层元素滚动，固钉元素跑出滚动容器的问题。这个时候可以通过传入`targetContainer`传入`target`外层的滚动元素。`Affix`
会监听该元素的滚动事件来实时更新滚钉元素的位置。 当然您也可以在业务代码中自己监听 target 外层滚动元素的 `scroll` 事件，并调用 `updatePosition` 去更新固钉的位置。

<preview path="./demos/affix/scroll-container.vue" title="滚动容器"></preview>


## 固定状态改变回调

当固定状态发生改变时，会触发事件。

<preview path="./demos/affix/fixed-change-callback.vue" title="固定状态改变回调"></preview>


## 顶部固定

当页面滚动或浏览器窗口改变时，元素向上滚动到距顶部一定距离时固定。

<preview path="./demos/affix/top-fixed.vue" title="顶部固定"></preview>


## API


### `<affix>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|offset-top|距离窗口顶部达到指定偏移量后触发|`number`|`0`|
|offset-bottom|距离窗口底部达到指定偏移量后触发|`number`|`-`|
|target|滚动容器，默认是 `window`|`string \| HTMLElement \| Window`|`-`|
|target-container|`target`的外层滚动元素，默认是 `window`。`Affix `将会监听该元素的滚动事件，并实时更新固钉的位置。主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题|`string \| HTMLElement \| Window`|`-`|
### `<affix>` Events

|事件名|描述|参数|
|---|---|---|
|change|固定状态发生改变时触发|fixed: `boolean`|
### `<affix>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|updatePosition|更新位置|-|-|



