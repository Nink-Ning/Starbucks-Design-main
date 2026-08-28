# DesignKit Template Usage Contract

本文件定义已批准 Page Template 的使用义务。它连接 Template Decision 与实际实现，不替代 Capability Registry、Template 源码、Golden Example 或 Validation Contract。

## 1. Canonical position

DesignKit 的知识流必须保持以下顺序：

```text
Capability Registry
        ↓
Interaction Pattern
        ↓
Template Contract
        ↓
Golden Example
        ↓
Validation Contract
        ↓
Runtime Evidence
```

- [Capability Registry](capability-registry.md) 决定 Profile 是否支持能力及其边界。
- [Interaction Pattern](decisions/interaction-pattern.md) 决定 Selection、Batch、More、危险操作和操作范围。
- 本 Contract 决定已选 Page Template 的实现基线和页面级组合关系。
- [Golden Example Mapping](golden-example-mapping.md) 指向只读结构和视觉参考；Golden 不得扩大 Capability Registry 的范围。
- [Implementation Binding Contract](implementation-binding-contract.md) 定义生成结果如何绑定已批准的 Runtime、组件、主题和 Template-local composition。
- [Validation Contract](validation/validation-contract.md) 定义如何证明实现成立；[Evidence Model](validation/evidence-model.md) 记录实际证据。
- Runtime 只能提供实现侧证据，不能反向授权 Starter 能力或改变 Template。

## 2. Selected, Used and Fidelity

### Template Selected

AI 根据用户意图和 Profile 选择了正确的 Candidate Template，并通过 Capability Registry 确认该 Template 在当前 Profile 可用。

### Template Used

实现实际采用了该 Template 的 approved anatomy，而不是只使用其中一个或多个低层组件。

### Template Fidelity

实现保留了 Template 的：

- Page Anatomy；
- Structural Hierarchy；
- Component Composition；
- Interaction Ownership；
- Spacing Relationships；
- Responsive Behavior。

`Template Selected` 不等于 `Template Used`，`Template Used` 也必须按 Validation Contract 的 Functional、Responsive、Theme、Accessibility、Interaction 和 Visual Quality 维度验证后，才能声称具有 Fidelity。

## 3. Approved Template baseline

当存在 approved Page Template 时：

> **When an approved Page Template exists, the Template is the implementation baseline.**

AI 可以适配：

- Business Copy；
- Business Fields；
- Mock Data；
- Applicable Actions；
- Domain Content。

AI 不可以忽略 approved Template，然后仅从低层组件独立重构页面。只有当 Template 明确允许 variation，或 Capability Registry/Template Contract 明确声明了变体，才可以改变 anatomy、层级或组合关系。

禁止的默认行为包括：

- 用普通 Card + fields 替代 Basic Form 或 Basic Detail 页面；
- 只调用 Table 和 TableToolbar，却自行创造另一套 Basic List 页面结构；
- 重新发明 Card anatomy、Row Action treatment、页面 spacing system 或 surface 边界；
- 把 Docs Full 组件/API/交互能力带入 Starter。

## 4. Page Composition Contract — Basic List / Data Management

对于以结构化数据管理为主要任务的 Root Data Management Page，Basic List 的 canonical 组合为：

```text
Page Header
    ↓
Continuous Data Region
    ├── TableToolbar
    ├── Table
    └── Pagination
```

Basic List 的 approved template reference 是 `distribution/designkit-starter-v1/patterns/basic-list.html`，authoritative Docs implementation 是 `packages/docs/site/src/demos/template-pages/basic-list.tsx` 与 `basic-list.vue`。Shell 组合必须把该完整 subtree mount 到 Shell Main Slot；不得拆开后重新生成 Page Header、Toolbar、Table、Row Actions 或 Pagination。

Page Header 的稳定结构为 `Page Title + optional Context Help + Header Actions`。`CONTEXT_HELP` 存在时使用 title-adjacent、keyboard-accessible Help control 展示说明，禁止生成 persistent page subtitle。Basic List 的 structural signature 为 `Page Header → TableToolbar(Filter Region + Action Region) → Table → Pagination`。

### Continuous Data Region

Toolbar、Table 和 Pagination 必须作为一个连续的数据管理区域工作。默认禁止生成：

```text
Toolbar Card
    + Summary Card
    + Table Card
```

也禁止重复 border、radius、shadow 或不必要的 page-level gap。Toolbar → Table、Table → Pagination 的页面级关系应由该 Data Region 组合表达；组件内部 padding 仍由各自组件负责。

### Ownership

- Page / Template owns `TableToolbar → Table → Pagination` 的组合、数据、分页和页面状态协调。
- TableToolbar owns its internal control layout、Quick Filter、允许的 selection summary 和 action state。
- Table owns table internals。
- Pagination owns pagination internals。

组件不得反向决定页面组合，也不得要求页面复制其内部 DOM、spacing 或响应式算法。

### Basic List template-specific data-region inset

对于 `starter.template.basic-list`，Continuous Data Region 的已批准组合基线为：

```text
top: 4px
inline: 16px
```

该 `4px / 16px / 16px` 只属于 Basic List Template 的 Data Region composition，不是 Universal List Spacing Token，也不覆盖 Docs Full 变体或其他页面模板。Toolbar、Table 和 Pagination 仍共享同一个 surface；该 inset 不应通过额外的嵌套 Card 或 page-level gap 实现。

### Card List geometry fidelity

Card List 的 Golden geometry 是关系基线，不是跨 viewport 的固定像素模板。实现应保留：

- 紧凑的横向媒体 + 内容 anatomy；
- 左侧媒体、标题/主元数据和次级元数据的层级关系；
- 卡片高度保持 compact，footer 作为次级区域；
- Selection anchored to the approved card region；
- footer 内序号与 Card Actions 的对齐关系；
- 8px grid gap，以及在 1000px / 720px / 420px 断点下由可用宽度驱动的列数、媒体尺寸和元数据换行。

允许适配 card width、列数、业务文案、图片和 metadata values。不得发明 marketing-style tall card、media-dominant tile、oversized typography、thick footer、额外 card chrome 或不同的 selection geometry。实际 Golden 测量和比例证据维护在 [Golden Example Mapping](golden-example-mapping.md)；该规则不把任意一次测量升级为 universal spacing token。

本 Contract 只定义关系，不为所有 Basic List 选择 universal padding。Starter Basic List、Docs Full Template 和具体 Integration Demo 的数值差异属于待决 design decision，不得在此隐式统一。

## 5. Root and child page composition

### Module Root

当页面同时满足以下条件时：

1. 页面是模块根页面；
2. 已有 Shell / Navigation 提供明确的当前位置上下文；

Breadcrumb 默认隐藏。Breadcrumb 不应仅因为 URL route depth 而出现。

### Child Workflow / Detail

当页面存在有意义的父级页面关系，例如 Create、Edit 或 Detail，Breadcrumb 应显示父级上下文。Breadcrumb 表示可理解的信息/导航层级，不是技术 URL 层级。

如果页面没有真实父级语义，或 Shell 已经提供同等上下文，不得机械添加 Breadcrumb。三级层级只有在现有信息架构明确支持时才可使用。

## 6. Contextual Help

对于 Root Data Management Page，如果说明文本只是补充解释页面用途，而不是必须永久展示的信息，优先采用：

```text
Page Title + contextual Help
```

而不是默认放置 Persistent Subtitle。Help control 必须具有可访问名称，并在 Hover/Focus 等已批准方式下提供说明。

此规则不禁止所有 Subtitle。Form、Detail、Content 或 Special Workflow 如果其 Template 明确需要永久说明，可以保留 subtitle；不得把 Root List 的压缩规则泛化到所有页面。

## 7. Basic Form family

Basic Form 不等于若干 Form components 的集合，而是完整的 Page Template Family，至少保留：

- Meaningful Breadcrumb when it is a child workflow；
- Page Header；
- Form Surface；
- Form Layout and Sections；
- Actions；
- Spacing Relationships；
- Responsive Behavior。

Create 与 Edit 属于同一个 Basic Form Template Family：

| State | Allowed variation |
| --- | --- |
| Create | empty/default values；create/submit action |
| Edit | prefilled values；save/update action |

两者必须保持相同的 Page Anatomy、Form Layout、Surface、Actions Pattern 和 Responsive Behavior。业务字段、文案、校验规则和本地 Mock 数据可以变化，但不得生成两套互不相干的页面结构。

## 8. Basic Detail boundary

Basic Detail 是完整的、聚焦单个对象的只读页面模板，不是 Generic Information Card。实现应保留：

- Page Anatomy；
- Meaningful Breadcrumb when it is a child page；
- Detail Header；
- Information Hierarchy；
- Detail Surface；
- Section Structure；
- Action Placement；
- Responsive Behavior。

只允许替换 Business Data、Field Labels 和 Domain Content。

Starter `starter.template.basic-detail` 的边界仍是 focused read-only object detail。Docs Full Integration Demo 可以有多个丰富 section 或额外业务动作，但这些扩展不能直接扩大 Starter Basic Detail，也不能被当成 Starter 默认 anatomy。

## 9. Application Shell and Result Page boundary

`starter.pattern.default-application-shell` 可以按 [Default Application Shell Contract](application-shell.md) 包裹已批准 Template。Shell 只拥有 Top、Side、Main outer layout、global theme binding 和 Shell responsive relationship；它不得改变 Template anatomy、Page Header、Toolbar、Filter、内容区、Pagination、page state、Mock data、interaction 或 spacing。

Basic List 的 `4px / 16px / 16px` 继续是 Template-owned Continuous Data Region inset，不得被 Shell 覆盖或提升为 Shell spacing。Breadcrumb 继续按真实信息层级决定；Side Navigation 存在不等于 Breadcrumb 必需。

Brand-color horizontal navigation和 collapsed inline vertical navigation 的 Docs Demo 只作为固定 Shell 的 `IMPLEMENTATION REFERENCE`。Custom Navigation Shell、Navigation API、权限菜单、真实路由和 React/Vue navigation integration 仍是 Docs Full / Developer boundary。

Result Page 保持 Docs Full。Basic Detail、Basic Form 或其他 Starter Template 不得因为实现存在而替代或吸收 Result Page。

## 10. Maintenance

Template Usage Contract 的新增或修改必须同步检查：

```text
Template Selection
        + Capability Registry
        + Template Contract
        + Golden Example Mapping
        + Implementation Binding Contract
        + Validation Contract
```

本文件不保存组件 API、页面私有源码、Golden 业务数据、Runtime schema 或具体 spacing token。若这些来源对同一规则给出不同结论，应保留为 `DESIGN DECISION REQUIRED`，不得在 Template Usage Contract 中静默选择。
