import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  DetailDescriptions,
  DetailPageHeader,
  DetailPageLayout,
  DetailSection,
} from '../index'

describe('detail layout primitives', () => {
  const originalMatchMedia = window.matchMedia

  beforeAll(() => {
    window.matchMedia = (() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia
  })

  afterAll(() => {
    window.matchMedia = originalMatchMedia
  })

  it('renders a flowing layout with configurable width and gap', () => {
    const wrapper = mount(DetailPageLayout, {
      props: { maxWidth: 900, gap: 32 },
      slots: { default: '内容' },
    })

    expect(wrapper.find('.sbux-pro-detail-page-layout').attributes('style')).toContain('max-width: 900px')
    expect(wrapper.find('.sbux-pro-detail-page-layout').attributes('style')).toContain('gap: 32px')
  })

  it('renders header slots and emits a back action', async () => {
    const wrapper = mount(DetailPageHeader, {
      props: { title: '全场满50减6元券', status: '已上线', backable: true },
      slots: {
        description: '电子券',
        meta: 'QID_0000102229',
        actions: '<button>编辑</button>',
      },
    })

    expect(wrapper.find('.sbux-pro-detail-page-header-title').text()).toBe('全场满50减6元券')
    expect(wrapper.find('.sbux-pro-detail-page-header-status').text()).toBe('已上线')
    expect(wrapper.find('.sbux-pro-detail-page-header-actions button').text()).toBe('编辑')
    await wrapper.find('.sbux-pro-detail-page-header-back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('renders section headings and divider state', () => {
    const wrapper = mount(DetailSection, {
      props: { title: '基本信息', description: '对象属性', divider: true },
      slots: { default: '内容' },
    })

    expect(wrapper.find('.sbux-pro-detail-section-title').text()).toBe('基本信息')
    expect(wrapper.find('.sbux-pro-detail-section-divider').exists()).toBe(true)
  })

  it('normalizes empty data values only when emptyValue is provided', () => {
    const wrapper = mount(DetailDescriptions, {
      props: {
        emptyValue: '—',
        data: [
          { label: '空字符串', value: '' },
          { label: '旧占位', value: '--' },
          { label: '正常值', value: 'GAODE' },
        ],
      },
    })

    expect(wrapper.text()).toContain('—')
    expect(wrapper.text()).not.toContain('--')
    expect(wrapper.text()).toContain('GAODE')
  })
})
