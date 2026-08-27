# DesignKit Golden Example Mapping

本文件维护 Starter Capability 从业务意图到 Decision、Template、Golden Example 和 Validation 的可追踪关系。它只登记知识映射，不修改 Golden、Template、Runtime 或组件实现。所有 Validation Reference 都按 [Validation Contract](validation/validation-contract.md) 解释，实际执行结果按 [Evidence Model](validation/evidence-model.md) 记录。

## 1. Mapping Schema

| Field | Required | Definition |
| --- | --- | --- |
| Capability ID | Yes | 必须与 `capability-registry.md` 中的稳定 ID 完全一致。 |
| Profile | Yes | 当前映射所属的 `Starter` 或 `Docs Full`；不同 Profile 不共享未声明的 Golden。 |
| Intent | Yes | 用户希望完成的业务任务，不是组件或文件名称。 |
| Decision Reference | Yes | 选择 Template 或 Interaction Pattern 的决策知识；可以包含多个 reference。 |
| Template Reference | Yes | 约束页面结构、状态所有权和允许能力子集的 Profile-specific Template。 |
| Golden Example | Yes | 只读 AI 输出参考样例；没有独立 Golden 时必须明确写为间接映射。 |
| Validation Reference | Yes | Functional、Responsive、Theme、Accessibility、Interaction、Visual Quality、Geometry / Composition Fidelity 和 Implementation Provenance 的检查来源或证据入口；入口存在不等于已执行。 |
| Status | Yes | 使用 Capability Registry 状态语义；本文件当前使用 `READY` 或 `PARTIAL`。 |
| Missing Knowledge | Yes | 尚未形成直接链路、独立证据或明确状态的知识；没有时写 `None`。 |

映射链路固定为：

```text
Capability
    ↓
Decision
    ↓
Template
    ↓
Template Usage Contract
    ↓
Golden Example
    ↓
Validation
```

Mapping `READY` 表示上述五层已经可追踪，不代表所有验证在当前会话中实际运行。实际执行状态必须由验证报告单独记录。

每个 `Template Reference` 都必须同时读取 [Template Usage Contract](template-usage-contract.md)，以区分 Template Selected、Template Used 和实际 Fidelity；Golden mapping 不得只凭模板文件存在而声明已使用。

## 2. Starter Mapping

| Capability ID | Profile | Intent | Decision Reference | Template Reference | Golden Example | Validation Reference | Status | Missing Knowledge |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | Starter | 扫描、对齐和比较高密度结构化数据 | [Template Selection](decisions/template-selection.md) Rule 1、Rule 3 | [Basic List Template](../../../distribution/designkit-starter-v1/templates/list.md) | [Basic List Golden](../../../distribution/designkit-starter-v1/examples/list.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Template Tests](../../../packages/docs/site/src/styles/__tests__/template-pages.test.mjs) | `READY` | P1：Responsive、Theme、Accessibility 和 Interaction 的最近一次执行证据尚未按 Capability 独立登记 |
| `starter.template.card-list` | Starter | 浏览、识别、选择和轻量管理具有明显视觉特征的对象 | [Template Selection](decisions/template-selection.md) Rule 2；[Interaction Pattern](decisions/interaction-pattern.md) | [Card List Template](../../../distribution/designkit-starter-v1/templates/card-list.md) | [Card List Golden](../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Card List Integration](../../../packages/docs/site/src/styles/__tests__/starter-card-list-integration.test.mjs) | `READY` | P1：浏览器、Theme 和 Accessibility 最近一次执行证据尚未按 Capability 独立登记 |
| `starter.template.basic-form` | Starter | 创建或编辑数据并完成校验、提交和重置 | [Template Selection](decisions/template-selection.md) Rule 6 | [Basic Form Template](../../../distribution/designkit-starter-v1/templates/form.md) | [Basic Form Golden](../../../distribution/designkit-starter-v1/examples/form.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Template Tests](../../../packages/docs/site/src/styles/__tests__/template-pages.test.mjs) | `READY` | P1：Form 的 Theme、Accessibility 和 Interaction 证据仍聚合在通用检查中 |
| `starter.template.basic-detail` | Starter | 只读查看一个已有对象的信息、状态和元数据 | [Template Selection](decisions/template-selection.md) Rule 5 | [Basic Detail Template](../../../distribution/designkit-starter-v1/templates/detail.md) | [Basic Detail Golden](../../../distribution/designkit-starter-v1/examples/detail.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Detail Tests](../../../packages/docs/site/src/styles/__tests__/detail-template.test.mjs) | `READY` | P1：Detail 的 Theme、Accessibility 和 Interaction 证据仍聚合在通用检查中 |
| `starter.component.table-toolbar` | Starter | 在已选 Starter Template 中呈现选择摘要、模板允许的轻量批量操作、基础筛选容器和操作状态 | [Interaction Pattern](decisions/interaction-pattern.md) Sections 2–5；[Design Decisions](design-decisions.md) TableToolbar | [Basic List Template](../../../distribution/designkit-starter-v1/templates/list.md)、[Card List Template](../../../distribution/designkit-starter-v1/templates/card-list.md) | 间接映射：[Basic List Golden](../../../distribution/designkit-starter-v1/examples/list.html)、[Card List Golden](../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[TableToolbar Integration](../../../packages/docs/site/src/styles/__tests__/starter-table-toolbar-integration.test.mjs) | `PARTIAL` | P1：没有独立 TableToolbar Golden；两个模板使用不同 Starter capability subset，验证证据必须按模板区分 |
| `starter.interaction.selection` | Starter | 通过显式 Selection Control 维护当前 Card List 的页面级 Selection Set | [Interaction Pattern](decisions/interaction-pattern.md) Section 5 | [Card List Template](../../../distribution/designkit-starter-v1/templates/card-list.md) | 间接映射：[Card List Golden](../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Card List Integration](../../../packages/docs/site/src/styles/__tests__/starter-card-list-integration.test.mjs) | `PARTIAL` | P1：没有独立 Selection Golden；Golden 预置选择是 Example Specific，不是生成默认值 |
| `starter.interaction.batch-actions` | Starter | 对 Card List 当前 Selection Set 执行轻量本地多对象操作 | [Interaction Pattern](decisions/interaction-pattern.md) Sections 2–4 | [Card List Template](../../../distribution/designkit-starter-v1/templates/card-list.md) | 间接映射：[Card List Golden](../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html) | [Quality Checklist](../../../distribution/designkit-starter-v1/references/quality-checklist.md)、[Card List Integration](../../../packages/docs/site/src/styles/__tests__/starter-card-list-integration.test.mjs)、[TableToolbar Integration](../../../packages/docs/site/src/styles/__tests__/starter-table-toolbar-integration.test.mjs) | `PARTIAL` | P1：没有独立 Batch Actions Golden；当前只覆盖本地 Mock 和当前选择集合，不覆盖跨页、服务端、权限或持久化能力 |

Basic List 的 Starter projection 目前采用模板专属的 Continuous Data Region inset：top `4px`、inline `16px`（底部沿用模板实现）。这只是该模板的已核对 evidence，不是尚未解决的 universal list spacing contract；其他 Docs Full / template surfaces 仍需按各自 canonical evidence 判断。

## 3. Golden Rule

Golden Example 是 AI 输出参考样例，不是公共组件 API。

必须遵守：

1. Golden 用于理解已批准的页面结构、能力组合、状态和视觉基准，不用于推断未登记能力。
2. 组件 Props、Events、Slots、Types 和 Runtime export 必须从对应 Profile Knowledge 和已查证 API 读取，不能从 Golden 源码猜测。
3. Golden 中的业务名称、图片、Mock 数据、默认选择和操作组合可能是 Example Specific，不是 Template Default。
4. 生成结果可以参考 Golden 的结构和能力边界，但不得复制完整业务数据、页面私有实现或组件内部代码。
5. Golden 是只读资产。本映射只记录路径，不授权修改、覆盖、格式化或重新冻结 Golden。
6. Starter Golden 只证明对应 `starter.*` Capability 的组合参考，不自动成为 `docs.*` Capability 的 React/Vue Golden。
7. 一个 Golden 可以间接覆盖多个能力，但每个 Capability 必须分别登记 Intent、Decision、Template、Validation 和 Missing Knowledge。
8. Golden 存在不等于 Capability `READY`；缺少 Decision、Template 或 Validation 时仍应标记为 `PARTIAL` 或其他真实状态。
9. Golden 中出现的 Export、预置选择、批量动作或业务控件，如果 Capability Registry 未登记，只能标记为 Example Specific；不能反向扩大 Starter capability scope。

### Card List Export boundary

当前 Card List Golden 包含 Export 入口，但 Starter Capability Registry 和 Card List Template 不支持真实 Export。按照 canonical hierarchy，该入口在知识层暂按 `Example Specific / non-Starter evidence` 解释；本映射不修改 Golden，也不授权生成页面实现 Export。

如果未来要把 Export 变为 Starter capability，必须先完成独立 Design Decision、Capability Registry 登记、Template/Validation 更新和 Starter Projection；在此之前不得将该入口写成 Card List 的默认能力。

### Card List anatomy mapping

`starter.template.card-list` 的 Golden 对以下内容具有权威性：

- 紧凑横向媒体与内容关系；
- 标题、状态摘要和次级元数据的层级；
- 悬浮/聚焦可见、选中后保持可见的 Selection Control；
- 底部序号与 Card Actions 的关系；
- 单卡最多三个可见入口、More overflow、Card Actions 与 Batch Actions 的边界；
- 基于可用内容宽度和最小可读卡宽的 Grid 响应式组合。

以下内容不是生成默认值或 Starter 能力授权：

- Golden 的业务文案、图片、价格、Mock 数据和预置选择；
- Golden 中出现的 Export 入口，它仍是 `Example Specific / non-Starter evidence`；
- Golden 的具体像素校准值，除非对应 Template Contract 明确将其提升为规则。

Card List 实现不得用顶部大图 Banner、新的 border/shadow/selected badge、常驻未选中选择框或自定义 Footer 层级替换上述 anatomy。若需要变化，必须有明确的 Template variation 或新的 Capability/Design Decision；本映射不授权自行发明。

### Card List geometry baseline (measured evidence)

以下是本阶段直接从仓库内 Golden 原文件通过真实浏览器 viewport 重新测量的证据，不是 universal token：

| Viewport | Grid | Card | Media | Content | Footer | Surface |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 | 3 columns, 360px, 8px gap | 360 × 142px | 60 × 60px | 100px high; x inset 18px from card | 40px | border none; shadow none; radius 12px; content top radius 10px |
| 768 | 2 columns, 356px, 8px gap | 356 × 142px | 60 × 60px | 100px high; x inset 18px from card | 40px | border none; shadow none; radius 12px; content top radius 10px |
| 390 | 1 column, 358px, 8px row gap | 358 × 142px | 48 × 48px | 100px high; x inset 14px from card | 40px | border none; shadow none; radius 12px; content top radius 10px |

Invariant relationships are the compact horizontal card, media-to-content pairing, one-line 16px/24px regular title, 12px metadata, 4px action gap, 40px subordinate footer, and Selection anchored 14px from the card border-box top/right (equivalent to 12px from the padded content region). Responsive variables are available width, column count, media size at the 420px breakpoint, metadata gap (16px → 8px), and action wrapping. Card width is derived from page content width and column count; it is not a universal fixed pixel value.

The Golden currently has no card border or shadow. A generated card adding a border, divider, larger content height, heavier title weight, or taller footer is a Geometry / Composition Fidelity deviation even when Runtime components are correctly bound.

The previously approved Card List baseline also specifies a 12px outer card radius, 10px content top radius, Runtime/Arco `IconPlus` for batch publish, `IconSwap` for batch move, and `IconDelete` for batch delete. Batch delete retains its explicit target and confirmation pattern; persistent danger styling is not inferred from the Golden's example-specific action data and follows the [destructive visual policy](decisions/interaction-pattern.md#destructive-visual-policy). The prior 6px/hand-authored-image treatment was a stale projected baseline and is not authoritative.

### Card List geometry contract

**Preserve:** compact horizontal anatomy, left media relationship, title/metadata hierarchy, subordinate footer, anchored selection, and action alignment.

**Adapt:** card width from available content width, responsive column count, business copy, media asset, metadata values, and approved action labels.

**Do not invent:** taller marketing cards, media-dominant tiles, large typography, oversized footer, extra card layers/chrome, new selected badges, or alternate selection geometry.

## 4. Validation Mapping

[Validation Contract](validation/validation-contract.md) 定义验证目标和 Pass Criteria；[Evidence Model](validation/evidence-model.md) 定义实际验证方法、位置、结果、日期和责任信息。

| Validation dimension | Required checks | Primary references | Mapping rule |
| --- | --- | --- | --- |
| Functional | Normal、Loading、Empty、Error 以及 Capability 适用的查询、重置、分页、选择、提交或批量操作 | Starter Templates、Quality Checklist、integration tests | 只验证 Registry 批准的 Starter 子集；真实服务、权限或跨页能力不能由 Mock 推断 |
| Responsive | 宽/窄容器、Toolbar 换行、Card Grid 或 Table 内部滚动、页面无异常横向溢出 | Starter Quality Checklist、Template/Card/TableToolbar integration tests | 每个 Template Capability 单独记录；组件级能力必须注明通过哪个 Template 间接验证 |
| Theme | Light/Dark 下文字、背景、状态、Selected、Hover、Focus、Disabled 和图标可读 | Starter Quality Checklist、Golden browser evidence | Manifest 中的汇总字符串不能代替逐 Capability 的 Theme evidence |
| Accessibility | 可访问名称、Keyboard、可见 Focus、非颜色状态提示、Selection Summary 一致性 | Starter Quality Checklist、Card List/Interaction checks | 静态存在 `aria-*` 不等于实际键盘或读屏验证完成 |
| Interaction | Normal/Loading/Empty/Error、Selection、Batch Action、More、Confirmation、Feedback、防重复和错误恢复 | [Interaction Pattern](decisions/interaction-pattern.md)、Starter templates、integration tests | 只验证 Registry 和 Template 已批准的交互，不从 Golden 推断跨页或真实服务能力 |
| Visual Quality | 页面层级、排版、间距、对齐、状态样式和相对同 Profile Golden 的明显偏差 | Starter Golden、Design Rules、browser screenshots、Manual Review | Golden 路径或源码存在不是视觉通过证据；必须记录实际页面和审查上下文 |
| Geometry / Composition Fidelity | Golden-derived computed geometry、比例关系、surface、card density、responsive columns、screenshot pairs | Golden geometry baseline、Template Usage Contract、Browser Validation、geometry comparison test | 保存 viewport、innerWidth、scrollWidth、computed rects、delta 和 screenshot path；不得用 universal pixel threshold 替代关系判断 |
| Implementation Provenance | Runtime 资源、approved exports、Runtime-backed DOM、theme binding 和禁止的 native/custom substitutes | Implementation Binding Contract、Runtime Manifest、Static Check、Browser Validation | UI 存在或视觉相似不等于已使用 DesignKit implementation；缺少可定位资源和 DOM 证据时不得写为 PASS |

Validation Reference 表示应读取的规则或证据入口，不表示本次 Knowledge 修改运行过对应测试或浏览器验证。发布或 Freeze 前应记录实际命令、结果、Runtime/Profile 和未验证项。

## 5. Maintenance Rule

新增能力必须同步：

```text
Capability Registry
        +
Decision Rule
        +
Template
        +
Golden Example
        +
Validation
```

维护要求：

1. Capability ID 必须先在 Registry 登记，再加入本映射；不得为不存在的能力创建孤立 Golden mapping。
2. Decision Rule 必须说明用户为何选择该 Template 或 Interaction Pattern。
3. Template Reference 必须属于同一 Profile，并明确能力子集和状态所有权。
4. Golden Example 必须标明直接或间接映射，以及 Example Specific 状态。
5. Validation Reference 必须覆盖适用的 Functional、Responsive、Theme、Accessibility、Interaction、Visual Quality、Geometry / Composition Fidelity 和 Implementation Provenance；未执行的维度不得写为已通过。
6. 任一映射字段缺失时，Status 不得标记为 `READY`。
7. Golden、Template、Decision 或 Registry 状态变化时同步更新本文件；不能只更新其中一个路径。
8. 修改本映射不授权修改 Golden、Runtime、Components、Docs、版本或发布资产。

## 6. Missing Knowledge and Priority

### P0 — RESOLVED in Knowledge Layer

- Validation Contract 已统一 Starter 验证目标，并将 Runtime Manifest 定义为实现侧证据来源之一，而不是 Starter Validation Contract。
- Evidence Model 已统一逐 Capability 的验证方法和 last-run 记录字段。
- 冻结 R1 的 `selectedBusinessExports` 文字属于 expected pre-projection drift；R2 source validation 已按 [Validation Contract](validation/validation-contract.md) 移除该过时 requirement，改用真实 Runtime export、CSS 和 Browser Evidence。

### P1

- 仍需补录每个 Starter Capability 的实际 Evidence Records；规则、测试入口和 Golden 路径不能代替执行证据。
- Runtime Manifest 仍不包含 `selectedBusinessExports`；这不再阻塞 R2 source validation。若未来要恢复该字段，必须由 Runtime/Manifest owner 单独批准 schema 和投影任务。
- `starter.component.table-toolbar` 没有独立 Golden，目前通过 Basic List 和 Card List 间接映射。
- `starter.interaction.selection` 与 `starter.interaction.batch-actions` 共用 Card List Golden，没有独立交互 Golden。
- Basic List、Basic Form、Basic Detail 的 Responsive、Theme、Accessibility 和 Interaction 证据仍主要聚合在通用 Checklist 或测试中。
- Card List Golden 的预置选择需要持续标记为 Example Specific，避免 AI 将其作为生成默认值。
