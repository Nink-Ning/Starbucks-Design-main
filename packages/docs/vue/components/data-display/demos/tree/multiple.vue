<template>
  <Checkbox
    style="marginBottom: 24px;"
    v-model="multiple"
    @change="
      () => {
        selectedKeys = [];
      }
    "
  >
    multiple
  </Checkbox>
  <br />
  <TypographyText>
    Current: {{ selectedKeys?.join(' , ') }}
  </TypographyText>
  <br />
  <Tree
    v-model:selected-keys="selectedKeys"
    :multiple="multiple"
    :data="treeData"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const selectedKeys = ref([]);
const multiple = ref(true);
const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
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
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
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
];
</script>