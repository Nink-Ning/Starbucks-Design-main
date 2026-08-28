# Starter Default Application Shell Contract

本文件是 canonical Default Application Shell Contract 的 Non-Developer Starter projection。它只定义 `starter.pattern.default-application-shell` 的固定组合，不定义新的基础组件、Theme API、Navigation API、React/Vue 工程能力或公共页面框架。

## 1. Purpose and capability

| Field | Value |
| --- | --- |
| Capability ID | `starter.pattern.default-application-shell` |
| Support state | `SUPPORTED` |
| Registry status | `READY` |
| Profile | Product Manager / Non-Developer Starter |
| Type | Restricted composition pattern |

它为常规企业后台 Single HTML Demo 提供 Brand Top Menu、Collapsible Embedded Side Menu、Main outer layout 和全局 Light/Dark 切换。

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

Page Template 先决定页面是什么；Shell Mode 只决定是否包裹该模板。

Shell Selected 不等于 Shell Reimplemented。组合必须先绑定 approved Shell Reference Implementation，再将完整 approved Page Template subtree 放入 Main Content Slot；不得把 Shell rules 与 Template rules 合并后重新绘制页面。

## 2. Shell Modes

只允许三个模式：

| Mode | Contract |
| --- | --- |
| `default` | Top + Side + approved Page Template；Product Manager Starter 默认值。 |
| `content-only` | 用户明确已有系统框架时，只生成 Template 内容区。 |
| `none` | 用户明确要求 standalone / 独立 Demo 时，不生成 Shell。 |

没有明确覆盖时使用 `default`。AI 不得创建第四种 Shell Mode。

## 3. Default Composition

```text
Brand Top Navigation
    + Collapsible Embedded Side Navigation
    + Main Content Region containing the approved Page Template
```

该组合不是 reusable public component，不得用 custom Header、private Sidebar、Drawer、Hamburger、Bottom Navigation 或 all-in-one shell 替换。

## 4. Top Navigation Binding

Top 必须整体绑定 approved Brand Top Navigation subtree，并使用 Runtime `StarbucksReact.Menu` 遵循 Docs Menu“品牌色模式导航”的批准结构。左侧 Brand / System Region 包含固定的 Starbucks DesignKit logo 与真实 System Switch（Store / System Switch）；右侧顺序固定为：

```text
Notification
    → Theme Toggle
    → Divider
    → Avatar / User
```

Theme Toggle 必须位于 Notification 右侧、Divider / User 左侧。

Top Menu item（当前菜单名称标题位）、Notification/Badge、Theme Toggle、Divider、Avatar/User 属于同一份 approved reference treatment。组合层只允许替换当前菜单名称、当前 active item、system name、mock user name/avatar data；不得重新定义 Menu item 的 background、border、radius、selected/hover surface，不得将 Theme Toggle 做成独立描边卡片，也不得创建 white/dark User block。Avatar 的无图片默认填充必须与品牌色背景有清晰对比，但不能改变 User action hierarchy。

- `REQUIRED`：Brand / system identity、Notification、Theme Toggle、User access；
- `OPTIONAL / EXAMPLE-ONLY`：secondary system-switch text、long menu labels、demo-specific utility text。

窄宽度只允许截断 optional text 或隐藏 example-only label，不得隐藏 required identity/global actions，也不得改变 Menu 视觉模式。

Default Shell 的 Brand / System Region 与 Side 使用同一份 collapsed state：expanded 时 Top 与 Side 均为 `260px`，collapsed 时均为 `56px`；collapsed 只保留固定 Starbucks logo，expanded 恢复 system name 和 System Switch。System Switch 使用批准的 Runtime `Cascader` / trigger 行为，不实现第二套导航状态。

## 5. Side Navigation Binding

Side 使用 Runtime `StarbucksReact.Menu`、`collapse`、`hasCollapseButton`、`Menu.ItemGroup`、`Menu.SubMenu` 和 selected/open state，并遵循 Docs Menu“缩起内嵌菜单”。

- expanded：`260px`；
- collapsed：shared Menu CSS 的 `56px`；
- 不创建 Starter-specific sidebar component；
- 不复制 Menu 内部 DOM、状态或样式。

## 6. Theme Toggle

Icon 表达 target mode：

| Current mode | Icon | `aria-label` and `title` |
| --- | --- | --- |
| Light | `window.arcoicon.IconMoon` | `切换到深色模式` |
| Dark | `window.arcoicon.IconSun` | `切换到浅色模式` |

Notification 使用 `window.arcoicon.IconNotification`。禁止从 `window.StarbucksReact` 解构 icon。Theme Toggle 使用 Runtime `Button`。

## 7. Theme DOM Binding

| Mode | `<html>` | `<body>` |
| --- | --- | --- |
| Light | `data-theme="light"` | 移除 `arco-theme` 和 `data-arco-theme` |
| Dark | `data-theme="dark"` | `arco-theme="dark"` 且 `data-arco-theme="dark"` |

Theme 必须作用于 Top、Side、Main 和所有 DesignKit Components，不得只切换 Shell。

## 8. Persistence

Starter 的最小 localStorage contract：

- key：`designkit-starter-theme`；
- values：`light`、`dark`；
- priority：valid explicit local choice → `prefers-color-scheme` → `light` fallback；
- Toggle 保存 target mode 并应用 DOM binding；
- 没有 explicit local choice 时可跟随 system change；存在时不覆盖用户选择。

不得新增 Theme API、Theme Provider 或第二套组件级 theme state。

## 9. Responsive Contract

| Viewport | Top | Side | Main |
| --- | --- | --- | --- |
| `>=1024px` | full approved top structure | expanded `260px` | remaining width |
| `768–1023px` | approved visual structure | collapsed `56px` | remaining width |
| `<768px` | preserve brand/nav/action hierarchy | collapsed `56px` rail | usable, no document overflow |

在 `390px` 必须保留 Brand / system identity、Notification、Theme Toggle、User access；可截断 optional text 或隐藏 example-only label。禁止 Drawer、Hamburger、Bottom Navigation、Overlay Navigation 或 mobile-specific new navigation pattern。

如果 Runtime component constraints 与受限 fallback 冲突，停止并标记 `RESPONSIVE CONTRACT BLOCKED`，不得发明新组件。

test-only composition fixture 和最终 Starter ZIP 的 package-only clean-room 必须验证 `1280px`、`768px`、`390px`，且 Light/Dark 下 document-level overflow 为 `NONE`，Top/Side/Main 可用。现有 Docs Demo clipping 不是 Starter `PASS` evidence。

## 10. Shell / Template Ownership

| Shell owns | Page Template owns |
| --- | --- |
| Top Navigation | Page Header |
| Side Navigation | Breadcrumb decision |
| Main Content Region outer layout | Toolbar / Filter |
| Global Theme Toggle and DOM binding | Table / Card / Form / Detail |
| Shell responsive relationship | Pagination、page state、Mock data、page interaction |

Shell wraps Template，不能改变 Template anatomy、internal spacing、Toolbar anatomy 或 Breadcrumb policy。Basic List 的 `4px / 16px / 16px` Continuous Data Region inset 仍由 Basic List Template 拥有。

Default Shell Main outer layout uses fixed `24px` horizontal padding at `1280px`、`768px` 和 `390px`，并保持 `min-width: 0` 与 page `width: 100%`；不通过 max-width 缩窄可用内容区。Basic List 的 `4px / 16px / 16px` inset 仍由 Template 自身拥有。

Root List 没有 meaningful IA 时不显示 Breadcrumb；Create / Edit / Detail 存在真实父级关系时可以显示。Side Navigation 存在不等于 Breadcrumb 必需。

### Reference binding and Main Slot

正式 Starter Shell reference implementation 为 `patterns/default-application-shell.html`，status 为 `approved reference implementation`，Golden 为 `NO`。它拥有完整 approved Brand Top Navigation subtree、Side、Main outer frame、shared collapse state、theme binding 和 `approved-template` Main Slot。

Template Decision 完成后，依次执行 Shell Reference Binding、Template Reference Binding 和 business slot/data substitution。Shell 不得拆开或重建 Top Menu item、Notification/Badge、Theme Toggle、Divider、Avatar/User treatment，也不得拆开或重建 Page Header、Context Help、Toolbar、Table、Row Actions、Pagination、Form 或 Detail anatomy。Basic List 的 approved template reference 为 `patterns/basic-list.html`，必须作为完整 continuous Data Region subtree 进入 Main Slot。

当 `CONTEXT_HELP` 存在时，Page Header 保持 title-adjacent Help control；进入 Shell 不得重新生成 persistent page subtitle。

### Icon Binding

Generic UI 和 navigation Icon 固定来自 `window.arcoicon`。Notification、Light → Dark、Dark → Light、Create、More、Delete 分别绑定 `IconNotification`、`IconMoon`、`IconSun`、`IconPlus`、`IconMore`、`IconDelete`；Side 业务菜单可选择语义最接近的真实 Arco Icon，但必须通过 `typeof window.arcoicon[iconName] !== 'undefined'`。禁止 Emoji、手绘 SVG、CSS Icon、第三方 Icon 和虚构名称；Icon Binding 随 Shell/Template Reference 一起保留。

## 11. Accessibility

- Top、Side、Main 使用可理解的 semantic regions；
- Top actions、Side items、collapse control 和 Theme Toggle 键盘可达且 Focus 可见；
- Icon-only actions 有可访问名称；
- collapse、selected、open、theme 状态不只依赖颜色；
- 窄宽度截断不移除 required global actions 或可访问名称；
- Focus order 保持 Top → Side → Main。

## 12. Unsupported Navigation Engineering

Starter 仍不支持：

- Custom Navigation Shell；
- Navigation API；
- dynamic permission menu；
- backend-driven navigation；
- real router；
- permission routing；
- system switch backend logic；
- React/Vue project navigation integration。

完整 Navigation Shell 仍属于 Docs Full / Developer boundary。

## 13. Validation Requirements

分别验证：Shell Mode Decision、Shell Reference Usage、Shell Implementation Provenance、Top Menu Fidelity、Side Menu Fidelity、Theme Toggle Behavior、Theme Scope、Responsive Shell、Shell / Template Reference Usage、Shell / Template Ownership、Composition Fidelity、Accessibility、No Navigation Capability Leakage。

R2-R.4 已通过 test-only composition fixture 和最终 Starter ZIP 的 package-only clean-room 记录 Shell browser Theme、Responsive、Interaction 和 ownership evidence；该 fixture 仍不是 Golden。

## 14. Implementation References

- Top：Docs Menu / “品牌色模式导航”；
- Side：Docs Menu / “缩起内嵌菜单”；
- status：`IMPLEMENTATION REFERENCE`；
- Golden：`None`；
- validation：test-only composition fixture + final ZIP package-only clean-room evidence。

Implementation Reference 不是 Starter Golden，不得修改或重新解释四个现有 Golden。
