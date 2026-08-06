import type { StyleValue } from 'vue'
import type { DescData, DescLayout } from '@arco-design/web-vue/es/descriptions/interface'

export interface DetailPageLayoutProps {
  /** 详情内容最大宽度;默认不限制,由页面组合决定 */
  maxWidth?: string | number
  /** 页面区域之间的间距;默认 24px */
  gap?: string | number
  class?: string
  style?: StyleValue
}

export interface DetailPageHeaderProps {
  title?: string
  status?: string
  description?: string
  meta?: string
  backable?: boolean
  class?: string
  style?: StyleValue
}

export interface DetailSectionProps {
  title?: string
  description?: string
  divider?: boolean
  id?: string
  class?: string
  style?: StyleValue
}

export interface DetailDescriptionData extends Omit<DescData, 'value'> {
  value?: DescData['value'] | null
}

export interface DetailDescriptionsProps {
  /** 固定列数;缺省时按自身容器宽度自动使用 1/2/3 列 */
  column?: number
  data?: DetailDescriptionData[]
  title?: string
  layout?: DescLayout
  size?: 'mini' | 'small' | 'medium' | 'large'
  align?: 'center' | 'left' | 'right' | { label?: 'center' | 'left' | 'right'; value?: 'center' | 'left' | 'right' }
  bordered?: boolean
  labelStyle?: Record<string, string | number>
  valueStyle?: Record<string, string | number>
  tableLayout?: 'auto' | 'fixed'
  /** 传入后,空字符串、null、undefined 和 -- 会统一替换为该值 */
  emptyValue?: string
  class?: string
  style?: StyleValue
}
