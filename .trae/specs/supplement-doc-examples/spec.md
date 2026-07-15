# 补充文档示例及 API Spec

## Why
在 `COMPONENT-PLAN.md` 中，我们定义了组件库中各个组件需要实现的示例场景。目前对于中低优先级的组件（PAvatar, PDescriptions, PEmpty 等共计23个组件），其文档（Vue 和 React 版本）中仅包含 `basic` 基本使用示例，且 API 处多为引用“参考 Ant Design”的说明。为了使组件文档更加完整和独立，帮助开发者更好地理解和使用组件库，需要补充这些组件缺失的示例代码，移除依赖 Antd 的描述文字，并补充完整的组件 API 表格。

## What Changes
- 为 10 个中优先级组件补充缺失的 Vue 和 React 示例代码。
- 为 13 个低优先级组件补充缺失的 Vue 和 React 示例代码。
- 更新对应的 Markdown 文档：引入新增的示例；移除“更多属性请参考 Ant Design...”等类似字样；在文档末尾补充该组件详尽的 API 表格说明。
- 补充的示例应参考 `COMPONENT-PLAN.md` 中的要求。

## Impact
- Affected specs: 组件示例文档及 API 展示（Vue 和 React）
- Affected code: 
  - `packages/docs/guide/components/*.md` 和 `packages/docs/guide/demo/*/*.vue`
  - `packages/docs/react/components/*.md` 和 `packages/docs/react/demo/*/*.tsx`

## ADDED Requirements
### Requirement: 完善中低优先级组件示例与 API
系统应该为所有中低优先级组件提供包括但不限于基本使用之外的其他配置示例，并在文档中列出完整的 API 说明，不依赖外部链接。

#### Scenario: 用户查阅组件文档
- **WHEN** 用户在文档站点查看组件如 PAvatar
- **THEN** 能够看到多种用法的示例演示和对应代码，以及该组件完整的 API 属性列表。
