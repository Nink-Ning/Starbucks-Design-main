import type { CSSProperties } from 'react'
import type { FormGridItemProps, FormGridProps } from './interface'

export function FormGrid(props: FormGridProps) {
  const { columns, children, className, style } = props

  return (
    <div
      className={['sbux-pro-form-grid', className].filter(Boolean).join(' ')}
      style={{ ...(columns === undefined ? {} : { '--sbux-pro-form-grid-columns': columns }), ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function FormGridItem(props: FormGridItemProps) {
  const { span, children, className, style } = props
  const safeSpan = span === undefined ? undefined : Math.max(1, span)

  return (
    <div
      className={['sbux-pro-form-grid-item', className].filter(Boolean).join(' ')}
      style={{ ...(safeSpan === undefined ? {} : { '--sbux-pro-form-grid-item-span': safeSpan }), ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}
