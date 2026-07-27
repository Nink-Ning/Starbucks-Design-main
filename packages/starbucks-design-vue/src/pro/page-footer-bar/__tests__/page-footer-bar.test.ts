import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PageFooterBar } from '../index'

describe('PageFooterBar', () => {
  it('renders default slot content', () => {
    const wrapper = mount(PageFooterBar, { slots: { default: '<button id="save">保存</button>' } })
    expect(wrapper.find('.sbux-pro-page-footer-bar #save').exists()).toBe(true)
  })

  it('defaults to left align and bordered', () => {
    const wrapper = mount(PageFooterBar)
    expect(wrapper.classes()).toContain('sbux-pro-page-footer-bar-align-left')
    expect(wrapper.classes()).toContain('sbux-pro-page-footer-bar-bordered')
  })

  it('supports right align', () => {
    const wrapper = mount(PageFooterBar, { props: { align: 'right' } })
    expect(wrapper.classes()).toContain('sbux-pro-page-footer-bar-align-right')
  })

  it('bordered=false removes border class', () => {
    const wrapper = mount(PageFooterBar, { props: { bordered: false } })
    expect(wrapper.classes()).not.toContain('sbux-pro-page-footer-bar-bordered')
  })
})
