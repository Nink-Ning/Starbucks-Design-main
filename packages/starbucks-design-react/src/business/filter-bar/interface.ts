import type { CSSProperties, ReactNode } from 'react'

export type FilterPrimitiveValue = string | number

export type FilterValue = Record<string, unknown>

export interface FilterOption {
  label: string
  value: FilterPrimitiveValue
  disabled?: boolean
}

export interface CascaderOption extends FilterOption {
  children?: CascaderOption[]
  isLeaf?: boolean
}

export interface TreeSelectOption {
  title: string
  value: string
  disabled?: boolean
  children?: TreeSelectOption[]
  isLeaf?: boolean
}

export type FilterActionSource =
  | 'fieldChange'
  | 'submit'
  | 'change'
  | 'reset'
  | 'expand'
  | 'collapse'

export interface FilterEventMeta {
  source: FilterActionSource
  fieldName?: string
  changedValues?: Partial<FilterValue>
  draftValues: FilterValue
  activeValues: FilterValue
  eligibleFieldNames: string[]
  renderedFieldNames: string[]
  collapsedFieldNames: string[]
}

export interface FilterValidationError {
  fieldName: string
  message: string
  ruleIndex: number
}

export type FilterRule =
  | {
      required: true
      message?: string
    }
  | {
      validator: (value: unknown, field: FilterFieldSchema) => string | void
    }

export interface FilterTexts {
  submit?: string
  reset?: string
  expand?: string
  collapse?: string
  requiredMessage?: string
  hiddenActiveSummary?: (count: number) => string
}

export type FilterSubmitMode = 'manual' | 'change'

export interface FilterFieldBase {
  name: string
  label: string
  priority?: number
  span?: number
  visible?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue?: unknown
  help?: string
  rules?: FilterRule[]
}

export interface InputFilterField extends FilterFieldBase {
  type: 'input'
  placeholder?: string
  allowClear?: boolean
  maxLength?: number
}

export interface SelectFilterField extends FilterFieldBase {
  type: 'select'
  options: FilterOption[]
  placeholder?: string
  allowClear?: boolean
  loading?: boolean
}

export interface MultiSelectFilterField extends FilterFieldBase {
  type: 'multiSelect'
  options: FilterOption[]
  placeholder?: string
  allowClear?: boolean
  loading?: boolean
  maxTagCount?: number
}

export interface DateFilterField extends FilterFieldBase {
  type: 'date'
  placeholder?: string
  format?: string
  valueFormat?: string
  allowClear?: boolean
}

export interface DateRangeFilterField extends FilterFieldBase {
  type: 'dateRange'
  placeholder?: [string, string] | string
  format?: string
  valueFormat?: string
  allowClear?: boolean
}

export interface CascaderFilterField extends FilterFieldBase {
  type: 'cascader'
  options: CascaderOption[]
  placeholder?: string
  allowClear?: boolean
  loading?: boolean
}

export interface TreeSelectFilterField extends FilterFieldBase {
  type: 'treeSelect'
  treeData: TreeSelectOption[]
  placeholder?: string
  allowClear?: boolean
  loading?: boolean
}

export type FilterFieldSchema =
  | InputFilterField
  | SelectFilterField
  | MultiSelectFilterField
  | DateFilterField
  | DateRangeFilterField
  | CascaderFilterField
  | TreeSelectFilterField

export interface FilterRenderFieldContext {
  field: FilterFieldSchema
  value: unknown
  disabled: boolean
  error?: FilterValidationError
  controlId: string
  onChange: (value: unknown) => void
}

export interface FilterBarColumns {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface FilterBarProps {
  fields?: FilterFieldSchema[]
  value?: FilterValue
  defaultValue?: FilterValue
  activeValues?: FilterValue
  defaultActiveValues?: FilterValue
  columns?: FilterBarColumns
  defaultVisibleCount?: number
  collapsible?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  submitMode?: FilterSubmitMode
  debounceMs?: number
  submitOnReset?: boolean
  loading?: boolean
  disabled?: boolean
  showSubmit?: boolean
  showReset?: boolean
  texts?: FilterTexts
  className?: string
  style?: CSSProperties
  renderField?: (context: FilterRenderFieldContext) => ReactNode
  onValuesChange?: (values: FilterValue, meta: FilterEventMeta) => void
  onActiveValuesChange?: (activeValues: FilterValue, meta: FilterEventMeta) => void
  onSubmit?: (activeSnapshot: FilterValue, meta: FilterEventMeta) => void
  onReset?: (values: FilterValue, meta: FilterEventMeta) => void
  onExpandedChange?: (expanded: boolean, meta: FilterEventMeta) => void
  onValidateFailed?: (errors: FilterValidationError[], meta: FilterEventMeta) => void
}
