import { computed, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import type {
  FilterActionSource,
  FilterBarEmits,
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

export type FilterBarEmit = <K extends keyof FilterBarEmits>(
  event: K,
  ...args: FilterBarEmits[K]
) => void

export const useFilterBar = (props: FilterBarProps, emit: FilterBarEmit) => {
  const fields = computed(() => props.fields ?? [])
  const resetBaseline = ref(
    buildResetBaseline(fields.value, props.defaultValue),
  ) as Ref<FilterValue>
  const internalDraft = ref<FilterValue>(
    cloneValues(props.modelValue !== undefined ? props.modelValue : resetBaseline.value),
  )
  const internalActive = ref<FilterValue>(
    props.activeValues !== undefined
      ? cloneValues(props.activeValues)
      : props.defaultActiveValues !== undefined
        ? cloneValues(props.defaultActiveValues)
        : normalizeActiveSnapshot(fields.value, resetBaseline.value),
  )
  const internalExpanded = ref(props.defaultExpanded ?? false)
  const errors = ref<FilterValidationError[]>([])
  const warnedDuplicateNames = ref('')
  const controlElements = new Map<string, HTMLElement>()
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const submitMode = computed(() => props.submitMode ?? 'manual')
  const debounceMs = computed(() => props.debounceMs ?? 300)
  const submitOnReset = computed(() => props.submitOnReset ?? true)
  const loading = computed(() => props.loading ?? false)
  const disabled = computed(() => props.disabled ?? false)
  const draftValues = computed(() => props.modelValue ?? internalDraft.value)
  const activeValues = computed(() => props.activeValues ?? internalActive.value)
  const expanded = computed(() => props.expanded ?? internalExpanded.value)
  const columns = computed(() => ({ ...DEFAULT_COLUMNS, ...(props.columns ?? {}) }))
  const texts = computed(() => ({ ...DEFAULT_FILTER_TEXTS, ...(props.texts ?? {}) }))
  const layout = computed(() =>
    resolveFilterLayout(fields.value, {
      expanded: expanded.value,
      collapsible: props.collapsible,
      defaultVisibleCount: props.defaultVisibleCount,
    }),
  )
  const errorsByName = computed(
    () => new Map(errors.value.map((error) => [error.fieldName, error])),
  )
  const hiddenActiveSummaryCount = computed(() =>
    layout.value.collapsedFieldNames.reduce((count, fieldName) => {
      const field = layout.value.collapsedFields.find((candidate) => candidate.name === fieldName)
      if (!field || isEmptyFieldValue(field, activeValues.value[fieldName])) {
        return count
      }
      return count + 1
    }, 0),
  )
  const showSubmit = computed(() =>
    props.showSubmit === undefined ? submitMode.value === 'manual' : props.showSubmit,
  )
  const showReset = computed(() => props.showReset ?? true)
  const isInteractiveDisabled = computed(() => loading.value || disabled.value)

  const clearDebounce = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  }

  const getLayoutForExpanded = (nextExpanded: boolean) =>
    resolveFilterLayout(fields.value, {
      expanded: nextExpanded,
      collapsible: props.collapsible,
      defaultVisibleCount: props.defaultVisibleCount,
    })

  const getMeta = (
    source: FilterActionSource,
    values: FilterValue,
    nextActiveValues: FilterValue,
  ): FilterEventMeta => ({
    source,
    draftValues: values,
    activeValues: nextActiveValues,
    eligibleFieldNames: layout.value.eligibleFieldNames,
    renderedFieldNames: layout.value.renderedFieldNames,
    collapsedFieldNames: layout.value.collapsedFieldNames,
  })

  const focusFirstInvalidField = (nextErrors: FilterValidationError[]) => {
    const firstError = nextErrors[0]
    if (!firstError) {
      return
    }
    controlElements.get(firstError.fieldName)?.focus()
  }

  const commitActiveAndSubmit = (
    source: Extract<FilterActionSource, 'submit' | 'change' | 'reset'>,
    values: FilterValue,
  ) => {
    const nextErrors = validateFilterFields(fields.value, values, {
      requiredMessage: texts.value.requiredMessage,
    })

    if (nextErrors.length > 0) {
      errors.value = nextErrors
      emit('validateFailed', nextErrors, getMeta(source, values, activeValues.value))
      focusFirstInvalidField(nextErrors)
      return
    }

    errors.value = []
    const snapshot = normalizeActiveSnapshot(fields.value, values)
    const meta = getMeta(source, values, snapshot)
    if (props.activeValues === undefined) {
      internalActive.value = snapshot
    }
    emit('update:activeValues', snapshot)
    emit('submit', snapshot, meta)
  }

  const handleFieldChange = (field: FilterFieldSchema, value: unknown) => {
    if (loading.value || disabled.value || field.disabled) {
      return
    }

    const nextDraft = { ...draftValues.value, [field.name]: value }
    const meta: FilterEventMeta = {
      ...getMeta('fieldChange', nextDraft, activeValues.value),
      fieldName: field.name,
      changedValues: { [field.name]: value },
    }

    if (props.modelValue === undefined) {
      internalDraft.value = nextDraft
    }
    emit('update:modelValue', nextDraft)
    emit('valuesChange', nextDraft, meta)

    if (submitMode.value !== 'change') {
      return
    }

    clearDebounce()
    if (hasIncompleteDateRange(fields.value, nextDraft)) {
      return
    }

    debounceTimer = setTimeout(() => {
      debounceTimer = null
      if (props.loading || props.disabled) {
        return
      }
      commitActiveAndSubmit('change', nextDraft)
    }, debounceMs.value)
  }

  const handleSubmit = () => {
    if (loading.value || disabled.value) {
      return
    }
    commitActiveAndSubmit('submit', draftValues.value)
  }

  const handleReset = () => {
    if (loading.value || disabled.value) {
      return
    }

    clearDebounce()
    const resetDraft = cloneValues(resetBaseline.value)
    const resetMeta = getMeta('reset', resetDraft, activeValues.value)

    if (props.modelValue === undefined) {
      internalDraft.value = resetDraft
    }
    errors.value = []
    emit('update:modelValue', resetDraft)
    emit('valuesChange', resetDraft, resetMeta)
    emit('reset', resetDraft, resetMeta)

    if (!submitOnReset.value) {
      return
    }

    commitActiveAndSubmit('reset', resetDraft)
  }

  const handleExpandedChange = (nextExpanded: boolean) => {
    if (disabled.value) {
      return
    }

    const nextLayout = getLayoutForExpanded(nextExpanded)
    const meta: FilterEventMeta = {
      source: nextExpanded ? 'expand' : 'collapse',
      draftValues: draftValues.value,
      activeValues: activeValues.value,
      eligibleFieldNames: nextLayout.eligibleFieldNames,
      renderedFieldNames: nextLayout.renderedFieldNames,
      collapsedFieldNames: nextLayout.collapsedFieldNames,
    }

    if (props.expanded === undefined) {
      internalExpanded.value = nextExpanded
    }
    emit('update:expanded', nextExpanded)
    emit('expandedChange', nextExpanded, meta)
  }

  watch(loading, (nextLoading) => {
    if (nextLoading) {
      clearDebounce()
    }
  })

  watch(
    fields,
    (nextFields) => {
      if (!isDevelopment()) {
        return
      }
      const names = nextFields.map((field) => field.name)
      const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
      const deduped = Array.from(new Set(duplicates)).join(', ')
      if (deduped && warnedDuplicateNames.value !== deduped) {
        warnedDuplicateNames.value = deduped
        console.warn(`[FilterBar] fields.name must be unique. Duplicate name(s): ${deduped}`)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(clearDebounce)

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
    isFieldDisabled: (field: FilterFieldSchema) => isInteractiveDisabled.value || field.disabled === true,
    registerControlElement: (fieldName: string, element: HTMLElement | null) => {
      if (element) {
        controlElements.set(fieldName, element)
      } else {
        controlElements.delete(fieldName)
      }
    },
    getMeta,
    handleFieldChange,
    handleSubmit,
    handleReset,
    handleExpandedChange,
  }
}
