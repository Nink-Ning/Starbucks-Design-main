<template>
  <Table :columns="columns" :data="data">
    <template #optional="{ record }">
      <Button @click="$modal.info({ title: 'Name', content: record.name })"
        >view</Button
      >
    </template>
  </Table>
  <Table :data="data" style="margin-top: 30px">
    <template #columns>
      <TableColumn title="Name">
        <TableColumn title="First Name" data-index="first"></TableColumn>
        <TableColumn title="Last Name" data-index="last"></TableColumn>
      </TableColumn>
      <TableColumn title="Salary" data-index="salary"></TableColumn>
      <TableColumn title="Address" data-index="address"></TableColumn>
      <TableColumn title="Email" data-index="email"></TableColumn>
      <TableColumn title="Optional">
        <template #cell="{ record }">
          <Button
            @click="$modal.info({ title: 'Name', content: record.name })"
            >view</Button
          >
        </template>
      </TableColumn>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(true);

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
  {
    title: 'Optional',
    slotName: 'optional',
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    first: 'Jane',
    last: 'Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    first: 'Alisa',
    last: 'Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    first: 'Kevin',
    last: 'Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    first: 'Ed',
    last: 'Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    first: 'William',
    last: 'Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];
</script>