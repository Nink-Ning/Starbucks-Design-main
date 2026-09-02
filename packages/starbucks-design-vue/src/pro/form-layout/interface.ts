import type { StyleValue } from 'vue'

export interface FormPageLayoutProps {
  /** 内容最大宽度;默认 1120px,避免表单在超宽屏幕上无限拉伸 */
  maxWidth?: string | number
  /** 页面内容内边距;通常由 PageContainer 提供,需要独立使用时可自定义 */
  padding?: string | number
  /** 组标题后的辅助说明,默认通过 Tooltip 展示 */
  description?: string
  class?: string
  style?: StyleValue
}

export interface FormGridProps {
  /** 桌面端列数,默认两列 */
  columns?: number
  class?: string
  style?: StyleValue
}

export interface FormGridItemProps {
  /** 占用的列数;两列布局中 span=2 表示整行 */
  span?: number
  class?: string
  style?: StyleValue
}

export interface FormSectionProps {
  title?: string
  description?: string
  /** React actions 属性在 Vue 中对应 #extra 具名插槽 */
  /** 是否显示组标题下的分割线 */
  divider?: boolean
  /** 用于汇总校验错误并帮助页面定位到该组 */
  error?: boolean
  id?: string
  class?: string
  style?: StyleValue
}

export interface FormControlAreaProps {
  /** 控件区域的最小高度;默认与小尺寸表单控件对齐 */
  minHeight?: string | number
  align?: 'center' | 'start'
  class?: string
  style?: StyleValue
}

export interface FormActionsProps {
  align?: 'left' | 'center' | 'right' | 'between'
  gap?: string | number
  /** 是否吸附在当前滚动容器底部;默认不吸附 */
  sticky?: boolean
  class?: string
  style?: StyleValue
}

export interface StepFormLayoutProps {
  /** 通过 #steps 传入真实 Steps 组件,布局层不重实现步骤条 */
  /** 通过 #actions 传入操作区,对应 React actions 属性 */
  stickyActions?: boolean
  class?: string
  style?: StyleValue
}
