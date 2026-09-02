import type { CSSProperties, ReactNode } from 'react'

export interface FormPageLayoutProps {
  /** 内容最大宽度;默认 1120px,避免表单在超宽屏幕上无限拉伸 */
  maxWidth?: CSSProperties['maxWidth']
  /** 页面内容内边距;通常由 PageContainer 提供,需要独立使用时可自定义 */
  padding?: CSSProperties['padding']
  /** 组标题后的辅助说明,默认通过 Tooltip 展示 */
  description?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface FormGridProps {
  /** 桌面端列数,默认两列 */
  columns?: number
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface FormGridItemProps {
  /** 占用的列数;两列布局中 span=2 表示整行 */
  span?: number
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface FormSectionProps {
  title?: ReactNode
  description?: ReactNode
  /** 组尾部的可选业务操作,不负责具体按钮行为 */
  actions?: ReactNode
  /** 是否显示组标题下的分割线 */
  divider?: boolean
  /** 用于汇总校验错误并帮助页面定位到该组 */
  error?: boolean
  id?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface FormControlAreaProps {
  /** 控件区域的最小高度;默认与小尺寸表单控件对齐 */
  minHeight?: CSSProperties['minHeight']
  align?: 'center' | 'start'
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface FormActionsProps {
  align?: 'left' | 'center' | 'right' | 'between'
  gap?: CSSProperties['gap']
  /** 是否吸附在当前滚动容器底部;默认不吸附 */
  sticky?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface StepFormLayoutProps {
  /** 由调用方传入真实 Steps 组件,布局层不重实现步骤条 */
  steps?: ReactNode
  /** 由调用方传入 FormActions 或其他操作区内容 */
  actions?: ReactNode
  /** 操作区是否吸附在当前滚动容器底部 */
  stickyActions?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}
