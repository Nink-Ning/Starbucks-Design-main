<template>
  <div>
    <Space>
      <Button @click="handleShowInfoMessage">Info Message</Button>
      <Button @click="handleShowSuccessMessage" status="success"
        >Success Message
      </Button>
      <Button @click="handleShowWarningMessage" status="warning"
        >Warning Message
      </Button>
      <Button @click="handleShowErrorMessage" status="danger"
        >Error Message</Button
      >
    </Space>
  </div>
  <div style="margin-top: 20px">
    <Space>
      <Button @click="handleShowNormalMessage">Normal Message</Button>
      <Button @click="handleShowNormalMessageWithIcon"
        >Normal Message With Icon
      </Button>
      <Button @click="handleShowLoadingMessage" status="primary"
        >Loading Message
      </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';
import { IconExclamationCircleFill } from '@sbux/starbucks-design-vue/icon';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const renderIcon = () => h(IconExclamationCircleFill);

const handleShowInfoMessage = () =>
  Message.info('This is an info message!', appContext);
const handleShowSuccessMessage = () =>
  Message.success('This is a success message!', appContext);
const handleShowWarningMessage = () =>
  Message.warning('This is a warning message!', appContext);
const handleShowErrorMessage = () =>
  Message.error('This is an error message!', appContext);
const handleShowNormalMessage = () =>
  Message.normal('This is a normal message!', appContext);
const handleShowNormalMessageWithIcon = () =>
  Message.normal(
    {
      content: 'This is a normal message!',
      icon: renderIcon,
    },
    appContext
  );
const handleShowLoadingMessage = () =>
  Message.loading('This is a loading message!', appContext);
</script>
