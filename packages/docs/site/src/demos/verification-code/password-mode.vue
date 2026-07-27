<template>
  <VerificationCode
    defaultValue="123"
    style="width: 300px"
    masked
    @finish="handleFinish"
  />
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleFinish = (value) => Message.info(`Verification code: ${value}`, appContext);
</script>
