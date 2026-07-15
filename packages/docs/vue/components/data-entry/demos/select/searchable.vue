<template>
  <Space direction="vertical" size="large">
    <Select
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      allow-search
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
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      :allow-search="{ retainInputValue: true }"
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
      :options="options"
      :style="{ width: '320px' }"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref(['Option1', 'Option2', 'Option3']);
const loading = ref(false);

const handleSearch = (value) => {
  if (value) {
    loading.value = true;
    window.setTimeout(() => {
      options.value = [
        `${value}-Option1`,
        `${value}-Option2`,
        `${value}-Option3`,
      ];
      loading.value = false;
    }, 2000);
  } else {
    options.value = [];
  }
};
</script>