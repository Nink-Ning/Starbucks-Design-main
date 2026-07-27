<template>
  <Space direction="vertical">
    <Breadcrumb :routes="routes" />
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem :droplist="droplist"> Channel </BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>
        <template #droplist>
          <Doption>Option 1</Doption>
          <Dsubmenu value="option-1">
            <template #default>Option 2</template>
            <template #content>
              <Doption>Option 2-1</Doption>
              <Doption>Option 2-2</Doption>
              <Doption>Option 2-3</Doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center;">
                <Button>Click</Button>
              </div>
            </template>
          </Dsubmenu>
          <Doption>Option 3</Doption>
        </template>
        Channel
      </BreadcrumbItem>
      <BreadcrumbItem>News</BreadcrumbItem>
    </Breadcrumb>
  </Space>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  routes: [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/channel',
      label: 'Channel',
      children: [
        {
          path: '/users',
          label: 'Users',
        },
        {
          path: '/permission',
          label: 'Permission',
        },
      ],
    },
    {
      path: '/news',
      label: 'News',
    },
  ],
  droplist: [
    {
      path: '/goods',
      label: 'Goods',
    },
    {
      path: '/wallet',
      label: 'Wallet',
    },
  ],
});

const { routes, droplist } = toRefs(state);
</script>
