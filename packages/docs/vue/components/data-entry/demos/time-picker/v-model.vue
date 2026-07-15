<template>
  <TimePicker style="width: 194px" v-model="value" />
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  value: null,
});

const { value } = toRefs(state);
</script>