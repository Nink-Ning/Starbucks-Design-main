# Repository workflow

## Rule priority

For all tasks in this repository, follow this priority order:

1. The root `AGENTS.md` and the nearest applicable nested `AGENTS.md`.
2. Existing published public APIs, compatibility requirements, and repository conventions.
3. The explicit requirements of the current task.
4. Approved Figma designs, Figma Variables, and Design Tokens.
5. The applicable files under `agent-guidelines/`.
6. Arco Design default behavior and styles.

If rules conflict, report the conflict, affected files, API or behavior impact, and a recommended resolution before making changes. Do not silently override a higher-priority rule.

---

# DesignKit architecture boundaries

## Base components

Base components provide reusable UI primitives and framework-level interaction capabilities, such as:

- Button
- Input
- Select
- MultiSelect
- Checkbox
- Tag
- DatePicker
- RangePicker
- Cascader
- TreeSelect
- Modal
- Drawer
- Table
- Pagination
- Tabs
- Tooltip
- Dropdown
- Trigger

Base component tasks may include visual optimization, token alignment, accessibility, Popup or Portal behavior, framework parity, and compatibility fixes.

Do not duplicate a base capability inside a business component or page template.

## Business components

Business components provide stable, reusable business capabilities that can be used across multiple pages.

A business component is expected to have:

- A clear business task and applicable scenarios
- Stable public Props, Events, Types, and extension boundaries
- A defined state model
- React and Vue behavior parity
- Real Docs demos
- Tests
- Public export and versioning decisions when applicable

Examples include:

- `FilterBar`
- Reusable table toolbars
- Tag management structures
- Reusable description or summary blocks

Business components should compose existing base components instead of reimplementing them.

## Page templates

Page templates are runnable page-level composition examples.

They are not public all-in-one business components by default.

A page template should demonstrate:

- How base components and business components are combined
- How page regions are arranged
- How page-level interactions are connected
- How loading, empty, error, and responsive states are handled
- How React and Vue implementations remain visually and behaviorally equivalent
- How users can copy and adapt the implementation

Examples include:

- Basic list
- Filtered list
- Tag management list
- Basic form
- Grouped form
- Step form
- Detail page
- Dashboard
- Login page
- Result page

Do not implement a page template as a large configuration-driven public component such as:

```tsx
<BasicListPage
  title="..."
  filterFields={...}
  columns={...}
  request={...}
/>
```

unless the user explicitly approves a reusable page framework and there is sufficient cross-page reuse evidence.

A page template normally belongs to Docs or a template example directory and should not be exported from React or Vue package entry points.

---

# DesignKit task routing

## Guideline registry

Component-related guideline files are located at:

- `agent-guidelines/designkit-base-component-style-optimization-guideline.md`
- `agent-guidelines/designkit-business-component-development-guideline.md`
- `agent-guidelines/designkit-filterbar-codex-master-prompt.md`

First classify the task, then read only the relevant guideline files. Do not load every guideline by default.

## Base component style optimization

Read:

`agent-guidelines/designkit-base-component-style-optimization-guideline.md`

when the task involves:

- Arco Design base component style optimization
- Figma visual alignment for base components
- Figma Variables or Design Tokens
- CSS specificity, style order, scoped style, or override issues
- Popup, Dropdown, Trigger, Tooltip, or Portal styles
- React and Vue base component visual consistency
- Input, Select, Dropdown, Tag, Checkbox, Button, Tabs, DatePicker, Cascader, TreeSelect, or similar base components

For these tasks:

- Prefer existing Figma Variables, Design Tokens, and shared component variables.
- Reuse already optimized base component capabilities.
- Do not create duplicate private styles for an existing base capability.
- Do not use broad unscoped `.arco-*` overrides.
- Do not use `!important` before identifying the root cause.
- Keep React, Vue, and Docs Preview visually equivalent.

## Business component development

Read:

`agent-guidelines/designkit-business-component-development-guideline.md`

when the task involves:

- Creating a new business component
- Extending a business component API or Schema
- Changing a business component state model or event contract
- Implementing React and Vue business components
- Creating Docs, Recipes, AI Contract, Evaluator, or business-component tests

For these tasks:

- Define the business task, applicable scenarios, non-applicable scenarios, state model, API, events, and extension boundaries before coding.
- Prefer composition of existing base components.
- Do not reimplement Input, Select, Button, Drawer, Modal, Table, or other base capabilities.
- Keep React and Vue behavior contracts aligned.
- Preserve existing public APIs unless a breaking change is explicitly approved.
- Docs must render the real component rather than a separate static simulation.

## Existing business component visual optimization

When an existing business component needs Figma visual alignment without changing its business behavior or public API, read both:

- `agent-guidelines/designkit-business-component-development-guideline.md`
- `agent-guidelines/designkit-base-component-style-optimization-guideline.md`

Use this implementation priority:

1. Existing public API and business behavior
2. Business component state and event contract
3. Figma Variables and Design Tokens
4. Existing optimized base component capabilities
5. Business component layout and composition styles
6. Arco Design default styles

Do not change submit, reset, cancel, query, permission, error recovery, controlled, or uncontrolled behavior only to match a visual screenshot.

If a base capability is visually incorrect inside a business component, first determine whether the issue belongs to the base component or to the business component layout. Do not silently copy or override the base component implementation inside the business component.

## FilterBar tasks

For any task whose main target is `FilterBar`, read:

- `agent-guidelines/designkit-business-component-development-guideline.md`
- `agent-guidelines/designkit-filterbar-codex-master-prompt.md`

Also read:

- `agent-guidelines/designkit-base-component-style-optimization-guideline.md`

when the FilterBar task includes:

- Figma visual alignment
- CSS specificity
- Arco overrides
- Base component style reuse
- Popup or Portal behavior
- React and Vue visual consistency

The FilterBar master prompt is task-specific guidance. It does not override a higher-priority `AGENTS.md`, an existing published public API, or a confirmed business behavior contract.

## Page template development

A page template task must first be classified as page-level composition, not business-component development.

Read the business-component guideline only when the task:

- Changes an existing business component
- Introduces a new reusable business component
- Changes a public API, Schema, event contract, or state model
- Requires business-component AI Contract, Evaluator, or package tests

Read the base-component guideline only when the task:

- Changes base component visual behavior
- Changes Popup or Portal behavior
- Changes shared Tokens or Arco overrides
- Fixes a reusable base component capability gap

For page template work:

- Reuse existing base and business components.
- Do not copy component state, validation, normalization, adapter, layout, Popup, or Portal logic into the template.
- Do not modify package exports by default.
- Do not add a new public page component by default.
- Do not introduce a new dependency unless the user explicitly approves it.
- Use local Mock data unless real service integration is explicitly required.
- Keep page-level request simulation, pagination, selection, and display-state logic inside the template example.
- Keep React and Vue visible behavior, defaults, interaction order, and responsive results equivalent.
- Docs must render real React and Vue components rather than static HTML, screenshots, or permanent skeleton placeholders.

---

# Required workflow

## Phase A: read-only analysis

Before modifying a component or page template, first perform a read-only analysis unless the user explicitly asks for direct implementation.

The analysis must include:

1. Task classification
2. Applicable `AGENTS.md` files
3. Applicable guideline files
4. Current React and Vue implementations or template structure
5. Reusable base components
6. Reusable business components
7. Existing Tokens and shared styles
8. Relevant Figma Variables and design differences
9. Arco specificity, Popup, or Portal risks
10. Docs routing, preview, source-view, and test structure
11. Expected files to modify
12. Working tree status and unrelated changes
13. Compatibility and public API risks
14. Recommended implementation plan

For page templates, the analysis must also confirm:

- The existing page-template route and placeholder location
- How React and Vue demos are mounted
- Whether full-screen preview already exists
- Whether source viewing or source copying already exists
- Which existing page or demo is the nearest implementation reference
- Whether the template can be implemented without modifying component packages

Do not modify code during Phase A.

## Phase B: implementation plan

Before coding, report:

1. Existing behaviors that will remain unchanged
2. Base components that will be reused
3. Business components that will be reused
4. Tokens that will be reused or added
5. Layout and interaction logic owned by the current task
6. Base or business component gaps, if any
7. Arco override scope and specificity strategy
8. React and Vue alignment strategy
9. Docs and test updates
10. Expected file whitelist
11. Compatibility and release risks

For page templates, explicitly confirm:

- The template is a composition example, not a new all-in-one public component.
- Existing business-component internals will not be copied.
- The template will not be added to package exports.
- The implementation will use real components in Docs.
- React and Vue will expose equivalent user-visible behavior.

## Phase C: implementation

### Component implementation order

Use this order when applicable:

1. Shared Tokens or shared capability
2. Approved base component fix
3. React implementation
4. Vue implementation
5. Shared or equivalent styles
6. Docs Preview
7. Tests
8. AI Contract and Evaluator

### Page template implementation order

Use this order when applicable:

1. Confirm the existing Docs route and preview structure
2. Reuse existing shared Mock data or define equivalent local Mock data
3. Implement the React page template
4. Implement the Vue page template
5. Add equivalent page-level styles
6. Connect real Docs Preview
7. Add design rules and component inventory
8. Add source view or copy capability if the existing Docs framework supports it
9. Add template-specific tests
10. Run browser verification

Avoid:

- Unrelated refactors
- Broad formatting changes
- Duplicated component logic
- Unscoped Arco overrides
- Public API changes without approval
- New package entry points
- New dependencies without approval
- Permanent skeleton placeholders
- Static simulations that bypass the real component implementation

## Phase D: verification

Run the relevant repository commands for:

- lint
- typecheck
- unit and interaction tests
- template-specific tests
- production build
- Docs build
- browser smoke checks

Verify applicable component states and scenarios, including:

- Default
- Hover
- Focus
- Disabled
- Loading
- Empty
- Error
- Permission
- Expand and collapse
- Submit, cancel, query, and reset
- Popup or Portal
- Narrow container and overflow behavior
- React and Vue consistency
- Key Figma variants and states

For page templates, also verify:

- Real React preview renders
- Real Vue preview renders
- Normal state works
- Loading state works
- Empty state works
- Error state works
- Query and reset work
- Pagination works
- Row selection works when applicable
- Batch operations work when applicable
- Column settings work when applicable
- Modal or Drawer interactions work when applicable
- Page header actions can wrap on narrow screens
- Toolbar actions can wrap or collapse on narrow screens
- FilterBar responsive columns work through the real component
- The page itself has no unexpected horizontal overflow
- Wide tables scroll only inside the table container
- Popup and Portal content is visible and usable
- Browser console contains no relevant errors or warnings
- React and Vue visual structure and user-visible behavior are equivalent

Do not claim browser verification if a browser was not actually used.

---

# Page template standards

## Composition rule

A page template should be composed from existing capabilities.

A basic list template should normally follow this structure:

```text
Page header
+ FilterBar
+ Table toolbar
+ Table
+ Pagination
+ Local page state
+ Mock data
```

The page template owns:

- Page title and description
- Page-level primary action
- Local Mock data
- Query-result simulation
- Page-level loading, empty, and error state
- Pagination coordination
- Row selection coordination
- Local column visibility settings
- Local Modal or Drawer demo state
- Responsive page composition

The page template does not own:

- FilterBar Draft and Active state internals
- FilterBar validation
- FilterBar field adapters
- FilterBar normalization
- FilterBar layout engine
- Base component Popup or Portal implementation
- Table, Input, Select, DatePicker, Modal, Drawer, or Pagination internals

## Reuse before extraction

If a repeated region appears across several page templates, do not immediately promote it to a public business component.

First confirm:

1. It appears in multiple real templates.
2. It can be used independently of one page.
3. Its Props and event boundaries are stable.
4. React and Vue can expose equivalent behavior.
5. It does not require many page-specific conditionals.
6. It provides reusable value beyond the current template.

Only then propose a separate business component.

## Docs requirements

Every page template should provide, when supported by the existing Docs architecture:

- A template title and description
- Applicable scenarios
- Non-applicable scenarios
- A real React preview
- A real Vue preview
- A React and Vue switch
- A component inventory
- Page structure notes
- Design rules
- Responsive notes
- Source view or copy source
- Full-screen preview
- Normal, loading, empty, and error examples

Docs should explain that a page template is a composition reference and starter implementation, not a stable all-in-one public API.

## React and Vue parity

React and Vue page templates must use equivalent:

- Scenario and content
- Field names
- Initial values
- Mock records
- Filter rules
- Reset baseline
- Pagination defaults
- Table columns
- Status mapping
- Selection behavior
- Batch operations
- Modal or Drawer fields
- Loading, empty, and error behavior
- Responsive breakpoints and visual structure

Framework syntax and internal implementation may differ.

Production code must not create React-to-Vue or Vue-to-React package dependencies.

## Styling

For page-template styles:

- Prefer existing Design Tokens and shared page variables.
- Reuse existing component styles.
- Keep selectors scoped to the template or Docs preview.
- Do not use broad `.arco-*` overrides.
- Do not use `!important` before identifying the root cause.
- Do not patch a base component visually from a page template unless the issue is proven to be template-owned.
- If a shared CSS file contains unrelated changes, edit and stage only the template-specific hunk.
- Keep React and Vue preview spacing, hierarchy, and responsive behavior equivalent.

## Mock data and requests

Page templates should use deterministic local Mock data by default.

Do not add:

- A service layer
- A server pagination protocol
- Permission infrastructure
- A routing framework
- A schema-driven low-code engine
- A real download service

unless the task explicitly requires it.

Simulated refresh, export, create, edit, and batch operations are acceptable when clearly implemented as local Demo behavior.

---

# Capability gap handling

## Base component capability gaps

If a business component or page template requires a capability that current base components do not provide, report:

1. The missing capability
2. The affected component and scenarios
3. Whether it is reusable across other components
4. Whether the base component should be extended
5. Whether a limited business-component adapter is sufficient
6. Whether a template-local composition is sufficient
7. React and Vue impact
8. Public API and compatibility risk

Do not silently duplicate or modify the base component inside a business component or page template.

## Business component capability gaps

If a page template requires a reusable business capability that does not exist, report:

1. The missing business capability
2. The templates or scenarios that need it
3. Whether there is sufficient reuse evidence
4. Proposed Props, events, state model, and extension boundary
5. React and Vue parity impact
6. Package export and versioning impact
7. Whether a template-local composition should be used first

Do not automatically create or export a new business component during a page-template task.

---

# Working tree and Git safety

Before implementation:

- Inspect the current Git status.
- Identify unrelated modified and untracked files.
- Define a task file whitelist.
- Report mixed files that contain both relevant and unrelated changes.
- Avoid formatting or rewriting files outside the whitelist.

During implementation:

- Modify only files required by the task.
- Preserve unrelated working-tree changes.
- For mixed files, create only the required hunk.
- Do not reset, checkout, restore, stash, clean, or overwrite unrelated user changes.
- Do not include unrelated imports, formatting, or generated files.
- Do not modify lockfiles unless an approved dependency change requires it.

By default, do not:

- Run `git add`
- Stage files or hunks
- Commit
- Push
- Create or modify tags
- Bump versions
- Publish packages
- Open or merge pull requests

These actions require an explicit user instruction.

When asked to prepare a commit, report the exact file whitelist and any mixed-file hunk requirements before staging.

---

# Delivery report

After implementation, report:

1. Task classification
2. Implemented scope
3. Modified files
4. Added files
5. Behavior changes
6. API changes
7. Visual changes
8. Reused base components
9. Reused business components
10. Reused or added Tokens
11. Arco override strategy
12. Any use of `!important` and its reason
13. React and Vue consistency
14. Docs changes
15. Test and build results
16. Browser verification results
17. Compatibility risks
18. Unresolved issues
19. File whitelist
20. Whitelist-external working-tree changes
21. Whether any Git or release action was entered
22. Suggested commit split
23. Suggested version change, if applicable

Use these result labels when useful:

- `COMPLETE`
- `CONDITIONAL`
- `BLOCKED`
- `OUT OF SCOPE`

Do not describe a conditional capability as fully complete.

---

# Release workflow

## Release workflow boundary

Implementation, documentation, testing, browser verification, versioning, staging, commit, push, and publication are separate actions.

The default workflow stops after implementation and verification.

Enter the release workflow only when the user explicitly requests it.

Documentation-only changes, page-template work, exploratory component work, incomplete implementation, local debugging, environment migration, temporary validation, Docs Preview startup, and test-only investigation do not enter release automatically.

If it is unclear whether a task is release-ready, stop after verification and report the current state.

## Versioning guidance

Suggest, but do not apply, a version change unless explicitly requested.

Use:

- Patch for compatible bug fixes
- Minor for new backward-compatible public capabilities
- Major for approved breaking changes

Docs-only and page-template-only changes normally do not require a package version change unless they also change a publishable package.

## Explicit release checklist

When the user explicitly asks for release preparation or release execution:

1. Confirm the exact packages and scope.
2. Confirm that relevant tests and production builds pass.
3. Confirm the task file whitelist.
4. Add or update regression tests when applicable.
5. Apply the approved version changes.
6. Stage only approved files and approved hunks.
7. Create the approved commit.
8. Push only when explicitly requested.
9. Publish only when explicitly requested.
10. Report exactly which steps succeeded or failed.

Stop before later release steps if verification fails.

If publication partially succeeds, do not retry already published versions. Report exactly which packages succeeded and which failed.
