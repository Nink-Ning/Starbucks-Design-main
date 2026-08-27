# DesignKit Profile Router

本文件负责将用户需求路由到 Starter Profile 或 Docs Full Profile。选定 Profile 后，页面或模板请求先读取 [Template Selection](decisions/template-selection.md) 选择 Candidate Template，再读取 [Capability Registry](capability-registry.md) 判断具体能力是否可用；非模板请求可以直接查询 Registry。本文件不定义组件 API、模板结构或 Runtime 能力。

## 1. Profile Definition

### Starter Profile

Starter Profile 面向 Non-Developer 用户，适用于产品经理、设计评审参与者和没有前端工程环境的使用者。

交付契约：

- 输出可通过浏览器直接预览的 Single HTML Demo；
- 使用 DesignKit Starter V1 的 Fixed Runtime；
- 使用本地 Mock 数据和少量页面级 JavaScript；
- 只使用 Capability Registry 中 `Profile` 包含 `Starter` 的 Approved Capability Whitelist；
- 不生成 React/Vue 工程，不要求 Node.js、npm、Vite、Webpack 或 TypeScript；
- 不因 Runtime export、Docs Demo 或完整组件 API 存在而扩大 Starter 能力。

当前 Starter V1 页面白名单：

- `starter.template.basic-list`；
- `starter.template.card-list`；
- `starter.template.basic-form`；
- `starter.template.basic-detail`。

页面只能组合 Capability Registry 已登记的 Starter Business Component、Pattern 和 Foundation 子集。

### Docs Full Profile

Docs Full Profile 面向 Developer 用户和设计系统维护者，适用于 React/Vue 工程、组件 API、框架集成和完整 DesignKit 能力查询。

交付契约：

- 允许 React/Vue 工程级实现；
- 可以读取完整组件 API、业务组件 Docs、Framework Skill 和页面模板 Demo；
- 可以讨论 Docs Full 中的完整组件能力和页面模板变体；
- 必须保留 React/Vue、公共 API、兼容性和工程验证边界；
- 不把 Docs Full 能力自动标记为 Starter 支持。

## 2. Routing Rules

### Direct intent mapping

| User intent | Profile | Routing reason |
| --- | --- | --- |
| “无需环境直接打开 HTML Demo” | Starter | 明确要求零工程环境和 Single HTML Demo。 |
| “产品经理生成页面” | Starter | 用户角色和交付目标符合 Non-Developer Edition；如同时明确要求 React/Vue，则进入冲突处理。 |
| “React/Vue 工程” | Docs Full | 明确要求 Developer Edition 的框架和工程交付。 |
| “组件 API 使用” | Docs Full | 需要完整组件 API、框架差异和工程集成知识。 |

### Basic List routing

| User request | Selected Profile | Capability ID | Boundary |
| --- | --- | --- | --- |
| Basic List + “HTML Demo”“无需环境”“浏览器直接打开” | Starter | `starter.template.basic-list` | Non-Developer、Single HTML、Fixed Runtime、Search + Refresh 固定能力子集 |
| Basic List + “React/Vue”“工程接入”“组件集成” | Docs Full | `docs.template.basic-list` | Developer、React/Vue、完整组件集成和 Engineering Usage |

HTML Demo 不得路由到 `docs.template.basic-list`；React/Vue Basic List 不得使用 `starter.template.basic-list` 作为工程模板。只有“Basic List”而没有输出要求时，先按本节的 Profile 规则确认交付形式，再查 Registry。

### TableToolbar routing

| User request | Selected Profile | Capability ID | Boundary |
| --- | --- | --- | --- |
| TableToolbar + “HTML Demo”“Starter generation”“无需工程环境” | Starter | `starter.component.table-toolbar` | Non-Developer AI Generated Page Support；只允许当前 Starter 模板批准的展示与交互子集 |
| TableToolbar + “React/Vue”“组件 API”“工程集成” | Docs Full | `docs.component.table-toolbar` | Developer Component Capability；支持 framework usage、公开 API integration 和公开扩展边界内的 advanced customization |

Starter TableToolbar 允许 selection summary、模板允许的 batch actions、basic filtering container 和 action state display；禁止 component API customization、React/Vue integration、advanced slots、density management 和 engineering-only configuration。Docs Full TableToolbar 不受 Starter 模板子集限制，但仍不得使用未发布 API 或把页面业务职责放入组件。

HTML Demo 或 Starter generation 不得路由到 `docs.component.table-toolbar`；React/Vue engineering 不得把 `starter.component.table-toolbar` 当作完整组件 API 参考。选择 Starter 后还必须读取页面模板，因为 Basic List 与 Card List 使用的 TableToolbar 子集不同。

同义表达按相同规则处理：

- “浏览器直接打开”“单文件 Demo”“不安装环境”“没有 Node.js” → Starter；
- “产品方案验证”“产品评审 Demo”“PM 页面原型”且未要求工程代码 → Starter；
- “React 组件”“Vue 页面”“npm 包”“TypeScript”“工程接入” → Docs Full；
- “Props”“Events”“Slots”“Hooks”“组件类型定义” → Docs Full。

### Routing precedence

按以下优先级判断：

1. 用户明确指定的输出格式；
2. 用户明确指定的工程环境或框架；
3. 用户请求的能力是否存在于目标 Profile；
4. 用户角色和使用场景；
5. 缺少决定性信息时的澄清。

显式输出要求优先于角色。例如，“产品经理需要 React 工程”不能仅凭“产品经理”路由到 Starter。应说明 Single HTML 与 React 工程是两种不同交付契约，并让用户确认；不得静默替换输出格式。

### Ambiguous intent

- 用户只说“生成页面”，同时没有工程、框架或输出要求：先判断是否用于产品评审和零工程预览；无法判断时询问 Single HTML 或 React/Vue 工程。
- 用户只说“列表页”：选定 Profile 后再查 Capability Registry；不得先用 Docs Full Basic List 的完整能力定义替代 Starter Basic List。
- 用户同时要求 Single HTML 和 React/Vue 工程：报告交付冲突，要求选择一个 Profile，不能在一个结果中混合两个契约。
- 用户同时需要 Starter 支持能力和 Docs-only 能力：不得把 Docs-only 能力注入 Starter；提供缩减到 Starter 白名单或切换 Docs Full 两种选项。

## 3. Capability Boundary

以下关系是 Profile Router 的硬约束：

```text
Docs implementation exists
            or
Runtime export exists
            or
Component API exists
              ↓
Does not imply Starter support
```

Starter 支持必须同时满足：

1. Capability Registry 中存在 `starter.*` Capability ID；
2. `Profile` 包含 `Starter`；
3. Starter Skill 明确允许；
4. 对应 Starter Template 明确允许；
5. 只使用该模板已查证的 Runtime API 子集；
6. Registry Status 允许按当前边界使用。

### Registry Status handling

| Registry Status | Router behavior for Starter |
| --- | --- |
| `READY` | 可以按已登记边界路由和生成。 |
| `PARTIAL` | 只允许 Starter Template 已明确批准的子集；未覆盖部分标记为未验证，不自行补全。 |
| `CONFLICTED` | 不合并冲突知识；以 Starter Skill、Starter Template 和已查证 API 的更窄边界执行，并报告冲突。 |
| `DOCS_ONLY` | 不进入 Starter；只有选择 Docs Full 时才可继续。 |
| `OUTDATED` | 不据此扩大能力；先报告知识状态或选择其他已批准能力。 |
| `UNSUPPORTED` | 停止该 Starter 路径，说明不支持。 |
| `PROPOSED` | 只可作为未来候选讨论，不能用于当前 Starter 生成。 |

同名能力必须使用 Capability ID 区分。例如：

- `starter.template.basic-list` 是 Starter 的 Search + Refresh 受限模板；
- `docs.template.basic-list` 是 React/Vue 工程模板，可以包含选择、批量操作、导出和列设置；
- Docs Full 的能力不得反向推断为 Starter Basic List 的组成部分。

## 4. Routing Decision Tree

```text
User Intent
    ↓
Output Requirement
    ├─ Single HTML / no environment / PM review Demo
    │      ↓
    │   Starter Profile
    │
    ├─ React / Vue / component API / engineering integration
    │      ↓
    │   Docs Full Profile
    │
    └─ Missing or contradictory output requirement
           ↓
        Clarify; do not silently select or merge Profiles

Profile Selection
    ↓
Capability Registry Lookup
    ├─ Profile matches + READY
    │      ↓
    │   Route to the registered knowledge and implementation reference
    │
    ├─ Profile matches + PARTIAL / CONFLICTED
    │      ↓
    │   Use only the narrower approved boundary; report missing or conflict
    │
    ├─ DOCS_ONLY in Starter request
    │      ↓
    │   Offer Starter-safe simplification or explicit Docs Full switch
    │
    └─ OUTDATED / UNSUPPORTED / PROPOSED / not registered
           ↓
        Stop unsupported generation and explain the available alternatives
```

Required routing sequence:

```text
User Intent
    ↓
Output Requirement
    ↓
Profile Selection
    ↓
Capability Registry Lookup
    ↓
Profile-specific Skill / Template / Validation
```

Router 只选择 Profile 和 Capability ID。页面结构、Props、状态和验证规则由 Registry 指向的 Profile-specific knowledge 决定。

## 5. Unsupported Handling

### Dashboard

- Starter：`UNSUPPORTED`。不得根据 Docs 中的部分 Dashboard Demo 生成 Starter Dashboard。
- Docs Full：当前 Registry 标记为 `OUTDATED`，实现和验证链路不完整。
- 处理：说明当前 Starter V1 不支持 Dashboard；可以将需求缩减为一个受支持的 Basic List、Card List 或 Basic Detail 单页 Demo。只有用户明确切换到 Developer 交付时，才按 Docs Full 的实际成熟度继续评估，不能描述为完整现成模板。

### Navigation Shell

- Starter：`UNSUPPORTED`。当前 Starter 只交付单页模板，没有已批准的 Application Shell 或多页面导航模板。
- Docs Full：`docs.pattern.navigation-shell` 为 `PARTIAL`，现有 Layout、Menu、Header 和 Sidebar 只是组合证据。
- 处理：对 Starter 请求保留单页结构，或请求用户确认是否切换到 Docs Full。不得因为 Menu、Layout.Sider 或 Docs Sidebar 已存在就声明 Starter 支持 Navigation Shell。

### Advanced FilterBar

- Starter：`UNSUPPORTED`。不得用多个 Quick Filters 或页面私有控件伪造 FilterBar。
- Docs Full：`docs.business.advanced-filter-bar` 为 `DOCS_ONLY`。
- 处理：如果只有 1～3 个无 Label、无校验、无复杂联动的简单条件，可建议缩减为 Starter Quick Filter；需要多字段、Label、校验、查询/重置或展开收起时，必须切换 Docs Full 或报告超出 Starter 范围。

### React Application

- Starter：`UNSUPPORTED`。Starter 不生成 React 工程、npm 配置、TypeScript、Vite 或应用入口。
- Docs Full：路由到 React framework knowledge 和完整组件能力。
- 处理：如果用户同时要求“无需环境”和“React Application”，说明两种交付要求冲突，请用户选择 Single HTML Starter 或 React Docs Full；不得把 React 源码嵌入 Starter 并声称是工程交付。

### General unsupported response

当 Starter 请求命中 `DOCS_ONLY`、`OUTDATED`、`UNSUPPORTED`、`PROPOSED` 或未登记能力时：

1. 明确指出该能力不属于当前 Starter Profile；
2. 说明 Registry 中的实际状态；
3. 提供最接近的 Starter-safe 简化方案；
4. 如果 Docs Full 有相应能力，说明切换 Profile 的交付影响；
5. 等待用户确认，不静默切换 Profile，不伪造缺失能力。

## 6. Maintenance Rule

新能力只有在以下链路全部完成后，才能进入 Starter Profile：

```text
Implementation
      +
Docs
      +
Skill
      +
Golden Example
      +
Validation
      ↓
Starter Capability Review
      ↓
Capability Registry: Profile = Starter
      ↓
Starter Manifest and approved capability whitelist
```

维护要求：

1. Implementation 存在只证明能力可实现，不证明 Starter 可交付。
2. Docs 必须说明适用、不适用、状态所有权和 Profile 边界。
3. Skill 必须能从用户意图路由到稳定 Capability ID。
4. Golden Example 必须是当前 Runtime 可执行的只读组合参考。
5. Validation 必须分别登记 Functional、Responsive、Theme、Accessibility 和 Visual Quality；未执行的维度标记为未验证。
6. 能力进入 Starter 时新增或更新 `starter.*` Registry entry；不得直接把 `docs.*` entry 改名后视为迁移完成。
7. Registry、Starter Skill、Template、Golden、Validation 和 Manifest 必须保持同一能力边界。
8. Runtime、Docs 或组件新增能力不会自动触发 Starter 晋级；Starter 晋级需要独立 Knowledge Migration 和审批。

## Relationship to Capability Registry

Profile Router 与 Capability Registry 的职责顺序固定为：

```text
SKILL.md
    Identify output requirement and start the Agent Workflow
                ↓
profile-routing.md
    Select Profile from user intent and output requirement
                ↓
decisions/template-selection.md
    Select a candidate template from business intent
                ↓
capability-registry.md
    Confirm capability ID, Profile, Status, conflicts and evidence
                ↓
Profile-specific knowledge
    Apply the approved template, component subset and validation rules
```

- `SKILL.md` 回答“从哪个入口开始以及执行什么顺序”；
- 本文件回答“进入哪个 Profile”；
- `decisions/template-selection.md` 回答“用户需要哪一种 Candidate Template”；
- Capability Registry 回答“该 Profile 中哪些能力可用、状态如何”；
- Starter/Docs Full 的具体 reference 回答“如何实现和验证”；
- 任一层都不得越权扩大上一层确定的能力边界。
