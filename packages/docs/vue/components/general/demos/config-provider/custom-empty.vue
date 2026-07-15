<template>
  <ConfigProvider>
    <template #empty="scope">
      <Empty
        v-if="scope?.component === 'cascader'"
        description="cascader no data!"
        in-config-provider
      >
      </Empty>
      <Empty
        v-else-if="scope?.component === 'select'"
        description="select no data!"
        in-config-provider
      ></Empty>
      <Empty
        v-else-if="scope?.component === 'tree-select'"
        description="tree-select no data!"
        in-config-provider
      ></Empty>
      <Empty
        v-else-if="scope?.component === 'list'"
        description="list no data!"
        in-config-provider
      ></Empty>
      <Empty
        v-else-if="scope?.component === 'table'"
        description="table no data!"
        in-config-provider
      ></Empty>
      <div v-else class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <Space direction="vertical" fill>
      <Cascader :options="[]" placeholder="cascader" allow-search />
      <Select placeholder="select" allow-search />
      <TreeSelect placeholder="tree-select" />
      <List>
        <template #header> Empty List </template>
      </List>
      <Table :columns="columns" :data="[]" />
      <Empty></Empty>
    </Space>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { IconTrophy } from '@arco-design/web-vue/es/icon';

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
</script>

<style>
.my-empty {
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>