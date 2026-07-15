// token-mapping.ts
// Figma variable path → Arco CSS / Less variable name mapping
// Generated: 2026-07-03

// ── Types ────────────────────────────────────────────────

/** Raw Figma MCP get_variable_defs response: { "path/key": "hex_or_number" } */
export type FigmaVarMap = Record<string, string>;

/** Parsed color with optional alpha */
export interface ParsedColor {
  r: number;
  g: number;
  b: number;
  a: number; // 0–1
}

/** Generic token mapping: Figma path → [Arco CSS var name, Arco Less var (or null)] */
export interface TokenMapping {
  figmaPath: string;
  cssVar: string;    // e.g. "--color-text-1"
  lessVar: string | null; // e.g. "@color-text-1" or null
}

// ── Color helpers ────────────────────────────────────────

/** Parse 6- or 8-digit hex to {r,g,b,a}. e.g. "#000000e5" → {r:0,g:0,b:0,a:0.898} */
export function parseHexColor(hex: string): ParsedColor {
  const h = hex.replace('#', '');
  if (h.length === 6) {
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1,
    };
  }
  if (h.length === 8) {
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: Math.round((parseInt(h.slice(6, 8), 16) / 255) * 1000) / 1000,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

/** Format an RGB triplet as "r, g, b" string for CSS var use */
export function rgbStr(color: ParsedColor): string {
  return `${color.r}, ${color.g}, ${color.b}`;
}

/** Parse a Figma variable value (could be hex, px number, string) → CSS value string */
export function parseVariableValue(raw: string): string | null {
  if (!raw) return null;
  // Check if it's a hex color
  if (raw.startsWith('#')) {
    const c = parseHexColor(raw);
    if (c.a < 1) {
      // Arco stores alpha colors differently — we need the alpha
      // For now, return RGB components (alpha handled separately)
      return rgbStr(c);
    }
    return rgbStr(c);
  }
  // Check if it's a number (px value)
  if (/^\d+$/.test(raw) || /^\d+\.?\d*$/.test(raw)) {
    const num = parseFloat(raw);
    return isNaN(num) ? null : `${num}px`;
  }
  return raw;
}

/** Extract alpha from an 8-digit hex, return as float 0–1 */
export function extractAlpha(hex: string): number {
  const h = hex.replace('#', '');
  if (h.length === 8) {
    return Math.round((parseInt(h.slice(6, 8), 16) / 255) * 1000) / 1000;
  }
  return 1;
}

// ── Semantic Color Mappings ──────────────────────────────

/** Figma text-color path → Arco CSS variable */
export const TEXT_COLOR_MAP: Record<string, string> = {
  '文本颜色/text-color-primary': '--color-text-1',
  '文本颜色/text-color-secondary': '--color-text-2',
  // MCP data uses "text-color-placeholder" as the key; also try alternates
  '文本颜色/text-color-placeholder': '--color-text-3',
  '文本颜色/text-color-disabled': '--color-text-4',
};

/** Figma background-color path → Arco CSS variable */
export const BG_COLOR_MAP: Record<string, string> = {
  '背景色/bg-color-page': '--color-bg-1',
  '背景色/bg-color-container': '--color-bg-2',
  '背景色/bg-color-secondarycontainer': '--color-bg-3',
  '背景色/bg-color-component': '--color-bg-4',
  '背景色/bg-color-secondarycomponent': '--color-bg-5',
};

/** Figma fill/component state color path → Arco CSS variable */
export const FILL_COLOR_MAP: Record<string, string> = {
  '背景色/bg-color-component-disabled': '--color-fill-1',
  '背景色/bg-color-component': '--color-fill-2',
  '背景色/bg-color-component-hover': '--color-fill-3',
  '背景色/bg-color-component-active': '--color-fill-4',
};

/** Figma border/divider path → Arco CSS variable */
export const BORDER_MAP: Record<string, string> = {
  '分割线/border-level-1-color': '--color-border-1',
  '边框/component-border': '--color-border-2',
};

/** Figma scrollbar path → Arco CSS variable */
export const SCROLLBAR_MAP: Record<string, string> = {
  '滚动条/scrollbar-color': '--arc-color-scrollbar',
  '滚动条/scrollbar-hover-color': '--arc-color-scrollbar-hover',
  '滚动条/scroll-track-color': '--arc-color-scrollbar-track',
};

/** Figma mask path → Arco CSS variable */
export const MASK_MAP: Record<string, string> = {
  '遮罩/mask-background': '--arc-color-mask-bg',
};

// ── Typography & Sizing Mappings ─────────────────────────

/** Figma radius key → Arco CSS variable */
export const RADIUS_MAP: Record<string, string> = {
  'radius-small': '--arc-border-radius-xs',
  'radius-default': '--arc-border-radius-small',
  'radius-medium': '--arc-border-radius-medium',
  'radius-large': '--arc-border-radius-large',
  'radius-round': '--border-radius-circle',
};

/** Figma font-size key → Arco CSS variable */
export const FONT_SIZE_MAP: Record<string, string> = {
  'font-size/body-small': '--arc-font-size-body-1',
  'font-size/body-medium': '--arc-font-size-body-2',
  'font-size/body-large': '--arc-font-size-body-3',
  'font-size/title-large': '--arc-font-size-title-1',
  'font-size/title-extralarge': '--arc-font-size-title-2',
  'font-size/headline-medium': '--arc-font-size-headline-1',
};

/** Figma line-height key → Arco CSS variable */
export const LINE_HEIGHT_MAP: Record<string, string> = {
  'line-height/body-small': '--arc-line-height-body-1',
  'line-height/body-medium': '--arc-line-height-body-2',
  'line-height/body-large': '--arc-line-height-body-3',
  'line-height/title-large': '--arc-line-height-title-1',
  'line-height/title-extralarge': '--arc-line-height-title-2',
  'line-height/headline-medium': '--arc-line-height-headline-1',
};

/** Figma size key → Arco spacing variable (size/2..9 → spacing-1..8) */
export const SPACING_MAP: Record<string, string> = {
  'size/2': '--arc-spacing-1',
  'size/3': '--arc-spacing-2',
  'size/4': '--arc-spacing-3',
  'size/5': '--arc-spacing-4',
  'size/6': '--arc-spacing-5',
  'size/7': '--arc-spacing-6',
  'size/8': '--arc-spacing-7',
  'size/9': '--arc-spacing-8',
};

// ── Shadow helpers ───────────────────────────────────────

/**
 * Build a CSS box-shadow string from Figma shadow variable set.
 * Figma defines shadows as: 基础投影/shadow-1/5%, /8%, /12% (opacity),
 *   /offsetx-1, /offsety-1, /blur-1, /spread-1 (per layer)
 * Each shadow set has 3 layers.
 */
export function parseShadow(
  vars: FigmaVarMap,
  shadowPrefix: string,
): string | null {
  const layers: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const opacityKey = `${shadowPrefix}/${i === 1 ? '5%' : i === 2 ? '8%' : '12%'}`;
    const oxKey = `${shadowPrefix}/offsetx-${i}`;
    const oyKey = `${shadowPrefix}/offsety-${i}`;
    const blurKey = `${shadowPrefix}/blur-${i}`;
    const spreadKey = `${shadowPrefix}/spread-${i}`;

    const opacityHex = vars[opacityKey];
    const ox = vars[oxKey];
    const oy = vars[oyKey];
    const blur = vars[blurKey];
    const spread = vars[spreadKey];

    if (!opacityHex || !ox || !oy || !blur) continue;
    const c = parseHexColor(opacityHex);
    const rgba = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
    layers.push(`${ox}px ${oy}px ${blur}px ${spread || '0'}px ${rgba}`);
  }
  return layers.length > 0 ? layers.join(', ') : null;
}
