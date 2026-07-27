<template>
  <Space>
    <Button @click="handleShowTopMessage">Top Message</Button>
    <Button @click="handleShowBottomMessage">Bottom Message</Button>
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleShowTopMessage = () => {
  Message.info({ content: 'This is an info message!' }, appContext);
};

const handleShowBottomMessage = () => {
  Message.info(
    {
      content: 'This is an info message!',
      position: 'bottom',
    },
    appContext
  );
};
</script>
