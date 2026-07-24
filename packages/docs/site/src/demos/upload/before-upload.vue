<template>
  <Space direction="vertical" :style="{ width: '100%' }">
    <Upload action="/" @before-upload="handleBeforeUpload" />
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Modal } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Modal API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleBeforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    Modal.confirm(
      {
        title: 'handleBeforeUpload',
        content: `确认上传 ${file.name}`,
        onOk: () => resolve(true),
        onCancel: () => reject('cancel'),
      },
      appContext
    );
  });
};
</script>
