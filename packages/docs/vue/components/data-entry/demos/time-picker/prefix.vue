<template>
  <div>
    <div>
      <TimePicker style="width: 194px;">
        <template #prefix>
          <IconInfoCircle />
        </template> </TimePicker
    ></div>
    <div>
      <TimePicker type="time-range" style="width: 252px; margin-top: 20px">
        <template #prefix>
          <IconInfoCircle />
        </template>
      </TimePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconInfoCircle } from '@arco-design/web-vue/es/icon';
</script>