# DesignKit Starter Validation Contract

本文件定义 Non-Developer Starter Knowledge Layer 的统一验证目标。它说明每个 Starter Capability 必须证明什么；实际证据按 [Capability Validation Evidence Model](evidence-model.md) 记录，并由 [Capability Registry](../capability-registry.md)、[Golden Example Mapping](../golden-example-mapping.md) 和 [Implementation Binding Contract](../implementation-binding-contract.md) 引用。当前 R2 汇总矩阵见 [R2 Validation Matrix](r2-validation-matrix.md)。

## 1. Scope and validation boundary

Starter Validation 面向使用固定 Starter Runtime 生成的 Single HTML Demo。它验证 Registry 已批准的 Capability 是否按照对应 Decision、[Template Usage Contract](../template-usage-contract.md)、Template、Golden 和交互边界工作。

```text
Starter Validation
        !=
Runtime Internal Validation
```

| Validation scope | Purpose | Typical evidence | Does not prove |
| --- | --- | --- | --- |
| Starter Validation | 验证 AI 生成页面在 Starter Profile 中的功能、响应式、主题、无障碍、交互和视觉质量 | Static Check、Browser Validation、必要的 Manual Review，以及已有 Build Validation | Runtime 的全部 export、内部组件 API、React/Vue 工程集成或发布完整性 |
| Runtime Internal Validation | 验证 Runtime bundle、export、CSS、hash、加载和实现侧契约 | Runtime tests、manifest、build output、bundle inspection | 某个 Starter Template 已正确组合能力，也不自动证明浏览器交互、主题、无障碍或视觉质量 |

两类验证可以互相提供证据，但不能互相替代。Runtime export 或 Manifest 状态存在，不等于 Starter Capability 已验证；Starter 页面通过，也不等于 Runtime 内部契约全部通过。

## 1.1 Independent validation dimensions

每个维度必须有自己的 Evidence Record 和结果；一个维度的 `PASS` 不得自动升级另一个维度。下表定义最小证据类型，不要求所有维度都使用截图：

| Dimension | Minimum evidence |
| --- | --- |
| Capability Selection | Registry entry + decision trace |
| Template Selection | Template Selection decision + selected Template reference |
| Template Usage | Template anatomy/DOM evidence + implementation mapping |
| Implementation Provenance | Runtime resources + approved exports + Runtime-backed DOM |
| Shell Mode Decision | User intent + resolved `default` / `content-only` / `none` trace |
| Shell Implementation Provenance | Application Shell contract + Runtime Menu/icon/theme binding evidence |
| Icon Binding | `window.arcoicon` source + fixed mapping + per-icon runtime existence and visibility evidence |
| Top Menu Fidelity | Approved composition/order + rendered Top evidence |
| Side Menu Fidelity | Approved collapse/width/state + rendered Side evidence |
| Theme Toggle Behavior | target-mode icon/label + actual Light/Dark transition |
| Theme Scope | html/body attributes + Top/Side/Main/component computed evidence |
| Responsive Shell | 1280/768/390 viewport + document overflow and usability evidence |
| Shell / Template Ownership | outer-shell mapping + unchanged Template anatomy/spacing evidence |
| Shell Accessibility | semantics + keyboard/focus/name evidence |
| No Navigation Capability Leakage | static and manual check against unsupported Navigation engineering |
| Component Fidelity | Approved component/pattern mapping + DOM or static binding evidence |
| Brand Fidelity | Approved brand/runtime theme binding + computed rendered evidence |
| Theme Fidelity | Light/Dark browser state checks + computed tokens/state evidence |
| Structural Anatomy Fidelity | Template/Golden structure comparison + DOM evidence |
| Geometry / Composition Fidelity | Same-viewport Golden/generated computed geometry + relative deltas |
| Interaction Fidelity | Actual browser interaction and resulting state |
| State Coverage | Browser or deterministic fixture evidence for applicable states |
| Responsive Fidelity | Real viewport/container browser evidence + overflow/layout observations |
| Accessibility | Semantic/static checks plus keyboard/browser evidence where applicable |
| Visual Fidelity | Same-viewport/theme screenshots + Manual Review record |
| Release / Package Integrity | Manifest, archive, hash and package-test evidence |

`Structural Anatomy Fidelity`、`Geometry / Composition Fidelity` 和 `Visual Fidelity` 是不同结论；`Release / Package Integrity` 只证明发布资产一致性，不证明页面视觉或交互正确。

### Card List state evidence

Card List 的 `Normal`、`Loading`、`Empty`、`Error` 和 `Retry` 属于状态路径验证。除非 Golden 明确提供对应视觉 variant，否则使用与真实 Runtime/Template 状态模型一致的 validation fixture 即可；fixture 必须实际触发 Error、呈现可访问的 Retry 控件、恢复到 Normal，并记录 viewport、overflow 和控制台结果。不得把状态 fixture 当作新的 Golden 或能力扩展。

## 2. Validation categories

### 2.1 Functional

**Purpose:** 确认 Capability 在批准的 Starter Template 和本地 Demo 边界内完成用户任务，并正确处理必需的页面状态。

**Check:** 检查正常、Loading、Empty、Error、数据展示、查询/重置、分页、选择、提交或批量操作等与该 Capability 相关的行为；不得检查或宣称 Registry 未批准的真实服务、权限、跨页或持久化能力。

**Evidence Required:** 至少一项可复现的 Static Check 或 Browser Validation；涉及实际状态转换时必须包含 Browser Validation。证据必须记录 Capability ID、场景、方法、结果和位置。

**Pass Criteria:** 所有适用的必需状态和动作产生预期结果，无阻断性控制台错误；不适用项明确标记，不以 Mock 行为冒充真实服务能力。

### 2.2 Responsive

**Purpose:** 确认页面在 Starter 目标宽度和窄容器中保持可读、可操作，并遵守 Template 的布局与溢出策略。

**Check:** 检查宽/窄 viewport 或 container、Header/Toolbar 换行、Card Grid 重排、Table 内部滚动、Popup 可用性以及页面级横向溢出。

**Evidence Required:** Browser Validation 的 viewport/container 记录和截图或可复现观察；Static Check 可以补充验证 container query、media query 和作用域，但不能单独证明视觉结果。

**Pass Criteria:** 关键内容和操作可达，无意外遮挡或页面级横向滚动；宽表只在批准的内部容器滚动，Toolbar 和 Header 按规则换行或收纳。

### 2.3 Theme

**Purpose:** 确认 Capability 在 Starter 支持的 Light/Dark 主题下保持语义、状态和可读性一致。

**Check:** 检查文本、背景、边框、图标、Hover、Focus、Selected、Disabled、Loading、Empty 和 Error 状态，并确认使用批准的主题变量或 Runtime 能力。

**Evidence Required:** Light 与 Dark 的 Browser Validation；必要时附截图和 Manual Review。Static Check 可证明变量或 class 使用，但不能替代渲染证据。

**Pass Criteria:** 两个主题下内容清晰可读，状态可区分，交互不因主题失效，无仅在单一主题出现的严重视觉问题。

### 2.4 Accessibility

**Purpose:** 确认生成页面可通过语义、键盘和可见反馈完成核心任务，而非只满足属性存在检查。

**Check:** 检查 Name/Role/Value、标签关联、键盘可达性、焦点顺序和可见 Focus、选择摘要、错误与状态反馈，以及不只依赖颜色表达信息。

**Evidence Required:** Static Check 与 Browser Validation 的键盘走查；复杂语义或视觉判定需要 Manual Review。仅存在 `aria-*` 不能作为完整证据。

**Pass Criteria:** 核心流程无需鼠标即可完成，焦点可见且顺序合理，控件有可访问名称，动态状态可感知，信息不只依赖颜色。

### 2.5 Interaction

**Purpose:** 确认 Template 内部交互遵守 [Interaction Pattern](../decisions/interaction-pattern.md) 的状态所有权、动作范围和反馈规则。

**Check:** 检查 Single Action 与 Batch Action、Selection Set、Card 与 Toolbar 的状态同步、More Menu、危险操作确认、Loading 防重复、成功/失败反馈和错误恢复。

**Evidence Required:** 涉及状态转换的 Browser Validation；Static Check 可验证事件连接和边界；Confirmation、Feedback 或视觉状态需要截图或 Manual Review。

**Pass Criteria:** 动作作用于正确对象或 Selection Set，Card Body 不意外改变选择，Toolbar 摘要与页面状态一致，危险操作有适当确认，重复提交受控且反馈明确。

### 2.6 Visual Quality

**Purpose:** 确认 AI 输出达到 Golden 和 DesignKit 规则表达的页面层级、排版、间距、对齐和状态质量。

**Check:** 对照同 Profile 的 Golden、Template 和设计规则检查页面结构、内容层级、密度、间距、对齐、截断、状态样式及明显视觉回退。

**Evidence Required:** 实际页面截图与 Manual Review；可用 Browser Validation 提供 viewport、theme 和状态上下文。静态源码或 Golden 路径本身不是视觉通过证据。

**Pass Criteria:** 无影响理解或操作的结构和样式偏差，主要区域与同 Profile Golden 的能力边界一致，无明显错位、裁切、重叠或未处理状态。

### 2.7 Geometry / Composition Fidelity

**Purpose:** 确认生成页面保留 Golden 的空间骨架、比例关系、信息密度和响应式组合，而不是仅复用相同组件。

**Check:** 在同一 viewport/theme 下测量 Golden 与生成页面的 page content、grid columns/gaps、card/media/content/footer rects、title/metadata typography、selection/action placement、surface border/shadow/radius、`innerWidth` 和 `scrollWidth`；同时判断哪些值是 Template invariant、Golden anchor、responsive variable 或 example-specific。

**Evidence Required:** Golden 和 generated 的 computed geometry、viewport、relative deltas、同尺寸截图路径，以及必要的 Manual Review。不得只用历史像素值或截图印象代替当前 Golden 测量。

**Pass Criteria:** approved anatomy、主要比例、信息密度、媒体/内容关系、footer 关系、selection/action placement 和 required responsive composition 均保持；card width/column count 可随可用宽度变化，但不得新增 tall card、media-dominant tile、thick footer 或额外 chrome。无法完成真实 viewport 测量时为 `UNVERIFIED` 或 `BLOCKED`。

### 2.8 Implementation Provenance

**Purpose:** 确认页面实际使用了 [Implementation Binding Contract](../implementation-binding-contract.md) 指定的 Runtime、组件、主题和 Template-local composition，而不是只实现了相同的视觉或功能概念。

**Check:** 检查固定 Runtime JS/CSS 及其依赖加载、`StarbucksReact` approved exports、Runtime-backed DOM/组件、Golden-approved anatomy、主题变量来源，以及是否存在已批准能力的 native/custom substitute。

**Evidence Required:** Static provenance check 与 Browser Validation。Browser Notes 必须记录资源 URL、Runtime/Profile、viewport、theme、关键 export 和 DOM 证据；仅源码中出现组件名称不能证明已绑定。

**Pass Criteria:** Runtime 资源已按 Starter 顺序加载，approved implementation 已被实际引用和渲染，主题变量来自 Runtime/approved host mechanism，且不存在被禁止的 native/custom recreation。缺少可定位证据时为 `UNVERIFIED`。

### 2.9 Default Application Shell

**Purpose:** 确认 `starter.pattern.default-application-shell` 只按 [Default Application Shell Contract](../application-shell.md) 包裹已选 Template，并且没有泄漏完整 Navigation engineering capability。

**Check:** 分别检查 Shell Mode Decision、Top action order、Side collapse binding、target-mode Theme Toggle、whole-page Theme Scope、Shell/Template ownership、Breadcrumb independence、Basic List `4px / 16px / 16px` ownership、Icon Binding、Accessibility，以及 1280/768/390 下的 document overflow。每个 Generic UI Icon 必须来自 `window.arcoicon` 并通过存在性检查；expanded rail、collapsed 56px rail 和 active item 的 Icon 必须可见。390px 不得引入 Drawer、Hamburger、Bottom Navigation、Overlay Navigation 或 mobile-specific new pattern。

**Evidence Required:** 本阶段需要 Source/Projection contract tests。后续实现阶段必须使用独立 test-only composition fixture，提供 Static provenance、Light/Dark Browser Validation、1280/768/390 viewport/overflow records、keyboard walk-through 和必要截图。Docs Demo clipping 不是 Starter evidence，fixture 也不是 Starter Golden。

**Pass Criteria:** 三个 Shell Modes 解析正确且默认值为 `default`；Top/Side 使用批准 Runtime binding；Theme 作用于整个页面；Template anatomy、Breadcrumb policy 和 Basic List spacing 未被 Shell 吸收；三个 viewport 无 document-level overflow；不存在自定义导航、权限、真实路由或工程 API 泄漏。组件限制导致受限 390 fallback 无法成立时结果为 `RESPONSIVE CONTRACT BLOCKED`，不得自行发明替代模式。

## 3. Result and evidence rules

1. 每个 Capability 按适用的 Validation Type 独立记录，使用 [Evidence Model](evidence-model.md) 的结果语义；Implementation Provenance 不得被 Structural 或 Visual Quality 结果替代。
2. 未执行的检查必须记录为 `UNVERIFIED`，不得根据 Manifest 汇总状态、旧报告或其他 Capability 推断为 `PASS`。
3. `PASS` 必须有可定位的证据和实际验证日期；规则链接、测试文件存在或 Golden 存在本身不等于已执行。
4. 间接通过 Template 验证的组件或交互能力必须在 Notes 中写明 Template、Profile、Runtime、主题和 viewport 等上下文。
5. Capability、Template、Golden、Runtime 或本 Contract 发生影响性变化后，相关旧证据必须重新验证或标记失效。

## 4. Quality Checklist and Runtime Manifest resolution

验证关系按以下优先语义解释：

```text
Knowledge Layer defines the validation target
        ↓
Quality Checklist operationalizes that target
        ↓
Runtime Manifest may provide implementation-side evidence
        ↓
Evidence Model records what was actually verified
```

- Knowledge Layer 定义 Starter Capability 的验证目标和通过标准。
- Starter Quality Checklist 是这些目标的一组操作性检查，不是 Runtime Manifest Schema 的所有权来源。
- Runtime Manifest 是实现侧证据来源之一，不是 Starter Validation Contract，也不能单独证明完整 Capability。
- Checklist 与 Manifest 不一致时，不修改或臆造 Manifest 字段；将对应证据项记录为 `CONFLICTED` 或 `UNVERIFIED`，并保留具体差异。
- 独立的 Static Check 或 Browser Validation 可以证明 Capability 目标，但不能把缺失的 Manifest 字段描述为已经满足。

### `selectedBusinessExports` decision: removed as a validation requirement

当前 Runtime Manifest、Runtime build configuration、Starter runtime source 和 React/Vue public exports 均没有把 `selectedBusinessExports` 定义为 authoritative schema。现有字段是 `selectedProExports`，不能推导出另一个字段或其语义。

因此，R2 source validation **移除 `selectedBusinessExports` 作为必需断言**，改用以下可定位证据：

1. `typeof StarbucksReact.TableToolbar === 'function'`；
2. Runtime CSS 中存在 `.sbux-table-toolbar`；
3. 固定 Runtime 资源按批准顺序加载；
4. Starter-compatible 页面实际渲染 Runtime-backed TableToolbar，并通过 Browser Validation。

冻结 R1 Checklist 中仍存在的旧字段文字属于 **expected pre-projection drift**，不能被 R2 source validation 重新解释为当前 schema，也不授权修改 R1 Runtime Manifest、Checklist 或 ZIP。若未来要恢复该字段，必须由 Runtime/Manifest owner 单独批准 schema、实现和重新打包；在此之前它不是 R2 Validation 的失败条件。

### Destructive action visual policy

Destructive behavior and persistent visual treatment are validated independently. Persistent destructive entries in Toolbar, Row, Card, or More use the approved neutral/default/secondary treatment by default; a red `danger` treatment is not inferred from the action verb alone. Confirmation evidence must still show an explicit target and consequence, `Cancel`, `Confirm`, and result feedback, with `Cancel` proven non-mutating. Red error/status semantics (including offline and runtime error states) must remain intact. If the approved Runtime has no neutral confirmation variant, record `RUNTIME COMPONENT HIERARCHY GAP` instead of inventing a page-local variant.

### Component Usage Fidelity

当 Runtime provenance 已通过时，仍需单独检查 approved component usage：实际组件 variant/type、approved Runtime/Arco icon binding、语义 `status`、action priority 和 interaction scope。Provenance PASS 不会自动推出 Component Usage Fidelity PASS；错误 variant、手写图标、未经授权的 danger treatment，或被明确授权的 danger 入口缺少所需 treatment，应分别记录为 Component Usage Fidelity FAIL。

## 5. Generated page quality boundaries

### Debug metadata

Local Mock Data is allowed. Visible implementation/debug metadata is not.

页面可以在内部使用 deterministic local Mock data，但用户界面不得直接显示 `mock data`、`deterministic data`、`test data`、`demo data` 或 debug metadata。只有明确属于 Demo control、且与产品 UI 分离的测试控制可以例外。该规则检查用户可见输出，不禁止页面内部的本地状态和 Mock 数据。

### Language consistency

A generated user-facing page should use one consistent interface language unless multilingual behavior is intentional.

检查范围至少包括 Toolbar、Modal、Pagination、Form、Detail、Feedback、Empty/Error 和 Actions。`English`、`Chinese`、`enUS` 或 `zhCN` 都不是本 Contract 的强制默认语言；需要记录的是页面是否有意保持一致，以及混用是否由明确的多语言行为导致。

## 6. Maintenance rule

新增或扩大 Starter Capability 时，必须同时更新 Capability Registry、Decision Rule、Template、Golden Mapping、适用的 Validation Categories 和 Evidence Records。验证目标与实现侧证据必须分开维护，任何单一证据来源都不得自动升级 Profile 支持范围。

## 7. Unresolved design decisions

### List spacing

当前 Starter Basic List、Docs Full Basic List 和具体 Integration Demo 存在不同 spacing evidence。Validation Contract 不选择 universal value；页面组合关系可以先被验证，但数值 canonicalization 必须标记为 `DESIGN DECISION REQUIRED`，待正式 Page Spacing Contract 或 Token 决策后再更新对应 Template、Golden 和 Evidence。

### Default Application Shell responsive decision

`starter.pattern.default-application-shell` 的 Starter responsive contract 已由 canonical reference 关闭：`>=1024px` Side 为 `260px` expanded；`768–1023px` 和 `<768px` 为 `56px` collapsed rail；390px 保留 required global actions 且不发明新导航模式。完整 `docs.pattern.navigation-shell` 的其他 metrics 和 engineering variants 仍属于 Docs Full，不得由该窄契约推断。
