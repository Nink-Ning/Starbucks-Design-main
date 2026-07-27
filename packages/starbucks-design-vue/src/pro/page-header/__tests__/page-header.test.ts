import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PageHeader } from '../index'

describe('PageHeader', () => {
  it('renders title text', () => {
    const wrapper = mount(PageHeader, { props: { title: '客户标签' } })
    expect(wrapper.find('.sbux-pro-page-header-title').text()).toBe('客户标签')
  })

  it('hides back arrow by default and shows it with backable', async () => {
    const wrapper = mount(PageHeader, { props: { title: 't' } })
    expect(wrapper.find('.sbux-pro-page-header-back').exists()).toBe(false)
    await wrapper.setProps({ backable: true })
    expect(wrapper.find('.sbux-pro-page-header-back').exists()).toBe(true)
  })

  it('emits back on arrow click', async () => {
    const wrapper = mount(PageHeader, { props: { title: 't', backable: true } })
    await wrapper.find('.sbux-pro-page-header-back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('renders help icon only when helpText given', () => {
    const bare = mount(PageHeader, { props: { title: 't' } })
    expect(bare.find('.sbux-pro-page-header-help').exists()).toBe(false)
    const withHelp = mount(PageHeader, { props: { title: 't', helpText: '说明' } })
    expect(withHelp.find('.sbux-pro-page-header-help').exists()).toBe(true)
  })

  it('renders extra slot in right area', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 't' },
      slots: { extra: '<button id="op">op</button>' },
    })
    expect(wrapper.find('.sbux-pro-page-header-extra #op').exists()).toBe(true)
  })

  it('title slot overrides default title', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'ignored' },
      slots: { title: '<h2 id="custom">自定义</h2>' },
    })
    expect(wrapper.find('#custom').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-page-header-title').exists()).toBe(false)
  })
})
