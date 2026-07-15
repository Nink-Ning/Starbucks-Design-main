<template>
  <Select
    v-model="value"
    :options="options"
    :field-names="fieldNames"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const value = ref('bj');
const fieldNames = { value: 'city', label: 'text' };
const options = reactive([
  {
    city: 'bj',
    text: 'Beijing',
  },
  {
    city: 'sh',
    text: 'Shanghai',
  },
  {
    city: 'gz',
    text: 'Guangzhou',
  },
  {
    city: 'cd',
    text: 'Chengdu',
  },
]);
</script>