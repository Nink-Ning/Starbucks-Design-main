<template>
  <div>
    <DatePicker
      default-value="2019-06-03"
      v-model:pickerValue="pickerValue"
      hide-trigger
      style="width: 268px;"
    />
    <RangePicker
      :default-value="['2019-08-01', '2020-06-01']"
      v-model:pickerValue="rangePickerValue"
      hide-trigger
      style="width: 560px; margin-top: 20px;"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  pickerValue: null,
  rangePickerValue: null,
});

const { pickerValue, rangePickerValue } = toRefs(state);
</script>
