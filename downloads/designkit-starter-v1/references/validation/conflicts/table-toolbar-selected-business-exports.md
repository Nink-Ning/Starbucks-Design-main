# Conflict Record: TableToolbar `selectedBusinessExports`

本记录是 Starter Package 中 TableToolbar Manifest 验证冲突的 canonical tracking entry。它记录知识契约与实现侧证据不一致，不修改 Runtime，也不推断组件实现失败。

## 1. Conflict summary

| Field | Value |
| --- | --- |
| Conflict ID | `starter.validation.conflict.table-toolbar-selected-business-exports` |
| Capability ID | `starter.component.table-toolbar` |
| Description | [Quality Checklist](../../quality-checklist.md#浏览器检查) 要求 Runtime Manifest 通过 `selectedBusinessExports` 登记 `TableToolbar`；当前 [Runtime Manifest](../../../runtime/runtime-manifest.json) 不包含 `selectedBusinessExports` 字段。 |
| Source | Knowledge source：[Quality Checklist](../../quality-checklist.md#浏览器检查)；implementation evidence source：[Runtime Manifest](../../../runtime/runtime-manifest.json)。Manifest 中存在 `selectedProExports`，但它不是 `selectedBusinessExports` 的等价替代，也不能据此推断 TableToolbar 状态。 |
| Impact | Manifest conformance 不能汇总为已满足，TableToolbar 的相关 Static Check 必须保持冲突状态；字段缺失本身不证明 Runtime export、CSS 或 Starter 页面功能失败，也不扩大或缩小 Starter Capability Boundary。 |
| Current Status | `CONFLICTED` |
| Resolution Path | 先由 Manifest schema / Knowledge owner 确认 `selectedBusinessExports` 是否为有效、已批准的字段。若不是，后续 Knowledge Layer 任务应将 Checklist 改为直接 export、CSS 和 Starter Browser Evidence；若是，则必须另开明确授权的 Runtime 任务实现并验证该 schema。本记录不授权任一路径的实现。 |
| Last Confirmed | `2026-08-25` |
| Owner | `UNASSIGNED` |

## 2. Evidence relationship

```text
Quality Checklist assertion
        !=
Runtime Manifest schema
        ↓
Conflict Record: CONFLICTED
        ↓
TableToolbar Evidence + Evidence Index
```

- Capability Evidence：[TableToolbar Evidence Record](../evidence/starter-component-table-toolbar.md)
- Registry entry：[Evidence Record Registry](../evidence/evidence-index.md)
- Resolution semantics：[Validation Contract](../validation-contract.md)

独立的 `typeof StarbucksReact.TableToolbar === 'function'`、Runtime CSS 检查或 Starter Browser Validation 可以证明各自目标，但不能删除本冲突或把该 Manifest Evidence 改为 `PASS`。

## 3. Resolution recommendation

推荐在单独授权的 Knowledge Layer 任务中确认 Runtime Manifest 的正式 schema。若 `selectedBusinessExports` 从未成为正式字段，优先删除 Quality Checklist 中的过期字段断言，改为以下可执行证据组合：

1. 直接检查 `typeof StarbucksReact.TableToolbar === 'function'`；
2. 检查 Runtime CSS 的 `.sbux-table-toolbar`；
3. 在批准的 Basic List 与 Card List Starter 页面中分别记录 Browser Validation；
4. 保留 Basic List 与 Card List 不同能力子集的 Notes。

若 schema owner 确认 `selectedBusinessExports` 必须存在，则只能在另一个明确授权的 Runtime 任务中添加字段、生成逻辑和回归验证；本阶段不修改 Runtime。

## 4. Closure criteria

只有同时满足以下条件，后续任务才能关闭本记录：

1. Manifest schema 决策已记录并有明确 owner；
2. Quality Checklist 与 Runtime Manifest 不再互相矛盾；
3. 对应 Static Check 已重新执行，并记录 Evidence Location 与 Last Verified；
4. TableToolbar Capability Evidence 与 Evidence Index 已同步；
5. 在上述条件满足前，Current Status 保持 `CONFLICTED`，不得删除或改为 `PASS`。
