<template>
  <Space direction="vertical" size="large" fill>
    <Descriptions :data="data" title="User Info" layout="inline-horizontal" />
    <Descriptions title="User Info" :column="{ xs: 1, md: 3, lg: 4 }">
      <DescriptionsItem
        v-for="item of data"
        :label="item.label"
        :span="item.span ?? 1"
      >
        <Tag>{{ item.value }}</Tag>
      </DescriptionsItem>
    </Descriptions>
  </Space>
</template>

<script setup lang="ts">
const data = [
  {
    label: 'Name',
    value: 'Socrates',
    span: 3,
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
