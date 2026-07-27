<template>
  <Table
    :columns="columns"
    :data="data"
    :row-selection="rowSelection"
    :virtual-list-props="{ height: 400 }"
    :pagination="false"
    :scroll="{ x: 1000 }"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 140
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const data = reactive(Array(1000).fill(null).map((_, index) => ({
  key: String(index),
  name: `User ${index + 1}`,
  address: '32 Park Road, London',
  email: `user.${index + 1}@example.com`
})));

const rowSelection = {
  type: 'checkbox',
  showCheckedAll: true
};
</script>