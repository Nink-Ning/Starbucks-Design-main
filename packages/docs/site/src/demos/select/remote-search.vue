<template>
  <Space direction="vertical" size="large">
    <div>Show selections after search options</div>
    <Select
      :style="{ width: '320px' }"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
      :filter-option="false"
    >
      <Option v-for="item of options" :value="item">{{ item }}</Option>
    </Select>
    <div>Hide selections after search options</div>
    <Select
      :options="options"
      :style="{ width: '320px' }"
      :loading="loading"
      placeholder="Please select ..."
      multiple
      @search="handleSearch"
      :filter-option="false"
      :show-extra-options="false"
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
