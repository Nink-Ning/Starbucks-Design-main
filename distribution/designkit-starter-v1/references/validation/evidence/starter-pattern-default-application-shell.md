# Evidence Record: `starter.pattern.default-application-shell`

Capability boundary reads [Capability Registry](../../capability-registry.md); the fixed composition and binding rules read [Application Shell Contract](../../application-shell.md). This record covers the approved restricted composition only. It does not create a Starter Shell Golden or authorize Custom Navigation Shell engineering.

| Validation Type | Method | Evidence Location | Result | Last Verified | Owner | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Shell Mode Decision | Static Check | [Application Shell Contract](../../application-shell.md)、[new-demo prompt](../../../prompts/new-demo.md) | `PASS` | `2026-08-28` | `Validation` | Default is `default`; explicit existing framework maps to `content-only`; explicit standalone maps to `none`; no fourth mode. |
| Shell Implementation Provenance | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm package-local Runtime `StarbucksReact.Menu`, `Cascader`, `TableToolbar`, `Table`, `Pagination`, and `window.arcoicon` bindings without repo source or test fixture context. |
| System / Side Sync | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm 260px expanded, 56px collapsed, shared collapse state, retained system selection and restored system name after expansion. |
| Theme Fidelity | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm Light/Dark toggle, target-mode IconMoon/IconSun labels, whole-page DOM attributes and `designkit-starter-theme` persistence. |
| Responsive Shell | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm 1280/768/390, fixed 24px Main inline spacing, required global actions and no document-level overflow. |
| Shell / Template Ownership | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm Basic List remains a continuous TableToolbar → Table → Pagination region with 4px / 16px / 16px template-owned inset and internal table scrolling only. |
| Accessibility | Browser Validation | Final R2 package-only clean-room smoke | `UNVERIFIED` | `null` | `Validation` | Must confirm semantic regions, icon-only names, keyboard reachability, visible focus and non-color state communication. |
| Visual Fidelity | Manual Review | `DEFAULT_APPLICATION_SHELL_VISUAL_REVIEW = PASS` plus final package browser screenshots | `PASS` | `2026-08-28` | `Human Review` | Human-approved shell visual baseline is locked; this does not create a Shell Golden or authorize redesign. |

The final package-only smoke record must update the `UNVERIFIED` rows with actual viewport, theme, Runtime, scenario and interaction results before the release artifact is accepted.
