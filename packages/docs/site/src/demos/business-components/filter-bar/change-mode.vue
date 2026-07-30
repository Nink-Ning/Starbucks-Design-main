<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :model-value="draftValues"
      :active-values="activeValues"
      :default-value="initialValues"
      submit-mode="change"
      :debounce-ms="300"
      @values-change="handleValuesChange"
      @update:active-values="handleActiveValuesChange"
      @submit="handleSubmit"
    />
    <div class="sb-filter-bar-demo__evidence-grid" aria-live="polite">
      <div class="sb-filter-bar-demo__evidence">
        <span class="sb-filter-bar-demo__eyebrow">Active</span>
        <code>{{ JSON.stringify(activeValues) }}</code>
      </div>
      <div class="sb-filter-bar-demo__evidence">
        <span class="sb-filter-bar-demo__eyebrow">Event Order</span>
        <ol>
          <li v-for="(event, index) in events" :key="`${event}-${index}`">{{ event }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterEventMeta, FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '输入后自动查询' },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  { type: 'dateRange', name: 'period', label: '统计周期', valueFormat: 'YYYY-MM-DD', span: 2 },
];

const initialValues: FilterValue = { status: 'open', period: ['2026-07-01', '2026-07-29'] };
const draftValues = ref<FilterValue>({ ...initialValues });
const activeValues = ref<FilterValue>({ ...initialValues });
const events = ref<string[]>(['初始化 active snapshot']);

const pushEvent = (label: string, values: FilterValue, meta: FilterEventMeta) => {
  events.value = [`${label}: ${meta.source} ${JSON.stringify(values)}`, ...events.value].slice(0, 5);
};

const handleValuesChange = (values: FilterValue, meta: FilterEventMeta) => {
  draftValues.value = values;
  pushEvent('draft', values, meta);
};

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};

const handleSubmit = (snapshot: FilterValue, meta: FilterEventMeta) => {
  pushEvent('submit', snapshot, meta);
};
</script>
