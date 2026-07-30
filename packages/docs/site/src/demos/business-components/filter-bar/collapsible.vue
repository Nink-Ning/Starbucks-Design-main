<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :model-value="draftValues"
      :active-values="activeValues"
      :default-value="initialValues"
      :default-visible-count="3"
      @values-change="handleValuesChange"
      @update:active-values="handleActiveValuesChange"
    />
    <div class="sb-filter-bar-demo__evidence-grid" aria-live="polite">
      <div class="sb-filter-bar-demo__evidence">
        <span class="sb-filter-bar-demo__eyebrow">Draft</span>
        <code>{{ JSON.stringify(draftValues) }}</code>
      </div>
      <div class="sb-filter-bar-demo__evidence">
        <span class="sb-filter-bar-demo__eyebrow">Active</span>
        <code>{{ JSON.stringify(activeValues) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', priority: 1 },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    priority: 0,
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期', priority: 2 },
  {
    type: 'select',
    name: 'owner',
    label: '负责人',
    options: [
      { label: 'Ada', value: 'ada' },
      { label: 'Lin', value: 'lin' },
    ],
  },
  { type: 'dateRange', name: 'period', label: '营业周期', span: 2 },
];

const initialValues: FilterValue = { status: 'open', owner: 'ada', period: ['2026-07-01', '2026-07-29'] };
const draftValues = ref<FilterValue>({ ...initialValues });
const activeValues = ref<FilterValue>({ ...initialValues });

const handleValuesChange = (values: FilterValue) => {
  draftValues.value = values;
};

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};
</script>
