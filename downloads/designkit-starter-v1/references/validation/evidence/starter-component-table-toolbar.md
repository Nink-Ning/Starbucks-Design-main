# Evidence Record: `starter.component.table-toolbar`

Capability 边界读取 [Capability Registry](../../capability-registry.md)，组件知识读取 [TableToolbar Knowledge](../../../business-components/table-toolbar.md)。它分别由 [Basic List](../../../templates/list.md) 和 [Card List](../../../templates/card-list.md) 承载不同能力子集，不能把一个模板的结果泛化到另一个模板。

Manifest validation mismatch 由 [TableToolbar Conflict Record](../conflicts/table-toolbar-selected-business-exports.md) 统一跟踪；在其 Closure Criteria 满足前，对应 Static Check 保持 `CONFLICTED`。

| Capability ID | Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.component.table-toolbar` | Functional | Static Check | [Conflict Record](../conflicts/table-toolbar-selected-business-exports.md)、[Quality Checklist](../../quality-checklist.md#浏览器检查) | `CONFLICTED` | `2026-08-25` | `UNASSIGNED` | Package-local Checklist 要求 Runtime Manifest 以 `selectedBusinessExports` 登记 `TableToolbar`；当前 Runtime Manifest 不包含 `selectedBusinessExports` 字段。此冲突不等于 Runtime 能力失败，也不能聚合为 `PASS`。 |
| `starter.component.table-toolbar` | Functional | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无分别覆盖 Basic List 的 Quick Filter/Refresh 子集和 Card List 的 Selection Summary/Batch Actions 子集的 Runtime 执行证据。 |
| `starter.component.table-toolbar` | Responsive | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无容器响应式、操作折叠或换行以及页面无异常横向溢出的执行证据。 |
| `starter.component.table-toolbar` | Theme | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Light/Dark 下文本、图标、Selected、Hover、Focus、Disabled 和 Loading 状态证据。 |
| `starter.component.table-toolbar` | Accessibility | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Quick Filters、图标工具、Selection Summary、Actions、Tooltip 的 Keyboard、Focus 和可访问名称证据。 |
| `starter.component.table-toolbar` | Interaction | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Quick Filter 提交、Selection Summary 同步、Action State、选择依赖和批量操作事件的执行证据。 |
| `starter.component.table-toolbar` | Visual Quality | Manual Review | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无在 Basic List 与 Card List 中分别完成且带审查人、日期和对比产物的视觉审查。 |

返回 [Evidence Record Registry](evidence-index.md)。
