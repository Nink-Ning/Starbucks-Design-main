<template>
  <Result
    :status="null"
    title="This is title content"
    subtitle="This is subtitle content"
  >
    <template #icon>
      <IconFaceSmileFill />
    </template>
    <template #extra>
      <Space>
        <Button type="secondary">Again</Button>
        <Button type="primary">Back</Button>
      </Space>
    </template>
  </Result>
</template>
<script setup lang="ts">
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';
</script>