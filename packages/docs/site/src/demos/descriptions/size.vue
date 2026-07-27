<template>
  <RadioGroup type="button" v-model="size" style="margin-bottom: 20px">
    <Radio value="mini">mini</Radio>
    <Radio value="small">small</Radio>
    <Radio value="medium">medium</Radio>
    <Radio value="large">large</Radio>
  </RadioGroup>
  <Descriptions
    bordered
    title="User Info"
    :data="data"
    :size="size"
    style="margin-bottom: 20px"
  />
  <Descriptions
    :column="1"
    title="User Info"
    :data="data"
    :size="size"
    :label-style="{ paddingRight: '40px' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');

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
    label: 'Date of Birth',
    value: '2020-05-15',
    span: 2,
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];
</script>
