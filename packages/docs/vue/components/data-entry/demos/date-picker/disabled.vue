<template>
  <DatePicker
    defaultValue="2020-08-08"
    disabled
    style="width: 200px; margin-bottom: 20px;"
  />
  <br />
  <RangePicker
    :defaultValue="['2020-08-08', '2020-08-18']"
    disabled
    style="width: 300px; margin-bottom: 20px;"
  />
  <br />
  <RangePicker
    :defaultValue="['2020-08-08']"
    :disabled="[true, false]"
    :disabledDate="(current) => dayjs(current).isBefore(dayjs('2020-08-08'))"
    style="width: 300px; margin-bottom: 20px;"
  />
  <br />
  <RangePicker
    showTime
    :defaultValue="['2020-08-08 02:02:02']"
    :disabled="[true, false]"
    style="width: 380px;"
  />
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
</script>