<template>
  <Space>
    <Tag>Default</Tag>
    <Tag>Tag 1</Tag>
    <Tag>Tag 2</Tag>
    <Tag>
      <template #icon>
        <icon-check-circle-fill />
      </template>
      Complete
    </Tag>
  </Space>
</template>

<script setup lang="ts">
import { IconCheckCircleFill } from '@sbux/starbucks-design-vue/icon';
</script>
