import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../FilterBar.vue'
import { getFilterFieldAdapter } from '../adapters'
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

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

const input = (wrapper: ReturnType<typeof mount>, name = 'keyword') =>
  wrapper.find(`[data-field-name="${name}"] input`)

describe('Vue FilterBar', () => {
  it('handles manual uncontrolled field change without submitting', async () => {
    const wrapper = mount(FilterBar, {
      props: { fields: baseFields.slice(0, 1) },
    })

    await input(wrapper).setValue('latte')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([{ keyword: 'latte' }])
    expect(wrapper.emitted('valuesChange')?.[0]).toEqual([
      { keyword: 'latte' },
      expect.objectContaining({
        source: 'fieldChange',
        fieldName: 'keyword',
        changedValues: { keyword: 'latte' },
        activeValues: { keyword: 'coffee' },
      }),
    ])
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('submits manual queries with the computed active snapshot', async () => {
    const events: string[] = []
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 2),
        defaultValue: { keyword: 'latte', status: 'open' },
        'onUpdate:activeValues': () => events.push('active'),
        onSubmit: () => events.push('submit'),
      },
    })

    await wrapper.find('.sbux-filter-bar__submit').trigger('click')

    expect(events).toEqual(['active', 'submit'])
    expect(wrapper.emitted('update:activeValues')?.[0]).toEqual([
      { keyword: 'latte', status: 'open' },
    ])
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      { keyword: 'latte', status: 'open' },
      expect.objectContaining({
        source: 'submit',
        activeValues: { keyword: 'latte', status: 'open' },
      }),
    ])
  })

  it('respects controlled draft values', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        modelValue: { keyword: 'controlled' },
      },
    })

    await input(wrapper).setValue('next')

    expect((input(wrapper).element as HTMLInputElement).value).toBe('controlled')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([{ keyword: 'next' }])
  })

  it('respects controlled active values while submitting snapshot', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        defaultValue: { keyword: 'next' },
        activeValues: { keyword: 'old' },
      },
    })

    await wrapper.find('.sbux-filter-bar__submit').trigger('click')

    expect(wrapper.emitted('update:activeValues')?.[0]).toEqual([{ keyword: 'next' }])
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      { keyword: 'next' },
      expect.objectContaining({ activeValues: { keyword: 'next' } }),
    ])
  })

  it('respects controlled expanded values', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields,
        expanded: false,
        defaultVisibleCount: 1,
      },
    })

    await wrapper.find('.sbux-filter-bar__expand').trigger('click')

    expect(wrapper.emitted('update:expanded')?.[0]).toEqual([true])
    expect(wrapper.emitted('expandedChange')?.[0]).toEqual([
      true,
      expect.objectContaining({ source: 'expand' }),
    ])
    expect(wrapper.find('[data-field-name="tags"]').exists()).toBe(false)
  })

  it('debounces change mode submissions and cancels stale tasks', async () => {
    vi.useFakeTimers()
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        submitMode: 'change',
        debounceMs: 100,
      },
    })

    await input(wrapper).setValue('a')
    await input(wrapper).setValue('ab')
    vi.advanceTimersByTime(99)
    expect(wrapper.emitted('submit')).toBeUndefined()
    vi.advanceTimersByTime(1)

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      { keyword: 'ab' },
      expect.objectContaining({ source: 'change' }),
    ])
  })

  it('cancels pending change submit when loading becomes true and does not replay', async () => {
    vi.useFakeTimers()
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        submitMode: 'change',
        debounceMs: 100,
      },
    })

    await input(wrapper).setValue('latte')
    await wrapper.setProps({ loading: true })
    vi.advanceTimersByTime(200)
    await wrapper.setProps({ loading: false })

    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('handles reset with submitOnReset true', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        defaultValue: { keyword: 'baseline' },
      },
    })

    await input(wrapper).setValue('dirty')
    await wrapper.find('.sbux-filter-bar__reset').trigger('click')

    expect(wrapper.emitted('valuesChange')?.at(-1)).toEqual([
      { keyword: 'baseline' },
      expect.objectContaining({ source: 'reset' }),
    ])
    expect(wrapper.emitted('reset')?.[0]).toEqual([
      { keyword: 'baseline' },
      expect.objectContaining({ source: 'reset' }),
    ])
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      { keyword: 'baseline' },
      expect.objectContaining({ source: 'reset' }),
    ])
  })

  it('handles reset with submitOnReset false', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        defaultValue: { keyword: 'baseline' },
        submitOnReset: false,
      },
    })

    await input(wrapper).setValue('dirty')
    await wrapper.find('.sbux-filter-bar__reset').trigger('click')

    expect(wrapper.emitted('reset')).toHaveLength(1)
    expect(wrapper.emitted('update:activeValues')).toBeUndefined()
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('keeps old active when reset validation fails', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'input', name: 'keyword', label: 'Keyword', required: true }],
        defaultActiveValues: { keyword: 'old' },
      },
    })

    await wrapper.find('.sbux-filter-bar__reset').trigger('click')

    expect(wrapper.emitted('validateFailed')?.[0]).toEqual([
      [{ fieldName: 'keyword', message: '该字段为必填项', ruleIndex: 0 }],
      expect.objectContaining({ source: 'reset', activeValues: { keyword: 'old' } }),
    ])
    expect(wrapper.emitted('update:activeValues')).toBeUndefined()
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('does not render visible:false fields and returns null with no eligible fields', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'input', name: 'hidden', label: 'Hidden', visible: false }],
      },
    })

    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('renders stable anatomy hooks for local layout styles', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 3),
        defaultVisibleCount: 1,
        defaultValue: { status: 'open' },
      },
    })

    expect(wrapper.find('.sbux-filter-bar').attributes('data-collapsible')).toBe('true')
    expect(wrapper.find('.sbux-filter-bar__label-text').text()).toBe('Status')
    expect(wrapper.find('.sbux-filter-bar__buttons').exists()).toBe(true)
    expect(wrapper.find('.sbux-filter-bar__hidden-summary').text()).toBe('已生效 1 项隐藏条件')
  })

  it('renders responsive span attributes clamped to each active column count', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'dateRange', name: 'period', label: 'Period', span: 4 }],
        columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 },
      },
    })
    const field = wrapper.find('.sbux-filter-bar__field')

    expect(field.attributes('data-span')).toBe('4')
    expect(field.attributes('data-span-xxl')).toBe('4')
    expect(field.attributes('data-span-xl')).toBe('4')
    expect(field.attributes('data-span-lg')).toBe('3')
    expect(field.attributes('data-span-md')).toBe('2')
    expect(field.attributes('data-span-sm')).toBe('1')
    expect(field.attributes('data-span-xs')).toBe('1')
  })

  it('keeps collapsed values and renders hidden active summary', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [
          { ...baseFields[0], priority: 0 },
          { ...baseFields[1], priority: undefined },
          baseFields[2],
        ],
        defaultValue: { status: 'open' },
        defaultVisibleCount: 1,
      },
    })

    expect(wrapper.find('[data-field-name="status"]').exists()).toBe(false)
    expect(wrapper.find('.sbux-filter-bar__hidden-summary').text()).toBe('已生效 1 项隐藏条件')
  })

  it('uses priority selection without display reordering', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [
          { type: 'input', name: 'third', label: 'Third', priority: 2 },
          { type: 'input', name: 'first', label: 'First', priority: 1 },
          { type: 'input', name: 'last', label: 'Last', priority: 9 },
          { type: 'input', name: 'second', label: 'Second', priority: 1 },
        ],
        defaultVisibleCount: 3,
      },
    })

    expect(wrapper.findAll('.sbux-filter-bar__field').map((field) => field.attributes('data-field-name'))).toEqual([
      'third',
      'first',
      'second',
    ])
    expect(wrapper.find('[data-field-name="last"]').exists()).toBe(false)
  })

  it('applies showSubmit mode defaults and explicit showReset', async () => {
    const wrapper = mount(FilterBar, {
      props: { fields: baseFields.slice(0, 1) },
    })
    expect(wrapper.find('.sbux-filter-bar__submit').exists()).toBe(true)
    expect(wrapper.find('.sbux-filter-bar__reset').exists()).toBe(true)

    await wrapper.setProps({ submitMode: 'change', showReset: false })

    expect(wrapper.find('.sbux-filter-bar__submit').exists()).toBe(false)
    expect(wrapper.find('.sbux-filter-bar__reset').exists()).toBe(false)
  })

  it('renders actions in submit, reset, expand order', () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields,
        defaultVisibleCount: 1,
      },
    })

    expect(wrapper.findAll('.sbux-filter-bar__buttons > button').map((button) => button.text())).toEqual([
      '查询',
      '重置',
      '展开',
    ])
  })

  it('handles loading and disabled operation rules', async () => {
    const fields: FilterFieldSchema[] = [{ ...baseFields[0], priority: 0 }, ...baseFields.slice(1)]
    const wrapper = mount(FilterBar, {
      props: {
        fields,
        defaultVisibleCount: 1,
        loading: true,
      },
    })

    expect((input(wrapper).element as HTMLInputElement).disabled).toBe(true)
    expect(wrapper.find('.sbux-filter-bar__submit').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.sbux-filter-bar__reset').attributes('disabled')).toBeDefined()
    await wrapper.find('.sbux-filter-bar__expand').trigger('click')
    expect(wrapper.emitted('expandedChange')).toHaveLength(1)

    await wrapper.setProps({ loading: false, disabled: true })
    expect(wrapper.find('.sbux-filter-bar__expand').attributes('disabled')).toBeDefined()
  })

  it('reports validation failure and focuses the first invalid field wrapper', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'input', name: 'keyword', label: 'Keyword', required: true }],
      },
      attachTo: document.body,
    })

    await wrapper.find('.sbux-filter-bar__submit').trigger('click')

    expect(wrapper.find('[role="alert"]').text()).toBe('该字段为必填项')
    expect(input(wrapper).attributes('aria-invalid')).toBe('true')
    expect(document.activeElement?.classList.contains('sbux-filter-bar__control')).toBe(true)
    wrapper.unmount()
  })

  it('keeps field slot limited to control rendering', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'input', name: 'keyword', label: 'Keyword', help: 'Helpful' }],
      },
      slots: {
        field:
          '<template #field="{ controlId, value, onChange }"><input :id="controlId" :value="value" @input="onChange($event.target.value)" /></template>',
      },
    })

    expect(wrapper.find('.sbux-filter-bar__label').text()).toBe('Keyword')
    expect(wrapper.find('.sbux-filter-bar__help').text()).toBe('Helpful')
    await input(wrapper).setValue('slot-value')
    expect(wrapper.emitted('valuesChange')?.[0][0]).toEqual({ keyword: 'slot-value' })
  })

  it('does not submit incomplete dateRange in change mode', async () => {
    vi.useFakeTimers()
    const wrapper = mount(FilterBar, {
      props: {
        fields: [{ type: 'dateRange', name: 'period', label: 'Period' }],
        submitMode: 'change',
      },
      slots: {
        field:
          '<template #field="{ controlId, onChange }"><input :id="controlId" @input="onChange([\'2026-07-01\'])" /></template>',
      },
    })

    await input(wrapper, 'period').setValue('start')
    vi.advanceTimersByTime(500)

    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('cleans up debounce on unmount', async () => {
    vi.useFakeTimers()
    const wrapper = mount(FilterBar, {
      props: {
        fields: baseFields.slice(0, 1),
        submitMode: 'change',
        debounceMs: 100,
      },
    })

    await input(wrapper).setValue('latte')
    wrapper.unmount()
    vi.advanceTimersByTime(100)

    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('exposes public adapter props without assuming unsupported TreeSelect popup class', () => {
    const onDateChange = vi.fn()
    const dateAdapter = getFilterFieldAdapter({
      field: { type: 'date', name: 'createdAt', label: 'Created At' },
      value: undefined,
      disabled: false,
      controlId: 'createdAt',
      onChange: onDateChange,
    })
    const onRangeChange = vi.fn()
    const rangeAdapter = getFilterFieldAdapter({
      field: { type: 'dateRange', name: 'period', label: 'Period' },
      value: undefined,
      disabled: false,
      controlId: 'period',
      onChange: onRangeChange,
    })
    const selectAdapter = getFilterFieldAdapter({
      field: { type: 'select', name: 'status', label: 'Status', options },
      value: 'open',
      disabled: false,
      controlId: 'status',
      onChange: vi.fn(),
    })
    const treeAdapter = getFilterFieldAdapter({
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
    })

    expect(dateAdapter.props.valueFormat).toBe('YYYY-MM-DD')
    expect(rangeAdapter.props.valueFormat).toBe('YYYY-MM-DD')
    dateAdapter.events['update:modelValue']('2026-07-29')
    rangeAdapter.events['update:modelValue'](['2026-07-01', '2026-07-29'])
    expect(onDateChange).toHaveBeenCalledWith('2026-07-29')
    expect(onRangeChange).toHaveBeenCalledWith(['2026-07-01', '2026-07-29'])
    expect(selectAdapter.props.popupContainer).toBe('body')
    expect(treeAdapter.props.dropdownClassName).toBeUndefined()
    expect(treeAdapter.props.data).toEqual([
      { title: 'North', value: 'north', key: 'north', children: undefined },
    ])
  })

  it('warns about duplicate field names in development', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    mount(FilterBar, {
      props: {
        fields: [
          { type: 'input', name: 'keyword', label: 'Keyword' },
          { type: 'input', name: 'keyword', label: 'Duplicate' },
        ],
      },
    })

    expect(warn).toHaveBeenCalledWith(
      '[FilterBar] fields.name must be unique. Duplicate name(s): keyword',
    )
  })
})
