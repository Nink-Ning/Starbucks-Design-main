<template>
  <div class="menu-demo">
    <Menu
      v-model:collapsed="collapsed"
      :style="{
        width: '260px',
        height: '100%',
        backgroundColor: 'var(--bg-color-container)',
        borderRight: '1px solid var(--color-border-1)',
      }"
      :default-open-keys="['domains', 'analytics', 'compute']"
      :default-selected-keys="['domains-overview']"
      show-collapse-button
    >
      <MenuItem key="account-home">
        <template #icon><icon-home /></template>
        Account home
      </MenuItem>

      <SubMenu key="domains">
        <template #icon><icon-apps /></template>
        <template #title>Domains</template>
        <MenuItem key="domains-overview">Overview</MenuItem>
        <MenuItem key="domains-registrations">Registrations</MenuItem>
        <MenuItem key="domains-transfers">Transfers</MenuItem>
      </SubMenu>

      <MenuItemGroup title="Observe">
        <MenuItem key="investigate">
          <template #icon><icon-bug /></template>
          Investigate
        </MenuItem>
        <SubMenu key="analytics">
          <template #icon><icon-bulb /></template>
          <template #title>Analytics</template>
          <MenuItem key="analytics-dashboards">Dashboards</MenuItem>
          <MenuItem key="analytics-account">Account analytics</MenuItem>
          <MenuItem key="analytics-web">Web analytics</MenuItem>
        </SubMenu>
      </MenuItemGroup>

      <MenuItemGroup title="Build">
        <SubMenu key="compute">
          <template #icon><icon-apps /></template>
          <template #title>Compute</template>
          <MenuItem key="compute-workers">Workers &amp; Pages</MenuItem>
          <MenuItem key="compute-observability">Observability</MenuItem>
        </SubMenu>
        <MenuItem key="ai">
          <template #icon><icon-robot /></template>
          AI
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IconApps,
  IconBug,
  IconBulb,
  IconHome,
  IconRobot,
} from '@sbux/starbucks-design-vue/icon';

const collapsed = ref(false);
</script>

<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 680px;
  padding: 24px;
  background-color: var(--color-neutral-2);
}
</style>
