# Starter Template Usage Contract

This package contract makes an approved page template the implementation baseline. It is a filtered Starter projection of the canonical DesignKit Template Usage Contract.

## Selected, used and fidelity

- **Template Selected** means the request was routed to an approved Starter template.
- **Template Used** means the implementation adopts that template's page anatomy rather than assembling unrelated lower-level controls.
- **Template Fidelity** means the result preserves anatomy, hierarchy, component composition, interaction ownership, spacing relationships and responsive behavior. These dimensions are validated independently.

## Implementation baseline

When an approved Page Template exists, the Template is the implementation baseline.

AI may adapt business copy, business fields, mock data, applicable actions and domain content. AI must preserve the template's page anatomy, structural hierarchy, component composition, interaction ownership, spacing relationships and responsive behavior. AI must not reconstruct the page independently from lower-level components unless the template explicitly permits the variation.

`APPROVED DEFAULT TEMPLATE = STANDARD ANSWER`. Read [P1 Starter Default Template Baselines](default-template-baselines.md) and bind the manifest reference before making business substitutions. Supported capability does not become enabled by default merely because a Runtime component exists. Layout, spacing, media shape, page context, selection/batch relationship and Drawer anatomy require an explicit user override; record the override and its impact.

Do not replace a Basic Form or Basic Detail with a generic card, or replace the Basic List data-region composition with independently styled Toolbar/Table cards. Do not invent a new card anatomy, action treatment, page spacing system or shell behavior.

## Page composition

Basic List / data management pages use:

```text
Page Header
    ↓
Continuous Data Region
    ├── TableToolbar
    ├── Table
    └── Pagination
```

The approved Basic List template reference is `patterns/basic-list.html`; the composition layer must mount the complete subtree into the Shell Main Slot instead of reconstructing Page Header, Toolbar, Table, Row Actions or Pagination. Its stable signature is `Page Header → Content Surface[TableToolbar (Filter Region + Action Region) → Table → Pagination]`.

When `CONTEXT_HELP` exists, keep a title-adjacent, keyboard-accessible Context Help control for the explanation. Do not generate a persistent page subtitle. Header actions remain in the template-owned Header Actions region.

Toolbar, Table and Pagination are one continuous region inside one approved Content Surface. Do not add a default Toolbar Card, Summary Card and Table Card stack, duplicate borders/radii/shadows or unnecessary page-level gaps. Keep the data-region inset at `4px` top, `16px` left/right and `16px` bottom. TableToolbar owns its `12px` top/bottom padding; the Toolbar→Table external gap is `0`. Use the actual Runtime Table fixed-column API for the first two left columns and the operation right column, and bind row actions to the approved centered `4px`-gap layout. The page owns the composition and state; each component owns only its internal layout.

Basic List and other page-level Header Actions use the approved hierarchy: the highest-priority action is the only Primary and is far right; all other actions are Secondary Outlined. Card List batch actions are Secondary Outlined only, with priority expressed by visible actions versus More.

Navigable table fields must render the actual Runtime `Link` with its approved hover/focus behavior. Table row hover must come from the actual Runtime `Table` hover selectors and theme tokens; templates must not add private row-hover CSS.

Card List preserves the approved compact horizontal media/content relationship, circular default media, title/status and metadata hierarchy, page-owned selection anchor, exactly one visible selection summary, compact footer, action relationship, grid relationship and responsive column behavior. When Runtime `TableToolbar` is used, hide its generic selection-summary region within Card List scope unless it is the one canonical summary. Do not invent a tall media banner, square/rounded-square hero, marketing-card hierarchy, new chrome, selected badge, card-body selection, duplicate `已选择 X 项` feedback or a different density model.

Basic Form is a complete Create/Edit family: both states preserve the same header, form surface, sections, actions, spacing relationships and responsive structure. Create uses empty/default values and a create action; Edit uses prefilled values and a save/update action.

Basic Detail is a focused read-only object page, not a generic information card or an enterprise workspace. Preserve its shared depth-2 header, information hierarchy, surface/sections, action placement and responsive behavior. The header is icon-only Back + 20px title + optional approved Context Help; at depth 2 do not add text Back or Breadcrumb; at depth >= 3, use the approved Breadcrumb-only reference when the IA context requires it and omit the independent Page Title, Back and title-level Context Help.

## Shell wrapping

[Default Application Shell](application-shell.md) may wrap an approved Template after Template Selection. Shell owns Top, Side, Main outer layout, global Theme binding and Shell responsive relationship. Template still owns Page Header, Breadcrumb decision, Toolbar/Filter, Table/Card/Form/Detail, Pagination, page state, Mock data, page interactions and internal spacing.

Shell MUST NOT alter Template anatomy. Basic List `4px / 16px / 16px` remains the Template-owned Continuous Data Region inset, not Shell spacing.

## Breadcrumb and help

Breadcrumb represents information hierarchy, not a page type or technical URL depth. Level 1 uses title + optional approved Context Help. Depth-2 full-page Create/Edit/Detail/Grouped/Step uses icon-only Back + title + optional approved Context Help and no Breadcrumb. Depth >= 3 uses the approved Breadcrumb-only reference when a meaningful parent path is part of the IA; its terminal item is the current page identity, so do not render an independent Page Title, Back or title-level Context Help. Page Header has no persistent subtitle. All three context forms share the same Header-to-Content spacing; depth >= 3 swaps in Breadcrumb-only context without a page-specific margin. Read the [P1 Starter Default Template Baselines](default-template-baselines.md) for the full context matrix.

## Full-page Form and Drawer Form contexts

- FULL-PAGE FORM: Shell Main left/right 24px; Form Surface fills the available Main width; Form content has at least 32px horizontal inner padding; Basic/Grouped/Step variants preserve the same outer rules.
- FULL-PAGE DETAIL: Shell Main left/right 24px; depth-2 icon-only Back + 20px title + optional Context Help; no text Back/Breadcrumb.
- DRAWER FORM: Drawer header title + close, body directly contains Form with canonical 24px/24px body spacing, and approved footer/actions. Drawer owns exactly one action region; suppress nested FormActions in the Drawer composition. No path, duplicate title, persistent subtitle, duplicate task header or standalone Back.
- Side Navigation level 1 may use approved semantic icons; level 2 and deeper items default to no icons while preserving the approved Menu hierarchy, active treatment, spacing and collapse behavior.
- Do not add Drawer body 24px plus Form 32px as an accidental double inset; use the canonical reference spacing.

## Scope

This contract authorizes only `starter.pattern.default-application-shell` fixed composition. It does not authorize Custom Navigation Shell, Navigation API, dynamic permissions, real routing, Result Page, Dashboard, React/Vue project APIs, real Export, cross-page selection or other capabilities absent from the Capability Registry. Side Navigation does not make Breadcrumb mandatory. Universal list padding remains a design decision; do not infer a package-wide value from one example.
