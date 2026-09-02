import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { renderToString } from 'vue/server-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Input } from '@arco-design/web-vue'
import { IconCheckCircle } from '@arco-design/web-vue/es/icon'
import TableToolbar from '../TableToolbar.vue'
import type { TableToolbarQuickFilter } from '../interface'

const quickFilters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '搜索门店' }]

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('Vue TableToolbar', () => {
  it('shows the selected count only after selection exists', async () => {
    const wrapper = mount(TableToolbar, {
      props: { operationActions: [{ key: 'enable', label: '启用' }] }
    })
    expect(wrapper.text()).not.toContain('已选择')
    await wrapper.setProps({ selectedCount: 2 })
    expect(wrapper.text()).toContain('已选择 2 项')
    expect(wrapper.find('.sbux-table-toolbar__selection-count').text()).toBe('2')
  })

  it('keeps search input as draft until Enter and clears immediately', async () => {
    const wrapper = mount(TableToolbar, { props: { quickFilters } })
    const input = wrapper.findComponent(Input)

    input.vm.$emit('update:modelValue', '  latte  ')
    await nextTick()
    expect(wrapper.emitted('quickFilterChange')).toBeUndefined()

    input.vm.$emit('pressEnter', new KeyboardEvent('keydown', { key: 'Enter' }))
    await nextTick()
    expect(wrapper.emitted('quickFilterChange')?.[0]).toEqual([
      { keyword: 'latte' },
      expect.objectContaining({ source: 'searchSubmit', fieldName: 'keyword' })
    ])
    expect(wrapper.emitted('searchSubmit')?.[0]).toEqual([
      'latte',
      { keyword: 'latte' },
      expect.objectContaining({ source: 'searchSubmit' })
    ])

    input.vm.$emit('update:modelValue', '')
    await nextTick()
    expect(wrapper.emitted('quickFilterChange')?.at(-1)).toEqual([
      {},
      expect.objectContaining({ source: 'searchClear' })
    ])
  })

  it('disables selection actions until rows are selected', async () => {
    const onOperation = vi.fn()
    const wrapper = mount(TableToolbar, {
      props: {
        operationActions: [
          {
            key: 'enable',
            label: '启用',
            icon: IconCheckCircle,
            requiresSelection: true
          }
        ],
        onOperation
      }
    })
    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBe(true)

    await wrapper.setProps({ selectedCount: 1 })
    await wrapper.find('button').trigger('click')
    expect(onOperation).toHaveBeenCalledWith('enable', { source: 'operation', selectedCount: 1 })
  })

  it('disables overflow triggers when every menu action is unavailable', async () => {
    const wrapper = mount(TableToolbar, {
      props: {
        moreActions: [
          { key: 'delete', label: '删除', requiresSelection: true },
          { key: 'move', label: '移动', requiresSelection: true }
        ]
      }
    })

    const getMoreButtons = () => wrapper.findAll<HTMLButtonElement>('.sbux-table-toolbar__more')
    expect(getMoreButtons()).toHaveLength(3)
    expect(getMoreButtons().every((button) => button.element.disabled)).toBe(true)

    await wrapper.setProps({ selectedCount: 1 })
    expect(getMoreButtons().every((button) => !button.element.disabled)).toBe(true)
  })

  it('renders and emits standard table tool events', async () => {
    const wrapper = mount(TableToolbar, {
      props: { tableTools: { export: true, columnSettings: true, refresh: true } }
    })
    const tools = wrapper.findAll('.sbux-table-toolbar__tool')
    expect(tools).toHaveLength(3)
    await tools[0].trigger('click')
    await tools[1].trigger('click')
    await tools[2].trigger('click')
    expect(wrapper.emitted('export')?.[0]?.[0]).toEqual(expect.objectContaining({ source: 'export' }))
    expect(wrapper.emitted('columnSettings')?.[0]?.[0]).toEqual(expect.objectContaining({ source: 'columnSettings' }))
    expect(wrapper.emitted('refresh')?.[0]?.[0]).toEqual(expect.objectContaining({ source: 'refresh' }))
    expect(wrapper.find('.arco-icon-export').exists()).toBe(true)
  })

  it('renders without browser globals during SSR', async () => {
    const html = await renderToString(
      h(TableToolbar, {
        operationActions: [{ key: 'create', label: '新增' }]
      })
    )
    expect(html).toContain('sbux-table-toolbar')
    expect(html).toContain('新增')
  })

  it('renders priority-aware operation entry points for container queries', () => {
    const wrapper = mount(TableToolbar, {
      props: {
        operationActions: [
          { key: 'enable', label: '启用' },
          { key: 'delete', label: '删除' }
        ],
        moreActions: [{ key: 'archive', label: '归档' }]
      }
    })

    expect(wrapper.findAll('.sbux-table-toolbar__operation-action')).toHaveLength(2)
    expect(wrapper.find('.sbux-table-toolbar__operation-action--priority-1').exists()).toBe(true)
    expect(wrapper.find('.sbux-table-toolbar__operation-action--priority-2').exists()).toBe(true)
    expect(wrapper.find('.sbux-table-toolbar__more-group--wide').exists()).toBe(true)
    expect(wrapper.find('.sbux-table-toolbar__more-group--standard').exists()).toBe(true)
    expect(wrapper.find('.sbux-table-toolbar__more-group--compact').exists()).toBe(true)
    expect(wrapper.attributes('data-has-operations')).toBe('true')
  })

  it('marks toolbars without operations so controls can align left', () => {
    const wrapper = mount(TableToolbar, { props: { quickFilters, tableTools: { refresh: true } } })
    expect(wrapper.attributes('data-has-operations')).toBe('false')
    expect(wrapper.attributes('data-has-start-content')).toBe('false')
  })

  it('partitions core start filters from default end filters', () => {
    const wrapper = mount(TableToolbar, {
      props: {
        quickFilters: [
          {
            type: 'buttonGroup',
            name: 'status',
            placement: 'start',
            options: [{ label: '全部', value: 'all' }]
          },
          { type: 'search', name: 'keyword', placeholder: '搜索门店' }
        ],
        tableTools: { refresh: true }
      }
    })

    expect(wrapper.attributes('data-has-start-content')).toBe('true')
    expect(wrapper.find('.sbux-table-toolbar__quick-filters--start [data-filter-name="status"]').exists()).toBe(true)
    expect(wrapper.find('.arco-radio-group-variant-default-filled').exists()).toBe(true)
    expect(wrapper.find('.sbux-table-toolbar__quick-filters--end [data-filter-name="keyword"]').exists()).toBe(true)
  })
})
