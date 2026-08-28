# DesignKit Starter Validation Contract

本文件定义 Non-Developer Starter Capability 必须证明什么。实际证据按 [Capability Validation Evidence Model](evidence-model.md) 记录，并由 [Capability Registry](../capability-registry.md) 和 [Golden Example Mapping](../golden-example-mapping.md) 引用。

## 1. Scope and boundary

Starter Validation 面向使用 Fixed Runtime 生成的 Single HTML Demo，验证 Registry 批准的 Capability 是否遵守对应 Decision、Template、Golden 和 Interaction Boundary。

```text
Starter Validation
        !=
Runtime Internal Validation
```

| Scope | Purpose | Typical evidence | Does not prove |
| --- | --- | --- | --- |
| Starter Validation | 验证生成页面的功能、响应式、主题、无障碍、交互和视觉质量 | Static Check、Browser Validation、必要的 Manual Review，以及适用的既有 Build Validation | Runtime 的全部 export、内部实现或发布完整性 |
| Runtime Internal Validation | 验证 Runtime bundle、export、CSS、hash 和加载契约 | Runtime tests、[Runtime Manifest](../../runtime/runtime-manifest.json)、bundle inspection | Starter Template 已正确组合能力，也不自动证明页面交互、主题、无障碍或视觉质量 |

两类验证可以互相提供证据，但不能互相替代。

## 2. Validation categories

### 2.1 Functional

**Purpose:** 确认 Capability 在批准的 Template 和本地 Demo 边界内完成用户任务，并正确处理必需状态。

**Check:** 检查 Normal、Loading、Empty、Error、数据展示、查询/重置、分页、选择、提交或批量操作等适用行为；不得宣称 Registry 未批准的真实服务、权限、跨页或持久化能力。

**Evidence Required:** 至少一项可复现的 Static Check 或 Browser Validation；涉及实际状态转换时必须包含 Browser Validation。

**Pass Criteria:** 所有适用状态和动作产生预期结果，无阻断性控制台错误；不适用项明确标记，不以 Mock 行为冒充真实服务。

### 2.2 Responsive

**Purpose:** 确认页面在目标宽度和窄容器中保持可读、可操作，并遵守 Template 的布局和溢出策略。

**Check:** 检查宽/窄 viewport 或 container、Header/Toolbar 换行、Card Grid 重排、Table 内部滚动、Popup 可用性和页面横向溢出。

**Evidence Required:** Browser Validation 的 viewport/container 记录和截图或可复现观察；Static Check 只能作为布局规则的补充证据。

**Pass Criteria:** 关键内容和操作可达，无意外遮挡或页面级横向滚动；宽表只在批准的内部容器滚动。

### 2.3 Theme

**Purpose:** 确认 Capability 在 Light/Dark 主题下保持语义、状态和可读性一致。

**Check:** 检查文本、背景、边框、图标、Hover、Focus、Selected、Disabled、Loading、Empty 和 Error 状态。

**Evidence Required:** Light 与 Dark 的 Browser Validation；必要时附截图和 Manual Review。Static Check 不能替代渲染证据。

**Pass Criteria:** 两个主题下内容清晰可读，状态可区分，交互不因主题失效，无严重主题特定视觉问题。

### 2.4 Accessibility

**Purpose:** 确认生成页面可通过语义、键盘和可见反馈完成核心任务。

**Check:** 检查 Name/Role/Value、标签关联、键盘可达性、焦点顺序、可见 Focus、选择摘要、错误和状态反馈，以及非颜色信息表达。

**Evidence Required:** Static Check 与 Browser Validation 的键盘走查；复杂语义或视觉判定需要 Manual Review。仅存在 `aria-*` 不能作为完整证据。

**Pass Criteria:** 核心流程无需鼠标即可完成，焦点可见且顺序合理，控件有可访问名称，动态状态可感知，信息不只依赖颜色。

### 2.5 Interaction

**Purpose:** 确认 Template 交互遵守 [Interaction Pattern](../decisions/interaction-pattern.md) 的状态所有权、动作范围和反馈规则。

**Check:** 检查 Single/Batch Action、Selection Set、Card 与 Toolbar 状态同步、More、危险操作确认、Loading 防重复、成功/失败反馈和错误恢复。

**Evidence Required:** 状态转换必须包含 Browser Validation；Static Check 可验证事件连接和边界；确认、反馈和视觉状态需要截图或 Manual Review。

**Pass Criteria:** 动作作用于正确对象或 Selection Set，Card Body 不意外改变选择，Toolbar 摘要一致，危险操作有确认，重复提交受控且反馈明确。

### 2.6 Visual Quality

**Purpose:** 确认输出达到 Golden 和 Design Rules 表达的页面层级、排版、间距、对齐和状态质量。

**Check:** 对照同 Capability 的 Golden、Template 和 [Design Rules](../design-rules.md) 检查结构、层级、密度、间距、对齐、截断和明显视觉回退。

**Evidence Required:** 实际页面截图与 Manual Review；Browser Validation 提供 viewport、theme 和状态上下文。源码或 Golden 路径本身不是视觉证据。

**Pass Criteria:** 无影响理解或操作的结构和样式偏差，无明显错位、裁切、重叠或未处理状态。

## 3. Evidence semantics

1. 每个 Capability 按适用 Validation Type 独立记录。
2. 未执行、证据不足或证据过期时记录 `UNVERIFIED`。
3. `PASS` 必须有 Evidence Location 和实际 Last Verified；规则、测试文件或 Golden 存在不等于已执行。
4. 间接通过 Template 验证的组件或交互必须记录 Template、Runtime、theme、viewport 和场景。
5. Capability、Template、Golden、Runtime 或本 Contract 发生影响性变化后，相关证据需要重新验证或标记失效。
6. Result、Method 和聚合规则读取 [Evidence Model](evidence-model.md)。

## 4. Quality Checklist and Runtime Manifest resolution

```text
Knowledge Layer defines validation target
        ↓
Quality Checklist operationalizes target
        ↓
Runtime Manifest may provide implementation evidence
        ↓
Evidence Model records actual verification
```

- [Quality Checklist](../quality-checklist.md) 是操作性检查，不拥有 Runtime Manifest Schema。
- [Runtime Manifest](../../runtime/runtime-manifest.json) 是实现侧证据来源之一，不是 Starter Validation Contract。
- Checklist 与 Manifest 不一致时，不修改或臆造字段；对应证据记录为 `CONFLICTED` 或 `UNVERIFIED`。
- 独立 Static Check 或 Browser Validation 可以证明 Capability 目标，但不能把缺失字段描述为已满足。

### `selectedBusinessExports` conflict

当前 Quality Checklist 要求 Runtime Manifest 通过 `selectedBusinessExports` 登记 `TableToolbar`，而当前 Runtime Manifest 没有该字段。

Canonical tracking entry：[TableToolbar `selectedBusinessExports` Conflict Record](conflicts/table-toolbar-selected-business-exports.md)。Current Status 为 `CONFLICTED`；在记录中的 Closure Criteria 满足前，不得删除该冲突或改为 `PASS`。

1. 验证目标是确认 Fixed Runtime 提供真实 `TableToolbar`，并能在批准的 Starter Template 中工作。
2. 缺失字段必须作为 Manifest Evidence 的 `CONFLICTED` 或 `UNVERIFIED` 项，不能静默 `PASS`。
3. 可使用 `typeof StarbucksReact.TableToolbar === 'function'`、Runtime CSS 存在检查和实际 Starter 页面 Browser Validation 作为独立证据。
4. 即使独立证据证明 Capability 目标，Checklist 的 Manifest 字段断言仍保持未满足，直到实现侧另行对齐。
5. 本 Contract 不要求、授权或执行 Runtime Manifest 修改。

推荐由后续单独授权的 Knowledge Layer 任务先确认正式 Manifest schema。若 `selectedBusinessExports` 不是正式字段，优先将 Quality Checklist 改为直接 export、CSS 和 Starter Browser Evidence；若 schema owner 确认该字段必须存在，则另开 Runtime 任务。两条路径都必须重新验证并同步 Conflict Record、TableToolbar Evidence 和 Evidence Index，本 Contract 不执行该变更。

## 5. Maintenance rule

新增或扩大 Starter Capability 时，必须同步 Capability Registry、Decision Rule、Template、Golden Mapping、适用 Validation Categories 和 Evidence Records。任何单一证据来源都不得自动扩大 Starter whitelist。
