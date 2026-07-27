<template>
  <div class="menu-demo">
    <Button
      :style="{
        padding: '0 12px',
        height: '30px',
        lineHeight: '30px',
        marginBottom: '4px',
      }"
      type="primary"
      @click="handleToggleCollapse"
    >
      <icon-menu-unfold v-if="collapsed" />
      <icon-menu-fold v-else />
    </Button>
    <Menu
      :style="{ width: '200px', borderRadius: '4px' }"
      theme="dark"
      :collapsed="collapsed"
      :default-open-keys="['0']"
      :default-selected-keys="['0_2']"
    >
      <SubMenu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <MenuItem key="0_0">Menu 1</MenuItem>
        <MenuItem key="0_1">Menu 2</MenuItem>
        <MenuItem key="0_2">Menu 3</MenuItem>
        <MenuItem key="0_3">Menu 4</MenuItem>
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
        <MenuItem key="2_0">Menu 1</MenuItem>
        <MenuItem key="2_1">Menu 2</MenuItem>
        <SubMenu key="2_2" title="Navigation 4">
          <MenuItem key="2_2_0">Menu 1</MenuItem>
          <MenuItem key="2_2_1">Menu 2</MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@sbux/starbucks-design-vue/icon';

const collapsed = ref(false);
const handleToggleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
