<template>
  <div class="menu-demo">
    <Menu mode="pop" showCollapseButton>
      <MenuItem key="1">
        <template #icon><icon-apps></icon-apps></template>
        Navigation 1
      </MenuItem>
      <SubMenu key="2">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <MenuItem key="2_0">Beijing</MenuItem>
        <MenuItem key="2_1">Shanghai</MenuItem>
        <MenuItem key="2_2">Guangzhou</MenuItem>
      </SubMenu>
      <SubMenu key="3">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <MenuItem key="3_0">Wuhan</MenuItem>
        <MenuItem key="3_1">Chengdu</MenuItem>
      </SubMenu>
      <MenuItem key="4">
        <template #icon><icon-safe></icon-safe></template>
        Navigation 4
      </MenuItem>
      <MenuItem key="5">
        <template #icon><icon-fire></icon-fire></template>
        Navigation 5
      </MenuItem>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import {
  IconApps,
  IconBug,
  IconBulb,
  IconSafe,
  IconFire,
} from '@sbux/starbucks-design-vue/icon';
</script>
<style scoped>
.menu-demo {
  width: 100%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  background-color: var(--color-neutral-2);
}

.menu-demo .arco-menu {
  width: 200px;
  height: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo .arco-menu :deep(.arco-menu-collapse-button) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu-demo
  .arco-menu:not(.arco-menu-collapsed)
  :deep(.arco-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .arco-menu:not(.arco-menu-collapsed)::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: inherit;
  border-radius: 50%;
  box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo .arco-menu.arco-menu-collapsed {
  width: 48px;
  height: auto;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo .arco-menu.arco-menu-collapsed :deep(.arco-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
</style>
