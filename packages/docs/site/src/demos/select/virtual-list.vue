<template>
  <Select
    :style="{ width: '320px' }"
    :options="options"
    placeholder="Please select ..."
    :virtual-list-props="{ height: 200 }"
  />
</template>

<script setup lang="ts">
const options = Array(1000)
  .fill(null)
  .map((_, index) => `Option ${index}`);
</script>
