<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :default-value="initialValues"
      :active-values="activeValues"
      @update:active-values="handleActiveValuesChange"
    />
    <div class="sb-filter-bar-demo__evidence" aria-live="polite">
      <span class="sb-filter-bar-demo__eyebrow">Active Date Values</span>
      <code>{{ JSON.stringify(activeValues) }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'date', name: 'createdAt', label: '创建日期', valueFormat: 'YYYY-MM-DD' },
  { type: 'dateRange', name: 'period', label: '统计周期', valueFormat: 'YYYY-MM-DD', span: 2 },
];

const initialValues: FilterValue = {
  createdAt: '2026-07-29',
  period: ['2026-07-01', '2026-07-29'],
};

const activeValues = ref<FilterValue>({ ...initialValues });

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};
</script>
