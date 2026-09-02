# DesignKit Interaction Pattern

本文件负责在页面模板已经确定后，选择页面内部的操作范围、操作入口、选择状态归属和验证要求。它不定义组件 API、不复制模板实现，也不扩大当前 Profile 的 Capability Registry 边界。

## 1. Decision Purpose

Interaction decisions happen after template selection.

先通过 [Template Selection](template-selection.md) 选择页面模板，再通过 [Capability Registry](../capability-registry.md) 确认该 Profile 和模板允许的能力，最后使用本文件决定：

- 操作作用于单个对象还是选择集合；
- 操作直接展示还是进入 More Menu；
- 谁拥有 Selection State；
- 哪些确认、反馈和可访问性验证必须随交互一起存在。

```text
Template Selection
        ↓
Capability Registry confirmation
        ↓
Interaction Pattern Decision
        ↓
Profile-specific Template / Component references
        ↓
Validation
```

Interaction Pattern 只能使用当前模板已批准的能力。Starter Basic List 当前没有批量操作子集；Starter Card List 才允许 Registry 中登记的本地选择和轻量批量操作。不能为了满足交互需求而跳过 Template 或 Registry 边界。

Starter Card List 的选择和批量交互分别登记为 `starter.interaction.selection` 与 `starter.interaction.batch-actions`。两个 Capability 都通过 Card List Template 和 Golden Example 间接验证，不代表存在独立公共组件或独立 Golden。

## 2. Single Action vs Batch Action

### Decision matrix

| Factor | Single Object Action | Batch Action |
| --- | --- | --- |
| Target | 一个明确对象 | 当前 Selection Set 中的多个对象 |
| Trigger context | Row、Card 或对象上下文 | Toolbar 或批量操作区 |
| Selection dependency | 不依赖页面选择集合 | 必须依赖非空 Selection Set |
| Copy and confirmation | 描述当前对象 | 描述选中数量和影响范围 |
| State source | 当前对象和该操作状态 | 页面拥有的 Selection Set 和批量操作状态 |

### Single Object Action

Intent: 对一个明确对象执行查看、编辑、复制、状态切换、删除或其他局部操作。

Signals: 操作入口位于当前 Row 或 Card；文案可以指向一个对象；执行结果不应影响未明确选择的其他对象；不需要 Selection Summary。

Select: 使用当前模板的 Row Actions 或 Card Actions，将操作范围限定为当前对象。危险操作在执行前确认，异步状态和结果反馈只关联该对象。

Avoid: 不放入依赖 Selection Set 的 Batch Actions；不为了复用 Toolbar 而把单对象操作包装成批量操作；不让同一次单对象动作隐式作用于其他对象。

### Batch Action

Intent: 对用户明确选择的一组对象执行相同操作。

Signals: 存在非空 Selection Set；需要 Selection Summary；操作文案能够说明多对象影响；执行前需要核对选择范围。

Select: 只有当前模板和 Registry 明确支持时，使用 Batch Actions 或对应 Toolbar 操作。批量操作读取页面拥有的同一 Selection Set；选择为空时不可执行。

Avoid: 不逐个复用 Card Actions 模拟批处理；不在没有显式选择时推断目标；不把新增、导入等创建数据入口当作 Batch Action；Starter 不生成跨页、服务端、权限或持久化批处理能力。

## 3. Card Actions vs Batch Actions

| Pattern | Scope | Intent | State dependency | Placement |
| --- | --- | --- | --- | --- |
| Card Actions | Single entity | Local operation | 当前 Card 和该操作自身状态 | Card 的对象操作区 |
| Batch Actions | Selection set | Multi-object operation | 页面拥有的 Selection Set | Toolbar 或批量操作区 |

Card Actions：

- 只作用于当前 Card 表示的 single entity；
- 是 local operation，与其他 Card 是否被选择无关；
- 操作文案、可访问名称、确认和反馈应能识别当前对象；
- 不读取 Selection Summary 来决定操作目标；
- 不因为同名 Batch Action 存在就与其共享执行状态。

Batch Actions：

- 只作用于当前 selection set；
- 是 multi-object operation，不隐式包含未选择对象；
- Selection Summary、禁用状态、确认范围和执行对象必须来自同一 Selection Set；
- 与 Card Actions 独立配置和执行，即使业务文案相似也不能复用单对象语义；
- Starter 只使用模板批准的本地 Mock 批量能力。

同一个业务动词可以同时存在 Card Action 和 Batch Action，但必须具有不同的目标解析、确认范围、Loading 和反馈。不要通过判断按钮所在位置以外的隐式状态改变操作范围。

## 4. More Menu Decision

### Visibility matrix

| Direct display | Move into More |
| --- | --- |
| 高频操作 | 低频操作 |
| 当前任务的核心操作 | 次级操作 |
| 需要快速访问、频繁重复的操作 | 不需要持续占据主要入口的操作 |
| 能以清晰短文案直接表达的操作 | 危险操作，仍需独立确认 |

Decision rules：

1. 先按用户任务频率和业务优先级排序，不按实现数组或设计稿出现顺序猜测优先级。
2. 直接展示只保留高频、核心、需要快速访问的操作；具体外露数量由当前 Template 或真实组件负责。
3. 低频、次级和危险操作进入 More Menu；进入 More 不会降低其风险等级。
4. 危险操作必须在执行前确认，More Menu 不能替代确认。
5. More 触发器和菜单项必须具有清晰可访问名称，并保持键盘可操作。
6. 操作进入响应式折叠时保持原有业务优先级；不要复制组件的折叠算法。
7. 同一操作不得同时作为固定直接入口和静态 More Menu 项重复出现；真实组件因响应式自动折叠不视为重复配置。
8. 菜单内所有操作均不可用时，触发入口的不可用状态和原因应保持一致。

## 5. Selection Ownership

### Single source of truth

页面或页面模板拥有 Selection State。Selection Set 是 Selection Control、Selection Summary 和 Batch Actions 的唯一数据源。

```text
Page-owned Selection Set
        ├─ Selection Control reads and updates
        ├─ Card selected state reads
        ├─ Toolbar selection summary reads
        └─ Batch Actions read targets and availability
```

### Ownership rules

- Card、TableToolbar 或 More Menu 不分别维护独立 Selection Set。
- Card Body 默认不改变 selection。只有 Checkbox 或其他具有明确可访问名称的 Selection Control 可以改变 selection。
- Card 的 selected presentation 从页面 Selection Set 派生，不能只使用 Card 内部视觉状态。
- Toolbar 与 Card 共享同一个页面拥有的 Selection Set：Card Selection Control 更新集合，Toolbar 读取由该集合派生的数量和批量操作可用状态。
- Selection Summary 必须与真实集合数量一致；选择为空时，依赖选择的 Batch Actions 不可执行。
- “全选”范围由当前模板定义。Starter Card List 只处理当前筛选结果和本地页面状态，不推断跨页选择。
- 筛选、删除或本地数据变化后，页面负责协调 Selection Set；Toolbar 和 Card 不各自恢复或猜测选择。
- Card Actions 仍然作用于当前 Card，不因该 Card 同时处于 Selection Set 中就自动变为 Batch Action。

### Select All state model and scope

Selection Control 必须表达三个状态：

```text
none             → unchecked
partial          → indeterminate
all applicable   → checked
```

Header Select All、Row/Card Selection Controls、Selected presentation、Toolbar Summary 和 Batch Actions 必须共享同一 Page-owned Selection Set。全选范围由当前 Template 和 Capability evidence 决定：例如 Starter Card List 使用当前筛选结果的本地页面状态；Starter Basic List 当前没有 Selection 子集。不得把某一个模板的 current-page 或 filtered-dataset 语义静默推广为 universal rule，也不得从 Golden 的预置选择推断默认选中状态。

## 6. Filter ordering

当同一 Toolbar 同时包含 Selector-style filters、Free-text Search 和 Utility Actions 时，推荐顺序为：

```text
Selector Filters → Free-text Search → Utility Actions
```

这是可复用的交互顺序建议，不固化具体业务字段（例如 Status 必须先于 Category）。实际字段数量、提交时机和可用类型仍由当前 Template、Capability Registry 和 TableToolbar profile 决定。

## 7. Row Actions

Row Actions 必须使用已批准的 DesignKit row-action pattern。AI 不应自行创建 custom icon/text button treatment，也不应通过页面私有 CSS 发明 action border、background、radius 或 hover 语义。

实现必须明确：

1. action priority：高频、核心动作优先直接展示；低频、次级或危险动作进入 More；
2. More overflow：遵守当前 Template/真实组件的入口数量和原有优先级，More 本身只计一个入口；
3. danger placement：危险动作可进入 More，但仍必须独立确认；
4. object-specific accessible name：Row Action、More trigger 和菜单项必须能识别当前对象，不能只提供无上下文的“操作”或图标名称。

Row Action 只作用于当前 Row 对象，不得读取或修改 Batch Selection Set 来改变目标范围。

### Component usage fidelity

当已批准组件承担某个交互入口时，Fidelity 不仅要求运行时来源正确，还必须保留该组件的批准用法：

- 使用批准的 component variant/type；
- 使用批准的 icon binding（例如 Runtime/Arco Icon，而不是文字、emoji、手绘 SVG 或 CSS 伪图标）；
- 使用与当前交互契约一致的 `status`；危险语义本身不自动要求持久化入口使用 danger treatment，除非该入口的 approved pattern 明确授权；
- 保持该入口的 action priority、scope 和 interaction ownership。

因此，Runtime Button + 错误 variant、Runtime TableToolbar + 错误 icon，或被明确授权使用 danger treatment 的危险入口却使用错误状态，均属于 Component Usage Fidelity 偏差，即使底层组件 provenance 正确也不能标记为完整 PASS。未被明确授权的持久化危险入口使用 neutral/default/secondary 是本规则的默认要求。

## 8. Dangerous actions

任何 Dangerous Action 都必须遵循：

```text
explicit target → Cancel → Confirm → result feedback
```

确认前不得执行 mutation。Cancel 必须不修改数据；Confirm 才能执行目标对象的 mutation，并提供成功或失败反馈。Batch Dangerous Action 还必须说明 selected count 或 affected scope。More Menu 不能替代确认，也不能因为动作位于 More 中而降低风险等级。

### Destructive visual policy

危险操作的行为语义与持久化视觉 treatment 是两个独立决策：

- Toolbar、Row、Card 或 More 中持续可见的危险入口，默认使用已批准的 neutral/default/secondary treatment；不要仅因动作会删除、停用或移动对象就长期渲染为红色 danger 控件。
- 持久化入口仍必须保留明确的动作名称、适当的 Runtime/Arco icon binding、对象范围和可访问名称；进入 More 不会降低其风险等级，也不会取消确认要求。
- 确认流程必须保留 explicit target、consequence、Cancel、Confirm 和 result feedback；Confirm 的视觉层级应遵循已批准的中性确认变体（若存在），Cancel 不得 mutation。若 Runtime 没有可表达的 approved neutral confirmation variant，记录 `RUNTIME COMPONENT HIERARCHY GAP`，不得用页面私有 CSS 或臆造 variant 绕过。
- 红色仍然保留给 error/status 等语义状态，以及明确由现有 DesignKit pattern 授权的局部确认状态。不得为实现本规则而移除错误、离线或失败状态的红色语义。

## 9. Validation Mapping

| Validation dimension | Validate | Failure examples |
| --- | --- | --- |
| Accessibility | Selection Control、Card/Row Action、More trigger、菜单项和 Toolbar 操作有可访问名称；Selected 不只依赖颜色；不可用原因可理解 | 只有图标无名称；只用背景色表示选中；读屏无法识别操作对象 |
| Keyboard | Selection Control、直接操作、More Menu、确认入口和反馈关闭均可通过键盘使用；Focus 可见且顺序合理 | Card Body 截获选择；菜单只能鼠标打开；关闭确认后 Focus 丢失 |
| Confirmation | 危险 Single Action 和 Batch Action 执行前确认；Batch confirmation 说明数量和范围 | 危险操作立即执行；批量确认未说明影响对象；More 被误当作确认 |
| Feedback | 操作提供 Loading、防重复、成功或失败反馈；失败不清除必要上下文；不伪造成功 | 重复提交；失败无反馈；还未执行就显示成功 |
| Selection consistency | Card 状态、Selection Summary、Toolbar 可用状态和实际执行目标来自同一 Selection Set | 数量不一致；未选择仍执行；隐藏对象被意外加入当前结果全选 |
| Scope consistency | Card Action 只处理当前对象；Batch Action 只处理 Selection Set | 单对象操作影响多项；批量操作包含未选择对象 |

验证时必须记录实际检查的 Profile、Template、Capability ID 和状态。静态存在 `aria-*`、确认文案或反馈组件不等于交互已经通过浏览器和键盘验证；未执行的验证应标记为未验证。

## 10. Maintenance Rule

新增交互模式必须同步：

```text
Decision Rule
      +
Capability Registry
      +
Template
      +
Golden Example
      +
Validation
```

维护要求：

1. Decision Rule 必须定义 Intent、Signals、Select、Avoid 和作用范围。
2. Capability Registry 必须登记 Profile、Status、Conflict 和 Validation，不因组件 API 存在而自动进入 Starter。
3. Template 必须明确状态所有者、交互入口、可用能力子集和非适用场景。
4. Golden Example 必须映射到唯一 Profile、Template 和 Capability，不把 Example Specific 状态当作默认行为。
5. Validation 必须覆盖 Accessibility、Keyboard、Confirmation、Feedback、Selection Consistency 和 Scope Consistency。
6. 同名交互模式跨 Starter 与 Docs Full 使用时，分别说明能力边界；Docs Full 高级能力不得反向扩展 Starter。
7. 缺少任一同步项时，交互模式不得被登记为 Starter `READY`。
8. 本文件不保存组件 API、事件签名、模板源码、页面私有样式或响应式实现算法。
