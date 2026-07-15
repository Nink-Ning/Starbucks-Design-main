<template>
  <Space size="large" :style="{ width: '100%' }">
    <Progress size="mini" :percent="percent" />
    <Progress size="mini" status="warning" :percent="percent" />
    <Progress size="mini" status="danger" :percent="percent" />
    <Progress size="mini" status="success" :percent="percent" />
  </Space>
  <Space size="large" :style="{ width: '100%', marginTop: '20px' }">
    <Progress type="circle" size="mini" :percent="percent" />
    <Progress type="circle" size="mini" status="warning" :percent="percent" />
    <Progress type="circle" size="mini" status="danger" :percent="percent" />
    <Progress type="circle" size="mini" status="success" :percent="percent" />
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