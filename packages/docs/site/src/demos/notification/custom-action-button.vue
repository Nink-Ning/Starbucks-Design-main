<template>
  <Button type="primary" @click="handleNotification">
    Open Notification
  </Button>
</template>

<script setup lang="tsx">
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';

const appContext = getCurrentInstance()!.appContext;

const handleNotification = () => {
  const id = `${Date.now()}`;
  const closeNotification = Notification.info({
    id,
    title: 'Notification',
    content: 'This is a notification!',
    duration: 0,
    footer: (
      <Space>
        <Button
          type="secondary"
          size="small"
          onClick={() => Notification.remove(id)}
        >
          Cancel
        </Button>
        <Button type="primary" size="small" onClick={closeNotification}>
          Ok
        </Button>
      </Space>
    ),
  }, appContext);
};
</script>
