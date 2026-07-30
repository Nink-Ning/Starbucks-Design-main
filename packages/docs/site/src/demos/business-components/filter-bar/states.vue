<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--state-grid">
    <div class="sb-filter-bar-demo__state-panel">
      <div class="sb-filter-bar-demo__section-head">
        <div class="sb-filter-bar-demo__title">Loading</div>
      </div>
      <FilterBar :fields="fields" :default-value="{ status: 'open' }" loading />
    </div>
    <div class="sb-filter-bar-demo__state-panel">
      <div class="sb-filter-bar-demo__section-head">
        <div class="sb-filter-bar-demo__title">Disabled</div>
      </div>
      <FilterBar :fields="fields" :default-value="{ status: 'open' }" disabled />
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
  { type: 'date', name: 'createdAt', label: '创建日期' },
];
</script>
