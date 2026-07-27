<template>
  <Tree :data="treeData">
    <template #icon>
      <IconStar />
    </template>
  </Tree>
</template>
<script setup lang="ts">
import { h } from 'vue';
import {
  IconStar,
  IconDriveFile,
} from '@sbux/starbucks-design-vue/icon';

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
        icon: () => h(IconDriveFile),
      },
      {
        title: 'Leaf',
        key: 'node5',
        icon: () => h(IconDriveFile),
      },
    ],
  },
];
</script>