<template>
  <Space direction="vertical" size="large">
    <Cascader
      :options="options"
      size="mini"
      :style="{ width: '320px' }"
      placeholder="mini"
      allow-clear
    />
    <Cascader
      :options="options"
      size="small"
      :style="{ width: '320px' }"
      placeholder="small"
      allow-clear
    />
    <Cascader
      :options="options"
      size="medium"
      :style="{ width: '320px' }"
      placeholder="medium"
      allow-clear
    />
    <Cascader
      :options="options"
      size="large"
      :style="{ width: '320px' }"
      placeholder="large"
      allow-clear
    />
  </Space>
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
    children: [
      {
        value: 'huangpu',
        label: 'Huangpu',
      },
    ],
  },
];
</script>
