# Vue–React Visual Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all Vue library components visually match their React equivalents, with Select multiple mode as the first regression case.

**Architecture:** Treat React rendering as the visual oracle and keep shared visual values unchanged. Audit paired documentation demos at identical state and viewport, then add narrowly scoped Vue DOM adapters in `packages/starbucks-design-vue/src/overrides`; record every audited component and protect corrected selectors with Vitest regression assertions.

**Tech Stack:** Vue 3.5, React 18.3, Arco Design Vue/React, Less, Astro documentation demos, Vitest, browser-based computed-style and screenshot inspection.

## Global Constraints

- Audit all 49 component override files shared by the React and Vue packages.
- Do not change component APIs, emitted events, value models, business behavior, or React visuals.
- Preserve all pre-existing uncommitted changes; stage only files proven necessary by this audit.
- Use Vue-specific selectors only where Arco Vue DOM or state classes differ from React.
- Run tests and production builds before release.
- Bump only the Vue package patch version unless React published output changes.

---

### Task 1: Establish the audit ledger and regression-test contract

**Files:**
- Create: `artifacts/vue-react-visual-audit.md`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`

**Interfaces:**
- Consumes: the 49 filenames imported by `packages/starbucks-design-vue/src/overrides/_index.less`.
- Produces: an audit row for every override and a Vitest assertion that prevents omissions.

- [ ] **Step 1: Add a failing completeness test**

Add a test that extracts imported `.less` basenames from `_index.less`, extracts component names from the audit table rows matching `| Component | Status | Evidence |`, and expects both sorted lists to match exactly.

- [ ] **Step 2: Verify the completeness test fails**

Run: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`

Expected: FAIL because `artifacts/vue-react-visual-audit.md` does not yet contain all imported component rows.

- [ ] **Step 3: Create the audit ledger**

Create the table with one row for each of: AdvancedFilter, Alert, Anchor, BackTop, Badge, Breadcrumb, Button, ButtonGroup, Cascader, Checkbox, Collapse, ColorPicker, DatePicker, Descriptions, Divider, Drawer, Dropdown, Empty, FilterBar, Input, InputNumber, InputSearch, InputTag, Link, List, Message, Modal, Notification, Pagination, Popconfirm, Popover, Progress, Radio, Select, SelectCard, Skeleton, Spin, Steps, Switch, Table, Tabs, Tag, TagGroup, TimePicker, Timeline, ToolBar, Tooltip, Tree, Upload. Initialize each status as `pending` and evidence as `—`.

- [ ] **Step 4: Make the contract explicit**

Update the test to require each status to be one of `pending`, `matched`, or `fixed`, and require non-empty evidence whenever the status is `matched` or `fixed`.

- [ ] **Step 5: Run the test**

Run: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`

Expected: PASS with all 49 rows represented.

- [ ] **Step 6: Commit the audit scaffold**

```bash
git add artifacts/vue-react-visual-audit.md packages/starbucks-design-vue/src/__tests__/styles.test.ts
git commit -m "test(vue): track React visual parity audit"
```

### Task 2: Fix Select visual parity first

**Files:**
- Modify: `packages/starbucks-design-vue/src/overrides/Select.less`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify when required for equivalent coverage: `packages/docs/site/src/demos/select/multi-select.vue`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: React Select computed styles and the existing `multi-select.tsx`/`multi-select.vue` demos.
- Produces: Vue selectors covering container, input-tag structure, tags, suffix icons, overflow, validation states, and popup options for all four sizes.

- [ ] **Step 1: Capture the failing states**

Render `multi-select.tsx` and `multi-select.vue` at the same viewport. Record differing DOM classes and computed values for height, padding, line-height, tag metrics, suffix alignment, border, focus shadow, popup option state, and overflow in the Select audit evidence.

- [ ] **Step 2: Add failing selector assertions**

For every Vue DOM class identified in Step 1, add a `styles.test.ts` assertion that reads `Select.less` and expects the exact Vue-scoped selector plus the React computed value. Keep all assertions inside one test named `maps Vue Select multiple DOM to React visual metrics`.

- [ ] **Step 3: Verify the assertions fail**

Run: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts -t "maps Vue Select multiple DOM"`

Expected: FAIL on the first missing Vue DOM adapter selector.

- [ ] **Step 4: Add minimal Vue DOM adapters**

Append a `// Vue DOM adapters` section to `Select.less`. Scope every new selector under `.arco-select-multiple` or `.arco-select-popup`; copy metric values from the React computed style, and do not change selectors already shared successfully by both frameworks.

- [ ] **Step 5: Verify Select**

Run: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`

Expected: PASS. Re-render mini, small, default, and large Select in normal, hover, focus, disabled, error, warning, open, clearable, loading, max-tag-count, and empty-popup states; no visible or computed-style mismatch remains.

- [ ] **Step 6: Mark Select complete and commit**

Set Select to `fixed` with evidence listing the inspected demos/states, then run:

```bash
git add packages/starbucks-design-vue/src/overrides/Select.less packages/starbucks-design-vue/src/__tests__/styles.test.ts packages/docs/site/src/demos/select/multi-select.vue artifacts/vue-react-visual-audit.md
git commit -m "fix(vue-select): match React visual states"
```

Omit the demo path from `git add` when the existing Vue demo already provides equivalent coverage.

### Task 3: Audit and fix data-entry components

**Files:**
- Modify as evidence requires: `packages/starbucks-design-vue/src/overrides/{AdvancedFilter,Cascader,Checkbox,ColorPicker,DatePicker,FilterBar,Input,InputNumber,InputSearch,InputTag,Radio,SelectCard,Switch,TimePicker,Upload}.less`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: paired documentation demos and React computed styles for the listed components.
- Produces: completed audit rows and Vue DOM adapters for every confirmed mismatch.

- [ ] **Step 1: Audit all listed components**

For each component, inspect default plus every applicable size, hover, focus, checked/selected, disabled, validation, loading, overflow, and popup state. Record exact mismatched property/value pairs and DOM/state-class differences before editing.

- [ ] **Step 2: Add one failing regression test per mismatching component**

Each test must name the component and state, read that component's Less file, and assert the precise Vue selector and React value missing from the current file.

- [ ] **Step 3: Run the focused tests and confirm failure**

Run: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`

Expected: FAIL only on newly documented mismatches.

- [ ] **Step 4: Implement the smallest Vue adapters**

Add component-local Vue selectors, preserving React tokens and state precedence. Do not edit files whose rendered states already match; mark those ledger rows `matched`.

- [ ] **Step 5: Verify and commit the group**

Run `pnpm -C packages/starbucks-design-vue test` and `pnpm -C packages/starbucks-design-vue build`; both must pass. Mark corrected rows `fixed`, then commit only modified data-entry files, the test, and ledger with message `fix(vue): align data-entry component visuals`.

### Task 4: Audit and fix navigation and action components

**Files:**
- Modify as evidence requires: `packages/starbucks-design-vue/src/overrides/{Anchor,BackTop,Breadcrumb,Button,ButtonGroup,Dropdown,Link,Pagination,Steps,ToolBar}.less`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: paired React/Vue demos and React computed styles.
- Produces: completed navigation/action audit rows and tested Vue-only adapters.

- [ ] **Step 1: Audit states before editing**

Inspect default, hover, active, focus-visible, disabled, loading, selected/current, collapsed, popup, and size states where applicable; log exact evidence.

- [ ] **Step 2: Write and run failing selector/value assertions**

Add one named Vitest case per mismatching component, then run `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`; expect the new cases to fail.

- [ ] **Step 3: Implement component-local Vue selectors**

Match React computed values without altering existing user changes in Button or Tooltip unless the audit proves those lines are the cause and the new fix can be layered without overwriting them.

- [ ] **Step 4: Verify and commit the group**

Run the Vue test suite and build. Mark every row `matched` or `fixed`, and commit only audited group files, tests, and ledger with message `fix(vue): align navigation component visuals`.

### Task 5: Audit and fix data-display components

**Files:**
- Modify as evidence requires: `packages/starbucks-design-vue/src/overrides/{Badge,Collapse,Descriptions,Divider,Empty,List,Progress,Skeleton,Table,Tabs,Tag,TagGroup,Timeline,Tree}.less`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: paired demos and React visual metrics.
- Produces: completed display-component rows and tested Vue adapters.

- [ ] **Step 1: Audit all display states**

Inspect typography, spacing, borders, radii, empty/loading states, selected/expanded states, scroll/overflow behavior, table density, and tree hierarchy markers; record exact evidence.

- [ ] **Step 2: Add and run failing regression tests**

Add exact selector/value assertions per mismatch and run `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`; confirm the assertions fail before Less changes.

- [ ] **Step 3: Implement only evidenced adapters**

Add Vue-scoped selectors in each affected file, reuse the React token/value, and leave visually matching files unchanged.

- [ ] **Step 4: Verify and commit the group**

Run the Vue test suite and build. Complete the ledger rows and commit with message `fix(vue): align data-display component visuals`.

### Task 6: Audit and fix feedback and overlay components

**Files:**
- Modify as evidence requires: `packages/starbucks-design-vue/src/overrides/{Alert,Drawer,Message,Modal,Notification,Popconfirm,Popover,Spin,Tooltip}.less`
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: paired demos with portals/popups open and React computed styles.
- Produces: completed feedback/overlay rows and tested Vue adapters.

- [ ] **Step 1: Audit surfaces and portal content**

Inspect container, title, body, icon, close button, action area, mask, arrow, shadow, placement, loading state, and animation endpoints. Capture evidence with overlays open.

- [ ] **Step 2: Add and run failing regression tests**

Add exact selector/value assertions for every mismatch and verify failure with `pnpm -C packages/starbucks-design-vue test -- styles.test.ts`.

- [ ] **Step 3: Implement minimal overlay adapters**

Scope fixes to Vue popup/portal classes. Preserve the existing uncommitted Tooltip change and only layer additional selectors supported by captured evidence.

- [ ] **Step 4: Verify and commit the group**

Run Vue tests and build, complete the ledger, and commit with message `fix(vue): align feedback component visuals`.

### Task 7: Complete audit gate and cross-package verification

**Files:**
- Modify: `packages/starbucks-design-vue/src/__tests__/styles.test.ts`
- Modify: `artifacts/vue-react-visual-audit.md`

**Interfaces:**
- Consumes: all 49 completed audit rows.
- Produces: a release-blocking test that rejects `pending` rows.

- [ ] **Step 1: Tighten the audit test**

Change the allowed final statuses from `pending | matched | fixed` to `matched | fixed`, retaining the non-empty evidence requirement.

- [ ] **Step 2: Verify the full matrix**

Run `pnpm -C packages/starbucks-design-vue test`, `pnpm -C packages/starbucks-design-vue build`, `pnpm -C packages/starbucks-design-react test`, `pnpm -C packages/starbucks-design-react build`, and `pnpm -C packages/docs/site build`.

Expected: every command exits 0 and the ledger test reports all 49 rows complete.

- [ ] **Step 3: Review the diff**

Run `git diff --check` and `git status --short`. Confirm no React production styles, APIs, or unrelated existing files are staged by this work.

- [ ] **Step 4: Commit the completed audit gate**

```bash
git add packages/starbucks-design-vue/src/__tests__/styles.test.ts artifacts/vue-react-visual-audit.md
git commit -m "test(vue): require complete visual parity audit"
```

### Task 8: Version and release the Vue package

**Files:**
- Modify: `packages/starbucks-design-vue/package.json`
- Modify: `pnpm-lock.yaml` only if the workspace lockfile records the package version.

**Interfaces:**
- Consumes: verified Vue package output and completed audit.
- Produces: one unpublished patch version ready for registry publication.

- [ ] **Step 1: Determine the release version**

Read the current registry version and local package version. Choose exactly the next unpublished patch version; do not reuse a version already published by a pre-existing workspace change.

- [ ] **Step 2: Apply the version bump**

Update only the Vue package version and lockfile entry, then run the Vue test suite and build again.

- [ ] **Step 3: Commit the version bump**

```bash
git add packages/starbucks-design-vue/package.json pnpm-lock.yaml
git commit -m "chore(vue): bump patch version"
```

Omit `pnpm-lock.yaml` when it has no package-version change.

- [ ] **Step 4: Push and publish**

Push the current branch to its configured upstream, then publish `@sbux/starbucks-design-vue` from `packages/starbucks-design-vue` using the repository's configured registry. Stop and report exact state if either action fails; never retry an already-published version.
