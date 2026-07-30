import type { FilterBarColumns, FilterFieldSchema, FilterValue } from './interface'
import { isEmptyFieldValue } from './normalize'

export interface ResolveFilterLayoutOptions {
  expanded: boolean
  collapsible?: boolean
  defaultVisibleCount?: number
}

export interface FilterLayoutState {
  eligibleFields: FilterFieldSchema[]
  renderedFields: FilterFieldSchema[]
  collapsedFields: FilterFieldSchema[]
  eligibleFieldNames: string[]
  renderedFieldNames: string[]
  collapsedFieldNames: string[]
  collapsible: boolean
}

export const DEFAULT_VISIBLE_COUNT = 4

export const getEligibleFields = (fields: FilterFieldSchema[]) =>
  fields.filter((field) => field.visible !== false)

export const getDuplicateFieldNames = (fields: FilterFieldSchema[]): string[] => {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const field of fields) {
    if (seen.has(field.name)) {
      duplicates.add(field.name)
    }
    seen.add(field.name)
  }

  return Array.from(duplicates)
}

export const warnDuplicateFieldNames = (
  fields: FilterFieldSchema[],
  warn: (message: string) => void = console.warn,
) => {
  const duplicates = getDuplicateFieldNames(fields)
  if (duplicates.length > 0) {
    warn(`[FilterBar] fields.name must be unique. Duplicate name(s): ${duplicates.join(', ')}`)
  }
}

export const resolveFilterLayout = (
  fields: FilterFieldSchema[],
  options: ResolveFilterLayoutOptions,
): FilterLayoutState => {
  const defaultVisibleCount = options.defaultVisibleCount ?? DEFAULT_VISIBLE_COUNT
  const eligibleFields = getEligibleFields(fields)
  const resolvedCollapsible =
    options.collapsible === undefined
      ? eligibleFields.length > defaultVisibleCount
      : options.collapsible

  if (options.expanded || !resolvedCollapsible) {
    return {
      eligibleFields,
      renderedFields: eligibleFields,
      collapsedFields: [],
      eligibleFieldNames: eligibleFields.map((field) => field.name),
      renderedFieldNames: eligibleFields.map((field) => field.name),
      collapsedFieldNames: [],
      collapsible: resolvedCollapsible,
    }
  }

  const selected = new Set(
    eligibleFields
      .map((field, index) => ({ field, index }))
      .sort((a, b) => {
        const priorityA = a.field.priority ?? Number.MAX_SAFE_INTEGER
        const priorityB = b.field.priority ?? Number.MAX_SAFE_INTEGER
        return priorityA === priorityB ? a.index - b.index : priorityA - priorityB
      })
      .slice(0, defaultVisibleCount)
      .map(({ field }) => field.name),
  )
  const renderedFields = eligibleFields.filter((field) => selected.has(field.name))
  const collapsedFields = eligibleFields.filter((field) => !selected.has(field.name))

  return {
    eligibleFields,
    renderedFields,
    collapsedFields,
    eligibleFieldNames: eligibleFields.map((field) => field.name),
    renderedFieldNames: renderedFields.map((field) => field.name),
    collapsedFieldNames: collapsedFields.map((field) => field.name),
    collapsible: resolvedCollapsible,
  }
}

export const clampFieldSpan = (span: number | undefined, columns: number) => {
  const safeColumns = Math.max(1, Math.trunc(columns))
  const safeSpan = Math.max(1, Math.trunc(span ?? 1))
  return Math.min(safeSpan, safeColumns)
}

export const resolveResponsiveFieldSpans = (
  span: number | undefined,
  columns: Required<FilterBarColumns>,
) => ({
  xs: clampFieldSpan(span, columns.xs),
  sm: clampFieldSpan(span, columns.sm),
  md: clampFieldSpan(span, columns.md),
  lg: clampFieldSpan(span, columns.lg),
  xl: clampFieldSpan(span, columns.xl),
  xxl: clampFieldSpan(span, columns.xxl),
})

export const getHiddenActiveSummaryCount = (
  fields: FilterFieldSchema[],
  activeSnapshot: FilterValue,
  collapsedFieldNames: string[],
) => {
  const fieldsByName = new Map(fields.map((field) => [field.name, field]))
  let count = 0

  for (const fieldName of collapsedFieldNames) {
    const field = fieldsByName.get(fieldName)
    if (!field || field.visible === false) {
      continue
    }
    if (!isEmptyFieldValue(field, activeSnapshot[fieldName])) {
      count += 1
    }
  }

  return count
}
