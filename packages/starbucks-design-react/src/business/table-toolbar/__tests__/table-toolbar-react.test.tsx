import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { IconCheckCircle } from '@arco-design/web-react/icon/index.js'
import { TableToolbar } from '../TableToolbar'
import type { TableToolbarQuickFilter } from '../interface'

const quickFilters: TableToolbarQuickFilter[] = [
  {
    type: 'search',
    name: 'keyword',
    placeholder: '搜索门店'
  }
]

afterEach(() => cleanup())

describe('React TableToolbar', () => {
  it('shows the selected count only after selection exists', () => {
    const { rerender } = render(<TableToolbar operationActions={[{ key: 'enable', label: '启用' }]} />)
    expect(screen.queryByText('已选择 1 项')).toBeNull()

    rerender(<TableToolbar selectedCount={2} operationActions={[{ key: 'enable', label: '启用' }]} />)
    expect(document.querySelector('.sbux-table-toolbar__selection')?.textContent).toBe('已选择 2 项')
    expect(screen.getByText('2').classList.contains('sbux-table-toolbar__selection-count')).toBe(true)
  })

  it('keeps search input as draft until Enter and clears immediately', () => {
    const onQuickFilterChange = vi.fn()
    const onSearchSubmit = vi.fn()
    render(
      <TableToolbar
        quickFilters={quickFilters}
        onQuickFilterChange={onQuickFilterChange}
        onSearchSubmit={onSearchSubmit}
      />
    )

    const search = screen.getByRole('textbox', { name: '搜索门店' })
    fireEvent.change(search, { target: { value: '  latte  ' } })
    expect(onQuickFilterChange).not.toHaveBeenCalled()

    fireEvent.keyDown(search, { key: 'Enter', code: 'Enter', keyCode: 13, which: 13 })
    expect(onQuickFilterChange).toHaveBeenCalledWith(
      { keyword: 'latte' },
      expect.objectContaining({ source: 'searchSubmit', fieldName: 'keyword' })
    )
    expect(onSearchSubmit).toHaveBeenCalledWith(
      'latte',
      { keyword: 'latte' },
      expect.objectContaining({ source: 'searchSubmit' })
    )

    fireEvent.change(search, { target: { value: '' } })
    expect(onQuickFilterChange).toHaveBeenLastCalledWith({}, expect.objectContaining({ source: 'searchClear' }))
  })

  it('disables selection actions until rows are selected', () => {
    const onOperation = vi.fn()
    const { rerender } = render(
      <TableToolbar
        operationActions={[
          {
            key: 'enable',
            label: '启用',
            icon: <IconCheckCircle />,
            requiresSelection: true
          }
        ]}
        onOperation={onOperation}
      />
    )

    const disabledButton = screen.getByRole('button', { name: '启用' }) as HTMLButtonElement
    expect(disabledButton.disabled).toBe(true)
    fireEvent.click(disabledButton)
    expect(onOperation).not.toHaveBeenCalled()

    rerender(
      <TableToolbar
        selectedCount={1}
        operationActions={[{ key: 'enable', label: '启用', requiresSelection: true }]}
        onOperation={onOperation}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: '启用' }))
    expect(onOperation).toHaveBeenCalledWith('enable', { source: 'operation', selectedCount: 1 })
  })

  it('disables overflow triggers when every menu action is unavailable', () => {
    const { container, rerender } = render(
      <TableToolbar
        moreActions={[
          { key: 'delete', label: '删除', requiresSelection: true },
          { key: 'move', label: '移动', requiresSelection: true }
        ]}
      />
    )

    const getMoreButtons = () =>
      Array.from(container.querySelectorAll<HTMLButtonElement>('.sbux-table-toolbar__more button'))
    expect(getMoreButtons()).toHaveLength(3)
    expect(getMoreButtons().every((button) => button.disabled)).toBe(true)

    rerender(
      <TableToolbar
        selectedCount={1}
        moreActions={[
          { key: 'delete', label: '删除', requiresSelection: true },
          { key: 'move', label: '移动', requiresSelection: true }
        ]}
      />
    )
    expect(getMoreButtons().every((button) => !button.disabled)).toBe(true)
  })

  it('renders the standard export, column settings, and refresh tools', () => {
    const onExport = vi.fn()
    const onColumnSettings = vi.fn()
    const onRefresh = vi.fn()
    render(
      <TableToolbar
        tableTools={{ export: true, columnSettings: true, refresh: true }}
        onExport={onExport}
        onColumnSettings={onColumnSettings}
        onRefresh={onRefresh}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '导出' }))
    fireEvent.click(screen.getByRole('button', { name: '列设置' }))
    fireEvent.click(screen.getByRole('button', { name: '刷新' }))
    expect(onExport).toHaveBeenCalledWith(expect.objectContaining({ source: 'export' }))
    expect(onColumnSettings).toHaveBeenCalledWith(expect.objectContaining({ source: 'columnSettings' }))
    expect(onRefresh).toHaveBeenCalledWith(expect.objectContaining({ source: 'refresh' }))
    expect(screen.getByRole('button', { name: '导出' }).querySelector('.arco-icon-export')).not.toBeNull()
  })

  it('renders priority-aware operation entry points for container queries', () => {
    const { container } = render(
      <TableToolbar
        operationActions={[
          { key: 'enable', label: '启用' },
          { key: 'delete', label: '删除' }
        ]}
        moreActions={[{ key: 'archive', label: '归档' }]}
      />
    )

    expect(container.querySelectorAll('.sbux-table-toolbar__operation-action')).toHaveLength(2)
    expect(container.querySelector('.sbux-table-toolbar__operation-action--priority-1')).not.toBeNull()
    expect(container.querySelector('.sbux-table-toolbar__operation-action--priority-2')).not.toBeNull()
    expect(container.querySelector('.sbux-table-toolbar__more-group--wide')).not.toBeNull()
    expect(container.querySelector('.sbux-table-toolbar__more-group--standard')).not.toBeNull()
    expect(container.querySelector('.sbux-table-toolbar__more-group--compact')).not.toBeNull()
    expect(container.querySelector('.sbux-table-toolbar')?.getAttribute('data-has-operations')).toBe('true')
  })

  it('marks toolbars without operations so controls can align left', () => {
    const { container } = render(<TableToolbar quickFilters={quickFilters} tableTools={{ refresh: true }} />)
    expect(container.querySelector('.sbux-table-toolbar')?.getAttribute('data-has-operations')).toBe('false')
    expect(container.querySelector('.sbux-table-toolbar')?.getAttribute('data-has-start-content')).toBe('false')
  })

  it('partitions core start filters from default end filters', () => {
    const { container } = render(
      <TableToolbar
        quickFilters={[
          {
            type: 'buttonGroup',
            name: 'status',
            placement: 'start',
            options: [{ label: '全部', value: 'all' }]
          },
          { type: 'search', name: 'keyword', placeholder: '搜索门店' }
        ]}
        tableTools={{ refresh: true }}
      />
    )

    expect(container.querySelector('.sbux-table-toolbar')?.getAttribute('data-has-start-content')).toBe('true')
    expect(
      container.querySelector('.sbux-table-toolbar__quick-filters--start [data-filter-name="status"]')
    ).not.toBeNull()
    expect(container.querySelector('.arco-radio-group-variant-default-filled')).not.toBeNull()
    expect(
      container.querySelector('.sbux-table-toolbar__quick-filters--end [data-filter-name="keyword"]')
    ).not.toBeNull()
  })
})
