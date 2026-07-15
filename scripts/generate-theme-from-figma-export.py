#!/usr/bin/env python3
"""Generate the shared React/Vue theme from a Figma Variables export.

The preferred input is the directory exported by Figma Variables:
basic.zip, color.zip, font.zip, radius.zip and size.zip.

Usage:
  pnpm generate:tokens -- /path/to/Figma-Variables
"""

import json
import os
import shutil
import sys
import zipfile

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

args = [arg for arg in sys.argv[1:] if arg != '--']
if not args:
    raise SystemExit(
        'Missing Figma Variables directory.\n'
        'Usage: pnpm generate:tokens -- /path/to/Figma-Variables'
    )

SOURCE_DIR = os.path.abspath(args[0])


def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def load_zip_documents(archive_name):
    """Read every JSON document in an export archive.

    We intentionally do not depend on the inner filename because some Figma
    exports encode Chinese filenames differently across operating systems.
    """
    archive_path = os.path.join(SOURCE_DIR, archive_name)
    if not os.path.isfile(archive_path):
        raise FileNotFoundError(f'Missing Figma export: {archive_path}')

    with zipfile.ZipFile(archive_path) as archive:
        documents = []
        for member in archive.infolist():
            if member.is_dir() or not member.filename.endswith('.json'):
                continue
            with archive.open(member) as raw:
                documents.append((member.filename, json.load(raw)))
        if not documents:
            raise ValueError(f'No JSON token document found in {archive_path}')
        return documents


def load_single_zip(archive_name):
    documents = load_zip_documents(archive_name)
    if len(documents) != 1:
        raise ValueError(f'Expected one token document in {archive_name}')
    return documents[0][1]


# ── Load and normalize the current Figma Variables ZIP export ──
main_tokens = load_single_zip('color.zip')
font_tokens = load_single_zip('font.zip')
size_tokens = load_single_zip('size.zip')
radius_tokens = load_single_zip('radius.zip')

basic_documents = load_zip_documents('basic.zip')
basic_by_mode = {
    os.path.basename(name).split('.', 1)[0].lower(): data
    for name, data in basic_documents
}
try:
    basic_light = basic_by_mode['light']
    basic_dark = basic_by_mode['dark']
except KeyError as error:
    raise ValueError('basic.zip must contain light.tokens.json and dark.tokens.json') from error

L = main_tokens['mode']['light']
D = main_tokens['mode']['dark']

# ── Helpers ──
def hex_to_rgb(h):
    """Return raw r,g,b triple — for palette tokens consumed as rgb(var(...))."""
    h = h.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return f'{r}, {g}, {b}'

def hex_to_rgb_wrapped(h):
    """Return rgb(r, g, b) — for semantic tokens consumed directly as var(...)."""
    h = h.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return f'rgb({r}, {g}, {b})'

def alpha_blend(hex_color, alpha, bg=(255, 255, 255)):
    """Return raw r,g,b triple — for palette tokens consumed as rgb(var(...))."""
    h = hex_color.lstrip('#')
    fg = (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
    r = round(fg[0] * alpha + bg[0] * (1 - alpha))
    g = round(fg[1] * alpha + bg[1] * (1 - alpha))
    b = round(fg[2] * alpha + bg[2] * (1 - alpha))
    return f'{r}, {g}, {b}'

def alpha_blend_wrapped(hex_color, alpha, bg=(255, 255, 255)):
    """Return rgb(r, g, b) — for semantic tokens consumed directly as var(...)."""
    h = hex_color.lstrip('#')
    fg = (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
    r = round(fg[0] * alpha + bg[0] * (1 - alpha))
    g = round(fg[1] * alpha + bg[1] * (1 - alpha))
    b = round(fg[2] * alpha + bg[2] * (1 - alpha))
    return f'rgb({r}, {g}, {b})'

def get_color(token_set, name):
    return token_set[name]['$value']['hex']

def get_alpha(token_set, name):
    return token_set[name]['$value'].get('alpha', 1)

def write_palette(f, token_set, prefix, num, arco_name=None):
    if arco_name is None:
        arco_name = prefix
    for i in range(1, num + 1):
        key = f'{prefix}-{i}'
        rgb = hex_to_rgb(get_color(token_set, key))
        f.write(f'  --{arco_name}-{i}: {rgb};\n')
        f.write(f'  --arc-color-{arco_name}-{i}: {rgb};\n')

def build_shadow(sname, basic_obj):
    """Build CSS box-shadow string from Figma shadow token data.

    Figma stores shadows as:
      shadow-N/offsetx-1, offsety-1, blur-1, spread-1
      shadow-N/5%, shadow-N/8%, shadow-N/12% (alpha layers)

    The alpha keys are sorted numerically, and layer 1→first alpha, layer 2→second, etc.
    """
    sdata = basic_obj['基础投影'][sname]

    # Extract alpha values
    alpha_keys = sorted(
        [k for k in sdata.keys() if '%' in k],
        key=lambda x: float(x.replace('%', ''))
    )

    layers = []
    for i in range(1, 4):
        ox = sdata[f'offsetx-{i}']['$value']
        oy = sdata[f'offsety-{i}']['$value']
        bl = sdata[f'blur-{i}']['$value']
        sp = sdata[f'spread-{i}']['$value']
        alpha = sdata[alpha_keys[i-1]]['$value']['alpha'] if i-1 < len(alpha_keys) else 0.1
        layers.append(f'{ox}px {oy}px {bl}px {sp}px rgba(0, 0, 0, {alpha:.2f})')

    return ', '.join(layers)


# ═══════════════════════════════════════════
# GENERATE
# ═══════════════════════════════════════════

output_path = os.path.join(REPO_ROOT, 'packages/starbucks-design-vue/src/theme.css')
react_output_path = os.path.join(REPO_ROOT, 'packages/starbucks-design-react/src/theme.css')
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w') as f:
    f.write('/* theme.css — Arco CSS variables from Figma Design System V2.0 */\n')
    f.write('/* Source: Figma export files (real palette values, light + dark) */\n')
    f.write('/* Brand color: #00754a (Starbucks Green) */\n\n')

    # ── LIGHT MODE ──
    f.write('body {\n')
    f.write('  /* ═══════════════════════════════════════════ */\n')
    f.write('  /* LIGHT MODE */\n')
    f.write('  /* ═══════════════════════════════════════════ */\n\n')

    f.write('  /* ── Palette: primary (Starbucks Green) — Figma brand-color 1~10 ── */\n')
    write_palette(f, L, 'brand-color', 10, 'primary')
    f.write('\n')

    f.write('  /* ── Palette: success — Figma success-color 1~10 ── */\n')
    write_palette(f, L, 'success-color', 10, 'success')
    f.write('\n')

    f.write('  /* ── Palette: warning — Figma warning-color 1~10 ── */\n')
    write_palette(f, L, 'warning-color', 10, 'warning')
    f.write('\n')

    f.write('  /* ── Palette: danger — Figma error-color 1~10 ── */\n')
    write_palette(f, L, 'error-color', 10, 'danger')
    f.write('\n')

    f.write('  /* ── Palette: link — Figma information-color 1~10 ── */\n')
    write_palette(f, L, 'information-color', 10, 'link')
    f.write('\n')

    # Text colors (alpha-blended against white bg)
    f.write('  /* ── Text colors (alpha-blended against white background) ── */\n')
    f.write(f'  --color-text-1: {alpha_blend_wrapped("#000000", get_alpha(L, "font-gray-1"))};\n')
    f.write(f'  --color-text-2: {alpha_blend_wrapped("#000000", get_alpha(L, "font-gray-2"))};\n')
    f.write(f'  --color-text-3: {alpha_blend_wrapped("#000000", get_alpha(L, "font-gray-3"))};\n')
    f.write(f'  --color-text-4: {alpha_blend_wrapped("#000000", get_alpha(L, "font-gray-4"))};\n')
    f.write(f'  --color-white-text-1: {alpha_blend_wrapped("#FFFFFF", get_alpha(L, "font-white-1"))};\n')
    f.write(f'  --color-white-text-2: {alpha_blend_wrapped("#FFFFFF", get_alpha(L, "font-white-2"))};\n')
    f.write(f'  --color-white-text-3: {alpha_blend_wrapped("#FFFFFF", get_alpha(L, "font-white-3"))};\n')
    f.write(f'  --color-white-text-4: {alpha_blend_wrapped("#FFFFFF", get_alpha(L, "font-white-4"))};\n')
    f.write('\n')

    # Background colors
    f.write('  /* ── Background colors ── */\n')
    for name, token in basic_light['背景色'].items():
        f.write(f'  --{name}: {hex_to_rgb_wrapped(token["$value"]["hex"])};\n')
    for name, token in basic_light.get('特殊组件背景色', {}).items():
        value = token['$value']
        f.write(f'  --{name}: {alpha_blend_wrapped(value["hex"], value.get("alpha", 1))};\n')
    f.write('\n')

    # Border colors
    f.write('  /* ── Border colors ── */\n')
    f.write(f'  --color-border-1: {hex_to_rgb_wrapped(basic_light["分割线"]["border-level-1-color"]["$value"]["hex"])};\n')
    f.write(f'  --color-border-2: {hex_to_rgb_wrapped(basic_light["分割线"]["component-stroke"]["$value"]["hex"])};\n')
    # Additional border colors from 边框 section
    if '边框' in basic_light:
        bk = basic_light['边框']
        if 'border-level-2-color' in bk:
            f.write(f'  --color-border-3: {hex_to_rgb_wrapped(bk["border-level-2-color"]["$value"]["hex"])};\n')
        if 'component-border' in bk:
            f.write(f'  --color-border-component: {hex_to_rgb_wrapped(bk["component-border"]["$value"]["hex"])};\n')
    f.write('\n')

    # Brand & semantic base colors
    f.write('  /* ── Brand & semantic base colors ── */\n')
    bc = basic_light['基础颜色']
    for cat, prefix in [('brand', 'primary'), ('success', 'success'),
                        ('warning', 'warning'), ('error', 'danger'),
                        ('information', 'link')]:
        f.write(f'  --color-{prefix}: {hex_to_rgb_wrapped(bc[cat][f"{cat}-color"]["$value"]["hex"])};\n')
        f.write(f'  --color-{prefix}-hover: {hex_to_rgb_wrapped(bc[cat][f"{cat}-color-hover"]["$value"]["hex"])};\n')
        f.write(f'  --color-{prefix}-active: {hex_to_rgb_wrapped(bc[cat][f"{cat}-color-active"]["$value"]["hex"])};\n')
        # disabled has inconsistent naming
        disabled_key = f'{cat}-color-disabled' if f'{cat}-color-disabled' in bc[cat] else 'warning-color-disabled'
        f.write(f'  --color-{prefix}-disabled: {hex_to_rgb_wrapped(bc[cat][disabled_key]["$value"]["hex"])};\n')
        focus_key = f'{cat}-color-focus' if f'{cat}-color-focus' in bc[cat] else 'warning-color-focus'
        if focus_key in bc[cat]:
            f.write(f'  --color-{prefix}-focus: {hex_to_rgb_wrapped(bc[cat][focus_key]["$value"]["hex"])};\n')
        light_key = f'{cat}-color-light' if f'{cat}-color-light' in bc[cat] else 'warning-color-light'
        f.write(f'  --color-{prefix}-light: {hex_to_rgb_wrapped(bc[cat][light_key]["$value"]["hex"])};\n')
        lh_key = f'{cat}-color-light-hover' if f'{cat}-color-light-hover' in bc[cat] else 'warning-color-light-hover'
        if lh_key in bc[cat]:
            f.write(f'  --color-{prefix}-light-hover: {hex_to_rgb_wrapped(bc[cat][lh_key]["$value"]["hex"])};\n')
    f.write('\n')

    # Text semantic colors
    f.write('  /* ── Text semantic colors ── */\n')
    tc = basic_light['文本颜色']
    f.write(f'  --color-text-primary: {alpha_blend_wrapped(tc["text-color-primary"]["$value"]["hex"], tc["text-color-primary"]["$value"]["alpha"])};\n')
    f.write(f'  --color-text-secondary: {alpha_blend_wrapped(tc["text-color-secondary"]["$value"]["hex"], tc["text-color-secondary"]["$value"]["alpha"])};\n')
    f.write(f'  --color-text-disabled: {alpha_blend_wrapped(tc["text-color-disabled"]["$value"]["hex"], tc["text-color-disabled"]["$value"]["alpha"])};\n')
    f.write(f'  --color-text-placeholder: {alpha_blend_wrapped(tc["text-color-placeholder"]["$value"]["hex"], tc["text-color-placeholder"]["$value"]["alpha"])};\n')
    f.write(f'  --color-text-brand: {hex_to_rgb_wrapped(tc["text-color-brand"]["$value"]["hex"])};\n')
    f.write(f'  --color-text-link: {hex_to_rgb_wrapped(tc["text-color-link"]["$value"]["hex"])};\n')
    f.write('\n')

    # Typography
    f.write('  /* ── Typography ── */\n')
    fs = font_tokens['font-size']
    ft = font_tokens['font']
    fw = font_tokens['font-weight']
    lh = font_tokens['line-height']

    f.write(f'  --font-family: "{ft["chinese"]["$value"]}", "{ft["english"]["$value"]}", {ft["numbers"]["$value"]}, sans-serif;\n')

    # Font sizes
    size_map = [
        ('body-small', 'fs-12'), ('body-medium', 'fs-14'), ('body-large', 'fs-16'),
        ('title-large', 'fs-18'), ('title-extralarge', 'fs-20'),
        ('headline-small', 'fs-24'), ('headline-medium', 'fs-28'), ('headline-large', 'fs-36'),
        ('display-medium', 'fs-48'), ('display-large', 'fs-64'),
        ('link-small', 'fs-link-sm'), ('link-medium', 'fs-link-md'), ('link-large', 'fs-link-lg'),
        ('mark-small', 'fs-mark-sm'), ('mark-medium', 'fs-mark-md'),
    ]
    for key, label in size_map:
        if key in fs:
            f.write(f'  --{label}: {fs[key]["$value"]}px;\n')

    # Line heights
    lh_map = [
        ('body-small', 'lh-20'), ('body-medium', 'lh-22'), ('body-large', 'lh-24'),
        ('title-extralarge', 'lh-28'), ('title-large', 'lh-26'),
        ('headline-small', 'lh-32'), ('headline-medium', 'lh-36'), ('headline-large', 'lh-44'),
        ('display-medium', 'lh-56'), ('display-large', 'lh-72'),
        ('link-small', 'lh-link-sm'), ('link-medium', 'lh-link-md'), ('link-large', 'lh-link-lg'),
        ('mark-small', 'lh-mark-sm'), ('mark-medium', 'lh-mark-md'),
    ]
    for key, label in lh_map:
        if key in lh:
            f.write(f'  --{label}: {lh[key]["$value"]}px;\n')

    # Font weights
    weight_map = {'Bold': 700, 'Semibold': 600, 'Medium': 500, 'Regular': 400}
    for key, label in [('bold', 'fw-bold'), ('semibold', 'fw-semibold'),
                       ('medium', 'fw-medium'), ('regular', 'fw-regular')]:
        if key in fw:
            f.write(f'  --{label}: {weight_map.get(fw[key]["$value"], fw[key]["$value"])};\n')
    f.write('\n')

    # Spacing
    f.write('  /* ── Spacing / Size — Figma size tokens 1~16 ── */\n')
    sz = size_tokens['size']
    for i in range(1, 17):
        k = str(i)
        if k in sz:
            f.write(f'  --spacing-{i}: {sz[k]["$value"]}px;\n')
    f.write('\n')

    # Border Radius
    f.write('  /* ── Border Radius ── */\n')
    for key, label in [
        ('radius-small', 'border-radius-xs'),
        ('radius-default', 'border-radius-sm'),
        ('radius-medium', 'border-radius-md'),
        ('radius-large', 'border-radius-lg'),
        ('radius-extralarge', 'border-radius-xl'),
        ('radius-round', 'border-radius-round'),
    ]:
        if key in radius_tokens:
            f.write(f'  --{label}: {radius_tokens[key]["$value"]}px;\n')
    f.write('\n')

    # Shadows
    f.write('  /* ── Box Shadows ── */\n')
    for sname, css_name in [('shadow-1', 'shadow-sm'), ('shadow-2', 'shadow-md'), ('shadow-3', 'shadow-lg')]:
        s = build_shadow(sname, basic_light)
        f.write(f'  --{css_name}: {s};\n')
    f.write('\n')

    # Scrollbar
    f.write('  /* ── Scrollbar ── */\n')
    sb = basic_light['滚动条']
    f.write(f'  --scrollbar-color: {alpha_blend_wrapped(sb["scrollbar-color"]["$value"]["hex"], sb["scrollbar-color"]["$value"]["alpha"])};\n')
    f.write(f'  --scrollbar-hover-color: {alpha_blend_wrapped(sb["scrollbar-hover-color"]["$value"]["hex"], sb["scrollbar-hover-color"]["$value"]["alpha"])};\n')
    f.write(f'  --scrollbar-track-color: {hex_to_rgb_wrapped(sb["scroll-track-color"]["$value"]["hex"])};\n')
    f.write('\n')

    # Mask / Overlay
    f.write('  /* ── Mask / Overlay ── */\n')
    mk = basic_light['遮罩']
    f.write(f'  --mask-active: {alpha_blend_wrapped(mk["mask-active"]["$value"]["hex"], mk["mask-active"]["$value"]["alpha"])};\n')
    f.write(f'  --mask-disabled: {alpha_blend_wrapped(mk["mask-disabled"]["$value"]["hex"], mk["mask-disabled"]["$value"]["alpha"])};\n')
    f.write(f'  --mask-background: {alpha_blend_wrapped(mk["mask-background"]["$value"]["hex"], mk["mask-background"]["$value"]["alpha"])};\n')
    f.write('\n')

    f.write('  }\n\n')

    # ═══════════════════════════════════════════
    # DARK MODE
    # ═══════════════════════════════════════════
    # Support both Arco consumers and documentation hosts such as Docusaurus.
    f.write('body[data-arco-theme="dark"],\n')
    f.write('[data-arco-theme="dark"] body,\n')
    f.write('body[data-theme="dark"],\n')
    f.write('[data-theme="dark"] body {\n')
    f.write('  /* ═══════════════════════════════════════════ */\n')
    f.write('  /* DARK MODE */\n')
    f.write('  /* ═══════════════════════════════════════════ */\n\n')

    # Dark mode palettes
    f.write('  /* ── Palette: primary (Starbucks Green) — Figma brand-color 1~10 dark ── */\n')
    write_palette(f, D, 'brand-color', 10, 'primary')
    f.write('\n')

    f.write('  /* ── Palette: success — Figma success-color 1~10 dark ── */\n')
    write_palette(f, D, 'success-color', 10, 'success')
    f.write('\n')

    f.write('  /* ── Palette: warning — Figma warning-color 1~10 dark ── */\n')
    write_palette(f, D, 'warning-color', 10, 'warning')
    f.write('\n')

    f.write('  /* ── Palette: danger — Figma error-color 1~10 dark ── */\n')
    write_palette(f, D, 'error-color', 10, 'danger')
    f.write('\n')

    f.write('  /* ── Palette: link — Figma information-color 1~10 dark ── */\n')
    write_palette(f, D, 'information-color', 10, 'link')
    f.write('\n')

    # Dark mode bg color for alpha blending reference
    DARK_BG_HEX = get_color(basic_dark['背景色'], 'bg-color-container')
    DARK_BG = tuple(int(DARK_BG_HEX.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    f.write(f'  /* ── Text colors (alpha-blended against dark bg {DARK_BG_HEX}) ── */\n')
    f.write(f'  --color-text-1: {alpha_blend_wrapped("#FFFFFF", get_alpha(D, "font-white-1"), DARK_BG)};\n')
    f.write(f'  --color-text-2: {alpha_blend_wrapped("#FFFFFF", get_alpha(D, "font-white-2"), DARK_BG)};\n')
    f.write(f'  --color-text-3: {alpha_blend_wrapped("#FFFFFF", get_alpha(D, "font-white-3"), DARK_BG)};\n')
    f.write(f'  --color-text-4: {alpha_blend_wrapped("#FFFFFF", get_alpha(D, "font-white-4"), DARK_BG)};\n')
    f.write('\n')

    # Dark mode backgrounds
    f.write('  /* ── Background colors ── */\n')
    for name, token in basic_dark['背景色'].items():
        f.write(f'  --{name}: {hex_to_rgb_wrapped(token["$value"]["hex"])};\n')
    for name, token in basic_dark.get('特殊组件背景色', {}).items():
        value = token['$value']
        f.write(f'  --{name}: {alpha_blend_wrapped(value["hex"], value.get("alpha", 1), DARK_BG)};\n')
    f.write('\n')

    # Dark mode borders
    f.write('  /* ── Border colors ── */\n')
    f.write(f'  --color-border-1: {hex_to_rgb_wrapped(basic_dark["分割线"]["border-level-1-color"]["$value"]["hex"])};\n')
    f.write(f'  --color-border-2: {hex_to_rgb_wrapped(basic_dark["分割线"]["component-stroke"]["$value"]["hex"])};\n')
    if '边框' in basic_dark:
        bkd = basic_dark['边框']
        if 'border-level-2-color' in bkd:
            f.write(f'  --color-border-3: {hex_to_rgb_wrapped(bkd["border-level-2-color"]["$value"]["hex"])};\n')
        if 'component-border' in bkd:
            f.write(f'  --color-border-component: {hex_to_rgb_wrapped(bkd["component-border"]["$value"]["hex"])};\n')
    f.write('\n')

    # Dark mode brand/semantic colors
    f.write('  /* ── Brand & semantic base colors ── */\n')
    bcd = basic_dark['基础颜色']
    for cat, prefix in [('brand', 'primary'), ('success', 'success'),
                        ('warning', 'warning'), ('error', 'danger'),
                        ('information', 'link')]:
        f.write(f'  --color-{prefix}: {hex_to_rgb_wrapped(bcd[cat][f"{cat}-color"]["$value"]["hex"])};\n')
        f.write(f'  --color-{prefix}-hover: {hex_to_rgb_wrapped(bcd[cat][f"{cat}-color-hover"]["$value"]["hex"])};\n')
        f.write(f'  --color-{prefix}-active: {hex_to_rgb_wrapped(bcd[cat][f"{cat}-color-active"]["$value"]["hex"])};\n')
        disabled_key = f'{cat}-color-disabled' if f'{cat}-color-disabled' in bcd[cat] else 'warning-color-disabled'
        f.write(f'  --color-{prefix}-disabled: {hex_to_rgb_wrapped(bcd[cat][disabled_key]["$value"]["hex"])};\n')
        focus_key = f'{cat}-color-focus' if f'{cat}-color-focus' in bcd[cat] else 'warning-color-focus'
        if focus_key in bcd[cat]:
            f.write(f'  --color-{prefix}-focus: {hex_to_rgb_wrapped(bcd[cat][focus_key]["$value"]["hex"])};\n')
        light_key = f'{cat}-color-light' if f'{cat}-color-light' in bcd[cat] else 'warning-color-light'
        f.write(f'  --color-{prefix}-light: {hex_to_rgb_wrapped(bcd[cat][light_key]["$value"]["hex"])};\n')
        lh_key = f'{cat}-color-light-hover' if f'{cat}-color-light-hover' in bcd[cat] else 'warning-color-light-hover'
        if lh_key in bcd[cat]:
            f.write(f'  --color-{prefix}-light-hover: {hex_to_rgb_wrapped(bcd[cat][lh_key]["$value"]["hex"])};\n')
    f.write('\n')

    # Dark mode text semantic
    f.write('  /* ── Text semantic colors ── */\n')
    tcd = basic_dark['文本颜色']
    f.write(f'  --color-text-primary: {alpha_blend_wrapped(tcd["text-color-primary"]["$value"]["hex"], tcd["text-color-primary"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --color-text-secondary: {alpha_blend_wrapped(tcd["text-color-secondary"]["$value"]["hex"], tcd["text-color-secondary"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --color-text-disabled: {alpha_blend_wrapped(tcd["text-color-disabled"]["$value"]["hex"], tcd["text-color-disabled"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --color-text-placeholder: {alpha_blend_wrapped(tcd["text-color-placeholder"]["$value"]["hex"], tcd["text-color-placeholder"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --color-text-brand: {hex_to_rgb_wrapped(tcd["text-color-brand"]["$value"]["hex"])};\n')
    f.write(f'  --color-text-link: {hex_to_rgb_wrapped(tcd["text-color-link"]["$value"]["hex"])};\n')
    f.write('\n')

    # Dark mode shadows
    f.write('  /* ── Box Shadows ── */\n')
    for sname, css_name in [('shadow-1', 'shadow-sm'), ('shadow-2', 'shadow-md'), ('shadow-3', 'shadow-lg')]:
        s = build_shadow(sname, basic_dark)
        f.write(f'  --{css_name}: {s};\n')
    f.write('\n')

    # Dark mode scrollbar
    f.write('  /* ── Scrollbar ── */\n')
    sbd = basic_dark['滚动条']
    f.write(f'  --scrollbar-color: {alpha_blend_wrapped(sbd["scrollbar-color"]["$value"]["hex"], sbd["scrollbar-color"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --scrollbar-hover-color: {alpha_blend_wrapped(sbd["scrollbar-hover-color"]["$value"]["hex"], sbd["scrollbar-hover-color"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --scrollbar-track-color: {hex_to_rgb_wrapped(sbd["scroll-track-color"]["$value"]["hex"])};\n')
    f.write('\n')

    # Dark mode mask
    f.write('  /* ── Mask / Overlay ── */\n')
    mkd = basic_dark['遮罩']
    f.write(f'  --mask-active: {alpha_blend_wrapped(mkd["mask-active"]["$value"]["hex"], mkd["mask-active"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --mask-disabled: {alpha_blend_wrapped(mkd["mask-disabled"]["$value"]["hex"], mkd["mask-disabled"]["$value"]["alpha"], DARK_BG)};\n')
    f.write(f'  --mask-background: {alpha_blend_wrapped(mkd["mask-background"]["$value"]["hex"], mkd["mask-background"]["$value"]["alpha"], DARK_BG)};\n')
    f.write('\n')

    f.write('  }\n')

shutil.copyfile(output_path, react_output_path)

print('✅ Generated shared Figma theme')
print(f'   Vue:  {os.path.relpath(output_path, REPO_ROOT)}')
print(f'   React: {os.path.relpath(react_output_path, REPO_ROOT)}')
print('   Light + Dark mode, all palettes from Figma exports')
