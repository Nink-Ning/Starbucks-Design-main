<template>
  <div class="menu-demo">
    <Slider
      :style="{ width: '320px', marginBottom: '24px' }"
      v-model="width"
      :step="10"
      :min="160"
      :max="400"
    />
    <Menu
      showCollapseButton
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      :style="{ width: `${width}px`, height: 'calc(100% - 28px)' }"
    >
      <SubMenu key="0">
        <template #icon><IconApps></IconApps></template>
        <template #title>Navigation 1</template>
        <MenuItem key="0_0">Menu 1</MenuItem>
        <MenuItem key="0_1">Menu 2</MenuItem>
        <MenuItem key="0_2" disabled> Menu 3 </MenuItem>
      </SubMenu>
      <SubMenu key="1">
        <template #icon><IconBug></IconBug></template>
        <template #title>Navigation 2</template>
        <MenuItem key="1_0">Menu 1</MenuItem>
        <MenuItem key="1_1">Menu 2</MenuItem>
        <MenuItem key="1_2">Menu 3</MenuItem>
      </SubMenu>
      <SubMenu key="2">
        <template #icon><IconBulb></IconBulb></template>
        <template #title>Navigation 3</template>
        <MenuItem key="2_0">Menu 1</MenuItem>
        <MenuItem key="2_1">Menu 2</MenuItem>
        <MenuItem key="2_2">Menu 3</MenuItem>
      </SubMenu>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@sbux/starbucks-design-vue/icon';

const state = reactive({
  width: 240,
});

const { width } = toRefs(state);
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
