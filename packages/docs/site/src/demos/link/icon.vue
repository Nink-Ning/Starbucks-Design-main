<template>
  <div>
    <Space>
      <Link href="link" icon>Link</Link>
      <Link href="link" disabled icon>Link</Link>
    </Space>
  </div>
  <div>
    <Space>
      <Link href="link">
        <template #icon>
          <icon-edit />
        </template>
        Link
      </Link>
      <Link href="link" disabled>
        <template #icon>
          <icon-edit />
        </template>
        Link
      </Link>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { IconEdit } from '@sbux/starbucks-design-vue/icon';
</script>
