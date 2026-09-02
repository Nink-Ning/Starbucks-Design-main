<template>
  <div class="sb-table-toolbar-demo">
    <div class="sb-table-toolbar-demo__surface">
      <TableToolbar
        :selected-count="selectedRowKeys.length"
        :quick-filters="quickFilters"
        :quick-filter-values="values"
        :operation-actions="operationActions"
        :more-actions="moreActions"
        :table-tools="{ export: true, columnSettings: true, refresh: true }"
        @update:quick-filter-values="values = $event"
        @operation="(key) => Message.info(`触发操作：${key}`)"
        @export="Message.info('触发导出')"
        @column-settings="Message.info('打开列设置')"
        @refresh="Message.info('刷新列表')"
      />
      <div class="sb-table-toolbar-demo__table">
        <Table
          row-key="id"
          :columns="toolbarColumns"
          :data="visibleRows"
          :pagination="false"
          :row-selection="{ type: 'checkbox' }"
          :scroll="{ x: 560 }"
          v-model:selected-keys="selectedRowKeys"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Message, Table, TableToolbar } from '@sbux/starbucks-design-vue'
import type {
  TableToolbarAction,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterValues
} from '@sbux/starbucks-design-vue'
import { IconArchive, IconCheckCircle, IconDelete, IconMinusCircle, IconSwap } from '@sbux/starbucks-design-vue/icon'
import { filterToolbarStores, statusOptions, toolbarColumns } from './shared'
import './table-toolbar.css'

const quickFilters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', placeholder: '全部状态', options: statusOptions },
  { type: 'search', name: 'keyword', placeholder: '请输入内容' }
]
const operationActions: TableToolbarAction[] = [
  { key: 'enable', label: '启用', icon: IconCheckCircle, requiresSelection: true },
  { key: 'disable', label: '停用', icon: IconMinusCircle, requiresSelection: true },
  { key: 'delete', label: '删除', icon: IconDelete, requiresSelection: true, status: 'danger' }
]
const moreActions: TableToolbarAction[] = [
  { key: 'move', label: '移动', icon: IconSwap, requiresSelection: true },
  { key: 'archive', label: '归档', icon: IconArchive, requiresSelection: true }
]
const values = ref<TableToolbarQuickFilterValues>({ status: 'all' })
const selectedRowKeys = ref<string[]>([])
const visibleRows = computed(() => filterToolbarStores(values.value))
</script>
