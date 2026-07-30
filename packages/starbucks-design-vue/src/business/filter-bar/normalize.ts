import type { FilterFieldSchema, FilterValue } from './interface'

export const DEFAULT_FILTER_VALUE_FORMAT = 'YYYY-MM-DD'

export const hasOwn = (value: FilterValue, name: string) =>
  Object.prototype.hasOwnProperty.call(value, name)

export const cloneFilterValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(cloneFilterValue)
  }
  if (value instanceof Date) {
    return new Date(value.getTime())
  }
  if (value && typeof value === 'object') {
    return { ...(value as Record<string, unknown>) }
  }
  return value
}

export const getEmptyValue = (field: FilterFieldSchema): unknown => {
  switch (field.type) {
    case 'input':
      return ''
    case 'multiSelect':
    case 'dateRange':
    case 'cascader':
      return []
    case 'select':
    case 'date':
    case 'treeSelect':
      return undefined
  }
}

export const buildResetBaseline = (
  fields: FilterFieldSchema[],
  defaultValue: FilterValue = {},
): FilterValue => {
  const baseline: FilterValue = {}

  for (const field of fields) {
    baseline[field.name] = getEmptyValue(field)
    if (field.defaultValue !== undefined) {
      baseline[field.name] = cloneFilterValue(field.defaultValue)
    }
    if (hasOwn(defaultValue, field.name)) {
      baseline[field.name] = cloneFilterValue(defaultValue[field.name])
    }
  }

  return baseline
}

const pad2 = (value: number) => String(value).padStart(2, '0')

export const formatDateValue = (
  value: unknown,
  valueFormat = DEFAULT_FILTER_VALUE_FORMAT,
): string | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    if (valueFormat === DEFAULT_FILTER_VALUE_FORMAT) {
      return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`
    }
    return value.toISOString()
  }

  return undefined
}

export const isEmptyFieldValue = (field: FilterFieldSchema, value: unknown): boolean => {
  switch (field.type) {
    case 'input':
      return value === undefined || value === null || value === ''
    case 'select':
    case 'date':
    case 'treeSelect':
      return value === undefined || value === null
    case 'multiSelect':
    case 'cascader':
      return !Array.isArray(value) || value.length === 0
    case 'dateRange':
      return (
        !Array.isArray(value) ||
        value.length !== 2 ||
        !formatDateValue(value[0], field.valueFormat) ||
        !formatDateValue(value[1], field.valueFormat)
      )
  }
}

export const normalizeFieldValue = (
  field: FilterFieldSchema,
  value: unknown,
): unknown | undefined => {
  if (isEmptyFieldValue(field, value)) {
    return undefined
  }

  if (field.type === 'date') {
    return formatDateValue(value, field.valueFormat)
  }

  if (field.type === 'dateRange') {
    const range = value as unknown[]
    return [
      formatDateValue(range[0], field.valueFormat),
      formatDateValue(range[1], field.valueFormat),
    ] as [string, string]
  }

  return value
}

export const normalizeActiveSnapshot = (
  fields: FilterFieldSchema[],
  draftValues: FilterValue,
): FilterValue => {
  const snapshot: FilterValue = {}

  for (const field of fields) {
    if (field.visible === false) {
      continue
    }
    const normalized = normalizeFieldValue(field, draftValues[field.name])
    if (normalized !== undefined) {
      snapshot[field.name] = normalized
    }
  }

  return snapshot
}
