<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="position" type="button">
      <Radio value="left">Left</Radio>
      <Radio value="top">Top</Radio>
      <Radio value="right">Right</Radio>
      <Radio value="bottom">Bottom</Radio>
    </RadioGroup>
    <RadioGroup v-model="scrollPosition" type="button">
      <Radio value="auto">auto</Radio>
      <Radio value="start">start</Radio>
      <Radio value="center">center</Radio>
      <Radio value="end">end</Radio>
    </RadioGroup>
    <Button @click="handleChangeActive"> Change: {{ activeKey }}</Button>
  </Space>
  <Tabs
    v-model:activeKey="activeKey"
    :position="position"
    :scrollPosition="scrollPosition"
    style="width: 100%;height: 300px;margin-top: 20px"
  >
    <TabPane v-for="tab in tabs" :key="tab.key" :title="tab.title">
      {{ tab.content }}
    </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const position = ref('top');
const scrollPosition = ref('auto');
const activeKey = ref('Tab1');
const tabs = Array.from({ length: 30 }, (v, i) => {
  return {
    key: `Tab${i + 1}`,
    title: `Tab ${i + 1}`,
    content: `Content of Tab Panel ${i + 1}`
  }
});

const handleChangeActive = () => {
  activeKey.value = `Tab${Math.floor(Math.random() * 30) + 1}`;
};
</script>
