<template>
  <div style="margin-bottom: 24px;">
    <Button type="primary" @click="handleClick">toggle</Button>
  </div>
  <TreeSelect
    :popupVisible="popupVisible"
    :allow-clear="true"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  ></TreeSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const treeData = [
  {
    key: 'node1',
    title: 'Trunk',
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

const popupVisible = ref(false);
function handleClick() {
  popupVisible.value = !popupVisible.value;
}
</script>