<template>
  <Space direction="vertical" size="large">
    <RadioGroup type="button" v-model="size">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <Pagination
      :total="50"
      :size="size"
      show-total
      show-jumper
      show-page-size
    />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
</script>