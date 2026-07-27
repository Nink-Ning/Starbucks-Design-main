<template>
  <Space direction="vertical" size="large">
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #prefix>
        <icon-user />
      </template>
    </Input>
    <Input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    >
      <template #suffix>
        <icon-info-circle />
      </template>
    </Input>
  </Space>
</template>

<script setup lang="ts">
import { IconUser, IconInfoCircle } from '@sbux/starbucks-design-vue/icon';
</script>
