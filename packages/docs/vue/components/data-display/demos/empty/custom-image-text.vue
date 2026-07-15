<template>
  <Empty>
    <template #image>
      <icon-exclamation-circle-fill />
    </template>
    No data, please reload!
  </Empty>
</template>

<script setup lang="ts">
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
</script>