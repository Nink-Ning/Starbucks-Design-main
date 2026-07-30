<template>
  <Space direction="vertical" size="large" style="width: 100%">
    <Mention
      v-model="value"
      :data="['Nink', 'Zero', 'Kevin']"
      placeholder="enter something"
    />
    <Mention
      v-model="text"
      :data="['Nink', 'Zero', 'Kevin']"
      type="textarea"
      placeholder="enter something"
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('@Nink');
const text = ref('@Nink');
</script>
