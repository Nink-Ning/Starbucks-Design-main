<template>
  <div style="width: 500px; padding: 2px; overflow: auto">
    <Tree :blockNode="true" :checkable="true" :data="treeData">
      <template #extra="nodeData">
        <IconPlus
          style="position: absolute; right: 8px; font-size: 12px; top: 10px; color: #3370ff;"
          @click="() => onIconClick(nodeData)"
        />
      </template>
    </Tree>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

function onIconClick(nodeData) {
  const children = nodeData.children || [];
  children.push({
    title: 'new tree node',
    key: nodeData.key + '-' + (children.length + 1),
  });
  nodeData.children = children;

  treeData.value = [...treeData.value];
}

const treeData = ref([
  {
    title: 'Trunk',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk',
    key: '0-1',
    children: [
      {
        title: 'Branch',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf',
        key: '0-1-2',
      },
    ],
  },
]);
</script>