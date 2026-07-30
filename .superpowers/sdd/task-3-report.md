# Task 3 report: data-entry visual parity

## Outcome

Audited all 15 assigned data-entry override pairs against the React documentation demos and computed styles. Eight confirmed Vue DOM/class mismatches were corrected and seven components have a completed matched/not-applicable disposition. Cascader and TreeSelect intentionally share the accepted bare SelectView trigger contract; Select remains component-scoped and excluded from that shared rule set.

| Component | Result | Evidence / action |
| --- | --- | --- |
| AdvancedFilter | matched / N/A | No export, implementation, paired demo, or renderable runtime surface; both imported Less files are comment-only and emit no CSS. |
| Cascader | fixed | Vue Cascader and TreeSelect intentionally share a non-Select SelectView trigger contract for 24/32/40px sizing and hover/focus/error/disabled states. Cascader-owned panel/options retain their scoped 28px adapters; `.arco-select` is excluded. |
| Checkbox | fixed | Vue 14px/2px-border icon mapped to React's 16px/1px-border/4px-radius control, including label, hover, checked, indeterminate, and disabled states. |
| ColorPicker | matched | Comparable default and 24/28/32/36px size/disabled demos use matching borders, radii, and preview metrics. |
| DatePicker | matched | Comparable picker shells share 32px height, 8px padding, 1px component/status border, 4px radius, typography, and disabled colors. |
| FilterBar | matched / N/A | No export, implementation, paired demo, or renderable runtime surface; both imported Less files are comment-only and emit no CSS. |
| Input | fixed | Vue visible wrapper mapped from translucent/transparent-border/2px-radius/16px-padding defaults to React's container background, 1px border, 4px radius, 8px padding, and state tokens. |
| InputNumber | fixed | Vue's state-bearing input wrapper and button-mode inner/group surfaces mapped to the React InputNumber shell and state metrics. |
| InputSearch | fixed | Vue wrapper, append slot, and search button mapped to React's joined 32px field/button geometry. |
| InputTag | fixed | Vue `medium` maps to React default with a 32px minimum (not fixed) height, 2px vertical padding, 14/22px type, and wrapping draggable/overflow containers. |
| Radio | fixed | Vue icon/label DOM mapped to React's 16px control, 1px border, 8px label gap, checked dot, hover, and disabled tokens. |
| SelectCard | matched / N/A | No export, implementation, paired demo, or renderable runtime surface; both imported Less files are comment-only and emit no CSS. |
| Switch | fixed | Vue handle mapped to React's supported default/small dot metrics and checked/round/disabled states; dead large-size rules were removed because Vue Switch has no large size. |
| TimePicker | matched | Comparable basic, prefix/range, disabled, custom, and default-value shells share the React container metrics and tokens. |
| Upload | matched | Comparable basic, disabled, file-list, custom-icon, and avatar surfaces use the shared visual contract. React's drag demo supplies extra props/tip/message content absent from Vue, so its taller content is not a Less mismatch. |

## Regression tests

Added one selector/value regression test for each fixed component in `packages/starbucks-design-vue/src/__tests__/styles.test.ts`.

Red evidence:

- Initial focused run: 7 failed / 7 passed for Cascader, Checkbox, Input, InputSearch, InputNumber, InputTag, and Radio.
- Switch follow-up focused run: 1 failed / 14 passed for the missing `.arco-switch-handle` adapter.

Green evidence:

- Focused: `pnpm -C packages/starbucks-design-vue test -- styles.test.ts` — 1 file passed, 17 tests passed.
- Full: `pnpm -C packages/starbucks-design-vue test` — 5 files passed, 33 tests passed.
- Production build: `pnpm -C packages/starbucks-design-vue build` — `vue-tsc`, ESM/CJS, UMD, declarations, and shims completed successfully.

## Runtime verification

Used the paired docs at 1440×1000 in dark mode and compared computed dimensions, padding, background, border, radius, color, typography, and the available state demos. After rebuilding the Vue package, the corrected Cascader, Checkbox, Input, InputNumber, InputTag, Radio, and Switch selectors produced the React metrics. The rebuilt Switch handle specifically verified at 12×12 default, 10×10 small, and 15×15 checked with matching disabled colors.

DatePicker and TimePicker source props differ in a few status, size, and width demos, while Upload's drag examples have different content/props. Those non-equivalent cases are recorded as comparison limits rather than styling defects.

## Review note

Vue Cascader exposes its trigger only as `.arco-select-view-*`, without a Cascader owner class or ancestor. Source and rendered checks covered Select, Cascader, and TreeSelect in single, multiple, disabled, and error variants. Select adds `.arco-select`; Cascader and TreeSelect produce indistinguishable bare SelectView roots. The accepted design decision is therefore represented directly: `Shared.less` applies the same trigger contract to Cascader and TreeSelect via `.arco-select-view:not(.arco-select)`, while Select's existing component-specific rules remain in control.

## Review follow-up

- Replaced fragment-only regression assertions with exact selector blocks and declaration pairs, plus negative assertions for broad or dead selectors.
- Removed InputTag's fixed medium height while retaining `min-height: 32px`; exact tests cover both draggable and overflow wrapping containers.
- Removed every unsupported `.arco-switch-large` rule and added exact default/checked/small handle coverage.
- Closed AdvancedFilter, FilterBar, and SelectCard as matched/not-applicable after graph, export, implementation, demo, and stylesheet checks found no renderable surface.
- Moved Cascader's trigger adapter to `Shared.less` after confirming the accepted shared contract with TreeSelect. Render checks prove it matches both bare consumers across single/multiple/disabled/error states and excludes Select.

Commit: `fix(vue): align data-entry component visuals` (this commit).
