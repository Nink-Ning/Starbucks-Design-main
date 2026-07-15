<template>
  <Space>
    <Button type="primary" @click="handleShowInfoNotification">
      Info
    </Button>
    <Button
      type="primary"
      status="success"
      @click="handleShowSuccessNotification"
    >
      Success
    </Button>
    <Button
      type="primary"
      status="warning"
      @click="handleShowWarningNotification"
    >
      Warning
    </Button>
    <Button
      type="primary"
      status="danger"
      @click="handleShowErrorNotification"
    >
      Error
    </Button>
    <Button type="secondary" @click="handleShowNormalNotification">
      Normal
    </Button>
  </Space>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue';

const handleShowInfoNotification = () =>
  Notification.info('This is an info message!');
const handleShowSuccessNotification = () =>
  Notification.success('This is a success message!');
const handleShowWarningNotification = () =>
  Notification.warning('This is a warning message!');
const handleShowErrorNotification = () =>
  Notification.error('This is an error message!');
const handleShowNormalNotification = () =>
  Notification.info({
    content: 'This is an error message!',
    showIcon: false,
  });
</script>