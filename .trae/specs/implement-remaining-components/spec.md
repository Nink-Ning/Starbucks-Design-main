# Implement Remaining Components Spec

## Why
在 `COMPONENT-PLAN.md` 中定义了大量需要补全的中低优先级组件以及针对特定 Vue 组件的 React 版本。目前仅完成了中优先级的前两个组件（PPopover 和 PCollapse），因此需要继续完成剩余所有规划组件的开发与文档编写。

## What Changes
- 实现以下中优先级组件的 Vue 和 React 版本及其文档示例：
  - PAvatar, PDescriptions, PEmpty, PImage, PTimeline, PResult, PSkeleton, PStatistic
- 实现以下低优先级组件的 Vue 和 React 版本及其文档示例：
  - PTypography, PGrid, PMenu, PBreadcrumb, PCascader, PSlider, PRate, PUpload, PTreeSelect, PAutoComplete, PColorPicker, PMentions, PCarousel
- 在相应的组件入口（如 `components.ts`、`index.ts`）统一导出上述新增组件
- 更新 VitePress 侧边栏配置文件 `.vitepress/config.ts`，加入新组件的文档导航链接

## Impact
- Affected specs: 无（仅新增组件）
- Affected code:
  - `packages/starbucks-ui-react/src/components/*`
  - `packages/starbucks-ui-vue/components/*`
  - `packages/starbucks-ui-react/src/index.ts`
  - `packages/starbucks-ui-vue/components/components.ts`
  - `packages/docs/guide/components/*`
  - `packages/docs/guide/demo/*`
  - `packages/docs/react/components/*`
  - `packages/docs/react/demo/*`
  - `packages/docs/.vitepress/config.ts`

## ADDED Requirements
### Requirement: New Components
The system SHALL provide the remaining components defined in `COMPONENT-PLAN.md` for both React and Vue, properly exported and thoroughly documented with examples.

#### Scenario: Success case
- **WHEN** user imports `PAvatar` (or other remaining components) from `@sbux/starbucks-ui` or `@sbux/starbucks-ui-react`
- **THEN** the component is correctly rendered
- **WHEN** user visits the document site
- **THEN** they can view the component docs and see working examples using `preview` (Vue) or `ReactWrapper` (React)
