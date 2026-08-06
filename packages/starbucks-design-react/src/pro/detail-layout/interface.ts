import type { CSSProperties, ReactNode } from 'react'
import type { DescriptionsProps } from '@arco-design/web-react/es/descriptions/interface'

export interface DetailPageLayoutProps {
  /** 详情内容最大宽度;默认不限制,由页面组合决定 */
  maxWidth?: CSSProperties['maxWidth']
  /** 页面区域之间的间距;默认 24px */
  gap?: CSSProperties['gap']
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface DetailPageHeaderProps {
  title: ReactNode
  status?: ReactNode
  description?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  /** 是否显示可访问的返回按钮 */
  backable?: boolean
  onBack?: () => void
  className?: string
  style?: CSSProperties
}

export interface DetailSectionProps {
  title?: ReactNode
  description?: ReactNode
  /** Section 内的轻量操作,不承担页面主操作 */
  actions?: ReactNode
  divider?: boolean
  id?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export type DetailDescriptionData = NonNullable<DescriptionsProps['data']>[number]

export interface DetailDescriptionsProps
  extends Omit<DescriptionsProps, 'className' | 'column' | 'data' | 'style'> {
  /** 固定列数;缺省时按自身容器宽度自动使用 1/2/3 列 */
  column?: number
  data?: DetailDescriptionData[]
  /** 传入后,空字符串、null、undefined 和 -- 会统一替换为该值 */
  emptyValue?: ReactNode
  className?: string
  style?: CSSProperties
}
