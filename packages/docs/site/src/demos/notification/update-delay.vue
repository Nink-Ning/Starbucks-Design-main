<template>
  <Button type="primary" @click="handleNotification">
    Open Notification
  </Button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';

const appContext = getCurrentInstance()!.appContext;

const handleNotification = () => {
  Notification.warning({
    id: 'your_id',
    title: 'Ready to update',
    content: 'Will update after 2 seconds...',
    duration: 0,
  }, appContext);

  setTimeout(() => {
    Notification.success({
      id: 'your_id',
      title: 'Success',
      content: 'Update success!',
      duration: 3000,
    }, appContext);
  }, 2000);
};
</script>
