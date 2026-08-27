# Starter Template Usage Contract

This package contract makes an approved page template the implementation baseline. It is a filtered Starter projection of the canonical DesignKit Template Usage Contract.

## Selected, used and fidelity

- **Template Selected** means the request was routed to an approved Starter template.
- **Template Used** means the implementation adopts that template's page anatomy rather than assembling unrelated lower-level controls.
- **Template Fidelity** means the result preserves anatomy, hierarchy, component composition, interaction ownership, spacing relationships and responsive behavior. These dimensions are validated independently.

## Implementation baseline

When an approved Page Template exists, the Template is the implementation baseline.

AI may adapt business copy, business fields, mock data, applicable actions and domain content. AI must preserve the template's page anatomy, structural hierarchy, component composition, interaction ownership, spacing relationships and responsive behavior. AI must not reconstruct the page independently from lower-level components unless the template explicitly permits the variation.

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

Toolbar, Table and Pagination are one continuous region. Do not add a default Toolbar Card, Summary Card and Table Card stack, duplicate borders/radii/shadows or unnecessary page-level gaps. The page owns the composition and state; each component owns only its internal layout.

Card List preserves the approved compact horizontal media/content relationship, title and metadata hierarchy, selection anchor, compact footer, action relationship, grid relationship and responsive column behavior. Do not invent a tall media banner, marketing-card hierarchy, new chrome, selected badge, card-body selection or a different density model.

Basic Form is a complete Create/Edit family: both states preserve the same header, form surface, sections, actions, spacing relationships and responsive structure. Create uses empty/default values and a create action; Edit uses prefilled values and a save/update action.

Basic Detail is a focused read-only object page, not a generic information card or an enterprise workspace. Preserve its header, meaningful child breadcrumb, information hierarchy, surface/sections, action placement and responsive behavior.

## Breadcrumb and help

Hide Breadcrumb by default on a module root when the surrounding navigation already supplies clear position context. Show it for a meaningful child workflow or detail page. Breadcrumb represents information hierarchy, not technical URL depth. For root data-management pages, use contextual Help instead of a persistent explanatory subtitle when the explanation is supplementary; this does not prohibit subtitles where a template requires them.

## Scope

This contract does not authorize Navigation Shell, Result Page, Dashboard, React/Vue project APIs, real Export, cross-page selection or other capabilities absent from the Capability Registry. Universal list padding remains a design decision; do not infer a package-wide value from one example.
