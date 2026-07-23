<template>
  <div class="tree-extra-demo" style="width: 500px; padding: 2px; overflow: auto">
    <Tree :blockNode="true" :checkable="true" :data="treeData">
      <template #extra="nodeData">
        <Button
          :aria-label="`为 ${nodeData.title} 添加子节点`"
          class="tree-node-add-button"
          shape="square"
          size="mini"
          type="text"
          @click.stop="onIconClick(nodeData)"
        >
          <template #icon>
            <IconPlus />
          </template>
        </Button>
      </template>
    </Tree>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IconPlus } from '@sbux/starbucks-design-vue/icon';
import './custom-extra-node.css';

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
