<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="type" type="button">
      <Radio value="line">Line</Radio>
      <Radio value="card">Card</Radio>
      <Radio value="card-gutter">Card Gutter</Radio>
      <Radio value="text">Text</Radio>
      <Radio value="rounded">Rounded</Radio>
      <Radio value="capsule">Capsule</Radio>
    </RadioGroup>
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <Tabs :type="type" :size="size">
      <TabPane key="1" title="Tab 1"> Content of Tab Panel 1 </TabPane>
      <TabPane key="2" title="Tab 2"> Content of Tab Panel 2 </TabPane>
      <TabPane key="3" title="Tab 3"> Content of Tab Panel 3 </TabPane>
    </Tabs>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const type = ref('line');
const size = ref('medium');
</script>