# Starter Capability Evidence Record Registry

本索引登记 DesignKit Starter Package 的 Capability Evidence Records。它只汇总实际记录状态，不把 Capability、Template、Golden、检查规则或资产存在解释为已通过验证。

验证目标读取 [Validation Contract](../validation-contract.md)，记录语义读取 [Evidence Model](../evidence-model.md)。

## 1. Registry schema

| Field | Definition |
| --- | --- |
| Capability ID | 与 [Capability Registry](../../capability-registry.md) 完全一致的 `starter.*` ID，并链接到该 Capability 的记录文件。 |
| Validation Type | `Functional`、`Responsive`、`Theme`、`Accessibility`、`Interaction` 或 `Visual Quality`。 |
| Method | `Static Check`、`Browser Validation`、`Build Validation` 或 `Manual Review`。 |
| Result | 仅使用 `PASS`、`FAIL`、`UNVERIFIED`、`BLOCKED`、`CONFLICTED` 或 `NOT_APPLICABLE`。 |
| Evidence Location | 可定位的执行输出、报告、截图或审查记录；没有证据时写 `None`。 |
| Last Verified | 实际执行日期或时间戳；从未执行时写 `null`。 |
| Notes | 验证范围、限制、冲突或下一次验证要求。 |

## 2. Evidence record registry

| Capability ID | Validation Type | Method | Result | Evidence Location | Last Verified | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| [`starter.template.card-list`](starter-template-card-list.md) | Functional | Browser Validation | `PASS` | [Package-local browser record](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 既有记录覆盖真实渲染、筛选、选择、批量操作、确认和本地反馈。 |
| [`starter.template.card-list`](starter-template-card-list.md) | Responsive | Browser Validation | `PASS` | [Package-local browser record](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证宽/窄布局、Toolbar 换行、Grid 重排和无页面级横向溢出。 |
| [`starter.template.card-list`](starter-template-card-list.md) | Theme | Browser Validation | `PASS` | [Package-local browser record](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Light/Dark 和主要交互状态可读性。 |
| [`starter.template.card-list`](starter-template-card-list.md) | Accessibility | Browser Validation | `PASS` | [Package-local browser record](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Keyboard、Focus、可访问名称和非颜色选中提示；不扩大为完整读屏兼容声明。 |
| [`starter.template.card-list`](starter-template-card-list.md) | Interaction | Browser Validation | `PASS` | [Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `2026-08-25` | 已验证 Selection Ownership、Single/Batch、More、确认和反馈；预置选择仍为 Example Specific。 |
| [`starter.template.card-list`](starter-template-card-list.md) | Visual Quality | Manual Review | `UNVERIFIED` | None | `null` | 缺少实际截图及带审查人的 Manual Review；Golden 与 Docs 集成本身不是视觉通过证据。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Functional | Static Check | `PASS` | [Basic List Static Check](starter-template-basic-list.md#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html) | `2026-08-25` | 已静态验证四类页面状态及 Search、Refresh、Table、Pagination、Row Actions 和反馈连接。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Functional | Browser Validation | `UNVERIFIED` | None | `null` | 包内浏览器摘要缺少逐类别日期、场景和步骤，不能聚合为 Functional `PASS`。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Responsive | Static Check | `PASS` | [Basic List Static Check](starter-template-basic-list.md#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html) | `2026-08-25` | 已静态验证 viewport meta、720px 窄屏规则、Header wrap 和 Table 局部滚动。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Responsive | Browser Validation | `UNVERIFIED` | None | `null` | 缺少带 viewport/container 和实际溢出结果的 Starter Browser Evidence。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Theme | Browser Validation | `UNVERIFIED` | None | `null` | 缺少 Starter Basic List 的 Light/Dark 浏览器证据；不继承 Docs Full 或 Runtime 主题能力。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Accessibility | Static Check | `PASS` | [Basic List Static Check](starter-template-basic-list.md#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html) | `2026-08-25` | 已静态验证语义区域和主要控件可访问名称。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Accessibility | Browser Validation | `UNVERIFIED` | None | `null` | 缺少 Keyboard、焦点顺序和可见 Focus 浏览器走查。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Interaction | Static Check | `PASS` | [Basic List Static Check](starter-template-basic-list.md#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html) | `2026-08-25` | 已静态验证 Search/Clear、Refresh、Pagination、Row Actions 和本地反馈连接；TableToolbar 仅限 Search + Refresh。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Interaction | Browser Validation | `UNVERIFIED` | None | `null` | 缺少带步骤和结果的 Starter 浏览器交互记录。 |
| [`starter.template.basic-list`](starter-template-basic-list.md) | Visual Quality | Manual Review | `UNVERIFIED` | None | `null` | 尚无带日期和审查人的 Golden 对比记录。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Implementation Provenance | Static Check | `PASS` | [Runtime Evidence Resolution](../conflicts/table-toolbar-selected-business-exports.md)、[Quality Checklist](../../quality-checklist.md#浏览器检查) | `2026-08-26` | Canonical R2 resolution uses Runtime export/CSS evidence; `selectedBusinessExports` is not a Runtime schema field. |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Functional | Browser Validation | `UNVERIFIED` | None | `null` | 尚无按 Basic List 与 Card List 能力子集分别记录的 Runtime 执行证据。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Responsive | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Toolbar 容器响应式和页面溢出记录。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Theme | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Light/Dark 和操作状态记录。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Accessibility | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Keyboard、Focus、Tooltip 和可访问名称记录。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Interaction | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Quick Filter、Selection Summary、Action State 和 Batch Actions 执行记录。 |
| [`starter.component.table-toolbar`](starter-component-table-toolbar.md) | Visual Quality | Manual Review | `UNVERIFIED` | None | `null` | 尚无按两个承载模板分别完成的人工审查记录。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Functional | Browser Validation | `PASS` | [Card List Functional Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Selection Control 拥有选择入口，当前结果全选、取消和半选状态一致。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Responsive | Browser Validation | `UNVERIFIED` | None | `null` | 尚无窄容器中 Selection Control 与 Summary 的执行记录。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Theme | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Light/Dark 下 Selected、Hover、Focus 和 Disabled 状态记录。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Accessibility | Browser Validation | `PASS` | [Card List Accessibility Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Keyboard、Focus、可访问名称和非颜色选中提示。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Interaction | Browser Validation | `PASS` | [Card List Interaction Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证页面拥有状态、Card Body 不改变选择，Toolbar 与 Card 共享 Selection Set。 |
| [`starter.interaction.selection`](starter-interaction-selection.md) | Visual Quality | Manual Review | `UNVERIFIED` | None | `null` | 尚无选择、半选和摘要视觉一致性审查记录。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Functional | Browser Validation | `PASS` | [Card List Functional Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Selection Set 驱动本地 Batch Actions，空选择禁用、选择非空启用。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Responsive | Browser Validation | `UNVERIFIED` | None | `null` | 尚无窄容器中操作折叠、换行和可用性记录。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Theme | Browser Validation | `UNVERIFIED` | None | `null` | 尚无 Light/Dark 下危险、禁用和 Loading 状态记录。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Accessibility | Browser Validation | `PASS` | [Card List Accessibility Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证 Keyboard、Focus、可访问名称及可感知确认与反馈。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Interaction | Browser Validation | `PASS` | [Card List Interaction Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态) | `2026-08-25` | 已验证选择依赖、空/非空状态、危险操作确认和完成反馈。 |
| [`starter.interaction.batch-actions`](starter-interaction-batch-actions.md) | Visual Quality | Manual Review | `UNVERIFIED` | None | `null` | 尚无主要、次要和危险操作层级审查记录。 |

## 3. Coverage summary

| Measure | Count |
| --- | ---: |
| Prioritized capabilities registered | 5 |
| Evidence records | 35 |
| `PASS` | 15 |
| `UNVERIFIED` | 19 |
| `CONFLICTED` | 1 |
| `FAIL` / `BLOCKED` / `NOT_APPLICABLE` | 0 |

## 4. Maintenance rules

1. 先更新 Capability 记录文件，再同步本索引；索引不是执行证据本身。
2. 没有 Evidence Location 和 Last Verified 时不得写 `PASS` 或 `FAIL`。
3. Browser Validation 必须记录 Profile、Template、Runtime、viewport、theme 和场景；Manual Review 必须记录审查人、日期和可定位产物。
4. 证据冲突必须保留双方来源并写 `CONFLICTED`，直到冲突由后续知识或实现任务解决。
5. 本目录只登记 Starter Package 内 `starter.*` Capability，不得扩大 Capability Registry 的 whitelist。
