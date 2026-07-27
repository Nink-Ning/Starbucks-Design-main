<template>
  <div class="menu-demo">
    <Menu
      :style="{ width: '200px', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      show-collapse-button
    >
      <MenuItem key="0_0_0" data-obj="1">Menu 1</MenuItem>
      <SubMenu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <MenuItem key="0_0">Menu 1</MenuItem>
        <MenuItem key="0_1">Menu 2</MenuItem>
        <MenuItem key="0_2" disabled>Menu 3</MenuItem>
      </SubMenu>
      <SubMenu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <MenuItem key="1_0">Menu 1</MenuItem>
        <MenuItem key="1_1">Menu 2</MenuItem>
        <MenuItem key="1_2">Menu 3</MenuItem>
      </SubMenu>
      <SubMenu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <MenuItemGroup title="Menu Group 1">
          <MenuItem key="2_0">Menu 1</MenuItem>
          <MenuItem key="2_1">Menu 2</MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="Menu Group 2">
          <MenuItem key="2_2">Menu 3</MenuItem>
          <MenuItem key="2_3">Menu 4</MenuItem>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@sbux/starbucks-design-vue/icon';
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
