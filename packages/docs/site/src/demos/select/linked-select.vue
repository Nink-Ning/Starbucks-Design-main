<template>
  <Space>
    <Select :style="{ width: '200px' }" v-model="province">
      <Option v-for="value of Object.keys(data)">{{ value }}</Option>
    </Select>
    <Select
      :style="{ width: '200px' }"
      :options="data[province] || []"
      v-model="city"
    />
  </Space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const province = ref('Sichuan');
const city = ref('Chengdu');
const data = {
  Beijing: ['Haidian', 'Chaoyang', 'Changping'],
  Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
  Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou'],
};

watch(province, () => {
  city.value = '';
});
</script>
