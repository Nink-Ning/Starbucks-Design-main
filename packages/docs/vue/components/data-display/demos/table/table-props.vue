<template>
  <Form layout="inline" :model="form">
    <FormItem label="Border" field="border">
      <Switch v-model="form.border" />
    </FormItem>
    <FormItem label="Hover" field="hover">
      <Switch v-model="form.hover" />
    </FormItem>
    <FormItem label="stripe" field="stripe">
      <Switch v-model="form.stripe" />
    </FormItem>
    <FormItem label="checkbox" field="checkbox">
      <Switch v-model="form.checkbox" />
    </FormItem>
    <FormItem label="checkAll" field="checkAll">
      <Switch v-model="rowSelection.showCheckedAll" />
    </FormItem>
    <FormItem label="loading" field="loading">
      <Switch v-model="form.loading" />
    </FormItem>
    <FormItem label="tableHeader" field="tableHeader">
      <Switch v-model="form.tableHeader" />
    </FormItem>
    <FormItem label="noData" field="noData">
      <Switch v-model="form.noData" />
    </FormItem>
  </Form>
  <Table
    :columns="columns"
    :data="form.noData ? [] : data"
    :bordered="form.border"
    :hoverable="form.hover"
    :stripe="form.stripe"
    :loading="form.loading"
    :show-header="form.tableHeader"
    :row-selection="form.checkbox ? rowSelection : undefined"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  border: true,
  borderCell: false,
  hover: true,
  stripe: false,
  checkbox: true,
  loading: false,
  tableHeader: true,
  noData: false,
});

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
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
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];
</script>