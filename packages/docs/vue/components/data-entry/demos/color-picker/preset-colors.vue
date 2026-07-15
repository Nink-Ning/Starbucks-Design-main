<template>
  <ColorPicker
    defaultValue="#165DFF"
    :historyColors="history"
    showHistory
    showPreset
    @popup-visible-change="handleAddHistory"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const history = ref(['#165DFF']);
const handleAddHistory = (visible, color) => {
  if (!visible) {
    const index = history.value.indexOf(color);
    if (index !== -1) {
      history.value.splice(index, 1);
    }
    history.value.unshift(color);
  }
};
</script>