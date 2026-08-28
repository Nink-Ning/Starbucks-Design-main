# DesignKit Starter Capability Registry

本文件是 Source Capability Registry 的 Non-Developer Starter Projection。Source Knowledge 是唯一事实源；本投影只登记 `starter.*` 能力，不定义 Runtime API、组件实现、版本或发布状态。

能力链路读取：

- [Profile Router](profile-routing.md)：确认请求是否属于 Starter。
- [Template Selection](decisions/template-selection.md)：选择页面模板。
- [Interaction Pattern](decisions/interaction-pattern.md)：选择页面内部交互。
- [Golden Example Mapping](golden-example-mapping.md)：追踪 Template、Golden 和 Validation。
- [Validation Contract](validation/validation-contract.md)：读取验证目标。
- [Evidence Model](validation/evidence-model.md)：记录实际验证结果。

## 1. Starter boundary

Starter Profile 面向 Non-Developer 用户，只生成使用 Fixed Runtime、本地 Mock 数据和少量页面脚本的 Single HTML Demo。

```text
Runtime capability exists
        !=
Starter capability is approved
```

AI 只有在本 Registry 存在对应 `starter.*` Capability ID，并且当前 Status 和 Template Boundary 允许时，才能将能力用于生成。未登记能力一律视为 Starter 范围外。

## 2. Projection schema

| Field | Definition |
| --- | --- |
| Capability ID | 与 Source Registry 完全一致的稳定 `starter.*` ID。 |
| Capability Name | 面向人和 AI 的能力名称。 |
| Type | `Template`、`Business Component`、`Pattern` 或 `Foundation`。 |
| Boundary | Starter 允许的任务、状态和明确禁止扩展的范围。 |
| Package Assets | 包内 Implementation、Knowledge 或组合资产路径。 |
| Golden Example | 包内只读参考；没有独立 Golden 时说明间接覆盖。 |
| Validation | 包内规则或证据入口；入口存在不等于已执行。 |
| Status | 保留 Source Registry 当前状态。 |
| Conflict | 当前已知的 Starter 内部冲突或误用风险。 |
| Next Action | 后续 Knowledge 工作，不授权修改实现或发布资产。 |

## 3. Status semantics

| Status | Starter generation rule |
| --- | --- |
| `READY` | 可以按本行 Boundary 使用；不代表当前会话已经完成验证。 |
| `PARTIAL` | 只使用对应 Template 已明确批准的子集；缺失证据或未覆盖维度标记为 `UNVERIFIED`。 |
| `CONFLICTED` | 使用更窄的 Template 和 Knowledge 边界，并显式报告冲突。 |

本投影不包含范围外能力行。请求未登记能力时，由 Profile Router 的 Unsupported Handling 处理。

## 4. Starter capability projection

| Capability ID | Capability Name | Type | Boundary | Package Assets | Golden Example | Validation | Status | Conflict | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `starter.template.basic-list` | Basic List | Template | 高密度结构化数据扫描、对齐和比较；固定为 Search + Refresh，不启用选择、批量操作、导出或列设置 | [Template](../templates/list.md)、[Component Catalog](component-catalog.md) | [Basic List Golden](../examples/list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | None | 保持 Non-Developer、Single HTML 和 Fixed Runtime 边界 |
| `starter.template.card-list` | Card List | Template | 依赖视觉特征的对象浏览、选择和轻量管理；只覆盖当前结果、本地选择和本地 Mock 操作 | [Template](../templates/card-list.md)、[Component Catalog](component-catalog.md) | [Card List Golden](../examples/multi-select-card-list.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | 不包含跨页选择、真实导出、权限或服务端任务 | 保持空选择为生成默认；Golden 预置选择只属于示例 |
| `starter.template.basic-form` | Basic Form | Template | 创建或编辑结构稳定的数据；支持基础校验、提交 Loading、本地成功反馈和重置 | [Template](../templates/form.md)、[Component Catalog](component-catalog.md) | [Basic Form Golden](../examples/form.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | 不包含分步表单、动态字段、上传、自动保存或审批流程 | 补充逐维度 Evidence Records |
| `starter.template.basic-detail` | Basic Detail | Template | 只读查看单个对象；使用批准的单区块详情结构、基础状态和本地操作反馈 | [Template](../templates/detail.md)、[Component Catalog](component-catalog.md) | [Basic Detail Golden](../examples/detail.html) | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | 不包含复杂模块、导出、表格、时间线、Tabs 或真实接口 | 补充逐维度 Evidence Records |
| `starter.component.table-toolbar` | TableToolbar | Business Component | Non-Developer 页面支持；允许 selection summary、模板批准的轻量 batch actions、basic filtering container 和 action state display，不提供工程级配置或高级扩展 | [Business Component Knowledge](../business-components/table-toolbar.md)、[Component Catalog](component-catalog.md) | 由 [Basic List](../examples/list.html) 和 [Card List](../examples/multi-select-card-list.html) 间接覆盖 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `READY` | Basic List 与 Card List 使用不同能力子集 | 按模板区分验证证据，不从 Runtime 扩大范围 |
| `starter.pattern.quick-filter` | Quick Filter | Pattern | 仅允许 TableToolbar 已查证的 1～3 个轻量 Search、Select、ButtonGroup 或完整 DateRange；不含 Label、校验、复杂联动或查询面板 | [TableToolbar Knowledge](../business-components/table-toolbar.md)、[Component Catalog](component-catalog.md) | 由 Basic List 与 Card List Golden 间接覆盖 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 不得用多个 Quick Filters 伪造高级筛选 | 补充 Capability-specific Decision 和 Evidence |
| `starter.interaction.selection` | Local Selection | Pattern | Card List 页面拥有当前结果的 Selection Set、全选和半选；Card Body 不改变选择 | [Card List Template](../templates/card-list.md)、[Interaction Pattern](decisions/interaction-pattern.md) | [Card List Golden](../examples/multi-select-card-list.html) 间接覆盖 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | Golden 的预置选择不是生成默认值 | 维持 Example Specific 与 Template Default 的边界 |
| `starter.interaction.batch-actions` | Batch Actions | Pattern | 只对当前 Selection Set 执行轻量本地多对象操作；页面负责确认、Loading、反馈和恢复 | [Card List Template](../templates/card-list.md)、[TableToolbar Knowledge](../business-components/table-toolbar.md) | [Card List Golden](../examples/multi-select-card-list.html) 间接覆盖 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 不包含跨页、服务端、权限或持久化批处理 | 补充独立交互 Evidence Records |
| `starter.foundation.theme` | Theme | Foundation | Starter 页面跟随批准的 Light/Dark 主题；状态、文本、背景、边框和图标保持可读 | [Design Rules](design-rules.md)、[Quality Checklist](quality-checklist.md) | 四个 Starter Golden 是页面级检查对象 | [Validation Contract](validation/validation-contract.md) | `PARTIAL` | Manifest 汇总状态不能代替逐能力 Theme Evidence | 登记每个模板的 Light/Dark 证据 |
| `starter.foundation.responsive` | Responsive | Foundation | 页面和组件按可用宽度响应；Header/Toolbar 可换行，Card Grid 重排，宽表只在内部容器滚动 | [Design Rules](design-rules.md)、[Template Contract](template-contract.md) | 四个 Starter Golden 是宽/窄检查对象 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | Viewport 与组件容器响应式不能混为同一证据 | 登记逐模板 viewport/container 证据 |
| `starter.foundation.accessibility` | Accessibility | Foundation | 核心任务需要语义、可访问名称、键盘操作、可见 Focus、非颜色状态和可感知反馈 | [Template Contract](template-contract.md)、[TableToolbar Knowledge](../business-components/table-toolbar.md) | Goldens 只提供部分页面语义参考 | [Quality Checklist](quality-checklist.md)、[Validation Contract](validation/validation-contract.md) | `PARTIAL` | 静态 `aria-*` 存在不等于完整验证 | 建立 Keyboard、Focus、Name/Role/Value 和反馈证据 |

## 5. Projection maintenance

1. Source Registry 是 Capability ID、Status 和 Boundary 的唯一事实源。
2. Projection 不得新增 Source 中不存在的 `starter.*` 能力，也不得升级 Status。
3. 所有 Package Assets、Golden 和 Validation 链接必须是 Starter 包内相对路径。
4. Runtime、组件或其他文档存在不自动扩大 Starter whitelist。
5. 新能力必须完成 Registry、Decision、Template、Golden、Validation 和 Evidence 链路后再进入本投影。
