<template>
  <Space>
    <Link loading>Link</Link>
    <Link :loading="loading1" @click="handleClick1">Link</Link>
    <Link :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-edit />
      </template>
      Link
    </Link>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconEdit } from '@sbux/starbucks-design-vue/icon';

const loading1 = ref(false);
const loading2 = ref(false);

const handleClick1 = () => {
  loading1.value = true;
  setTimeout(() => {
    loading1.value = false;
  }, 3000);
};
const handleClick2 = () => {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
  }, 3000);
};
</script>
