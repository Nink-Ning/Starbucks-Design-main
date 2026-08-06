import { h, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TagGroupManagement from '../TagGroupManagement.vue'
import type { TagGroupItem } from '../interface'

const groups: TagGroupItem[] = [
  { id: 'all', name: '全部' },
  { id: 'store', name: '门店' },
  { id: 'disabled', name: '停用', disabled: true, allowRename: false, allowDelete: false }
]

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  vi.useRealTimers()
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

const mountTagGroupManagement = (options: Record<string, unknown> = {}) => {
  wrapper = mount(TagGroupManagement, { ...options, attachTo: document.body })
  return wrapper
}

describe('TagGroupManagement Vue', () => {
  it('renders list semantics, sibling actions, slot content, and attrs fallthrough', async () => {
    const mounted = mountTagGroupManagement({
      props: { groups, defaultActiveGroupId: 'store' },
      attrs: { class: 'custom-management', 'data-test-id': 'management' },
      slots: {
        content: ({ activeGroup }: { activeGroup: TagGroupItem | null }) =>
          h('div', { 'data-testid': 'content' }, activeGroup?.name ?? '')
      }
    })

    const currentButton = mounted.find('button[aria-current="true"]')
    expect(currentButton.exists()).toBe(true)
    expect(currentButton.attributes('aria-controls')).toBeTruthy()
    expect(mounted.find('[role="list"]').exists()).toBe(true)
    expect(mounted.findAll('li')).toHaveLength(3)
    expect(mounted.find('[data-testid="content"]').text()).toBe('门店')
    expect(mounted.find('button[aria-label="重命名门店"]').exists()).toBe(true)
    expect(mounted.find('button[aria-label="删除门店"]').exists()).toBe(true)
    expect(mounted.classes()).toContain('custom-management')
    expect(mounted.attributes('data-test-id')).toBe('management')
    expect(mounted.find('h2').classes()).toContain('sbux-tag-group-management__title')
    expect(currentButton.element.closest('li')?.getAttribute('data-active')).toBe('true')
    expect(mounted.find('button[aria-label="停用"]').element.closest('li')?.getAttribute('data-disabled')).toBe('true')
    expect(mounted.find('.sbux-tag-group-management__search-input').exists()).toBe(true)
  })

  it('supports mouse and keyboard selection without selecting disabled groups', async () => {
    const onActiveGroupChange = vi.fn()
    const onUpdate = vi.fn()
    const mounted = mountTagGroupManagement({
      props: { groups, onActiveGroupChange, 'onUpdate:activeGroupId': onUpdate }
    })

    const allButton = mounted.find('button[aria-label="全部"]')
    const storeButton = mounted.find('button[aria-label="门店"]')
    const disabledButton = mounted.find('button[aria-label="停用"]').element as HTMLButtonElement

    await storeButton.trigger('click')
    expect(onUpdate).toHaveBeenCalledWith('store')
    expect(onActiveGroupChange).toHaveBeenCalledWith('store', expect.objectContaining({ source: 'itemClick' }))
    await storeButton.trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(allButton.element)
    await allButton.trigger('keydown', { key: 'Enter' })
    expect(onActiveGroupChange).toHaveBeenLastCalledWith('all', expect.objectContaining({ source: 'keyboard' }))
    expect(disabledButton.disabled).toBe(true)
  })

  it('renders loading, empty, and search-empty states', async () => {
    const mounted = mountTagGroupManagement({ props: { groups: [], loading: true } })
    expect(mounted.find('[role="status"]').exists()).toBe(true)

    await mounted.setProps({ groups: [], loading: false })
    expect(mounted.text()).toContain('暂无标签组')

    await mounted.setProps({ groups })
    vi.useFakeTimers()
    await mounted.find('.arco-input').setValue('不存在')
    vi.advanceTimersByTime(500)
    await nextTick()
    expect(mounted.text()).toContain('未找到匹配的标签组')
  })

  it('keeps the content panel labelled when search hides the active group', async () => {
    const mounted = mountTagGroupManagement({
      props: { groups, defaultActiveGroupId: 'store' },
      slots: { content: h('div', { 'data-testid': 'content' }, 'content') }
    })

    vi.useFakeTimers()
    await mounted.find('.arco-input').setValue('全部')
    vi.advanceTimersByTime(500)
    await nextTick()

    expect(mounted.find('button[aria-label="门店"]').exists()).toBe(false)
    const content = mounted.find('[data-testid="content"]').element.parentElement
    const labelId = content?.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(labelId ? mounted.find(`#${labelId}`).text() : null).toBe('门店')
  })

  it('keeps content rendered while the management area is disabled', () => {
    const mounted = mountTagGroupManagement({
      props: { groups, disabled: true },
      slots: {
        content: ({ activeGroupId }: { activeGroupId: string | null }) =>
          h('div', { 'data-testid': 'content' }, activeGroupId ?? 'none')
      }
    })

    expect(mounted.find('[data-testid="content"]').text()).toBe('all')
    expect((mounted.find('.arco-input').element as HTMLInputElement).disabled).toBe(true)
    expect((mounted.find('button[aria-label="新增"]').element as HTMLButtonElement).disabled).toBe(true)
  })

  it('renders without browser globals during SSR', async () => {
    const html = await renderToString(
      h(TagGroupManagement, {
        groups: [{ id: 'server', name: '服务端标签组' }]
      })
    )

    expect(html).toContain('sbux-tag-group-management')
    expect(html).toContain('服务端标签组')
  })

  it('preserves keyboard source when confirming delete', async () => {
    const onDeleteGroup = vi.fn()
    const mounted = mountTagGroupManagement({
      props: { groups, onDeleteGroup }
    })

    const deleteButton = mounted.find('button[aria-label="删除门店"]')
    await deleteButton.trigger('keydown', { key: 'Enter' })
    await deleteButton.trigger('click')
    await nextTick()

    const confirmButton = Array.from(document.body.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === '确定'
    )
    expect(confirmButton).toBeTruthy()
    await confirmButton?.click()

    expect(onDeleteGroup).toHaveBeenCalledWith('store', expect.objectContaining({ source: 'keyboard' }))
  })
})
