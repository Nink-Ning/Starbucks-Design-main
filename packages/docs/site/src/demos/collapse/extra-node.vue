<template>
  <Collapse>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="1">
      <template #extra>
        <icon-copy />
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." :key="2">
      <template #extra>
        <Button type="primary" size="mini" @click.stop="handleClick"
          >hello</Button
        >
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="3">
      <template #extra>
        <Tag size="small">city</Tag>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';
import { IconCopy } from '@sbux/starbucks-design-vue/icon';

// Capture this island's appContext so the imperative Message API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleClick = () => {
  Message.info('hello', appContext);
};
</script>
