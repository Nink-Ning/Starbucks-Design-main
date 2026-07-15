#!/usr/bin/env python3
"""
Generate figma-overrides.less and component override files from Figma design tokens.

Reads Figma export JSON files and the component token mapping to produce:
1. figma-overrides.less — global Less variable overrides
2. Per-component .less files — token documentation + CSS overrides

Usage: python3 scripts/generate-overrides.py
"""

import json
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── Load Figma export data ──

def load_json(path):
    with open(path) as f:
        return json.load(f)

spacing_data = load_json(os.path.expanduser("~/Downloads/figma/值.tokens 3.json"))
typography_data = load_json(os.path.expanduser("~/Downloads/figma/值.tokens 2.json"))
radius_data = load_json(os.path.expanduser("~/Downloads/figma/Mode 1.tokens 3.tokens.json"))

# ── Extract values ──

sizes = {k: v["$value"] for k, v in spacing_data["size"].items()}
font_sizes = {k: v["$value"] for k, v in typography_data["font-size"].items()}
line_heights = {k: v["$value"] for k, v in typography_data["line-height"].items()}
font_weights = {k: v["$value"] for k, v in typography_data["font-weight"].items()}
fonts = {k: v["$value"] for k, v in typography_data["font"].items()}
radiuses = {k: v["$value"] for k, v in radius_data.items() if "$value" in v}

# ── Component size mapping (Figma → Arco) ──
# Arco uses: mini, small, default, large
# Figma comp-sizes map to these
comp_sizes = {
    "mini": sizes["8"],     # xs = 24px
    "small": sizes["9"],    # s = 28px
    "default": sizes["10"], # m = 32px
    "large": sizes["11"],   # l = 36px
}

# ── Generate figma-overrides.less ──

def generate_global_overrides():
    lines = [
        "// figma-overrides.less",
        "// Auto-generated from Figma Design System V2.0",
        f"// Generated: 2026-07-04",
        "// DO NOT EDIT MANUALLY — edit scripts/generate-overrides.py instead.",
        "",
        "// ═══════════════════════════════════════════",
        "// SPACING SCALE (Figma size.1 ~ size.16)",
        "// ═══════════════════════════════════════════",
    ]

    # Arco spacing variables
    for i in range(1, 14):
        key = str(i)
        if key in sizes:
            lines.append(f"@spacing-{i}: {sizes[key]}px;  // Figma size.{key}")

    lines += [
        "",
        "// ═══════════════════════════════════════════",
        "// COMPONENT SIZES (Figma comp-size → Arco)",
        "// ═══════════════════════════════════════════",
        f"@size-mini: {comp_sizes['mini']}px;    // Figma xs = size.8",
        f"@size-small: {comp_sizes['small']}px;   // Figma s  = size.9",
        f"@size-default: {comp_sizes['default']}px;  // Figma m  = size.10",
        f"@size-large: {comp_sizes['large']}px;   // Figma l  = size.11",
        "",
        "// ═══════════════════════════════════════════",
        "// FONT SIZES (Figma font-size → Arco)",
        "// ═══════════════════════════════════════════",
        f"@font-size-body-1: {font_sizes['body-small']}px;   // Figma body-small",
        f"@font-size-body-2: 13px;                  // (interpolated, no Figma equiv)",
        f"@font-size-body-3: {font_sizes['body-medium']}px;  // Figma body-medium",
        f"@font-size-title-1: {font_sizes['body-large']}px;  // Figma body-large",
        f"@font-size-title-2: {font_sizes['title-extralarge']}px;  // Figma title-extralarge",
        f"@font-size-title-3: {font_sizes['headline-medium']}px; // Figma headline-medium",
        "",
        "// ═══════════════════════════════════════════",
        "// LINE HEIGHTS (Figma line-height → Arco)",
        "// ═══════════════════════════════════════════",
        f"@line-height-body-1: {line_heights['body-small']}px;   // Figma body-small",
        f"@line-height-body-2: {line_heights['body-medium']}px;  // Figma body-medium (22px)",
        f"@line-height-body-3: {line_heights['body-medium']}px;  // Figma body-medium (22px)",
        f"@line-height-title-1: {line_heights['body-large']}px;  // Figma body-large",
        f"@line-height-title-2: {line_heights['title-extralarge']}px;  // Figma title-extralarge",
        f"@line-height-title-3: {line_heights['headline-medium']}px; // Figma headline-medium",
        "",
        "// ═══════════════════════════════════════════",
        "// FONT FAMILY (Figma font → Arco)",
        "// ═══════════════════════════════════════════",
        f'@font-family: "{fonts["chinese"]}", "{fonts["english"]}", {fonts["numbers"]}, sans-serif;',
        "",
        "// ═══════════════════════════════════════════",
        "// FONT WEIGHTS (Figma font-weight → Arco)",
        "// ═══════════════════════════════════════════",
        "@font-weight-400: 400;  // Figma regular",
        "@font-weight-500: 500;  // Figma medium",
        "@font-weight-600: 600;  // Figma semibold",
        "@font-weight-700: 700;  // Figma bold",
        "",
        "// ═══════════════════════════════════════════",
        "// BORDER RADIUS (Figma radius → Arco)",
        "// ═══════════════════════════════════════════",
        "@border-radius-none: 0;",
        f"@border-radius-small: {radiuses.get('radius-small', 2)}px;   // Figma radius-small",
        f"@border-radius-medium: {radiuses.get('radius-default', 4)}px;  // Figma radius-default",
        f"@border-radius-large: {radiuses.get('radius-large', 8)}px;   // Figma radius-large",
        "@border-radius-circle: 999px;                // Figma radius-round",
        "",
        "// ═══════════════════════════════════════════",
        "// TRANSITION",
        "// ═══════════════════════════════════════════",
        "@transition-duration-1: 0.15s;",
        "@transition-duration-2: 0.2s;",
        "@transition-duration-3: 0.3s;",
        "@transition-duration-4: 0.4s;",
    ]
    return "\n".join(lines) + "\n"


# ── Component token mapping (from figma-component-tokens.md) ──

COMPONENT_TOKENS = {
    "Button": {
        "colors": ["brand-color", "brand-color-hover", "brand-color-active", "brand-color-disabled",
                    "error-color", "error-color-hover", "error-color-active", "error-color-disabled",
                    "success-color", "success-color-hover", "success-color-active", "success-color-disabled",
                    "warning-color", "warning-color-hover", "warning-color-active", "warning-color-disabled"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-secondarycontainer",
               "bg-color-component", "bg-color-component-disabled"],
        "text": ["text-color-primary", "text-color-disabled", "text-color-brand", "text-color-link"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large", "font-size/mark-medium",
                 "line-height/body-small", "line-height/body-medium", "line-height/body-large", "line-height/mark-medium",
                 "font-weight/regular", "font-weight/medium", "font/chinese"],
        "radius": ["radius-default"],
        "misc": ["gray-color-6", "gray-color-10", "gray-color-12",
                 "mode/dark/font-white-1", "mode/dark/font-white-4", "mode/light/font-gray-4",
                 "Text&Icon/Font Wh1 90%-anti", "Text&Icon/Font Wh4 22%"],
    },
    "ButtonGroup": {
        "colors": [],
        "bg": [],
        "text": [],
        "font": [],
        "radius": ["radius-default"],
        "misc": [],
    },
    "Link": {
        "colors": ["brand-color", "brand-color-hover", "brand-color-active", "brand-color-disabled",
                    "error-color", "error-color-hover", "error-color-active",
                    "success-color", "success-color-hover", "success-color-active", "success-color-disabled",
                    "warning-color"],
        "text": ["text-color-primary", "text-color-disabled"],
        "font": ["font-size/body-large", "font-size/body-medium", "font-size/body-small"],
        "misc": [],
    },
    "Tabs": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-secondarycontainer", "bg-color-specialcomponent"],
        "text": ["text-color-secondary", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "misc": [],
    },
    "Steps": {
        "colors": ["brand-color"],
        "bg": ["bg-color-secondarycomponent", "bg-color-secondarycomponent-hover"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-placeholder"],
        "font": ["font-size/body-large", "font-size/body-medium", "font-size/title-medium",
                 "font-weight/regular", "font-weight/semibold", "font/chinese", "font/numbers",
                 "line-height/body-large", "line-height/body-medium", "line-height/title-medium"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Breadcrumb": {
        "colors": ["brand-color"],
        "text": ["text-color-primary", "text-color-placeholder"],
        "font": ["font-size/body-medium", "font-size/title-small", "font-weight/regular", "font-weight/semibold", "font/chinese"],
        "spacing": ["size/2"],
        "misc": [],
    },
    "Pagination": {
        "colors": ["brand-color", "brand-color-light-hover"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component", "bg-color-component-disabled"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-size/body-small"],
        "radius": ["radius-default"],
        "spacing": ["size/6", "size/8", "size/10"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Anchor": {
        "misc": [],
    },
    "Dropdown": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container"],
        "text": ["text-color-primary"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default"],
        "misc": ["Gray/White"],
    },
    "Radio": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component-disabled", "bg-color-component-active"],
        "misc": [],
    },
    "Checkbox": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component-disabled", "bg-color-component-active"],
        "text": ["text-color-primary", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Switch": {
        "colors": ["brand-color", "brand-color-disabled", "mode/light/brand-color-6"],
        "bg": ["bg-color-secondarycomponent", "bg-color-secondarycontainer", "bg-color-component-disabled"],
        "font": ["font-size/body-small", "font-weight/regular", "font/chinese", "line-height/body-small"],
        "misc": ["Shadow/Shadow-1"],
    },
    "Input": {
        "colors": ["brand-color", "brand-color-focus"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component-disabled"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled", "text-color-secondary"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large",
                 "line-height/body-small", "line-height/body-medium", "line-height/body-large",
                 "font-weight/regular", "font/chinese"],
        "radius": ["radius-default"],
        "misc": ["Focus Shadow/Default"],
    },
    "InputNumber": {
        "colors": ["brand-color", "brand-color-focus"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component",
               "bg-color-component-disabled", "bg-color-secondarycontainer"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled", "text-color-secondary"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large"],
        "radius": ["radius-default"],
        "misc": ["Focus Shadow/Default", "mode/light/gray-color-2", "mode/light/font-gray-4"],
    },
    "Select": {
        "colors": ["brand-color", "brand-color-focus", "brand-color-light"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component",
               "bg-color-secondarycontainer", "bg-color-page"],
        "text": ["text-color-primary", "text-color-disabled"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large"],
        "radius": ["radius-default"],
        "misc": ["Focus Shadow/Default", "Shadow/Shadow-2"],
    },
    "Cascader": {
        "colors": ["brand-color", "brand-color-light"],
        "bg": ["bg-color-container", "bg-color-secondarycontainer", "bg-color-component"],
        "text": ["text-color-primary", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "misc": [],
    },
    "DatePicker": {
        "colors": ["brand-color", "brand-color-focus"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component-disabled"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large"],
        "radius": ["radius-default"],
        "spacing": ["size/4"],
        "misc": ["Focus Shadow/Default"],
    },
    "TimePicker": {
        "colors": ["brand-color", "brand-color-focus"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-page"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-size/body-large", "font-size/body-small", "font/numbers"],
        "radius": ["radius-default"],
        "spacing": ["size/4"],
        "misc": ["Focus Shadow/Default"],
    },
    "InputSearch": {
        "colors": ["brand-color", "brand-color-focus"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component",
               "bg-color-secondarycontainer", "bg-color-page"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled"],
        "font": ["font-size/body-medium"],
        "radius": ["radius-default", "radius-medium"],
        "misc": ["Focus Shadow/Default", "Shadow/Shadow-1"],
    },
    "Upload": {
        "colors": ["brand-color", "brand-color-active", "brand-color-disabled", "mode/light/brand-color-6",
                    "error-color", "success-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent", "bg-color-component",
               "bg-color-component-disabled", "bg-color-secondarycontainer", "bg-color-page"],
        "text": ["text-color-primary", "text-color-placeholder", "text-color-disabled", "text-color-secondary"],
        "font": ["font-size/body-medium", "font-size/body-small"],
        "radius": ["radius-default"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Badge": {
        "colors": ["brand-color", "error-color"],
        "font": ["font-size/body-small", "font-weight/regular", "font/numbers", "line-height/body-small"],
        "radius": ["radius-default", "radius-round"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "List": {
        "colors": ["brand-color", "brand-color-light", "error-color"],
        "bg": ["bg-color-container", "bg-color-component", "bg-color-specialcomponent"],
        "text": ["text-color-primary"],
        "font": ["font-size/body-medium", "font-size/title-medium", "font-weight/regular", "font-weight/semibold", "font/chinese"],
        "misc": [],
    },
    "Collapse": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-component", "bg-color-secondarycomponent"],
        "text": ["text-color-primary"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default"],
        "misc": ["Gray/White", "Gray/Gray3-分割线", "Gray/Gray4-边框"],
    },
    "Tree": {
        "colors": ["brand-color"],
        "text": ["text-color-primary", "text-color-secondary"],
        "font": ["font-size/body-medium", "font-size/body-large",
                 "font-weight/regular", "font/chinese", "font/numbers",
                 "line-height/body-medium", "line-height/body-large"],
        "bg": ["bg-color-secondarycomponent"],
        "misc": ["Gray/Gray4-边框"],
    },
    "Timeline": {
        "colors": ["brand-color"],
        "text": ["text-color-primary", "text-color-secondary"],
        "font": ["font-size/body-medium", "font-size/body-large",
                 "font-weight/regular", "font/chinese", "font/numbers",
                 "line-height/body-medium", "line-height/body-large"],
        "bg": ["bg-color-secondarycomponent"],
        "misc": ["Gray/Gray4-边框"],
    },
    "Tooltip": {
        "colors": ["brand-color", "error-color", "error-color-light", "warning-color", "warning-color-light",
                    "success-color", "success-color-light"],
        "bg": ["bg-color-container"],
        "text": ["text-color-primary"],
        "font": ["font-size/body-medium", "font-size/body-small"],
        "radius": ["radius-default", "radius-medium"],
        "misc": ["Shadow/Shadow-2"],
    },
    "Tag": {
        "misc": [],
    },
    "Empty": {
        "colors": ["brand-color"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-placeholder"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default"],
        "spacing": ["size/8"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Progress": {
        "colors": ["brand-color", "success-color", "warning-color", "error-color"],
        "bg": ["bg-color-component", "bg-color-secondarycomponent"],
        "text": ["text-color-primary"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/title-extralarge",
                 "font-size/headline-large", "font-size/mark-small",
                 "font-weight/regular", "font-weight/medium", "font-weight/semibold", "font/numbers",
                 "line-height/body-small", "line-height/body-medium", "line-height/title-extralarge",
                 "line-height/headline-large", "line-height/mark-small"],
        "misc": ["Gray/Gray3-分割线", "mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Spin": {
        "colors": ["brand-color", "mode/light/brand-color-6"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/body-large",
                 "font-weight/regular", "font/chinese",
                 "line-height/body-small", "line-height/body-medium", "line-height/body-large"],
        "misc": [],
    },
    "Table": {
        "misc": [],
    },
    "Descriptions": {
        "misc": [],
    },
    "Message": {
        "colors": ["brand-color", "success-color", "warning-color", "error-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-placeholder"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/title-medium", "font-size/title-small",
                 "font-weight/regular", "font-weight/semibold", "font/chinese",
                 "line-height/body-small", "line-height/body-medium", "line-height/title-medium", "line-height/title-small"],
        "radius": ["radius-default", "radius-medium"],
        "misc": ["Shadow/Shadow-2", "Shadow/Shadow-3", "Gray/White", "Gray/Gray4-边框",
                 "mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Notification": {
        "colors": ["brand-color", "success-color", "warning-color", "error-color"],
        "bg": ["bg-color-container", "bg-color-component", "bg-color-secondarycomponent"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-placeholder", "text-color-disabled"],
        "font": ["font-size/body-small", "font-size/body-medium", "font-size/title-small",
                 "font-weight/regular", "font-weight/semibold", "font/chinese",
                 "line-height/body-small", "line-height/body-medium", "line-height/title-small"],
        "radius": ["radius-default", "radius-medium"],
        "spacing": ["size/6"],
        "misc": ["Gray/White", "Gray/Gray4-边框", "mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti",
                 "Shadow/Shadow-2", "mode/light/warning-color-4"],
    },
    "Alert": {
        "colors": ["brand-color", "success-color", "warning-color", "error-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent"],
        "text": ["text-color-primary", "text-color-secondary"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default", "radius-medium"],
        "misc": [],
    },
    "Popconfirm": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-secondarycomponent"],
        "text": ["text-color-primary", "text-color-secondary", "text-color-placeholder", "text-color-disabled"],
        "font": ["font-size/body-medium", "font-weight/regular", "font/chinese", "line-height/body-medium"],
        "radius": ["radius-default"],
        "spacing": ["size/6"],
        "misc": ["Gray/White", "Gray/Gray4-边框", "mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti"],
    },
    "Modal": {
        "colors": ["brand-color", "error-color", "warning-color", "success-color"],
        "bg": ["bg-color-container", "bg-color-component"],
        "text": ["text-color-primary", "text-color-secondary"],
        "font": ["font-size/body-large", "font-size/body-medium", "font-size/title-medium",
                 "font-weight/semibold", "font/chinese"],
        "radius": ["radius-default", "radius-large"],
        "spacing": ["size/8"],
        "misc": ["mode/light/font-white-1"],
    },
    "Drawer": {
        "colors": ["brand-color"],
        "bg": ["bg-color-container", "bg-color-component"],
        "text": ["text-color-primary", "text-color-secondary"],
        "font": ["font-size/title-medium", "font-weight/semibold", "font/chinese", "line-height/title-medium"],
        "radius": ["radius-default"],
        "misc": ["mode/dark/font-white-1", "Text&Icon/Font Wh1 90%-anti", "mode/light/font-gray-3"],
    },
    "FilterBar": {"misc": []},
    "ToolBar": {"misc": []},
    "AdvancedFilter": {"misc": []},
    "TagGroup": {"misc": []},
    "SelectCard": {"misc": []},
}


def generate_component_override(name, tokens):
    """Generate a single component override .less file."""
    lines = [
        f"// {name}.less",
        f"// Auto-generated from Figma Design System V2.0",
        f"// Generated: 2026-07-04",
        "// DO NOT EDIT MANUALLY — edit scripts/generate-overrides.py instead.",
        "",
        f"// ═══════════════════════════════════════════",
        f"// {name} — Figma Design Tokens",
        f"// ═══════════════════════════════════════════",
        "//",
        "// All design tokens are GLOBAL — this component references",
        "// them through CSS custom properties defined in theme.css.",
        "// This file documents which tokens apply and adds any",
        "// component-specific overrides (focus shadows, effects, etc.).",
        "//",
    ]

    if tokens.get("colors"):
        lines.append("// Color tokens:")
        for t in tokens["colors"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("bg"):
        lines.append("// Background tokens:")
        for t in tokens["bg"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("text"):
        lines.append("// Text tokens:")
        for t in tokens["text"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("font"):
        lines.append("// Typography tokens:")
        for t in tokens["font"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("radius"):
        lines.append("// Border radius:")
        for t in tokens["radius"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("spacing"):
        lines.append("// Spacing tokens:")
        for t in tokens["spacing"]:
            lines.append(f"//   • {t}")
        lines.append("")

    if tokens.get("misc"):
        lines.append("// Other tokens:")
        for t in tokens["misc"]:
            lines.append(f"//   • {t}")
        lines.append("")

    # Add component-specific CSS overrides where applicable
    lines.append("// Component-specific style overrides:")
    lines.append("// (extend with CSS custom property overrides as needed)")

    return "\n".join(lines) + "\n"


def generate_index_less(components):
    """Generate _index.less that imports all component overrides."""
    lines = [
        "// _index.less — Aggregated component overrides",
        "// Auto-generated from Figma Design System V2.0 via scripts/generate-overrides.py",
        "// DO NOT EDIT MANUALLY.",
        "",
    ]
    for name in sorted(components.keys()):
        lines.append(f"@import './{name}.less';")
    return "\n".join(lines) + "\n"


# ── Main ──

def main():
    # 1. Write global overrides
    overrides = generate_global_overrides()
    for pkg in ["starbucks-design-vue", "starbucks-design-react"]:
        path = os.path.join(PROJECT_ROOT, "packages", pkg, "src", "figma-overrides.less")
        with open(path, "w") as f:
            f.write(overrides)
        print(f"Wrote {path}")

    # 2. Write component overrides
    for pkg in ["starbucks-design-vue", "starbucks-design-react"]:
        overrides_dir = os.path.join(PROJECT_ROOT, "packages", pkg, "src", "overrides")
        for name, tokens in COMPONENT_TOKENS.items():
            path = os.path.join(overrides_dir, f"{name}.less")
            content = generate_component_override(name, tokens)
            with open(path, "w") as f:
                f.write(content)
        print(f"Wrote {len(COMPONENT_TOKENS)} component overrides to {overrides_dir}")

        # Write _index.less
        index_path = os.path.join(overrides_dir, "_index.less")
        with open(index_path, "w") as f:
            f.write(generate_index_less(COMPONENT_TOKENS))
        print(f"Wrote {index_path}")

    print("\nDone! Generated all override files.")


if __name__ == "__main__":
    main()
