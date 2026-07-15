<template>
  <DatePicker
    defaultValue="2019-06-03"
    :style="style"
  />
  <DatePicker
    defaultValue="2019-06-03"
    :format="(value) => `custom format: ${dayjs(value).format('YYYY-MM-DD')}`"
    :style="{ ...style, width: '240px' }"
  />
  <DatePicker
    showTime
    defaultValue="2019-06-03 08:00:00"
    :style="style"
  />
  <YearPicker
    defaultValue="2019"
    :style="style"
  />
  <MonthPicker
    defaultValue="2019-06"
    :style="style"
  />
  <WeekPicker
    :defaultValue="dayjs('2019-08-02')"
    :style="style"
  />
  <RangePicker
    showTime
    :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
    :style="{ ...style, width: '360px' }"
  />
  <RangePicker
    mode="month"
    style="width: 300px; marginBottom: 24px;"
    :defaultValue="['2019-08', '2020-06']"
  />
</template>
<script setup lang="ts">
import dayjs from 'dayjs';

const style = {
  width: '300px',
  marginBottom: '24px',
};
</script>