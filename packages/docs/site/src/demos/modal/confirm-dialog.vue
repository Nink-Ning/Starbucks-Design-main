<template>
  <Button type="primary" @click="handleClick">Confirm</Button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Modal } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Modal API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleClick = () => {
  Modal.confirm(
    {
      title: 'Confirm deletion',
      content:
        'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger',
      },
    },
    appContext
  );
};
</script>
