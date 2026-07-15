<template>
  <Statistic
    title="User Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="start"
    animation
  >
    <template #prefix>
      <icon-arrow-rise />
    </template>
    <template #suffix>%</template>
  </Statistic>
  <Button @click="start = true">Start</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const start = ref(false);
</script>