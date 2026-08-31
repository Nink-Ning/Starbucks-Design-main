import { Button, Link, Tooltip } from '@arco-design/web-react'
import { IconLeft, IconQuestionCircle } from '@arco-design/web-react/icon'
import { hasNode } from '../_utils/has-node'
import type { PageHeaderProps } from './interface'

export function PageHeader(props: PageHeaderProps) {
  const { title, helpText, helpLink, backable = false, onBack, extra, className, style } = props

  return (
    <div className={['sbux-pro-page-header', className].filter(Boolean).join(' ')} style={style}>
      <div className="sbux-pro-page-header-main">
        {backable && (
          <Button
            className="sbux-pro-page-header-back"
            type="secondary"
            shape="square"
            icon={<IconLeft />}
            aria-label="返回上一级"
            onClick={onBack}
          />
        )}
        <span className="sbux-pro-page-header-title">{title}</span>
        {helpText && (
          <Tooltip
            position="bottom"
            content={
              <span>
                {helpText}
                {helpLink && (
                  <Link
                    className="sbux-pro-page-header-help-link"
                    href={helpLink}
                    target="_blank"
                  >
                    查看更多
                  </Link>
                )}
              </span>
            }
          >
            <span className="sbux-pro-page-header-help-trigger" tabIndex={0} role="img" aria-label="页面帮助">
              <IconQuestionCircle className="sbux-pro-page-header-help" />
            </span>
          </Tooltip>
        )}
      </div>
      {hasNode(extra) && <div className="sbux-pro-page-header-extra">{extra}</div>}
    </div>
  )
}
