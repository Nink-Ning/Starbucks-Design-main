<template>
  <RadioGroup
    type="button"
    v-model="checkedStrategy"
    @change="
      (value) => {
        checkedKeys = [];
      }
    "
  >
    <Radio
      v-for="item in strategyOptions"
      :key="item?.value"
      :value="item?.value"
    >
      {{ item?.label }}
    </Radio>
  </RadioGroup>
  <br />
  <TypographyText style="margin: 24px 0; display: inline-block;">
    Current: {{ checkedKeys?.join(' , ') }}
  </TypographyText>
  <br />
  <Tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :checked-strategy="checkedStrategy"
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

const strategyOptions = [
  {
    value: 'all',
    label: 'show all',
  },
  {
    value: 'parent',
    label: 'show parent',
  },
  {
    value: 'child',
    label: 'show child',
  },
];

const checkedKeys = ref([]);
const checkedStrategy = ref('all');
</script>