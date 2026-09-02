# DesignKit Starter Interaction Pattern

本文件在 Template 已确定且 [Capability Registry](../capability-registry.md) 已确认后，选择页面内部的操作范围、入口和状态所有权。它不定义组件 API，不扩大 Starter Boundary。

## 1. Decision order

```text
Template Selection
        ↓
Capability Registry confirmation
        ↓
Interaction Pattern Decision
        ↓
Template / Component Knowledge
        ↓
Validation
```

Basic List 当前没有选择或批量操作子集；Card List 才允许 `starter.interaction.selection` 和 `starter.interaction.batch-actions`。不能为了满足交互需求跳过模板边界。

## 2. Single action vs batch action

| Factor | Single Object Action | Batch Action |
| --- | --- | --- |
| Target | 一个明确对象 | 当前 Selection Set 中的多个对象 |
| Placement | Row、Card 或对象上下文 | Toolbar 或批量操作区 |
| Selection dependency | 不依赖页面选择集合 | 必须依赖非空 Selection Set |
| Confirmation | 描述当前对象 | 描述选中数量和影响范围 |
| State source | 当前对象和该操作状态 | 页面拥有的 Selection Set 和批量状态 |

### Single Object Action

Intent: 对一个明确对象执行查看、编辑、复制、状态切换或删除等局部操作。

Signals: 入口位于当前 Row 或 Card，文案可以指向一个对象，不需要 Selection Summary。

Select: 使用当前模板的 Row Actions 或 Card Actions；危险操作确认和反馈只关联当前对象。

Avoid: 不放入依赖 Selection Set 的 Batch Actions，不让单对象操作隐式影响其他对象。

### Batch Action

Intent: 对用户明确选择的一组对象执行相同操作。

Signals: 存在非空 Selection Set、Selection Summary 和多对象影响范围。

Select: 只有 Card List 和 Registry 明确支持时使用 Batch Actions。操作读取页面拥有的同一 Selection Set；选择为空时不可执行。

Avoid: 不逐个复用 Card Actions 模拟批处理；不把新增或导入当作 Batch Action；不生成跨页、服务端、权限或持久化批处理。

## 3. Card actions vs batch actions

| Pattern | Scope | State dependency | Placement |
| --- | --- | --- | --- |
| Card Actions | Single entity | 当前 Card 和该操作自身状态 | Card 对象操作区 |
| Batch Actions | Selection set | 页面拥有的 Selection Set | Toolbar 或批量操作区 |

规则：

- Card Action 只作用于当前 Card，与该 Card 是否被选择无关。
- Batch Action 只作用于 Selection Set，不包含未选择对象。
- 两者具有独立的目标解析、确认范围、Loading 和反馈。
- 同名动作不能因为位置不同而隐式改变作用范围。

## 4. More Menu decision

| Direct display | Move into More |
| --- | --- |
| 高频、核心、需要快速访问 | 低频、次级、不需持续占据主要入口 |
| 可以用清晰短文案表达 | 危险操作，仍需独立确认 |

规则：

1. 按业务频率和优先级排序，不按实现数组或示例顺序猜测。
2. 低频、次级和危险操作进入 More；More 不能替代危险操作确认。
3. More 触发器和菜单项必须有可访问名称并支持键盘。
4. 响应式折叠保持原有业务优先级，不复制组件折叠算法。
5. 同一操作不得同时作为固定入口和静态 More 项重复出现。
6. 菜单内所有操作均不可用时，More 入口同步不可用并保持原因一致。

## 5. Selection ownership

页面或页面模板拥有唯一 Selection Set：

```text
Page-owned Selection Set
        ├─ Selection Control reads and updates
        ├─ Card selected state reads
        ├─ Toolbar selection summary reads
        └─ Batch Actions read targets and availability
```

规则：

- Card、TableToolbar 和 More Menu 不分别维护选择集合。
- Card Body 默认不改变选择；只有具有明确可访问名称的 Selection Control 可以改变选择。
- Card Selected 状态从页面 Selection Set 派生。
- Toolbar Summary、禁用状态和 Batch Action 目标使用同一个 Selection Set。
- 选择为空时，依赖选择的操作不可执行。
- Card List 全选只处理当前筛选结果和本地页面状态，不推断跨页选择。
- 筛选、删除或本地数据变化后，由页面协调 Selection Set。

## 6. Validation mapping

### Destructive visual policy

危险操作的行为语义与持久化视觉 treatment 是两个独立决策。Toolbar、Row、Card 或 More 中持续可见的危险入口，默认使用已批准的 neutral/default/secondary treatment，不因动作会删除、停用或移动对象就长期渲染为红色 danger 控件。入口仍须保留明确动作名称、Runtime/Arco icon binding、对象范围和可访问名称。

确认流程必须保留 explicit target、consequence、Cancel、Confirm 和 result feedback；Confirm 遵循已批准的中性确认变体（若存在），Cancel 不得 mutation。若 Runtime 没有该变体，记录 `RUNTIME COMPONENT HIERARCHY GAP`，不得用页面私有 CSS 或臆造 variant 绕过。红色仍保留给 error/status 等语义状态，以及明确由既有 DesignKit pattern 授权的局部确认状态。

| Dimension | Validate | Failure examples |
| --- | --- | --- |
| Accessibility | 操作有可访问名称，Selected 不只依赖颜色，不可用原因可理解 | 图标无名称；只用背景色表示选中 |
| Keyboard | Selection Control、直接操作、More、确认和反馈可通过键盘使用，Focus 可见 | Card Body 截获选择；菜单只能鼠标打开 |
| Confirmation | 危险 Single/Batch Action 执行前确认，批量确认说明数量和范围 | 危险操作立即执行；More 被当作确认 |
| Feedback | 提供 Loading、防重复、成功或失败反馈，失败保留必要上下文 | 重复提交；失败无反馈；伪造成功 |
| Selection consistency | Card、Summary、Toolbar 状态和执行目标来自同一集合 | 数量不一致；无选择仍执行 |
| Scope consistency | Card Action 只处理当前对象，Batch Action 只处理 Selection Set | 单对象动作影响多项；批量包含未选择对象 |

实际结果按 [Validation Contract](../validation/validation-contract.md) 和 [Evidence Model](../validation/evidence-model.md) 记录。静态属性存在不等于浏览器和键盘验证已经通过。

## 7. Maintenance rule

新增交互模式必须同步 Decision Rule、Capability Registry、Template、Golden Example 和 Validation。缺少任一项时不得登记为 Starter `READY`。
