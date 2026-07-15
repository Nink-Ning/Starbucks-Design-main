---
sidebar_position: 1
---

# 通知提醒框 Notification

全局展示通知提醒，将信息及时有效的传达给用户。

## 基本用法

通知提醒框的基本用法。

<preview path="./demos/notification/basic.vue" title="基本用法"></preview>


## 自定义操作按钮

通过指定 `btn` 字段，可以添加操作按钮。

<preview path="./demos/notification/custom-action-button.vue" title="自定义操作按钮"></preview>


## 自定义关闭按钮

需要设置 `closable: true`，自定义元素使用 `closeIconElement`，仅图标使用 `closeIcon` (会有 `hover` 样式)。

<preview path="./demos/notification/custom-close-button.vue" title="自定义关闭按钮"></preview>


## 全局提示的位置

通知提醒框有 4 种不同的弹出位置，分别为：`左上角`, `右上角 (默认)`, `左下角`, `右下角`。

<preview path="./demos/notification/notification-position.vue" title="全局提示的位置"></preview>


## 自定义样式

可以设置 `style` 和 `class` 来定制样式。

<preview path="./demos/notification/custom-style.vue" title="自定义样式"></preview>


## 消息类型

通知提醒框的消息类型。

<preview path="./demos/notification/message-type.vue" title="消息类型"></preview>


## 更新延迟

通过指定参数 `id`，可以更新已经存在的通知提醒框。

<preview path="./demos/notification/update-delay.vue" title="更新延迟"></preview>


## 更新通知内容

通过指定参数 `id`，可以更新已经存在的通知提醒框。

<preview path="./demos/notification/update-notification.vue" title="更新通知内容"></preview>


## API





### `Notification` 全局方法

`Notification` 提供的全局方法，可以通过以下三种方法使用：
1. 通过 `this.$notification` 调用
2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$notification` 调用
3. 导入 `Notification`，通过 `Notification` 本身调用

当通过 `import` 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

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
|closeIconElement|关闭按钮元素|`RenderFunction`|`-`||
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`||



### NotificationReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前通知提醒框|`() => void`|`-`|



