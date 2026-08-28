---
name: starbucks-design
description: >
  DesignKit AI 入口，用于将 Starbucks Design / DesignKit 用户需求路由到 Non-Developer
  Starter Profile 或 Developer Docs Full Profile。适用于零环境 Single HTML Demo、产品经理页面生成、
  React/Vue 工程、组件 API、页面模板和设计决策请求。先识别输出要求，再选择 Profile、查询
  Capability Registry 并加载对应 reference；不得因为 Docs 或 Runtime 中存在能力就推断 Starter 支持。
---

# Starbucks Design Skill

## 1. Identity

本 Skill 是 DesignKit 的 AI Entry Router。它优先支持 Non-Developer Starter 页面生成，同时把 React/Vue 和工程使用请求路由到 Docs Full Profile。

本入口只负责：

- DesignKit 身份和 Profile 边界说明；
- 从用户请求到 Profile、Capability 和 reference 的使用流程；
- Reference 路由和验证入口。

本入口不维护组件 Props、Events、Slots、Types，不定义 Template 详细结构，不复制组件规则、Runtime API 或完整验证清单。具体规则只从路由后的 reference、Profile Skill 和真实实现中读取。

## 2. Profiles

| Profile | Audience and output | Use when |
| --- | --- | --- |
| Starter | Non-Developer；zero environment；使用 Fixed Runtime 的 Single HTML Demo；AI generated page | 用户要浏览器直接打开的 Demo、产品经理页面、无需 Node.js 或工程环境的方案验证 |
| Docs Full | Developer；React/Vue；完整组件与工程知识 | 用户要 React/Vue 工程、组件 API、framework integration 或 engineering usage |

Profile 选择以用户明确的输出要求为先。用户角色与输出要求冲突，或输出形式无法判断时，先澄清，不静默切换或混合两个 Profile。

```text
Docs or Runtime capability exists
                !=
Starter Profile support
```

## 3. Agent Workflow

```text
User Request
    ↓
1. Identify output requirement
    ↓
2. Select Profile
    ↓
3. Query Capability Registry
    ↓
4. Load relevant references
    ↓
5. Select Template / Component
    ↓
5a. Apply Template Usage Contract
    ↓
5b. Resolve Shell Mode
    ↓
5c. Apply Implementation Binding Contract
    ↓
5d. Resolve Interaction Pattern
    ↓
6. Validate output
```

### 1. Identify output requirement

确认用户需要 zero-environment Single HTML Demo，还是 React/Vue 工程、组件 API 或其他 Developer 交付。不要仅凭页面或组件名称选择 Profile。

### 2. Select Profile

读取 [Profile Router](references/profile-routing.md)，根据输出要求选择 Starter 或 Docs Full。命中未支持能力或 Profile 冲突时，按 Router 的 Unsupported Handling 处理。

### 3. Query Capability Registry

读取 [Capability Registry](references/capability-registry.md)，使用稳定 Capability ID 检查 `Profile`、`Status`、`Conflict` 和 `Validation`。Docs、Runtime 或 Demo 单独存在不能替代 Registry 登记。

### 4. Load relevant references

只加载当前 Profile 和 Capability 需要的最小 reference 集合。涉及布局、页面模式或操作位置选择时读取 [Design Decisions](references/design-decisions.md)；不要全量加载组件和模板知识。

### 5. Select Template / Component

Starter 进入 [DesignKit Starter V1 Skill](../../distribution/designkit-starter-v1/SKILL.md)，并使用 Registry 指向的 Starter Template 和允许的 Runtime 子集。Docs Full 根据框架进入 [React Skill](../starbucks-design-react/SKILL.md) 或 [Vue Skill](../starbucks-design-vue/SKILL.md)，再读取真实组件 reference。

模板确定后，读取 [Template Usage Contract](references/template-usage-contract.md)，确认 Template Selected、Template Used 和 Template Fidelity 的实现基线。Starter 随后读取 [Default Application Shell Contract](references/application-shell.md) 决定 `default`、`content-only` 或 `none`；Shell Mode 只决定是否包裹已选模板。再读取 [Implementation Binding Contract](references/implementation-binding-contract.md) 确认生成结果使用已批准的 Runtime、组件和主题绑定，并读取 [Interaction Pattern](references/decisions/interaction-pattern.md) 决定页面内部交互。不要只因低层组件存在就跳过模板组合规则，也不得用视觉仿制替代已批准实现。

### 6. Validate output

Starter 在输出前读取 [Template Contract](../../distribution/designkit-starter-v1/references/template-contract.md) 和 [Quality Checklist](../../distribution/designkit-starter-v1/references/quality-checklist.md)。Docs Full 按所选 framework、组件或页面 reference 的验证要求执行。未实际完成的验证必须标记为未验证。

## 4. Reference Routing

| Stage or question | Required reference |
| --- | --- |
| 这是 Starter 还是 Docs Full 请求？ | [Profile Router](references/profile-routing.md) |
| 该 Profile 是否登记并支持此能力？ | [Capability Registry](references/capability-registry.md) |
| 应选择什么页面模式、布局或操作位置？ | [Design Decisions](references/design-decisions.md) |
| 已批准的 Page Template 如何实际使用？ | [Template Usage Contract](references/template-usage-contract.md) |
| Starter 页面是否包裹固定 Application Shell？ | [Default Application Shell Contract](references/application-shell.md) |
| 生成结果如何绑定已批准的 Runtime / 组件 / 主题实现？ | [Implementation Binding Contract](references/implementation-binding-contract.md) |
| Starter 页面必须遵守什么交付契约？ | [Template Contract](../../distribution/designkit-starter-v1/references/template-contract.md) |
| Starter 输出如何验收？ | [Quality Checklist](../../distribution/designkit-starter-v1/references/quality-checklist.md) |
| Starter 的执行流程和模板入口是什么？ | [DesignKit Starter V1 Skill](../../distribution/designkit-starter-v1/SKILL.md) |
| React/Vue 工程如何使用真实组件？ | [React Skill](../starbucks-design-react/SKILL.md) 或 [Vue Skill](../starbucks-design-vue/SKILL.md) |
| 是否涉及基础组件、业务组件、模板或依赖边界？ | [Architecture](references/architecture.md) |
| 是否属于仓库实现、审查、Skill 或发布类任务？ | [Task Routing](references/task-routing.md) |

读取顺序固定为 Profile Router → Capability Registry → relevant references。不要在 Profile 未确定前加载并混用 Starter 与 Docs Full 规则。

## 5. Validation and reporting

验证必须与所选 Profile 和 Capability Registry 状态一致：

- `READY` 只表示 Registry 所声明 Profile 内的能力链路可用；
- `PARTIAL` 或 `CONFLICTED` 只使用已批准的更窄边界，并报告缺失或冲突；
- `DOCS_ONLY`、`OUTDATED`、`UNSUPPORTED`、`PROPOSED` 不得进入 Starter；
- 未运行测试、浏览器检查或其他验证时，不得写成已通过；
- 报告所选 Profile、Capability ID、已加载 reference、验证结果和未验证项。

## 6. Maintenance boundary

SKILL.md 保持轻量，只维护身份、Workflow 和 Reference Routing。新增具体组件规则、Template 细节、API 文档或长验证清单时，应更新其唯一责任 reference，而不是扩展本入口。

新能力通常只有在 Implementation、Docs、Skill、Golden Example 和 Validation 全部完成并在 Capability Registry 注册后，才可进入 Starter Profile。`starter.pattern.default-application-shell` 是经明确批准的 contract-first restricted composition exception：它使用 canonical contract、Docs implementation references 和 test-only composition fixture strategy，不创建完整 Starter Golden；注册不代表后续 Browser Validation 已完成。Runtime、Components 或 Docs 的单独变化不会自动扩大 Starter 白名单。
