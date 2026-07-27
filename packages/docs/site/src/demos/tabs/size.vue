<template>
  <Space direction="vertical" size="large">
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">Mini</Radio>
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
    <Tabs :size="size">
      <TabPane key="1" title="Tab 1"> Content of Tab Panel 1 </TabPane>
      <TabPane key="2" title="Tab 2" disabled> Content of Tab Panel 2 </TabPane>
      <TabPane key="3" title="Tab 3"> Content of Tab Panel 3 </TabPane>
      <TabPane key="4" title="Tab 4"> Content of Tab Panel 4 </TabPane>
    </Tabs>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
</script>
