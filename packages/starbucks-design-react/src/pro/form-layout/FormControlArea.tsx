import type { CSSProperties } from 'react'
import type { FormControlAreaProps } from './interface'

export function FormControlArea(props: FormControlAreaProps) {
  const { minHeight, align = 'center', children, className, style } = props

  return (
    <div
      className={[
        'sbux-pro-form-control-area',
        `sbux-pro-form-control-area-align-${align}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...(minHeight === undefined ? {} : { minHeight }), ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}
