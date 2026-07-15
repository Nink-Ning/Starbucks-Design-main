<template>
  <Space>
    <Button @click="handleClickInfo">Info</Button>
    <Button @click="handleClickSuccess" status="success">Success</Button>
    <Button @click="handleClickWarning" status="warning">Warning</Button>
    <Button @click="handleClickError" status="danger">Error</Button>
  </Space>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue';

const handleClickInfo = () => {
  Modal.info({
    title: 'Info Notification',
    content:
      'This is an info description which directly indicates a neutral informative change or action.',
  });
};
const handleClickSuccess = () => {
  Modal.success({
    title: 'Success Notification',
    content: 'This is a success notification',
  });
};
const handleClickWarning = () => {
  Modal.warning({
    title: 'Warning Notification',
    content:
      'This is a warning description which directly indicates a warning that might need attention.',
  });
};
const handleClickError = () => {
  Modal.error({
    title: 'Error Notification',
    content:
      'This is an error description which directly indicates a dangerous or potentially negative action.',
  });
};
</script>