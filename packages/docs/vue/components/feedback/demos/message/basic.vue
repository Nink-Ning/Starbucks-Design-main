<template>
  <Button @click="handleClick">Info Message</Button>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleClick = () => {
  Message.info('This is an info message');
};
</script>