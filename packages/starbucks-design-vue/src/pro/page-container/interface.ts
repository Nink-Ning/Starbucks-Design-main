import type { PageHeaderProps } from '../page-header/interface'

export interface PageContainerProps extends Omit<PageHeaderProps, 'title'> {
  /** 页面标题;与 #title/#extra slot 均缺省时不渲染页头 */
  title?: string
  /** 内容区不套白卡片,供自由布局 */
  ghost?: boolean
  /** 整页加载态 */
  loading?: boolean
}
