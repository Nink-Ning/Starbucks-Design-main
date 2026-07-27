<template>
  <RadioGroup v-model="position">
    <Radio value="top">Top</Radio>
    <Radio value="right">Right</Radio>
    <Radio value="bottom">Bottom</Radio>
    <Radio value="left">Left</Radio>
  </RadioGroup>
  <div :style="{ marginTop: '20px' }">
    <Button type="primary" @click="handleClick">Open Drawer</Button>
  </div>
  <Drawer
    :width="340"
    :height="340"
    :visible="visible"
    :placement="position"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.</div
    >
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const position = ref('right');

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
