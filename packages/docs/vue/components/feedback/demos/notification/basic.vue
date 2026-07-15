<template>
  <Space>
    <Button
      type="primary"
      @click="
        Notification.info({
          title: 'Notification',
          content: 'This is a notification!',
        })"
      >
      Open Notification
    </Button>
    <Button @click="handleNotification"> Open Notification </Button>
  </Space>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue';

const handleNotification = () => {
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
  });
};
</script>