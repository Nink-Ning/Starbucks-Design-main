<template>
  <Space>
    <Button type="primary" @click="handleNotification"> Top Right </Button>
    <Button type="primary" @click="handleNotificationTopLeft">
      Top Left
    </Button>
    <Button type="primary" @click="handleNotificationBottomRight">
      Bottom Right
    </Button>
    <Button type="primary" @click="handleNotificationBottomLeft">
      Bottom Left
    </Button>
  </Space>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue';

const handleNotification = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
  });
};

const handleNotificationTopLeft = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'topLeft',
  });
};

const handleNotificationBottomRight = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'bottomRight',
  });
};

const handleNotificationBottomLeft = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'bottomLeft',
  });
};
</script>