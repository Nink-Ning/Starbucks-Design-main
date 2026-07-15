<template>
  <RangePicker
    style="width: 300px;"
    @select="handleSelect"
    @popupVisibleChange="handlePopupVisibleChange"
    :disabledDate="disabledDate"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const dates = ref<Date[]>([]);
const handleSelect = (_str: string[], value: Date[]) => {
  dates.value = value;
};
const handlePopupVisibleChange = (visible: boolean) => {
  if (!visible) {
    dates.value = [];
  }
};
const disabledDate = (current: Date) => {
  const range = dates.value;
  if (range.length) {
    const tooLate = range[0] && Math.abs((+current - +range[0]) / (24 * 60 * 60 * 1000)) > 7;
    const tooEarly = range[1] && Math.abs((+current - +range[1]) / (24 * 60 * 60 * 1000)) > 7;
    return tooEarly || tooLate;
  }
  return false;
};
</script>