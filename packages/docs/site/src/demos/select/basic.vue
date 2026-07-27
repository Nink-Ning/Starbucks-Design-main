<template>
  <Space direction="vertical" size="large">
    <Select :style="{ width: '320px' }" placeholder="Please select ...">
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select :style="{ width: '320px' }" placeholder="Please select ...">
      <Option :value="true">是</Option>
      <Option :value="false">否</Option>
    </Select>
    <Select
      defaultValue="Beijing"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      disabled
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
    <Select
      v-model="value"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
    >
      <Option v-for="item of data" :value="item" :label="item.label" />
    </Select>
    <div>Select Value: {{ value }}</div>
    <Select
      :style="{ width: '160px' }"
      placeholder="Select"
      :trigger-props="{ autoFitPopupMinWidth: true }"
    >
      <Option>Beijing-Beijing-Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </Select>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const data = [
  {
    value: 'beijing',
    label: 'Beijing',
    other: 'extra',
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    other: 'extra',
  },
  {
    value: 'guangzhou',
    label: 'Guangzhou',
    other: 'extra',
  },
  {
    value: 'chengdu',
    label: 'Chengdu',
    other: 'extra',
  },
];
</script>
