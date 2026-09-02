import type { CSSProperties } from 'react'
import type { FormPageLayoutProps } from './interface'

export function FormPageLayout(props: FormPageLayoutProps) {
  const { maxWidth, padding, description, children, className, style } = props

  return (
    <div
      className={['sbux-pro-form-page-layout', className].filter(Boolean).join(' ')}
      style={{ ...(maxWidth === undefined ? {} : { maxWidth }), ...(padding === undefined ? {} : { padding }), ...style } as CSSProperties}
    >
      {description && <p className="sbux-pro-form-page-layout-description">{description}</p>}
      {children}
    </div>
  )
}
