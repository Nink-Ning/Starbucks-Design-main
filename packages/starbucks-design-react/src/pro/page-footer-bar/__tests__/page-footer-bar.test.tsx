import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { PageFooterBar } from '../index'

function rootOf(container: HTMLElement) {
  return container.querySelector('.sbux-pro-page-footer-bar')!
}

describe('PageFooterBar', () => {
  it('renders children', () => {
    const { container } = render(<PageFooterBar><button id="save">保存</button></PageFooterBar>)
    expect(container.querySelector('.sbux-pro-page-footer-bar #save')).not.toBeNull()
  })

  it('defaults to left align and bordered', () => {
    const { container } = render(<PageFooterBar />)
    expect(rootOf(container).classList.contains('sbux-pro-page-footer-bar-align-left')).toBe(true)
    expect(rootOf(container).classList.contains('sbux-pro-page-footer-bar-bordered')).toBe(true)
  })

  it('supports right align', () => {
    const { container } = render(<PageFooterBar align="right" />)
    expect(rootOf(container).classList.contains('sbux-pro-page-footer-bar-align-right')).toBe(true)
  })

  it('bordered=false removes border class', () => {
    const { container } = render(<PageFooterBar bordered={false} />)
    expect(rootOf(container).classList.contains('sbux-pro-page-footer-bar-bordered')).toBe(false)
  })
})
