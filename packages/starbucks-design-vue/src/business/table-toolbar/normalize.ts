import type {
  TableToolbarAction,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterValues,
  TableToolbarTexts,
  TableToolbarToolConfig,
  TableToolbarTools
} from './interface'

export const DEFAULT_TABLE_TOOLBAR_DATE_FORMAT = 'YYYY-MM-DD'

export const DEFAULT_TABLE_TOOLBAR_TEXTS: TableToolbarTexts = {
  selected: (count) => `已选择 ${count} 项`,
  more: '更多',
  batchActions: '批量操作',
  export: '导出',
  columnSettings: '列设置',
  refresh: '刷新',
  selectionRequired: '请先选择操作对象',
  ariaLabel: '表格工具栏'
}

export const normalizeSelectedCount = (selectedCount?: number) =>
  Number.isFinite(selectedCount) ? Math.max(0, Math.floor(selectedCount ?? 0)) : 0

export const normalizeQuickFilters = (filters: readonly TableToolbarQuickFilter[] = []): TableToolbarQuickFilter[] => {
  const names = new Set<string>()

  return filters.filter((filter) => {
    const name = filter.name.trim()
    if (!name || filter.visible === false || names.has(name)) return false
    names.add(name)
    return true
  })
}

const isPrimitive = (value: unknown) => typeof value === 'string' || typeof value === 'number'

export const normalizeQuickFilterValue = (filter: TableToolbarQuickFilter, value: unknown): unknown => {
  switch (filter.type) {
    case 'search':
      return typeof value === 'string' ? value.trim() : undefined
    case 'select':
    case 'buttonGroup':
      return isPrimitive(value) ? value : undefined
    case 'dateRange':
      return Array.isArray(value) && value.length === 2 && value.every((item) => typeof item === 'string' && item)
        ? [value[0], value[1]]
        : undefined
  }
}

export const isEmptyQuickFilterValue = (value: unknown) =>
  value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)

export const normalizeQuickFilterValues = (
  filters: readonly TableToolbarQuickFilter[],
  values: TableToolbarQuickFilterValues = {}
) => {
  const normalized: TableToolbarQuickFilterValues = {}

  for (const filter of filters) {
    const value = normalizeQuickFilterValue(filter, values[filter.name])
    if (!isEmptyQuickFilterValue(value)) normalized[filter.name] = value
  }

  return normalized
}

export const createInitialQuickFilterValues = (
  filters: readonly TableToolbarQuickFilter[],
  defaultValues: TableToolbarQuickFilterValues = {}
) => {
  const fieldDefaults = Object.fromEntries(
    filters.filter((filter) => filter.defaultValue !== undefined).map((filter) => [filter.name, filter.defaultValue])
  )

  return normalizeQuickFilterValues(filters, { ...fieldDefaults, ...defaultValues })
}

export const applyQuickFilterValue = (
  filters: readonly TableToolbarQuickFilter[],
  values: TableToolbarQuickFilterValues,
  fieldName: string,
  value: unknown
) => {
  const filter = filters.find((item) => item.name === fieldName)
  if (!filter) return { ...values }

  const nextValues = { ...values }
  const normalizedValue = normalizeQuickFilterValue(filter, value)
  if (isEmptyQuickFilterValue(normalizedValue)) delete nextValues[fieldName]
  else nextValues[fieldName] = normalizedValue
  return normalizeQuickFilterValues(filters, nextValues)
}

export const getSearchDraftValues = (
  filters: readonly TableToolbarQuickFilter[],
  values: TableToolbarQuickFilterValues
) =>
  filters.reduce<Record<string, string>>((drafts, filter) => {
    if (filter.type === 'search') {
      const value = values[filter.name]
      drafts[filter.name] = typeof value === 'string' ? value : ''
    }
    return drafts
  }, {})

export const getVisibleActions = (actions: readonly TableToolbarAction[] = []) =>
  actions.filter((action) => action.visible !== false && action.key.trim() && action.label.trim())

export const mergeToolbarActions = (...groups: Array<readonly TableToolbarAction[]>) => {
  const keys = new Set<string>()
  const actions: TableToolbarAction[] = []

  for (const group of groups) {
    for (const action of group) {
      if (keys.has(action.key)) continue
      keys.add(action.key)
      actions.push(action)
    }
  }

  return actions
}

export const getToolbarOverflowActions = (
  operationActions: readonly TableToolbarAction[],
  moreActions: readonly TableToolbarAction[],
  visibleOperationCount: number
) => {
  const visibleCount = Math.max(0, Math.floor(visibleOperationCount))
  const visibleKeys = new Set(operationActions.slice(0, visibleCount).map((action) => action.key))

  return mergeToolbarActions(operationActions.slice(visibleCount), moreActions).filter(
    (action) => !visibleKeys.has(action.key)
  )
}

export const normalizeToolConfig = (
  config: boolean | TableToolbarToolConfig | undefined
): TableToolbarToolConfig | null => {
  if (!config) return null
  if (config === true) return {}
  return config.visible === false ? null : config
}

export const hasVisibleTableTools = (tools?: TableToolbarTools) =>
  Boolean(
    normalizeToolConfig(tools?.export) ||
    normalizeToolConfig(tools?.columnSettings) ||
    normalizeToolConfig(tools?.refresh)
  )
