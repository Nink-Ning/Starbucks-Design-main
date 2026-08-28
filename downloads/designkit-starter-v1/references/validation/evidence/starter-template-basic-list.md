# Evidence Record: `starter.template.basic-list`

Capability 边界读取 [Capability Registry](../../capability-registry.md)，页面组合读取 [Basic List Template](../../../templates/list.md)，只读视觉参考为 [Basic List Golden](../../../examples/list.html)。验证目标读取 [Validation Contract](../validation-contract.md)。

本记录只使用 Starter Package 内的 Manifest、Template、Golden 和 Quality Checklist，不继承 Docs Full React/Vue Evidence，也不读取 Runtime Manifest Contract。包内虽然将 Basic List Golden 和浏览器 Smoke 汇总为 `BROWSER_CONFIRMED`，但没有保留逐类别 Last Verified、viewport/theme、键盘步骤或视觉产物，因此原 Browser/Manual rows 继续为 `UNVERIFIED`。

## Static Check Evidence — 2026-08-25

本次只读 Static Check 直接检查 [Starter Manifest](../../../manifest.json)、[Basic List Template](../../../templates/list.md)、[Basic List Golden](../../../examples/list.html) 和 [Quality Checklist](../../quality-checklist.md)，没有运行 build 或浏览器。

| Validation Type | Result | Reproducible observation |
| --- | --- | --- |
| Functional | `PASS` | Golden 包含 Normal、Loading、Empty、Error、Search、Refresh、Table、Pagination、Row Actions 和本地反馈连接。 |
| Responsive | `PASS` | Golden 包含 viewport meta、720px media query、Header wrap 和 Table 局部 `overflow-x: auto`。 |
| Theme | `UNVERIFIED` | 包内没有 Basic List 的逐主题浏览器记录；Static Check 不能替代 Light/Dark 渲染证据。 |
| Accessibility | `PASS` | Golden 包含 `lang`、`main`、区域名称，以及状态、Search、Toolbar 和 Refresh 的可访问名称。 |
| Interaction | `PASS` | Golden 连接 Search、Clear、Refresh、Pagination、Row Actions 和本地 Message；TableToolbar 仅使用 Search + Refresh 子集。 |
| Visual Quality | `UNVERIFIED` | 包内没有实际页面截图和带审查人的 Manual Review。 |

边界检查同时确认：Manifest Profile 为 Non-Developer Starter；Basic List 没有引入 Docs Full；TableToolbar 未传 `selectedCount`、`operationActions`、`moreActions`、Export 或 Column Settings；本证据不依赖 Runtime Manifest 字段。

| Capability ID | Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | Functional | Static Check | [Static Check Evidence](#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html)、[Basic List Template](../../../templates/list.md) | `PASS` | `2026-08-25` | `UNASSIGNED` | Starter Profile、Single HTML、Local Mock；已静态验证四类页面状态、Search、Refresh、Table、Pagination、Row Actions 和反馈连接。状态转换仍需要独立 Browser Validation。 |
| `starter.template.basic-list` | Functional | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | Starter Package 只有未按类别记录日期和场景的浏览器确认摘要，不能证明 Normal、Loading、Empty、Error、Search、Refresh、Pagination 和 Row Actions 已按当前 Contract 全部执行。 |
| `starter.template.basic-list` | Responsive | Static Check | [Static Check Evidence](#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html)、[Basic List Template](../../../templates/list.md) | `PASS` | `2026-08-25` | `UNASSIGNED` | 已静态验证 viewport meta、720px 窄屏规则、Header wrap、Pagination overflow 和 Table 局部横向滚动；不等同于实际 viewport/container 浏览器结果。 |
| `starter.template.basic-list` | Responsive | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 包内没有带精确 viewport、Toolbar 实际排列、Table 内部滚动观察和页面溢出结果的 Basic List 浏览器记录。 |
| `starter.template.basic-list` | Theme | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 包内没有 Basic List 的 Light/Dark 浏览器证据；不得从 Docs Full 或 Runtime 主题能力推断 Starter 页面已通过。 |
| `starter.template.basic-list` | Accessibility | Static Check | [Static Check Evidence](#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html)、[Quality Checklist](../../quality-checklist.md#html-静态检查) | `PASS` | `2026-08-25` | `UNASSIGNED` | 已静态验证文档语言、语义区域和页面状态、Search、TableToolbar、Refresh 的可访问名称；Static Check 不证明 Keyboard、焦点顺序或可见 Focus。 |
| `starter.template.basic-list` | Accessibility | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 包内没有 Search、Refresh、Row Actions、Pagination 的 Keyboard、焦点顺序和可见 Focus 浏览器走查记录。 |
| `starter.template.basic-list` | Interaction | Static Check | [Static Check Evidence](#static-check-evidence--2026-08-25)、[Basic List Golden](../../../examples/list.html)、[Basic List Template](../../../templates/list.md) | `PASS` | `2026-08-25` | `UNASSIGNED` | 已静态验证 Search/Clear、Refresh 防重复、Pagination、Row Actions 和本地反馈连接；TableToolbar 仅使用允许的 Search + Refresh 子集，没有选择、批量、导出或列设置能力。 |
| `starter.template.basic-list` | Interaction | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 包内没有带操作步骤和结果的 Search、Clear、Refresh、Pagination、Row Actions 浏览器执行记录。 |
| `starter.template.basic-list` | Visual Quality | Manual Review | None | `UNVERIFIED` | `null` | `UNASSIGNED` | Golden 存在，但尚无带日期、审查人、viewport、theme 和对比产物的人工审查记录。 |

返回 [Evidence Record Registry](evidence-index.md)。
