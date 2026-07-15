---
sidebar_position: 1
---

# 面包屑 Breadcrumb

面包屑是辅助导航模式，用于识别页面在层次结构内的位置，并根据需要向上返回。

## 基本用法

面包屑的基本用法。

<preview path="./demos/breadcrumb/basic.vue" title="基本用法"></preview>


## 带有下拉菜单

通过 `droplist` 或者 `routes` 来指定下拉菜单。

<preview path="./demos/breadcrumb/with-dropdown.vue" title="带有下拉菜单"></preview>


## 显示省略

通过 `max-count` 来指定面包屑的最多渲染数量，超出的部分将显示为省略号。

<preview path="./demos/breadcrumb/show-ellipsis.vue" title="显示省略"></preview>


## 自定义图标

可以在内容中使用自定义图标。

<preview path="./demos/breadcrumb/custom-icon.vue" title="自定义图标"></preview>


## 参数化配置

通过 `routes` 来传递面包屑数据。若是要自定义面包屑的话，建议使用 `<a-breadcrumb-item />` 组件。默认使用 `a` 标签的 `href` 属性绑定路径，可通过 `item` 插槽自定义渲染。

<preview path="./demos/breadcrumb/parameterized.vue" title="参数化配置"></preview>


## 自定义分隔符

通过 `separator` 属性或插槽自定义分隔符。面包屑子项也可通过 `separator` 属性或插槽自定义分隔符，且优先级高于父项。

<preview path="./demos/breadcrumb/custom-separator.vue" title="自定义分隔符"></preview>


## 自定义尺寸

通过指定样式来自定义面包屑的尺寸。

<preview path="./demos/breadcrumb/custom-size.vue" title="自定义尺寸"></preview>


## API


### `<breadcrumb>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|max-count|最多展示的面包屑数量（0表示不限制）|`number`|`0`||
|routes|设置路径|`BreadcrumbRoute[]`|`-`|2.36.0|
|separator|分隔符文字|`string\|number`|`-`|2.36.0|
|custom-url|自定义链接地址|`(paths: string[]) => string`|`-`|2.36.0|
### `<breadcrumb>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|more-icon|自定义更多图标|-|2.36.0|
|item-render|routes 设置时生效，自定义渲染面包屑|route: `BreadcrumbRoute`<br>routes: `BreadcrumbRoute[]`<br>paths: `string[]`|2.36.0|
|separator|自定义分隔符|-||




### `<breadcrumb-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|separator|分隔符文字|`string\|number`|`-`|2.36.0|
|droplist|下拉菜单内容|`BreadcrumbRoute['children']`|`-`|2.36.0|
|dropdown-props|下拉菜单属性|`DropDownProps`|`-`|2.36.0|
### `<breadcrumb-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|droplist|自定义下拉菜单|-|2.36.0|
|separator|自定义分隔符|-|2.36.0|




### BreadcrumbRoute

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|面包屑名称|`string`|`-`|
|path|跳转路径 (`a`标签的`href`)|`string`|`-`|
|children|下拉菜单展示项|`{    label: string;    path: string;  }[]`|`-`|



## Tips

同名的自定义插槽优先级是高于属性的


