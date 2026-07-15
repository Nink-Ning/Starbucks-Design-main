<template>
  <Space :size="40">
    <Badge :count="9">
      <Avatar shape="square" />
    </Badge>
    <Badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
      <Avatar shape="square" />
    </Badge>
    <Badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <Avatar shape="square" />
    </Badge>
  </Space>
</template>

<script setup lang="ts">
import { IconClockCircle } from '@arco-design/web-vue/es/icon';
</script>