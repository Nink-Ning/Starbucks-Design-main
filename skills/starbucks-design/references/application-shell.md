# DesignKit Default Application Shell Contract

本文件是 `starter.pattern.default-application-shell` 的唯一 canonical definition。它定义 Non-Developer Starter 如何在已批准页面模板之外组合固定 Application Shell；它不定义新的基础组件、公共 Navigation API、React/Vue 工程能力或可复用页面框架。

## 1. Purpose

Default Application Shell 面向常规企业后台页面，为产品经理生成的 Single HTML Demo 提供统一的品牌顶部导航、可折叠侧边菜单、主内容外层和全局 Light/Dark 切换。

生成顺序固定为：

```text
User Request
    ↓
Profile Routing
    ↓
Capability Boundary
    ↓
Template Decision
    ↓
Shell Mode Decision
    ↓
Implementation Binding
    ↓
Generated Page
    ↓
Validation
```

Page Template 必须先决定页面本身是什么；Shell Mode 只决定是否包裹该模板，不能把 Shell 变成万能 Page Template。

Shell Selected 不等于 Shell Reimplemented。组合时必须绑定 approved Shell Reference Implementation，再将已绑定的 approved Page Template subtree 放入 Main Content Slot；Shell rules 不得与 Template rules 合并后重新绘制页面。

## 2. Capability ID

| Field | Value |
| --- | --- |
| Capability ID | `starter.pattern.default-application-shell` |
| Support state | `SUPPORTED` |
| Registry status | `READY`，对应现有 Registry 的合法可生成状态 |
| Profile | Product Manager / Non-Developer Starter |
| Type | Restricted composition pattern |
| Output | Fixed Runtime Single HTML Demo |

该能力只授权本文定义的 fixed approved composition。它不是 reusable public component，不得进入 React/Vue package exports，也不授权完整 `docs.pattern.navigation-shell` 能力。

## 3. Shell Modes

只允许以下三个模式，AI 不得创建第四种模式：

| Mode | Contract |
| --- | --- |
| `default` | Top Navigation + Side Navigation + approved Page Template。它是 Product Manager / Non-Developer Starter 的默认值。 |
| `content-only` | 用户明确说明已有系统框架时，只生成 Page Template 内容区，不生成 Top 或 Side。 |
| `none` | 用户明确要求独立 Demo 或 standalone 页面时，不生成 Application Shell。 |

没有明确覆盖时必须选择 `default`。Shell Mode 不得反向改变 Template Selection、模板内部能力或页面状态模型。

## 4. Default Composition

`default` 模式固定组合：

```text
Brand Top Navigation
    +
Collapsible Embedded Side Navigation
    +
Main Content Region containing the approved Page Template
```

不得用自定义 Header、私有 Sidebar、Drawer、Hamburger、Bottom Navigation 或配置驱动的 all-in-one shell 替换该组合。

## 5. Top Navigation Binding

Top Navigation 必须整体绑定 approved Brand Top Navigation subtree，复用 Docs Menu 的“品牌色模式导航”视觉和组件模式，并使用 Starter Runtime 的 `StarbucksReact.Menu`。左侧 Brand / System Region 包含固定的 Starbucks DesignKit logo 与真实 System Switch（Store / System Switch）；右侧 action order 固定为：

```text
Notification
    → Theme Toggle
    → Divider
    → Avatar / User
```

Theme Toggle 必须位于 Notification 右侧、Divider / User 左侧。

Top Menu item（当前菜单名称标题位）、Notification/Badge、Theme Toggle、Divider、Avatar/User 属于同一份 approved reference treatment。组合层只允许替换当前菜单名称、当前 active item、system name、mock user name/avatar data；不得重新定义 Menu item 的 background、border、radius、selected/hover surface，不得将 Theme Toggle 做成独立描边卡片，也不得创建 white/dark User block。Avatar 的无图片默认填充必须与品牌色背景有清晰对比，但不能改变 User action hierarchy。

Top minimum content 分为：

- `REQUIRED`：Brand / system identity、Notification、Theme Toggle、User access；
- `OPTIONAL / EXAMPLE-ONLY`：secondary system-switch text、long menu labels、demo-specific utility text。

窄宽度只允许截断 optional text 或隐藏 example-only label。不得改变批准的 Menu 视觉模式，不得隐藏 required identity 或 global actions。

Default Shell 的 Brand / System Region 与 Side Navigation 使用同一份 collapsed state：展开时 Top 与 Side 均为 `260px`，收起时均为 `56px`；收起只保留固定 Starbucks logo，展开恢复 system name 和 System Switch。System Switch 使用批准的 Runtime `Cascader` / trigger 行为，不实现第二套导航状态。

## 6. Side Navigation Binding

Side Navigation 复用 Docs Menu 的“缩起内嵌菜单”，使用现有 `StarbucksReact.Menu`、`collapse`、`hasCollapseButton`、`Menu.ItemGroup`、`Menu.SubMenu` 以及 selected/open state。

- 展开宽度沿现有 DesignKit behavior，为 `260px`；
- 收起宽度沿 shared Menu CSS，为 `56px`；
- Side 与 Main 的宽度关系由 Shell 外层拥有；
- 不创建 Starter-specific sidebar component，不复制 Menu 内部 DOM、状态或样式。

## 7. Theme Toggle

Theme Toggle 表达 target mode，而不是 current mode：

| Current mode | Required icon | `aria-label` and `title` |
| --- | --- | --- |
| Light | `window.arcoicon.IconMoon` | `切换到深色模式` |
| Dark | `window.arcoicon.IconSun` | `切换到浅色模式` |

Notification 必须使用 `window.arcoicon.IconNotification`。所有图标都从 `window.arcoicon` 读取，禁止从 `window.StarbucksReact` 解构 icon。Toggle 使用 Runtime `Button`，并保持键盘可达、可见 Focus 和准确的可访问名称。

## 8. Theme DOM Binding

主题状态绑定现有 DOM contract：

| Mode | `<html>` | `<body>` |
| --- | --- | --- |
| Light | `data-theme="light"` | 移除 `arco-theme` 和 `data-arco-theme` |
| Dark | `data-theme="dark"` | `arco-theme="dark"` 且 `data-arco-theme="dark"` |

切换必须作用于整个页面：Top Navigation、Side Navigation、Main Content 和所有 DesignKit Components。不得只切换 Shell，也不得维护与 DOM attributes 脱节的第二套 theme state。

## 9. Persistence

Docs 的 `starlight-theme` key 属于 Starlight host；Starter 当前没有可直接复用的页面级 key。Starter 定义以下最小 localStorage contract，同时复用相同的优先级语义：

- key：`designkit-starter-theme`；
- allowed values：`light`、`dark`；
- initial priority：有效的 explicit local choice → `prefers-color-scheme` → `light` fallback；
- 用户点击 Toggle 后保存 target mode，并立即应用 Theme DOM Binding；
- 没有有效 local choice 时，系统主题变化可以更新页面；存在 explicit local choice 时不覆盖用户选择。

不得新增 Theme API、Theme Provider 或组件级主题状态容器。

## 10. Responsive Contract

| Viewport | Top | Side | Main |
| --- | --- | --- | --- |
| `>= 1024px` | full approved top navigation | expanded by default, `260px` | fills remaining width |
| `768–1023px` | keep approved visual structure | collapsed by default, `56px` | fills remaining width |
| `< 768px` | preserve brand/nav/action hierarchy；只截断 optional text 或隐藏 example-only label | collapsed `56px` rail | remains usable and has no document-level overflow |

在 `390px`：Brand / system identity、Notification、Theme Toggle 和 User access 必须保留；Side 保持 `56px` rail；Top、Side 和 Main 均不得造成 document-level horizontal overflow。禁止发明 Drawer、Hamburger、Bottom Navigation、Overlay Navigation 或 mobile-specific new navigation pattern。

如果该受限 fallback 与现有 Runtime component constraints 冲突，实现必须停止并标记 `RESPONSIVE CONTRACT BLOCKED`，不得用新组件或私有导航模式绕过。

后续 Shell implementation 必须使用独立 test-only composition fixture 验证 `1280px`、`768px`、`390px`，并在 Light/Dark 下记录 `innerWidth`、document `scrollWidth`、Top/Side/Main 可用性和控制台结果。现有 Docs Demo 的 clipping 或 overflow 不能作为 Starter `PASS` evidence。

## 11. Shell / Template Ownership

| Shell owns | Page Template owns |
| --- | --- |
| Top Navigation | Page Header |
| Side Navigation | Breadcrumb decision |
| Main Content Region outer layout | Toolbar and Filter |
| Global Theme Toggle and Theme DOM binding | Table / Card / Form / Detail |
| Shell responsive relationship | Pagination, page state, Mock data and page-level interaction |

Shell wraps the selected Template and must not redefine template anatomy, internal spacing, Toolbar anatomy or Breadcrumb policy. Basic List 的 `4px / 16px / 16px` Continuous Data Region inset 继续由 `starter.template.basic-list` 拥有，不是 Shell spacing。

Default Shell Main outer layout uses fixed `24px` horizontal padding at `1280px`、`768px` 和 `390px`，并保持 `min-width: 0` 与 page `width: 100%`；不通过 max-width 缩窄可用内容区。Basic List 的 `4px / 16px / 16px` inset 仍由 Template 自身拥有。

Breadcrumb 继续按信息层级决定：Root List 在没有 meaningful IA 时不显示；Create、Edit、Detail 在存在真实父级关系时可以显示。Side Navigation 存在不等于 Breadcrumb 必需。

### Reference binding and Main Slot

Default Shell 的正式 Starter reference implementation 为 `distribution/designkit-starter-v1/patterns/default-application-shell.html`，状态为 `approved reference implementation`，不是 Golden。它拥有完整 approved Brand Top Navigation subtree、Side、Main outer frame、shared collapse state、theme binding 和 `approved-template` Main Slot。

Template Decision 完成后，必须依次执行 Shell Reference Binding 和 Template Reference Binding，再进行业务 slots/data substitution。Shell 不得拆开或重建 Top Menu item、Notification/Badge、Theme Toggle、Divider、Avatar/User treatment，也不得拆开或重建 Page Header、Context Help、Toolbar、Table、Row Actions、Pagination、Form 或 Detail anatomy。Basic List 的 approved template reference 为 `distribution/designkit-starter-v1/patterns/basic-list.html`；其 authoritative Docs source 为 `packages/docs/site/src/demos/template-pages/basic-list.tsx` 与 `basic-list.vue`。

`CONTEXT_HELP` 存在时，Page Header 必须保持 Title adjacent Help control；不得因为组合进入 Shell 而重新生成 persistent page subtitle。Basic List 的 `TableToolbar → Table → Pagination` 必须作为一个完整 continuous Data Region subtree 进入 Main Slot。

### Icon Binding

Generic UI 和 navigation Icon 固定来自 `window.arcoicon`。Notification、Light → Dark、Dark → Light、Create、More、Delete 分别绑定 `IconNotification`、`IconMoon`、`IconSun`、`IconPlus`、`IconMore`、`IconDelete`；Side 业务菜单可选择语义最接近的真实 Arco Icon，但必须通过 `typeof window.arcoicon[iconName] !== 'undefined'`。禁止 Emoji、手绘 SVG、CSS Icon、第三方 Icon 和虚构名称；Icon Binding 随 Shell/Template Reference 一起保留。

## 12. Accessibility

- 使用语义明确的 header、navigation 和 main regions；
- Top actions、Side items、collapse control 和 Theme Toggle 均需键盘可达并具有可见 Focus；
- Icon-only actions 必须具有可访问名称，装饰图标不得重复朗读；
- collapse、selected、open 和 theme 状态不能只依赖颜色表达；
- 390px 的截断或隐藏不能移除 required global actions 或其可访问名称；
- Focus order 应遵循 Top → Side → Main 的可理解页面顺序。

## 13. Unsupported Navigation Engineering

`docs.pattern.navigation-shell` 仍属于 Docs Full / Developer boundary。Starter 继续不支持：

- Custom Navigation Shell；
- Navigation API；
- dynamic permission menu；
- backend-driven navigation；
- real router；
- permission routing；
- system switch backend logic；
- React/Vue project navigation integration。

Default Application Shell 的固定组合不得被描述为完整 Navigation Shell engineering capability。

## 14. Validation Requirements

该 Capability 的验证必须分别覆盖：Shell Mode Decision、Shell Reference Usage、Shell Implementation Provenance、Top Menu Fidelity、Side Menu Fidelity、Theme Toggle Behavior、Theme Scope、Responsive Shell、Shell / Template Reference Usage、Shell / Template Ownership、Composition Fidelity、Accessibility、No Navigation Capability Leakage。

R2-R.4 使用 test-only composition fixture 锁定批准实现，并以最终 Starter ZIP 的 package-only clean-room evidence 验证生成边界；该 evidence 不创建独立 Shell Golden，也不改变本文的 fixed composition contract。

## 15. Implementation References

以下 Docs 资产状态为 `IMPLEMENTATION REFERENCE`，不是 Starter Golden：

- Top：`packages/docs/site/src/content/docs/components/navigation/menu.mdx` 的“品牌色模式导航”，以及 `packages/docs/site/src/demos/menu/top-nav-menu.tsx`；
- Side：同一 Menu Docs 的“缩起内嵌菜单”，以及 `packages/docs/site/src/demos/menu/collapse-inline-menu.tsx`；
- Theme semantics：`packages/docs/site/src/components/ThemeSelect.astro` 的 host binding semantics；Starter 使用本文定义的独立 persistence key，不依赖 Starlight Theme Provider。

Shell validation 使用 test-only composition fixture 和最终 ZIP 的 package-only clean-room。不得新增完整 Application Shell Golden，也不得修改现有 Basic List、Card List、Basic Form 或 Basic Detail Golden。
