# Starter Implementation Binding Contract

Visual imitation is not DesignKit implementation. When an approved Starter Runtime capability exists, generated HTML must use it.

## Binding priority

1. Starter Runtime component;
2. Runtime/Arco primitive exposed through Starter;
3. approved Starter CSS, theme and template-local composition;
4. native semantic HTML only when no approved binding exists and the template permits it.

Starter HTML remains single-file, browser-runtime based and non-npm. Load React/ReactDOM, Arco React, Arco Icon, the package Runtime CSS, the package Runtime UMD, then Babel/JSX using the versions and order in [CDN Runtime](cdn-runtime.md).

## Approved Card List bindings

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

## Approved Default Application Shell bindings

| Region | Binding |
| --- | --- |
| Top Menu | `StarbucksReact.Menu` + approved brand top composition |
| Side Menu | `StarbucksReact.Menu` + `collapse` + `hasCollapseButton` + `Menu.ItemGroup` + `Menu.SubMenu` |
| Actions | Runtime `Button` / `Badge` / `Dropdown` / `Avatar` |
| Icons | `window.arcoicon.IconNotification` / `IconMoon` / `IconSun` |
| Theme | `html[data-theme]` + body `arco-theme` / `data-arco-theme` + existing Runtime tokens |
| Main | semantic Template wrapper inside Shell-owned outer layout |

Light shows `IconMoon` with “切换到深色模式”；Dark shows `IconSun` with “切换到浅色模式”。Icons express target mode and must not be destructured from `StarbucksReact`. Theme applies to Top, Side, Main and all components. Do not add a Theme API or Theme Provider.

## Provenance failures

When an approved binding exists, native select/checkbox/dialog, custom status pills, private toolbars, custom More menus, handwritten button treatments, custom brand variables, custom Top/Side navigation or private theme providers are Implementation Provenance failures. Semantic wrappers such as `main`, `section`, `article` and `header` remain allowed as template composition.

## Scope boundaries

The Golden's visible Export is Example Specific / non-Starter evidence. Do not register or implement real Export. Runtime exports and CSS are evidence of implementation, not authorization to expand the Starter whitelist.
