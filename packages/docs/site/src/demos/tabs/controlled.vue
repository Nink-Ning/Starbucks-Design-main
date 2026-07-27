<template>
  <Tabs v-model:active-key="activeKey">
    <TabPane key="1" title="Tab 1"> Content of Tab Panel 1 </TabPane>
    <TabPane key="2" title="Tab 2"> Content of Tab Panel 2 </TabPane>
    <TabPane key="3" title="Tab 3"> Content of Tab Panel 3 </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKey = ref('1');
</script>
