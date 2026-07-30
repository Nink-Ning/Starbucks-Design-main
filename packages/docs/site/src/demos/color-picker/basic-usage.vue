<template>
  <Space>
    <ColorPicker v-model="value" />
    <ColorPicker defaultValue="#00754A" showText disabledAlpha />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('#00754A');
</script>
