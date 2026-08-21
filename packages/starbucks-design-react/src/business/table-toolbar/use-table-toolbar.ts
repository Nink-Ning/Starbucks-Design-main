import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  TableToolbarProps,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterEventMeta,
  TableToolbarQuickFilterSource
} from './interface'
import {
  DEFAULT_TABLE_TOOLBAR_TEXTS,
  applyQuickFilterValue,
  createInitialQuickFilterValues,
  getSearchDraftValues,
  getVisibleActions,
  hasVisibleTableTools,
  normalizeQuickFilterValues,
  normalizeQuickFilters,
  normalizeSelectedCount
} from './normalize'

export const useTableToolbar = (props: TableToolbarProps) => {
  const quickFilters = useMemo(() => normalizeQuickFilters(props.quickFilters), [props.quickFilters])
  const quickFilterKey = quickFilters.map((filter) => `${filter.name}:${filter.type}`).join('|')
  const isControlled = props.quickFilterValues !== undefined
  const [uncontrolledValues, setUncontrolledValues] = useState(() =>
    createInitialQuickFilterValues(quickFilters, props.defaultQuickFilterValues)
  )
  const committedValues = useMemo(
    () => normalizeQuickFilterValues(quickFilters, isControlled ? props.quickFilterValues : uncontrolledValues),
    [isControlled, props.quickFilterValues, quickFilters, uncontrolledValues]
  )
  const [searchDrafts, setSearchDrafts] = useState<Record<string, string>>(() =>
    getSearchDraftValues(quickFilters, committedValues)
  )
  const controlledSearchSignature = JSON.stringify(getSearchDraftValues(quickFilters, committedValues))

  useEffect(() => {
    if (!isControlled) {
      setUncontrolledValues((values) => normalizeQuickFilterValues(quickFilters, values))
    }
  }, [isControlled, quickFilterKey, quickFilters])

  useEffect(() => {
    setSearchDrafts(getSearchDraftValues(quickFilters, committedValues))
  }, [controlledSearchSignature, quickFilterKey])

  const emitQuickFilterChange = useCallback(
    (field: TableToolbarQuickFilter, value: unknown, source: TableToolbarQuickFilterSource) => {
      const nextValues = applyQuickFilterValue(quickFilters, committedValues, field.name, value)
      if (!isControlled) setUncontrolledValues(nextValues)

      const meta: TableToolbarQuickFilterEventMeta = {
        source,
        fieldName: field.name,
        changedValues: { [field.name]: nextValues[field.name] },
        values: nextValues
      }
      props.onQuickFilterChange?.(nextValues, meta)
      return { nextValues, meta }
    },
    [committedValues, isControlled, props, quickFilters]
  )

  const handleImmediateFilterChange = useCallback(
    (field: TableToolbarQuickFilter, value: unknown) => {
      const source: TableToolbarQuickFilterSource =
        field.type === 'select'
          ? 'selectChange'
          : field.type === 'buttonGroup'
            ? 'buttonGroupChange'
            : 'dateRangeChange'
      emitQuickFilterChange(field, value, source)
    },
    [emitQuickFilterChange]
  )

  const handleSearchInput = useCallback(
    (field: TableToolbarQuickFilter, value: string) => {
      if (field.type !== 'search') return
      setSearchDrafts((drafts) => ({ ...drafts, [field.name]: value }))

      if (value === '') {
        const result = emitQuickFilterChange(field, '', 'searchClear')
        props.onSearchSubmit?.('', result.nextValues, result.meta)
      }
    },
    [emitQuickFilterChange, props]
  )

  const handleSearchSubmit = useCallback(
    (field: TableToolbarQuickFilter, event?: { isComposing?: boolean; nativeEvent?: { isComposing?: boolean } }) => {
      if (field.type !== 'search' || event?.isComposing || event?.nativeEvent?.isComposing) return
      const keyword = (searchDrafts[field.name] ?? '').trim()
      setSearchDrafts((drafts) => ({ ...drafts, [field.name]: keyword }))
      const result = emitQuickFilterChange(field, keyword, 'searchSubmit')
      props.onSearchSubmit?.(keyword, result.nextValues, result.meta)
    },
    [emitQuickFilterChange, props, searchDrafts]
  )

  const selectedCount = normalizeSelectedCount(props.selectedCount)
  const operationActions = getVisibleActions(props.operationActions)
  const moreActions = getVisibleActions(props.moreActions)
  const texts = { ...DEFAULT_TABLE_TOOLBAR_TEXTS, ...props.texts }

  return {
    quickFilters,
    committedValues,
    searchDrafts,
    selectedCount,
    operationActions,
    moreActions,
    texts,
    hasTableTools: hasVisibleTableTools(props.tableTools),
    hasContent:
      selectedCount > 0 ||
      operationActions.length > 0 ||
      moreActions.length > 0 ||
      quickFilters.length > 0 ||
      hasVisibleTableTools(props.tableTools),
    handleImmediateFilterChange,
    handleSearchInput,
    handleSearchSubmit
  }
}
