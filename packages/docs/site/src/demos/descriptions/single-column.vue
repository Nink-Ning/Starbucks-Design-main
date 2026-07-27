<template>
  <RadioGroup type="button" v-model="size">
    <Radio value="mini">mini</Radio>
    <Radio value="small">small</Radio>
    <Radio value="medium">medium</Radio>
    <Radio value="large">large</Radio>
  </RadioGroup>
  <Descriptions
    style="margin-top: 20px"
    :data="data"
    :size="size"
    title="User Info"
    :column="1"
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
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];
</script>
