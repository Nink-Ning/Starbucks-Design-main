# Task 7 — Complete audit gate and cross-package verification

## Scope

- Tightened `packages/starbucks-design-vue/src/__tests__/styles.test.ts` so final audit rows accept only `matched` or `fixed`; `pending` now causes the gate to fail.
- Kept the component audit ledger at exactly 49 rows. `Shared.less` is an imported support primitive rather than a component row: the gate separately asserts it is imported and exists, and the existing SelectView render-contract test continues to cover it.
- Removed the `Shared` ledger row from `artifacts/vue-react-visual-audit.md`.

## TDD evidence

1. Introduced a regression assertion that final status `pending` must throw while the old `pending|matched|fixed` pattern was still in place.
2. Ran `pnpm -C packages/starbucks-design-vue test src/__tests__/styles.test.ts`.
   - Result: exit 1; 44 tests total, 1 expected failure: `does not permit pending as a final visual audit status` (the old matcher accepted `pending`).
3. Changed the final-status matcher to `matched|fixed` and ran the focused test again.
   - Result: exit 0; 44/44 tests passed.

## Ledger evidence

The final ledger scan found 49 component rows: 14 `matched`, 35 `fixed`, 0 `pending`, and 0 rows with empty or em-dash evidence. The 50th import is `Shared.less`, which is verified outside the component ledger by the gate and its existing SelectView contract test.

## Required verification

| Command | Result |
| --- | --- |
| `pnpm -C packages/starbucks-design-vue test` | exit 0; 5 files, 60 tests passed |
| `pnpm -C packages/starbucks-design-vue build` | exit 0; typecheck and both Vite bundles completed |
| `pnpm -C packages/starbucks-design-react test` | exit 0; 5 files, 23 tests passed |
| `pnpm -C packages/starbucks-design-react build` | exit 0; typecheck and both Vite bundles completed |
| `pnpm -C packages/docs/site build` | exit 0; Astro static build completed |
| `git diff --check` | exit 0; no whitespace errors |

Build logs include two warnings outside this task's changed files: Vite reports the CSS code-split override for both package builds, and the docs build reports a duplicate JSX `style` attribute in `packages/docs/site/src/demos/slider/tooltip-visible.tsx`.

## Self-review

- Confirmed the final gate rejects `pending`, requires non-empty evidence for every ledger row, and requires the 49 ledger component names to equal imported component overrides excluding `Shared`.
- Confirmed `Shared.less` remains imported, exists, and has an existing render contract that proves the bare SelectView selector includes Cascader and TreeSelect but excludes Select.
- Confirmed no React production styles or APIs changed: the final source diff is restricted to the Vue audit test and audit ledger. This report is the only additional Task 7 file.
