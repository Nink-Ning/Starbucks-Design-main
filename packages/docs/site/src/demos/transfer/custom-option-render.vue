<template>
  <Transfer :data="data" :default-value="value">
    <template #item="{ label }">
      <icon-up />
      {{ label }}
    </template>
  </Transfer>
</template>

<script setup lang="ts">
import { IconUp } from '@sbux/starbucks-design-vue/icon';

const data = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: `option${index + 1}`,
    label: `Option ${index + 1}`,
    disabled: index === 1,
  }));
const value = ['option1', 'option3', 'option5'];
</script>
