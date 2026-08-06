import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TagGroupManagement } from '../TagGroupManagement'
import type { TagGroupItem } from '../interface'

const groups: TagGroupItem[] = [
  { id: 'all', name: '全部' },
  { id: 'store', name: '门店' },
  { id: 'disabled', name: '停用', disabled: true, allowRename: false, allowDelete: false }
]

afterEach(() => cleanup())

describe('TagGroupManagement', () => {
  it('renders list semantics, current content association, and sibling actions', async () => {
    render(
      <TagGroupManagement
        groups={groups}
        defaultActiveGroupId="store"
        renderContent={({ activeGroup }) => <div data-testid="content">{activeGroup?.name}</div>}
      />
    )

    const currentButton = await screen.findByRole('button', { name: '门店' })
    expect(currentButton.getAttribute('aria-current')).toBe('true')
    expect(currentButton.getAttribute('aria-controls')).toBeTruthy()
    expect(screen.getByRole('list')).not.toBeNull()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByTestId('content').textContent).toBe('门店')
    expect(screen.getByRole('button', { name: '重命名门店' })).not.toBeNull()
    expect(screen.getByRole('button', { name: '删除门店' })).not.toBeNull()
    expect(screen.getByRole('button', { name: '重命名门店' }).closest('button')).not.toBe(currentButton)
    expect(screen.getByRole('heading', { name: '标签组' }).className).toContain('__title')
    expect(currentButton.closest('li')?.getAttribute('data-active')).toBe('true')
    expect(screen.getByRole('button', { name: '停用' }).closest('li')?.getAttribute('data-disabled')).toBe('true')
    expect(document.querySelector('.sbux-tag-group-management__search-input')).not.toBeNull()
  })

  it('supports mouse and keyboard selection without selecting disabled groups', async () => {
    const onActiveGroupChange = vi.fn()
    render(<TagGroupManagement groups={groups} onActiveGroupChange={onActiveGroupChange} />)

    const allButton = await screen.findByRole('button', { name: '全部' })
    const storeButton = screen.getByRole('button', { name: '门店' })
    const disabledButton = screen.getByRole('button', { name: '停用' })

    fireEvent.click(storeButton)
    expect(onActiveGroupChange).toHaveBeenCalledWith('store', expect.objectContaining({ source: 'itemClick' }))
    fireEvent.keyDown(storeButton, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(allButton)
    fireEvent.keyDown(allButton, { key: 'Enter' })
    expect(onActiveGroupChange).toHaveBeenLastCalledWith('all', expect.objectContaining({ source: 'keyboard' }))
    expect((disabledButton as HTMLButtonElement).disabled).toBe(true)
  })

  it('renders loading, empty, search-empty, and custom empty states', async () => {
    const { rerender } = render(<TagGroupManagement groups={[]} loading />)
    expect(screen.getByRole('status')).not.toBeNull()

    rerender(<TagGroupManagement groups={[]} />)
    expect(screen.getByText('暂无标签组')).not.toBeNull()

    rerender(<TagGroupManagement groups={groups} renderEmpty={({ type }) => <div>{type}</div>} />)
    fireEvent.change(screen.getByRole('textbox', { name: '搜索标签组' }), { target: { value: '不存在' } })
    await waitFor(() => expect(screen.getByText('searchEmpty')).not.toBeNull())
  })

  it('keeps the content panel labelled when search hides the active group', async () => {
    render(
      <TagGroupManagement
        groups={groups}
        defaultActiveGroupId="store"
        renderContent={() => <div data-testid="content">content</div>}
      />
    )

    fireEvent.change(await screen.findByRole('textbox', { name: '搜索标签组' }), { target: { value: '全部' } })
    await waitFor(() => expect(screen.queryByRole('button', { name: '门店' })).toBeNull())

    const content = screen.getByTestId('content').parentElement
    const labelId = content?.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(labelId ? document.getElementById(labelId)?.textContent : null).toBe('门店')
  })

  it('opens create, validates, and emits a normalized name', async () => {
    const onCreateGroup = vi.fn()
    render(<TagGroupManagement groups={groups} onCreateGroup={onCreateGroup} />)

    fireEvent.click(await screen.findByRole('button', { name: '新增' }))
    const input = await screen.findByRole('textbox', { name: '新增' })
    fireEvent.change(input, { target: { value: '  新标签  ' } })
    fireEvent.click(screen.getByRole('button', { name: '确定' }))

    expect(onCreateGroup).toHaveBeenCalledWith('新标签', expect.objectContaining({ source: 'itemClick' }))
  })

  it('confirms deletion and emits the group id', async () => {
    const onDeleteGroup = vi.fn()
    render(<TagGroupManagement groups={groups} onDeleteGroup={onDeleteGroup} />)

    fireEvent.click(await screen.findByRole('button', { name: '删除门店' }))
    const confirm = await screen.findByRole('button', { name: '确定' })
    fireEvent.click(confirm)

    expect(onDeleteGroup).toHaveBeenCalledWith(
      'store',
      expect.objectContaining({ source: 'itemClick', groupId: 'store' })
    )
  })

  it('keeps content rendered while the management area is disabled', async () => {
    render(
      <TagGroupManagement
        groups={groups}
        disabled
        renderContent={({ activeGroupId }) => <div data-testid="content">{activeGroupId ?? 'none'}</div>}
      />
    )

    expect((await screen.findByTestId('content')).textContent).toBe('all')
    expect((screen.getByRole('textbox', { name: '搜索标签组' }) as HTMLInputElement).disabled).toBe(true)
    expect((screen.getByRole('button', { name: '新增' }) as HTMLButtonElement).disabled).toBe(true)
  })
})
