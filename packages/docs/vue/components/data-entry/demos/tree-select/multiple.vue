<template>
  <Space>
    <TreeSelect
      v-model="selected"
      :multiple="true"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    ></TreeSelect>
    <TreeSelect
      v-model="selected"
      :multiple="true"
      :max-tag-count="2"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    ></TreeSelect>
  </Space>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import { IconCalendar } from '@arco-design/web-vue/es/icon';

const treeData = [
  {
    key: 'node1',
    icon: () => h(IconCalendar),
    title: 'node1',
    children: [
      {
        key: 'node2',
        title: 'node2',
      },
    ],
  },
  {
    key: 'node3',
    title: 'node3',
    icon: () => h(IconCalendar),
    children: [
      {
        key: 'node4',
        title: 'node4',
      },
      {
        key: 'node5',
        title: 'node5',
      },
    ],
  },
];

const selected = ref([]);
</script>