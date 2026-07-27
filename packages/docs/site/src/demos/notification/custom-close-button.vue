<template>
  <Space>
    <Button type="primary" @click="handleNotification">
      Open Notification
    </Button>
    <Button type="primary" status="danger" @click="handleNotification2">
      Open Notification
    </Button>
  </Space>
</template>

<script setup lang="tsx">
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';
import { IconCloseCircle } from '@sbux/starbucks-design-vue/icon';

const appContext = getCurrentInstance()!.appContext;

const handleNotification = () => {
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    closeIcon: <IconCloseCircle />,
  }, appContext);
};

const handleNotification2 = () => {
  Notification.error({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    closeIconElement: <Button size="mini">Close</Button>,
  }, appContext);
};
</script>
