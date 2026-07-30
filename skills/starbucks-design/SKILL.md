---
name: starbucks-design
description: >
  Starbucks Design 总控 Skill，用于在 Starbucks Design / DesignKit 项目中进行任务识别、
  架构判断、规则路由和质量收敛。适用于基于 Arco Design 二次封装的 React / Vue
  基础组件、业务组件、页面模板、业务模块、Design Token、Figma 对齐、React / Vue
  一致性、Docs Demo、HTML 零环境预览、AI Contract、Evaluator、质量审查和设计决策任务。
  用户提到 Starbucks Design、DesignKit、Arco Design、基础组件、业务组件、FilterBar、
  TableToolbar、页面模板、列表页、表单页、详情页、Dashboard、登录页、标签管理、
  Figma 对齐、Design Token、样式覆盖、Popup、Portal、React / Vue 对齐、Docs Preview、
  Preview Skill、代码质量检查、Git 或发布准备时使用本 Skill。
---

# Starbucks Design Skill

## 1. 定位

本 Skill 是 Starbucks Design / DesignKit 仓库的总控入口。

它只负责：

1. 判断任务类型和资产归属；
2. 选择 React、Vue、双端或 Preview 交付形式；
3. 路由到正确的 reference、agent-guideline、组件 Skill 和目标代码；
4. 提醒优先复用 Design Token、基础组件、业务组件和现有模板；
5. 标记验证范围、完成状态和未验证风险；
6. 防止未经授权的 Git、版本、发布和部署动作。

它不维护完整组件 API，不替代仓库规则、专项 guideline、Figma 设计资产、真实类型定义、测试、构建或浏览器验证。

## 2. 规则来源

规则优先级以根目录和局部 `AGENTS.md` 为最高依据，其次遵循已发布公共 API、兼容性约束、当前任务要求、Figma 设计资产和适用的 `agent-guidelines/`。

本 Skill 和 `references/` 只用于补充任务识别、架构判断、文件读取和设计决策，不得覆盖更高优先级规则。

如果规则冲突，先报告：

- 冲突规则；
- 受影响文件；
- 对公共 API、视觉或业务行为的影响；
- 推荐处理方式；
- 是否需要用户或设计负责人确认。

## 3. Skill 关系

| 资产 | 唯一职责 |
| --- | --- |
| `skills/starbucks-design/SKILL.md` | 总控入口、触发说明、索引和简要路由 |
| `skills/starbucks-design/references/architecture.md` | 架构边界、资产分层、依赖方向 |
| `skills/starbucks-design/references/task-routing.md` | 详细任务路由、读取最小集、验证和报告 |
| `skills/starbucks-design/references/design-decisions.md` | 布局、容器、操作、数据、筛选和响应式设计选型 |
| `skills/starbucks-design-react/` | React 组件 API、类型、导入和代码示例 |
| `skills/starbucks-design-vue/` | Vue 组件 Props、Events、Slots、导入和代码示例 |
| `skills/starbucks-design-react-preview/` | React CDN 单 HTML 运行方式 |
| `skills/starbucks-design-vue-preview/` | Vue CDN 单 HTML 运行方式 |
| `agent-guidelines/` | 基础组件、业务组件、FilterBar 等专项工程规则 |

组件属性、事件、类型、插槽和子组件用法，必须从 React / Vue 组件 Skill 或真实代码中确认，不得在总控 Skill 中猜测或重复维护。

Preview Skill 只负责零环境运行方式。生成 Preview 前，仍要按需读取对应 React 或 Vue 组件 reference。

## 4. 简洁任务路由表

| 任务类型 | 读取入口 |
| --- | --- |
| 基础组件样式调优、Token、Arco 覆盖、Popup / Portal | `task-routing.md` 路由 A；必要时读基础组件 guideline |
| 新业务组件、Schema、状态模型、AI Contract、Evaluator | `task-routing.md` 路由 B；读业务组件 guideline |
| 已有业务组件视觉优化 | `task-routing.md` 路由 C；按是否涉及基础样式读取对应 guideline |
| 页面模板或页面级组合 | `task-routing.md` 路由 D；必要时读 `design-decisions.md` |
| 布局、Modal / Drawer、筛选、表格、表单、响应式选型 | `design-decisions.md`；对应 `task-routing.md` 路由 E |
| React / Vue 工程代码生成 | `task-routing.md` 路由 F；读对应组件 Skill 和实际组件 reference |
| 单 HTML、无 Node 环境、CDN 预览 | `task-routing.md` 路由 G；读对应 Preview Skill 和组件 API |
| 代码、视觉、架构或发布准备审查 | `task-routing.md` 路由 H |
| Skill、reference、AI Contract、Evaluator 或黄金模板建设 | `task-routing.md` 路由 I |
| Git、PR、版本、发布、部署 | 仅用户明确要求时进入 `task-routing.md` 路由 J |

详细路由、文件读取最小集和验证范围以 `references/task-routing.md` 为准。

## 5. 路由使用方式

使用本 Skill 时，先做轻量判断，再进入对应详细路由。

1. 判断任务对象；
2. 判断动作类型；
3. 判断框架和交付形式；
4. 判断是否涉及架构边界；
5. 判断是否涉及设计选型；
6. 判断是否涉及专项 guideline；
7. 读取目标代码和实际组件 API；
8. 定义文件白名单和验证范围；
9. 执行实现、审查或分析；
10. 用证据报告完成状态。

任务对象速查：

| 对象 | 示例 | 边界来源 |
| --- | --- | --- |
| 基础组件 | Button、Input、Select、Table、Modal、Drawer、Trigger | `architecture.md` |
| 业务组件 | FilterBar、TableToolbar、BatchActions、ColumnSettings | `architecture.md` |
| 页面模板 | 筛选列表、标签管理、详情页、Dashboard、登录页 | `architecture.md` |
| 业务模块 | 门店管理、标签管理、权限管理、活动管理 | `architecture.md` |
| 设计选型 | Modal / Drawer、筛选结构、响应式、操作位置 | `design-decisions.md` |
| 组件 API | Props、Events、Slots、Types、导入路径 | React / Vue Skill |
| 运行方式 | CDN、单 HTML、全局对象、Preview 限制 | Preview Skill |

动作类型速查：

| 动作 | 先确认 |
| --- | --- |
| 新建 | 是否已有能力，是否需要公共 API，是否有复用证据 |
| 优化 | 行为是否保持，是否涉及 Token、Popup、Portal、双端 |
| 修复 | 根因归属，影响范围，是否破坏兼容性 |
| 生成 | 框架、交付形式、最近似模板、所需组件 |
| 审查 | 代码证据、测试证据、构建证据、浏览器证据 |
| 重构 | 是否用户明确要求，是否存在更小方案 |
| Git / 发布 | 是否用户明确授权，验证和白名单是否清楚 |

## 6. 框架和交付形式选择

用户明确指定 React、Vue、双端或 Preview 时，按用户要求执行。

用户未指定时，按以下顺序判断：

1. 当前目标文件或目录；
2. 已有最近似实现；
3. 是否属于公共基础组件、业务组件、共享 Token 或双端页面模板；
4. 是否要求无环境、单 HTML 或 CDN 预览；
5. 仓库约定和当前任务上下文；
6. 若选择会明显影响交付结果且无法判断，再提出必要澄清。

默认规则：

- 公共基础组件、公共业务组件、共享 Token、公共 Docs 能力通常需要 React / Vue 双端一致；
- 页面模板在仓库已有双端体系时默认保持 React / Vue 用户可见行为等价；
- 单次原型或 Preview 只有在用户明确指定单框架或零环境交付时才走单端；
- 生产代码不得创建 React 到 Vue 或 Vue 到 React 的运行时依赖。

## 7. 按需读取原则

Skill 被触发后，本文件已作为入口读取。后续不要全量读取所有 reference。

正确方式：

1. 先分类任务；
2. 命中具体路由；
3. 只读取该路由需要的 reference、guideline、目标代码和实际组件 API；
4. 只在涉及资产归属、组件封装、依赖方向或公共 API 时读取 `architecture.md`；
5. 只在涉及布局、容器、操作、筛选、表单、详情、Dashboard 或响应式选型时读取 `design-decisions.md`；
6. 简单组件 API 查询只读取对应 React / Vue Skill 和实际组件 reference；
7. 验证项目按当前任务影响范围选择，未执行的验证必须明确标记。

不得因为页面使用 Table 就读取全部组件文档；不得因为命中本 Skill 就读取所有 `agent-guidelines/`。

## 8. 最小读取示例

以下示例只用于帮助确定读取范围，详细规则仍以 `task-routing.md` 为准。

基础组件样式修复：

- `AGENTS.md`；
- 基础组件 guideline；
- 目标 React / Vue 实现；
- 目标样式；
- 目标 Docs 或 Preview；
- 目标 Tests；
- 相关 Token；
- 只读取实际涉及组件的 reference。

新业务组件：

- `AGENTS.md`；
- 业务组件 guideline；
- `architecture.md`；
- 相似业务组件；
- 可复用基础组件；
- 实际使用组件 reference；
- React / Vue 实现结构；
- Docs、AI Contract、Evaluator、Tests。

页面模板：

- `AGENTS.md`；
- 最近似页面模板；
- 页面路由与 Demo 挂载；
- 所需业务组件；
- 所需基础组件 reference；
- 页面级样式和测试；
- 只有涉及设计选型时读取 `design-decisions.md`；
- 只有涉及资产归属时读取 `architecture.md`。

React / Vue 代码片段：

- 对应 React 或 Vue Skill；
- 实际使用组件 reference；
- 目标工程目录或最近似实现。

Preview：

- 对应 Preview Skill；
- 对应开发版组件 Skill；
- 实际使用组件 reference；
- 必要的设计决策 reference。

质量审查：

- `AGENTS.md`；
- 目标代码或 diff；
- 相关 guideline；
- 必要的架构或路由 reference；
- Tests、Build、Docs、Browser 证据。

## 9. 验证证据速查

验证不是固定清单，而是按当前任务影响范围选择。

常见证据：

| 证据 | 说明 |
| --- | --- |
| 代码证据 | 目标实现、diff、类型定义、导出边界 |
| 测试证据 | 单元、交互、契约、模板或样式回归测试 |
| 构建证据 | React build、Vue build、Docs build、typecheck、lint |
| Docs 证据 | Docs 真实组件、Demo、源码查看、Preview 挂载 |
| 浏览器证据 | 实际页面渲染、交互、控制台、Popup / Portal |

报告时必须区分：

- 已实际运行并通过；
- 已检查但未运行；
- 因环境或权限未验证；
- 与当前任务无关；
- 阻塞且需要确认。

未执行的测试、构建或浏览器检查不得写成已通过。

## 10. references 索引

| 文件 | 何时读取 |
| --- | --- |
| `references/architecture.md` | 需要判断基础组件、业务组件、页面模板、业务模块边界，或涉及公共 API、依赖方向、包导出、Skill 职责时 |
| `references/task-routing.md` | 需要执行、修改、审查或验证 Starbucks Design 任务时 |
| `references/design-decisions.md` | 需要进行布局、容器、操作、筛选、表单、详情、Dashboard 或响应式设计选型时 |

## 11. 专项 guideline 索引

| 文件 | 何时读取 |
| --- | --- |
| `agent-guidelines/designkit-base-component-style-optimization-guideline.md` | 基础组件样式调优、Figma 对齐、Token、CSS 权重、Arco 覆盖、Popup / Portal |
| `agent-guidelines/designkit-business-component-development-guideline.md` | 新业务组件、业务组件 API / Schema / 状态模型 / Docs / Tests / AI Contract / Evaluator |
| `agent-guidelines/designkit-filterbar-codex-master-prompt.md` | 主要目标是 `FilterBar` 时 |

## 12. 组件和 Preview Skill 索引

| Skill | 何时读取 |
| --- | --- |
| `skills/starbucks-design-react/SKILL.md` | React 工程代码、React 组件 API、导入、类型和子组件用法 |
| `skills/starbucks-design-vue/SKILL.md` | Vue 工程代码、Vue Props / Events / Slots、导入和组件标签用法 |
| `skills/starbucks-design-react-preview/SKILL.md` | React 单 HTML、CDN、无 Node 环境预览 |
| `skills/starbucks-design-vue-preview/SKILL.md` | Vue 单 HTML、CDN、无 Node 环境预览 |

## 13. scripts 处理

`skills/starbucks-design/scripts/` 只用于存放已评审、已验证、可复制的黄金模板。

当前目录为空时：

1. 不假设存在可复制模板；
2. 先按 `task-routing.md` 和相关 reference 查找仓库内最近似实现；
3. 按需读取组件 API；
4. 生成或修改后用验证结果决定是否建议沉淀为黄金模板。

不得把占位、未验证实验代码、静态截图或绕过真实组件的模拟实现放入 `scripts/`。

## 14. Git、发布和部署安全

默认工作流只到实现和验证。

除非用户明确要求，不执行：

- `git add`；
- stage、commit、push、PR；
- 创建或切换分支；
- 修改版本号；
- 修改包导出；
- 发布 npm 包；
- 部署 Docs；
- 创建 Release。

如果用户要求进入 Git 或发布流程，按 `task-routing.md` 路由 J 和根 `AGENTS.md` 执行，并先确认范围、验证结果和文件白名单。

## 15. 完成状态

| 状态 | 含义 |
| --- | --- |
| `COMPLETE` | 目标完成，适用验证已实际通过，无未解决高风险问题 |
| `CONDITIONAL` | 实现或分析完成，但缺少部分验证或外部证据，风险已说明 |
| `PARTIAL` | 只完成部分范围、部分状态或部分框架 |
| `BLOCKED` | 受规则冲突、权限、依赖、环境或外部信息阻塞 |
| `NOT STARTED` | 尚未执行，只有方案、目录或占位 |

未实际运行的测试、构建或浏览器检查不得描述为已通过。

## 16. 完成前检查

完成 Starbucks Design 任务前，确认：

1. 任务分类和路由正确；
2. 没有覆盖更高优先级规则；
3. 没有重复维护组件 API；
4. 没有误改公共 API、依赖、版本或包导出；
5. 没有无授权 Git、发布或部署动作；
6. 已按影响范围验证，未验证项已说明；
7. 文件修改保持在任务白名单内。
