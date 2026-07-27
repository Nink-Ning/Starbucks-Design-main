<template>
  <Space>
    <DatePicker v-model="value" style="width: 200px;" />
    <RangePicker v-model="rangeValue" style="width: 300px;" />
  </Space>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  value: Date.now(),
  rangeValue: [Date.now(), Date.now()],
});

const { value, rangeValue } = toRefs(state);
</script>
