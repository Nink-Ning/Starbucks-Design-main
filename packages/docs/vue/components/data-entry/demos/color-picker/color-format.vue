<template>
  <Space direction="vertical">
    <RadioGroup type="button" v-model="format">
      <Radio v-for="item in formatList" :value="item">{{ item }}</Radio>
    </RadioGroup>
    <ColorPicker defaultValue="#165DFF" :format="format" showText />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const format = ref('hex');
const formatList = ['hex', 'rgb'];
</script>