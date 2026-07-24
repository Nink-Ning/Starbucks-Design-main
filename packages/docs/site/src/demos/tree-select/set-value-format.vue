<template>
  <TreeSelect
    :data="treeData"
    :label-in-value="true"
    :default-value="{ value: 'shanghai', label: '上海市' }"
    placeholder="请选择区域"
    style="width: 300px"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
const treeData = [
  {
    key: 'east',
    title: '华东区',
    children: [
      {
        key: 'shanghai',
        title: '上海市',
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

function handleChange(value) {
  console.log(value);
}
</script>
