<template>
  <Layout class="sb-layout-demo sb-layout-demo--shell">
    <LayoutSider
      theme="dark"
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="handleCollapse"
    >
      <div class="sb-layout-demo__logo" />
      <Menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_2']"
        @menuItemClick="handleClickMenuItem"
      >
        <MenuItem key="0_1" disabled>
          <IconHome />
          Menu 1
        </MenuItem>
        <MenuItem key="0_2">
          <IconCalendar />
          Menu 2
        </MenuItem>
        <SubMenu key="1">
          <template #title>
            <span><IconCalendar />Navigation 1</span>
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
            <span><IconCalendar />Navigation 4</span>
          </template>
          <MenuItem key="4_1">Menu 1</MenuItem>
          <MenuItem key="4_2">Menu 2</MenuItem>
          <MenuItem key="4_3">Menu 3</MenuItem>
        </SubMenu>
      </Menu>
    </LayoutSider>
    <Layout>
      <LayoutHeader>
        <Menu :openKeys="['1']" :selectedKeys="['0_2']" mode="horizontal">
          <MenuItem key="0_1" disabled>
            <IconHome />
            Menu 1
          </MenuItem>
          <MenuItem key="0_2">
            <IconCalendar />
            Menu 2
          </MenuItem>
          <SubMenu key="1">
            <template #title>
              <span><IconCalendar />Navigation 1</span>
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
              <span><IconCalendar />Navigation 4</span>
            </template>
            <MenuItem key="4_1">Menu 1</MenuItem>
            <MenuItem key="4_2">Menu 2</MenuItem>
            <MenuItem key="4_3">Menu 3</MenuItem>
          </SubMenu>
        </Menu>
      </LayoutHeader>
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
import { ref, getCurrentInstance } from 'vue';
import { Message } from '@sbux/starbucks-design-vue';
import {
  IconHome,
  IconCalendar,
} from '@sbux/starbucks-design-vue/icon';

const appContext = getCurrentInstance()!.appContext;

const collapsed = ref(false);
const handleCollapse = (val, type) => {
  const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
  Message.info({
    content,
    duration: 2000,
  }, appContext);
  collapsed.value = val;
};

const handleClickMenuItem = (key: string) => {
  Message.info({ content: `You select ${key}`, showIcon: true }, appContext);
};
</script>
