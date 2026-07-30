import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FilterBar } from '../FilterBar'
import { renderFilterFieldControl } from '../adapters'
import type { FilterFieldSchema, FilterValue } from '../interface'

const options = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
]

const baseFields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: 'Keyword', defaultValue: 'coffee' },
  { type: 'select', name: 'status', label: 'Status', options, priority: 1 },
  { type: 'multiSelect', name: 'tags', label: 'Tags', options },
  { type: 'date', name: 'createdAt', label: 'Created At' },
  { type: 'dateRange', name: 'period', label: 'Period' },
  {
    type: 'cascader',
    name: 'region',
    label: 'Region',
    options: [{ label: 'East', value: 'east' }],
  },
]

const input = (label: string) => screen.getByLabelText(new RegExp(label)) as HTMLInputElement

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('React FilterBar', () => {
  it('handles manual uncontrolled field change without submitting', () => {
    const onValuesChange = vi.fn()
    const onSubmit = vi.fn()

    render(<FilterBar fields={baseFields.slice(0, 1)} onValuesChange={onValuesChange} onSubmit={onSubmit} />)

    fireEvent.change(input('Keyword'), { target: { value: 'latte' } })

    expect(onValuesChange).toHaveBeenCalledWith(
      { keyword: 'latte' },
      expect.objectContaining({
        source: 'fieldChange',
        fieldName: 'keyword',
        changedValues: { keyword: 'latte' },
        activeValues: { keyword: 'coffee' },
      }),
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits manual queries with the computed active snapshot', () => {
    const events: string[] = []
    const onActiveValuesChange = vi.fn(() => events.push('active'))
    const onSubmit = vi.fn(() => events.push('submit'))

    render(
      <FilterBar
        fields={baseFields.slice(0, 2)}
        defaultValue={{ keyword: 'latte', status: 'open' }}
        onActiveValuesChange={onActiveValuesChange}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '查询' }))

    expect(events).toEqual(['active', 'submit'])
    expect(onSubmit).toHaveBeenCalledWith(
      { keyword: 'latte', status: 'open' },
      expect.objectContaining({ source: 'submit', activeValues: { keyword: 'latte', status: 'open' } }),
    )
  })

  it('respects controlled draft values', () => {
    const onValuesChange = vi.fn()

    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        value={{ keyword: 'controlled' }}
        onValuesChange={onValuesChange}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'next' } })

    expect(input('Keyword').value).toBe('controlled')
    expect(onValuesChange).toHaveBeenCalledWith(
      { keyword: 'next' },
      expect.objectContaining({ source: 'fieldChange' }),
    )
  })

  it('respects controlled active values while submitting snapshot', () => {
    const onActiveValuesChange = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        defaultValue={{ keyword: 'next' }}
        activeValues={{ keyword: 'old' }}
        onActiveValuesChange={onActiveValuesChange}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '查询' }))

    expect(onActiveValuesChange).toHaveBeenCalledWith(
      { keyword: 'next' },
      expect.objectContaining({ source: 'submit' }),
    )
    expect(onSubmit).toHaveBeenCalledWith(
      { keyword: 'next' },
      expect.objectContaining({ activeValues: { keyword: 'next' } }),
    )
  })

  it('respects controlled expanded values', () => {
    const onExpandedChange = vi.fn()

    render(
      <FilterBar
        fields={baseFields}
        expanded={false}
        defaultVisibleCount={1}
        onExpandedChange={onExpandedChange}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '展开' }))

    expect(onExpandedChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ source: 'expand' }),
    )
    expect(screen.queryByLabelText('Tags')).toBeNull()
  })

  it('keeps expand and collapse icons with the correct aria-expanded state', () => {
    render(<FilterBar fields={baseFields} defaultVisibleCount={1} />)

    const expandButton = screen.getByRole('button', { name: '展开' })
    expect(expandButton.getAttribute('aria-expanded')).toBe('false')
    expect(expandButton.querySelector('svg.arco-icon-down')).not.toBeNull()

    fireEvent.click(expandButton)

    const collapseButton = screen.getByRole('button', { name: '收起' })
    expect(collapseButton.getAttribute('aria-expanded')).toBe('true')
    expect(collapseButton.querySelector('svg.arco-icon-up')).not.toBeNull()
  })

  it('debounces change mode submissions and cancels stale tasks', () => {
    vi.useFakeTimers()
    const onSubmit = vi.fn()

    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        submitMode="change"
        debounceMs={100}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'a' } })
    fireEvent.change(input('Keyword'), { target: { value: 'ab' } })
    act(() => {
      vi.advanceTimersByTime(99)
    })
    expect(onSubmit).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      { keyword: 'ab' },
      expect.objectContaining({ source: 'change' }),
    )
    vi.useRealTimers()
  })

  it('cancels pending change submit when loading becomes true and does not replay', () => {
    vi.useFakeTimers()
    const onSubmit = vi.fn()
    const { rerender } = render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        submitMode="change"
        debounceMs={100}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'latte' } })
    rerender(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        submitMode="change"
        debounceMs={100}
        loading
        onSubmit={onSubmit}
      />,
    )
    act(() => {
      vi.advanceTimersByTime(200)
    })
    rerender(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        submitMode="change"
        debounceMs={100}
        onSubmit={onSubmit}
      />,
    )

    expect(onSubmit).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('handles reset with submitOnReset true', () => {
    const events: string[] = []
    const onValuesChange = vi.fn(() => events.push('values'))
    const onReset = vi.fn(() => events.push('reset'))
    const onActiveValuesChange = vi.fn(() => events.push('active'))
    const onSubmit = vi.fn(() => events.push('submit'))

    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        defaultValue={{ keyword: 'baseline' }}
        onValuesChange={onValuesChange}
        onReset={onReset}
        onActiveValuesChange={onActiveValuesChange}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'dirty' } })
    fireEvent.click(screen.getByRole('button', { name: '重置' }))

    expect(events).toEqual(['values', 'values', 'reset', 'active', 'submit'])
    expect(onSubmit).toHaveBeenLastCalledWith(
      { keyword: 'baseline' },
      expect.objectContaining({ source: 'reset' }),
    )
  })

  it('handles reset with submitOnReset false', () => {
    const onActiveValuesChange = vi.fn()
    const onSubmit = vi.fn()
    const onReset = vi.fn()

    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        defaultValue={{ keyword: 'baseline' }}
        submitOnReset={false}
        onReset={onReset}
        onActiveValuesChange={onActiveValuesChange}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'dirty' } })
    fireEvent.click(screen.getByRole('button', { name: '重置' }))

    expect(onReset).toHaveBeenCalledWith(
      { keyword: 'baseline' },
      expect.objectContaining({ source: 'reset' }),
    )
    expect(onActiveValuesChange).not.toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('keeps old active when reset validation fails', () => {
    const onValidateFailed = vi.fn()
    const onActiveValuesChange = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FilterBar
        fields={[{ type: 'input', name: 'keyword', label: 'Keyword', required: true }]}
        defaultActiveValues={{ keyword: 'old' }}
        onValidateFailed={onValidateFailed}
        onActiveValuesChange={onActiveValuesChange}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '重置' }))

    expect(onValidateFailed).toHaveBeenCalledWith(
      [{ fieldName: 'keyword', message: '该字段为必填项', ruleIndex: 0 }],
      expect.objectContaining({ source: 'reset', activeValues: { keyword: 'old' } }),
    )
    expect(onActiveValuesChange).not.toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not render visible:false fields and returns null with no eligible fields', () => {
    const { container } = render(
      <FilterBar fields={[{ type: 'input', name: 'hidden', label: 'Hidden', visible: false }]} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it('renders stable anatomy hooks for local layout styles', () => {
    const { container } = render(
      <FilterBar
        fields={baseFields.slice(0, 3)}
        defaultVisibleCount={1}
        defaultValue={{ status: 'open' }}
      />,
    )

    const root = container.querySelector('.sbux-filter-bar')
    expect(root?.getAttribute('data-collapsible')).toBe('true')
    expect(container.querySelector('.sbux-filter-bar__label-text')?.textContent).toBe('Status')
    expect(container.querySelector('.sbux-filter-bar__buttons')).not.toBeNull()
    expect(container.querySelector('.sbux-filter-bar__hidden-summary')?.textContent).toBe(
      '已生效 1 项隐藏条件',
    )
  })

  it('renders responsive span attributes clamped to each active column count', () => {
    const { container } = render(
      <FilterBar
        fields={[{ type: 'dateRange', name: 'period', label: 'Period', span: 4 }]}
        columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }}
      />,
    )
    const field = container.querySelector('.sbux-filter-bar__field') as HTMLElement

    expect(field.dataset.span).toBe('4')
    expect(field.dataset.spanXxl).toBe('4')
    expect(field.dataset.spanXl).toBe('4')
    expect(field.dataset.spanLg).toBe('3')
    expect(field.dataset.spanMd).toBe('2')
    expect(field.dataset.spanSm).toBe('1')
    expect(field.dataset.spanXs).toBe('1')
  })

  it('keeps collapsed values and renders hidden active summary', () => {
    render(
      <FilterBar
        fields={baseFields.slice(0, 3)}
        defaultValue={{ status: 'open' }}
        defaultVisibleCount={1}
      />,
    )

    expect(screen.queryByLabelText('Status')).toBeNull()
    expect(screen.getByText('已生效 1 项隐藏条件')).not.toBeNull()
  })

  it('uses priority selection without display reordering', () => {
    render(
      <FilterBar
        fields={[
          { type: 'input', name: 'third', label: 'Third', priority: 2 },
          { type: 'input', name: 'first', label: 'First', priority: 1 },
          { type: 'input', name: 'last', label: 'Last', priority: 9 },
          { type: 'input', name: 'second', label: 'Second', priority: 1 },
        ]}
        defaultVisibleCount={3}
      />,
    )

    expect(screen.getAllByLabelText(/Third|First|Second/).map((element) => element.id)).toEqual([
      expect.stringContaining('third-control'),
      expect.stringContaining('first-control'),
      expect.stringContaining('second-control'),
    ])
    expect(screen.queryByLabelText('Last')).toBeNull()
  })

  it('applies showSubmit mode defaults and explicit showReset', () => {
    const { rerender } = render(<FilterBar fields={baseFields.slice(0, 1)} />)
    expect(screen.getByRole('button', { name: '查询' })).not.toBeNull()
    expect(screen.getByRole('button', { name: '重置' })).not.toBeNull()

    rerender(<FilterBar fields={baseFields.slice(0, 1)} submitMode="change" showReset={false} />)

    expect(screen.queryByRole('button', { name: '查询' })).toBeNull()
    expect(screen.queryByRole('button', { name: '重置' })).toBeNull()
  })

  it('renders actions in submit, reset, expand order', () => {
    const { container } = render(<FilterBar fields={baseFields} defaultVisibleCount={1} />)

    expect(
      Array.from(container.querySelectorAll('.sbux-filter-bar__buttons > button')).map(
        (button) => button.textContent,
      ),
    ).toEqual(['查询', '重置', '展开'])
  })

  it('handles loading and disabled operation rules', () => {
    const onExpandedChange = vi.fn()
    const fields: FilterFieldSchema[] = [
      { ...baseFields[0], priority: 0 },
      ...baseFields.slice(1),
    ]
    const { rerender } = render(
      <FilterBar fields={fields} defaultVisibleCount={1} loading onExpandedChange={onExpandedChange} />,
    )

    expect(input('Keyword').disabled).toBe(true)
    expect((screen.getByRole('button', { name: '查询' }) as HTMLButtonElement).disabled).toBe(true)
    expect((screen.getByRole('button', { name: '重置' }) as HTMLButtonElement).disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: '展开' }))
    expect(onExpandedChange).toHaveBeenCalled()

    rerender(<FilterBar fields={fields} defaultVisibleCount={1} disabled onExpandedChange={onExpandedChange} />)
    expect((screen.getByRole('button', { name: '收起' }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('reports validation failure and focuses the first invalid field wrapper', () => {
    const onValidateFailed = vi.fn()

    render(
      <FilterBar
        fields={[{ type: 'input', name: 'keyword', label: 'Keyword', required: true }]}
        onValidateFailed={onValidateFailed}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '查询' }))

    expect(screen.getByRole('alert').textContent).toBe('该字段为必填项')
    expect(input('Keyword').getAttribute('aria-invalid')).toBe('true')
    expect(document.activeElement?.classList.contains('sbux-filter-bar__control')).toBe(true)
    expect(onValidateFailed).toHaveBeenCalled()
  })

  it('keeps renderField limited to control rendering', () => {
    const renderField = vi.fn(({ controlId, value, onChange }) => (
      <input id={controlId} value={String(value ?? '')} onChange={(event) => onChange(event.target.value)} />
    ))

    render(
      <FilterBar
        fields={[{ type: 'input', name: 'keyword', label: 'Keyword', help: 'Helpful' }]}
        renderField={renderField}
      />,
    )

    expect(screen.getByText('Keyword')).not.toBeNull()
    expect(screen.getByText('Helpful')).not.toBeNull()
    expect(renderField).toHaveBeenCalledWith(expect.objectContaining({ controlId: expect.any(String) }))
  })

  it('does not submit incomplete dateRange in change mode', () => {
    vi.useFakeTimers()
    const onSubmit = vi.fn()

    render(
      <FilterBar
        fields={[{ type: 'dateRange', name: 'period', label: 'Period' }]}
        submitMode="change"
        renderField={({ controlId, onChange }) => (
          <input id={controlId} aria-label="Period input" onChange={() => onChange(['2026-07-01'])} />
        )}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(screen.getByLabelText('Period'))
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(onSubmit).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('cleans up debounce on unmount', () => {
    vi.useFakeTimers()
    const onSubmit = vi.fn()
    const { unmount } = render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        submitMode="change"
        debounceMs={100}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.change(input('Keyword'), { target: { value: 'latte' } })
    unmount()
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(onSubmit).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('exposes public adapter props without assuming TreeSelect dropdownMenuClassName', () => {
    const onDateChange = vi.fn()
    const dateElement = renderFilterFieldControl({
      field: { type: 'date', name: 'createdAt', label: 'Created At' },
      value: undefined,
      disabled: false,
      controlId: 'createdAt',
      onChange: onDateChange,
    }) as React.ReactElement<Record<string, unknown>>
    const onRangeChange = vi.fn()
    const rangeElement = renderFilterFieldControl({
      field: { type: 'dateRange', name: 'period', label: 'Period' },
      value: undefined,
      disabled: false,
      controlId: 'period',
      onChange: onRangeChange,
    }) as React.ReactElement<Record<string, unknown>>
    const selectElement = renderFilterFieldControl({
      field: { type: 'select', name: 'status', label: 'Status', options },
      value: 'open',
      disabled: false,
      controlId: 'status',
      onChange: vi.fn(),
    }) as React.ReactElement<Record<string, unknown>>
    const treeElement = renderFilterFieldControl({
      field: {
        type: 'treeSelect',
        name: 'org',
        label: 'Org',
        treeData: [{ title: 'North', value: 'north' }],
      },
      value: 'north',
      disabled: false,
      controlId: 'org',
      onChange: vi.fn(),
    }) as React.ReactElement<Record<string, unknown>>

    expect(dateElement.props.format).toBe('YYYY-MM-DD')
    expect(rangeElement.props.format).toBe('YYYY-MM-DD')
    const getPopupContainer = rangeElement.props.getPopupContainer as () => Element
    expect(typeof getPopupContainer).toBe('function')
    expect(getPopupContainer()).toBe(document.body)
    ;(dateElement.props.onChange as (value: string) => void)('2026-07-29')
    ;(rangeElement.props.onChange as (value: string[]) => void)([
      '2026-07-01',
      '2026-07-29',
    ])
    expect(onDateChange).toHaveBeenCalledWith('2026-07-29')
    expect(onRangeChange).toHaveBeenCalledWith(['2026-07-01', '2026-07-29'])
    expect(selectElement.props.dropdownMenuClassName).toContain('sbux-filter-bar__select-popup')
    expect(treeElement.props.dropdownMenuClassName).toBeUndefined()
    expect(treeElement.props.treeData).toEqual([
      { title: 'North', value: 'north', key: 'north', children: undefined },
    ])
  })

  it('warns about duplicate field names in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <FilterBar
        fields={[
          { type: 'input', name: 'keyword', label: 'Keyword' },
          { type: 'input', name: 'keyword', label: 'Duplicate' },
        ]}
      />,
    )

    expect(warn).toHaveBeenCalledWith(
      '[FilterBar] fields.name must be unique. Duplicate name(s): keyword',
    )
    warn.mockRestore()
  })
})
