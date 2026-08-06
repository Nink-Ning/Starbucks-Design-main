// @sbux/starbucks-design-react/pro — 模式类基础业务组件(L1~L4)
// 规格:docs/superpowers/specs/2026-07-16-pro-components-implementation-design.md
import './page-header/style.less'
import './page-footer-bar/style.less'
import './page-container/style.less'
import './form-layout/style.less'
import './detail-layout/style.less'

export { PageHeader } from './page-header'
export type { PageHeaderProps } from './page-header'
export { PageFooterBar } from './page-footer-bar'
export type { PageFooterBarProps } from './page-footer-bar'
export { PageContainer } from './page-container'
export type { PageContainerProps } from './page-container'
export {
  FormActions,
  FormControlArea,
  FormGrid,
  FormGridItem,
  FormPageLayout,
  FormSection,
  StepFormLayout,
} from './form-layout'
export type {
  FormActionsProps,
  FormControlAreaProps,
  FormGridItemProps,
  FormGridProps,
  FormPageLayoutProps,
  FormSectionProps,
  StepFormLayoutProps,
} from './form-layout'
export {
  DetailDescriptions,
  DetailPageHeader,
  DetailPageLayout,
  DetailSection,
} from './detail-layout'
export type {
  DetailDescriptionData,
  DetailDescriptionsProps,
  DetailPageHeaderProps,
  DetailPageLayoutProps,
  DetailSectionProps,
} from './detail-layout'
