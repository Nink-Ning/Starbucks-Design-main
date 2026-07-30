<template>
  <Layout class="sb-layout-demo sb-layout-demo--shell">
    <LayoutSider hide-trigger collapsible :collapsed="collapsed">
      <div class="sb-layout-demo__logo" />
      <Menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_3']"
        :style="{ width: '100%' }"
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
        <MenuItem key="0_3">
          <IconCalendar />
          Menu 3
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
        <Button class="sb-layout-demo__trigger" shape="round" @click="handleCollapse">
          <IconCaretRight v-if="collapsed" />
          <IconCaretLeft v-else />
        </Button>
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
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@sbux/starbucks-design-vue/icon';

const appContext = getCurrentInstance()!.appContext;

const collapsed = ref(false);
const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const handleClickMenuItem = (key: string) => {
  Message.info({ content: `You select ${key}`, showIcon: true }, appContext);
};
</script>
