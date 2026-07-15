<template>
  <div style="margin-bottom: 10px">
    <Switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <Space direction="vertical" size="large">
    <Select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :scrollbar="scrollbar"
    >
      <Option>Beijing</Option>
      <Option :tag-props="{ color: 'red' }">Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
    </Select>
    <Select
      :default-value="['Beijing', 'Shanghai', 'Guangzhou']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :max-tag-count="2"
      allow-clear
      :scrollbar="scrollbar"
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Chengdu</Option>
      <Option>Wuhan</Option>
    </Select>
    <Select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :limit="2"
      :scrollbar="scrollbar"
    >
      <Option>Beijing</Option>
      <Option :tag-props="{ color: 'red' }">Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
      <Option>Shenzhen</Option>
      <Option>Wuhan</Option>
    </Select>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const scrollbar = ref(true);
</script>