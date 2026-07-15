---
sidebar_position: 1
---

# 折叠列表 OverflowList

```

## 基本使用

折叠列表的基本使用方法。

<preview path="./demos/overflow-list/basic-usage.vue" title="基本使用"></preview>


## 折叠方向

通过 `from` 属性可以设置折叠的方向。

<preview path="./demos/overflow-list/collapse-direction.vue" title="折叠方向"></preview>


## API


### `<overflow-list>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|min|最少展示的元素个数|`number`|`0`|
|margin|项目间隔|`number`|`8`|
|from|折叠方向|`'start' \| 'end'`|`'end'`|
### `<overflow-list>` Events

|事件名|描述|参数|
|---|---|---|
|change|溢出数量改变时触发|value: `number`|
### `<overflow-list>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|overflow|折叠元素|number: `number`|




