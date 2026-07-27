import type { ReactNode } from 'react'
import type { PageHeaderProps } from '../page-header/interface'

export interface PageContainerProps extends PageHeaderProps {
  /** 内容区不套白卡片,供自由布局 */
  ghost?: boolean
  /** 整页加载态 */
  loading?: boolean
  /** 吸底位,配合 PageFooterBar(Vue 端 #footer slot) */
  footer?: ReactNode
  children?: ReactNode
}
