<template>
  <Button @click="handleClick">Info Message</Button>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

const handleClick = () => {
  Message.info({
    content: 'This is an info message!',
    icon: () => h(IconFaceSmileFill),
  });
};
</script>