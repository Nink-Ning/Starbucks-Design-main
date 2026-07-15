---
sidebar_position: 1
---

# 全局提示 Message

由用户的操作触发的轻量级全局反馈。

## 基本用法

全局提示的基本用法。

<preview path="./demos/message/basic.vue" title="基本用法"></preview>


## 可关闭

设置 `closable` 来显示关闭按钮。

<preview path="./demos/message/closable.vue" title="可关闭"></preview>


## 自定义图标

设置 `icon` 来自定义图标。

<preview path="./demos/message/custom-icon.vue" title="自定义图标"></preview>


## 全局提示的位置

全局提示有 2 种不同的弹出位置，分别为顶部和底部。

<preview path="./demos/message/notification-position.vue" title="全局提示的位置"></preview>


## 消息类型

全局提示有 6 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `loading`。2.41.0 版本增加 `normal` 类型，此类型下默认没有图标。

<preview path="./demos/message/message-type.vue" title="消息类型"></preview>


## 更新内容

更新消息内容，通过设置 `duration` 属性可以重置定时器。

<preview path="./demos/message/update-content.vue" title="更新内容"></preview>

