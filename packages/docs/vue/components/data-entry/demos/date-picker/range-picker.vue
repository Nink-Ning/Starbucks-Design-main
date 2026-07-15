<template>
  <RangePicker
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <RangePicker
    mode="week"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <RangePicker
    mode="month"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <RangePicker
    mode="year"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <RangePicker
    mode="quarter"
    @change="handleChange"
    @select="handleSelect"
    style="width: 254px; marginBottom: 20px;"
  />
  <br />
  <RangePicker
    showTime
    :time-picker-props="{
      defaultValue: ['00:00:00', '00:00:00'],
    }"
    @change="handleChange"
    @select="handleSelect"
    style=" width: 380px; "
  />
</template>
<script setup lang="ts">


type OnChange = NonNullable<InstanceType<typeof RangePicker>['$props']['onChange']>;
type OnSelect = NonNullable<InstanceType<typeof RangePicker>['$props']['onSelect']>;

const handleChange: OnChange = (value, date, dateString) => {
  console.log('handleChange', value, date, dateString);
};
const handleSelect: OnSelect = (value, date, dateString) => {
  console.log('handleSelect', value, date, dateString);
};
</script>