import { Button } from '@arco-design/web-react'
import { IconLeft } from '@arco-design/web-react/icon'
import { hasNode } from '../_utils/has-node'
import type { DetailPageHeaderProps } from './interface'

export function DetailPageHeader(props: DetailPageHeaderProps) {
  const {
    title,
    status,
    description,
    meta,
    actions,
    backable = false,
    onBack,
    className,
    style,
  } = props

  return (
    <header
      className={['sbux-pro-detail-page-header', className].filter(Boolean).join(' ')}
      style={style}
    >
      <div className="sbux-pro-detail-page-header-main">
        {backable && (
          <Button
            className="sbux-pro-detail-page-header-back"
            type="text"
            shape="circle"
            icon={<IconLeft />}
            aria-label="返回"
            onClick={onBack}
          />
        )}
        <div className="sbux-pro-detail-page-header-content">
          <div className="sbux-pro-detail-page-header-title-row">
            <h1 className="sbux-pro-detail-page-header-title">{title}</h1>
            {hasNode(status) && (
              <div className="sbux-pro-detail-page-header-status">{status}</div>
            )}
          </div>
          {hasNode(description) && (
            <p className="sbux-pro-detail-page-header-description">{description}</p>
          )}
          {hasNode(meta) && <div className="sbux-pro-detail-page-header-meta">{meta}</div>}
        </div>
      </div>
      {hasNode(actions) && <div className="sbux-pro-detail-page-header-actions">{actions}</div>}
    </header>
  )
}
