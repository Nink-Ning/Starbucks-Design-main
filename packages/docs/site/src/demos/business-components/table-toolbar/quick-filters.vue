<template>
  <div class="sb-table-toolbar-demo">
    <div class="sb-table-toolbar-demo__scenario">
      <div class="sb-table-toolbar-demo__scenario-title">商品状态快捷筛选前置</div>
      <div class="sb-table-toolbar-demo__surface">
        <TableToolbar
          :quick-filters="statusFirstFilters"
          :quick-filter-values="statusValues"
          :table-tools="{ export: true, columnSettings: true, refresh: true }"
          @update:quick-filter-values="statusValues = $event"
        />
      </div>
    </div>
    <div class="sb-table-toolbar-demo__scenario">
      <div class="sb-table-toolbar-demo__scenario-title">时间快捷筛选</div>
      <div class="sb-table-toolbar-demo__surface">
        <TableToolbar
          :quick-filters="timeFirstFilters"
          :quick-filter-values="timeValues"
          :table-tools="{ export: true, columnSettings: true, refresh: true }"
          @update:quick-filter-values="timeValues = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableToolbar } from '@sbux/starbucks-design-vue'
import type { TableToolbarQuickFilter, TableToolbarQuickFilterValues } from '@sbux/starbucks-design-vue'
import './table-toolbar.css'

const statusFirstFilters: TableToolbarQuickFilter[] = [
  {
    type: 'buttonGroup',
    name: 'productStatus',
    options: [
      { label: '全部', value: 'all' },
      { label: '已上架', value: 'listed' },
      { label: '已下架', value: 'unlisted' }
    ],
    placement: 'start',
    width: 234
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容', width: 250 }
]
const statusValues = ref<TableToolbarQuickFilterValues>({ productStatus: 'all' })
const timeValues = ref<TableToolbarQuickFilterValues>({ timePreset: '30d' })
const timeFirstFilters: TableToolbarQuickFilter[] = [
  {
    type: 'buttonGroup',
    name: 'timePreset',
    options: [
      { label: '近30天', value: '30d' },
      { label: '近90天', value: '90d' },
      { label: '近1年', value: '1y' },
      { label: '近3年', value: '3y' }
    ],
    placement: 'start',
    width: 312
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容', width: 250 }
]
</script>
