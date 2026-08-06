import { hasNode } from '../_utils/has-node'
import type { FormSectionProps } from './interface'

export function FormSection(props: FormSectionProps) {
  const {
    title,
    description,
    actions,
    divider = false,
    error = false,
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
        'sbux-pro-form-section',
        divider ? 'sbux-pro-form-section-divider' : '',
        error ? 'sbux-pro-form-section-error' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-section-error={error || undefined}
      style={style}
    >
      {hasHeader && (
        <div className="sbux-pro-form-section-header">
          <div className="sbux-pro-form-section-heading">
            {hasNode(title) && <h2 className="sbux-pro-form-section-title">{title}</h2>}
            {hasNode(description) && (
              <p className="sbux-pro-form-section-description">{description}</p>
            )}
          </div>
          {hasNode(actions) && <div className="sbux-pro-form-section-actions">{actions}</div>}
        </div>
      )}
      <div className="sbux-pro-form-section-content">{children}</div>
    </section>
  )
}
