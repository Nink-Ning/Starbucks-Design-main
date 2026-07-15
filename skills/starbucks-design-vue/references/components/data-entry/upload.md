---
name: starbucks-vue-upload
description: "Starbucks UI Vue 上传 Upload 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-upload>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 上传 Upload

## 简介

上传组件的基本用法。

## 基本用法

```vue
<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload action="/" />
    <a-upload action="/" disabled style="margin-top: 40px;"/>
  </a-space>
</template>
```

## API

### `<upload>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|file-list **(v-model)**|文件列表|`FileItem[]`|`-`||
|default-file-list|默认的文件列表（非受控状态）|`FileItem[]`|`[]`||
|accept|接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")|`string`|`-`||
|action|上传的URL|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|multiple|是否支持多文件上传|`boolean`|`false`||
|directory|是否支持文件夹上传（需要浏览器支持）|`boolean`|`false`||
|draggable|是否支持拖拽上传|`boolean`|`false`||
|tip|提示文字|`string`|`-`||
|headers|上传请求附加的头信息|`Record<string, string>`|`-`||
|data|上传请求附加的数据|`Record<string, string \| Blob>\| ((fileItem: FileItem) => Record<string, string \| Blob>)`|`-`||
|name|上传的文件名|`string \| ((fileItem: FileItem) => string)`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<upload>` 事件

|事件名|描述|参数|
|---|---|---|
|exceed-limit|上传的文件超出限制后触发|fileList: `FileItem[]`<br>files: `File[]`|
|change|上传的文件状态发生改变时触发|fileList: `FileItem[]`<br>fileItem: `fileItem`|
|progress|上传中的文件进度改变时触发|fileItem: `fileItem`<br>ev: `ProgressEvent`|
|preview|点击图片预览时的触发|fileItem: `FileItem`|
|success|上传成功时触发|fileItem: `FileItem`|
|error|上传失败时触发|fileItem: `FileItem`|

### `<upload>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|submit|上传文件（已经初始化完成的文件）|fileItem: `FileItem`|-||
|abort|中止上传|fileItem: `FileItem`|-||
|updateFile|更新文件|id: `string`<br>file: `File`|-||
|upload|上传文件|files: `File[]`|-|2.41.0|

### `<upload>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|extra-button|上传列表额外按钮|fileItem: `FileItem`|2.43.0|
|image|自定义图片|fileItem: `FileItem`|2.23.0|
|file-name|文件名称|-|2.23.0|
|file-icon|文件图标|-|2.23.0|
|remove-icon|删除图标|-|2.23.0|
|preview-icon|预览图标|-|2.23.0|
|cancel-icon|取消图标|-|2.23.0|
|start-icon|开始图标|-|2.23.0|
|error-icon|失败图标|-|2.23.0|
|success-icon|成功图标|-|2.23.0|
|retry-icon|重试图标|-|2.23.0|
|upload-button|上传按钮|-||

> 仅列出常用项，低频属性按需查阅官方 API。

### FileItem

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|uid|当前上传文件的唯一标示|`string`|`-`|
|status|当前上传文件的状态|`FileStatus`|`-`|
|file|文件对象|`File`|`-`|
|percent|上传进度百分比|`number`|`-`|
|response|当前文件上传请求返回的响应|`any`|`-`|
|url|文件地址|`string`|`-`|
|name|文件名|`string`|`-`|

### CustomIcon

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|startIcon|开始图标|`RenderFunction`|`-`|
|cancelIcon|取消图标|`RenderFunction`|`-`|
|retryIcon|重试图标|`RenderFunction`|`-`|
|successIcon|成功图标|`RenderFunction`|`-`|
|errorIcon|失败图标|`RenderFunction`|`-`|
|removeIcon|移除图标|`RenderFunction`|`-`|
|previewIcon|预览图标|`RenderFunction`|`-`|
|fileIcon|文件图标|`(fileItem: FileItem) => VNode`|`-`|
|fileName|文件名|`(fileItem: FileItem) => string \| VNode`|`-`|

### RequestOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action|上传的URL|`string`|`-`|
|headers|请求报文的头信息|`Record<string, string>`|`-`|
|name|上传文件的文件名|`string \| ((fileItem: FileItem) => string)`|`-`|
|fileItem|上传文件|`FileItem`|`-`|
|data|附加的请求信息|`Record<string, string \| Blob>    \| ((fileItem: FileItem) => Record<string, string \| Blob>)`|`-`|
|withCredentials|是否携带cookie信息|`boolean`|`false`|
|onProgress|更新当前文件的上传进度。percent: 当前上传进度百分比|`(percent: number, event?: ProgressEvent) => void`|`-`|
|onSuccess|上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|
|onError|上传失败后，调用onError方法，传入的response参数将会附加到当前上传文件的response字段上|`(response?: any) => void`|`-`|

### UploadRequest

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|abort|终止上传|`() => void`|`-`|

## 常用模式

- **基本使用**：上传组件的基本用法。
- **用户头像上传**：点击上传用户头像，可使用 beforeUpload 限制用户上传的图片格式和大小。
- **已上传的文件列表**：可以指定默认的已上传文件列表。
- **照片墙**：通过设置 `list-type="picture-card"` 开启照片墙模式。
- **拖拽上传**：通过设置 `draggable` 开启对拖拽的支持。
- **图标列表样式**：通过设置 `list-type="picture"` 开启图片列表样式
- **手动上传**：设置 `auto-upload` 为 `false` 时候，可以通过调用 `submit` 方法进行手动上传。
- **上传前校验**：`beforeUpload` 会在每一个文件上传之前执行。如果返回 `false` 或者` Promise.reject`， 那么将会取消当前文件的上传。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
