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

Top 使用 Runtime `StarbucksReact.Menu` 并遵循 Docs Menu“品牌色模式导航”的批准结构。右侧顺序固定为：

```text
Store / System Switch
    → Notification
    → Theme Toggle
    → Divider
    → Avatar / User
```

Theme Toggle 必须位于 Notification 右侧、Divider / User 左侧。

- `REQUIRED`：Brand / system identity、Notification、Theme Toggle、User access；
- `OPTIONAL / EXAMPLE-ONLY`：secondary system-switch text、long menu labels、demo-specific utility text。

窄宽度只允许截断 optional text 或隐藏 example-only label，不得隐藏 required identity/global actions，也不得改变 Menu 视觉模式。

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

后续 test-only composition fixture 必须验证 `1280px`、`768px`、`390px`，且 Light/Dark 下 document-level overflow 为 `NONE`，Top/Side/Main 可用。现有 Docs Demo clipping 不是 Starter `PASS` evidence。

## 10. Shell / Template Ownership

| Shell owns | Page Template owns |
| --- | --- |
| Top Navigation | Page Header |
| Side Navigation | Breadcrumb decision |
| Main Content Region outer layout | Toolbar / Filter |
| Global Theme Toggle and DOM binding | Table / Card / Form / Detail |
| Shell responsive relationship | Pagination、page state、Mock data、page interaction |

Shell wraps Template，不能改变 Template anatomy、internal spacing、Toolbar anatomy 或 Breadcrumb policy。Basic List 的 `4px / 16px / 16px` Continuous Data Region inset 仍由 Basic List Template 拥有。

Root List 没有 meaningful IA 时不显示 Breadcrumb；Create / Edit / Detail 存在真实父级关系时可以显示。Side Navigation 存在不等于 Breadcrumb 必需。

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

分别验证：Shell Mode Decision、Shell Implementation Provenance、Top Menu Fidelity、Side Menu Fidelity、Theme Toggle Behavior、Theme Scope、Responsive Shell、Shell / Template Ownership、Accessibility、No Navigation Capability Leakage。

本阶段只有 Knowledge / Projection contract tests，不创建或验证 Shell HTML。后续 fixture 完成前，Shell browser Theme、Responsive 和 Interaction evidence 为 `UNVERIFIED`。

## 14. Implementation References

- Top：Docs Menu / “品牌色模式导航”；
- Side：Docs Menu / “缩起内嵌菜单”；
- status：`IMPLEMENTATION REFERENCE`；
- Golden：`None`；
- validation：后续 test-only composition fixture。

Implementation Reference 不是 Starter Golden，不得修改或重新解释四个现有 Golden。
