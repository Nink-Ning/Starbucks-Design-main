<template>
  <Space direction="vertical">
    <Breadcrumb :routes="routes" />
    <Breadcrumb :routes="routes">
      <template #item-render="{ route, paths }">
        <Link :href="paths.join('/')">
          {{ route.label }}
        </Link>
      </template>
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
    },
    {
      path: '/news',
      label: 'News',
    },
  ],
});

const { routes } = toRefs(state);
</script>
