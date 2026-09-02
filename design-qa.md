# Cloudflare-style Menu visual QA

## Final result

**passed**

No open P0, P1, or P2 defects remain in the scoped Menu sidebar and Docs demo.

## Evidence

- Source: authenticated Cloudflare dashboard sidebar at `1782 × 1354`, DPR 2.
- Implementation: local Menu Docs at `1782 × 1354`, DPR 2.
- Source screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/menu-cloudflare-grouped-qa/cloudflare-live-full.png`
- Implementation screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/menu-cloudflare-grouped-qa/starbucks-menu-final-light-full.png`
- Focused comparison: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/menu-cloudflare-grouped-qa/cloudflare-starbucks-menu-final-light-comparison.png`
- Verified states: expanded sidebar, grouped navigation, selected nested item, hover, nested collapse/expand, full sidebar collapse/expand, React, Vue, light, and dark Docs themes.

## Measured fidelity

- Expanded sidebar width: `260px`; collapsed width: `56px` versus the Cloudflare measured `57px`.
- Row geometry: `34px` height, `13px` medium text, `12px` horizontal padding, `6px` radius, and `1px` row gap.
- Icon-to-title gap: `12px` from the `16px` icon's right edge to the title's left edge, matching Cloudflare's live `gap-3` layout in every measured first-level row.
- First-level grid: row inset `14px`, icon axis `26px`, text axis `54px`, and right arrow axis aligned consistently.
- Nested grid: item inset `42px`, item width `203px`, text axis `54px`, and hierarchy line axis `33px`.
- Group title: `13px` medium text with `16px` top and `8px` bottom spacing.
- Selected and hover states: neutral full-row surfaces matching Cloudflare while preserving DesignKit semantic tokens.
- Brand treatment: the selected leaf and its active parent path use `--color-primary`; active parent icons and arrows inherit the same brand color while unselected rows remain neutral.
- Assets: real Arco icons are used; no custom SVG, raster placeholder, emoji, or CSS icon was introduced.

## Interaction verification

- Hover changes the full row to the secondary-container hover surface and increases arrow opacity from `0.4` to `1`.
- Nested menus animate height for `250ms` with `cubic-bezier(0.77, 0, 0.175, 1)`.
- The right arrow rotates between collapsed and expanded states in `200ms`.
- The built-in bottom collapse button changes the sidebar between `260px` and `56px`; group titles are hidden while collapsed.
- React keeps its `aria-expanded` contract; Vue keeps its existing Arco expansion behavior.
- Collapsed React menu items retain the existing Tooltip capability.
- React and Vue show equivalent content, grouping, dimensions, hierarchy lines, selected state, and collapse behavior.
- React and Vue both measure `12px` between icon and title for Account home, Domains, Investigate, Analytics, and Compute; all row and collapse-button radii measure `6px`.
- React and Vue both render the light-theme active path at `rgb(0, 117, 74)`; dark theme uses the higher-contrast `--color-primary-active` token.
- Fresh final browser loads contain no warnings or errors and no page-level horizontal overflow.

## Comparison history

1. Initial demo had no product-style groups and used generic Navigation/Menu labels.
2. The first implementation added groups and compact alignment but group nesting inherited an extra Arco indent.
3. Group-level indent placeholders were removed visually, aligning all first-level icon and text columns.
4. The first hierarchy line placement was clipped by Arco's `overflow: hidden` because the content container had been shifted.
5. The content container was restored to full width while only nested children move by `28px`, allowing the hierarchy line to render at the measured `33px` axis.
6. Final side-by-side inspection confirms equivalent grouping, row density, hierarchy, selection, arrow alignment, and nesting rhythm.
7. A follow-up browser measurement found Arco's inherited icon margins varied by framework and row type; scoped selectors now normalize the rendered icon-to-title gap to `12px` in both React and Vue.
8. Menu interaction-item and collapse-button radii were standardized to the existing `--border-radius-md` (`6px`) token.
9. Brand color was added to the active navigation path without changing neutral hover surfaces or non-selected content.

## Remaining P3 differences

- The Docs demo intentionally omits Cloudflare's account switcher and quick-search header because the scope is the Menu component rather than a complete application sidebar shell.
- Cloudflare's product-specific badges and longer navigation inventory are not copied; the demo uses concise representative content in both frameworks.
- Arco's supplied icons differ in glyph shape from Cloudflare's icon set but preserve the measured icon slot and alignment.

final result: passed

---

# Top navigation Demo right-gutter follow-up

## Final result

**passed**

The 1440px Docs layout now preserves the same trailing gutter as the leading gutter instead of letting the navigation surface meet the Demo edge.

## Evidence

- Reported 1440px screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-a271896c-3f4a-42e0-96f0-93624812e9df.png`
- Final viewport: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-top-nav-gutter-final.png`
- Focused source/final comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-top-nav-gutter-comparison.png`
- Verified in the local Menu Docs for React and Vue.

## Measured result

- The Demo now owns a dedicated scroll viewport with a `760px + 2 × gutter` minimum width, so overflow includes both edge gutters.
- Desktop leading and trailing gutters both resolve to the existing `--spacing-12` token (`40px`).
- At the measured Docs container width of `840px`, React and Vue both resolve to a `760px` navigation header with `40px` on each side.
- Narrow layouts retain the complete right gutter at the end of horizontal overflow instead of clipping it from the scrollable area.
- The mobile gutter continues to use the existing `--spacing-6` token.
- The system switcher still opens from the trigger's bottom-left edge and retains search, cascade selection, and popup behavior.
- No Menu package style, public API, new Token, broad Arco override, or `!important` rule was introduced.

final result: passed

---

# Inline Menu parent-child alignment follow-up

## Final result

**passed**

The expanded inline Menu has no open P0, P1, or P2 alignment defects in React or Vue.

## Evidence

- Reported-state screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-86c5a39f-75a9-4945-8fdc-d3c5536a5d74.png` (`1226 × 1112`).
- Final browser-rendered implementation: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-inline-alignment-final.jpg` (`1280 × 720`, desktop CSS viewport, DPR 1).
- Full-view comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-inline-alignment-comparison.png`.
- Focused parent/child comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-inline-alignment-focused-comparison.png`.
- State: expanded first submenu with normal, selected, and disabled child items.

## Measured result

- React parent title axis resolves to `427px` (`16px` icon right edge at `415px` plus the existing `12px` icon gap), exactly matching the child text axis at `427px`.
- Vue parent title and child text both resolve to `467px`, for a measured delta of `0px`.
- React's inline title wrapper now uses an `inline-flex` formatting context, so JSX whitespace after the icon no longer adds an extra visual gap.
- Vue keeps its native icon/title wrapper structure and remains visually equivalent.
- Existing `34px` row height, `14px` typography, `28px` child row inset, `12px` child padding, hierarchy line, selected surface, disabled state, and collapse behavior remain unchanged.
- The collapsed Menu still measures `56px`; collapsed rows remain `34 × 34px` and the inner container keeps `overflow-x: hidden`.
- No new Token, broad Docs override, public API change, or `!important` rule was introduced.

## Comparison history

1. The reported React state included a literal JSX space after the leading icon, placing the parent title several pixels to the right of its children.
2. The title wrapper was normalized to inline flex while retaining the existing icon and indentation Tokens.
3. Post-fix browser measurement confirms a `0px` parent/child text-axis delta in React and Vue; focused visual comparison shows the same result.

## Required fidelity surfaces

- Typography: unchanged `14px` Menu typography and existing weights.
- Spacing/layout: parent and child text axes now align; all other row and hierarchy geometry is unchanged.
- Colors/tokens: existing semantic Menu Tokens remain unchanged.
- Image/assets: existing Arco icons remain unchanged; no new visual asset was introduced.
- Copy/content: demo labels and disabled/selected content remain unchanged.

final result: passed

---

# Menu Badge, typography, and switcher stability follow-up

## Final result

**passed**

The scoped Menu follow-up has no open P0, P1, or P2 visual or interaction defects.

## Evidence

- Reported switcher-jump screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-243423be-bf11-426a-8dc2-52a3c1340ad5.png`
- Reported Badge-overlap screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-7fbf0892-3510-4447-9085-5aeb523698b0.png`
- Final top-navigation viewport: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-top-nav-badge-scroll-final.png`
- Final 14px Menu viewport: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-14px-final.png`
- Source and final screenshots were inspected together at the same desktop viewport.

## Measured result

- The notification Badge remains `16 × 16px` on a `32 × 32px` icon button.
- Badge offset is `[-6, 2]`: its right edge aligns with the button right edge (`0px` horizontal overflow), its top sits `4px` above the button, and it overlaps the notification glyph by `8px` horizontally at the glyph's top-right corner.
- Vertical Menu items, submenu headers, and group titles resolve to the shared `--fs-14` token (`14px`) in the browser for the React and Vue packages.
- Opening the system switcher from a visible trigger preserves the page position in React and Vue (`scrollY 350 → 350`, delta `0`).
- The popup still opens on click, the search field remains available, and focus remains on the trigger until the user enters the search field.
- React and Vue use equivalent Badge geometry, typography, and switcher interaction behavior.
- No broad Docs override or `!important` rule was introduced.

final result: passed

---

# Brand top navigation dark-mode and badge follow-up

## Final result

**passed**

The scoped brand navigation has no open P0, P1, or P2 visual defects for the dark-theme quick actions and notification badge.

## Evidence

- Reported badge-overlap screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-7fbf0892-3510-4447-9085-5aeb523698b0.png`
- Final dark-theme viewport: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-brand-dark-viewport.png`
- Final focused navigation crop: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-brand-dark-badge-final.jpg`
- Combined comparison input: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-brand-dark-badge-comparison.png`
- Verified in the local Menu Docs for the shared React and Vue implementation.

## Measured result

- Both quick actions render as `32 × 32px` icon buttons with `16px` icons.
- The numeric Badge continues to use the public `offset` API and is positioned at `[-6, 2]`; its right edge stays within the button boundary and it sits closer to the notification glyph's top-right corner.
- The local Badge remains `16 × 16px` for the compact header and uses the existing danger-color token.
- On the brand surface, the Badge outline uses the brand-color surface instead of the dark container token.
- Brand quick-action hover and active states remain white at full icon contrast with a `rgba(255, 255, 255, 0.12)` surface in both light and dark Docs themes.
- Browser measurements confirmed the dark-theme hover result and the scoped brand Badge outline; no `!important` rule was added.

final result: passed

---

# Top navigation system cascader follow-up

## Final result

**passed**

The scoped two-level system switcher has no open P0, P1, or P2 visual defects.

## Evidence

- Reported edge-spacing screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-84e22dfd-66ad-4890-b386-859f4bb1562b.png`
- Final implementation screenshot: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-spacing-final.png`
- Combined comparison input: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-spacing-comparison.png`
- Previous popup-position reference: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-f347001e-9021-4c30-b39d-ee21f129477f.png`
- Position/search comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-top-nav-search-comparison.png`
- Verified in the local Menu Docs for React and Vue.

## Measured result

- Both parent and child columns use the existing `--spacing-4` token (`8px`) for left and right insets, so parent rows do not meet the divider and child rows retain a right edge gap.
- React no longer passes an inline `dropdownMenuColumnStyle`; the scoped first/last column widths now own the geometry, allowing the child wrapper's `8px` right padding to remain visible.
- Parent and child options share a `--spacing-1` (`2px`) vertical gap; the last option removes the trailing gap.
- Parent options, child options, and direct-search results share `--border-radius-sm` (`4px`).
- The default panel body is `312px` high, derived from nine `32px` parent rows, eight `2px` inter-row gaps, and `8px` top/bottom padding; all fixed parent categories are visible without scrolling.
- The borderless search treatment remains scoped to this switcher, including hover and focus states.
- The popup remains fixed to the trigger's bottom-left edge at narrow desktop resolutions instead of flipping over the page title.
- React and Vue use equivalent geometry, tokens, data, selection, cascading, and search behavior.
- No broad Arco selector or `!important` rule was introduced.

## Latest height evidence

- Reported parent-list state: browser annotation on the Menu Docs top-navigation cascader.
- Final full-parent screenshot: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-full-parent-final.png`
- Combined height comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-full-parent-comparison.png`
- Reported child-edge screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-84e22dfd-66ad-4890-b386-859f4bb1562b.png`
- Final child-edge screenshot: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-child-right-padding-final.png`
- Combined child-edge comparison: `/Users/kning/Documents/starbucks-design-main/.codex-artifacts/menu-cascader-child-right-padding-comparison.png`

final result: passed

---

# Collapsed Menu alignment follow-up

## Final result

**passed**

The collapsed Menu follow-up has no open P0, P1, or P2 visual defects.

## Evidence

- Reported-state screenshot: `/var/folders/ln/v_7b091n6f5979qlvs36vlfw0000gp/T/codex-clipboard-2ce0fa9c-f50f-4e62-acc7-d0e11864c522.png`
- Final implementation screenshot: `/tmp/starbucks-menu-page-after-final.png`
- Combined comparison input: `/tmp/starbucks-menu-collapsed-comparison.png`
- Verified in the local Menu Docs for both React and Vue.

## Measured result

- Collapsed sidebar width remains `56px`.
- Every top-level item, submenu header, selected/hover surface, and collapse button is `34 × 34px` with the existing `6px` radius token.
- All row centers and icon centers share the same sidebar axis; the measured browser delta is `-0.5px`, caused by the sidebar's `1px` border.
- The collapsed inner container measures `clientWidth: 55px` and `scrollWidth: 55px`, so no horizontal scrollbar is produced.
- Horizontal overflow is hidden while vertical overflow remains available for long menus.
- React and Vue produce equivalent geometry, including grouped rows and submenu headers.
- Collapsed submenu popups remain visible outside the sidebar and preserve the existing interaction contract.

## Comparison history

1. The reported state inherited the expanded inner padding and submenu right padding after collapse.
2. Regular items rendered at `27px` wide while submenu headers rendered at `44px`; the inner content expanded to `72px` and generated a horizontal scrollbar.
3. Collapsed-only rules now remove horizontal padding, center a uniform `34px` row, hide collapsed labels and suffix arrows, and normalize icon margins for both framework DOM structures.
4. The Vue group-indent rule was narrowed to hide only indent placeholders, preserving the real icon wrapper.
5. Final side-by-side inspection confirms a clean bottom edge, one shared icon axis, and consistent selected/hover fill dimensions.

final result: passed
