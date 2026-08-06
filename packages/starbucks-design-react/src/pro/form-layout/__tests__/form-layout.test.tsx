import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
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
    const { container } = render(
      <FormPageLayout maxWidth={900} padding={20} description="说明">
        <FormGrid columns={2}>
          <FormGridItem span={2}><span id="field">字段</span></FormGridItem>
        </FormGrid>
      </FormPageLayout>
    )

    expect(container.querySelector('.sbux-pro-form-page-layout')?.getAttribute('style')).toContain('max-width: 900px')
    expect(container.querySelector('.sbux-pro-form-page-layout')?.getAttribute('style')).toContain('padding: 20px')
    expect(container.querySelector('.sbux-pro-form-grid')?.getAttribute('style')).toContain('--sbux-pro-form-grid-columns: 2')
    expect(container.querySelector('.sbux-pro-form-grid-item')?.getAttribute('style')).toContain('--sbux-pro-form-grid-item-span: 2')
    expect(container.querySelector('.sbux-pro-form-page-layout-description')?.textContent).toContain('说明')
  })

  it('exposes section, control, actions and step regions', () => {
    const { container } = render(
      <StepFormLayout
        steps={<div id="steps">步骤</div>}
        actions={<FormActions sticky><button>下一步</button></FormActions>}
        stickyActions
      >
        <FormSection id="section" className="custom-section" style={{ marginTop: 4 }} title="基础信息" error>
          <FormControlArea><span id="control">控件</span></FormControlArea>
        </FormSection>
      </StepFormLayout>
    )

    expect(container.querySelector('#steps')).not.toBeNull()
    expect(container.querySelector('#section')?.className).toContain('custom-section')
    expect(container.querySelector('#section')?.getAttribute('style')).toContain('margin-top: 4px')
    expect(container.querySelector('#control')).not.toBeNull()
    expect(container.querySelector('.sbux-pro-form-section-error')).not.toBeNull()
    expect(container.querySelector('.sbux-pro-step-form-layout-sticky-actions')).not.toBeNull()
    expect(container.querySelector('.sbux-pro-form-actions-align-right')).not.toBeNull()
    expect(container.querySelector('.sbux-pro-form-actions-sticky')).not.toBeNull()
  })
})
