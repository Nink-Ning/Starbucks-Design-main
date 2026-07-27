<template>
  <Calendar v-model="value" />
  select: {{ displayValue }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref(new Date('2023-01-01'));
const displayValue = computed(() => value.value.toISOString());
</script>
