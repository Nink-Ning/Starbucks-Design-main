<template>
  <Space direction="vertical">
    <Space>
      <Select
        v-model="utcOffset"
        :options="utcOptions"
        style="width: 180px"
      />
      <DatePicker
        show-time
        style="width: 260px"
        :utc-offset="utcOffset"
        v-model="value"
      />
      <RangePicker
        show-time
        style="width: 360px"
        :utc-offset="utcOffset"
        v-model="rangeValue"
      />
    </Space>
    <pre>{{ output }}</pre>
  </Space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const utcOptions = Array.from({ length: 25 }, (_, i) => {
  const offset = i - 12;
  return {
    label: `UTC ${offset > 0 ? `+${offset}` : offset}`,
    value: offset,
  };
});

const utcOffset = ref(0);
const value = ref(new Date('2022-02-22 08:00:00'));
const rangeValue = ref([
  new Date('2022-02-22 08:00:00'),
  new Date('2022-02-22 10:00:00'),
]);

const output = computed(() =>
  JSON.stringify(
    {
      utcOffset: utcOffset.value,
      value: value.value,
      rangeValue: rangeValue.value,
    },
    null,
    2
  )
);
</script>