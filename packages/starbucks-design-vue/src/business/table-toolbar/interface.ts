import type { Component } from 'vue'

export type TableToolbarPrimitiveValue = string | number

export type TableToolbarQuickFilterValues = Record<string, unknown>

export type TableToolbarQuickFilterPlacement = 'start' | 'end'

export interface TableToolbarOption {
  label: string
  value: TableToolbarPrimitiveValue
  disabled?: boolean
}

export interface TableToolbarQuickFilterBase {
  name: string
  visible?: boolean
  disabled?: boolean
  placement?: TableToolbarQuickFilterPlacement
  width?: number | string
  ariaLabel?: string
  defaultValue?: unknown
}

export interface TableToolbarSearchFilter extends TableToolbarQuickFilterBase {
  type: 'search'
  placeholder?: string
  allowClear?: boolean
  maxLength?: number
}

export interface TableToolbarSelectFilter extends TableToolbarQuickFilterBase {
  type: 'select'
  options: readonly TableToolbarOption[]
  placeholder?: string
  allowClear?: boolean
  loading?: boolean
}

export interface TableToolbarButtonGroupFilter extends TableToolbarQuickFilterBase {
  type: 'buttonGroup'
  options: readonly TableToolbarOption[]
}

export interface TableToolbarDateRangeFilter extends TableToolbarQuickFilterBase {
  type: 'dateRange'
  placeholder?: [string, string]
  format?: string
  valueFormat?: string
  allowClear?: boolean
}

export type TableToolbarQuickFilter =
  | TableToolbarSearchFilter
  | TableToolbarSelectFilter
  | TableToolbarButtonGroupFilter
  | TableToolbarDateRangeFilter

export type TableToolbarQuickFilterSource =
  | 'selectChange'
  | 'buttonGroupChange'
  | 'dateRangeChange'
  | 'searchSubmit'
  | 'searchClear'

export interface TableToolbarQuickFilterEventMeta {
  source: TableToolbarQuickFilterSource
  fieldName: string
  changedValues: Partial<TableToolbarQuickFilterValues>
  values: TableToolbarQuickFilterValues
}

export type TableToolbarButtonType = 'primary' | 'secondary' | 'dashed' | 'outline' | 'text'

export interface TableToolbarAction {
  key: string
  label: string
  icon?: Component
  type?: TableToolbarButtonType
  status?: 'normal' | 'danger' | 'warning' | 'success'
  visible?: boolean
  disabled?: boolean
  disabledReason?: string
  loading?: boolean
  requiresSelection?: boolean
}

export interface TableToolbarOperationEventMeta {
  source: 'operation' | 'more'
  selectedCount: number
}

export interface TableToolbarToolConfig {
  visible?: boolean
  disabled?: boolean
  disabledReason?: string
  loading?: boolean
  tooltip?: string
  ariaLabel?: string
}

export interface TableToolbarTools {
  export?: boolean | TableToolbarToolConfig
  columnSettings?: boolean | TableToolbarToolConfig
  refresh?: boolean | TableToolbarToolConfig
}

export type TableToolbarToolName = keyof TableToolbarTools

export interface TableToolbarToolEventMeta {
  source: TableToolbarToolName
  selectedCount: number
  quickFilterValues: TableToolbarQuickFilterValues
}

export interface TableToolbarTexts {
  selected: (count: number) => string
  more: string
  batchActions: string
  export: string
  columnSettings: string
  refresh: string
  selectionRequired: string
  ariaLabel: string
}

export interface TableToolbarProps {
  quickFilters?: readonly TableToolbarQuickFilter[]
  quickFilterValues?: TableToolbarQuickFilterValues
  defaultQuickFilterValues?: TableToolbarQuickFilterValues
  selectedCount?: number
  operationActions?: readonly TableToolbarAction[]
  moreActions?: readonly TableToolbarAction[]
  tableTools?: TableToolbarTools
  disabled?: boolean
  texts?: Partial<TableToolbarTexts>
  ariaLabel?: string
}

export interface TableToolbarEmits {
  'update:quickFilterValues': [values: TableToolbarQuickFilterValues]
  quickFilterChange: [values: TableToolbarQuickFilterValues, meta: TableToolbarQuickFilterEventMeta]
  searchSubmit: [keyword: string, values: TableToolbarQuickFilterValues, meta: TableToolbarQuickFilterEventMeta]
  operation: [actionKey: string, meta: TableToolbarOperationEventMeta]
  export: [meta: TableToolbarToolEventMeta]
  columnSettings: [meta: TableToolbarToolEventMeta]
  refresh: [meta: TableToolbarToolEventMeta]
}
