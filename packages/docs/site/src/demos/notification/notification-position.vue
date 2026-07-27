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
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';

const appContext = getCurrentInstance()!.appContext;

const handleNotification = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
  }, appContext);
};

const handleNotificationTopLeft = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'topLeft',
  }, appContext);
};

const handleNotificationBottomRight = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'bottomRight',
  }, appContext);
};

const handleNotificationBottomLeft = () => {
  Notification.info({
    title: 'Title',
    content: 'This is a Notification!',
    position: 'bottomLeft',
  }, appContext);
};
</script>
