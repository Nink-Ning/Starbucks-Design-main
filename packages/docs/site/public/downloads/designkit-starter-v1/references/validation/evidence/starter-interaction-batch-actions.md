# Evidence Record: `starter.interaction.batch-actions`

Capability 边界读取 [Capability Registry](../../capability-registry.md)，决策规则读取 [Interaction Pattern](../../decisions/interaction-pattern.md)，承载页面为 [Card List Template](../../../templates/card-list.md)。验证目标读取 [Validation Contract](../validation-contract.md)。

本记录只投影 [Card List Evidence](starter-template-card-list.md) 中已为 `PASS` 的 Functional、Interaction 和 Accessibility 浏览器证据，不在本阶段重新执行验证。Last Verified 沿用承载页面证据日期 `2026-08-25`；Card List 未证明的 Batch Actions 专属类别继续保持 `UNVERIFIED`。

| Capability ID | Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.interaction.batch-actions` | Functional | Browser Validation | [Card List Functional Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；已验证 Batch Actions 由当前 Selection Set 驱动，空选择时依赖选择的操作禁用，选择非空后启用，且只执行本地 Mock 行为。 |
| `starter.interaction.batch-actions` | Responsive | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无窄容器中 Batch Actions 折叠、换行、顺序和可用性的执行证据。 |
| `starter.interaction.batch-actions` | Theme | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Light/Dark 下主要、次要、危险、禁用和 Loading 操作状态证据。 |
| `starter.interaction.batch-actions` | Accessibility | Browser Validation | [Card List Accessibility Evidence](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；已验证 Batch Actions 可通过键盘到达和操作、Focus 可见、操作有可访问名称，确认与完成反馈可感知。 |
| `starter.interaction.batch-actions` | Interaction | Browser Validation | [Card List Interaction Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；已验证操作目标与 Selection Set 一致，空/非空选择驱动禁用与启用状态，危险操作执行前确认，完成后提供本地反馈。 |
| `starter.interaction.batch-actions` | Visual Quality | Manual Review | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无主要、次要、More 和危险操作层级与 Selection Summary 关系的人工审查记录。 |

返回 [Evidence Record Registry](evidence-index.md)。
