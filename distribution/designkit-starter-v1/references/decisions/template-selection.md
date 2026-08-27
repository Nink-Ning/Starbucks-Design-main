# DesignKit Starter Template Selection

本文件只负责根据用户意图选择 Starter 页面模板。Template selection happens before implementation selection。选择结果必须由 [Capability Registry](../capability-registry.md) 确认，不能因为 Runtime 或示例存在而扩大支持范围。

## 1. Supported templates

| Template | Capability ID | Primary intent |
| --- | --- | --- |
| Basic List | `starter.template.basic-list` | 高密度结构化数据的扫描、对齐和比较 |
| Card List | `starter.template.card-list` | 依赖图片、封面或明显视觉特征的对象浏览和选择 |
| Basic Form | `starter.template.basic-form` | 创建或编辑数据 |
| Basic Detail | `starter.template.basic-detail` | 只读查看单个对象的信息 |

选择模板只决定页面模式，不自动启用该模板之外的组件、交互或工具。

## 2. Decision matrix

### Basic List vs Card List

| Factor | Prefer Basic List | Prefer Card List | Rule |
| --- | --- | --- | --- |
| Data density | 字段多、记录多、信息密度高 | 每个对象只需少量关键信息 | 高密度优先 List，不通过压缩 Card 模拟 Table |
| Visual recognition | 依靠名称、编号、状态和字段识别 | 依靠图片、封面、商品外观或视觉资产识别 | 只有视觉识别是核心任务时选择 Card List |
| Comparison | 需要跨行对齐、多字段比较、排序或快速扫描 | 主要逐个浏览，不依赖严格对齐 | 比较需求优先于展示偏好 |
| Selection | 选择只是结构化批量任务的前置状态 | 用户需要边看视觉对象边选择 | 需要选择或批量操作本身不是 Card List 的充分条件 |

附加规则：

- 用户只说“列表页”时默认 Basic List。
- 视觉识别和多字段比较同等重要时，说明取舍并请求确认。
- Basic List 不因选择需求自动获得 Card List 的本地选择和批量能力。

### Basic Form vs Basic Detail

| Factor | Prefer Basic Form | Prefer Basic Detail | Rule |
| --- | --- | --- | --- |
| Create/Edit | 创建对象、修改字段、校验和提交 | 不修改数据 | 存在写入目标时选择 Form |
| Read-only | 不把字段伪装成只读表单 | 查看字段、状态和元数据 | 只读查看选择 Detail |
| Primary task | 完成输入并保存 | 理解对象当前状态 | 以主要任务而不是控件数量判断 |

同时需要查看和编辑时：

- 查看为主、编辑偶发：选择 Detail，将编辑作为后续本地操作；
- 编辑为主、现有值只是输入基线：选择 Form；
- 两者同等重要：请求确认主任务，不合并成未登记模板。

### Operation outcome

操作成功、失败或网络异常的流程终点不等于对象详情。Starter 当前没有 Result Page；命中该意图时进入 [Unsupported Handling](../profile-routing.md#5-unsupported-handling)，不得使用 Basic Detail 伪装结果页。

## 3. Decision rules

### Rule 1 — Structured data scanning

Intent: 查看、扫描、排序或比较一组结构化对象。

Signals: 多字段、行间对齐、状态比较、记录较多、表格、列、排序或分页。

Select: `starter.template.basic-list`。

Avoid: 不因希望页面更视觉化而选择 Card List；不加入选择、批量、导出或列设置。

### Rule 2 — Visual object browsing

Intent: 浏览、识别并可能选择具有明显视觉特征的对象。

Signals: 图片、封面、商品外观、视觉资产或缩略图是主要识别方式。

Select: `starter.template.card-list`。

Avoid: 不用于高密度字段比较；不因为存在 Checkbox 或批量操作就选择 Card List。

### Rule 3 — Ambiguous list request

Intent: 用户只说“列表页”，没有足够呈现或比较需求。

Signals: 没有视觉识别说明，也没有明确多字段比较。

Select: `starter.template.basic-list`。

Avoid: 不静默推断 Card List，不先选择实现再反推模板。

### Rule 4 — Read an existing object

Intent: 查看一个已有对象的字段、状态或元数据。

Signals: 详情、查看、只读、概览、对象信息，没有修改目标。

Select: `starter.template.basic-detail`。

Avoid: 不使用只读 Form 模拟 Detail，不加入复杂详情模块。

### Rule 5 — Create or edit data

Intent: 创建对象或编辑现有数据并提交。

Signals: 新建、编辑、填写、校验、保存、重置、提交。

Select: `starter.template.basic-form`。

Avoid: 不用 Detail 承担录入，不推断分组、分步、动态字段或上传能力。

### Rule 6 — Mixed view and edit

Intent: 同一请求包含对象理解和修改。

Signals: “查看并编辑”“详情里修改”“先确认再提交”。

Select: 根据主要任务选择 Basic Detail 或 Basic Form；不明确时请求确认。

Avoid: 不合并成新的 all-in-one 页面。

## 4. Routing relationship

```text
Profile Router
    ↓
Template Selection
    ↓
Capability Registry
    ↓
Interaction Pattern
    ↓
Template / Component Knowledge
    ↓
Golden Mapping and Validation
```

模板确认后再读取 [Interaction Pattern](interaction-pattern.md)。交互需求不能反向扩大 Template Boundary。

## 5. Maintenance rule

新增 Template 必须同步 Capability Registry、Decision Rule、Template、Golden Example 和 Validation。缺少任一链路时不得登记为 Starter `READY`。
