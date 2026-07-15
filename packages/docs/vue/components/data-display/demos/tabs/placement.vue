<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="position" type="button">
      <Radio value="top">Top</Radio>
      <Radio value="right">Right</Radio>
      <Radio value="bottom">Bottom</Radio>
      <Radio value="left">Left</Radio>
    </RadioGroup>
    <Tabs :position="position">
      <TabPane key="1" title="Tab 1"> Content of Tab Panel 1 </TabPane>
      <TabPane key="2" title="Tab 2"> Content of Tab Panel 2 </TabPane>
      <TabPane key="3" title="Tab 3"> Content of Tab Panel 3 </TabPane>
    </Tabs>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const position = ref('top');
</script>