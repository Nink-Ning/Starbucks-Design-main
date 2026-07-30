import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  FilterActionSource,
  FilterBarProps,
  FilterEventMeta,
  FilterFieldSchema,
  FilterValidationError,
  FilterValue,
} from './interface'
import { resolveFilterLayout } from './layout'
import {
  buildResetBaseline,
  cloneFilterValue,
  formatDateValue,
  isEmptyFieldValue,
  normalizeActiveSnapshot,
} from './normalize'
import { validateFilterFields } from './validation'

const DEFAULT_COLUMNS = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }

export const DEFAULT_FILTER_TEXTS = {
  submit: '查询',
  reset: '重置',
  expand: '展开',
  collapse: '收起',
  requiredMessage: '该字段为必填项',
  hiddenActiveSummary: (count: number) => `已生效 ${count} 项隐藏条件`,
}

const cloneValues = (values: FilterValue): FilterValue => cloneFilterValue(values) as FilterValue

const isDevelopment = () =>
  typeof process === 'undefined' || process.env.NODE_ENV !== 'production'

const hasIncompleteDateRange = (fields: FilterFieldSchema[], values: FilterValue) =>
  fields.some((field) => {
    if (field.visible === false || field.type !== 'dateRange') {
      return false
    }
    const value = values[field.name]
    return (
      Array.isArray(value) &&
      value.length > 0 &&
      (value.length !== 2 ||
        !formatDateValue(value[0], field.valueFormat) ||
        !formatDateValue(value[1], field.valueFormat))
    )
  })

export interface UseFilterBarResult {
  fields: FilterFieldSchema[]
  columns: Required<NonNullable<FilterBarProps['columns']>>
  draftValues: FilterValue
  activeValues: FilterValue
  expanded: boolean
  layout: ReturnType<typeof resolveFilterLayout>
  errors: FilterValidationError[]
  errorsByName: Map<string, FilterValidationError>
  texts: Required<NonNullable<FilterBarProps['texts']>>
  showSubmit: boolean
  showReset: boolean
  hiddenActiveSummaryCount: number
  isInteractiveDisabled: boolean
  isFieldDisabled: (field: FilterFieldSchema) => boolean
  registerControlElement: (fieldName: string, element: HTMLElement | null) => void
  getMeta: (source: FilterActionSource, values: FilterValue, activeValues: FilterValue) => FilterEventMeta
  handleFieldChange: (field: FilterFieldSchema, value: unknown) => void
  handleSubmit: () => void
  handleReset: () => void
  handleExpandedChange: (expanded: boolean) => void
}

export const useFilterBar = (props: FilterBarProps): UseFilterBarResult => {
  const fields = props.fields ?? []
  const submitMode = props.submitMode ?? 'manual'
  const debounceMs = props.debounceMs ?? 300
  const submitOnReset = props.submitOnReset ?? true
  const loading = props.loading ?? false
  const disabled = props.disabled ?? false
  const texts = useMemo(
    () => ({ ...DEFAULT_FILTER_TEXTS, ...(props.texts ?? {}) }),
    [props.texts],
  )

  const resetBaselineRef = useRef<FilterValue | null>(null)
  if (resetBaselineRef.current === null) {
    resetBaselineRef.current = buildResetBaseline(fields, props.defaultValue)
  }

  const controlledDraft = props.value !== undefined
  const controlledActive = props.activeValues !== undefined
  const controlledExpanded = props.expanded !== undefined

  const [internalDraft, setInternalDraft] = useState<FilterValue>(() =>
    cloneValues(controlledDraft ? props.value ?? {} : resetBaselineRef.current ?? {}),
  )
  const [internalActive, setInternalActive] = useState<FilterValue>(() => {
    if (controlledActive) {
      return cloneValues(props.activeValues ?? {})
    }
    if (props.defaultActiveValues !== undefined) {
      return cloneValues(props.defaultActiveValues)
    }
    return normalizeActiveSnapshot(fields, resetBaselineRef.current ?? {})
  })
  const [internalExpanded, setInternalExpanded] = useState(props.defaultExpanded ?? false)
  const [errors, setErrors] = useState<FilterValidationError[]>([])

  const draftValues = controlledDraft ? props.value ?? {} : internalDraft
  const activeValues = controlledActive ? props.activeValues ?? {} : internalActive
  const expanded = controlledExpanded ? props.expanded ?? false : internalExpanded
  const columns = { ...DEFAULT_COLUMNS, ...(props.columns ?? {}) }
  const layout = useMemo(
    () =>
      resolveFilterLayout(fields, {
        expanded,
        collapsible: props.collapsible,
        defaultVisibleCount: props.defaultVisibleCount,
      }),
    [expanded, fields, props.collapsible, props.defaultVisibleCount],
  )

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const controlElementsRef = useRef(new Map<string, HTMLElement>())
  const warnedDuplicateNamesRef = useRef('')

  const clearDebounce = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
  }, [])

  const getLayoutForExpanded = useCallback(
    (nextExpanded: boolean) =>
      resolveFilterLayout(fields, {
        expanded: nextExpanded,
        collapsible: props.collapsible,
        defaultVisibleCount: props.defaultVisibleCount,
      }),
    [fields, props.collapsible, props.defaultVisibleCount],
  )

  const getMeta = useCallback(
    (source: FilterActionSource, values: FilterValue, nextActiveValues: FilterValue) => ({
      source,
      draftValues: values,
      activeValues: nextActiveValues,
      eligibleFieldNames: layout.eligibleFieldNames,
      renderedFieldNames: layout.renderedFieldNames,
      collapsedFieldNames: layout.collapsedFieldNames,
    }),
    [layout.collapsedFieldNames, layout.eligibleFieldNames, layout.renderedFieldNames],
  )

  const focusFirstInvalidField = useCallback((nextErrors: FilterValidationError[]) => {
    const firstError = nextErrors[0]
    if (!firstError) {
      return
    }
    controlElementsRef.current.get(firstError.fieldName)?.focus()
  }, [])

  const commitActiveAndSubmit = useCallback(
    (source: Extract<FilterActionSource, 'submit' | 'change' | 'reset'>, values: FilterValue) => {
      const nextErrors = validateFilterFields(fields, values, {
        requiredMessage: texts.requiredMessage,
      })

      if (nextErrors.length > 0) {
        setErrors(nextErrors)
        const meta = getMeta(source, values, activeValues)
        props.onValidateFailed?.(nextErrors, meta)
        focusFirstInvalidField(nextErrors)
        return
      }

      setErrors([])
      const snapshot = normalizeActiveSnapshot(fields, values)
      const meta = getMeta(source, values, snapshot)
      if (!controlledActive) {
        setInternalActive(snapshot)
      }
      props.onActiveValuesChange?.(snapshot, meta)
      props.onSubmit?.(snapshot, meta)
    },
    [
      activeValues,
      controlledActive,
      fields,
      focusFirstInvalidField,
      getMeta,
      props,
      texts.requiredMessage,
    ],
  )

  const handleFieldChange = useCallback(
    (field: FilterFieldSchema, value: unknown) => {
      if (loading || disabled || field.disabled) {
        return
      }

      const nextDraft = { ...draftValues, [field.name]: value }
      const meta: FilterEventMeta = {
        ...getMeta('fieldChange', nextDraft, activeValues),
        fieldName: field.name,
        changedValues: { [field.name]: value },
      }

      if (!controlledDraft) {
        setInternalDraft(nextDraft)
      }
      props.onValuesChange?.(nextDraft, meta)

      if (submitMode !== 'change') {
        return
      }

      clearDebounce()
      if (hasIncompleteDateRange(fields, nextDraft)) {
        return
      }

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null
        if (props.loading || props.disabled) {
          return
        }
        commitActiveAndSubmit('change', nextDraft)
      }, debounceMs)
    },
    [
      activeValues,
      clearDebounce,
      commitActiveAndSubmit,
      controlledDraft,
      debounceMs,
      disabled,
      draftValues,
      fields,
      getMeta,
      loading,
      props,
      submitMode,
    ],
  )

  const handleSubmit = useCallback(() => {
    if (loading || disabled) {
      return
    }
    commitActiveAndSubmit('submit', draftValues)
  }, [commitActiveAndSubmit, disabled, draftValues, loading])

  const handleReset = useCallback(() => {
    if (loading || disabled) {
      return
    }

    clearDebounce()
    const resetDraft = cloneValues(resetBaselineRef.current ?? {})
    const resetMeta = getMeta('reset', resetDraft, activeValues)

    if (!controlledDraft) {
      setInternalDraft(resetDraft)
    }
    setErrors([])
    props.onValuesChange?.(resetDraft, resetMeta)
    props.onReset?.(resetDraft, resetMeta)

    if (!submitOnReset) {
      return
    }

    commitActiveAndSubmit('reset', resetDraft)
  }, [
    activeValues,
    clearDebounce,
    commitActiveAndSubmit,
    controlledDraft,
    disabled,
    getMeta,
    loading,
    props,
    submitOnReset,
  ])

  const handleExpandedChange = useCallback(
    (nextExpanded: boolean) => {
      if (disabled) {
        return
      }
      const nextLayout = getLayoutForExpanded(nextExpanded)
      const meta: FilterEventMeta = {
        source: nextExpanded ? 'expand' : 'collapse',
        draftValues,
        activeValues,
        eligibleFieldNames: nextLayout.eligibleFieldNames,
        renderedFieldNames: nextLayout.renderedFieldNames,
        collapsedFieldNames: nextLayout.collapsedFieldNames,
      }

      if (!controlledExpanded) {
        setInternalExpanded(nextExpanded)
      }
      props.onExpandedChange?.(nextExpanded, meta)
    },
    [activeValues, controlledExpanded, disabled, draftValues, getLayoutForExpanded, props],
  )

  useEffect(() => {
    if (loading) {
      clearDebounce()
    }
  }, [clearDebounce, loading])

  useEffect(() => clearDebounce, [clearDebounce])

  useEffect(() => {
    if (!isDevelopment()) {
      return
    }
    const names = fields.map((field) => field.name)
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
    const deduped = Array.from(new Set(duplicates)).join(', ')
    if (deduped && warnedDuplicateNamesRef.current !== deduped) {
      warnedDuplicateNamesRef.current = deduped
      console.warn(`[FilterBar] fields.name must be unique. Duplicate name(s): ${deduped}`)
    }
  }, [fields])

  const errorsByName = useMemo(
    () => new Map(errors.map((error) => [error.fieldName, error])),
    [errors],
  )
  const hiddenActiveSummaryCount = useMemo(
    () =>
      layout.collapsedFieldNames.reduce((count, fieldName) => {
        const field = layout.collapsedFields.find((candidate) => candidate.name === fieldName)
        if (!field || isEmptyFieldValue(field, activeValues[fieldName])) {
          return count
        }
        return count + 1
      }, 0),
    [activeValues, layout.collapsedFieldNames, layout.collapsedFields],
  )

  const showSubmit =
    props.showSubmit === undefined ? submitMode === 'manual' : props.showSubmit
  const showReset = props.showReset ?? true
  const isInteractiveDisabled = loading || disabled

  return {
    fields,
    columns,
    draftValues,
    activeValues,
    expanded,
    layout,
    errors,
    errorsByName,
    texts,
    showSubmit,
    showReset,
    hiddenActiveSummaryCount,
    isInteractiveDisabled,
    isFieldDisabled: (field) => isInteractiveDisabled || field.disabled === true,
    registerControlElement: (fieldName, element) => {
      if (element) {
        controlElementsRef.current.set(fieldName, element)
      } else {
        controlElementsRef.current.delete(fieldName)
      }
    },
    getMeta,
    handleFieldChange,
    handleSubmit,
    handleReset,
    handleExpandedChange,
  }
}
