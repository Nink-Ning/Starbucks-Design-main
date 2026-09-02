import { describe, expect, it } from 'vitest'
import type { TableToolbarQuickFilter } from '../interface'
import {
  applyQuickFilterValue,
  createInitialQuickFilterValues,
  getToolbarOverflowActions,
  mergeToolbarActions,
  normalizeQuickFilters
} from '../normalize'

const filters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', options: [], defaultValue: 'all' },
  { type: 'search', name: 'keyword' },
  { type: 'dateRange', name: 'period' }
]

describe('TableToolbar quick filter logic', () => {
  it('keeps the first visible filter for each stable name', () => {
    expect(
      normalizeQuickFilters([
        ...filters,
        { type: 'search', name: 'keyword' },
        { type: 'search', name: 'hidden', visible: false },
        { type: 'search', name: '  ' }
      ]).map((filter) => filter.name)
    ).toEqual(['status', 'keyword', 'period'])
  })

  it('merges field defaults with explicit default values', () => {
    expect(createInitialQuickFilterValues(filters, { keyword: ' latte ' })).toEqual({
      status: 'all',
      keyword: 'latte'
    })
  })

  it('normalizes committed search and completed date ranges', () => {
    const withKeyword = applyQuickFilterValue(filters, {}, 'keyword', '  coffee  ')
    expect(withKeyword).toEqual({ keyword: 'coffee' })
    expect(applyQuickFilterValue(filters, withKeyword, 'period', ['2026-08-01'])).toEqual(withKeyword)
    expect(applyQuickFilterValue(filters, withKeyword, 'period', ['2026-08-01', '2026-08-21'])).toEqual({
      keyword: 'coffee',
      period: ['2026-08-01', '2026-08-21']
    })
  })

  it('removes empty quick filter values', () => {
    expect(applyQuickFilterValue(filters, { status: 'open' }, 'status', undefined)).toEqual({})
    expect(applyQuickFilterValue(filters, { keyword: 'coffee' }, 'keyword', '')).toEqual({})
  })

  it('merges responsive operation menus in display order and removes duplicate keys', () => {
    expect(
      mergeToolbarActions(
        [
          { key: 'enable', label: '启用' },
          { key: 'delete', label: '删除' }
        ],
        [
          { key: 'delete', label: '重复删除' },
          { key: 'archive', label: '归档' }
        ]
      ).map((action) => action.label)
    ).toEqual(['启用', '删除', '归档'])
  })

  it('keeps higher-priority operations outside each overflow menu', () => {
    const operations = [
      { key: 'enable', label: '启用' },
      { key: 'disable', label: '停用' },
      { key: 'delete', label: '删除' },
      { key: 'transfer', label: '转移' },
      { key: 'archive', label: '归档' }
    ]
    const more = [
      { key: 'enable', label: '重复启用' },
      { key: 'tag', label: '打标' }
    ]

    expect(getToolbarOverflowActions(operations, more, 4).map((action) => action.key)).toEqual(['archive', 'tag'])
    expect(getToolbarOverflowActions(operations, more, 2).map((action) => action.key)).toEqual([
      'delete',
      'transfer',
      'archive',
      'tag'
    ])
    expect(getToolbarOverflowActions(operations, more, 1).map((action) => action.key)).toEqual([
      'disable',
      'delete',
      'transfer',
      'archive',
      'tag'
    ])
  })
})
