import { hasNode } from '../_utils/has-node'
import type { StepFormLayoutProps } from './interface'

export function StepFormLayout(props: StepFormLayoutProps) {
  const { steps, actions, stickyActions = false, children, className, style } = props

  return (
    <div
      className={[
        'sbux-pro-step-form-layout',
        stickyActions ? 'sbux-pro-step-form-layout-sticky-actions' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {hasNode(steps) && <div className="sbux-pro-step-form-layout-steps">{steps}</div>}
      <div className="sbux-pro-step-form-layout-content">{children}</div>
      {hasNode(actions) && <div className="sbux-pro-step-form-layout-actions">{actions}</div>}
    </div>
  )
}
