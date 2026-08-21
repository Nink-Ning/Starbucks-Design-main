// Arco and designer component styles load first; theme.css supplies the
// designer-authored runtime variables that those overrides consume.
import './components.less'
import './theme.css'

export { FilterBar } from './business/filter-bar'
export type {
  CascaderFilterField,
  CascaderOption,
  DateFilterField,
  DateRangeFilterField,
  FilterActionSource,
  FilterBarColumns,
  FilterBarEmits,
  FilterBarProps,
  FilterEventMeta,
  FilterFieldSchema,
  FilterOption,
  FilterRenderFieldContext,
  FilterRule,
  FilterSubmitMode,
  FilterTexts,
  FilterValidationError,
  FilterValue,
  InputFilterField,
  MultiSelectFilterField,
  SelectFilterField,
  TreeSelectFilterField,
  TreeSelectOption
} from './business/filter-bar'
export { TagGroupManagement } from './business/tag-group-management'
export type {
  TagGroupContentContext,
  TagGroupContentSlotContext,
  TagGroupDeleteConfirm,
  TagGroupDeleteConfirmOptions,
  TagGroupEmptyContext,
  TagGroupEmptySlotContext,
  TagGroupEventMeta,
  TagGroupEventSource,
  TagGroupItem,
  TagGroupManagementEmits,
  TagGroupManagementProps,
  TagGroupManagementTexts
} from './business/tag-group-management'
export { TableToolbar } from './business/table-toolbar'
export type {
  TableToolbarAction,
  TableToolbarButtonGroupFilter,
  TableToolbarButtonType,
  TableToolbarDateRangeFilter,
  TableToolbarEmits,
  TableToolbarOperationEventMeta,
  TableToolbarOption,
  TableToolbarPrimitiveValue,
  TableToolbarProps,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterBase,
  TableToolbarQuickFilterEventMeta,
  TableToolbarQuickFilterPlacement,
  TableToolbarQuickFilterSource,
  TableToolbarQuickFilterValues,
  TableToolbarSearchFilter,
  TableToolbarSelectFilter,
  TableToolbarTexts,
  TableToolbarToolConfig,
  TableToolbarToolEventMeta,
  TableToolbarToolName,
  TableToolbarTools
} from './business/table-toolbar'
export * from '@arco-design/web-vue'

// Arco's main entry only re-exports addI18nMessages, useLocale, getLocale from locale —
// useI18n and the locale types (ArcoLang, ArcoI18nMessages, etc.) are missing.
// Re-export everything from locale/* so consumers get the full i18n surface.
export * from '@arco-design/web-vue/es/locale'
export type * from '@arco-design/web-vue/es/locale/interface'

// Locale language objects (zhCN, enUS, etc.) are NOT re-exported here —
// they are default exports from individual lang files and export * won't pick
// them up. Consumers should deep-import them, same pattern as icons:
//   import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
