<template>
  <Space direction="vertical" size="large">
    <CheckboxGroup v-model="value1" :options="plainOptions" />
    <CheckboxGroup v-model="value2" :options="options" />
    <CheckboxGroup v-model="value2" :options="options">
      <template #label="{ data }">
        <Tag>{{ data.label }}</Tag>
      </template>
    </CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(['Plain 1']);
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3'];

const value2 = ref(['1']);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true },
];
</script>