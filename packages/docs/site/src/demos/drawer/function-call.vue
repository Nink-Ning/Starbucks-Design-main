<template>
  <Button type="primary" @click="handleClick">Open Drawer</Button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Drawer } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Drawer API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleClick = () => {
  Drawer.open(
    {
      title: 'Info Title',
      content: 'This is an info message',
      width: 340,
    },
    appContext
  );
};
</script>
