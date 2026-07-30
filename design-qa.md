# Docs style fixes — visual QA

- Source visual truth:
  - `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-24463178-47ea-42f9-ba84-15c38f47e4af.png` (2028 × 812)
  - `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-2f44a188-ccca-4b46-86ae-979dc7094a2d.png` (1797 × 1010)
  - `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-e255aadc-4464-4ca4-ac33-3a1b8975675d.png` (1946 × 652)
  - `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-d56bcdcb-4cca-4d4c-b7d9-b83e4d39ff7a.png` (1942 × 532)
  - `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-bca476f6-e046-44f2-9073-f9523b7d935d.png` (1754 × 300)
  - `/tmp/starbucks-docs-token-motion-light.jpg` (1280 × 720, pre-animation baseline)
- Implementation screenshots:
  - `/tmp/starbucks-docs-global-style-scoped-light.jpg` (1280 × 720)
  - `/tmp/starbucks-docs-global-style-scoped-dark.jpg` (1280 × 720)
  - `/tmp/starbucks-docs-global-style-no-first-heading-gap.jpg` (1280 × 720)
  - `/tmp/starbucks-docs-token-motion-light.jpg` (1280 × 720)
  - `/tmp/starbucks-docs-token-motion-dark.jpg` (1280 × 720)
  - `/tmp/starbucks-docs-changelog-light.png` (1280 × 720)
- Comparison images:
  - `/tmp/starbucks-docs-global-style-qa-pair.jpg`
  - `/tmp/starbucks-docs-table-qa-pair.jpg`
  - `/tmp/starbucks-docs-changelog-qa-pair.jpg`
  - `/tmp/starbucks-docs-divider-qa-pair.jpg`
  - `/tmp/starbucks-docs-global-style-padding-qa-pair.jpg`
  - `/tmp/starbucks-docs-token-motion-qa-pair.jpg`
- CSS viewport: 1280 × 720; device density: 1×.
- State: global-style light/dark and changelog light.

## Full-view comparison evidence

- Global Style now has one page H1, one supporting description, and one aligned component-library button group.
- The preview toolbar does not add an extra divider below the shared page header.
- The right-hand outline contains Overview, every token group from Primary through Spacing, and Update Token.
- Changelog now has one page H1 and its timeline begins below the shared page-header divider.
- Light and dark captures retain readable hierarchy and token-driven borders/backgrounds.

## Focused-region comparison evidence

- Token table: computed table border is `0px`; the shared wrapper supplies the sole `1px` outer border.
- Color swatch: computed border is `0px`; the sample color remains visible.
- Page titles: each affected page contains exactly one `main h1`.
- Token mode control: selecting Dark changes only the local Token preview scope, including its table surfaces and color swatches; the Docs shell and page H1 remain unchanged.
- Token mode motion: a TDesign-style 1-second polygon wipe renders through a cloned local preview layer, so it does not depend on the browser View Transition API. Dark expands diagonally from the top-right toward the bottom-left; Light restores from the bottom-left toward the top-right. `prefers-reduced-motion: reduce` bypasses the animation.
- First token heading: computed toolbar bottom margin and padding are `0px`; the adjacent “主色” heading margin is `0px` and the measured gap is `0px`. Later token headings retain the standard `52.5px` section margin.

## Required fidelity surfaces

- Fonts and typography: passed; existing Docs font stack, weights, line heights, and heading hierarchy are preserved.
- Spacing and layout rhythm: passed; shared page header, divider, token section spacing, table radius, and timeline alignment are consistent.
- Colors and visual tokens: passed in light and dark modes; no hardcoded replacement palette introduced.
- Image quality and asset fidelity: not applicable; these pages contain no raster content requiring replacement.
- Copy and content: passed; duplicate titles were removed without changing the supporting descriptions or changelog content.

## Comparison history

1. Earlier P1/P2 defects: duplicate H1s on Global Style and Changelog; custom/misaligned theme buttons; double table outline; missing token-group outline entries; outlined color swatches.
2. Fixes: removed body-authored H1s, replaced the theme control with the component-library `Button.Group`, scoped preview-mode changes to the Token content region, moved token headings into MDX so Starlight generates native outline entries, isolated the token table from the global table layer, and removed swatch borders.
3. A later P2 spacing defect showed an extra `52.5px` top margin before the first token heading.
4. Fix: removed the toolbar’s bottom spacing and scoped `margin-top: 0` to only the first `h2` following the Token preview island.
5. Post-fix evidence: browser captures and computed styles confirm one H1 per page, complete outline links, one table outline, borderless swatches, local-only light/dark token switching, and a zero-pixel gap before “主色” while later sections keep their normal spacing.
6. Motion enhancement: replaced the unavailable View Transition path with a TDesign-style cloned preview layer and 1-second diagonal polygon wipe in opposite directions for Dark and Light.
7. Post-motion evidence: browser captures show both mid-animation diagonal boundaries and the completed light/dark states. Inspection confirms the temporary layer is removed after each transition, the root remains `data-theme="light"`, and `body` receives no dark-theme attribute.

## Findings

No actionable P0, P1, or P2 differences remain.

## Follow-up polish

No P3 follow-up is required for the requested scope.

final result: passed
