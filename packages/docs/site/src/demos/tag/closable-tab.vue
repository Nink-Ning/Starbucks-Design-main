<template>
  <Space>
    <Tag closable>Tag</Tag>
    <Tag closable>
      <template #icon>
        <icon-star />
      </template>
      Tag
    </Tag>
  </Space>
</template>

<script setup lang="ts">
import { IconStar } from '@sbux/starbucks-design-vue/icon';
</script>
