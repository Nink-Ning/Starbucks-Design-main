<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :model-value="draftValues"
      :active-values="activeValues"
      :default-value="initialValues"
      :default-visible-count="3"
      :columns="basicColumns"
      @values-change="handleValuesChange"
      @update:active-values="handleActiveValuesChange"
    />
    <Table :columns="tableColumns" :data="visibleRows" :pagination="false" row-key="id" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FilterBar, Table } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '门店 / 编号', priority: 1 },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    priority: 0,
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
      { label: '已停用', value: 'closed' },
    ],
  },
  {
    type: 'multiSelect',
    name: 'channel',
    label: '渠道',
    priority: 2,
    maxTagCount: 1,
    options: [
      { label: '堂食', value: 'dine-in' },
      { label: '外送', value: 'delivery' },
      { label: '自提', value: 'pickup' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期', priority: 3 },
  { type: 'dateRange', name: 'period', label: '营业周期', span: 2 },
];

const initialValues: FilterValue = {
  status: 'open',
  channel: ['dine-in'],
  period: ['2026-07-01', '2026-07-29'],
};

const basicColumns = { xs: 1, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 };

const rows = [
  { id: 'SH-001', name: '上海静安门店', status: 'open', channel: '堂食 / 外送' },
  { id: 'SH-018', name: '上海虹桥门店', status: 'pending', channel: '自提' },
  { id: 'HZ-011', name: '杭州西湖门店', status: 'open', channel: '堂食 / 自提' },
];
const tableColumns = [
  { title: '门店名称', dataIndex: 'name' },
  { title: '门店编号', dataIndex: 'id', width: 120 },
  { title: '渠道', dataIndex: 'channel', width: 160 },
];

const draftValues = ref<FilterValue>({ ...initialValues });
const activeValues = ref<FilterValue>({ ...initialValues });
const visibleRows = computed(() => {
  const keyword = String(activeValues.value.keyword ?? '').trim();
  const status = activeValues.value.status;
  return rows.filter((row) => {
    const keywordMatched = !keyword || row.name.includes(keyword) || row.id.includes(keyword);
    const statusMatched = !status || row.status === status;
    return keywordMatched && statusMatched;
  });
});

const handleValuesChange = (values: FilterValue) => {
  draftValues.value = values;
};

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};
</script>
