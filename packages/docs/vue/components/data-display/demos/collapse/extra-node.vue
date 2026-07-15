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
import { Message } from '@arco-design/web-vue';

const handleClick = () => {
  Message.info('hello');
};
</script>