<template>
  <Space>
    <Button @click="handleShowTopMessage">Top Message</Button>
    <Button @click="handleShowBottomMessage">Bottom Message</Button>
  </Space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleShowTopMessage = () => {
  Message.info({ content: 'This is an info message!' });
};

const handleShowBottomMessage = () => {
  Message.info({
    content: 'This is an info message!',
    position: 'bottom',
  });
};
</script>