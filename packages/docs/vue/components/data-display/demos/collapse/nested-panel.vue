<template>
  <Collapse :default-active-key="['1', 2]" destroy-on-hide>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="1">
      <Collapse :default-active-key="['1.1']" destroy-on-hide>
        <CollapseItem
          header="Beijing Toutiao Technology Co., Ltd."
          key="1.1"
        >
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </CollapseItem>
        <CollapseItem
          header="Beijing Toutiao Technology Co., Ltd."
          key="1.2"
        >
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </CollapseItem>
      </Collapse>
    </CollapseItem>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." :key="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
    <CollapseItem header="Beijing Toutiao Technology Co., Ltd." key="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </CollapseItem>
  </Collapse>
</template>