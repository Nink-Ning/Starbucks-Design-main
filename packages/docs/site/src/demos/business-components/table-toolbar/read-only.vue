<template>
  <div class="sb-table-toolbar-demo">
    <div class="sb-table-toolbar-demo__scenario">
      <div class="sb-table-toolbar-demo__scenario-title">仅搜索</div>
      <div class="sb-table-toolbar-demo__surface">
        <TableToolbar
          :quick-filters="searchOnlyFilters"
          :quick-filter-values="searchValues"
          :table-tools="tableTools"
          @update:quick-filter-values="searchValues = $event"
        />
      </div>
    </div>
    <div class="sb-table-toolbar-demo__scenario">
      <div class="sb-table-toolbar-demo__scenario-title">下拉筛选</div>
      <div class="sb-table-toolbar-demo__surface">
        <TableToolbar
          :quick-filters="statusOnlyFilters"
          :quick-filter-values="statusValues"
          :table-tools="tableTools"
          @update:quick-filter-values="statusValues = $event"
        />
      </div>
    </div>
    <div class="sb-table-toolbar-demo__scenario">
      <div class="sb-table-toolbar-demo__scenario-title">下拉筛选与搜索</div>
      <div class="sb-table-toolbar-demo__surface">
        <TableToolbar
          :quick-filters="channelAndSearchFilters"
          :quick-filter-values="channelValues"
          :table-tools="tableTools"
          @update:quick-filter-values="channelValues = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableToolbar } from '@sbux/starbucks-design-vue'
import type { TableToolbarQuickFilter, TableToolbarQuickFilterValues } from '@sbux/starbucks-design-vue'
import { statusOptions } from './shared'
import './table-toolbar.css'

const searchOnlyFilters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '请输入内容' }]
const statusOnlyFilters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', placeholder: '全部状态', options: statusOptions }
]
const channelAndSearchFilters: TableToolbarQuickFilter[] = [
  {
    type: 'select',
    name: 'channel',
    placeholder: '全部渠道',
    options: [
      { label: '全部渠道', value: 'all' },
      { label: '堂食', value: 'dine-in' },
      { label: '外送', value: 'delivery' }
    ]
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容' }
]
const tableTools = { export: true, columnSettings: true, refresh: true } as const
const searchValues = ref<TableToolbarQuickFilterValues>({})
const statusValues = ref<TableToolbarQuickFilterValues>({ status: 'all' })
const channelValues = ref<TableToolbarQuickFilterValues>({ channel: 'all' })
</script>
