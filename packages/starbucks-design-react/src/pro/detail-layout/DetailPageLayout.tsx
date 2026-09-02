import type { CSSProperties } from 'react'
import type { DetailPageLayoutProps } from './interface'

export function DetailPageLayout(props: DetailPageLayoutProps) {
  const { maxWidth, gap, children, className, style } = props

  return (
    <div
      className={['sbux-pro-detail-page-layout', className].filter(Boolean).join(' ')}
      style={{
        ...(maxWidth === undefined ? {} : { maxWidth }),
        ...(gap === undefined ? {} : { gap }),
        ...style,
      } as CSSProperties}
    >
      {children}
    </div>
  )
}
