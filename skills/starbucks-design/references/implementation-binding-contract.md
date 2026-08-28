# DesignKit Implementation Binding Contract

本文件定义 Starter 生成结果如何绑定已批准的 DesignKit 实现。它补充 [Template Usage Contract](template-usage-contract.md)，不替代 Capability Registry、Runtime Manifest、组件 API 或 Golden Example。

## 1. Core rule

当存在已批准的 DesignKit 实现时，生成结果必须使用该实现。Visual imitation is not DesignKit usage。

实现必须同时满足：

```text
Approved implementation identified
        +
Runtime / CSS / theme provenance confirmed
        +
Template-local composition preserved
```

## 2. Binding priority

按以下优先级绑定：

1. Approved Starter Runtime component；
2. Starter Runtime 暴露的 approved Arco primitive；
3. Approved DesignKit CSS、theme 和 Template-local composition；
4. Native semantic HTML，且仅限没有 approved binding 并且 Template 明确允许的情况。

如果存在可用的 Runtime capability，不得用 native element、私有 DOM 或手写 CSS 重新实现其视觉或交互。

## 3. Card List binding map

`starter.template.card-list` 使用以下实现边界：

| Region | Required binding | Ownership |
| --- | --- | --- |
| Page Header | Template-owned semantic composition | Page |
| Toolbar | `TableToolbar` from Starter Runtime | Business component |
| Selector / Search | `TableToolbar` 内的 Runtime `Select` / `Input` | TableToolbar |
| Selection | Runtime `Checkbox` + page-owned Selection Set | Page + base component |
| Card surface | Golden / Template-local `.dk-card*` anatomy and CSS relationship | Template |
| Status | Runtime `Tag` | Base component |
| View / Edit | Runtime `Button` | Base component |
| More | Runtime `Dropdown` + `Menu` + `Button` | Base components |
| Danger confirmation | Runtime `Popconfirm` or `Modal` | Base component |
| Empty | Runtime `Empty` | Base component |
| Feedback | Runtime `Message` | Base component |
| Theme | Runtime CSS variables + approved host theme attributes | Runtime / host |
| Pagination | Not inferred from the Card List Golden | Capability boundary |

Card List 没有公共 Runtime Card API。允许使用 Template-local Card anatomy，但不得另造一套 `.card`、`.card-info`、`.card-bottom` 或等价层级并宣称已使用 Golden。

## 4. Default Application Shell binding map

`starter.pattern.default-application-shell` 使用 [Default Application Shell Contract](application-shell.md) 的固定组合：

| Region | Required binding | Prohibited substitute |
| --- | --- | --- |
| Top Menu | `StarbucksReact.Menu` + approved brand top composition | custom Header/navigation DOM |
| Side Menu | `StarbucksReact.Menu` + `collapse` + `hasCollapseButton` + `Menu.ItemGroup` + `Menu.SubMenu` | Starter-specific sidebar component |
| Actions | Runtime `Button` / `Badge` / `Dropdown` / `Avatar` | native button, custom badge/menu/avatar |
| Icons | `window.arcoicon.IconNotification` / `IconMoon` / `IconSun` | icons destructured from `StarbucksReact`, handwritten SVG |
| Theme | `html[data-theme]` + body `arco-theme` / `data-arco-theme` + existing Runtime tokens | Theme API, Theme Provider, shell-only theme state |
| Main | semantic Template wrapper inside Shell-owned outer layout | Shell rewrite of Template anatomy or spacing |

Light mode 显示 `IconMoon` 并使用“切换到深色模式”；Dark mode 显示 `IconSun` 并使用“切换到浅色模式”。Icon 表达 target mode。Runtime capability 存在时不得使用 native substitute。

## 5. Starter Runtime loading

Non-Developer Starter 不使用 npm imports。Single HTML 必须按实际 Starter example/runtime 的顺序加载：

```text
React / ReactDOM
    → Arco React
    → Arco Icon
    → Starbucks Runtime CSS
    → Starbucks Runtime UMD
    → Babel Standalone
    → JSX execution
```

具体版本和相对路径只能复用 Starter Runtime reference 与现有 Starter example，不得重新发明 CDN 地址、版本或 loader。

## 6. Export provenance

生成 JSX 必须从真实 `window.StarbucksReact`（或当前 Runtime 明确暴露方式）读取 approved exports。Card List 至少检查：

```text
Button, Checkbox, Dropdown, Empty, Menu, Message,
Modal, Popconfirm, TableToolbar, Tag
```

required export 缺失时结果为 `FAIL`，不得静默 fallback 到 native/custom implementation。Golden 中的 Export 仍是 Example Specific / non-Starter evidence。

## 7. Native substitute failures

当对应 Runtime capability 存在时，以下均为 Implementation Provenance `FAIL`：

- native `<button>` + handwritten visual recreation 替代 Runtime `Button`；
- native `<select>` 替代 Runtime filter；
- native checkbox 替代 Runtime `Checkbox`；
- native `<dialog>` 替代 `Popconfirm` / `Modal`；
- custom status span 替代 Runtime `Tag`；
- private toolbar DOM 替代 `TableToolbar`；
- custom More menu 替代 `Dropdown` / `Menu`；
- custom brand variables 替代 Runtime theme variables。
- custom Top/Side navigation 替代 Default Application Shell 的 Runtime `Menu` binding；
- Theme Provider 或私有 theme state 替代 approved DOM attribute binding。

`main`、`section`、`header`、`article` 等 semantic wrappers 仍可作为 Template-owned composition 使用。

## 8. Golden copy boundary

正确链路是：

```text
Business request
    ↓
Canonical Knowledge
    ↓
Implementation Binding Contract
    ↓
Golden anatomy reference
    ↓
Fresh implementation
```

允许复用 approved class anatomy、Runtime bindings 和 theme mechanism；不得复制 Golden 的业务数据、默认选择、Example-specific Export 或完整页面实现。

## 9. Maintenance boundary

本文件只定义实现 provenance 和 binding priority，不新增 Capability、不登记 Runtime schema、不创建第二套 Component Registry。若 Runtime export、Manifest 或 Golden 与本 Contract 冲突，应记录 `RUNTIME EVIDENCE CONFLICT` 或 `DESIGN DECISION REQUIRED`，不得在生成页静默降级。
