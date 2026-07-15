<template>
  <Space direction="vertical" size="large">
    <Cascader
      :options="options"
      default-value="beijing"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      check-strictly
    />
    <Cascader
      :options="options"
      :default-value="['beijing']"
      :style="{ width: '320px' }"
      placeholder="Please select ..."
      multiple
      check-strictly
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
        disabled: true,
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