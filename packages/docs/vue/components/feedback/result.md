---
sidebar_position: 1
---

# 结果页 Result

用于反馈一系列操作任务的处理结果，当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## HTTP状态码 403

没有当前页面的访问权限。

<preview path="./demos/result/http-403.vue" title="HTTP状态码 403"></preview>


## HTTP状态码 404

页面未找到

<preview path="./demos/result/http-404.vue" title="HTTP状态码 404"></preview>


## HTTP状态码 500

通常表示服务器错误

<preview path="./demos/result/http-500.vue" title="HTTP状态码 500"></preview>


## 完整功能

完整功能

<preview path="./demos/result/full-featured.vue" title="完整功能"></preview>


## 基本用法

展示结果状态。

<preview path="./demos/result/basic.vue" title="基本用法"></preview>


## 自定义状态

自定义状态。需要传入指定的图标

<preview path="./demos/result/custom-status.vue" title="自定义状态"></preview>


## 错误状态

展示错误状态。

<preview path="./demos/result/error.vue" title="错误状态"></preview>


## 成功状态

展示成功状态。

<preview path="./demos/result/success.vue" title="成功状态"></preview>


## 警告状态

展示警告状态。

<preview path="./demos/result/warning.vue" title="警告状态"></preview>


## API


### `<result>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|status|结果页显示的状态|`'info' \| 'success' \| 'warning' \| 'error' \| '403' \| '404' \| '500' \| null`|`'info'`|
|title|标题内容|`string`|`-`|
|subtitle|子标题内容|`string`|`-`|
### `<result>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|icon|图标|-||
|title|标题|-||
|subtitle|副标题|-||
|extra|操作区|-|2.8.0|
|default|默认插槽|-|2.8.0|



