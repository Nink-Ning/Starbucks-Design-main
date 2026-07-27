<template>
  <Tabs>
    <TabPane key="1">
      <template #title> <icon-calendar /> Tab 1 </template>
      Content of Tab Panel 1
    </TabPane>
    <TabPane key="2">
      <template #title> <icon-clock-circle /> Tab 2 </template>
      Content of Tab Panel 2
    </TabPane>
    <TabPane key="3">
      <template #title> <icon-user /> Tab 3 </template>
      Content of Tab Panel 3
    </TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { IconCalendar, IconClockCircle, IconUser } from '@sbux/starbucks-design-vue/icon';
</script>
