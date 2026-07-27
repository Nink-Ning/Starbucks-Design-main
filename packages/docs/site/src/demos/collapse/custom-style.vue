<template>
  <Collapse :default-active-key="['1', 2]" :bordered="false">
    <CollapseItem
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      key="1"
    >
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      :key="2"
    >
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      key="3"
    >
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
const customStyle = {
  borderRadius: '6px',
  marginBottom: '18px',
  border: 'none',
  overflow: 'hidden',
};
</script>
