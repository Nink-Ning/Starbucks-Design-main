<template>
  <Space direction="vertical" :style="{ width: '100%' }">
    <Upload action="/" @before-upload="handleBeforeUpload" />
  </Space>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue';

const handleBeforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: 'handleBeforeUpload',
      content: `确认上传 ${file.name}`,
      onOk: () => resolve(true),
      onCancel: () => reject('cancel'),
    });
  });
};
</script>