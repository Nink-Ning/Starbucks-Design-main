<template>
  <Button @click="handleClick">Open Modal</Button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';
import { Button, Modal } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Modal API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const ModalContent = {
  setup: () => {
    const onClick = () => {
      Modal.info(
        {
          title: 'Info Title',
          content: 'This is an nest info message',
        },
        appContext
      );
    };

    return () =>
      h('div', { class: 'info-modal-content' }, [
        h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
        h(Button, { size: 'mini', onClick }, 'Open Nest Modal'),
      ]);
  },
};

const handleClick = () => {
  Modal.info(
    {
      title: 'Info Title',
      content: () => h(ModalContent),
    },
    appContext
  );
};
</script>

<style>
.info-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
