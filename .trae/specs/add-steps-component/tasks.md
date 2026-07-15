# Tasks
- [x] Task 1: 创建 React 步骤条组件 `PSteps`
  - [x] SubTask 1.1: 在 `packages/starbucks-ui-react/src/components/PSteps/index.tsx` 创建组件，使用 `forwardRef` 透传 antd `Steps`。
  - [x] SubTask 1.2: 在 `packages/starbucks-ui-react/src/index.ts` 中导出 `PSteps`。
- [x] Task 2: 重构 Vue 步骤条组件 `PSteps`
  - [x] SubTask 2.1: 将 `packages/starbucks-ui-vue/components/steps/PSteps.vue` 复制/重命名为 `PStepsOld.vue` 以保留代码。
  - [x] SubTask 2.2: 在 `packages/starbucks-ui-vue/components/steps/PSteps.vue` 新建代码，透传 `ant-design-vue` 的 `Steps` 和 `Step`（类似于原生使用方式）。
- [x] Task 3: 补充/更新文档示例
  - [x] SubTask 3.1: 在 `packages/docs/react/demo/steps/basic.tsx` 编写 React 基础示例。
  - [x] SubTask 3.2: 更新 `packages/docs/guide/demo/steps/basic.vue` 以匹配新版 Vue 步骤条的用法。
- [x] Task 4: 补充/更新组件说明文档与 API
  - [x] SubTask 4.1: 新增 `packages/docs/react/components/steps.md`，引入 React 示例并编写 API 表格（注意转义）。
  - [x] SubTask 4.2: 更新 `packages/docs/guide/components/steps.md`，引入 Vue 示例并更新 API 表格（注意转义）。
  - [x] SubTask 4.3: 在 `packages/docs/.vitepress/config.ts` 中，为 React 的导航组件侧边栏增加 `{ text: '步骤条 PSteps', link: '/react/components/steps' }` 入口（Vue 侧已有则保持）。

# Task Dependencies
- [Task 3] depends on [Task 1] and [Task 2]
- [Task 4] depends on [Task 3]
