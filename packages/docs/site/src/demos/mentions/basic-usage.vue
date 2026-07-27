<template>
  <Space direction="vertical" size="large" style="width: 100%">
    <Mention
      v-model="value"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      placeholder="enter something"
    />
    <Mention
      v-model="text"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="enter something"
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const text = ref('');
</script>
