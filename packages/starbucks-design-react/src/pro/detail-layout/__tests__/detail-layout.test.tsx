import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
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
    const { container } = render(
      <DetailPageLayout maxWidth={900} gap={32}>
        <span>内容</span>
      </DetailPageLayout>,
    )

    const layout = container.querySelector('.sbux-pro-detail-page-layout')
    expect(layout?.getAttribute('style')).toContain('max-width: 900px')
    expect(layout?.getAttribute('style')).toContain('gap: 32px')
  })

  it('renders header content, actions and an accessible back action', () => {
    const onBack = vi.fn()
    const { container } = render(
      <DetailPageHeader
        title="全场满50减6元券"
        status={<span>已上线</span>}
        description="电子券"
        meta={<span>QID_0000102229</span>}
        backable
        onBack={onBack}
        actions={<button>编辑</button>}
      />,
    )

    expect(container.querySelector('.sbux-pro-detail-page-header-title')?.textContent).toBe('全场满50减6元券')
    expect(container.querySelector('.sbux-pro-detail-page-header-status')?.textContent).toBe('已上线')
    expect(container.querySelector('.sbux-pro-detail-page-header-actions button')?.textContent).toBe('编辑')
    fireEvent.click(container.querySelector('.sbux-pro-detail-page-header-back')!)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders section headings and divider state', () => {
    const { container } = render(
      <DetailSection title="基本信息" description="对象属性" divider>
        <span>内容</span>
      </DetailSection>,
    )

    expect(container.querySelector('.sbux-pro-detail-section-title')?.textContent).toBe('基本信息')
    expect(container.querySelector('.sbux-pro-detail-section-divider')).not.toBeNull()
  })

  it('normalizes empty data values only when emptyValue is provided', () => {
    const { container } = render(
      <DetailDescriptions
        emptyValue="—"
        data={[
          { label: '空字符串', value: '' },
          { label: '旧占位', value: '--' },
          { label: '正常值', value: 'GAODE' },
        ]}
      />,
    )

    expect(container.textContent).toContain('—')
    expect(container.textContent).not.toContain('--')
    expect(container.textContent).toContain('GAODE')
  })
})
