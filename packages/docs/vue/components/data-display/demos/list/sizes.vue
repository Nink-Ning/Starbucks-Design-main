<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="size" type="button">
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <List :size="size">
      <template #header> List title </template>
      <ListItem>Beijing Bytedance Technology Co., Ltd.</ListItem>
      <ListItem>Bytedance Technology Co., Ltd.</ListItem>
      <ListItem>Beijing Toutiao Technology Co., Ltd.</ListItem>
      <ListItem>Beijing Volcengine Technology Co., Ltd.</ListItem>
      <ListItem>China Beijing Bytedance Technology Co., Ltd.</ListItem>
    </List>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
</script>