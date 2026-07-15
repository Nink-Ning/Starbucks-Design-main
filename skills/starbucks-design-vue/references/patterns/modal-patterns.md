---
name: starbucks-vue-modal-patterns
description: "Starbucks UI Vue 弹窗与反馈模式。用于 `a-modal`、`v-model:visible`、确认流程、弹窗表单、Message、Notification 和 Drawer。"
user-invocable: false
---

# 弹窗与反馈模式

详细 API 参考 [modal.md](../components/feedback/modal.md)、[drawer.md](../components/feedback/drawer.md) 和 [message.md](../components/feedback/message.md)。

## 受控弹窗

```vue
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <a-button type="primary" @click="visible = true">打开</a-button>
  <a-modal v-model:visible="visible" title="编辑">
    <p>内容</p>
  </a-modal>
</template>
```

## 弹窗内表单

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

const visible = ref(false);
const form = reactive({ name: '' });

const handleBeforeOk = async () => {
  if (!form.name) {
    Message.error('请输入名称');
    return false;
  }
  Message.success('保存成功');
  return true;
};
</script>

<template>
  <a-modal v-model:visible="visible" title="编辑" :on-before-ok="handleBeforeOk">
    <a-form :model="form" layout="vertical">
      <a-form-item field="name" label="名称" required>
        <a-input v-model="form.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
```

## 使用要点

- 弹窗和抽屉的可见性使用 `v-model:visible`。
- 异步确认、表单校验、关闭拦截使用文档中的 `on-before-ok` 或关闭前钩子。
- 轻量结果反馈使用 `Message`；需要标题、正文或更复杂内容时使用 `Notification`。
- `Message` 和 `Notification` 是全局服务 API，不是 `<a-message>` 或 `<a-notification>` 组件标签。
