---
sidebar_position: 1
---

# 开关 Switch

互斥性的操作控件，用户可打开或关闭某个功能。

## 基本用法

开关的基本用法。

<preview path="./demos/switch/basic.vue" title="基本用法"></preview>


## 切换拦截

设置 `beforeChange` 函数，函数的返回值将用于判断是否阻止切换。

<preview path="./demos/switch/switch-intercept.vue" title="切换拦截"></preview>


## 自定义开关的颜色

通过 `checked-color` 和 `unchecked-color` 可以自定义开关的颜色。

<preview path="./demos/switch/custom-switch-color.vue" title="自定义开关的颜色"></preview>


## 禁用状态

禁用开关。

<preview path="./demos/switch/disabled.vue" title="禁用状态"></preview>


## 自定义图标

自定义开关按钮上显示的图标。

<preview path="./demos/switch/custom-icon.vue" title="自定义图标"></preview>


## 加载中状态

通过设置 `loading` 使开关处于加载中状态，此时开关不可点击。

<preview path="./demos/switch/loading-state.vue" title="加载中状态"></preview>


## 开关尺寸

开关分为 `small`、`medium` 两种尺寸。

<preview path="./demos/switch/switch-size.vue" title="开关尺寸"></preview>


## 自定义文案

自定义开关的打开/关闭状态的文字。

<preview path="./demos/switch/custom-text.vue" title="自定义文案"></preview>


## 开关类型

开关分为 `circle` - **圆形（默认）**、`round` - **圆角**、`line` - **线性**三种类型。

<preview path="./demos/switch/switch-type.vue" title="开关类型"></preview>


## 自定义开关的值

通过 `checked-value` 和 `unchecked-value` 可以自定义开关的值。

<preview path="./demos/switch/custom-switch-value.vue" title="自定义开关的值"></preview>


## API


### `<switch>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string\|number\|boolean`|`-`||
|default-checked|默认选中状态（非受控状态）|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|type|开关的类型|`'circle' \| 'round' \| 'line'`|`'circle'`||
|size|开关的大小|`'small' \| 'medium'`|`'medium'`||
|checked-value|选中时的值|`string\|number\|boolean`|`true`|2.12.0|
|unchecked-value|未选中时的值|`string\|number\|boolean`|`false`|2.12.0|
|checked-color|选中时的开关颜色|`string`|`-`|2.12.0|
|unchecked-color|未选中时的开关颜色|`string`|`-`|2.12.0|
|before-change|switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。|`(  newValue: string \| number \| boolean) => Promise<boolean \| void> \| boolean \| void`|`-`|2.37.0|
|checked-text|打开状态时的文案（`type='line'`和`size='small'`时不生效）|`string`|`-`|2.45.0|
|unchecked-text|关闭状态时的文案（`type='line'`和`size='small'`时不生效）|`string`|`-`|2.45.0|
### `<switch>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| string \| number `<br>ev: `Event`|
|focus|组件获得焦点时触发|ev: `FocusEvent`|
|blur|组件失去焦点时触发|ev: `FocusEvent`|
### `<switch>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|checked-icon|打开状态时，按钮上的图标|-|
|unchecked-icon|关闭状态时，按钮上的图标|-|
|checked|打开状态时的文案（`type='line'`和`size='small'`时不生效）|-|
|unchecked|关闭状态时的文案（`type='line'`和`size='small'`时不生效）|-|



