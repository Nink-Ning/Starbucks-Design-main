<template>
  <Space direction="vertical" :style="{ width: '100%' }">
    <Space>
      <RadioGroup type="button" v-model="position">
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </RadioGroup>
      <Checkbox v-model="hideIcon">Hide Expand Icon</Checkbox>
    </Space>
    <Collapse
      :default-active-key="['1']"
      :expand-icon-position="position"
      :show-expand-icon="!hideIcon"
    >
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="1">
        <template #expand-icon>
          <icon-plus />
        </template>
        <template #extra>
          <Tag size="small">city</Tag>
        </template>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </CollapseItem>
      <CollapseItem
        header="Beijing Toutiao Technology Co., Ltd."
        key="2"
        disabled
      >
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </CollapseItem>
      <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </CollapseItem>
    </Collapse>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconPlus } from '@sbux/starbucks-design-vue/icon';

const position = ref('left');
const hideIcon = ref(false);
</script>
