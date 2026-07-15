<template>
  <Button @click="handleClick">Update Info Message</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const index = ref(0);

const handleClick = () => {
  Message.info({
    id: 'myInfo',
    content: `This is an info message ${index.value++}`,
    duration: 2000,
  });
};
</script>