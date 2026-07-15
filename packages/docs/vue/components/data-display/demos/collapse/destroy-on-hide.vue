<template>
  <Collapse :default-active-key="['1', 2]" destroy-on-hide>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." :key="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem
      header="Beijing Toutiao Technology Co., Ltd."
      key="3"
      :show-expand-icon="false"
    >
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
  </Collapse>
</template>