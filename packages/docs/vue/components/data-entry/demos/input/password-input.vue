<template>
  <Space direction="vertical" size="large">
    <Switch v-model="visibility" />
    <InputPassword
      v-model:visibility="visibility"
      placeholder="Please enter something"
      :style="{ width: '320px' }"
      :defaultVisibility="false"
      allow-clear
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visibility = ref(true);
</script>