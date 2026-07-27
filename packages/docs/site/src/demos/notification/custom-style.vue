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
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    style: { width: '500px' },
  }, appContext);
};
</script>
