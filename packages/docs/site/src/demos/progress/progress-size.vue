<template>
  <Space direction="vertical" size="large" :style="{ width: '50%' }">
    <RadioGroup v-model="size" type="button">
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <Progress :size="size" :percent="0.2" />
    <Progress status="warning" :size="size" :percent="0.2" />
    <Progress status="danger" :size="size" :percent="0.2" />
    <Space>
      <Progress type="circle" :size="size" :percent="0.2" />
      <Progress type="circle" status="warning" :size="size" :percent="0.2" />
      <Progress type="circle" status="danger" :size="size" :percent="0.2" />
    </Space>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const size = ref('medium');
</script>