<template>
  <Table
    :columns="columns"
    :data="data"
    :summary="true"
    :summary-span-method="spanMethod"
  />
  <Table
    :columns="columns"
    :data="data"
    :scroll="scroll"
    :expandable="expandable"
    :summary="summary"
  >
    <template #summary-cell="{ column, record, rowIndex }">
      <div :style="getColorStyle(column, record)">{{record[column.dataIndex]}}</div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const expandable = {
  title: 'Expand',
  width: 80,
};

const scroll = {
  x: 2000,
  y: 200,
};

const columns = reactive([
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 140,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    summaryCellStyle: (record) => {
      if (record.salary > 100000) {
        return {
          backgroundColor: 'rgb(var(--arcoblue-6))',
          color: '#fff',
        };
      }
      return undefined;
    },
  },
  {
    title: 'Data1',
    dataIndex: 'data1',
  },
  {
    title: 'Data2',
    dataIndex: 'data2',
  },
]);

const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    data1: 10,
    data2: 8,
    expand: 'Expand Content',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    data1: 9,
    data2: -12,
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    data1: 15,
    data2: -2,
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    data1: 2,
    data2: 3,
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    data1: 11,
    data2: 0,
  },
]);

const summary = ({ columns, data }) => {
  const countData = {
    salary: 0,
    data1: 0,
    data2: 0,
  };

  data.forEach((record) => {
    countData.salary += record.salary;
    countData.data1 += record.data1;
    countData.data2 += record.data2;
  });

  return [
    {
      name: 'Avg',
      salary: countData.salary / data.length,
      data1: countData.data1 / data.length,
      data2: countData.data2 / data.length,
    },
    {
      name: 'Sum',
      salary: countData.salary,
      data1: countData.data1,
      data2: countData.data2,
    },
  ];
};

const getColorStyle = (column, record) => {
  if (['data1', 'data2'].includes(column.dataIndex)) {
    return { color: record[column.dataIndex] > 0 ? 'red' : 'green' };
  }
  return undefined;
};

const spanMethod = ({ rowIndex, columnIndex }) => {
  if (rowIndex === 0 && columnIndex === 1) {
    return {
      colspan: 2,
    };
  }
  return undefined;
};
</script>