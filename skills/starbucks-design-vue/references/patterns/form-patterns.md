---
name: starbucks-vue-form-patterns
description: "Starbucks UI Vue 表单模式。用于 `a-form`、`a-form-item`、`field`、`model`、校验规则、动态字段、提交成功或失败，以及弹窗内表单。"
user-invocable: false
---

# 表单模式

完整表单 API 参考 [form.md](../components/data-entry/form.md)。

## 基础组合式表单

```vue
<script setup lang="ts">
import { reactive } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

const form = reactive({
  username: '',
  role: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  role: [{ required: true, message: '请选择角色' }],
};

const handleSubmit = (values: unknown) => {
  Message.success('提交成功');
  console.log(values);
};
</script>

<template>
  <a-form :model="form" :rules="rules" layout="vertical" @submit-success="handleSubmit">
    <a-form-item field="username" label="用户名">
      <a-input v-model="form.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item field="role" label="角色">
      <a-select v-model="form.role" :options="['admin', 'user']" placeholder="请选择角色" />
    </a-form-item>
    <a-button type="primary" html-type="submit">提交</a-button>
  </a-form>
</template>
```

## 使用要点

- `:model` 始终绑定到同一个响应式对象，避免字段分散在多个来源。
- `a-form-item` 使用 `field` 标识字段路径，不使用 `name`。
- 提交按钮使用 `html-type="submit"`，并在表单上监听 `@submit-success` 和 `@submit-failed`。
- 简单表单可将校验规则放在模型附近；复杂表单可抽到组合函数中统一维护。
- 嵌套对象和动态字段使用 Form 文档支持的字段路径，例如 `people[1].id`。
