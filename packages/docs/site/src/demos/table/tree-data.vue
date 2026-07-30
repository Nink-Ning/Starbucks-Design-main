<template>
  <Space>
    <span>checkStrictly:</span>
    <Switch v-model="rowSelection.checkStrictly" />
  </Space>
  <Table
    :columns="columns"
    :data="data"
    :expandable="expandable"
    v-model:expandedKeys="expandedKeys"
    :row-selection="rowSelection"
    show-empty-tree
    style="margin-top: 20px"
  />
</template>

<script setup lang="ts">
import { h, ref, reactive } from 'vue';
import { IconDownCircle, IconRightCircle } from '@sbux/starbucks-design-vue/icon';

const expandedKeys = ref([]);

const expandable = {
  icon: (expanded: boolean) => h(expanded ? IconDownCircle : IconRightCircle),
};

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  checkStrictly: true,
});

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
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
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
    children: [
      {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        children: [
          {
            key: '3',
            name: 'Ed Hellen',
            salary: 17000,
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
          },
          {
            key: '4',
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
          },
        ],
      },
      {
        key: '5',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
      },
    ],
  },
  {
    key: '6',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '7',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '8',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '9',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
    children: [],
  },
];
</script>
