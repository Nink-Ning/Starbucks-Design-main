---
name: designkit-starter-v1
description: "为产品经理生成 Starbucks Design 零工程环境 Demo。用户提出基础列表页、卡片列表页、表单页或详情页需求，或要求生成可直接在浏览器打开的 HTML Demo 时使用。常规后台页默认使用受限 Default Application Shell。输出单文件 HTML，允许固定版本的 React UMD/CDN、Babel 和少量 JavaScript；不生成 React/Vue 工程，不使用 Node.js、npm、import、export 或 TypeScript。"
---

# DesignKit Starter V1

## 1. Starter Identity

本 Skill 是 Non-Developer DesignKit Starter 的 AI 入口。它用于生成采用 Fixed Runtime、本地 Mock 数据和少量页面脚本的 Single HTML Demo，服务于产品方案验证、评审和沟通。

本入口只负责：

- Starter 身份和交付边界；
- Agent Workflow；
- Package-local Reference Routing；
- Validation Flow。

组件规则、Template 结构、API、Golden 细节和验证清单只从对应 reference 读取，不在本文件重复定义。

## 2. Starter Boundary

支持的页面能力：

- Basic List；
- Card List；
- Basic Form；
- Basic Detail；
- `starter.pattern.default-application-shell` 固定组合。

不支持：

- React/Vue 工程交付；
- Engineering API 或完整组件接入；
- Docs Full Templates。

完整的范围确认、未支持处理和 Starter-safe 简化规则读取 [Profile Router](references/profile-routing.md)。Runtime、文档或组件能力存在，不代表已经进入 Starter；所有生成能力必须先通过 [Capability Registry](references/capability-registry.md)。

## 3. Agent Workflow

```text
User Request
    ↓
Confirm Starter Scope
    ↓
Profile Routing
    ↓
Capability Registry Lookup
    ↓
    Template Decision
    ↓
    Template Usage Contract
    ↓
    Shell Mode Decision
    ↓
    Implementation Binding Contract
    ↓
    Interaction Decision
    ↓
Golden Example Reference
    ↓
Validation Contract
    ↓
Evidence Record
```

执行顺序：

1. 确认用户需要 Non-Developer Single HTML Demo；否则按 Profile Router 报告范围问题。
2. 使用 Profile Router 确认 Starter 交付和 unsupported handling。
3. 查询 Capability Registry 的 `starter.*` ID、Status、Boundary 和 Conflict。
4. 页面请求读取 Template Selection；确定模板后再读取对应 Template。
5. 读取 [Template Usage Contract](references/template-usage-contract.md)，确保 Selected、Used 和 Fidelity 不被混淆。
6. 读取 [Default Application Shell Contract](references/application-shell.md)，在 Template Decision 后解析 `default`、`content-only` 或 `none`；没有用户覆盖时使用 `default`。
7. 读取 [Implementation Binding Contract](references/implementation-binding-contract.md)，将已批准的 Runtime、图标和主题绑定到实际 HTML。
8. 需要选择、批量操作、More 或操作范围判断时读取 Interaction Pattern。
9. 读取 Golden Mapping；页面 Template 的 Golden 只作为只读组合参考，Default Application Shell 只使用 `IMPLEMENTATION REFERENCE`、test-only fixture strategy 和 package-only clean-room evidence。
10. 按 Validation Contract 确定适用检查和 Pass Criteria。
11. 按 Evidence Model 记录实际 Method、Evidence Location、Result 和未验证项。

只加载当前 Capability 所需的 references，不一次性加载全部模板和组件知识。

## 4. Reference Routing

| Stage or question | Required reference |
| --- | --- |
| 请求是否属于 Non-Developer Starter？ | [Profile Router](references/profile-routing.md) |
| Starter 是否登记并允许该能力？ | [Capability Registry](references/capability-registry.md) |
| 应选择哪个页面模板？ | [Template Selection](references/decisions/template-selection.md) |
| 已选模板使用哪种 Shell Mode？ | [Default Application Shell Contract](references/application-shell.md) |
| 单对象、批量、More 和 Selection 如何决策？ | [Interaction Pattern](references/decisions/interaction-pattern.md) |
| Capability 对应哪个 Template、Golden 和 Validation？ | [Golden Example Mapping](references/golden-example-mapping.md) |
| 已选 Template 如何保留页面结构和响应式关系？ | [Template Usage Contract](references/template-usage-contract.md) |
| 输出如何绑定 Starter Runtime、组件和主题？ | [Implementation Binding Contract](references/implementation-binding-contract.md) |
| 必须验证什么、怎样才算通过？ | [Validation Contract](references/validation/validation-contract.md) |
| 如何记录方法、证据、结果和日期？ | [Evidence Model](references/validation/evidence-model.md) |
| 页面结构和视觉遵循什么规则？ | [Design Rules](references/design-rules.md) |
| 单文件 HTML 必须满足什么交付合同？ | [Template Contract](references/template-contract.md) |
| 当前 Starter 允许使用哪些已查证能力？ | [Component Catalog](references/component-catalog.md) |
| Fixed Runtime 如何加载？ | [CDN Runtime](references/cdn-runtime.md) |
| 如何执行操作性自检？ | [Quality Checklist](references/quality-checklist.md) |

Registry 和 Decision 确认后，只读取其指向的 `templates/`、`business-components/` 和 `examples/` 资产。不要从文件存在推断未登记能力。

## 5. Validation Flow

```text
Capability and Boundary
    ↓
Validation Contract categories and Pass Criteria
    ↓
Quality Checklist operational checks
    ↓
Actual validation method
    ↓
Evidence Record
    ↓
PASS / FAIL / UNVERIFIED / BLOCKED / CONFLICTED
```

- Registry `READY` 表示知识链路可用，不等于当前输出已经验证通过。
- 规则、测试文件、Golden 或 Manifest 状态存在，不等于实际 Evidence。
- 未执行的检查记录为 `UNVERIFIED`，证据冲突记录为 `CONFLICTED`。
- 只有完成实际浏览器操作和控制台检查后，才能记录对应 Browser Validation 结果。
- 最终报告必须包含 Capability ID、实际 Method、Evidence Location、Result 和仍未验证的维度。

## 6. Maintenance Boundary

本文件保持轻量，只维护 Identity、Workflow、Reference Routing 和 Validation Flow。新增或修改组件规则、Template 细节、API、Golden 映射或验证标准时，更新其唯一责任 reference，不在本入口复制。
