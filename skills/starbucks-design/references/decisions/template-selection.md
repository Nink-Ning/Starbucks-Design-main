# DesignKit Template Selection

本文件只负责根据用户意图选择页面模板模式。它不选择组件 API、不定义模板内部结构，也不因为某个实现或 Demo 存在就声明该能力可用。

## 1. Decision Purpose

Template selection happens before implementation selection.

先回答“用户需要哪一种页面模式”，再回答“所选 Profile 是否登记并允许实现该模式”。不要先看到某个组件、Demo 或 Runtime export，再反向决定页面类型。

决策输出应包含：

- Selected Profile；
- Candidate Template；
- Candidate Capability ID；
- 选择依据；
- 排除的相邻模板；
- 需要由 Capability Registry 确认的状态或冲突。

本文件选择 Candidate Template；[Capability Registry](../capability-registry.md) 决定该 Candidate 是否可以在当前 Profile 中使用。

## 2. Supported Templates

### Starter Profile

Starter Profile 只允许以下 AI generation targets：

| Template | Capability ID | Primary intent |
| --- | --- | --- |
| Basic List | `starter.template.basic-list` | 高密度结构化数据的扫描、对齐和比较 |
| Card List | `starter.template.card-list` | 依赖图片、封面或明显视觉特征的对象浏览和选择 |
| Basic Form | `starter.template.basic-form` | 创建或编辑数据 |
| Basic Detail | `starter.template.basic-detail` | 只读查看单个对象的信息 |

Starter Template 的具体能力子集由 Starter Skill 和对应模板决定。选择模板不能扩大 Capability Registry 或 Starter Manifest 的白名单。

### Docs Full Profile

Docs Full Profile 可以包含 React/Vue Advanced Templates 和 Additional Patterns，但仍必须查询 Registry Status：

| Template group | Registry candidates | Current decision note |
| --- | --- | --- |
| Full Basic List | `docs.template.basic-list` | Developer React/Vue list integration；不等于 Starter Basic List |
| Filtered Lists | `docs.template.filter-list`、`docs.template.tree-filter-list` | Docs Full only；需要筛选或层级筛选时再选择 |
| Tag Management | `docs.template.tag-management-list` | 当前 Registry 为 `OUTDATED`，不能描述为完成能力 |
| Result Page | `docs.template.result-page` | 当前 Registry 为 `OUTDATED`；Starter 不支持 |
| Form Variants | `docs.template.form-variants` | Basic、Grouped、Step 的候选集合；当前 Registry 为 `OUTDATED` |
| Detail Variants | `docs.template.detail-variants` | Basic、Card、Data、Secondary 的候选集合；当前 Registry 为 `OUTDATED` |
| Dashboard、Login、Tree Table | 对应 `docs.template.*` entries | 当前为 `OUTDATED`，只能报告现状或作为后续候选 |

Docs Full 中出现 Advanced Template、Additional Pattern 或部分实现，不代表可以跳过 Registry Status、跨框架完整度和验证检查。当前没有 `docs.template.card-list` 登记；React/Vue Card List 请求不得借用 `starter.template.card-list` 作为工程模板。

## 3. Decision Matrix

### Table/List vs Card List

| Decision factor | Prefer Table / Basic List | Prefer Card List | Rule |
| --- | --- | --- | --- |
| Data density | 字段多、记录多、单位面积信息密度高 | 每个对象信息较少，视觉区域占比更高 | 高密度本身优先 List，不通过缩小卡片文字模拟 Table |
| Visual recognition | 主要依靠名称、编号、状态和字段识别 | 主要依靠图片、封面、商品外观或其他明显视觉特征识别 | 只有视觉识别是核心任务时才选择 Card List |
| Comparison requirement | 需要跨行对齐、多字段比较、排序或快速扫描 | 主要逐个浏览，不依赖严格列对齐 | 比较需求优先于展示偏好 |
| Selection behavior | 结构化对象选择，或选择只是批量操作的前置状态 | 用户需要边看视觉对象边选择 | “需要选择/批量操作”本身不是 Card List 的充分条件 |

附加规则：

- 用户只说“列表”且没有证据表明视觉识别是核心任务时，选择 Basic List。
- 视觉识别和多字段比较同等重要时，说明两种模式的取舍并请求确认，不静默选择。
- Starter Basic List 当前能力子集不因选择需求自动增加；如果需求超出其 Registry 边界，应报告范围问题，而不是为了获得批量操作改选 Card List。

### Result Page vs Detail Page

| Decision factor | Prefer Result Page | Prefer Detail Page | Rule |
| --- | --- | --- | --- |
| Operation completion | 操作已经成功、失败或因网络问题中断，需要表达一次结果 | 没有完成事件，用户正在查看既有对象 | Result 描述事件结果，Detail 描述对象信息 |
| Information viewing | 只需简短结果、影响说明和有限后续入口 | 需要持续查看字段、状态、关系和对象操作 | 信息浏览量大或需要长期返回时选择 Detail |
| Lifecycle | 短暂的流程终点或过渡页 | 对象生命周期中的稳定查看入口 | 不把 Detail 当作操作成功提示，也不把 Result 当作对象详情容器 |

Starter Profile 当前不支持 Result Page。命中 Result 意图时应由 Registry 返回 unsupported/out-of-scope 处理；不得静默改成 Basic Detail。只有用户的真实意图是查看已存在对象时才选择 Detail。

### Form vs Detail

| Decision factor | Prefer Form | Prefer Detail | Rule |
| --- | --- | --- | --- |
| Create/Edit | 创建新对象、修改字段、校验和提交 | 不修改数据 | 存在明确写入目标时选择 Form |
| Read-only | 不适合；只读字段不应伪装成可编辑表单 | 查看字段、状态、元数据和关系 | 只读查看选择 Detail |
| Primary task | 完成输入并保存 | 理解对象当前状态 | 以用户主要任务而不是页面上控件数量判断 |

如果用户同时需要查看和编辑：

- 查看是主要任务、编辑是偶发动作：选择 Detail，并把编辑视为后续流程；
- 编辑是主要任务、现有值只是输入基线：选择 Form；
- 两者同等重要且交付只能包含一个 Starter 页面：请求用户确认主任务，不把 Form 和 Detail 合并成新的未登记模板。

## 4. Decision Rules

### Rule 1 — Structured data scanning

Intent: 查看、扫描、排序或比较一组结构化对象。

Signals: 多字段；行间对齐；状态比较；记录数量较多；用户提到表格、列、排序或分页。

Select: Starter 使用 `starter.template.basic-list`；Docs Full 使用 `docs.template.basic-list` 或在明确需要筛选时选择已登记的 Filtered List candidate。

Avoid: 不因希望页面“更好看”而选择 Card List；不把 Docs Full List 能力带入 Starter。

### Rule 2 — Visual object browsing

Intent: 浏览、识别并可能选择具有明显视觉特征的对象。

Signals: 图片、封面、商品外观、视觉资产、缩略图是主要识别方式；用户需要边看边选。

Select: Starter 使用 `starter.template.card-list`。

Avoid: 高密度字段比较；只因为有 Checkbox 或批量操作就选择 Card List；React/Vue 请求借用 Starter Card List 作为工程实现。

### Rule 3 — Ambiguous list request

Intent: 用户只说“列表页”，没有提供足够的呈现或比较需求。

Signals: 没有视觉识别说明；没有明确多字段比较；没有框架或输出细节。

Select: Profile 已确定为 Starter 时默认 `starter.template.basic-list`；Profile 尚未确定时先返回 [Profile Router](../profile-routing.md)。

Avoid: 静默推断 Card List；在 Profile 未确定时选择实现。

### Rule 4 — Operation outcome

Intent: 表达提交、创建、保存、审批或其他操作的完成结果。

Signals: 成功、失败、网络异常、完成确认、返回或继续下一步。

Select: Docs Full candidate `docs.template.result-page`，然后查询 Registry Status；Starter 请求进入 unsupported handling。

Avoid: 用 Detail Page 替代结果反馈；在 Registry 为 `OUTDATED` 时描述为 Ready。

### Rule 5 — Read an existing object

Intent: 查看一个已存在对象的字段、状态、关系或元数据。

Signals: 详情、查看、只读、概览、对象信息；没有数据修改目标。

Select: Starter 使用 `starter.template.basic-detail`；Docs Full 使用 `docs.template.detail-variants` candidate 并查询其状态。

Avoid: 使用只读 Form 模拟 Detail；根据 Docs 变体名称扩大 Starter Basic Detail。

### Rule 6 — Create or edit data

Intent: 创建对象或编辑现有数据并提交。

Signals: 新建、编辑、填写、校验、保存、重置、提交。

Select: Starter 使用 `starter.template.basic-form`；Docs Full 使用 `docs.template.form-variants` candidate 并查询其状态。

Avoid: 用 Detail Page 承担数据录入；在没有分组或流程证据时推断 Grouped/Step Form。

### Rule 7 — Mixed view and edit

Intent: 同一需求同时包含对象理解和修改。

Signals: “查看并编辑”“详情里直接修改”“先确认信息再提交”。

Select: 根据主要任务选择 Detail 或 Form；主要任务不明确时请求确认。

Avoid: 将两个模板合并为未登记的 all-in-one page；因为组件实现存在就跳过 Template Decision。

## 5. Routing Relationship

```text
SKILL.md
    ↓
Profile Router
    ↓
Template Decision
    ↓
Capability Registry
    ↓
Template Usage Contract
    ↓
Interaction Pattern Decision
    ↓
Profile-specific Template / Component references
```

各层职责：

- `SKILL.md`：识别输出要求并启动 Agent Workflow；
- [Profile Router](../profile-routing.md)：选择 Starter 或 Docs Full；
- 本文件：根据业务意图选择 Candidate Template 和 Capability ID；
- [Capability Registry](../capability-registry.md)：验证 Profile、Status、Conflict、Golden 和 Validation，决定是否允许实现；
- [Template Usage Contract](../template-usage-contract.md)：确认已选 Template 是实现基线，并约束页面 anatomy、组合、spacing relationships 和 responsive behavior；
- [Interaction Pattern](interaction-pattern.md)：模板和能力确认后，选择 Single/Batch Action、More Menu、Selection Ownership 和交互验证要求；
- [Design Decisions](../design-decisions.md)：模板确定后处理布局、容器、操作位置和其他页面级设计选择。

Template Decision 不能把 `DOCS_ONLY`、`OUTDATED`、`UNSUPPORTED` 或 `PROPOSED` candidate 升级为 Starter 能力。Registry 拒绝 candidate 时，应报告缺失、简化到已支持模板或请求用户切换 Profile，不得偷偷选择最近似实现。Template Selected 之后仍必须证明 Template Used；不得仅调用低层组件就跳过 Template Usage Contract。

Interaction decisions happen after template usage baseline is established。只有 Registry 确认 Candidate 的当前 Profile 和能力边界后，才使用 Interaction Pattern 选择页面内部交互；不得通过交互需求反向扩大 Template 或 Profile。

## 6. Maintenance Rules

新增 Template 必须同步：

```text
Capability Registry
        +
Decision Rules
        +
Golden Example
        +
Validation
```

维护要求：

1. 新模板先定义用户 Intent、Signals、Select 和 Avoid，再选择实现方式。
2. 不同 Profile 中的同名模板使用独立 Capability ID，不能共享未声明的能力子集。
3. Registry 必须记录 Implementation、Docs、Skill、Golden Example、Validation、Status 和 Conflict。
4. Golden Example 必须映射到唯一 Profile 和 Capability ID；Starter Golden 不自动成为 Docs Full Golden。
5. Validation 至少分别记录 Functional、Responsive、Theme、Accessibility 和 Visual Quality。
6. 缺少 Registry、Decision Rule、Golden 或 Validation 的模板不得标记为 Starter `READY`。
7. 模板范围或状态变化时，同时更新本文件和 Registry；Runtime、Docs 或 Demo 单独变化不自动改变决策结果。
8. 本文件不保存组件 API、模板源码、页面私有样式或实现步骤。
