#!/usr/bin/env tsx
/**
 * Export Arco CSS variables → Tokens Studio (W3C DTCG) JSON
 *
 * Reads theme.css and generates standard DTCG-format token files
 * compatible with Tokens Studio for Figma and Style Dictionary.
 *
 * Usage: pnpm tsx scripts/export-tokens-studio.ts
 * Output: tokens/studio/core.json, tokens/studio/semantic.json, tokens/studio/$themes.json
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ── Types (W3C DTCG spec) ─────────────────────────────────

interface DTCGToken {
  $value: string | number;
  $type: 'color' | 'dimension' | 'fontFamily' | 'fontSize' | 'lineHeight' | 'shadow' | 'borderRadius' | 'spacing' | 'fontWeight' | 'duration' | 'cubicBezier';
  $description?: string;
  $extensions?: Record<string, unknown>;
}

interface DTCGGroup {
  [key: string]: DTCGToken | DTCGGroup;
}

interface DTCGTheme {
  name: string;
  selectedTokenSets: Record<string, string>; // setName → mode
  group?: string;
}

// ── CSS Parser ────────────────────────────────────────────

interface CSSVar {
  name: string;
  value: string;
  isArc: boolean;
}

function parseThemeCSS(css: string): { light: CSSVar[]; dark: CSSVar[] } {
  const light: CSSVar[] = [];
  const dark: CSSVar[] = [];

  // Split light / dark sections
  const bodyEnd = css.indexOf('body[arco-theme');
  const lightSection = bodyEnd > 0 ? css.slice(0, bodyEnd) : css;
  const darkSection = bodyEnd > 0 ? css.slice(bodyEnd) : '';

  // Parse CSS variables: --name: value;
  const varRegex = /^\s*--([\w-]+):\s*(.+?);\s*$/gm;

  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(lightSection)) !== null) {
    const isArc = match[1].startsWith('arc-');
    light.push({ name: match[1], value: match[2].trim(), isArc });
  }

  while ((match = varRegex.exec(darkSection)) !== null) {
    const isArc = match[1].startsWith('arc-');
    dark.push({ name: match[1], value: match[2].trim(), isArc });
  }

  return { light, dark };
}

// ── Color Conversion ──────────────────────────────────────

/** Convert "r, g, b" string to hex */
function rgbToHex(rgb: string): string | null {
  const parts = rgb.split(',').map(s => parseInt(s.trim(), 10));
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const [r, g, b] = parts;
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
}

function isRgbTriplet(val: string): boolean {
  const parts = val.split(',').map(s => s.trim());
  return parts.length === 3 && parts.every(s => /^\d{1,3}$/.test(s));
}

// ── Token Classification ──────────────────────────────────

function classifyTokens(vars: CSSVar[]): {
  palettes: Record<string, Record<number, CSSVar>>;
  text: CSSVar[];
  background: CSSVar[];
  fill: CSSVar[];
  border: CSSVar[];
  scrollbar: CSSVar[];
  mask: CSSVar[];
  secondary: CSSVar[];
  radius: CSSVar[];
  fontSize: CSSVar[];
  lineHeight: CSSVar[];
  spacing: CSSVar[];
  shadow: CSSVar[];
  fontFamily: CSSVar[];
  other: CSSVar[];
} {
  const palettes: Record<string, Record<number, CSSVar>> = {
    primary: {},
    success: {},
    warning: {},
    danger: {},
    link: {},
    neutral: {},
  };

  const text: CSSVar[] = [];
  const background: CSSVar[] = [];
  const fill: CSSVar[] = [];
  const border: CSSVar[] = [];
  const scrollbar: CSSVar[] = [];
  const mask: CSSVar[] = [];
  const secondary: CSSVar[] = [];
  const radius: CSSVar[] = [];
  const fontSize: CSSVar[] = [];
  const lineHeight: CSSVar[] = [];
  const spacing: CSSVar[] = [];
  const shadow: CSSVar[] = [];
  const fontFamily: CSSVar[] = [];
  const other: CSSVar[] = [];

  for (const v of vars) {
    const n = v.name;

    // Palette — numbered color steps
    const paletteMatch = n.match(/^(?:arc-)?(?:color-)?(primary|success|warning|danger|link|neutral)[- ]?(\d+)$/);
    if (paletteMatch) {
       palettes[paletteMatch[1]] = palettes[paletteMatch[1]] || {};
       palettes[paletteMatch[1]][parseInt(paletteMatch[2], 10)] = v;
       continue;
    }
    // gray-N is neutral
    const grayMatch = n.match(/^gray-(\d+)$/);
    if (grayMatch) {
      palettes.neutral[parseInt(grayMatch[1], 10)] = v;
      continue;
    }

    if (n.includes('text')) { text.push(v); continue; }
    if (n.includes('bg-') || n.includes('bg-white') || n.includes('bg-popup')) { background.push(v); continue; }
    if (n.includes('fill')) { fill.push(v); continue; }
    if (n.includes('border') && !n.includes('radius')) { border.push(v); continue; }
    if (n.includes('scrollbar')) { scrollbar.push(v); continue; }
    if (n.includes('mask') || n.includes('spin-layer') || n.includes('tooltip') || n.includes('menu') || n.includes('white')) { mask.push(v); continue; }
    if (n.includes('secondary')) { secondary.push(v); continue; }
    if (n.includes('border-radius') || n.includes('radius')) { radius.push(v); continue; }
    if (n.includes('font-size')) { fontSize.push(v); continue; }
    if (n.includes('line-height')) { lineHeight.push(v); continue; }
    if (n.includes('spacing')) { spacing.push(v); continue; }
    if (n.includes('shadow')) { shadow.push(v); continue; }
    if (n.includes('font-family') || n.includes('font')) { fontFamily.push(v); continue; }

    other.push(v);
  }

  return { palettes, text, background, fill, border, scrollbar, mask, secondary, radius, fontSize, lineHeight, spacing, shadow, fontFamily, other };
}

// ── Build DTCG JSON ───────────────────────────────────────

function buildDTCGColor(v: CSSVar, mode: 'light' | 'dark'): DTCGToken | null {
  let hex: string | null;
  if (isRgbTriplet(v.value)) {
    hex = rgbToHex(v.value);
  } else if (v.value.startsWith('#')) {
    hex = v.value;
  } else if (v.value.startsWith('var(')) {
    return null; // skip references
  } else {
    return null;
  }
  if (!hex) return null;
  return { $value: hex, $type: 'color' };
}

function buildCoreTokens(lightVars: CSSVar[]): DTCGGroup {
  const classified = classifyTokens(lightVars);
  const core: DTCGGroup = {};

  // Color palettes (10-step scales)
  const color: DTCGGroup = {};
  for (const [paletteName, steps] of Object.entries(classified.palettes)) {
    const group: DTCGGroup = {};
    for (const [step, v] of Object.entries(steps).sort(([a], [b]) => parseInt(a) - parseInt(b))) {
      const token = buildDTCGColor(v, 'light');
      if (token) {
        // Use only arc-prefixed tokens for core palette
        const cleanStep = parseInt(step, 10);
        group[`${cleanStep * 10}`] = {
          $value: token.$value,
          $type: 'color',
          $description: `${paletteName} color scale, step ${step}`,
        };
      }
    }
    if (Object.keys(group).length > 0) {
      color[paletteName] = group;
    }
  }
  if (Object.keys(color).length > 0) core.color = color;

  // Border Radius
  const borderRadius: DTCGGroup = {};
  for (const v of classified.radius) {
    const key = v.name.replace(/^(?:arc-)?(?:border-)?radius-/, '').replace('arc-', '');
    const px = parseFloat(v.value);
    if (!isNaN(px)) {
      borderRadius[key] = { $value: px, $type: 'borderRadius', $description: v.name };
    }
  }
  if (Object.keys(borderRadius).length > 0) core.borderRadius = borderRadius;

  // Spacing scale
  const spacing: DTCGGroup = {};
  for (const v of classified.spacing) {
    const key = v.name.replace(/^(?:arc-)?spacing-/, '');
    const px = parseFloat(v.value);
    if (!isNaN(px)) {
      spacing[key] = { $value: px, $type: 'spacing', $description: v.name };
    }
  }
  if (Object.keys(spacing).length > 0) core.spacing = spacing;

  // Font sizes
  const fontSize: DTCGGroup = {};
  for (const v of classified.fontSize) {
    const key = v.name.replace(/^(?:arc-)?(?:font-)?size-/, '').replace('arc-', '');
    const px = parseFloat(v.value);
    if (!isNaN(px)) {
      fontSize[key] = { $value: px, $type: 'fontSize', $description: v.name };
    }
  }
  if (Object.keys(fontSize).length > 0) core.fontSize = fontSize;

  // Line heights
  const lineHeight: DTCGGroup = {};
  for (const v of classified.lineHeight) {
    const key = v.name.replace(/^(?:arc-)?(?:line-)?height-/, '').replace('arc-', '');
    const px = parseFloat(v.value);
    if (!isNaN(px)) {
      lineHeight[key] = { $value: px, $type: 'lineHeight', $description: v.name };
    }
  }
  if (Object.keys(lineHeight).length > 0) core.lineHeight = lineHeight;

  // Font family
  if (classified.fontFamily.length > 0) {
    const fam = classified.fontFamily[0];
    // Strip quotes for JSON
    const clean = fam.value.replace(/"/g, '').replace(/;$/, '');
    core.fontFamily = {
      primary: { $value: clean, $type: 'fontFamily', $description: 'Primary font stack' },
    };
  }

  // Shadows
  const shadow: DTCGGroup = {};
  for (const v of classified.shadow) {
    const key = v.name.replace(/^arc-shadow-/, '').replace(/^arc-/, '');
    shadow[key] = { $value: v.value, $type: 'shadow', $description: v.name };
  }
  if (Object.keys(shadow).length > 0) core.shadow = shadow;

  return core;
}

function buildSemanticTokens(lightVars: CSSVar[], darkVars: CSSVar[]): { light: DTCGGroup; dark: DTCGGroup } {
  const light = buildSemanticMode(lightVars, 'light');
  const dark = buildSemanticMode(darkVars, 'dark');
  return { light, dark };
}

function buildSemanticMode(vars: CSSVar[], _mode: 'light' | 'dark'): DTCGGroup {
  const classified = classifyTokens(vars);
  const semantic: DTCGGroup = {};

  // Text colors
  const text: DTCGGroup = {};
  for (const v of classified.text) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?color-text-/, '').replace(/^arc-/, '');
      text[key] = { ...token, $description: `Text color level ${key}` };
    }
  }
  if (Object.keys(text).length > 0) semantic.text = text;

  // Background colors
  const background: DTCGGroup = {};
  for (const v of classified.background) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      let key = v.name.replace(/^(?:arc-)?color-bg-/, '').replace(/^arc-/, '');
      if (key === 'white') key = 'white';
      if (key === 'popup') key = 'popup';
      background[key] = { ...token, $description: `Background - ${v.name}` };
    }
  }
  if (Object.keys(background).length > 0) semantic.background = background;

  // Fill colors
  const fill: DTCGGroup = {};
  for (const v of classified.fill) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?color-fill-/, '').replace(/^arc-/, '');
      fill[key] = { ...token, $description: `Fill - ${v.name}` };
    }
  }
  if (Object.keys(fill).length > 0) semantic.fill = fill;

  // Border colors
  const border: DTCGGroup = {};
  for (const v of classified.border) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?color-border-/, '').replace(/^arc-/, '');
      border[key] = { ...token, $description: `Border - ${v.name}` };
    }
  }
  if (Object.keys(border).length > 0) semantic.border = border;

  // Secondary (component states)
  const secondaryGroup: DTCGGroup = {};
  for (const v of classified.secondary) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?color-secondary-?/, '').replace(/^arc-/, '') || 'default';
      secondaryGroup[key] = { ...token, $description: `Secondary - ${v.name}` };
    }
  }
  if (Object.keys(secondaryGroup).length > 0) semantic.secondary = secondaryGroup;

  // Overlay/Mask
  const overlay: DTCGGroup = {};
  for (const v of classified.mask) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?color-/, '').replace(/^arc-/, '').replace(/-/g, '_');
      overlay[key] = { ...token, $description: `Overlay - ${v.name}` };
    }
  }
  if (Object.keys(overlay).length > 0) semantic.overlay = overlay;

  // Scrollbar
  const scrollbarGroup: DTCGGroup = {};
  for (const v of classified.scrollbar) {
    const token = buildDTCGColor(v, _mode);
    if (token) {
      const key = v.name.replace(/^(?:arc-)?(?:color-)?scrollbar-?/, '').replace(/^arc-/, '');
      scrollbarGroup[key] = { ...token, $description: `Scrollbar - ${v.name}` };
    }
  }
  if (Object.keys(scrollbarGroup).length > 0) semantic.scrollbar = scrollbarGroup;

  return semantic;
}

function buildThemesJSON(): DTCGTheme[] {
  return [
    {
      name: 'starbucks-light',
      selectedTokenSets: {
        'core': 'source',
        'semantic': 'light',
      },
      group: 'Starbucks',
    },
    {
      name: 'starbucks-dark',
      selectedTokenSets: {
        'core': 'source',
        'semantic': 'dark',
      },
      group: 'Starbucks',
    },
  ];
}

// ── Metadata ───────────────────────────────────────────────

function buildMetadata(): {
  tokenSetOrder: Array<{ set: string; modes?: Record<string, string> }>;
} {
  return {
    tokenSetOrder: [
      {
        set: 'core',
      },
      {
        set: 'semantic',
        modes: {
          light: 'Light mode semantic tokens',
          dark: 'Dark mode semantic tokens',
        },
      },
    ],
  };
}

// ── Main ───────────────────────────────────────────────────

function main() {
  const themePath = path.resolve('packages/starbucks-design-vue/src/theme.css');
  const outDir = path.resolve('tokens/studio');

  console.log(`📖 Reading ${themePath}...`);
  const css = fs.readFileSync(themePath, 'utf-8');
  const { light, dark } = parseThemeCSS(css);
  console.log(`   Light mode: ${light.length} variables`);
  console.log(`   Dark mode: ${dark.length} variables`);

  // Build token sets
  console.log('\n🔨 Building core tokens...');
  const core = buildCoreTokens(light);
  console.log(`   Core: ${countTokens(core)} tokens`);

  console.log('🔨 Building semantic tokens...');
  const semantic = buildSemanticTokens(light, dark);
  console.log(`   Semantic (light): ${countTokens(semantic.light)} tokens`);
  console.log(`   Semantic (dark): ${countTokens(semantic.dark)} tokens`);

  // Write output
  fs.mkdirSync(outDir, { recursive: true });

  const corePath = path.join(outDir, 'core.json');
  fs.writeFileSync(corePath, JSON.stringify(core, null, 2), 'utf-8');
  console.log(`\n✅ Written: ${corePath}`);

  const semPath = path.join(outDir, 'semantic.json');
  fs.writeFileSync(semPath, JSON.stringify(semantic, null, 2), 'utf-8');
  console.log(`✅ Written: ${semPath}`);

  const themesPath = path.join(outDir, '$themes.json');
  fs.writeFileSync(themesPath, JSON.stringify(buildThemesJSON(), null, 2), 'utf-8');
  console.log(`✅ Written: ${themesPath}`);

  const metaPath = path.join(outDir, '$metadata.json');
  fs.writeFileSync(metaPath, JSON.stringify(buildMetadata(), null, 2), 'utf-8');
  console.log(`✅ Written: ${metaPath}`);

  console.log('\n🎉 Tokens Studio JSON export complete!');
  console.log(`   Output: ${outDir}/`);
  console.log('\n   Usage with Tokens Studio for Figma:');
  console.log('   1. Open the Tokens Studio plugin in Figma');
  console.log('   2. Settings → Local JSON storage → select tokens/studio/ directory');
  console.log('   3. Or use GitHub sync to push these tokens to your repo');
}

function countTokens(group: DTCGGroup): number {
  let count = 0;
  for (const v of Object.values(group)) {
    if ('$value' in v) count++;
    else count += countTokens(v as DTCGGroup);
  }
  return count;
}

main();
