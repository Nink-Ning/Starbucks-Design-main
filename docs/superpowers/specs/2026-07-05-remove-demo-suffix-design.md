# Remove trailing `<Demo />` from React demos

## Problem

The `LiveProviderComponent` in `Playground/Provider/index.tsx` has a `wrapDemo` function that auto-appends `<Demo />;` to code blocks defining `function Demo()`. This causes render failures. Additionally, several markdown files contain explicit trailing `<Demo* />` patterns that also need removal.

## Design

Two changes:

### 1. Remove `wrapDemo` from `Playground/Provider/index.tsx`

- Delete the `wrapDemo` function (lines 14-19)
- In `LiveProviderComponent`, use `code` directly instead of `wrapDemo(code)`

### 2. Clean up explicit `<Demo* />` endings in markdown

Seven files have explicit trailing `<Demo* />` wrappers that must be removed:

| File | Pattern | Action |
|------|---------|--------|
| `progress.md` | 5× `function Demo() { return <Demo />; };` | Delete these duplicate Demo wrappers |
| `checkbox.md` | `function Demo()` wrapping `<Demo1 /><Demo2 /><Demo3 />` | Delete the composition Demo; split into separate blocks |
| `timeline.md` | `function Demo()` wrapping `<Demo mode="alternate" /><Demo mode="right" />` | Delete the composition Demo; split into separate blocks |
| `image.md` | `function App()` wrapping `<DemoImage />` components | Delete the composition App; keep DemoImage definitions |
| `form.md` | `function Demo()` wrapping `<DemoButton />` | Delete the composition Demo |
| `select.md` | `function Demo()` wrapping `<DemoSelect />` | Delete the composition Demo |
| `dropdown.md` | `function Demo()` wrapping `<DemoWithPopupVisible /><DemoWithOnClickMenuItem />` | Delete the composition Demo; split into separate blocks |

## Scope

- React docs only (`packages/docs/react/`)
- No changes to Vue docs
- No changes to the `react-live` integration beyond removing `wrapDemo`
