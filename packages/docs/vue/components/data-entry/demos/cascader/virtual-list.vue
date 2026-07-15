<template>
  <Cascader
    :options="options"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
    :virtual-list-props="{ height: 200 }"
  />
</template>

<script setup lang="ts">
const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
        children: [
          {
            value: 'jinrongjie',
            label: 'Jinrongjie',
          },
          {
            value: 'tianqiao',
            label: 'Tianqiao',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: Array(1000)
      .fill(null)
      .map((_, index) => ({
        value: `Option ${index}`,
        label: `Option ${index}`,
      })),
  },
];
</script>