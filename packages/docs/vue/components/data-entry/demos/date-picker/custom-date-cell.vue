<template>
  <DatePicker>
    <template #cell="{ date }">
      <div class="arco-picker-date">
        <div class="arco-picker-date-value" :style="getCellStyle(date)">
          {{ date.getDate() }}
        </div>
      </div>
    </template>
  </DatePicker>
</template>
<script setup lang="ts">
const highlightDates = [6, 14, 22];
const highlightStyle = {
  border: '1px solid rgb(var(--arcoblue-6))',
};

const getCellStyle = (date) => {
  return highlightDates.includes(date.getDate()) ? highlightStyle : {};
};
</script>