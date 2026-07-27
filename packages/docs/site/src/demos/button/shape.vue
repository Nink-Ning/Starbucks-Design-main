<template>
  <Space>
    <Button type="primary">Square</Button>
    <Button type="primary" shape="round">Round</Button>
    <Button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </Button>
    <Button type="primary" shape="circle">
      <icon-plus />
    </Button>
  </Space>
</template>
<script setup lang="ts">
import { IconPlus } from '@sbux/starbucks-design-vue/icon';
</script>
