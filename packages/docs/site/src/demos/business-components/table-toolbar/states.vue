<template>
  <div class="sb-table-toolbar-demo sb-table-toolbar-demo--states">
    <div class="sb-table-toolbar-demo__state">
      <div class="sb-table-toolbar-demo__state-title">Normal</div>
      <TableToolbar :quick-filters="filters" :table-tools="tools" />
    </div>
    <div class="sb-table-toolbar-demo__state">
      <div class="sb-table-toolbar-demo__state-title">Loading</div>
      <TableToolbar :quick-filters="filters" :table-tools="{ ...tools, refresh: { loading: true } }" />
    </div>
    <div class="sb-table-toolbar-demo__state">
      <div class="sb-table-toolbar-demo__state-title">Disabled</div>
      <TableToolbar disabled :quick-filters="filters" :table-tools="tools" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TableToolbar } from '@sbux/starbucks-design-vue'
import type { TableToolbarQuickFilter, TableToolbarTools } from '@sbux/starbucks-design-vue'
import './table-toolbar.css'

const filters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '请输入内容' }]
const tools: TableToolbarTools = { export: true, columnSettings: true, refresh: true }
</script>
