<template>
  <Form ref="formRef" :model="form" style="width: 300px">
    <FormItem
      field="code"
      label="code"
      :rules="[
        { required: true, message: 'Verification code is required' },
        { minLength: 6, message: 'Verification code is incomplete' },
        { match: /^\d+$/, message: 'Must be numeric' },
      ]"
    >
      <VerificationCode
        v-model="form.code"
        style="width: 300px"
        @finish="handleFinish"
      />
    </FormItem>
    <FormItem>
      <Button
        style="width: 60px"
        type="primary"
        size="large"
        htmlType="submit"
        >Submit</Button
      >
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const value = ref('654321');
const formRef = ref(null);
const form = ref({
  code: '',
});
const handleFinish = (value) => Message.info(`Verification code: ${value}`, appContext);
</script>
