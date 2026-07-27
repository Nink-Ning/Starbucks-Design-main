<template>
  <Select
    default-value="Beijing"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
  >
    <template #label="{ data }">
      <span><icon-plus />{{ data?.label }}</span>
    </template>
    <Option>Beijing</Option>
    <Option>Shanghai</Option>
    <Option>Guangzhou</Option>
    <Option disabled>Disabled</Option>
  </Select>
</template>

<script setup lang="ts">
import { IconPlus } from '@sbux/starbucks-design-vue/icon';
</script>
