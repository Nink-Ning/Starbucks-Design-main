<template>
  <Pagination :total="200">
    <template #page-item="{ page }"> - {{ page }} - </template>
    <template #page-item-step="{ type }">
      <icon-send
        :style="
          type === 'previous' ? { transform: `rotate(180deg)` } : undefined
        "
      />
    </template>
    <template #page-item-ellipsis>
      <icon-sun-fill />
    </template>
  </Pagination>
</template>

<script setup lang="ts">
import { IconSend, IconSunFill } from '@sbux/starbucks-design-vue/icon';
</script>
