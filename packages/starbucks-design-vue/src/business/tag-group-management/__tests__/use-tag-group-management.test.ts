import { defineComponent, h, nextTick, type PropType } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { TagGroupItem, TagGroupManagementProps } from '../interface'
import {
  useTagGroupManagement,
  type TagGroupManagementEmit,
  type UseTagGroupManagementResult
} from '../use-tag-group-management'

const groups: TagGroupItem[] = [
  { id: 'all', name: '全部' },
  { id: 'store', name: '门店' },
  { id: 'disabled', name: '停用', disabled: true }
]

const createHarness = () =>
  defineComponent({
    props: {
      groups: { type: Array, required: true },
      activeGroupId: { type: String as PropType<string | null>, default: undefined },
      defaultActiveGroupId: { type: String as PropType<string | null>, default: undefined },
      searchable: { type: Boolean, default: true },
      loading: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      allowCreate: { type: Boolean, default: true },
      allowRename: { type: Boolean, default: true },
      allowDelete: { type: Boolean, default: true }
    },
    emits: ['update:activeGroupId', 'activeGroupChange', 'searchChange', 'createGroup', 'renameGroup', 'deleteGroup'],
    setup(props, { emit, expose }) {
      const state = useTagGroupManagement(
        props as unknown as TagGroupManagementProps,
        emit as unknown as TagGroupManagementEmit
      )
      expose(state)
      return () => h('div')
    }
  })

const getState = (wrapper: VueWrapper): UseTagGroupManagementResult =>
  wrapper.vm as unknown as UseTagGroupManagementResult

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('useTagGroupManagement', () => {
  it('waits for loading to finish before resolving the initial active group', async () => {
    const wrapper = mount(createHarness(), {
      props: { groups: [], loading: true, defaultActiveGroupId: 'store' }
    })
    const state = getState(wrapper)

    expect(state.initialResolution).toBe('pending')
    expect(state.activeGroupId).toBeNull()
    expect(wrapper.emitted('activeGroupChange')).toBeUndefined()

    await wrapper.setProps({ groups, loading: false })
    await nextTick()

    expect(state.initialResolution).toBe('resolved')
    expect(state.activeGroupId).toBe('store')
    expect(wrapper.emitted('activeGroupChange')).toBeUndefined()
  })

  it('does not auto-select groups after an initial null resolution', async () => {
    const wrapper = mount(createHarness(), {
      props: { groups: [], defaultActiveGroupId: null }
    })
    const state = getState(wrapper)

    expect(state.initialResolution).toBe('resolved')
    await wrapper.setProps({ groups })
    await nextTick()
    expect(state.activeGroupId).toBeNull()
  })

  it('emits update before activeGroupChange for user selection', async () => {
    const wrapper = mount(createHarness(), {
      props: { groups }
    })
    const state = getState(wrapper)

    state.selectGroup('store', 'itemClick')
    await nextTick()

    expect(Object.keys(wrapper.emitted() ?? {})).toEqual(['update:activeGroupId', 'activeGroupChange'])
    expect(wrapper.emitted('update:activeGroupId')?.[0]).toEqual(['store'])
    expect(wrapper.emitted('activeGroupChange')?.[0]).toEqual([
      'store',
      expect.objectContaining({ source: 'itemClick', groupId: 'store' })
    ])
  })

  it('falls back and preserves the Vue event order when the active group disappears', async () => {
    const wrapper = mount(createHarness(), {
      props: { groups, defaultActiveGroupId: 'store' }
    })
    const state = getState(wrapper)

    await wrapper.setProps({ groups: [groups[0], groups[2]] })
    await nextTick()

    expect(state.activeGroupId).toBe('all')
    expect(Object.keys(wrapper.emitted() ?? {})).toEqual(['update:activeGroupId', 'activeGroupChange'])
    expect(wrapper.emitted('activeGroupChange')?.[0]).toEqual([
      'all',
      expect.objectContaining({ source: 'groupsUpdateFallback', groupId: 'all' })
    ])
  })

  it('debounces search and cancels the pending task when loading starts', async () => {
    vi.useFakeTimers()
    const wrapper = mount(createHarness(), {
      props: { groups, onSearchChange: vi.fn() }
    })
    const state = getState(wrapper)

    state.setSearchKeyword(' 门 ')
    expect(state.searchKeyword).toBe(' 门 ')
    vi.advanceTimersByTime(499)
    expect(wrapper.emitted('searchChange')).toBeUndefined()
    vi.advanceTimersByTime(1)
    expect(wrapper.emitted('searchChange')?.[0]).toEqual([
      '门',
      expect.objectContaining({ source: 'search', keyword: '门' })
    ])

    state.setSearchKeyword('store')
    await wrapper.setProps({ loading: true })
    vi.advanceTimersByTime(500)
    expect(wrapper.emitted('searchChange')).toHaveLength(1)
  })

  it('does not emit a fallback in controlled mode', async () => {
    const wrapper = mount(createHarness(), {
      props: { groups, activeGroupId: 'store' }
    })

    await wrapper.setProps({ groups: [groups[0], groups[2]] })
    await nextTick()

    expect(getState(wrapper).activeGroup).toBeNull()
    expect(wrapper.emitted('activeGroupChange')).toBeUndefined()
    expect(wrapper.emitted('update:activeGroupId')).toBeUndefined()
  })
})
