import type { CSSProperties, ReactNode } from 'react'

export interface PageHeaderProps {
  /** 页面标题(Figma 1804:5416:16px/600);Vue 端 title prop + #title slot 的合并形态 */
  title?: ReactNode
  /** 标题右侧帮助气泡内容;缺省不渲染帮助图标 */
  helpText?: string
  /** 帮助气泡尾部「查看更多」链接;仅 helpText 存在时生效 */
  helpLink?: string
  /** 子页面形态:标题左侧渲染返回箭头(Figma 2015:24564) */
  backable?: boolean
  /** 返回箭头点击(Vue 端 @back) */
  onBack?: () => void
  /** 右上操作区(Vue 端 #extra slot) */
  extra?: ReactNode
  className?: string
  style?: CSSProperties
}
