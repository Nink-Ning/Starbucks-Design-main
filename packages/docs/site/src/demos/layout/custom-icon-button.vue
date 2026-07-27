<template>
  <Layout class="layout-demo">
    <LayoutSider collapsible breakpoint="xl">
      <div class="logo" />
      <Menu
        :default-open-keys="['1']"
        :default-selected-keys="['0_3']"
        :style="{ width: '100%' }"
        @menu-item-click="handleClickMenuItem"
      >
        <MenuItem key="0_1" disabled>
          <IconHome></IconHome>
          Menu 1
        </MenuItem>
        <MenuItem key="0_2">
          <IconCalendar></IconCalendar>
          Menu 2
        </MenuItem>
        <MenuItem key="0_3">
          <IconCalendar></IconCalendar>
          Menu 3
        </MenuItem>
        <SubMenu key="1">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 1
          </template>
          <MenuItem key="1_1">Menu 1</MenuItem>
          <MenuItem key="1_2">Menu 2</MenuItem>
          <SubMenu key="2" title="Navigation 2">
            <MenuItem key="2_1">Menu 1</MenuItem>
            <MenuItem key="2_2">Menu 2</MenuItem>
          </SubMenu>
          <SubMenu key="3" title="Navigation 3">
            <MenuItem key="3_1">Menu 1</MenuItem>
            <MenuItem key="3_2">Menu 2</MenuItem>
            <MenuItem key="3_3">Menu 3</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu key="4">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 4
          </template>
          <MenuItem key="4_1">Menu 1</MenuItem>
          <MenuItem key="4_2">Menu 2</MenuItem>
          <MenuItem key="4_3">Menu 3</MenuItem>
        </SubMenu>
      </Menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </LayoutSider>
    <Layout>
      <LayoutHeader style="padding-left: 20px;"> Header </LayoutHeader>
      <Layout style="padding: 0 24px;">
        <Breadcrumb :style="{ margin: '16px 0' }">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>List</BreadcrumbItem>
          <BreadcrumbItem>App</BreadcrumbItem>
        </Breadcrumb>
        <LayoutContent>Content</LayoutContent>
        <LayoutFooter>Footer</LayoutFooter>
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@sbux/starbucks-design-vue/icon';

const appContext = getCurrentInstance()!.appContext;

const handleClickMenuItem = (key) => {
  Message.info({ content: `You select ${key}`, showIcon: true }, appContext);
};
</script>
<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
