import { Radio as ArcoRadio } from '@arco-design/web-react'
import type { RadioGroupProps, RadioProps } from '@arco-design/web-react'
import type { PropsWithChildren } from 'react'

export type RadioButtonVariant = 'outline' | 'primary-filled' | 'default-filled'

export interface StarbucksRadioGroupProps extends RadioGroupProps {
  /**
   * Button group visual style. Only applies when `type="button"`.
   */
  variant?: RadioButtonVariant
}

const variantClassNames: Record<RadioButtonVariant, string> = {
  outline: 'arco-radio-group-variant-outline',
  'primary-filled': 'arco-radio-group-variant-primary-filled',
  'default-filled': 'arco-radio-group-variant-default-filled',
}

function mergeClassName(
  className: RadioGroupProps['className'],
  variantClassName: string | undefined,
) {
  if (!variantClassName) {
    return className
  }

  return Array.isArray(className)
    ? [...className, variantClassName]
    : className
      ? [className, variantClassName]
      : variantClassName
}

function StarbucksRadioGroup({
  variant,
  className,
  ...props
}: PropsWithChildren<StarbucksRadioGroupProps>) {
  return (
    <ArcoRadio.Group
      {...props}
      className={mergeClassName(className, variant ? variantClassNames[variant] : undefined)}
    />
  )
}

StarbucksRadioGroup.displayName = 'Radio.Group'

function StarbucksRadio(props: RadioProps) {
  return <ArcoRadio {...props} />
}

export const Radio = Object.assign(StarbucksRadio, ArcoRadio, {
  Group: StarbucksRadioGroup,
})
