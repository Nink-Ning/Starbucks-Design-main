<template>
  <Space>
    <DatePicker style="width: 268px;" v-model="value">
      <Button>{{ value || '请选择日期' }}</Button>
    </DatePicker>
    <RangePicker style="width: 268px;" v-model="rangeValue">
      <Button>{{
        (rangeValue && rangeValue.join(' - ')) || '请选择日期范围'
      }}</Button>
    </RangePicker>
  </Space>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const rangeValue = ref();
</script>