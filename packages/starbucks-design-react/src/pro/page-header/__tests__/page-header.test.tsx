import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { PageHeader } from '../index'

describe('PageHeader', () => {
  it('renders title text', () => {
    const { container } = render(<PageHeader title="客户标签" />)
    expect(container.querySelector('.sbux-pro-page-header-title')!.textContent).toBe('客户标签')
  })

  it('hides back arrow by default and shows it with backable', () => {
    const { container, rerender } = render(<PageHeader title="t" />)
    expect(container.querySelector('.sbux-pro-page-header-back')).toBeNull()
    rerender(<PageHeader title="t" backable />)
    const back = container.querySelector('.sbux-pro-page-header-back')
    expect(back).not.toBeNull()
    expect(back?.tagName).toBe('BUTTON')
    expect(back?.getAttribute('aria-label')).toBe('返回上一级')
  })

  it('calls onBack on arrow click', () => {
    const onBack = vi.fn()
    const { container } = render(<PageHeader title="t" backable onBack={onBack} />)
    fireEvent.click(container.querySelector('.sbux-pro-page-header-back')!)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders help icon only when helpText given', () => {
    const bare = render(<PageHeader title="t" />)
    expect(bare.container.querySelector('.sbux-pro-page-header-help')).toBeNull()
    const withHelp = render(<PageHeader title="t" helpText="说明" />)
    expect(withHelp.container.querySelector('.sbux-pro-page-header-help')).not.toBeNull()
    expect(withHelp.container.querySelector('[aria-label="页面帮助"]')).not.toBeNull()
  })

  it('renders extra in right area', () => {
    const { container } = render(<PageHeader title="t" extra={<button id="op">op</button>} />)
    expect(container.querySelector('.sbux-pro-page-header-extra #op')).not.toBeNull()
  })

  it('does not render extra container when extra is a falsy boolean', () => {
    const { container } = render(<PageHeader title="t" extra={false} />)
    expect(container.querySelector('.sbux-pro-page-header-extra')).toBeNull()
  })
})
