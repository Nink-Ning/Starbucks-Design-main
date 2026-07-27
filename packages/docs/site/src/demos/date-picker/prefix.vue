<template>
  <div>
    <div>
      <DatePicker style="width: 300px;">
        <template #prefix>
          <IconInfoCircle />
        </template>
      </DatePicker>
    </div>
    <RangePicker
      showTime
      :defaultValue="['2019-08-08 00:00:00', '2019-08-18 00:00:00']"
      :style="{ width: '400px', marginTop: '20px' }"
    >
      <template #prefix>
        <IconInfoCircle />
      </template>
    </RangePicker>
  </div>
</template>

<script setup lang="ts">
import { IconInfoCircle } from '@sbux/starbucks-design-vue/icon';
</script>
