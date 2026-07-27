<template>
  <Space direction="vertical">
    <Switch v-model="triggerProps.popupVisible">
      <template #checked> ON </template>
      <template #unchecked>OFF</template>
    </Switch>
    <ColorPicker defaultValue="#165DFF" :trigger-props="triggerProps" />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const triggerProps = ref({
  popupVisible: false,
  unmountOnClose: true,
  renderToBody: false,
  position: 'rt',
});
</script>
