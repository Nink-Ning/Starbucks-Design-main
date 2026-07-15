<template>
  <Space direction="vertical" :style="{ width: '50%' }">
    <Progress :percent="percent" />
    <Progress status="warning" :percent="percent" />
    <Progress status="danger" :percent="percent" />
  </Space>
  <div :style="{ marginTop: '20px' }">
    <Slider
      v-model="percent"
      :max="1"
      :step="0.1"
      :style="{ width: '150px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const percent = ref(0.2);
</script>