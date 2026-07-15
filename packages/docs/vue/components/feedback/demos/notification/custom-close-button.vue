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
import { Notification } from '@arco-design/web-vue';
import { IconCloseCircle } from '@arco-design/web-vue/es/icon';
const handleNotification = () => {
  Notification.info({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    closeIcon: <IconCloseCircle />,
  });
};

const handleNotification2 = () => {
  Notification.error({
    title: 'Notification',
    content: 'This is a notification!',
    closable: true,
    closeIconElement: <Button size="mini">Close</Button>,
  });
};
</script>