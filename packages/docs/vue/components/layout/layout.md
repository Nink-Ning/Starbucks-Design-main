---
sidebar_position: 1
---

# 布局 Layout

页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。

## 基本用法

典型的页面布局。

<preview path="./demos/layout/basic.vue" title="基本用法"></preview>


## 响应式侧边栏

左侧 Slider 可以结合 Menu 设置为展开/收起状态, 设置`breakpoint`可触发响应式收缩。

<preview path="./demos/layout/responsive-sidebar.vue" title="响应式侧边栏"></preview>


## 自定义收起按钮

设置`Menu.Sider` 的`hide-trigger`属性为`true`后，`Sider` 内置的缩起按钮不会显示。此时可自定义收起按钮。

<preview path="./demos/layout/custom-collapse-button.vue" title="自定义收起按钮"></preview>


## 自定义按钮 Icon

通过设置 `Menu.Sider` 的 `trigger` 属性，实现自定义收起按钮的图标。

<preview path="./demos/layout/custom-icon-button.vue" title="自定义按钮 Icon"></preview>


## 可伸缩侧边栏

可以用鼠标进行拖拽放大缩小的侧边栏，需要用到的参数：`resizeDirections`。

<preview path="./demos/layout/collapsible-sidebar.vue" title="可伸缩侧边栏"></preview>


## API


### `<layout>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|has-sider|表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动|`boolean`|`false`|




### `<layout-header>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-content>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-footer>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|default|内容|-|




### `<layout-sider>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|theme|主题颜色|`'dark' \| 'light'`|`'light'`|
|collapsed|当前收起状态|`boolean`|`-`|
|default-collapsed|默认的收起状态|`boolean`|`false`|
|collapsible|是否可收起|`boolean`|`false`|
|width|宽度|`number`|`200`|
|collapsed-width|收缩宽度|`number`|`48`|
|reverse-arrow|翻转折叠提示箭头的方向，当 Sider 在右边时可以使用|`boolean`|`false`|
|breakpoint|触发响应式布局的断点, 详见响应式栅格|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|
|resize-directions|可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。详情请看 ResizeBox。|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`-`|
|hide-trigger|隐藏底部折叠触发器|`boolean`|`false`|
### `<layout-sider>` Events

|事件名|描述|参数|
|---|---|---|
|collapse|展开-收起时的事件，有点击 trigger 以及响应式反馈两种方式可以触发|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|breakpoint|触发响应式布局断点时的事件|collapsed: `boolean`|
### `<layout-sider>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|trigger|自定义底部折叠触发器|collapsed: `boolean`|



