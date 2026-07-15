<template>
  <Space direction="vertical" size="large" :style="{ width: '100%' }">
    <Space>
      <span>Animation</span>
      <Switch v-model="animation" />
    </Space>
    <Skeleton :animation="animation">
      <Space direction="vertical" :style="{ width: '100%' }" size="large">
        <SkeletonLine :rows="3" />
        <SkeletonShape />
      </Space>
    </Skeleton>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const animation = ref(true);
</script>