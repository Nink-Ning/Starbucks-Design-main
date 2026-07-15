<template>
  <VerificationCode
    defaultValue="123"
    style="width: 300px"
    masked
    @finish="handleFinish"
  />
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleFinish = (value) => Message.info(`Verification code: ${value}`);
</script>