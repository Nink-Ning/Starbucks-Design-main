<template>
  <AutoComplete
    :data="data"
    @search="handleSearch"
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
    data.value = [...Array(5)].map((_, index) => `${value}-${index}`);
    console.log(data.value);
  } else {
    data.value = [];
  }
};
</script>