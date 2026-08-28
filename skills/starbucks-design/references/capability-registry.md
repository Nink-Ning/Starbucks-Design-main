# DesignKit Capability Registry

本文件登记 DesignKit 当前可被 AI 发现的能力、交付 Profile、知识完整度和迁移状态。它是 Knowledge Layer 的能力索引，不是组件 API、Runtime Manifest、页面模板或发布清单。能力对应的 Decision → Template → Golden → Validation 链路读取 [Golden Example Mapping](golden-example-mapping.md)；验证目标读取 [Validation Contract](validation/validation-contract.md)，实际结果按 [Evidence Model](validation/evidence-model.md) 记录。

## 1. Profile boundary

### Starter Profile

Starter Profile 面向 Non-Developer Edition AI Starter。它只生成使用固定 Starter Runtime、本地 Mock 数据和少量页面脚本的单文件 HTML Demo，不生成 React/Vue 工程。

当前 Starter V1 只支持：

- Basic List；
- Card List；
- Basic Form；
- Basic Detail；
- `starter.pattern.default-application-shell` 固定组合；
- 上述模板明确允许的 TableToolbar、Quick Filter、本地选择和轻量批量操作子集。

### Docs Full Profile

Docs Full Profile 记录完整 React/Vue 组件、业务组件和页面模板能力，服务于设计系统维护与工程接入。Docs Full Profile 中存在实现、文档或 Demo，不代表 Starter Profile 已支持该能力。

### Invariant

```text
Runtime export or Docs implementation
                !=
Starter Profile support
```

AI 只有在能力的 `Profile` 包含 `Starter`，并且 Starter Skill、对应模板和允许的 Runtime API 子集均明确登记时，才能将该能力用于 Starter 输出。`DOCS_ONLY`、`OUTDATED`、`UNSUPPORTED` 和 `PROPOSED` 能力不得因为 Runtime 或 Docs 中存在相关实现而进入 Starter 生成。

### Canonical boundary decisions

Capability Registry 是 Starter 能力范围的唯一授权层。Template、Golden、Runtime 或 Demo 中出现的额外入口，都不能单独扩大该范围。

- Card List Golden 中出现的 Export 先按 `Example Specific` 处理；在 Registry 明确注册并完成独立验证前，Starter Card List 仍不支持真实 Export。
- `starter.pattern.default-application-shell` 只授权 [Default Application Shell Contract](application-shell.md) 的 fixed composition；完整 Navigation Shell engineering 和 Result Page 仍保持 Docs Full 范围。
- Basic List、Card List、Basic Form 和 Basic Detail 的页面组合由 [Template Usage Contract](template-usage-contract.md) 约束；具体 spacing 数值仍待单独 design decision，不在 Registry 中隐式统一。
- Runtime Manifest 不是 Registry schema 的来源。`selectedBusinessExports` 已按 [Validation Contract](validation/validation-contract.md) 从 R2 source validation requirement 中移除；冻结 R1 中的同名文字只代表 expected pre-projection drift。

### Basic List profile separation

Basic List 是两个不同 Profile 下的独立能力，不是一个能力的完整版和简化版：

| Capability ID | Profile | Audience | Output | Capability boundary | Primary use |
| --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | Starter | Non-Developer | 使用 Fixed Runtime 的 Single HTML Demo | 固定 Starter 能力子集；当前只使用 Search + Refresh，不从 Docs Full 继承选择、批量操作、导出或列设置 | AI generation target，用于产品方案验证和评审 |
| `docs.template.basic-list` | Docs Full | Developer | React/Vue 页面模板和工程代码 | 完整组件集成、页面状态、选择、批量操作和表格工具能力，以当前 Docs 和工程实现为准 | Developer engineering usage 和组件集成参考 |

Profile Router 必须先选择 Profile，再使用对应 Capability ID。两个 Basic List 不能合并配置、互相继承 Props，或仅凭相同名称跨 Profile 推断能力。

### TableToolbar profile separation

TableToolbar 在两个 Profile 中共享真实组件能力，但交付目的和允许的配置范围不同：

| Capability ID | Profile | Positioning | Allowed capability | Prohibited or out of scope |
| --- | --- | --- | --- | --- |
| `starter.component.table-toolbar` | Starter | Non-Developer AI Generated Page Support | Selection summary、模板允许的轻量 Batch Actions、Basic Filtering Container、Action State Display | Component API customization、React/Vue integration、advanced slots、density management、engineering-only configuration |
| `docs.component.table-toolbar` | Docs Full | Developer Component Capability | Framework usage、完整公开 API integration、公开扩展边界内的 advanced customization | 未发布 API、内部 DOM/样式依赖，以及把业务请求、分页、确认流程或文件生成伪装为组件内置能力 |

Starter 行登记的是所有 Starter 模板可用能力的上限，不表示每个模板都启用全部能力。Basic List 仍只使用 Search + Refresh；Card List 才可按模板启用选择摘要、轻量批量操作和操作状态。Docs Full 的 Framework Usage 或高级配置不得反向进入 Starter。

## 2. Capability Registry Schema

| Field | Required | Definition |
| --- | --- | --- |
| Capability ID | Yes | 稳定、唯一、使用小写点分命名的能力标识。Profile 专属能力使用 `starter.*` 或 `docs.*` 前缀。 |
| Capability Name | Yes | 面向人和 AI 的能力名称。 |
| Profile | Yes | `Starter`、`Docs Full` 或 `Both`。`Both` 仍必须分别说明两个 Profile 的能力边界。 |
| Type | Yes | `Template`、`Business Component`、`Pattern` 或 `Foundation`。 |
| Implementation | Yes | 真实实现或组合资产的位置；不存在时写 `None`，不得从 Docs 文案推断实现。 |
| Docs | Yes | 对应 Docs 及其完整度；不存在时写 `None`。 |
| Skill | Yes | AI Knowledge 和路由入口；仅被 Inventory 提及不等于可正确路由。 |
| Golden Example | Yes | 冻结参考及其映射；没有独立 Golden 时写 `None` 或说明间接覆盖。 |
| Validation | Yes | 按 Validation Contract 登记 Functional、Responsive、Theme、Accessibility、Interaction 和 Visual Quality 的规则或证据入口；实际执行结果必须使用 Evidence Model，未核验的维度不得写为已确认。 |
| Status | Yes | 只能使用本文件定义的 Registry Status。 |
| Conflict | Yes | 跨 Profile、知识、实现或验证冲突；没有已知冲突时写 `None`。 |
| Next Action | Yes | 下一项 Knowledge Migration 工作；不是当前实现授权。 |

## 3. Registry Status

| Status | Meaning | Starter generation rule |
| --- | --- | --- |
| `READY` | 当前声明的 Profile 内，Implementation / approved binding、Docs、Skill、Golden 或明确批准的 no-Golden strategy，以及 Validation 已形成一致链路。 | 只有 `Profile` 包含 `Starter` 时可直接用于 Starter；未执行的 Browser Evidence 仍为 `UNVERIFIED`。 |
| `PARTIAL` | 能力存在，但一个或多个知识层、验证维度或发现路径不完整。 | 只能使用 Starter 模板已经明确允许的子集；缺失部分标记为未验证。 |
| `CONFLICTED` | 两个或多个知识源对能力边界或职责给出不一致结论。 | 不合并冲突能力；按 Starter Skill 和 Starter 模板的更窄边界执行。 |
| `DOCS_ONLY` | Docs Full Profile 已有可用能力，但未注册到 Starter。 | 不得用于 Starter。 |
| `OUTDATED` | Knowledge 或入口落后于当前实现，或仍把未完成资产描述为可用能力。 | 不得据此扩大 Starter。 |
| `UNSUPPORTED` | 当前 Profile 明确不支持。 | 停止生成该能力并报告范围边界。 |
| `PROPOSED` | 仅为未来候选，尚未完成能力链路。 | 不得用于当前生成。 |

## 4. Starter Profile Registry

| Capability ID | Capability Name | Profile | Type | Implementation | Docs | Skill | Golden Example | Validation | Status | Conflict | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | Basic List | Starter | Template | `distribution/designkit-starter-v1/templates/list.md`; `examples/list.html` | Docs Full 的 `templates/data-list/basic-list.mdx` 只能作为视觉和实现证据，不能定义 Starter 能力 | Starter `SKILL.md`、`references/design-rules.md`、`references/template-contract.md` | `examples/list.html` | Starter checklist、template integration tests；浏览器状态由 Starter Manifest 单独记录 | `READY` | None；`docs.template.basic-list` 已作为独立能力登记，Starter 固定为 Search + Refresh 子集 | 保持 Non-Developer、Single HTML、Fixed Runtime 和 AI generation target 边界 |
| `starter.template.card-list` | Card List | Starter | Template | `templates/card-list.md`; `examples/multi-select-card-list.html` | `templates/data-list/card-list.mdx` 使用 Starter Golden Preview 并说明页面组合边界 | Starter `SKILL.md`、Card List template、component catalog | `examples/multi-select-card-list.html` | `starter-card-list-integration.test.mjs`、quality checklist；Theme/Responsive/Accessibility 规则已登记 | `READY` | None；仅允许当前结果本地选择和轻量管理，不包含跨页选择、真实导出或权限工作流 | 保持通过 General SKILL Entry → Profile Router → Capability Registry 可发现，不扩大现有能力 |
| `starter.template.basic-form` | Basic Form | Starter | Template | `templates/form.md`; `examples/form.html` | `templates/form/basic-form.mdx` 和真实 React/Vue Demo | Starter `SKILL.md`、Form template、component catalog | `examples/form.html` | Starter checklist 和模板测试；校验失败、提交 Loading、成功、重置已定义 | `READY` | Docs Full 还有 Grouped/Step Form，不能从 Basic Form 自动升级 | 在 Registry validation mapping 中补充各验证维度的证据位置 |
| `starter.template.basic-detail` | Basic Detail | Starter | Template | `templates/detail.md`; `examples/detail.html` | `templates/detail/basic-detail.mdx` 和真实 React/Vue Demo | Starter `SKILL.md`、Detail template、component catalog | `examples/detail.html` | Starter checklist 和详情模板测试；Normal、Loading、Empty/Error 已定义 | `READY` | Docs Full 还有 Card/Data/Secondary Detail，不能从 Basic Detail 自动升级 | 在 Registry validation mapping 中补充各验证维度的证据位置 |
| `starter.component.table-toolbar` | TableToolbar | Starter | Business Component | Starter Runtime 的真实 `StarbucksReact.TableToolbar`；页面只组合模板允许的 selection summary、batch actions、basic filtering container 和 action state display | `business-components/list-batch/table-toolbar.mdx` 只作为真实组件证据；Starter 边界由 Starter Knowledge 和模板决定 | `business-components/table-toolbar.md`、component catalog、Basic/Card List template | 由 Basic List 和 Card List Goldens 间接覆盖；无独立 Starter Golden | `starter-table-toolbar-integration.test.mjs`、Evaluator checklist、模板集成检查 | `READY` | None；冻结 R1 Checklist 的 `selectedBusinessExports` 是 expected pre-projection drift，不是当前 Runtime schema | 以真实 Runtime export、CSS 标记和 Browser Evidence 维护实现侧证据 |
| `starter.pattern.quick-filter` | Quick Filter | Starter | Pattern | 由 TableToolbar `quickFilters` 提供 Search、Select、ButtonGroup、DateRange 的已查证子集 | TableToolbar Docs 的 QuickFilters/FilterBar 对比 | TableToolbar Starter Knowledge；模板决定允许的类型和位置 | Basic List 与 Card List Goldens 间接覆盖 | TableToolbar integration tests；提交时机和 1～3 个条件规则已登记 | `PARTIAL` | Docs Full TableToolbar API 范围大于各 Starter 模板子集 | 增加 Capability ID 到 Template Selection 知识，并保持 Quick Filter 与 Advanced FilterBar 的边界 |
| `starter.pattern.default-application-shell` | Default Application Shell | Starter | Pattern | Starter Runtime `StarbucksReact.Menu` 的固定 Brand Top + Collapsible Side + Main outer composition；实际 Shell HTML 在后续实现阶段生成 | Menu Docs 的“品牌色模式导航”和“缩起内嵌菜单”只作为 `IMPLEMENTATION REFERENCE` | [Default Application Shell Contract](application-shell.md)、Starter Skill、Template/Binding contracts | None；经批准采用 contract + test-only composition fixture strategy，不创建 Starter Golden | Knowledge/projection contract tests；后续 fixture 验证 1280/768/390、Light/Dark、overflow、accessibility 和 capability leakage | `READY` | Support state 为 `SUPPORTED`，但只限 fixed composition；不得扩大为 `docs.pattern.navigation-shell` | R2-R.3 实现 test-only composition fixture 并补录 Browser Evidence |
| `starter.interaction.selection` | Local Selection | Starter | Pattern | Card List 页面维护当前筛选结果的选择集合、全选和半选；TableToolbar 只接收选择摘要 | Card List Docs | Card List template、Interaction Pattern、TableToolbar Starter Knowledge | Card List Golden | Card List integration test 覆盖选择、全选、半选和依赖选择的操作 | `PARTIAL` | Golden 的预置选择是 Example Specific；生成页面默认不应由此推断预选 | 通过 Golden Example Mapping 保持 Example Specific 与 Template Default 的显式边界 |
| `starter.interaction.batch-actions` | Batch Actions | Starter | Pattern | Card List + TableToolbar 支持当前选择集合上的轻量本地批量操作 | Card List 和 TableToolbar Docs | Card List template、Interaction Pattern、TableToolbar Starter Knowledge | Card List Golden | Card List/TableToolbar integration tests 和 quality checklist | `PARTIAL` | Docs Full 支持范围更广；Starter 明确不支持复杂批量、跨页选择、真实请求、权限和服务端任务 | 通过 Golden Example Mapping 维持 Light Batch Actions 的模板和验证边界 |
| `starter.foundation.theme` | Theme | Starter | Foundation | Starter Runtime CSS、Design Tokens 和 Docs 主题壳层 | Docs ConfigProvider、组件和模板主题示例 | Starter design rules、quality checklist | 四个 Starter Goldens 可作为页面级主题检查对象 | Card List 有明确亮/暗规则；其他模板的 Theme 证据未统一映射 | `PARTIAL` | Manifest 验证状态不能替代逐能力 Theme 证据 | 为四个 Starter 模板登记 Light/Dark 的独立验证状态和证据 |
| `starter.foundation.responsive` | Responsive | Starter | Foundation | 模板页面布局、TableToolbar container query、Card Grid 和表格容器滚动策略 | Docs Layout、Menu、模板响应式规则 | Starter design rules、template contract、quality checklist | 四个 Starter Goldens 可用于窄/宽容器检查 | 静态测试和 Checklist 较强；逐模板浏览器证据未集中登记 | `PARTIAL` | Viewport 响应式与组件容器响应式容易被混为同一能力 | 建立逐模板窄容器、页面溢出和内部滚动验证映射 |
| `starter.foundation.accessibility` | Accessibility | Starter | Foundation | 真实基础组件语义、可访问名称、键盘 Focus 和状态反馈 | 组件 Docs、Card List/TableToolbar 页面规则 | Starter template contract、TableToolbar Knowledge、quality checklist | Goldens 包含部分语义标记，但不是独立无障碍基准 | 静态属性检查存在；完整键盘、焦点顺序和读屏验证未统一登记 | `PARTIAL` | 静态存在 `aria-*` 不等于完整 Accessibility 已验证 | 建立 Keyboard、Focus、Name/Role/Value、非颜色状态和反馈的验证矩阵 |

## 5. Docs Full Profile Registry

下表登记 Docs Full 能力。除非未来完成独立 Starter 评审、模板、Golden、Validation 和 Manifest 注册，否则这些能力对 Starter 一律视为未支持。

| Capability ID | Capability Name | Profile | Type | Implementation | Docs | Skill | Golden Example | Validation | Status | Conflict | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `docs.template.basic-list` | Basic List | Docs Full | Template | React/Vue `template-pages/basic-list`，组合完整 TableToolbar、Table、Pagination 和页面状态 | `templates/data-list/basic-list.mdx` 和真实 React/Vue Demo | General template routing、React/Vue framework knowledge | None；Starter `examples/list.html` 不属于 Docs Full Golden | `template-pages.test.mjs` 和 Docs template tests；不继承 Starter Manifest 的验证状态 | `DOCS_ONLY` | None；`starter.template.basic-list` 已作为独立能力登记，Docs Full 能力不得进入 Starter | 保持 Developer、React/Vue、component integration 和 engineering usage 边界；如未来需要 Golden，必须单独登记 |
| `docs.component.table-toolbar` | TableToolbar | Docs Full | Business Component | React/Vue TableToolbar 真实组件、公开 Props/Events/Types 和响应式行为 | `business-components/list-batch/table-toolbar.mdx` 和真实 React/Vue Demo | General design decisions、React/Vue framework knowledge、业务组件契约 | None；Starter List Goldens 不属于 Docs Full Golden | 组件单元/交互测试、React/Vue Docs Demo 和当前业务组件验证 | `DOCS_ONLY` | None；Starter 已使用独立 Capability ID 和模板限定子集 | 保持 Developer Component Capability；advanced customization 必须位于已发布 API 和扩展边界内 |
| `docs.template.filter-list` | Filter List | Docs Full | Template | React/Vue `template-pages/filter-list` | `templates/data-list/filter-list.mdx` | General template routing，无独立选择规则 | None | Template page tests；部分响应式和交互检查 | `DOCS_ONLY` | Starter Manifest 明确不支持 Advanced FilterBar；Docs Filter List 不得自动降级为 Starter | 保持 Docs Full；补充 Basic List vs Filter List 选择知识 |
| `docs.template.tree-filter-list` | Tree Filter List | Docs Full | Template | React/Vue `template-pages/tree-filter-list` | `templates/data-list/tree-filter-list.mdx` | General inventory/generic routing | None | Template page tests | `DOCS_ONLY` | Starter 没有层级筛选模板或对应 Golden | 保持 Docs Full；补充层级数据和筛选选择规则 |
| `docs.template.tag-management-list` | Tag Management List | Docs Full | Template | React/Vue `template-pages/tag-list` | `templates/data-list/tag-list.mdx`，同时存在旧 `templates/tag-list.mdx` 和 `templates/list/tag-list.mdx` | General Skill 提及标签管理 | None | Template page tests | `OUTDATED` | 多个 Docs 路由使 canonical knowledge 入口不清晰 | 确认唯一 Docs 能力入口后更新 Registry；不得删除或改路由于本次任务 |
| `docs.template.result-page` | Result Page | Docs Full | Template | React/Vue Success、Failure、Network Error 模板 | 子页面完整；父 `templates/result.mdx` 仍显示建设中 | General architecture/inventory 提及，未标记完成状态 | None | `result-template.test.mjs` 覆盖跨框架、响应式和视觉契约 | `OUTDATED` | Starter Manifest 明确 `result` unsupported；父 Docs 状态落后于子页面实现 | 更新 Docs Full capability status 和父级知识索引；是否进入 Starter 必须另立提案 |
| `docs.template.form-variants` | Form Variants | Docs Full | Template | React/Vue Basic、Grouped、Step Form | 子页面完整；父 `templates/form.mdx` 仍显示建设中 | General form knowledge，无完整变体选择矩阵 | 只有 Starter Basic Form Golden | Template page tests | `OUTDATED` | Starter 只支持 Basic Form；Grouped/Step 不得被同一“表单页”名称带入 Starter | 建立 Basic/Grouped/Step Form 决策知识和 Profile 标记 |
| `docs.template.detail-variants` | Detail Variants | Docs Full | Template | React/Vue Basic、Card、Data、Secondary Detail | 子页面完整；父 `templates/detail.mdx` 仍为预留页 | General detail knowledge，无完整变体选择矩阵 | 只有 Starter Basic Detail Golden | `detail-template.test.mjs` 和模板测试 | `OUTDATED` | Starter 只支持 Basic Detail；其他变体不能从 Docs 自动推断 | 建立 Detail variant selection 和 Profile 标记 |
| `docs.pattern.navigation-shell` | Navigation Shell | Docs Full | Pattern | Layout.Sider、Menu、Header、Docs Sidebar 和水平导航 Demo 的组合能力 | Layout/Menu Docs 与 Demo，尚无单一 Application Shell 模板 | General Knowledge 缺 Sidebar vs Horizontal、Flat vs Multi-level 决策 | None | `layout-demo.test.mjs`、`menu-demo.test.mjs`、`sidebar-scroll.test.mjs` | `PARTIAL` | 窄范围 Starter Default Application Shell 不授权 Custom Navigation、Navigation API、权限、真实路由或 React/Vue 工程集成 | 定义为 Docs Full 组合 Pattern，并保持完整 Navigation engineering 对 Starter unsupported |
| `docs.business.advanced-filter-bar` | Advanced FilterBar | Docs Full | Business Component | React/Vue FilterBar 真实组件和 Demo | `business-components/query-view/filter-bar.mdx` | General Skill 和 business component knowledge 可发现 | None | 业务组件测试和多状态 Demo | `DOCS_ONLY` | Starter Manifest 明确 `advanced-filter-bar` unsupported；不得用多个 Quick Filters 伪造 | 保持 Docs Full；在决策知识中明确 Quick Filter vs FilterBar |
| `docs.template.dashboard` | Dashboard | Docs Full | Template | 仅有部分 React `template-pages/dashboard.tsx` 资产 | `templates/dashboard.mdx` 为 Placeholder | General Skill/architecture Inventory 提及 | None | 无完整 React/Vue、响应式、主题、可访问性和视觉链路 | `OUTDATED` | Inventory 可能使 AI 将未完成资产理解为可用模板；Starter 明确 unsupported | 将 General Knowledge 标为 partial/proposed，完成全链路前不得进入 Starter |
| `docs.template.login` | Login | Docs Full | Template | 仅有部分 React `template-pages/login.tsx` 资产 | `templates/login.mdx` 为 Placeholder | General Skill/architecture Inventory 提及 | None | 无完整跨框架和验证链路 | `OUTDATED` | Inventory 可能使 AI 将未完成资产理解为可用模板；Starter 明确 unsupported | 将 General Knowledge 标为 partial/proposed，完成全链路前不得进入 Starter |
| `docs.template.tree-table` | Tree Table | Docs Full | Template | 仅有 React `template-pages/tree-table-list.tsx` 资产 | `templates/data-list/tree-table-list.mdx` 为 Placeholder | General architecture Inventory | None | 无完整 React/Vue 和验证链路 | `OUTDATED` | 实现、Docs 和 Skill 的成熟度表达不一致；Starter 无对应能力 | 将能力标为 proposed/partial，完成全链路前不得进入 Starter |

## 6. Validation Migration Status

### P0 — RESOLVED in Knowledge Layer

- [Validation Contract](validation/validation-contract.md) 已统一六类 Starter 验证目标，并明确 Starter Validation 不等于 Runtime Internal Validation。
- [Evidence Model](validation/evidence-model.md) 已统一逐 Capability 的 Method、Evidence Location、Result、Last Verified 和责任信息。
- Quality Checklist 与 Runtime Manifest 的解释冲突已有显式处理规则；本次知识迁移不修改 Runtime Manifest，也不把缺失字段静默判定为通过。

### P1 — Evidence population and implementation-side alignment

- 冻结 R1 Quality Checklist 仍含 `selectedBusinessExports` 文字，但 R2 source validation 已移除该过时 requirement；R1 → R2 投影前的差异必须单独标记，不得阻塞 source-level validation。
- 需要按 Evidence Model 为 Starter Capability 补录实际 Static、Browser、Build（适用时）和 Manual Review 结果；规则或测试文件存在不等于已经执行。

## 7. Registry maintenance rules

1. 新能力不得因为 Runtime export、Docs Demo 或组件 API 单独存在而标记为 Starter 支持。
2. Starter 能力扩展必须先完成独立审批，再同时具备 Skill route、Template、Golden、Validation 和 Manifest registration。
3. Docs Full 能力进入 Starter 时创建 `starter.*` Capability ID，不直接修改 `docs.*` 能力的含义。
4. Golden Example 是只读组合参考；Registry 只登记映射，不复制或修改 Golden 内容。
5. Validation 必须区分静态检查、浏览器检查、Theme、Responsive、Accessibility 和 Visual Quality；未执行的维度写为未验证。
6. `CONFLICTED` 能力先遵守 Starter Skill 和 Starter Template 的更窄边界，直到冲突知识被迁移修正。
7. Registry 记录当前事实和迁移动作，不授权 Runtime、组件 API、Docs Demo、Golden、版本或发布变更。
8. `starter.pattern.default-application-shell` 是经批准的 contract-first restricted composition exception：Support state 为 `SUPPORTED`，Registry 使用合法 `READY`；完整 Golden 由 implementation references + test-only fixture strategy 取代，Browser Evidence 在后续实现阶段补录。
