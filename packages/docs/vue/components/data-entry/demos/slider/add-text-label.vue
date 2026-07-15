<template>
  <Slider
    :default-value="5"
    :style="{ width: '300px' }"
    :max="15"
    :marks="marks"
  />
</template>

<script setup lang="ts">
const marks = {
  0: '0km',
  5: '5km',
  10: '10km',
  15: '15km',
};
</script>