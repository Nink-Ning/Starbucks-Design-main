<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="value1" :options="plainOptions" />
    <RadioGroup v-model="value2" :options="options" />
    <RadioGroup v-model="value2" :options="options">
      <template #label="{ data }">
        <Tag>{{ data.label }}</Tag>
      </template>
    </RadioGroup>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('plain 1');
const plainOptions = ['plain 1', 'plain 2', 'plain 3'];

const value2 = ref('1');
const options = [
  { label: 'option 1', value: '1' },
  { label: 'option 2', value: '2' },
  { label: 'option 3', value: '3', disabled: true },
];
</script>