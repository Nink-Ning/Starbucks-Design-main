---
sidebar_position: 1
---

# 评论 Comment

展示评论信息

## 对齐

通过 `align` 属性可以设置 `datetime` 和 `actions` 的对齐方式.

<preview path="./demos/comment/alignment.vue" title="对齐"></preview>


## 基本用法

一个基本的评论组件，带有作者、头像、时间和操作。

<preview path="./demos/comment/basic.vue" title="基本用法"></preview>


## 回复框

评论框配合回复框使用

<preview path="./demos/comment/reply-box.vue" title="回复框"></preview>


## 嵌套评论

评论可以嵌套使用

<preview path="./demos/comment/nested-comment.vue" title="嵌套评论"></preview>


## API


### `<comment>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|author|作者名|`string`|`-`|
|avatar|头像|`string`|`-`|
|content|评论内容|`string`|`-`|
|datetime|时间描述|`string`|`-`|
|align|靠左/靠右 展示 datetime 和 actions|`'left' \| 'right' \| { datetime?: "left" \| "right"; actions?: "left" \| "right" }`|`'left'`|
### `<comment>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|avatar|头像|-|
|author|作者|-|
|datetime|时间描述|-|
|content|评论内容|-|
|actions|操作列表|-|



