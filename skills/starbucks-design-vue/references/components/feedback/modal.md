---
name: starbucks-vue-modal
description: "Starbucks UI Vue Modal 对话框 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-modal>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# Modal 对话框

## 简介

对话框的基本用法。

## 基本用法

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
}
</script>
```

## API

### `<modal>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|visible **(v-model)**|对话框是否可见|`boolean`|`-`||
|default-visible|对话框默认是否可见（非受控状态）|`boolean`|`false`||
|width|对话框的宽度，不设置的情况下会使用样式中的宽度值|`number\|string`|`-`|2.12.0|
|top|对话框的距离顶部的高度，居中显示开启的情况下不生效|`number\|string`|`-`|2.12.0|
|mask|是否显示遮罩层|`boolean`|`true`||
|title|标题|`string`|`-`||
|title-align|标题的水平对齐方向|`'start' \| 'center'`|`'center'`|2.17.0|
|align-center|对话框是否居中显示|`boolean`|`true`||
|unmount-on-close|关闭时是否卸载节点|`boolean`|`false`||
|mask-closable|是否点击遮罩层可以关闭对话框|`boolean`|`true`||
|hide-cancel|是否隐藏取消按钮|`boolean`|`false`||
|simple|是否开启简单模式|`boolean`|`(props: any) => {  return props.notice;}`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<modal>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|ok|点击确定按钮时触发|ev: `MouseEvent`||
|cancel|点击取消、关闭按钮时触发|ev: `MouseEvent \| KeyboardEvent`||
|open|对话框打开后（动画结束）触发|-||
|close|对话框关闭后（动画结束）触发|-||
|before-open|对话框打开前触发|-|2.16.0|
|before-close|对话框关闭前触发|-|2.16.0|

### `<modal>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|footer|页脚|-|

### `<modal>` 全局方法

Modal提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$modal调用

2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用

3. 导入Modal，通过Modal本身调用

```ts
import { createApp } from 'vue'
import { Modal } from '@sbux/starbucks-design-vue';

const app = createApp(App);
Modal._context = app._context;
```

### ModalConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|title|标题|`RenderContent`|`-`||
|content|内容|`RenderContent`|`-`||
|footer|页脚|`boolean \| RenderContent`|`true`||
|closable|是否显示关闭按钮|`boolean`|`true`||
|okText|确认按钮的内容|`string`|`-`||
|cancelText|取消按钮的内容|`string`|`-`||
|okButtonProps|确认按钮的Props|`ButtonProps`|`-`||
|cancelButtonProps|取消按钮的Props|`ButtonProps`|`-`||
|okLoading|确认按钮是否为加载中状态|`boolean`|`false`||
|hideCancel|是否隐藏取消按钮|`boolean`|`false`||
|mask|是否显示遮罩层|`boolean`|`true`||
|simple|是否开启简单模式|`boolean`|`false`||

> 仅列出常用项，低频属性按需查阅官方 API。

### ModalReturn

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|close|关闭对话框|`() => void`|`-`||
|update|更新对话框|`(config: ModalUpdateConfig) => void`|`-`|2.43.2|

### ModalMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|open|打开对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|confirm|打开对话框（简单模式）|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|info|打开信息对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|success|打开成功对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|warning|打开警告对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|
|error|打开错误对话框|`(config: ModalConfig, appContext?: AppContext) => ModalReturn`|`-`|

## 常用模式

- **异步关闭**：可以通过 on-before-ok 更简洁的实现异步关闭功能
- **函数调用**：通过函数的方式使用对话框。
- **消息提示**：有**info**, **success**, **warning**, **error**四种类型的消息提示，仅提供一个确认按钮用于关闭消息提示对话框。消息默认会默认开启 `simple` 和 `hideCancel`，如果想要取消可以再次设置。
- **对话框的宽度**：设置 `width="auto"` 可以让对话框自适应宽度
- **定制按钮文字**：设置 `okText` 与 `cancelText` 可以自定义按钮文字。
- **弹出层表单**：在对话框中使用表单
- **可拖动**：开启 `draggable` 属性，允许用户拖动对话框。
- **全屏**：开启 `fullscreen` 属性，可以让对话框占满整个容器。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
