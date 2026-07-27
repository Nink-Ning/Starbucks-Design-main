<template>
  <TimePicker
    format="HH:mm"
    :defaultValue="defaultValue"
    style="width: 130px;"
  />
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  defaultValue: '09:24',
});

const { defaultValue } = toRefs(state);
</script>
