<template>
  <Space>
    <Button
      type="primary"
      @click="
        Notification.info({
          title: 'Notification',
          content: 'This is a notification!',
        }, appContext)"
      >
      Open Notification
    </Button>
    <Button @click="handleNotification"> Open Notification </Button>
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';

const appContext = getCurrentInstance()!.appContext;

const handleNotification = () => {
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
  }, appContext);
};
</script>
