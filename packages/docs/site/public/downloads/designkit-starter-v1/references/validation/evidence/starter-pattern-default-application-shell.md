# Evidence Record: `starter.pattern.default-application-shell`

Capability boundary reads [Capability Registry](../../capability-registry.md); the fixed composition and binding rules read [Application Shell Contract](../../application-shell.md). This record covers the approved restricted composition only. It does not create a Starter Shell Golden or authorize Custom Navigation Shell engineering.

| Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Shell Mode Decision | Static Check | [Application Shell Contract](../../application-shell.md)、[new-demo prompt](../../../prompts/new-demo.md) | `PASS` | `2026-08-28` | `Validation` | Default is `default`; explicit existing framework maps to `content-only`; explicit standalone maps to `none`; no fourth mode. |
| Shell Implementation Provenance | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | Package-only generated Default Shell rendered package-local Runtime `StarbucksReact.Menu`, `Cascader`, `TableToolbar`, `Table`, `Pagination`, Starbucks logo asset and `window.arcoicon`; runtime/icon errors were empty. |
| System / Side Sync | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | 1280px expanded state measured 260px for both Top-left identity and Side; collapse measured 56px for both with logo-only identity, and expansion restored 260px with Product Center retained. |
| Theme Fidelity | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | Light/Dark toggle exposed Moon/Sun target-mode labels, switched the whole page, and persisted `designkit-starter-theme` across reload. |
| Responsive Shell | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | 1280/768/390 Light and Dark checks passed; Main remained 24px / 24px, required action order remained Notification → Theme → Divider → User, and document-level overflow was false. |
| Shell / Template Ownership | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | Default Shell retained the continuous Toolbar → Table → Pagination data region with 4px / 16px / 16px inset; content-only retained Basic List without Top/Side, and none retained Card List without navigation. |
| Accessibility | Browser Validation | [Package-only browser record](#package-only-browser-record--2026-08-28) | `PASS` | `2026-08-28` | `Validation` | Semantic regions, icon-only accessible names, context-help tooltip, active icon, visible row actions, confirmation dialog and non-color status text were observed; no relevant runtime or icon errors occurred. |
| Visual Fidelity | Manual Review | `DEFAULT_APPLICATION_SHELL_VISUAL_REVIEW = PASS` plus final package browser screenshots | `PASS` | `2026-08-28` | `Human Review` | Human-approved shell visual baseline is locked; this does not create a Shell Golden or authorize redesign. |

The final package-only smoke record updates the former `UNVERIFIED` rows with actual viewport, theme, Runtime, scenario and interaction results before the release artifact is accepted.

## Package-only Browser Record — 2026-08-28

Environment: only the newly generated R2 ZIP was unpacked into a fresh temporary directory; generated output was created from that package with no repository source, Docs source, test fixture or chat context. Browser URL was served from the extracted package directory. Runtime manifest reported `sourceCommit=e7d8a3d3704a377b057558722a9379af6bfa28b9` and `workspaceDirty=false`.

### Default Shell matrix

| Viewport | Theme | Top-left / Side | Main padding | Data inset | Side icons | Active icon | Empty icon slots | Document overflow | Runtime/icon errors |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| 1280 | Light | 260 / 260px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |
| 1280 | Dark | 260 / 260px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |
| 768 | Light | 56 / 56px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |
| 768 | Dark | 56 / 56px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |
| 390 | Light | 56 / 56px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |
| 390 | Dark | 56 / 56px | 24 / 24px | 4 / 16 / 16px | 6 visible | visible | 0 | false | none |

The 56px rail logo is centered in the border-box content area; the measured `-0.5px` delta against the outer border-box midpoint is the expected half-pixel effect of the 1px rail divider, not an additional layout offset.

### Scenario and interaction results

| Scenario | Result | Evidence |
| --- | --- | --- |
| A — `default` Product Manager Starter / Basic List | `PASS` | Brand Top, real System Switch, Side Menu, Notification, Theme, User, Context Help, Runtime TableToolbar, Quick Filter, row actions and Pagination rendered. |
| A — Header / toolbar / row actions | `PASS` | `商品列表` plus context help rendered without persistent subtitle; Quick Filter stayed inside the Toolbar Filter Region; Refresh produced local feedback; More → `停用商品` opened neutral confirmation. |
| A — Icon Binding | `PASS` | Generic icons used `window.arcoicon`; fixed Notification/Moon/Sun/More/Delete bindings resolved; expanded, collapsed and active Side icons were visible; empty icon slots and icon errors were zero. |
| B — `content-only` | `PASS` | Basic List rendered with Title, Toolbar, Table and Pagination; Top and Side regions were absent and 390px document overflow was false. |
| C — `none` | `PASS` | Card List rendered without Top or Side navigation and without navigation capability leakage. |
