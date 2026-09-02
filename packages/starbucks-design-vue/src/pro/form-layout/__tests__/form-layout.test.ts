import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  FormActions,
  FormControlArea,
  FormGrid,
  FormGridItem,
  FormPageLayout,
  FormSection,
  StepFormLayout,
} from '../index'

describe('form layout primitives', () => {
  it('shares page, grid and field-span contracts', () => {
    const wrapper = mount(FormPageLayout, {
      props: { maxWidth: 900, padding: 20, description: '说明' },
      slots: {
        default: () => h(FormGrid, { columns: 2 }, {
          default: () => h(FormGridItem, { span: 2 }, () => '字段'),
        }),
      },
    })

    expect(wrapper.find('.sbux-pro-form-page-layout').attributes('style')).toContain('max-width: 900px')
    expect(wrapper.find('.sbux-pro-form-page-layout').attributes('style')).toContain('padding: 20px')
    expect(wrapper.find('.sbux-pro-form-page-layout-description').text()).toBe('说明')
  })

  it('exposes section, control, actions and step regions', () => {
    const wrapper = mount(StepFormLayout, {
      props: { stickyActions: true },
      slots: {
        steps: '步骤',
        default: () => h(FormSection, { id: 'section', class: 'custom-section', style: { marginTop: '4px' }, title: '基础信息', description: '说明', error: true }, {
          default: () => h(FormControlArea, {}, () => '控件'),
          extra: () => '操作',
        }),
        actions: () => h(FormActions, { sticky: true }, () => '下一步'),
      },
    })

    expect(wrapper.find('.sbux-pro-step-form-layout-steps').text()).toBe('步骤')
    expect(wrapper.find('#section').classes()).toContain('custom-section')
    expect(wrapper.find('#section').attributes('style')).toContain('margin-top: 4px')
    expect(wrapper.find('.sbux-pro-form-section-actions').text()).toBe('操作')
    expect(wrapper.find('.sbux-pro-form-section-tip').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-form-section-description').exists()).toBe(false)
    expect(wrapper.find('.sbux-pro-form-section-error').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-form-control-area').text()).toBe('控件')
    expect(wrapper.find('.sbux-pro-step-form-layout-sticky-actions').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-form-actions-align-right').exists()).toBe(true)
    expect(wrapper.find('.sbux-pro-form-actions-sticky').exists()).toBe(true)
  })
})
