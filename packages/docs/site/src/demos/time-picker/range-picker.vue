<template>
  <TimePicker
    type="time-range"
    @select="(valueString, value) => print('onSelect:', valueString, value)"
    @change="(valueString, value) => print('onChange:', valueString, value)"
    style="width: 252px;"
  />
</template>
<script setup lang="ts">
const print = (...arg) => {
  console.log(...arg);
};
</script>
