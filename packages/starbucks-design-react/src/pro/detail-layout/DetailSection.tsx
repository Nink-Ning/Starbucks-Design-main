import { hasNode } from '../_utils/has-node'
import type { DetailSectionProps } from './interface'

export function DetailSection(props: DetailSectionProps) {
  const {
    title,
    description,
    actions,
    divider = false,
    id,
    children,
    className,
    style,
  } = props
  const hasHeader = hasNode(title) || hasNode(description) || hasNode(actions)

  return (
    <section
      id={id}
      className={[
        'sbux-pro-detail-section',
        divider ? 'sbux-pro-detail-section-divider' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {hasHeader && (
        <div className="sbux-pro-detail-section-header">
          <div className="sbux-pro-detail-section-heading">
            {hasNode(title) && <h2 className="sbux-pro-detail-section-title">{title}</h2>}
            {hasNode(description) && (
              <p className="sbux-pro-detail-section-description">{description}</p>
            )}
          </div>
          {hasNode(actions) && <div className="sbux-pro-detail-section-actions">{actions}</div>}
        </div>
      )}
      <div className="sbux-pro-detail-section-content">{children}</div>
    </section>
  )
}
