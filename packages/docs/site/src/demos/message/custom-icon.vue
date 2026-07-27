<template>
  <Button @click="handleClick">Info Message</Button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';
import { IconFaceSmileFill } from '@sbux/starbucks-design-vue/icon';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleClick = () => {
  Message.info(
    {
      content: 'This is an info message!',
      icon: () => h(IconFaceSmileFill),
    },
    appContext
  );
};
</script>
