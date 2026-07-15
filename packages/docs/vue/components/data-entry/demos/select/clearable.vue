<template>
  <Select
    :style="{ width: '320px' }"
    v-model="value"
    placeholder="Please select ..."
    allow-clear
  >
    <Option>Beijing</Option>
    <Option>Shanghai</Option>
    <Option>Guangzhou</Option>
    <Option disabled>Disabled</Option>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Shanghai');
</script>