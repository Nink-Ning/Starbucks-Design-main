<template>
  <InputNumber
    v-model="value"
    :style="{ width: '320px' }"
    placeholder="Please Enter"
    class="input-demo"
    :min="10"
    :max="100"
    model-event="input"
  />
  <div>value: {{ value }}</div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  value: 15,
});

const { value } = toRefs(state);
</script>