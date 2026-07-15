<template>
  <Space>
    <ColorPicker v-model="value" />
    <ColorPicker defaultValue="#165DFF" showText disabledAlpha />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('#165DFF');
</script>