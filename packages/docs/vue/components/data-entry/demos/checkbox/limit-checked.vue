<template>
  <Space direction="vertical" size="large">
    <CheckboxGroup :max="2" v-model="value1" :options="plainOptions" />
    <CheckboxGroup :max="2" :default-value="['1']">
      <Checkbox value="1" disabled>Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
      <Checkbox value="4">Option 4</Checkbox>
    </CheckboxGroup>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(['Plain 1']);
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3', 'Plain 4'];
</script>