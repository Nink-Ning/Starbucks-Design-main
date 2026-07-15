<template>
  <div>
    <Space>
      <Button @click="handleShowInfoMessage">Info Message</Button>
      <Button @click="handleShowSuccessMessage" status="success"
        >Success Message
      </Button>
      <Button @click="handleShowWarningMessage" status="warning"
        >Warning Message
      </Button>
      <Button @click="handleShowErrorMessage" status="danger"
        >Error Message</Button
      >
    </Space>
  </div>
  <div style="margin-top: 20px">
    <Space>
      <Button @click="handleShowNormalMessage">Normal Message</Button>
      <Button @click="handleShowNormalMessageWithIcon"
        >Normal Message With Icon
      </Button>
      <Button @click="handleShowLoadingMessage" status="primary"
        >Loading Message
      </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

const renderIcon = () => h(IconExclamationCircleFill);

const handleShowInfoMessage = () => Message.info('This is an info message!');
const handleShowSuccessMessage = () =>
  Message.success('This is a success message!');
const handleShowWarningMessage = () =>
  Message.warning('This is a warning message!');
const handleShowErrorMessage = () => Message.error('This is an error message!');
const handleShowNormalMessage = () =>
  Message.normal('This is a normal message!');
const handleShowNormalMessageWithIcon = () =>
  Message.normal({
    content: 'This is a normal message!',
    icon: renderIcon,
  });
const handleShowLoadingMessage = () =>
  Message.loading('This is a loading message!');
</script>