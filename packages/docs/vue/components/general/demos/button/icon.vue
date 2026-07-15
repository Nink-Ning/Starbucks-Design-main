<template>
  <Space>
    <Button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </Button>
    <Button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </Button>
  </Space>
</template>

<script setup lang="ts">
import {
  IconPlus,
  IconDelete,
} from '@arco-design/web-vue/es/icon';
</script>