<template>
  <AutoComplete
    :data="data"
    @search="handleSearch"
    :filter-option="false"
    :style="{ width: '360px' }"
    placeholder="please enter something"
  />
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  data: [],
});

const { data } = toRefs(state);

const handleSearch = (value) => {
  if (value) {
    data.value = [...Array(5)].map(() => Math.random().toFixed(10).slice(2));
  } else {
    data.value = [];
  }
};
</script>
