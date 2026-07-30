<template>
  <div class="sb-filter-bar-demo sb-filter-bar-demo--basic">
    <FilterBar
      :fields="fields"
      :default-value="{ region: ['east', 'shanghai'] }"
      :active-values="activeValues"
      @update:active-values="handleActiveValuesChange"
    />
    <div class="sb-filter-bar-demo__evidence" aria-live="polite">
      <span class="sb-filter-bar-demo__eyebrow">Active Cascader Path</span>
      <code>{{ JSON.stringify(activeValues) }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';

const fields: FilterFieldSchema[] = [
  {
    type: 'cascader',
    name: 'region',
    label: '区域',
    options: [
      {
        label: '华东',
        value: 'east',
        children: [
          { label: '上海', value: 'shanghai' },
          { label: '杭州', value: 'hangzhou' },
        ],
      },
      {
        label: '华南',
        value: 'south',
        children: [{ label: '深圳', value: 'shenzhen' }],
      },
    ],
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

const activeValues = ref<FilterValue>({ region: ['east', 'shanghai'] });

const handleActiveValuesChange = (values: FilterValue) => {
  activeValues.value = values;
};
</script>
