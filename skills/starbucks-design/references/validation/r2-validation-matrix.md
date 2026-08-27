# DesignKit Starter V1-r2 Validation Matrix

本矩阵汇总 R2-D 当前已执行的验证证据。它区分 Source/Template 结论、实际 Browser Evidence、预投影漂移和尚未完成的人工审查；任一列的 `PASS` 不会自动升级其他列。

## Result vocabulary

- `PASS`：当前维度的适用证据已执行且满足 Contract。
- `CONDITIONAL`：有证据，但存在明确限制、依赖或人工签收未完成。
- `UNVERIFIED`：尚未有足够的当前证据。
- `BLOCKED`：已尝试但被环境或外部依赖阻断。
- `OUT OF SCOPE`：不属于 Starter R2 能力边界。

## Matrix (verified 2026-08-26)

| Capability / Template | Decision | Template Usage | Provenance | Interaction | Theme | Responsive | Geometry | Accessibility | Visual | Release Ready |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Basic List | PASS | PASS (R2-B contract/tests) | UNVERIFIED (no new Starter runtime artifact in R2-D) | PASS (semantic template tests) | UNVERIFIED | BLOCKED for Vue Docs browser evidence | UNVERIFIED | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Card List | PASS | PASS | PASS (C.2B/C.3 runtime binding) | PASS | PASS for generated Runtime light/dark; Golden dark comparison UNVERIFIED | PASS (1280/768/390, no page overflow) | PASS (same-viewport Golden deltas) | CONDITIONAL (full keyboard/manual review pending) | CONDITIONAL (manual sign-off pending) | CONDITIONAL |
| Basic Form Create | PASS | PASS (R2-B contract/tests) | UNVERIFIED | CONDITIONAL (static evidence; Docs Vue hydration blocked) | UNVERIFIED | BLOCKED for Vue Docs browser evidence | UNVERIFIED | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Basic Form Edit | PASS | PASS (same Basic Form family) | PASS (Runtime-backed fixture) | PASS (prefill, Cancel, Save) | UNVERIFIED | PASS (1280/390 Light fixture) | PASS (same fixture anatomy) | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Basic Detail | PASS | PASS (R2-B contract/tests) | UNVERIFIED | CONDITIONAL (static evidence; Docs Vue hydration blocked) | UNVERIFIED | BLOCKED for Vue Docs browser evidence | UNVERIFIED | CONDITIONAL (known DetailPageHeader aria-label dependency) | UNVERIFIED | CONDITIONAL |
| TableToolbar | PASS (direct export/CSS evidence) | PASS within approved template subsets | PASS for C.3 Runtime | PASS (filter/selection/action browser checks) | CONDITIONAL (profile-specific evidence) | CONDITIONAL (indirect template evidence) | CONDITIONAL (no independent Golden) | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Quick Filter | PASS | PASS within Basic/Card List profiles | PASS through TableToolbar | PASS | CONDITIONAL | PASS in Card List browser evidence | CONDITIONAL | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Selection | PASS for Card List current-result scope | PASS | PASS | PASS (selection set, select-all state) | PASS in generated Runtime | PASS | PASS (anchored selection geometry) | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Batch Actions | PASS for approved Card List light actions | PASS | PASS | PASS (More, confirmation, feedback) | CONDITIONAL | PASS | PASS | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Theme foundation | PASS as Runtime mechanism | Template-specific | PASS for C.3 generated output | CONDITIONAL | PASS for generated Card List; other template evidence incomplete | CONDITIONAL | PASS for Card List geometry | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Responsive foundation | PASS as contract | Template-specific | PASS for C.3 Card List | CONDITIONAL | CONDITIONAL | PASS for Card List; Docs Vue browser blocked | PASS for Card List | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Accessibility foundation | PASS as contract | Template-specific | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | UNVERIFIED | CONDITIONAL |
| Navigation Shell | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE |
| Result Page / Dashboard | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE |
| Export | OUT OF SCOPE (Golden Example Specific only) | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE |

## Evidence locations

- Card List C.3 Golden/generated screenshots: R2-F manual browser review evidence.
- Card List fresh Runtime output: R2-C Runtime-backed Card List validation fixture.
- Runtime provenance check: R2-C Runtime binding verification.
- Card List Error/Retry validation fixture: R2-D Card List state validation fixture.
- Basic Form Edit validation fixture: R2-D Basic Form Edit validation fixture.
- Product CRUD regression route: R2-D local browser regression evidence.

## Lifecycle and drift notes

- `distribution/releases/designkit-starter-v1-r1.zip` remains the frozen R1 artifact and is validated independently.
- The unversioned `designkit-starter-v1.zip` is tracked as the current R2-preparation artifact; it is not used to rewrite or overwrite R1.
- Frozen R1 checklist text containing `selectedBusinessExports` is expected pre-projection drift. R2 source validation uses direct Runtime export/CSS/Browser evidence instead.
- A matrix `CONDITIONAL`, `UNVERIFIED` or `BLOCKED` result is not silently promoted by Registry `READY` status.
