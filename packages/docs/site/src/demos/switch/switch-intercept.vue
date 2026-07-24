<template>
  <Space size="large">
    <Switch :beforeChange="handleChangeIntercept" />
    <Switch type="round" :beforeChange="handleChangeIntercept2" />
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleChangeIntercept = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};

const handleChangeIntercept2 = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!newValue) {
    Message.error("OH, You can't change", appContext);
    return false;
  }
  return true;
};

</script>
