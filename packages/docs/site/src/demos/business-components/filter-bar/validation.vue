<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :default-value="{ storeCode: 'x' }"
      :active-values="activeValues"
      @update:active-values="handleActiveValuesChange"
      @validate-failed="handleValidateFailed"
    />
    <div class="sb-filter-bar-demo__evidence-grid" aria-live="polite">
      <div class="sb-filter-bar-demo__evidence">
        <span class="sb-filter-bar-demo__eyebrow">Errors</span>
        <code>{{ JSON.stringify(errors) }}</code>
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
import type { FilterFieldSchema, FilterValidationError, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', required: true, placeholder: '必填' },
  {
    type: 'input',
    name: 'storeCode',
    label: '门店编码',
    defaultValue: 'x',
    rules: [{ validator: (value) => (String(value ?? '').length < 4 ? '编码至少 4 位' : undefined) }],
  },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
];

const errors = ref<FilterValidationError[]>([]);
const activeValues = ref<FilterValue>({});

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};

const handleValidateFailed = (nextErrors: FilterValidationError[]) => {
  errors.value = nextErrors;
};
</script>
