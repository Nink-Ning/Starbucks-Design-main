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
| Card List | `patterns/card-list.html` | `approved template reference` | `NO` |
| Basic Form | `patterns/basic-form.html` | `approved template reference` | `NO` |
| Grouped Form | `patterns/grouped-form.html` | `approved executable template reference; native section + fixed Runtime primitives` | `NO` |
| Step Form | `patterns/step-form.html` | `approved executable template reference; fixed Runtime Steps + native layout` | `NO` |
| Basic Detail | `patterns/basic-detail.html` | `approved template reference` | `NO` |
| Page Header | `patterns/page-header.html` | `approved context reference` | `NO` |
| Breadcrumb policy | `patterns/breadcrumb.html` | `approved context reference` | `NO` |
| Drawer | `patterns/drawer.html` | `approved context reference` | `NO` |
| Drawer Form | `patterns/drawer-form.html` | `approved executable template reference; fixed Runtime Drawer + Form` | `NO` |

The Shell reference owns the complete approved Brand Top Navigation subtree, the Side/Main outer frame and the `approved-template` Main Slot. The selected template reference enters that slot as a complete subtree. Page Header is a shared authority consumed by Card List, Basic Form, Basic Detail, Grouped Form and Step Form; Card List uses its Level-1 title/help anatomy without Back, while the reviewed Form/Detail pages use the depth-2 icon Back anatomy. The composition layer must not recreate either anatomy from business copy. Only approved business labels/data may vary; the fixed Starbucks logo and Top action hierarchy remain bound to the reference. Starter output uses package-local references and does not include Docs source, tests or the complete Golden implementation.

Basic List business slots are limited to `PAGE_TITLE`, `CONTEXT_HELP`, `PRIMARY_ACTION`, `QUICK_FILTER`, `SEARCH_PLACEHOLDER`, `TABLE_COLUMNS`, `TABLE_DATA`, `STATUS_DATA` and `ROW_ACTION_LABELS`. CSS, layout DOM, Toolbar regions and spacing are not free slots. When `CONTEXT_HELP` is present, render a title-adjacent Help control; never generate a persistent page subtitle.

## 3.1 P1 default binding

Before business substitution, load `references/default-template-baselines.md` and the reference selected by `manifest.json`. The selected reference is the standard answer. Only business data, labels, values, statuses, options and mock content may vary without an explicit override. A request to change anatomy, spacing, media shape, selection-summary ownership, batch-action relationship, Breadcrumb/Back, or Drawer header/body/footer is an explicit override and must be recorded.

Card List has one canonical visible selection summary. The page-owned summary and Card-specific batch actions read the same Selection Set. The generic `TableToolbar` selection region must be hidden in the Card List scope when the page-owned summary is present; do not render an additional generic `已选择 X 项` label.

FULL-PAGE FORM and FULL-PAGE DETAIL use the Shell Main 24px/24px outer rule. At depth 2, the shared Page Header is icon-only Back + 20px title + optional Context Help, with no text Back or Breadcrumb. Form and Basic Detail surfaces have no outer border and retain a 6px radius; Form content has at least 32px horizontal padding, while Basic Detail has 32px on all sides. Basic Detail keeps equal outer columns, a shared longest-label track and a 24px label/value gap. Step Form is Steps → Docs-aligned full-surface divider → content. DRAWER FORM uses Drawer title + close, direct Form body and 24px/24px body spacing; it has no path, duplicate title, persistent subtitle, duplicate header or standalone Back.

`templateVariants` in the manifest are discoverable references. A variant whose `starterEnabled` is `true` may be generated through its executable reference; a variant whose `starterEnabled` is `false` must be reported as `BLOCKED`.

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

Card List must reuse the actual approved Docs/Golden Card List DOM/structure for its frozen toolbar, container, card, selection, media and footer/action regions. The Starter reference records this provenance; business substitutions are limited to title/data/filter/status/action slots. It must expose one canonical visible selection summary.

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
