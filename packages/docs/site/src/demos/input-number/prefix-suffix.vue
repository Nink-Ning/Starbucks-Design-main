<template>
  <Space direction="vertical" size="large">
    <InputNumber
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #prefix>
        <icon-user />
      </template>
    </InputNumber>
    <InputNumber
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
      hide-button
    >
      <template #suffix>
        <icon-info-circle />
      </template>
    </InputNumber>
  </Space>
</template>

<script setup lang="ts">
import { IconUser, IconInfoCircle } from '@sbux/starbucks-design-vue/icon';
</script>
