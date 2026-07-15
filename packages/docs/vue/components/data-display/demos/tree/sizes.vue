<template>
  <div style="margin-bottom: 20px;">
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
  </div>
  <Tree
    style="margin-right: 20px;"
    :blockNode="true"
    :checkable="true"
    :size="size"
    :data="treeData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const size = ref('medium');
</script>