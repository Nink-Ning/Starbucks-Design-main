---
name: starbucks-vue-controlled-values
description: "Starbucks UI Vue 受控与非受控值模式。用于判断何时使用 `v-model`、命名 `v-model:*`、默认属性和组件内部状态。"
user-invocable: false
---

# 受控值模式

在 Vue 中要先明确状态归属：业务代码需要读取、提交、持久化或联动的值，应由父级状态控制；仅用于组件初始展示的值，可以交给组件内部维护。

## 使用 v-model 受控

当父级状态拥有当前值时，使用 `v-model`。

```vue
<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');
</script>

<template>
  <a-input v-model="keyword" allow-clear />
</template>
```

弹窗可见性、抽屉可见性、选中项等状态通常使用命名双向绑定。

```vue
<a-modal v-model:visible="visible" title="确认">
  内容
</a-modal>
```

## 使用默认状态

当组件只需要一个初始值，父级代码不需要响应每次变化时，使用文档中声明的 `default-*` 属性。

```vue
<a-tabs default-active-key="overview">
  <a-tab-pane key="overview" title="概览" />
  <a-tab-pane key="detail" title="详情" />
</a-tabs>
```

## 判断规则

- 表单字段、筛选条件、弹窗可见性、选中项、分页状态，以及会被提交或持久化的值，优先使用 `v-model`。
- 静态示例或纯局部交互状态，可以使用 `default-*`。
- 同一个状态不要同时使用 `v-model` 和对应的 `default-*` 属性，避免状态来源不一致。
