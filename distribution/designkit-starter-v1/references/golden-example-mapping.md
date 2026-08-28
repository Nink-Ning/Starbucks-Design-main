# DesignKit Starter Golden Example Mapping

本文件维护 Starter Capability 从 Intent、Decision、Template 到 Golden Example 或批准的 no-Golden strategy，再到 Validation 的包内可追踪关系。它登记 `starter.*` Capability 和 `examples/` 中的只读 Golden，不修改 Template、Golden、Runtime 或组件实现。

验证目标读取 [Validation Contract](validation/validation-contract.md)，记录语义读取 [Evidence Model](validation/evidence-model.md)，当前实际状态从 [Evidence Record Registry](validation/evidence/evidence-index.md) 进入。

## 1. Mapping schema

| Field | Definition |
| --- | --- |
| Capability ID | 必须与 [Capability Registry](capability-registry.md) 完全一致。 |
| Intent | 用户希望完成的业务任务。 |
| Decision Reference | Template 或 Interaction Pattern 决策入口。 |
| Template Reference | 约束结构、状态所有权和能力子集的 Starter Template。 |
| Golden Example | 包内只读参考；没有独立 Golden 时通常标记间接映射。批准的 restricted composition 可以标记 `None`，同时登记 implementation references 和 test-only fixture strategy。 |
| Validation Reference | 包内验证目标或检查入口；入口存在不等于已执行。 |
| Status | 保留 Source Mapping 的 `READY` 或 `PARTIAL`。 |
| Missing Knowledge | 尚未形成的独立 Golden 或 Evidence。 |

```text
Capability
    ↓
Decision
    ↓
Template
    ↓
Golden Example or approved no-Golden strategy
    ↓
Validation
```

## 2. Starter mapping

| Capability ID | Intent | Decision Reference | Template Reference | Golden Example | Validation Reference | Status | Missing Knowledge |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | 扫描、对齐和比较高密度结构化数据 | [Template Selection](decisions/template-selection.md) Rule 1、Rule 3 | [Basic List Template](../templates/list.md) | [Basic List Golden](../examples/list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | Evidence Record 已登记；6 类实际执行结果仍为 `UNVERIFIED` |
| `starter.template.card-list` | 浏览、识别、选择和轻量管理具有明显视觉特征的对象 | [Template Selection](decisions/template-selection.md) Rule 2；[Interaction Pattern](decisions/interaction-pattern.md) | [Card List Template](../templates/card-list.md) | [Card List Golden](../examples/multi-select-card-list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | Evidence Record 已登记；Functional、Responsive、Theme、Accessibility、Interaction 为 `PASS`，Visual Quality 为 `UNVERIFIED`（5 / 1） |
| `starter.template.basic-form` | 创建或编辑数据并完成校验、提交和重置 | [Template Selection](decisions/template-selection.md) Rule 5 | [Basic Form Template](../templates/form.md) | [Basic Form Golden](../examples/form.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | Theme、Accessibility 和 Interaction 证据仍聚合在通用检查中 |
| `starter.template.basic-detail` | 只读查看一个已有对象的信息、状态和元数据 | [Template Selection](decisions/template-selection.md) Rule 4 | [Basic Detail Template](../templates/detail.md) | [Basic Detail Golden](../examples/detail.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | Theme、Accessibility 和 Interaction 证据仍聚合在通用检查中 |
| `starter.component.table-toolbar` | 在批准的 Starter Template 中呈现选择摘要、轻量批量操作、基础筛选容器和操作状态 | [Interaction Pattern](decisions/interaction-pattern.md) Sections 2–5；[TableToolbar Knowledge](../business-components/table-toolbar.md) | [Basic List](../templates/list.md)、[Card List](../templates/card-list.md) | 间接映射：[Basic List Golden](../examples/list.html)、[Card List Golden](../examples/multi-select-card-list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 没有独立 TableToolbar Golden；两个模板使用不同能力子集；静态契约为 `CONFLICTED`，6 条执行记录为 `UNVERIFIED` |
| `starter.pattern.default-application-shell` | 以固定 Top + Side + Main outer composition 包裹已批准 Template | [Application Shell Contract](application-shell.md) Shell Mode Decision | 已选 Starter Template；Shell 只负责 outer wrapper | None；Docs Menu patterns 仅为 `IMPLEMENTATION REFERENCE` | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md)；后续 test-only composition fixture | `READY` | Support state `SUPPORTED`；本阶段无 Shell HTML，Browser Evidence 为 `UNVERIFIED` |
| `starter.interaction.selection` | 通过显式 Selection Control 维护 Card List 页面级 Selection Set | [Interaction Pattern](decisions/interaction-pattern.md) Section 5 | [Card List Template](../templates/card-list.md) | 间接映射：[Card List Golden](../examples/multi-select-card-list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 没有独立 Selection Golden；Golden 预置选择是 Example Specific；Functional、Accessibility、Interaction 为 `PASS`，Responsive、Theme、Visual Quality 为 `UNVERIFIED`（3 / 3） |
| `starter.interaction.batch-actions` | 对 Card List 当前 Selection Set 执行轻量本地多对象操作 | [Interaction Pattern](decisions/interaction-pattern.md) Sections 2–4 | [Card List Template](../templates/card-list.md) | 间接映射：[Card List Golden](../examples/multi-select-card-list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 没有独立 Batch Actions Golden；不覆盖跨页、服务端、权限或持久化能力；Functional、Accessibility、Interaction 为 `PASS`，Responsive、Theme、Visual Quality 为 `UNVERIFIED`（3 / 3） |

### Default Application Shell strategy

- Top：Docs Menu / “品牌色模式导航”，status `IMPLEMENTATION REFERENCE`；
- Side：Docs Menu / “缩起内嵌菜单”，status `IMPLEMENTATION REFERENCE`；
- Starter Golden：`None`；
- Validation：后续 test-only composition fixture，验证 1280/768/390、Light/Dark、document overflow、ownership 和 accessibility。

Implementation Reference 不是 Starter Golden，也不是当前 browser `PASS` evidence。

## 3. Destructive action visual policy

The Card List Golden maps delete to the approved Runtime icon and confirmation behavior. Persistent destructive entries use neutral/default/secondary treatment by default; red remains reserved for error/status semantics unless an approved pattern explicitly authorizes a red action treatment. The Golden's business action data is example-specific and must not override this interaction policy.

## 4. Golden rule

Golden Example 是 AI 输出参考样例，不是公共组件 API。

1. Golden 只用于理解批准的页面结构、能力组合、状态和视觉基准。
2. 组件用法必须从 [Component Catalog](component-catalog.md) 和对应 Knowledge 读取，不能从 Golden 猜测。
3. Golden 的业务名称、图片、Mock 数据、默认选择和操作组合可能是 Example Specific，不是 Template Default。
4. 可以参考结构和能力边界，不复制完整业务数据、页面私有实现或组件内部代码。
5. Golden 是只读资产；本映射不授权修改、覆盖或重新冻结。
6. 一个 Golden 可以间接覆盖多个 Capability，但每项必须分别登记 Intent、Decision、Template、Validation 和 Missing Knowledge。
7. Golden 存在不等于 Capability `READY`，也不等于验证已经执行。

## 5. Validation mapping

| Validation type | Required checks | Package references |
| --- | --- | --- |
| Functional | Normal、Loading、Empty、Error 和 Capability 适用的查询、重置、分页、选择、提交或批量操作 | Templates、[Quality Checklist](quality-checklist.md) |
| Responsive | 宽/窄容器、Toolbar 换行、Card Grid 或 Table 内部滚动、页面无异常横向溢出 | [Design Rules](design-rules.md)、Templates、Golden browser evidence |
| Theme | Light/Dark 下文本、背景、状态、Hover、Focus、Selected、Disabled 和图标可读 | Goldens、[Quality Checklist](quality-checklist.md) |
| Accessibility | 可访问名称、Keyboard、可见 Focus、非颜色提示和 Selection Summary 一致性 | [Interaction Pattern](decisions/interaction-pattern.md)、[Quality Checklist](quality-checklist.md) |
| Interaction | Selection、Single/Batch Action、More、Confirmation、Feedback、防重复和错误恢复 | [Interaction Pattern](decisions/interaction-pattern.md)、Templates |
| Visual Quality | 页面层级、排版、间距、对齐、状态样式和相对 Golden 的明显偏差 | Goldens、[Design Rules](design-rules.md)、Manual Review |

每类 Pass Criteria 读取 [Validation Contract](validation/validation-contract.md)，实际状态读取 [Evidence Record Registry](validation/evidence/evidence-index.md)。没有可定位执行证据时不得把映射、规则入口或 Golden 存在解释为 `PASS`。

## 6. Maintenance rule

新增能力通常必须同步 Capability Registry、Decision Rule、Template、Golden Example 和 Validation。所有链接必须指向 Starter 包内资产；不得引入包外实现、测试或知识路径。`starter.pattern.default-application-shell` 是经批准的 restricted composition exception，以 package-local contract、named implementation references 和 test-only fixture strategy 替代完整 Golden。

## 7. Remaining knowledge

- [Evidence Record Registry](validation/evidence/evidence-index.md) 已覆盖 5 个优先 Capability；35 条记录中有 15 条 `PASS`、19 条 `UNVERIFIED` 和 1 条 TableToolbar 静态契约 `CONFLICTED`。
- `starter.component.table-toolbar`、`starter.interaction.selection` 和 `starter.interaction.batch-actions` 仍通过模板 Golden 间接覆盖。
- Quick Filter、Theme、Responsive 和 Accessibility 当前没有独立 Golden Mapping 行；它们按 Registry Boundary 在模板级检查。
- Card List Golden 的预置选择必须持续保持 Example Specific。
