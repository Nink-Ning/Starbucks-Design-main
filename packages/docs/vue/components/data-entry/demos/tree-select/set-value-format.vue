<template>
  <TreeSelect
    :data="treeData"
    :label-in-value="true"
    :default-value="{ value: 'node2', label: 'Leaf' }"
    placeholder="Please select ..."
    style="width: 300px"
    @change="handleChange"
  ></TreeSelect>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { IconCalendar } from '@arco-design/web-vue/es/icon';

const treeData = [
  {
    key: 'node1',
    icon: () => h(IconCalendar),
    title: 'Trunk',
    disabled: true,
    children: [
      {
        key: 'node2',
        title: 'Leaf',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    icon: () => h(IconCalendar),
    children: [
      {
        key: 'node4',
        title: 'Leaf',
      },
      {
        key: 'node5',
        title: 'Leaf',
      },
    ],
  },
];

function handleChange(value) {
  console.log(value);
}
</script>