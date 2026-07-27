import type { CSSProperties, ReactNode } from 'react'

export interface PageFooterBarProps {
  /** 内容对齐;设计稿表单页底栏为左对齐(2015:24994) */
  align?: 'left' | 'right'
  /** 顶部分割线 */
  bordered?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}
