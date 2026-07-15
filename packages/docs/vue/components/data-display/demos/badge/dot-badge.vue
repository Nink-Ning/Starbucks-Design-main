<template>
  <Space :size="40">
    <Badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </Badge>
    <Badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </Badge>
  </Space>
</template>

<script setup lang="ts">
import { IconNotification } from '@arco-design/web-vue/es/icon';
</script>