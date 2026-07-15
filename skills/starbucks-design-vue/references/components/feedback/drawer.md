---
name: starbucks-vue-drawer
description: "Starbucks UI Vue 抽屉 Drawer 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-drawer>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 抽屉 Drawer

## 简介

点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

## 基本用法

```vue
<template>
  <a-button type="primary" @click="handleClick">Open Drawer</a-button>
  <a-drawer :width="340" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </a-drawer>
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
};
</script>
```

## API

### `<drawer>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|visible **(v-model)**|抽屉是否可见|`boolean`|`false`||
|default-visible|抽屉默认是否可见（非受控模式）|`boolean`|`false`||
|placement|抽屉放置的位置|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|标题|`string`|`-`||
|mask|是否显示遮罩层|`boolean`|`true`||
|mask-closable|点击遮罩层是否可以关闭|`boolean`|`true`||
|closable|是否展示关闭按钮|`boolean`|`true`||
|ok-text|确认按钮的内容|`string`|`-`||
|cancel-text|取消按钮的内容|`string`|`-`||
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`||
|ok-button-props|确认按钮的Props|`ButtonProps`|`-`|2.9.0|
|cancel-button-props|取消按钮的Props|`ButtonProps`|`-`|2.9.0|

> 仅列出常用项，低频属性按需查阅官方 API。

### `<drawer>` 事件

|事件名|描述|参数|版本|
|---|---|---|:---|
|ok|点击确定按钮时触发|ev: `MouseEvent`||
|cancel|点击取消、关闭按钮时触发|ev: `MouseEvent \| KeyboardEvent`||
|open|抽屉打开后（动画结束）触发|-||
|close|抽屉关闭后（动画结束）触发|-||
|before-open|对话框打开前触发|-|2.43.0|
|before-close|对话框关闭前触发|-|2.43.0|

### `<drawer>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|header|页眉|-|2.33.0|
|title|标题|-||
|footer|页脚|-||

### `<drawer>` 全局方法

Drawer 提供的全局方法，可以通过以下三种方法使用：

1. 通过 `this.$drawer` 调用

2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$drawer` 调用

3. 导入 Drawer，通过 Drawer 本身调用

```ts
import { createApp } from 'vue'
import { Drawer } from '@sbux/starbucks-design-vue';

const app = createApp(App);
Drawer._context = app._context;
```

### DrawerConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|placement|抽屉放置的位置|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|title|标题|`RenderContent`|`-`||
|content|内容|`RenderContent`|`-`||
|mask|是否显示遮罩层|`boolean`|`true`||
|maskClosable|点击遮罩层是否可以关闭|`boolean`|`true`||
|closable|是否展示关闭按钮|`boolean`|`true`||
|okText|确认按钮的内容|`string`|`-`||
|cancelText|取消按钮的内容|`string`|`-`||
|okLoading|确认按钮是否为加载中状态|`boolean`|`false`||
|okButtonProps|确认按钮的Props|`ButtonProps`|`-`|2.9.0|
|cancelButtonProps|取消按钮的Props|`ButtonProps`|`-`|2.9.0|
|width|抽屉的宽度（仅在placement为right,left时可用）|`number \| string`|`250`||

> 仅列出常用项，低频属性按需查阅官方 API。

### DrawerReturn

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|close|关闭抽屉|`() => void`|`-`||
|update|更新抽屉|`(config: DrawerUpdateConfig) => void`|`-`|2.43.2|

### DrawerMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|open|打开抽屉|`(config: DrawerConfig, appContext?: AppContext) => DrawerReturn`|`-`|

## 常用模式

- **抽屉位置**：自定义位置，点击触发按钮抽屉从相应的位置滑出。
- **自定义节点**：通过插槽自定义内容，或者设置相应属性来控制显示或隐藏。
- **嵌套抽屉**：在抽屉内打开新的抽屉。
- **挂载位置**：通过 `popup-container` 可以设置弹出层节点的挂载位置
- **函数调用**：通过函数的方式使用抽屉。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
