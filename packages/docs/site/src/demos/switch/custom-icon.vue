<template>
  <Space size="large">
    <Switch>
      <template #checked-icon>
        <icon-check />
      </template>
      <template #unchecked-icon>
        <icon-close />
      </template>
    </Switch>
    <Switch type="round">
      <template #checked-icon>
        <icon-check />
      </template>
      <template #unchecked-icon>
        <icon-close />
      </template>
    </Switch>
  </Space>
</template>

<script setup lang="ts">
import { IconCheck, IconClose } from '@sbux/starbucks-design-vue/icon';
</script>
