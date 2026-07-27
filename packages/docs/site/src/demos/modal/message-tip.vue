<template>
  <Space>
    <Button @click="handleClickInfo">Info</Button>
    <Button @click="handleClickSuccess" status="success">Success</Button>
    <Button @click="handleClickWarning" status="warning">Warning</Button>
    <Button @click="handleClickError" status="danger">Error</Button>
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Modal } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Modal API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleClickInfo = () => {
  Modal.info(
    {
      title: 'Info Notification',
      content:
        'This is an info description which directly indicates a neutral informative change or action.',
    },
    appContext
  );
};
const handleClickSuccess = () => {
  Modal.success(
    {
      title: 'Success Notification',
      content: 'This is a success notification',
    },
    appContext
  );
};
const handleClickWarning = () => {
  Modal.warning(
    {
      title: 'Warning Notification',
      content:
        'This is a warning description which directly indicates a warning that might need attention.',
    },
    appContext
  );
};
const handleClickError = () => {
  Modal.error(
    {
      title: 'Error Notification',
      content:
        'This is an error description which directly indicates a dangerous or potentially negative action.',
    },
    appContext
  );
};
</script>
