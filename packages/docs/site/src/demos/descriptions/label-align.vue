<template>
  <Space direction="vertical" size="large">
    <Descriptions :data="data" title="User Info" align="right" />
    <Descriptions
      :data="data"
      title="User Info"
      :align="{ label: 'right' }"
    />
    <Descriptions :data="data" title="User Info" layout="inline-vertical" />
  </Space>
</template>

<script setup lang="ts">
const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];
</script>
