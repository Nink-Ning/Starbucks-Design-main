<template>
  <Space direction="vertical" size="large">
    <Select
      defaultValue="Shanxi"
      placeholder="Please select ..."
      :style="{ width: '320px' }"
      :fallback-option="fallback"
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select
      defaultValue="Shanxi"
      placeholder="Please select ..."
      :style="{ width: '320px' }"
      :fallback-option="fallback"
      :show-extra-options="false"
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select
      placeholder="Please select ..."
      multiple
      :default-value="['Shanxi', 'Nanjing', 'Hangzhou']"
      :style="{ width: '320px' }"
      :fallback-option="fallback"
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
const fallback = (value) => {
  return {
    value,
    label: `++${value}++`,
  };
};
</script>
