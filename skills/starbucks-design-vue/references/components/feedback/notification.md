---
name: starbucks-vue-notification
description: "Starbucks UI Vue 通知提醒框 Notification 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-notification>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 通知提醒框 Notification

## 简介

通知提醒框的基本用法。

## 基本用法

```vue
<template>
  <a-space>
    <a-button type="primary" @click="() => this.$notification.info({
      title:'Notification',
      content:'This is a notification!'
    })"
    >
      Open Notification
    </a-button>
    <a-button @click="handleNotification">
      Open Notification
    </a-button>
  </a-space>
</template>

<script>
import { Notification } from '@sbux/starbucks-design-vue';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Notification',
        content: 'This is a notification!',
      })
    }

    return { handleNotification }
  }
}
</script>
```

## API

### `Notification` 全局方法

`Notification` 提供的全局方法，可以通过以下三种方法使用：

1. 通过 `this.$notification` 调用

2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$notification` 调用

3. 导入 `Notification`，通过 `Notification` 本身调用

```ts
import { createApp } from 'vue'
import { Notification } from '@sbux/starbucks-design-vue';

const app = createApp(App);
Notification._context = app._context;
```

### NotificationMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|info|显示信息提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|success|显示成功提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|warning|显示警告提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|error|显示错误提醒框|`(    config: string \| NotificationConfig,    appContext?: AppContext  ) => NotificationReturn`|`-`|
|remove|清除对应 `id` 的提醒框|`(id: string) => void`|`-`|
|clear|清除全部提醒框|`(position?: NotificationPosition) => void`|`-`|

### NotificationConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|content|内容|`RenderContent`|`-`||
|title|标题|`RenderContent`|`-`||
|icon|图标|`RenderFunction`|`-`||
|id|唯一id|`string`|`-`||
|style|样式|`CSSProperties`|`-`||
|class|样式类名|`ClassName`|`-`||
|position|位置|`'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight'`|`-`||
|showIcon|是否显示图标|`boolean`|`true`||
|closable|是否可关闭|`boolean`|`false`||
|duration|显示的持续时间，单位为 `ms`|`number`|`3000`||
|footer|底部内容|`RenderFunction`|`-`|2.25.0|
|closeIcon|关闭按钮图标|`RenderFunction`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### NotificationReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前通知提醒框|`() => void`|`-`|

## 常用模式

- **消息类型**：通知提醒框的消息类型。
- **全局提示的位置**：通知提醒框有 4 种不同的弹出位置，分别为：`左上角`, `右上角 (默认)`, `左下角`, `右下角`。
- **更新通知内容**：通过指定参数 `id`，可以更新已经存在的通知提醒框。
- **更新延迟**：通过指定参数 `id`，可以更新已经存在的通知提醒框。
- **自定义操作按钮**：通过指定 `btn` 字段，可以添加操作按钮。
- **自定义关闭按钮**：需要设置 `closable: true`，自定义元素使用 `closeIconElement`，仅图标使用 `closeIcon` (会有 `hover` 样式)。
- **自定义样式**：可以设置 `style` 和 `class` 来定制样式。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 弹窗、抽屉、确认框等显隐状态使用 `v-model:visible` 或组件提供的方法统一管理。
- 异步操作要配合 `loading`、禁用态或全局反馈，避免重复提交。
