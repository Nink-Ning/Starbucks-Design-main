<template>
  <Avatar
    :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: '#14a9f8',
    }"
  >
    {{ text }}
  </Avatar>
  <Button
    type="secondary"
    @click="handleClick"
    :style="{ verticalAlign: 'middle' }"
  >
    Change
  </Button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];

const index = ref(0);
const text = computed(() => list[index.value]);

const handleClick = () => {
  index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
};
</script>