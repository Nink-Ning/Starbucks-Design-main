# Capability Validation Evidence Model

本文件定义 DesignKit Starter Capability 验证证据的统一记录格式。验证目标和通过标准读取 [Starter Validation Contract](validation-contract.md)，当前记录从 [Evidence Record Registry](evidence/evidence-index.md) 进入；本模型只记录实际采用的方法、证据位置和结果，不把规则或资产存在误写为已验证。

## 1. Capability Validation Evidence Schema

| Field | Required | Definition |
| --- | --- | --- |
| Capability ID | Yes | 与 [Capability Registry](../capability-registry.md) 完全一致的 `starter.*` ID。 |
| Validation Type | Yes | `Capability Selection`、`Template Selection`、`Template Usage`、`Implementation Provenance`、`Component Fidelity`、`Brand Fidelity`、`Theme Fidelity`、`Structural Anatomy Fidelity`、`Geometry / Composition Fidelity`、`Interaction Fidelity`、`State Coverage`、`Responsive Fidelity`、`Accessibility`、`Visual Fidelity` 或 `Release / Package Integrity`；兼容旧记录的 Functional/Responsive/Theme/Interaction/Visual Quality。 |
| Method | Yes | `Static Check`、`Browser Validation`、`Build Validation` 或 `Manual Review`。 |
| Evidence Location | Conditional | 可复现的测试、命令结果、报告、截图或审查记录位置；`PASS` 和 `FAIL` 必填。 |
| Result | Yes | `PASS`、`FAIL`、`UNVERIFIED`、`BLOCKED`、`NOT_APPLICABLE` 或 `CONFLICTED`。 |
| Last Verified | Conditional | 实际执行时间，使用 ISO 8601 日期或时间戳；从未执行时写 `null`，不得推测。 |
| Owner | Yes | 负责维护或重新验证的团队、角色或明确责任人；未知时写 `UNASSIGNED`。 |
| Notes | Yes | Profile、Template、Runtime、theme、viewport、场景、限制、冲突和失效条件。无补充信息时写 `None`。 |

## 2. Supported methods

| Method | Use | Valid evidence | Limitation |
| --- | --- | --- | --- |
| `Static Check` | 检查文件结构、知识链接、API/export 可见性、CSS 标记、语义属性或测试契约 | 可复现命令及结果、测试报告、带定位的审计记录 | 不能单独证明实际渲染、键盘流程、主题或视觉质量 |
| `Browser Validation` | 在真实 Starter HTML 和固定 Runtime 中检查渲染、状态、交互、响应式、主题、无障碍和控制台 | 浏览器步骤、viewport/theme、截图、控制台和结果记录 | 必须说明场景；单一 viewport 或状态不能覆盖全部类别 |
| `Build Validation` | 在需要时证明知识或 Starter 资产可以通过既有构建/打包检查 | 命令、环境、退出结果和构建报告 | 对 Non-Developer 输出不是默认充分证据，也不替代浏览器和人工检查 |
| `Manual Review` | 判断视觉层级、Golden 偏差、键盘体验、语义合理性或自动化难以覆盖的质量 | 审查清单、截图、结论、审查人和日期 | 结论必须可追踪，不能只写“已检查” |

一个 Validation Type 可以有多条不同 Method 的证据。若 Contract 要求 Browser Validation，只有 Static Check 或 Build Validation 时不得聚合为完整 `PASS`。

## 3. Result semantics

| Result | Meaning |
| --- | --- |
| `PASS` | 已按当前 Contract 和适用场景执行，全部 Pass Criteria 满足，并有可定位证据。 |
| `FAIL` | 已执行，至少一项 Pass Criteria 未满足；Notes 必须写明失败范围。 |
| `UNVERIFIED` | 尚未执行、证据过期或证据不足；不得等同于失败或通过。 |
| `BLOCKED` | 已尝试验证，但受环境、依赖或权限阻断；必须记录阻断条件。 |
| `NOT_APPLICABLE` | 当前 Capability 明确不适用该检查；必须说明 Registry 或 Template 边界依据。 |
| `CONFLICTED` | 两个证据源或契约断言不一致，无法合并为单一结论；必须保留双方来源。 |

## 4. Evidence record template

```yaml
Capability ID: starter.<type>.<name>
Validation Type: Functional
Method: Browser Validation
Evidence Location: <report-or-artifact-location>
Result: UNVERIFIED
Last Verified: null
Owner: UNASSIGNED
Notes: <profile-template-runtime-theme-viewport-scenario-and-limitations>
```

模板中的占位内容不是实际证据。只有执行验证并补全位置、结果、日期和上下文后，记录才能用于 Capability 状态判断。

Geometry / Composition 记录必须保留同 viewport 的 Golden/generated measurements、relative relationships、responsive variables 和截图路径。Implementation Provenance 记录必须说明 Runtime resources、approved exports、实际 DOM/component evidence、theme binding 和 native substitute 检查。Visual Fidelity 只有真实截图加 Manual Review 才能通过；没有人工签收时保持 `CONDITIONAL` 或 `UNVERIFIED`。

## 5. Recording rules

1. 每条记录只对应一个 Capability ID、一个 Validation Type 和一种 Method；同一能力的多种证据分别记录。
2. `PASS` 或 `FAIL` 必须提供 Evidence Location 和 Last Verified；`UNVERIFIED` 的 Last Verified 为 `null`。
3. Evidence Location 必须能定位到实际输出或审查记录；仅链接 Validation Contract、测试源码、Golden 或 Manifest 不能证明验证已经执行。
4. Browser Validation 的 Notes 至少记录 Profile、Template、Runtime、viewport、theme 和被验证场景。
5. 间接验证组件或交互时，Notes 必须注明承载它的 Template 和 Golden，避免把一个页面的结果泛化到所有模板。
6. Runtime Manifest、测试报告和构建结果都是证据来源，不是 Capability Registry，也不能扩大 Starter whitelist。
7. 证据源冲突时使用 `CONFLICTED`；不得选择有利结果覆盖另一来源。
8. Capability、Template、Golden、Runtime、验证规则或关键依赖变化后，Owner 必须重新验证，或将受影响记录改为 `UNVERIFIED`。

## 6. Aggregation rule

Capability 的 Validation 汇总只可基于适用类别的当前证据：

- 所有必需方法均为 `PASS`，该 Validation Type 才能汇总为 `PASS`。
- 任一必需方法为 `FAIL`，该 Validation Type 汇总为 `FAIL`。
- 存在未解决的契约或证据冲突时，汇总为 `CONFLICTED`。
- 没有足够证据、证据过期或只存在规则链接时，汇总为 `UNVERIFIED`。
- Capability Registry 的 `READY` 不代表本次会话已经执行验证；当前执行结果必须读取 Evidence Records。

本模型不生成虚构的历史证据，也不修改 Runtime Manifest；实际状态由 Evidence Records 维护。

## 7. Evidence Records entry

当前 Capability 记录统一登记在 [Evidence Record Registry](evidence/evidence-index.md)。读取顺序为：Registry Index → Capability Evidence Record → Evidence Location；索引和记录文件本身只表达状态，只有可定位的实际执行输出或审查产物才能支持 `PASS` 或 `FAIL`。
