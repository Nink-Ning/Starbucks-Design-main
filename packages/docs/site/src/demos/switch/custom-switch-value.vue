<template>
  <Space direction="vertical" size="large">
    <Switch v-model="value" checked-value="yes" unchecked-value="no" />
    <div>Current Value: {{ value }}</div>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
