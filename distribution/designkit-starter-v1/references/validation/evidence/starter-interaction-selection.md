# Evidence Record: `starter.interaction.selection`

Capability 边界读取 [Capability Registry](../../capability-registry.md)，决策规则读取 [Interaction Pattern](../../decisions/interaction-pattern.md)，承载页面为 [Card List Template](../../../templates/card-list.md)。验证目标读取 [Validation Contract](../validation-contract.md)。

本记录只投影 [Card List Evidence](starter-template-card-list.md) 中已为 `PASS` 的 Functional、Interaction 和 Accessibility 浏览器证据，不在本阶段重新执行验证。Last Verified 沿用承载页面证据日期 `2026-08-25`；Card List 未证明的 Selection 专属类别继续保持 `UNVERIFIED`。

| Capability ID | Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.interaction.selection` | Functional | Browser Validation | [Card List Functional Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；已验证 Selection Control 改变当前结果 Selection Set，全选、取消和半选状态与可见结果一致。 |
| `starter.interaction.selection` | Responsive | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无窄容器中 Selection Control、Selection Summary 和 Card Grid 可用性的执行证据。 |
| `starter.interaction.selection` | Theme | Browser Validation | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Light/Dark 下 Selected、Hover、Focus、Disabled 和半选状态可读性的证据。 |
| `starter.interaction.selection` | Accessibility | Browser Validation | [Card List Accessibility Evidence](starter-template-card-list.md#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；已验证 Selection Control 可通过键盘操作、Focus 可见、控件有可访问名称，选中状态不只依赖颜色。 |
| `starter.interaction.selection` | Interaction | Browser Validation | [Card List Interaction Evidence](starter-template-card-list.md)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Context：Starter Profile、Card List Template、Fixed Runtime、宽/窄 viewport、Light/Dark；页面拥有 selection state，Card Body 不改变选择，Toolbar Selection Summary、Card 和全选控件使用同一 Selection Set。Golden 预置选择仍为 Example Specific。 |
| `starter.interaction.selection` | Visual Quality | Manual Review | None | `UNVERIFIED` | `null` | `UNASSIGNED` | 尚无 Selection Control、选中 Card、半选和摘要视觉一致性的人工审查记录。 |

返回 [Evidence Record Registry](evidence-index.md)。
