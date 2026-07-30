<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--responsive">
    <div
      v-for="columnCount in previewColumnCounts"
      :key="columnCount"
      class="sb-filter-bar-demo__canvas"
      :data-preview-columns="columnCount"
    >
      <FilterBar
        :fields="fields"
        :default-value="{ status: 'open' }"
        :columns="getColumns(columnCount)"
        :collapsible="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '门店 / 编号' },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  {
    type: 'multiSelect',
    name: 'channel',
    label: '渠道',
    maxTagCount: 1,
    options: [
      { label: '堂食', value: 'dine-in' },
      { label: '外送', value: 'delivery' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期' },
  { type: 'dateRange', name: 'period', label: '统计周期', span: 2 },
];

const previewColumnCounts = [4, 3, 2, 1];
const getColumns = (count: number) => ({
  xs: count,
  sm: count,
  md: count,
  lg: count,
  xl: count,
  xxl: count,
});
</script>
