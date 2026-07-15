# 步骤条组件 (Steps) Spec

## Why
目前的组件库缺少基于标准 antd 风格的步骤条组件。虽然 Vue 端之前封装过一个自定义样式的 `PSteps`，但为了提供统一的、基于 antd 规范的步骤条，需要在 React 和 Vue 两端均开发标准的 `PSteps` 组件。同时需要保留 Vue 原有的自定义步骤条代码以备不时之需。

## What Changes
### React 端
- 在 `packages/starbucks-ui-react/src/components` 下新增 `PSteps` 组件，基于 `antd` 的 `Steps`。
- 在 `packages/starbucks-ui-react/src/index.ts` 统一导出。
- 在 `packages/docs/react/demo/steps` 目录下新增 React 示例。
- 在 `packages/docs/react/components/steps.md` 下新增 React 组件说明与 API 表格。
- 在 `packages/docs/.vitepress/config.ts` 中为 React 的导航组件侧边栏增加“步骤条 PSteps”入口。

### Vue 端
- 将原有 `packages/starbucks-ui-vue/components/steps/PSteps.vue` 重命名为 `PStepsOld.vue` 以保留旧版代码。
- 在 `packages/starbucks-ui-vue/components/steps/` 新建 `PSteps.vue`，基于 `ant-design-vue` 的 `Steps` 和 `Step` 重新封装。
- 确保 `packages/starbucks-ui-vue/components/steps/index.ts` 导出新的 `PSteps`。
- 更新或补充 `packages/docs/guide/demo/steps/` 下的 Vue 示例代码，以适应新版 `PSteps`。
- 更新 `packages/docs/guide/components/steps.md` 中的文档与 API 表格。

## Impact
- Affected specs: 统一了 React 和 Vue 端的多步骤流程导航功能，回归 antd 默认交互与样式。
- Affected code:
  - `packages/starbucks-ui-react/src/components/PSteps/index.tsx` (新增)
  - `packages/starbucks-ui-react/src/index.ts` (修改)
  - `packages/docs/react/demo/steps/*` (新增)
  - `packages/docs/react/components/steps.md` (新增)
  - `packages/docs/.vitepress/config.ts` (修改)
  - `packages/starbucks-ui-vue/components/steps/PSteps.vue` (重构为新版)
  - `packages/starbucks-ui-vue/components/steps/PStepsOld.vue` (旧版保留)
  - `packages/docs/guide/demo/steps/*` (修改)
  - `packages/docs/guide/components/steps.md` (修改)

## ADDED Requirements
### Requirement: 新增标准的 React 和 Vue PSteps 组件
系统需提供基于 antd 标准风格的步骤条组件。

#### Scenario: 渲染步骤条并高亮当前步骤
- **WHEN** 开发者使用 `<PSteps current={1} items={[{ title: 'Step 1' }, { title: 'Step 2' }]} />` (React) 或相应的 Vue 写法。
- **THEN** 页面上应渲染出无强定制（非箭头）的标准步骤节点，正常响应。
