<template>
  <Space direction="vertical">
    <Space>
      <Select
        v-model="timezone"
        :options="zoneOptions"
        style="width: 220px"
      />
      <DatePicker
        show-time
        style="width: 260px"
        :timezone="timezone"
        v-model="value"
      />
      <RangePicker
        show-time
        style="width: 360px"
        :timezone="timezone"
        v-model="rangeValue"
      />
    </Space>
    <pre>{{ output }}</pre>
  </Space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const zoneOptions = [
  'America/Los_Angeles',
  'Europe/London',
  'Africa/Cairo',
  'Asia/Shanghai',
].map((zone) => ({ label: zone, value: zone }));

const timezone = ref('Asia/Shanghai');
const value = ref(new Date('2022-02-22 08:00:00'));
const rangeValue = ref([
  new Date('2022-02-22 08:00:00'),
  new Date('2022-02-22 10:00:00'),
]);

const output = computed(() =>
  JSON.stringify(
    {
      timezone: timezone.value,
      value: value.value,
      rangeValue: rangeValue.value,
    },
    null,
    2
  )
);
</script>