<template>
  <Button type="primary" @click="handleNotification">
    Open Notification
  </Button>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue';

const handleNotification = () => {
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    style: { width: '500px' },
  });
};
</script>