---
sidebar_position: 1
---

# 自动补全 AutoComplete

输入框的自动补全功能。

## 基本用法

自动补全的基础用法

<preview path="./demos/auto-complete/basic.vue" title="基本用法"></preview>


## 弹出框的页脚

自定义弹出框的页脚

<preview path="./demos/auto-complete/popup-footer.vue" title="弹出框的页脚"></preview>


## 下拉菜单滚动

可以通过 `dropdown-scroll` 监听下拉菜单的滚动事件。或者通过 `dropdown-reach-bottom` 监听下拉菜单滚动到底部的事件。

<preview path="./demos/auto-complete/dropdown-scroll.vue" title="下拉菜单滚动"></preview>


## 区分大小写

使用 `strict` 属性来指明在匹配时严格区分大小写。

<preview path="./demos/auto-complete/case-sensitive.vue" title="区分大小写"></preview>


## 虚拟列表

虚拟列表的使用方法。

<preview path="./demos/auto-complete/virtual-list.vue" title="虚拟列表"></preview>


## API


### `<auto-complete>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控模式）|`string`|`''`||
|disabled|是否禁用|`boolean`|`false`||
|data|用于自动提示的数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`||
|strict|是否为严格校验模式|`boolean`|`false`||
|filter-option|自定义选项过滤方法|`FilterOption`|`true`||
|trigger-props|trigger 组件属性|`TriggerProps`|`-`|2.14.0|
|allow-clear|是否允许清空输入框|`boolean`|`false`|2.23.0|
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 VirtualListProps|`VirtualListProps`|`-`|2.50.0|
### `<auto-complete>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|绑定值发生改变时触发|value: `string`||
|search|用户搜索时触发|value: `string`||
|select|选择选项时触发|value: `string`||
|clear|用户点击清除按钮时触发|ev: `Event`|2.23.0|
|dropdown-scroll|下拉菜单发生滚动时触发|ev: `Event`|2.52.0|
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|ev: `Event`|2.52.0|
### `<auto-complete>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|focus|使输入框获取焦点|-|-|2.40.0|
|blur|使输入框失去焦点|-|-|2.40.0|
### `<auto-complete>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|option|选项内容|data: `OptionInfo`|2.13.0|
|footer|弹出框的页脚|-||



