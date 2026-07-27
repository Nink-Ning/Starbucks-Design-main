<template>
  <Slider v-model="value" :style="{ width: '300px' }" range />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref([5, 10]);
</script>