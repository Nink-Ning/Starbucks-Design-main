import type { PageFooterBarProps } from './interface'

export function PageFooterBar(props: PageFooterBarProps) {
  const { align = 'left', bordered = true, children, className, style } = props

  const cls = [
    'sbux-pro-page-footer-bar',
    `sbux-pro-page-footer-bar-align-${align}`,
    bordered ? 'sbux-pro-page-footer-bar-bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}
