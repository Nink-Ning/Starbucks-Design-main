<template>
  <Button @click="handleClick">Closeable Message</Button>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleClick = () => {
  Message.info({
    content: 'This is an info message!',
    closable: true,
  });
};
</script>