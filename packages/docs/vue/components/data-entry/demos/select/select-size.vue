<template>
  <Space direction="vertical" size="large">
    <RadioGroup type="button" v-model="size">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <Select
      default-value="Beijing"
      :style="{ width: '320px' }"
      :size="size"
      placeholder="Please select ..."
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '320px' }"
      :size="size"
      placeholder="Please select ..."
      multiple
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Chengdu</Option>
      <Option>Wuhan</Option>
    </Select>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
</script>