<template>
  <Layout class="sb-layout-demo sb-layout-demo--shell">
    <LayoutSider collapsible breakpoint="xl">
      <div class="sb-layout-demo__logo" />
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
      <LayoutHeader>Header</LayoutHeader>
      <Layout class="sb-layout-demo__workspace">
        <Breadcrumb class="sb-layout-demo__breadcrumb">
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
