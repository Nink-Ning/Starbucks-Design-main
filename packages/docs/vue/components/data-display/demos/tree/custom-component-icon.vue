<template>
  <Tree :data="treeData" show-line>
    <template #switcher-icon="node, { isLeaf }">
      <IconDown v-if="!isLeaf" />
      <IconStar v-if="isLeaf" />
    </template>
  </Tree>
</template>

<script setup lang="ts">
import { h } from 'vue';
import {
  IconDriveFile,
  IconDown,
  IconStar,
} from '@arco-design/web-vue/es/icon';

const treeData = [
  {
    title: 'Trunk',
    key: 'node1',
    children: [
      {
        title: 'Leaf',
        key: 'node2',
      },
    ],
  },
  {
    title: 'Trunk',
    key: 'node3',
    children: [
      {
        title: 'Leaf',
        key: 'node4',
        switcherIcon: () => h(IconDriveFile),
      },
      {
        title: 'Leaf',
        key: 'node5',
        switcherIcon: () => h(IconDriveFile),
      },
    ],
  },
];
</script>