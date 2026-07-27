# Vue–React Visual Parity Design

## Goal

Make every component exported by `@sbux/starbucks-design-vue` visually match the equivalent component in `@sbux/starbucks-design-react`, without changing public APIs or interaction semantics. Select multiple mode is the first high-priority regression case, but the audit covers the complete Vue component library.

## Scope

- Audit all 49 component override files shared by the React and Vue packages, plus each package's override index and stylesheet entry order.
- Compare equivalent default, hover, active, focus, disabled, loading, validation, size, popup, empty, and content-overflow states where those states exist.
- Use React rendering as the visual source of truth. Preserve its dimensions, spacing, typography, colors, borders, radii, shadows, icon alignment, and popup presentation.
- Adapt Vue-only selectors when Arco Vue and Arco React render different elements or state classes.
- Add or update paired documentation demos only when an equivalent render case is missing and the demo is needed to reproduce or verify a visual difference.
- Do not change component APIs, emitted events, value models, business behavior, or React visuals.

## Audit Strategy

The work proceeds in component groups so every change has a bounded visual surface:

1. Data entry: Select, Cascader, Checkbox, Radio, Input, InputNumber, InputSearch, InputTag, DatePicker, TimePicker, ColorPicker, Switch, Upload, AdvancedFilter, FilterBar, SelectCard.
2. Navigation and actions: Button, ButtonGroup, Link, Anchor, Breadcrumb, Dropdown, Pagination, Steps, BackTop, ToolBar.
3. Data display: Badge, Collapse, Descriptions, Divider, Empty, List, Progress, Skeleton, Table, Tabs, Tag, TagGroup, Timeline, Tree.
4. Feedback and overlays: Alert, Drawer, Message, Modal, Notification, Popconfirm, Popover, Spin, Tooltip.

For each component, render equivalent React and Vue examples using the existing documentation demos. Inspect computed styles and DOM/state-class differences, record each mismatch, and change only the Vue override needed to close that mismatch. Static source equality is not accepted as proof of visual parity because the two Arco implementations render different markup.

## Select Multiple Acceptance Case

Select multiple mode must match React for mini, small, default, and large sizes, including:

- container height, minimum height, padding, border, radius, and focus ring;
- selected-tag height, spacing, padding, typography, background, and close icon;
- placeholder and search-input alignment;
- suffix, clear, loading, search, and arrow icon sizing and centering;
- collapsed tag count and content overflow;
- disabled, error, warning, hover, focused, and open states;
- popup width, option typography, selected/hovered/disabled states, empty content, and shadow.

## Implementation Boundaries

- Keep shared visual values aligned with the React override files.
- Put DOM-specific fixes in the Vue override files. Do not weaken React selectors or introduce global selectors that leak outside the target component.
- Prefer the smallest selector that reaches the Vue element and preserves Arco state precedence.
- Do not refactor unrelated theme infrastructure.
- Preserve all pre-existing uncommitted changes in both packages. Only files proven necessary by the audit belong in the implementation commits.

## Verification

- Add regression assertions for every corrected selector or style invariant.
- Add component render tests where a DOM/state-class difference is responsible for the regression.
- Compare paired React/Vue demos at the same viewport and state; verify both normal and overlay content.
- Run the Vue package test suite and production build after each component group.
- Run the React package test suite and production build at final verification to ensure the visual baseline was not changed accidentally.
- Run the documentation site build when demos or its visual comparison harness change.

## Release

This is a Vue package bug fix. After all verification passes, bump the Vue package patch version once for the complete audit, commit only related files, push the current branch, and publish the bumped Vue package. If shared documentation or React test fixtures must change, they are included only when directly required for parity verification; the React package version is not bumped unless its published output changes.

## Success Criteria

- Every shared component override has a completed React-versus-Vue visual audit.
- All observed Vue mismatches are corrected across applicable states and sizes.
- Select multiple mode satisfies the detailed acceptance case above.
- New regression coverage fails when a required Vue-specific selector is removed.
- Relevant tests and production builds pass.
- No public API or interaction behavior changes.
