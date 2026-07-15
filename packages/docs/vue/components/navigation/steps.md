---
sidebar_position: 1
---

# 步骤条 Steps

明示任务流程和当前完成程度，引导用户按照步骤完成任务。

## 箭头步骤条

通过设置 `type="arrow"`，可以使用箭头类型的步骤条。**注意**：仅支持水平步骤条。

<preview path="./demos/steps/arrow-steps.vue" title="箭头步骤条"></preview>


## 基本用法

步骤条的基本用法。

<preview path="./demos/steps/basic.vue" title="基本用法"></preview>


## 可切换步骤条

设置 `changeable` 开启点击切换步骤。

<preview path="./demos/steps/switchable-steps.vue" title="可切换步骤条"></preview>


## 自定义节点

步骤条的基本用法。

<preview path="./demos/steps/custom-node.vue" title="自定义节点"></preview>


## 描述信息

通过设置 `description` 可以添加描述信息。

<preview path="./demos/steps/description.vue" title="描述信息"></preview>


## 点状步骤条

通过设置 `type="dot"` ， 可以使用点状的步骤条。此模式没有 small 尺寸。

<preview path="./demos/steps/dot-steps.vue" title="点状步骤条"></preview>


## 步骤错误

通过设置 `status="error"` 来展示错误状态。

<preview path="./demos/steps/step-error.vue" title="步骤错误"></preview>


## 自定义图标

通过 `#icon` 插槽可以自定义节点图标。

<preview path="./demos/steps/custom-icon.vue" title="自定义图标"></preview>


## 标签放置位置

通过设置 `label-placement` 可以改变标签描述文字放置的位置。放置位置分为 `horizontal` - **放置在图标右侧（默认）**、`vertical` - **放置在图标下方**两种。

<preview path="./demos/steps/label-placement.vue" title="标签放置位置"></preview>


## 隐藏连接线

通过设置 `line-less` 可以使用无连接线模式。

<preview path="./demos/steps/hide-connector.vue" title="隐藏连接线"></preview>


## 导航步骤条

通过设置 `type="navigation"` 展示导航类型的步骤条。

<preview path="./demos/steps/nav-steps.vue" title="导航步骤条"></preview>


## 迷你箭头步骤条

指定 `type: 'arrow', small: true`， 可以使用迷你箭头类型的步骤条。

<preview path="./demos/steps/mini-arrow-steps.vue" title="迷你箭头步骤条"></preview>


## 小型步骤条

通过 `small` 可以设置展示小型步骤条

<preview path="./demos/steps/mini-steps.vue" title="小型步骤条"></preview>


## 竖直步骤条

竖直方向的步骤条。

<preview path="./demos/steps/vertical-steps.vue" title="竖直步骤条"></preview>


## API


### `<steps>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|步骤条的类型|`'default' \| 'arrow' \| 'dot' \| 'navigation'`|`'default'`|
|direction|步骤条的显示方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|label-placement|标签描述文字放置的位置|`'horizontal' \| 'vertical'`|`'horizontal'`|
|current **(v-model)**|当前步骤数|`number`|`-`|
|default-current|默认的步骤数（非受控状态）|`number`|`1`|
|status|当前步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`'process'`|
|line-less|是否使用无连接线样式|`boolean`|`false`|
|small|是否使用小型步骤条|`boolean`|`false`|
|changeable|是否可以点击切换|`boolean`|`false`|
### `<steps>` Events

|事件名|描述|参数|
|---|---|---|
|change|步骤数发生改变时触发|step: `number`<br>ev: `Event`|




### `<step>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|title|步骤的标题|`string`|`-`|
|description|步骤的描述信息|`string`|`-`|
|status|步骤的状态|`'wait' \| 'process' \| 'finish' \| 'error'`|`-`|
|disabled|是否禁用|`boolean`|`false`|
### `<step>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|node|节点|step: `number`<br>status: `string`|
|icon|图标|step: `number`<br>status: `string`|
|description|描述内容|-|



