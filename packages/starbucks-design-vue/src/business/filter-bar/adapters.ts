import {
  Cascader,
  DatePicker,
  Input,
  RangePicker,
  Select,
  TreeSelect,
} from '@arco-design/web-vue'
import type { Component } from 'vue'
import type { FilterFieldSchema, FilterRenderFieldContext } from './interface'
import { DEFAULT_FILTER_VALUE_FORMAT } from './normalize'

export interface FilterFieldAdapter {
  component: Component
  props: Record<string, unknown>
  events: Record<string, (...args: unknown[]) => void>
}

export interface GetFilterFieldAdapterOptions {
  field: FilterFieldSchema
  value: unknown
  disabled: boolean
  error?: FilterRenderFieldContext['error']
  controlId: string
  describedBy?: string
  onChange: (value: unknown) => void
}

const commonProps = (
  controlId: string,
  describedBy: string | undefined,
  error: FilterRenderFieldContext['error'],
) => ({
  id: controlId,
  'aria-describedby': describedBy,
  'aria-invalid': error ? true : undefined,
})

const treeDataWithKeys = (
  treeData: Extract<FilterFieldSchema, { type: 'treeSelect' }>['treeData'],
): Array<Record<string, unknown>> =>
  treeData.map((node) => ({
    ...node,
    key: node.value,
    children: node.children ? treeDataWithKeys(node.children) : undefined,
  }))

export const getFilterFieldAdapter = ({
  field,
  value,
  disabled,
  error,
  controlId,
  describedBy,
  onChange,
}: GetFilterFieldAdapterOptions): FilterFieldAdapter => {
  const ariaProps = commonProps(controlId, describedBy, error)
  const errorProp = Boolean(error)

  switch (field.type) {
    case 'input':
      return {
        component: Input,
        props: {
          ...ariaProps,
          modelValue: typeof value === 'string' ? value : '',
          placeholder: field.placeholder,
          allowClear: field.allowClear,
          maxLength: field.maxLength,
          disabled,
          error: errorProp,
        },
        events: {
          'update:modelValue': onChange,
        },
      }
    case 'select':
      return {
        component: Select,
        props: {
          ...ariaProps,
          modelValue: value,
          options: field.options,
          placeholder: field.placeholder,
          allowClear: field.allowClear,
          loading: field.loading,
          disabled,
          error: errorProp,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
    case 'multiSelect':
      return {
        component: Select,
        props: {
          ...ariaProps,
          modelValue: Array.isArray(value) ? value : [],
          multiple: true,
          options: field.options,
          placeholder: field.placeholder,
          allowClear: field.allowClear,
          loading: field.loading,
          disabled,
          error: errorProp,
          maxTagCount: field.maxTagCount,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
    case 'date':
      return {
        component: DatePicker,
        props: {
          ...ariaProps,
          modelValue: typeof value === 'string' ? value : undefined,
          placeholder: field.placeholder,
          format: field.format,
          valueFormat: field.valueFormat ?? DEFAULT_FILTER_VALUE_FORMAT,
          allowClear: field.allowClear,
          disabled,
          error: errorProp,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
    case 'dateRange':
      return {
        component: RangePicker,
        props: {
          ...ariaProps,
          modelValue: Array.isArray(value) ? value : undefined,
          placeholder: Array.isArray(field.placeholder) ? field.placeholder : undefined,
          format: field.format,
          valueFormat: field.valueFormat ?? DEFAULT_FILTER_VALUE_FORMAT,
          allowClear: field.allowClear,
          disabled,
          error: errorProp,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
    case 'cascader':
      return {
        component: Cascader,
        props: {
          ...ariaProps,
          modelValue: Array.isArray(value) ? value : undefined,
          options: field.options,
          placeholder: field.placeholder,
          allowClear: field.allowClear,
          loading: field.loading,
          disabled,
          error: errorProp,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
    case 'treeSelect':
      return {
        component: TreeSelect,
        props: {
          ...ariaProps,
          modelValue: typeof value === 'string' || Array.isArray(value) ? value : undefined,
          data: treeDataWithKeys(field.treeData),
          placeholder: field.placeholder,
          allowClear: field.allowClear,
          loading: field.loading,
          disabled,
          error: errorProp,
          popupContainer: 'body',
        },
        events: {
          'update:modelValue': onChange,
          change: onChange,
        },
      }
  }
}
