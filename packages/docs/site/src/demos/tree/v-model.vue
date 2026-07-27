<template>
  <ButtonGroup style="margin-bottom: 20px;">
    <Button type="primary" @click="handleToggleChecked">
      {{ checkedKeys?.length ? 'deselect all' : 'select all' }}
    </Button>
    <Button type="primary" @click="handleToggleExpanded">
      {{ expandedKeys?.length ? 'fold' : 'unfold' }}
    </Button>
  </ButtonGroup>
  <Tree
    :checkable="true"
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    v-model:expanded-keys="expandedKeys"
    :data="treeData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const allCheckedKeys = [
  '0-0',
  '0-0-1',
  '0-0-2',
  '0-0-2-1',
  '0-1',
  '0-1-1',
  '0-1-2',
];
const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Leaf 0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];
const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
const expandedKeys = ref<string[]>([]);

const handleToggleChecked = () => {
  checkedKeys.value = checkedKeys.value.length ? [] : allCheckedKeys;
};
const handleToggleExpanded = () => {
  expandedKeys.value = expandedKeys.value.length ? [] : allExpandedKeys;
};
</script>