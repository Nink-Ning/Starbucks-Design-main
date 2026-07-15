<template>
  <Button @click="handleClick">Open Modal</Button>
  <Modal
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    fullscreen
  >
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.</div
    >
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
</script>