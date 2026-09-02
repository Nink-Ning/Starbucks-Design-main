import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { TagGroupItem, TagGroupManagementProps } from '../interface'
import { useTagGroupManagement } from '../use-tag-group-management'

const groups: TagGroupItem[] = [
  { id: 'all', name: '全部' },
  { id: 'store', name: '门店' },
  { id: 'disabled', name: '停用', disabled: true }
]

const createProps = (overrides: Partial<TagGroupManagementProps> = {}): TagGroupManagementProps => ({
  groups,
  ...overrides
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('useTagGroupManagement', () => {
  it('waits for loading to finish before resolving the initial active group', async () => {
    const onActiveGroupChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ loading, currentGroups }: { loading: boolean; currentGroups: readonly TagGroupItem[] }) =>
        useTagGroupManagement(
          createProps({ loading, groups: currentGroups, defaultActiveGroupId: 'store', onActiveGroupChange })
        ),
      { initialProps: { loading: true, currentGroups: [] as TagGroupItem[] } }
    )

    expect(result.current.initialResolution).toBe('pending')
    expect(result.current.activeGroupId).toBeNull()
    expect(onActiveGroupChange).not.toHaveBeenCalled()

    rerender({ loading: false, currentGroups: groups })
    await waitFor(() => expect(result.current.activeGroupId).toBe('store'))
    expect(result.current.initialResolution).toBe('resolved')
    expect(onActiveGroupChange).not.toHaveBeenCalled()
  })

  it('keeps the initial null decision and does not auto-select later groups', async () => {
    const { result, rerender } = renderHook(
      ({ currentGroups }: { currentGroups: readonly TagGroupItem[] }) =>
        useTagGroupManagement(createProps({ groups: currentGroups, defaultActiveGroupId: null })),
      { initialProps: { currentGroups: [] as TagGroupItem[] } }
    )

    await waitFor(() => expect(result.current.initialResolution).toBe('resolved'))
    rerender({ currentGroups: groups })
    expect(result.current.activeGroupId).toBeNull()
  })

  it('falls back to the next available group when the active group disappears', async () => {
    const onActiveGroupChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ currentGroups }: { currentGroups: readonly TagGroupItem[] }) =>
        useTagGroupManagement(
          createProps({ groups: currentGroups, defaultActiveGroupId: 'store', onActiveGroupChange })
        ),
      { initialProps: { currentGroups: groups } }
    )

    await waitFor(() => expect(result.current.activeGroupId).toBe('store'))
    rerender({ currentGroups: [groups[0], groups[2]] })

    await waitFor(() => expect(result.current.activeGroupId).toBe('all'))
    expect(onActiveGroupChange).toHaveBeenCalledWith(
      'all',
      expect.objectContaining({ source: 'groupsUpdateFallback', groupId: 'all' })
    )
  })

  it('does not fall back for controlled activeGroupId', async () => {
    const onActiveGroupChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ currentGroups, activeGroupId }: { currentGroups: readonly TagGroupItem[]; activeGroupId: string | null }) =>
        useTagGroupManagement(createProps({ groups: currentGroups, activeGroupId, onActiveGroupChange })),
      { initialProps: { currentGroups: groups, activeGroupId: 'store' } }
    )

    expect(result.current.activeGroupId).toBe('store')
    rerender({ currentGroups: [groups[0]], activeGroupId: 'store' })
    expect(result.current.activeGroupId).toBe('store')
    expect(onActiveGroupChange).not.toHaveBeenCalled()
  })

  it('updates local search immediately and emits only after the 500ms debounce', () => {
    vi.useFakeTimers()
    const onSearchChange = vi.fn()
    const { result } = renderHook(() => useTagGroupManagement(createProps({ onSearchChange })))

    act(() => result.current.setSearchKeyword(' 门 '))
    expect(result.current.searchKeyword).toBe(' 门 ')
    expect(result.current.visibleGroups).toEqual([groups[1]])
    expect(onSearchChange).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(499))
    expect(onSearchChange).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(onSearchChange).toHaveBeenCalledWith('门', expect.objectContaining({ source: 'search', keyword: '门' }))
  })

  it('cancels search work when disabled or when searchable is turned off', () => {
    vi.useFakeTimers()
    const onSearchChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ searchable, disabled }: { searchable: boolean; disabled?: boolean }) =>
        useTagGroupManagement(createProps({ searchable, disabled, onSearchChange })),
      { initialProps: { searchable: true, disabled: false } }
    )

    act(() => result.current.setSearchKeyword('store'))
    rerender({ searchable: false, disabled: false })
    expect(result.current.searchKeyword).toBe('')
    act(() => vi.advanceTimersByTime(500))
    expect(onSearchChange).not.toHaveBeenCalled()

    rerender({ searchable: true, disabled: true })
    act(() => result.current.setSearchKeyword('all'))
    act(() => vi.advanceTimersByTime(500))
    expect(onSearchChange).not.toHaveBeenCalled()
  })

  it('warns once for the same duplicate id set and keeps the first group', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const duplicateGroups = [
      { id: 'one', name: 'First' },
      { id: 'one', name: 'Second' }
    ]
    const { rerender } = renderHook(
      ({ currentGroups }: { currentGroups: readonly TagGroupItem[] }) =>
        useTagGroupManagement(createProps({ groups: currentGroups })),
      { initialProps: { currentGroups: duplicateGroups } }
    )

    await waitFor(() => expect(warning).toHaveBeenCalledTimes(1))
    rerender({ currentGroups: [...duplicateGroups] })
    expect(warning).toHaveBeenCalledTimes(1)
    expect(warning.mock.calls[0][0]).toContain('one')
  })

  it('validates and emits create and rename intents without changing groups', async () => {
    const onCreateGroup = vi.fn()
    const onRenameGroup = vi.fn()
    const { result } = renderHook(() => useTagGroupManagement(createProps({ onCreateGroup, onRenameGroup })))

    await waitFor(() => expect(result.current.initialResolution).toBe('resolved'))
    act(() => result.current.openCreate())
    act(() => result.current.setOperationValue('  新标签  '))
    act(() => result.current.submitOperation('itemClick'))
    expect(onCreateGroup).toHaveBeenCalledWith('新标签', expect.objectContaining({ source: 'itemClick' }))
    expect(result.current.operation).toBeNull()

    act(() => result.current.openRename(groups[1]))
    act(() => result.current.setOperationValue('  门店  '))
    act(() => result.current.submitOperation('keyboard'))
    expect(onRenameGroup).not.toHaveBeenCalled()
    expect(result.current.operation).toBeNull()
  })

  it('keeps validation errors in the operation and emits delete by id', async () => {
    const onDeleteGroup = vi.fn()
    const { result } = renderHook(() => useTagGroupManagement(createProps({ onDeleteGroup })))

    await waitFor(() => expect(result.current.initialResolution).toBe('resolved'))
    act(() => result.current.openCreate())
    act(() => result.current.submitOperation('itemClick'))
    expect(result.current.operation?.error).toBe('required')

    act(() => result.current.openDelete(groups[1]))
    act(() => result.current.confirmDelete('keyboard'))
    expect(onDeleteGroup).toHaveBeenCalledWith(
      'store',
      expect.objectContaining({ source: 'keyboard', groupId: 'store' })
    )
  })
})
