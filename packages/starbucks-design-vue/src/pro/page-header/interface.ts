export interface PageHeaderProps {
  /** 页面标题(Figma 1804:5416:16px/600) */
  title: string
  /** 标题右侧帮助气泡内容;缺省不渲染帮助图标 */
  helpText?: string
  /** 帮助气泡尾部「查看更多」链接;仅 helpText 存在时生效 */
  helpLink?: string
  /** 子页面形态:标题左侧渲染返回箭头(Figma 2015:24564) */
  backable?: boolean
}
