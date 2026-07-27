<template>
  <Space direction="vertical" size="large">
    <RadioGroup type="button" v-model="size">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
    <InputTag
      :default-value="['one']"
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      :size="size"
      allow-clear
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
</script>
