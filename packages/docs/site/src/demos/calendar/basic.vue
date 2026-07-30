<template>
  <div style="width: 100%; overflow: auto">
    <Calendar v-model="value" style="width: 100%" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(new Date('2023-01-01'));
</script>
