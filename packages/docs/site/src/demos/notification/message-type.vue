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
import { getCurrentInstance } from 'vue';
import { Notification } from '@sbux/starbucks-design-vue';

const appContext = getCurrentInstance()!.appContext;

const handleShowInfoNotification = () =>
  Notification.info('This is an info message!', appContext);
const handleShowSuccessNotification = () =>
  Notification.success('This is a success message!', appContext);
const handleShowWarningNotification = () =>
  Notification.warning('This is a warning message!', appContext);
const handleShowErrorNotification = () =>
  Notification.error('This is an error message!', appContext);
const handleShowNormalNotification = () =>
  Notification.info({
    content: 'This is an error message!',
    showIcon: false,
  }, appContext);
</script>
