import { Spin } from '@arco-design/web-react'
import { PageHeader } from '../page-header'
import { hasNode } from '../_utils/has-node'
import type { PageContainerProps } from './interface'

export function PageContainer(props: PageContainerProps) {
  const {
    title,
    helpText,
    helpLink,
    backable,
    onBack,
    extra,
    ghost = false,
    loading = false,
    footer,
    children,
    className,
    style,
  } = props

  const hasHeader = hasNode(title) || hasNode(extra)

  return (
    <div className={['sbux-pro-page-container', className].filter(Boolean).join(' ')} style={style}>
      {hasHeader && (
        <PageHeader
          className="sbux-pro-page-container-header"
          title={title}
          helpText={helpText}
          helpLink={helpLink}
          backable={backable}
          onBack={onBack}
          extra={extra}
        />
      )}
      <Spin loading={loading} className="sbux-pro-page-container-spin">
        <div
          className={[
            'sbux-pro-page-container-body',
            ghost ? 'sbux-pro-page-container-body-ghost' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </Spin>
      {hasNode(footer) && <div className="sbux-pro-page-container-footer">{footer}</div>}
    </div>
  )
}
