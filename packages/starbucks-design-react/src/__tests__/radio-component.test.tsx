import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Radio } from '../radio'

describe('Radio.Group', () => {
  it.each(['outline', 'primary-filled', 'default-filled'] as const)(
    'maps the %s variant to its component class',
    (variant) => {
      const { container } = render(
        <Radio.Group type="button" variant={variant} options={['One', 'Two']} />,
      )

      expect(
        container.firstElementChild?.classList.contains(`arco-radio-group-variant-${variant}`),
      ).toBe(true)
    },
  )

  it('preserves consumer class names', () => {
    const { container } = render(
      <Radio.Group
        type="button"
        variant="outline"
        className="consumer-class"
        options={['One', 'Two']}
      />,
    )

    expect(container.firstElementChild?.classList.contains('consumer-class')).toBe(true)
    expect(
      container.firstElementChild?.classList.contains('arco-radio-group-variant-outline'),
    ).toBe(true)
  })
})
