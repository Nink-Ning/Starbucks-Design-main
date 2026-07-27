<template>
  <Space direction="vertical" size="large">
    <InputNumber
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #plus>
        <icon-plus />
      </template>
      <template #minus>
        <icon-minus />
      </template>
    </InputNumber>
  </Space>
</template>

<script setup lang="ts">
import { IconPlus, IconMinus } from '@sbux/starbucks-design-vue/icon';
</script>
