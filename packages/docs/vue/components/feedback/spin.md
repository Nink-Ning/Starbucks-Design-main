---
sidebar_position: 1
---

# 加载中 Spin

用于页面和区块的加载中状态 - 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 基本用法

用于展示加载中的状态。

<preview path="./demos/spin/basic.vue" title="基本用法"></preview>


## 容器中

可以给任意内容添加加载中指示符。

<preview path="./demos/spin/in-container.vue" title="容器中"></preview>


## 点类型指示符

通过 `dot` 属性，可以展示点类型的指示符。

<preview path="./demos/spin/dot-indicator.vue" title="点类型指示符"></preview>


## 自定义图标

通过 `#icon` 插槽可以自定义图标。

<preview path="./demos/spin/custom-icon.vue" title="自定义图标"></preview>


## 不同尺寸

设置 `size` 可以得到不同尺寸的加载图标。

<preview path="./demos/spin/sizes.vue" title="不同尺寸"></preview>


## 添加描述文案

通过 `tip` 属性添加描述文案。

<preview path="./demos/spin/add-description.vue" title="添加描述文案"></preview>


## API


### `<spin>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|size|尺寸|`number`|`-`|
|loading|是否为加载中状态（仅在容器模式下生效）|`boolean`|`false`|
|dot|是否使用点类型的动画|`boolean`|`false`|
|tip|提示内容|`string`|`-`|
|hide-icon|是否隐藏图标|`boolean`|`false`|
### `<spin>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|tip|自定义提示内容|-|
|element|自定义元素|-|
|icon|自定义图标（自动旋转）|-|



