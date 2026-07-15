<template>
  <VerificationCode
    v-model="value"
    style="width: 300px"
    @finish="handleFinish"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const value = ref('');
const handleFinish = (value) => Message.info(`Verification code: ${value}`);
</script>