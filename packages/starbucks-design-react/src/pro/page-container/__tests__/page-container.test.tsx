import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { PageContainer } from '../index'

describe('PageContainer', () => {
  it('renders no header when title and extra absent', () => {
    const { container } = render(<PageContainer />)
    expect(container.querySelector('.sbux-pro-page-header')).toBeNull()
  })

  it('renders header from title and forwards onBack', () => {
    const onBack = vi.fn()
    const { container } = render(<PageContainer title="客户标签" backable onBack={onBack} />)
    expect(container.querySelector('.sbux-pro-page-header-title')!.textContent).toBe('客户标签')
    fireEvent.click(container.querySelector('.sbux-pro-page-header-back')!)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders body card by default and drops it with ghost', () => {
    const { container, rerender } = render(<PageContainer><p id="c">内容</p></PageContainer>)
    expect(container.querySelector('.sbux-pro-page-container-body #c')).not.toBeNull()
    expect(container.querySelector('.sbux-pro-page-container-body-ghost')).toBeNull()
    rerender(<PageContainer ghost><p id="c">内容</p></PageContainer>)
    expect(container.querySelector('.sbux-pro-page-container-body-ghost')).not.toBeNull()
  })

  it('renders footer', () => {
    const { container } = render(<PageContainer footer={<div id="f" />} />)
    expect(container.querySelector('.sbux-pro-page-container-footer #f')).not.toBeNull()
  })

  it('does not render header when extra is a falsy boolean', () => {
    const { container } = render(<PageContainer extra={false} />)
    expect(container.querySelector('.sbux-pro-page-header')).toBeNull()
  })

  it('does not render footer when footer is a falsy boolean', () => {
    const { container } = render(<PageContainer footer={false} />)
    expect(container.querySelector('.sbux-pro-page-container-footer')).toBeNull()
  })

  it('shows arco spin loading', () => {
    const { container } = render(<PageContainer loading />)
    // 断言 Arco Spin 的 loading 态类名;若实际版本类名不同,以 DOM 实测为准改断言(不许删用例)
    expect(container.querySelector('.arco-spin-loading')).not.toBeNull()
  })
})
