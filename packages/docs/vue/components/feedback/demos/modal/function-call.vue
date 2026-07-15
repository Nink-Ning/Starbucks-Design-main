<template>
  <Button @click="handleClick">Open Modal</Button>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Modal } from '@arco-design/web-vue';

const ModalContent = {
  setup: () => {
    const onClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an nest info message',
      });
    };

    return () =>
      h('div', { class: 'info-modal-content' }, [
        h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
        h(Button, { size: 'mini', onClick }, 'Open Nest Modal'),
      ]);
  },
};

const handleClick = () => {
  Modal.info({
    title: 'Info Title',
    content: () => h(ModalContent),
  });
};
</script>

<style>
.info-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>