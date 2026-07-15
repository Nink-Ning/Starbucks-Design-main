<template>
  <Space size="large">
    <Switch :beforeChange="handleChangeIntercept" />
    <Switch type="round" :beforeChange="handleChangeIntercept2" />
    <Switch type="line" :beforeChange="handleChangeIntercept3" />
  </Space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

const handleChangeIntercept = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};

const handleChangeIntercept2 = async (newValue) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!newValue) {
    Message.error("OH, You can't change");
    return false;
  }
  return true;
};

const handleChangeIntercept3 = async (newValue) => {
  await new Promise((_, reject) =>
    setTimeout(() => {
      Message.error('OH, Something went wrong');
      reject();
    }, 1000)
  );
  return true;
};
</script>