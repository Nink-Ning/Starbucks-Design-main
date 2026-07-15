<template>
  <Space direction="vertical" size="large">
    <TreeSelect
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
    />
    <TreeSelect
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
      :fallback-option="false"
    />
    <TreeSelect
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
      :fallback-option="fallback"
    />
    <TreeSelect
      placeholder="Please select ..."
      style="width: 300px"
      multiple
      :defaultValue="['node0', 'node2']"
      :data="treeData"
    />
    <TreeSelect
      multiple
      placeholder="Please select ..."
      style="width: 300px"
      :defaultValue="['node0', 'node2']"
      :data="treeData"
      :fallback-option="false"
    />
    <TreeSelect
      multiple
      placeholder="Please select ..."
      style="width: 300px"
      :default-value="['node0', 'node2']"
      :data="treeData"
      :fallback-option="fallback"
    />
  </Space>
</template>

<script setup lang="ts">
const treeData = [
  {
    key: 'node1',
    title: 'Trunk1',
    children: [
      {
        key: 'node2',
        title: 'Leaf1',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    children: [
      {
        key: 'node4',
        title: 'Leaf2',
      },
      {
        key: 'node5',
        title: 'Leaf3',
      },
    ],
  },
];

const fallback = (key: string) => {
  return {
    key,
    title: `++${key}++`,
  };
};
</script>