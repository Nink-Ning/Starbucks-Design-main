<template>
  <AutoComplete
    :data="data"
    :style="{ width: '360px' }"
    placeholder="please enter something"
    strict
  />
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  data: ['Beijing', 'Shanghai', 'Chengdu', 'WuHan'],
});

const { data } = toRefs(state);
</script>
