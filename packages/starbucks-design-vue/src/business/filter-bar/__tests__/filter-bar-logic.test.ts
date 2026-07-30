import { describe, expect, it, vi } from 'vitest'
import type { FilterFieldSchema, FilterValue } from '../interface'
import {
  buildResetBaseline,
  normalizeActiveSnapshot,
} from '../normalize'
import {
  clampFieldSpan,
  getDuplicateFieldNames,
  getHiddenActiveSummaryCount,
  resolveFilterLayout,
  resolveResponsiveFieldSpans,
  warnDuplicateFieldNames,
} from '../layout'
import { validateFilterFields } from '../validation'

const options = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
]

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: 'Keyword', defaultValue: 'beans' },
  { type: 'select', name: 'status', label: 'Status', options, defaultValue: 'open' },
  {
    type: 'multiSelect',
    name: 'tags',
    label: 'Tags',
    options,
    defaultValue: ['reserve'],
  },
  { type: 'date', name: 'createdAt', label: 'Created At', defaultValue: '2026-07-01' },
  { type: 'dateRange', name: 'period', label: 'Period' },
  {
    type: 'cascader',
    name: 'region',
    label: 'Region',
    options: [{ label: 'East', value: 'east' }],
  },
  {
    type: 'treeSelect',
    name: 'org',
    label: 'Org',
    treeData: [{ title: 'North', value: 'north' }],
  },
  { type: 'input', name: 'secret', label: 'Secret', visible: false, defaultValue: 'hidden' },
]

describe('FilterBar pure contract', () => {
  it('merges field defaultValue before component defaultValue', () => {
    const baseline = buildResetBaseline(fields, {
      keyword: 'latte',
      period: ['2026-07-10', '2026-07-20'],
    })

    expect(baseline).toMatchObject({
      keyword: 'latte',
      status: 'open',
      tags: ['reserve'],
      createdAt: '2026-07-01',
      period: ['2026-07-10', '2026-07-20'],
      region: [],
      org: undefined,
      secret: 'hidden',
    })
  })

  it('keeps reset baseline independent from later external mutations', () => {
    const defaultValue: FilterValue = { tags: ['reserve'] }
    const baseline = buildResetBaseline(fields, defaultValue)

    ;(defaultValue.tags as string[]).push('mutated')

    expect(baseline.tags).toEqual(['reserve'])
  })

  it('filters empty values and visible:false fields from active snapshot', () => {
    const snapshot = normalizeActiveSnapshot(fields, {
      keyword: '',
      status: null,
      tags: [],
      createdAt: undefined,
      period: ['2026-07-01'],
      region: [],
      org: undefined,
      secret: 'hidden',
    })

    expect(snapshot).toEqual({})
  })

  it('normalizes date and dateRange values without mutating draft values', () => {
    const draft = {
      createdAt: new Date(2026, 6, 8),
      period: ['2026-07-01', '2026-07-31'],
    }

    const snapshot = normalizeActiveSnapshot(fields, draft)

    expect(snapshot).toMatchObject({
      createdAt: '2026-07-08',
      period: ['2026-07-01', '2026-07-31'],
    })
    expect(draft.createdAt).toBeInstanceOf(Date)
  })

  it('keeps collapsed field values eligible for active snapshot', () => {
    const layout = resolveFilterLayout(fields, {
      expanded: false,
      defaultVisibleCount: 1,
    })
    const snapshot = normalizeActiveSnapshot(fields, {
      keyword: 'shown',
      status: 'closed',
    })

    expect(layout.collapsedFieldNames).toContain('status')
    expect(snapshot).toEqual({ keyword: 'shown', status: 'closed' })
  })

  it('counts hidden summary only from collapsed non-empty active values', () => {
    const layout = resolveFilterLayout(fields, {
      expanded: false,
      defaultVisibleCount: 1,
    })
    const count = getHiddenActiveSummaryCount(
      fields,
      { keyword: 'visible', status: 'open', tags: [], secret: 'hidden' },
      layout.collapsedFieldNames,
    )

    expect(count).toBe(1)
  })

  it('uses priority to select collapsed rendering without reordering schema display', () => {
    const priorityFields: FilterFieldSchema[] = [
      { type: 'input', name: 'third', label: 'Third', priority: 2 },
      { type: 'input', name: 'first', label: 'First', priority: 1 },
      { type: 'input', name: 'last', label: 'Last', priority: 9 },
      { type: 'input', name: 'second', label: 'Second', priority: 1 },
    ]

    const layout = resolveFilterLayout(priorityFields, {
      expanded: false,
      defaultVisibleCount: 3,
    })

    expect(layout.renderedFieldNames).toEqual(['third', 'first', 'second'])
    expect(layout.collapsedFieldNames).toEqual(['last'])
  })

  it('resolves collapsible defaults and explicit false', () => {
    expect(resolveFilterLayout(fields.slice(0, 4), { expanded: false }).collapsible).toBe(false)
    expect(resolveFilterLayout(fields.slice(0, 5), { expanded: false }).collapsible).toBe(true)
    expect(
      resolveFilterLayout(fields, { expanded: false, collapsible: false }).renderedFieldNames,
    ).toEqual(fields.filter((field) => field.visible !== false).map((field) => field.name))
  })

  it('clamps span to current columns', () => {
    expect(clampFieldSpan(8, 3)).toBe(3)
    expect(clampFieldSpan(0, 3)).toBe(1)
    expect(clampFieldSpan(undefined, 3)).toBe(1)
    expect(clampFieldSpan(2, 0)).toBe(1)
  })

  it('resolves responsive field spans without exceeding current columns', () => {
    const columns = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }

    expect(resolveResponsiveFieldSpans(4, columns)).toEqual({
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      xxl: 4,
    })
    expect(resolveResponsiveFieldSpans(2, columns).xs).toBe(1)
    expect(resolveResponsiveFieldSpans(3, columns).xs).toBe(1)
    expect(resolveResponsiveFieldSpans(4, columns).xs).toBe(1)
  })

  it('validates required fields and stops after first validator error', () => {
    const validatorCalls: string[] = []
    const validationFields: FilterFieldSchema[] = [
      { type: 'input', name: 'keyword', label: 'Keyword', required: true },
      {
        type: 'input',
        name: 'code',
        label: 'Code',
        rules: [
          {
            validator: () => {
              validatorCalls.push('first')
              return 'Invalid code'
            },
          },
          {
            validator: () => {
              validatorCalls.push('second')
            },
          },
        ],
      },
    ]

    expect(validateFilterFields(validationFields, { keyword: '', code: 'x' })).toEqual([
      { fieldName: 'keyword', message: '该字段为必填项', ruleIndex: 0 },
      { fieldName: 'code', message: 'Invalid code', ruleIndex: 0 },
    ])
    expect(validatorCalls).toEqual(['first'])
  })

  it('detects duplicate field names and can warn explicitly', () => {
    const duplicateFields: FilterFieldSchema[] = [
      { type: 'input', name: 'keyword', label: 'Keyword' },
      { type: 'select', name: 'keyword', label: 'Duplicate', options },
    ]
    const warn = vi.fn()

    expect(getDuplicateFieldNames(duplicateFields)).toEqual(['keyword'])
    warnDuplicateFieldNames(duplicateFields, warn)

    expect(warn).toHaveBeenCalledWith(
      '[FilterBar] fields.name must be unique. Duplicate name(s): keyword',
    )
  })
})
