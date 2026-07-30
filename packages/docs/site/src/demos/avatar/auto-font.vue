<template>
  <Avatar
    :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: 'var(--color-primary)',
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

const list = ['B', 'Nink', 'Starbucks', 'Tom', 'NK'];

const index = ref(0);
const text = computed(() => list[index.value]);

const handleClick = () => {
  index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
};
</script>
