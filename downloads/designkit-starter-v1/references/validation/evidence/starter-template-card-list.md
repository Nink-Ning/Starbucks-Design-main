# Evidence Record: `starter.template.card-list`

Capability 边界读取 [Capability Registry](../../capability-registry.md)，页面组合读取 [Card List Template](../../../templates/card-list.md)，只读视觉参考为 [Card List Golden](../../../examples/multi-select-card-list.html)。验证目标读取 [Validation Contract](../validation-contract.md)。

本记录转录既有 release-preparation 证据，不在本阶段重新执行验证。[Quality Checklist](../../quality-checklist.md#golden-example-当前状态) 记录 Card List Golden 与本地浏览器 Smoke 为 `BROWSER_CONFIRMED`；Last Verified 保留既有证据记录日期 `2026-08-25`。未保留实际截图或人工视觉审查结论的类别继续标记为 `UNVERIFIED`。

## Package-local browser record 2026-08-25

以下内容是既有 Card List Browser Validation 结论的包内投影，不代表本阶段重新执行浏览器验证，也不增加原记录未覆盖的能力：

| Validation Type | Preserved observation |
| --- | --- |
| Functional | Card List Golden 已完成真实渲染、轻量筛选、当前结果选择、批量操作、危险操作确认和本地反馈检查。 |
| Responsive | 已检查宽/窄布局、Toolbar 换行、Card Grid 重排、标题省略和页面级横向溢出。 |
| Theme | 已检查 Light/Dark 下文本、状态、Checkbox、Icon 和 Dropdown/Menu 可读性。 |
| Accessibility | 已检查 Keyboard、可见 Focus、Selection Control、操作可访问名称和非颜色选中提示。 |
| Interaction | 已检查 Selection Ownership、全选/取消、Selection Summary、Single/Batch Actions、More、确认和反馈。 |

包内来源为 [Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) 和 [Card List Template](../../../templates/card-list.md)。Visual Quality 因缺少截图和带审查人的人工结论继续保持 `UNVERIFIED`。

| Capability ID | Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.card-list` | Functional | Browser Validation | [Package-local browser record](#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Starter Profile、Fixed Runtime；既有浏览器记录覆盖真实 Card List 渲染、筛选、当前结果选择、批量操作、危险操作确认和本地反馈，并保持 Local Mock、无跨页选择和无真实服务边界。 |
| `starter.template.card-list` | Responsive | Browser Validation | [Package-local browser record](#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | viewport：宽屏与窄屏；既有记录覆盖 Toolbar 换行、Card Grid 重排、标题省略和页面无横向溢出。历史记录未保留浏览器窗口的精确像素值。 |
| `starter.template.card-list` | Theme | Browser Validation | [Package-local browser record](#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | theme：Light 与 Dark；既有验证覆盖文本、Tag、Selected、Hover、Focus、Checkbox、Icon 和 Dropdown/Menu 可读性。 |
| `starter.template.card-list` | Accessibility | Browser Validation | [Package-local browser record](#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | Starter Card List 核心流程已完成 Keyboard、可见 Focus、Selection Control、Card/Batch Actions、More 可访问名称和非颜色选中提示验证；装饰图标保持 `aria-hidden`。本记录不扩大为完整读屏软件兼容声明。 |
| `starter.template.card-list` | Interaction | Browser Validation | [Package-local browser record](#package-local-browser-record-2026-08-25)、[Browser confirmation](../../quality-checklist.md#golden-example-当前状态)、[Card List Golden](../../../examples/multi-select-card-list.html) | `PASS` | `2026-08-25` | `UNASSIGNED` | 既有验证覆盖 Selection Control、当前结果全选/取消、Selection Summary、Card Actions、Batch Actions、More、危险操作确认和反馈；Card Body 不拥有选择切换。Golden 预置选择仍为 Example Specific，不改变生成默认值。 |
| `starter.template.card-list` | Visual Quality | Manual Review | None | `UNVERIFIED` | `null` | `UNASSIGNED` | Golden 与 Docs Preview 已存在，但当前包内没有满足 Contract 的实际页面截图、viewport/theme 上下文和带审查人的 Manual Review 结论；不得仅凭 Golden 或源码存在写 `PASS`。 |

返回 [Evidence Record Registry](evidence-index.md)。
