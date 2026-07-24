<template>
  <TreeSelect
    :data="treeData"
    v-model="selected"
    placeholder="请选择区域"
    style="width: 300px"
  ></TreeSelect>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const treeData = [
  {
    key: 'east',
    title: '华东区',
    children: [
      {
        key: 'shanghai',
        title: '上海市',
      },
      {
        key: 'zhejiang',
        title: '浙江省',
      },
    ],
  },
  {
    key: 'south',
    title: '华南区',
    children: [
      {
        key: 'guangdong',
        title: '广东省',
      },
      {
        key: 'fujian',
        title: '福建省',
      },
    ],
  },
];

const selected = ref('shanghai');
</script>
