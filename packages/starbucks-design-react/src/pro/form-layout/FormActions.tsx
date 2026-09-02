import type { CSSProperties } from 'react'
import type { FormActionsProps } from './interface'

export function FormActions(props: FormActionsProps) {
  const { align = 'right', gap, sticky = false, children, className, style } = props

  return (
    <div
      className={[
        'sbux-pro-form-actions',
        `sbux-pro-form-actions-align-${align}`,
        sticky ? 'sbux-pro-form-actions-sticky' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...(gap === undefined ? {} : { gap }), ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}
