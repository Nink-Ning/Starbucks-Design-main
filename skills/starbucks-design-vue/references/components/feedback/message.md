---
name: starbucks-vue-message
description: "Starbucks UI Vue 全局提示 Message 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-message>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 全局提示 Message

## 简介

全局提示的基本用法。

## 基本用法

```vue
<template>
  <a-button @click="handleClick">Info Message</a-button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message.info('This is an info message')
    }
  }
};
</script>
```

## API

### `Message` 全局方法

Message提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$message调用

2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$message调用

3. 导入Message，通过Message本身调用

```ts
import { createApp } from 'vue'
import { Message } from '@sbux/starbucks-design-vue';

const app = createApp(App);
Message._context = app._context;
```

### MessageMethod

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|info|显示信息提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|success|显示成功提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|warning|显示警告提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|error|显示错误提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|loading|显示加载中提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`||
|normal|显示提示|`(    config: string \| MessageConfig,    appContext?: AppContext  ) => MessageReturn`|`-`|2.41.0|
|clear|清空全部提示|`(position?: MessagePosition) => void`|`-`||

### MessageConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|content|内容|`RenderContent`|`-`||
|id|唯一id|`string`|`-`||
|icon|消息的图标|`RenderFunction`|`-`||
|position|消息的位置|`'top'\|'bottom'`|`-`||
|showIcon|是否显示图标|`boolean`|`false`||
|closable|是否显示关闭按钮|`boolean`|`false`||
|duration|消息显示的持续时间|`number`|`-`||
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`||
|resetOnHover|设置鼠标移入后不会自动关闭|`boolean`|`false`|2.39.0|

### MessageReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前消息|`() => void`|`-`|

## 常用模式

- **消息类型**：全局提示有 6 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `loading`。2.41.0 版本增加 `normal` 类型，此类型下默认没有图标。
- **自定义图标**：设置 `icon` 来自定义图标。
- **全局提示的位置**：全局提示有 2 种不同的弹出位置，分别为顶部和底部。
- **可关闭**：设置 `closable` 来显示关闭按钮。
- **更新内容**：更新消息内容，通过设置 `duration` 属性可以重置定时器。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
