import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PageContainer } from '../index'

describe('PageContainer', () => {
  it('renders no header when title and header slots absent', () => {
    const wrapper = mount(PageContainer)
    expect(wrapper.find('.sbux-pro-page-header').exists()).toBe(false)
  })

  it('renders header from title prop and re-emits back', async () => {
    const wrapper = mount(PageContainer, { props: { title: '客户标签', backable: true } })
    expect(wrapper.find('.sbux-pro-page-header-title').text()).toBe('客户标签')
    await wrapper.find('.sbux-pro-page-header-back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('renders body card by default and drops it with ghost', async () => {
    const wrapper = mount(PageContainer, { slots: { default: '<p id="c">内容</p>' } })
    expect(wrapper.find('.sbux-pro-page-container-body #c').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-page-container-body-ghost').exists()).toBe(false)
    await wrapper.setProps({ ghost: true })
    expect(wrapper.find('.sbux-pro-page-container-body-ghost').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mount(PageContainer, { slots: { footer: '<div id="f" />' } })
    expect(wrapper.find('.sbux-pro-page-container-footer #f').exists()).toBe(true)
  })

  it('passes loading to arco spin', () => {
    const wrapper = mount(PageContainer, { props: { loading: true } })
    expect(wrapper.findComponent({ name: 'Spin' }).props('loading')).toBe(true)
  })
})
