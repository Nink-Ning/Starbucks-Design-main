<template>
  <div style="margin-bottom: 20px;">
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
  </div>
  <TreeSelect
    defaultValue="node1"
    :size="size"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  ></TreeSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const treeData = [
  {
    key: 'node1',
    title: 'node1',
    disabled: true,
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
    children: [
      {
        key: 'node4',
        title: 'node4',
        isLeaf: true,
      },
      {
        key: 'node5',
        title: 'node5',
        isLeaf: true,
      },
    ],
  },
];

const size = ref('medium');
</script>