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

## Provenance failures

When an approved binding exists, native select/checkbox/dialog, custom status pills, private toolbars, custom More menus, handwritten button treatments or custom brand variables are Implementation Provenance failures. Semantic wrappers such as `main`, `section`, `article` and `header` remain allowed as template composition.

## Scope boundaries

The Golden's visible Export is Example Specific / non-Starter evidence. Do not register or implement real Export. Runtime exports and CSS are evidence of implementation, not authorization to expand the Starter whitelist.
