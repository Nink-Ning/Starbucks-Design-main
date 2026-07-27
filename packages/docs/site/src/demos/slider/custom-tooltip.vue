<template>
  <Slider
    :min="0"
    :max="50"
    :style="{ width: '200px' }"
    :format-tooltip="formatter"
  />
</template>

<script setup lang="ts">
const formatter = (value) => {
  return `${Math.round((value / 50) * 100)}%`;
};
</script>