<template>
  <Space :size="40">
    <Badge :count="9" dot :offset="[6, -2]">
      <Link href="link">Link</Link>
    </Badge>
    <Badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: 'var(--color-text-secondary)', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </Badge>
  </Space>
</template>

<script setup lang="ts">
import { IconNotification } from '@sbux/starbucks-design-vue/icon';
</script>
