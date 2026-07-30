import type { ReactNode } from 'react'
import { Cascader, DatePicker, Input, Select, TreeSelect } from '@arco-design/web-react'
import type { FilterFieldSchema, FilterRenderFieldContext } from './interface'
import { DEFAULT_FILTER_VALUE_FORMAT } from './normalize'

const { RangePicker } = DatePicker

const getBodyPopupContainer = () => document.body

export interface RenderFilterFieldControlOptions {
  field: FilterFieldSchema
  value: unknown
  disabled: boolean
  error?: FilterRenderFieldContext['error']
  controlId: string
  describedBy?: string
  renderField?: (context: FilterRenderFieldContext) => ReactNode
  onChange: (value: unknown) => void
}

const commonAriaProps = (
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

export const renderFilterFieldControl = ({
  field,
  value,
  disabled,
  error,
  controlId,
  describedBy,
  renderField,
  onChange,
}: RenderFilterFieldControlOptions) => {
  if (renderField) {
    return renderField({
      field,
      value,
      disabled,
      error,
      controlId,
      onChange,
    })
  }

  const ariaProps = commonAriaProps(controlId, describedBy, error)
  const status = error ? 'error' : undefined

  switch (field.type) {
    case 'input':
      return (
        <Input
          {...ariaProps}
          value={typeof value === 'string' ? value : ''}
          placeholder={field.placeholder}
          allowClear={field.allowClear}
          maxLength={field.maxLength}
          disabled={disabled}
          status={status}
          onChange={onChange}
        />
      )
    case 'select':
      return (
        <Select
          {...ariaProps}
          value={value as string | number | undefined}
          options={field.options}
          placeholder={field.placeholder}
          allowClear={field.allowClear}
          loading={field.loading}
          disabled={disabled}
          status={status}
          dropdownMenuClassName="sbux-filter-bar__popup sbux-filter-bar__select-popup"
          onChange={onChange}
        />
      )
    case 'multiSelect':
      return (
        <Select
          {...ariaProps}
          mode="multiple"
          value={Array.isArray(value) ? (value as string[] | number[]) : []}
          options={field.options}
          placeholder={field.placeholder}
          allowClear={field.allowClear}
          loading={field.loading}
          disabled={disabled}
          status={status}
          maxTagCount={field.maxTagCount}
          dropdownMenuClassName="sbux-filter-bar__popup sbux-filter-bar__select-popup"
          onChange={onChange}
        />
      )
    case 'date':
      return (
        <DatePicker
          {...ariaProps}
          value={typeof value === 'string' ? value : undefined}
          placeholder={field.placeholder}
          format={field.format ?? field.valueFormat ?? DEFAULT_FILTER_VALUE_FORMAT}
          allowClear={field.allowClear}
          disabled={disabled}
          status={status}
          onChange={(dateString) => onChange(dateString || undefined)}
        />
      )
    case 'dateRange':
      return (
        <RangePicker
          {...ariaProps}
          value={Array.isArray(value) ? (value as string[]) : undefined}
          placeholder={Array.isArray(field.placeholder) ? field.placeholder : undefined}
          format={field.format ?? field.valueFormat ?? DEFAULT_FILTER_VALUE_FORMAT}
          allowClear={field.allowClear}
          disabled={disabled}
          status={status}
          getPopupContainer={getBodyPopupContainer}
          onChange={(dateString) => onChange(dateString)}
        />
      )
    case 'cascader':
      return (
        <Cascader
          {...ariaProps}
          value={Array.isArray(value) ? (value as string[]) : undefined}
          options={field.options}
          placeholder={field.placeholder}
          allowClear={field.allowClear}
          loading={field.loading}
          disabled={disabled}
          status={status}
          dropdownMenuClassName="sbux-filter-bar__popup sbux-filter-bar__cascader-popup"
          onChange={onChange}
        />
      )
    case 'treeSelect':
      return (
        <TreeSelect
          {...ariaProps}
          value={typeof value === 'string' || Array.isArray(value) ? (value as string | string[]) : undefined}
          treeData={treeDataWithKeys(field.treeData)}
          placeholder={field.placeholder}
          allowClear={field.allowClear}
          loading={field.loading}
          disabled={disabled}
          status={status}
          onChange={onChange}
        />
      )
  }
}
