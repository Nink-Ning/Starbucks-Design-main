# Starter Implementation Binding Contract

Visual imitation is not DesignKit implementation. When an approved Starter Runtime capability exists, generated HTML must use it.

## Binding priority

1. Starter Runtime component;
2. Runtime/Arco primitive exposed through Starter;
3. approved Starter CSS, theme and template-local composition;
4. native semantic HTML only when no approved binding exists and the template permits it.

Starter HTML remains single-file, browser-runtime based and non-npm. Load React/ReactDOM, Arco React, Arco Icon, the package Runtime CSS, the package Runtime UMD, then Babel/JSX using the versions and order in [CDN Runtime](cdn-runtime.md).

## 3. Reference implementation binding

When composing a Shell with a Page Template, bind approved reference implementations before applying business substitutions:

```text
Template Decision → Shell Mode Decision → Shell Reference Binding
→ Template Reference Binding → Business Slot / Data Substitution
→ Composition through Shell Main Slot
```

| Reference | Package path | Status | Golden |
| --- | --- | --- | --- |
| Default Application Shell | `patterns/default-application-shell.html` | `approved reference implementation` | `NO` |
| Basic List | `patterns/basic-list.html` | `approved template reference` | `NO` |

The Shell reference owns the complete approved Brand Top Navigation subtree, the Side/Main outer frame and the `approved-template` Main Slot. The Basic List reference enters that slot as a complete subtree. The composition layer must not recreate Top Menu item or quick-action treatment, Page Header, Toolbar, Table, Row Actions or Pagination from business copy. Only approved business labels/data may vary; the fixed Starbucks logo and Top action hierarchy remain bound to the reference. Starter output uses package-local references and does not include Docs source, tests or the complete Golden implementation.

Basic List business slots are limited to `PAGE_TITLE`, `CONTEXT_HELP`, `PRIMARY_ACTION`, `QUICK_FILTER`, `SEARCH_PLACEHOLDER`, `TABLE_COLUMNS`, `TABLE_DATA`, `STATUS_DATA` and `ROW_ACTION_LABELS`. CSS, layout DOM, Toolbar regions and spacing are not free slots. When `CONTEXT_HELP` is present, render a title-adjacent Help control; never generate a persistent page subtitle.

## 4. Icon Binding

All generic UI, navigation and control icons in Starter output are bound to the local Arco icon runtime: `window.arcoicon.IconXXX`. The HTML must not depend on live access to `arco.design`, must not destructure icons from `window.StarbucksReact`, and must not use emoji, hand-drawn SVG, CSS-drawn icons or another icon library. Brand logos and special business brand graphics remain DesignKit Assets exceptions.

Fixed pattern mappings are immutable during composition:

| Pattern | Required icon |
| --- | --- |
| Notification | `IconNotification` |
| Light → Dark | `IconMoon` |
| Dark → Light | `IconSun` |
| Create | `IconPlus` |
| More | `IconMore` |
| Delete | `IconDelete` |

Side-menu business items may select a semantic Arco icon, but the name must be real, accessible as `window.arcoicon[iconName]`, and semantically reasonable. Invented names such as `IconProductCenter` and `IconInventoryManagement` are prohibited. Before rendering, validate every used icon with `typeof window.arcoicon[iconName] !== 'undefined'`; a missing icon is `FAIL` and must be replaced with a real Arco icon, never left as an empty slot.

## 5. Approved Card List bindings

| Region | Binding |
| --- | --- |
| Toolbar | Runtime `TableToolbar` |
| Selector/Search | Runtime controls inside `TableToolbar` |
| Selection | Runtime `Checkbox` plus a page-owned Selection Set |
| Status | Runtime `Tag` |
| View/Edit | Runtime `Button` |
| More | Runtime `Dropdown`/`Menu`/`Button` |
| Danger | Runtime `Popconfirm` or `Modal` |
| Empty/Feedback | Runtime `Empty` and `Message` |
| Theme | Runtime CSS variables and approved theme attributes |
| Card anatomy | approved template-local `.dk-card*` relationship |

There is no public Runtime CardList component. Use the approved template-local anatomy without copying Golden business data or example-specific Export.

## 6. Approved Default Application Shell bindings

| Region | Binding |
| --- | --- |
| Top Menu | `StarbucksReact.Menu` + approved brand top composition |
| Side Menu | `StarbucksReact.Menu` + `collapse` + `hasCollapseButton` + `Menu.ItemGroup` + `Menu.SubMenu` |
| Actions | Runtime `Button` / `Badge` / `Dropdown` / `Avatar` |
| Icons | `window.arcoicon.IconNotification` / `IconMoon` / `IconSun` |
| Theme | `html[data-theme]` + body `arco-theme` / `data-arco-theme` + existing Runtime tokens |
| Main | semantic Template wrapper inside Shell-owned outer layout |

Light shows `IconMoon` with “切换到深色模式”；Dark shows `IconSun` with “切换到浅色模式”。Icons express target mode and must not be destructured from `StarbucksReact`. Theme applies to Top, Side, Main and all components. Do not add a Theme API or Theme Provider.

## 7. Provenance failures

When an approved binding exists, native select/checkbox/dialog, custom status pills, private toolbars, custom More menus, handwritten button treatments, custom brand variables, custom Top/Side navigation or private theme providers are Implementation Provenance failures. Semantic wrappers such as `main`, `section`, `article` and `header` remain allowed as template composition.

## 8. Composition fidelity validation

Record Shell Selected / Reference Used / Fidelity, Template Selected / Reference Used / Fidelity and Composition Fidelity separately. The Basic List structural signature must include Page Header (Title + optional Context Help), continuous `TableToolbar → Table → Pagination`, TableToolbar Filter Region / Quick Filter, Action Region / Refresh and Table / Row Actions.

Standalone Basic List and Shell + Basic List may differ only in outer ancestor, available width, theme and Shell offset. The Template subtree, Context Help behavior, Toolbar ownership, Row Actions, Pagination and `4px / 16px / 16px` relationships must remain equivalent.

## 9. Scope boundaries

The Golden's visible Export is Example Specific / non-Starter evidence. Do not register or implement real Export. Runtime exports and CSS are evidence of implementation, not authorization to expand the Starter whitelist.
