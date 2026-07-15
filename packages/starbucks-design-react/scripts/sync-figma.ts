#!/usr/bin/env tsx
/**
 * Sync Figma Design Tokens → Arco Theme Package
 *
 * MCP mode (default):
 *   Requires Figma desktop running with MCP server at localhost:3845.
 *   Reads ALL design variables via MCP get_variable_defs and generates
 *   theme.css + figma-overrides.less + overrides/*.less
 *
 *   Usage: pnpm sync-figma
 *
 * Input mode (legacy):
 *   Reads Figma Design Tokens plugin JSON exports.
 *   Usage: pnpm sync-figma --input <dir>
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  type FigmaVarMap,
  parseHexColor, rgbStr, extractAlpha, parseVariableValue,
  TEXT_COLOR_MAP, BG_COLOR_MAP, FILL_COLOR_MAP, BORDER_MAP,
  SCROLLBAR_MAP, MASK_MAP,
  RADIUS_MAP, FONT_SIZE_MAP, LINE_HEIGHT_MAP, SPACING_MAP,
  parseShadow,
} from './token-mapping';
import { COMPONENT_LIST, type ComponentEntry } from './component-list';

// ── Constants ────────────────────────────────────────────

const STYLES_NODE_ID = '618:26615'; // ✅ ❖ Styles 全局样式
const MCP_URL = 'http://127.0.0.1:3845/mcp';
const LIGHT_BG: [number, number, number] = [255, 255, 255];
const DARK_BG: [number, number, number] = [36, 36, 36]; // #242424

// ── MCP Client ───────────────────────────────────────────

let _sessionId = '';

async function mcpCall(method: string, params: Record<string, unknown> = {}): Promise<unknown> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (_sessionId) headers['Mcp-Session-Id'] = _sessionId;

  const resp = await fetch(MCP_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
  });

  const sid = resp.headers.get('mcp-session-id');
  if (sid) _sessionId = sid;

  const text = await resp.text();
  for (const line of text.split('\n')) {
    if (line.startsWith('data: ')) {
      try { return JSON.parse(line.slice(6)); }
      catch { /* continue */ }
    }
  }
  if (text.startsWith('{')) return JSON.parse(text);
  return null;
}

async function mcpGetVariableDefs(nodeId: string, retries = 3): Promise<FigmaVarMap> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const resp = await mcpCall('tools/call', {
      name: 'get_variable_defs',
      arguments: {
        nodeId,
        clientLanguages: 'typescript,css,less',
        clientFrameworks: 'react',
      },
    }) as Record<string, unknown>;

    const content = (resp?.result as Record<string, unknown>)?.content as Array<{ type: string; text: string }>;
    if (!content) {
      if (attempt < retries - 1) { await delay(2000); continue; }
      return {};
    }

    const textBlock = content.find((c) => c.type === 'text');
    if (!textBlock) {
      if (attempt < retries - 1) { await delay(2000); continue; }
      return {};
    }

    try {
      return JSON.parse(textBlock.text) as FigmaVarMap;
    } catch {
      if (attempt < retries - 1) { await delay(2000); continue; }
      return {};
    }
  }
  return {};
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Theme CSS Generation ─────────────────────────────────

/** Extract 10-step palette blocks from existing theme.css to preserve them */
function extractPaletteBlocks(existingCSS: string): { light: string; dark: string } {
  const bodyEnd = existingCSS.indexOf('body[arco-theme');
  const lightSection = bodyEnd > 0 ? existingCSS.slice(0, bodyEnd) : existingCSS;
  const darkSection = bodyEnd > 0 ? existingCSS.slice(bodyEnd) : '';

  // Extract palette lines from light section (primary, success, warning, danger, link, neutral 1-10)
  const paletteRegex = /\/\* ── Palette:.*?── \*\//g;
  const paletteEnd = /\/\* ── Text ── \*\//;

  const lightPalette: string[] = [];
  const darkPalette: string[] = [];

  // Extract light palette
  const lightMatch = lightSection.match(/\/\* ── Palette: primary ── \*\/([\s\S]*?)(?=\/\* ── Text)/);
  if (lightMatch) {
    // Extract ALL palette sections (primary through neutral)
    const allPalettes = lightSection.match(/\/\* ── Palette:.*?── \*\/(?:[\s\S]*?)(?=\/\* ── (?:Text|[^P]))/g);
    if (allPalettes) lightPalette.push(...allPalettes);
  }

  // Extract dark palette
  const darkMatch = darkSection.match(/\/\* ── Palette: primary ── \*\/([\s\S]*?)(?=\/\* ── Text)/);
  if (darkMatch) {
    const allDarkPalettes = darkSection.match(/\/\* ── Palette:.*?── \*\/(?:[\s\S]*?)(?=\/\* ── (?:Text|[^P]))/g);
    if (allDarkPalettes) darkPalette.push(...allDarkPalettes);
  }

  return {
    light: lightPalette.join('\n'),
    dark: darkPalette.join('\n'),
  };
}

/** Resolve a Figma variable value, alpha-blending 8-digit hex against background */
function resolveBlended(raw: string, bg: [number, number, number]): string | null {
  let val = parseVariableValue(raw);
  if (!val) return null;
  const alpha = extractAlpha(raw);
  if (alpha < 1) {
    const c = parseHexColor(raw);
    return [
      Math.round(c.r * alpha + bg[0] * (1 - alpha)),
      Math.round(c.g * alpha + bg[1] * (1 - alpha)),
      Math.round(c.b * alpha + bg[2] * (1 - alpha)),
    ].join(', ');
  }
  return val;
}

/** Generate CSS variable block for a mapped section */
function generateCSSSection(
  vars: FigmaVarMap,
  mapping: Record<string, string>,
  bg: [number, number, number],
  sectionTitle: string,
  comment?: string,
): string {
  const lines: string[] = [];
  if (comment) lines.push(`  /* ── ${comment} ── */`);

  for (const [figmaPath, cssVar] of Object.entries(mapping)) {
    const raw = vars[figmaPath];
    if (raw === undefined) {
      console.warn(`  ⚠ Missing Figma variable: ${figmaPath}`);
      continue;
    }
    const val = resolveBlended(raw, bg);
    if (val) lines.push(`  ${cssVar}: ${val};`);
  }
  return lines.join('\n');
}

/** Generate the complete theme.css */
function generateThemeCSS(globalVars: FigmaVarMap, existingCSS: string): string {
  const palettes = extractPaletteBlocks(existingCSS);
  const now = new Date().toISOString().split('T')[0];

  const L: string[] = [
    '/* theme.css — Arco native + project CSS variables */',
    '/* Source: Figma Design System V2.0 (light + dark) */',
    `/* Generated: ${now} via MCP sync */`,
    '',
  ];

  // ── LIGHT MODE ──
  L.push('body {');
  L.push('  /* ═══════════════════════════════════════════ */');
  L.push('  /* LIGHT MODE */');
  L.push('  /* ═══════════════════════════════════════════ */');
  L.push('');

  // 10-step palettes (preserved)
  L.push(palettes.light);
  L.push('');

  // Text
  L.push(generateCSSSection(globalVars, TEXT_COLOR_MAP, LIGHT_BG, 'Text'));
  L.push('');

  // Also add arc-color prefixed variants
  for (const [figmaPath, cssVar] of Object.entries(TEXT_COLOR_MAP)) {
    const raw = globalVars[figmaPath];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  --arc${cssVar.replace('--', '-')}: ${val};`);
    }
  }
  L.push('');

  // Background
  L.push(generateCSSSection(globalVars, BG_COLOR_MAP, LIGHT_BG, 'Background'));
  L.push('  --arc-color-bg-white: 255, 255, 255;');
  L.push('  --color-bg-white: 255, 255, 255;');
  L.push('  --color-bg-popup: 255, 255, 255;');
  // Add arc-color prefixed
  for (const [figmaPath, cssVar] of Object.entries(BG_COLOR_MAP)) {
    const raw = globalVars[figmaPath];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  --arc${cssVar.replace('--', '-')}: ${val};`);
    }
  }
  L.push('');

  // Fill
  L.push(generateCSSSection(globalVars, FILL_COLOR_MAP, LIGHT_BG, 'Fill'));
  for (const [figmaPath, cssVar] of Object.entries(FILL_COLOR_MAP)) {
    const raw = globalVars[figmaPath];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  --arc${cssVar.replace('--', '-')}: ${val};`);
    }
  }
  L.push('');

  // Secondary (component states)
  L.push('  /* ── Secondary (component states) ── */');
  const secondaryBg = parseVariableValue(globalVars['背景色/bg-color-component-disabled'] || '#eeeeee');
  const secondaryActive = parseVariableValue(globalVars['背景色/bg-color-component-active'] || '#a6a6a6');
  L.push(`  --color-secondary: ${secondaryBg};`);
  L.push(`  --color-secondary-hover: ${secondaryBg};`);
  L.push(`  --color-secondary-active: ${secondaryActive};`);
  L.push(`  --color-secondary-disabled: ${secondaryBg};`);
  L.push('');

  // Border
  L.push(generateCSSSection(globalVars, BORDER_MAP, LIGHT_BG, 'Border'));
  for (const [figmaPath, cssVar] of Object.entries(BORDER_MAP)) {
    const raw = globalVars[figmaPath];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  --arc${cssVar.replace('--', '-')}: ${val};`);
    }
  }
  const border1 = parseVariableValue(globalVars['分割线/border-level-1-color'] || '#e8e8e8');
  L.push(`  --color-border-3: ${border1};`);
  L.push(`  --color-border-4: ${border1};`);
  L.push('');

  // Scrollbar
  L.push(generateCSSSection(globalVars, SCROLLBAR_MAP, LIGHT_BG, 'Scrollbar'));
  L.push('');

  // Mask
  L.push(generateCSSSection(globalVars, MASK_MAP, LIGHT_BG, 'Overlay & Special'));
  const maskVal = parseVariableValue(globalVars['遮罩/mask-background'] || '#fffffff5');
  const tooltipBg = parseVariableValue(globalVars['Gray 中性/Gray4-边框'] || '#4b4b4b');
  L.push(`  --color-spin-layer-bg: ${maskVal};`);
  L.push(`  --color-tooltip-bg: ${tooltipBg};`);
  L.push(`  --color-menu-dark-bg: #232324;`);
  L.push(`  --color-menu-light-bg: #ffffff;`);
  L.push(`  --color-menu-dark-hover: var(--color-fill-2);`);
  L.push(`  --color-white: #ffffff;`);
  L.push('');

  // Border Radius
  L.push('  /* ── Border Radius ── */');
  L.push('  --arc-border-radius-none: 0;');
  L.push('  --border-radius-none: 0;');
  for (const [figmaKey, cssVar] of Object.entries(RADIUS_MAP)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  ${cssVar}: ${val};`);
    }
  }
  L.push('');

  // Typography
  L.push('  /* ── Typography ── */');
  const fontChinese = JSON.parse(globalVars['font/chinese'] ? `"${globalVars['font/chinese']}"` : '"Noto Sans SC"');
  const fontEnglish = JSON.parse(globalVars['font/english'] ? `"${globalVars['font/english']}"` : '"Poppins"');
  L.push(`  --arc-font-family: "${fontChinese}", "${fontEnglish}", Roboto, sans-serif;`);
  L.push('');
  L.push('  /* Font Sizes */');
  for (const [figmaKey, cssVar] of Object.entries(FONT_SIZE_MAP)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  ${cssVar}: ${val};`);
    }
  }
  L.push('');
  L.push('  /* Line Heights */');
  for (const [figmaKey, cssVar] of Object.entries(LINE_HEIGHT_MAP)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  ${cssVar}: ${val};`);
    }
  }
  L.push('');

  // Spacing
  L.push('  /* ── Spacing ── */');
  for (const [figmaKey, cssVar] of Object.entries(SPACING_MAP)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const val = resolveBlended(raw, LIGHT_BG);
      if (val) L.push(`  ${cssVar}: ${val};`);
    }
  }
  L.push('');

  // Shadow
  L.push('  /* ── Shadow ── */');
  const shadow1 = parseShadow(globalVars, '基础投影/shadow-1');
  if (shadow1) L.push(`  --arc-shadow-1: ${shadow1};`);
  const shadow2 = parseShadow(globalVars, '基础投影/shadow-2');
  if (shadow2) L.push(`  --arc-shadow-2: ${shadow2};`);
  const shadow3 = parseShadow(globalVars, '基础投影/shadow-3');
  if (shadow3) L.push(`  --arc-shadow-3: ${shadow3};`);
  L.push('');

  L.push('}');
  L.push('');

  // ── DARK MODE ──
  L.push('body[arco-theme=\'dark\'] {');
  L.push('  /* ═══════════════════════════════════════════ */');
  L.push('  /* DARK MODE */');
  L.push('  /* ═══════════════════════════════════════════ */');
  L.push('');

  // 10-step palettes for dark (preserved)
  L.push(palettes.dark || '  /* Dark palette preserved from existing theme.css */');
  L.push('');

  // Dark semantic tokens — use mode/dark/ variables from MCP
  const darkText1 = parseVariableValue(globalVars['mode/dark/font-white-1'] || '#ffffffe5');
  const darkText2 = parseVariableValue(globalVars['mode/dark/font-white-2'] || '#ffffff8c');
  const darkText3 = parseVariableValue(globalVars['mode/dark/font-white-3'] || '#ffffff59');
  const darkText4 = parseVariableValue(globalVars['mode/dark/font-white-4'] || '#ffffff38');

  if (darkText1 || darkText2 || darkText3 || darkText4) {
    L.push('  /* ── Text ── */');
    if (darkText1) L.push(`  --color-text-1: ${darkText1};`);
    if (darkText2) L.push(`  --color-text-2: ${darkText2};`);
    if (darkText3) L.push(`  --color-text-3: ${darkText3};`);
    if (darkText4) L.push(`  --color-text-4: ${darkText4};`);
    L.push('');
  }

  L.push('}');
  L.push('');

  return L.join('\n');
}

// ── Less Overrides Generation ────────────────────────────

function generateLessOverrides(globalVars: FigmaVarMap): string {
  const now = new Date().toISOString().split('T')[0];
  const L: string[] = [
    '// figma-overrides.less',
    '// Auto-generated from Figma Design System V2.0 via MCP',
    `// Generated: ${now}`,
    '// DO NOT EDIT MANUALLY.',
    '',
    '// ── Spacing Scale (from Figma size.*) ──',
  ];

  for (const [figmaKey, _cssVar] of Object.entries(SPACING_MAP)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const num = parseInt(raw, 10);
      if (!isNaN(num)) {
        const idx = figmaKey.replace('size/', '');
        L.push(`@spacing-${parseInt(idx, 10) - 1}: ${num}px;  // Figma size.${idx}`);
      }
    }
  }
  L.push('');

  L.push('// ── Font Sizes (from Figma font-size) ──');
  const fontSizeLess: Record<string, string> = {
    'font-size/body-small': '@font-size-body-1',
    'font-size/body-medium': '@font-size-body-3',
    'font-size/body-large': '@font-size-title-1',
    'font-size/title-extralarge': '@font-size-title-2',
    'font-size/headline-medium': '@font-size-title-3',
  };
  for (const [figmaKey, lessVar] of Object.entries(fontSizeLess)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const num = parseInt(raw, 10);
      if (!isNaN(num)) L.push(`${lessVar}: ${num}px;  // Figma ${figmaKey}`);
    }
  }
  L.push('');

  L.push('// ── Font Family (from Figma font) ──');
  const zhFont = globalVars['font/chinese'] || 'Noto Sans SC';
  const enFont = globalVars['font/english'] || 'Poppins';
  L.push(`@font-family: "${zhFont}", "${enFont}", Roboto, sans-serif;  // Figma`);
  L.push('');

  L.push('// ── Border Radius (from Figma) ──');
  const radiusLess: Record<string, string> = {
    'radius-small': '@border-radius-small',
    'radius-default': '@border-radius-medium',
    'radius-large': '@border-radius-large',
    'radius-round': '@border-radius-circle',
  };
  for (const [figmaKey, lessVar] of Object.entries(radiusLess)) {
    const raw = globalVars[figmaKey];
    if (raw) {
      const num = parseInt(raw, 10);
      if (!isNaN(num)) L.push(`${lessVar}: ${num}px;  // Figma ${figmaKey}`);
    }
  }
  L.push('');

  return L.join('\n');
}

// ── Component Overrides Generation ───────────────────────

function generateComponentOverride(
  entry: ComponentEntry,
  compVars: FigmaVarMap,
  globalVars: FigmaVarMap,
): string {
  const now = new Date().toISOString().split('T')[0];
  const L: string[] = [
    `// ${entry.name}.less`,
    `// Auto-generated from Figma: ${entry.figmaName}`,
    `// Generated: ${now}`,
    `// DO NOT EDIT MANUALLY.`,
    '',
  ];

  if (Object.keys(compVars).length === 0) {
    L.push(`// No design variables bound to this component in Figma.`);
    L.push(`// It inherits all values from global theme.css tokens.`);
    return L.join('\n');
  }

  // Compare component variables with global variables
  const differences: string[] = [];
  for (const [key, val] of Object.entries(compVars)) {
    const globalVal = globalVars[key];
    if (globalVal !== undefined && globalVal !== val) {
      differences.push(`// ${key}: ${val} (global: ${globalVal})`);
    } else if (globalVal === undefined) {
      // Component has a variable not in global Styles
      differences.push(`// ${key}: ${val} (component-specific)`);
    }
  }

  if (differences.length === 0) {
    L.push(`// All variables match global theme.css tokens. No overrides needed.`);
    L.push(`// Referenced variables: ${Object.keys(compVars).join(', ')}`);
  } else {
    L.push(`// Differences from global tokens:`);
    L.push(...differences);
    L.push('');
    L.push(`// TODO: Add specific Less/CSS overrides for these differences if needed.`);
  }

  return L.join('\n');
}

// ── Input Mode (Legacy) — Figma Design Tokens JSON Export ────────────

// Types for Figma Design Tokens plugin JSON structure
interface FigmaColorValue {
  hex: string;
  alpha: number;
  components: [number, number, number];
}

type FigmaValue = number | string | FigmaColorValue;

interface FigmaVarNode {
  $type: string;
  $value: FigmaValue;
  $extensions?: Record<string, unknown>;
}

interface FigmaTree {
  [key: string]: FigmaVarNode | FigmaTree | string | number | undefined;
}

interface ExportData {
  palettes: Record<string, Record<string, string>>;
  semantic: Record<string, FigmaTree>;
  typography: FigmaTree;
  spacing: FigmaTree;
  radius: FigmaTree;
}

function _hexToRgb(hex: string): { r: number; g: number; b: number; a: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: 1,
  };
}

function alphaBlend(
  fg: { r: number; g: number; b: number },
  alpha: number,
  bg: [number, number, number],
): { r: number; g: number; b: number; a: number } {
  return {
    r: Math.round(fg.r * alpha + bg[0] * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg[1] * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg[2] * (1 - alpha)),
    a: 1,
  };
}

function isColorValue(v: unknown): v is FigmaColorValue {
  return (
    typeof v === 'object' &&
    v !== null &&
    'hex' in v &&
    'alpha' in v
  );
}

function resolveColor(
  node: FigmaVarNode | undefined,
  bg: [number, number, number],
  fallback: string = '0, 0, 0',
): string {
  if (!node) return fallback;
  const val = node.$value;
  if (typeof val === 'string') return rgbStr(_hexToRgb(val));
  if (isColorValue(val)) {
    const fg = _hexToRgb(val.hex);
    if (val.alpha < 1) return rgbStr(alphaBlend(fg, val.alpha, bg));
    return rgbStr(fg);
  }
  if (typeof val === 'number') return `${val}`;
  return fallback;
}

function walkTree(
  tree: FigmaTree,
  path: string[],
): FigmaVarNode | undefined {
  let node: unknown = tree;
  for (const key of path) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  if (
    typeof node === 'object' &&
    node !== null &&
    '$value' in node
  ) {
    return node as FigmaVarNode;
  }
  return undefined;
}

const PALETTE_MAP: [string, string][] = [
  ['brand', 'primary'],
  ['success', 'success'],
  ['warning', 'warning'],
  ['error', 'danger'],
  ['information', 'link'],
];

const TEXT_MAP: [string[], string][] = [
  [['文本颜色', 'text-color-primary'], 'text-1'],
  [['文本颜色', 'text-color-secondary'], 'text-2'],
  [['文本颜色', 'text-color-placeholder'], 'text-3'],
  [['文本颜色', 'text-color-disabled'], 'text-4'],
];

const BG_MAP: [string[], string][] = [
  [['背景色', 'bg-color-page'], 'bg-1'],
  [['背景色', 'bg-color-container'], 'bg-2'],
  [['背景色', 'bg-color-secondarycontainer'], 'bg-3'],
  [['背景色', 'bg-color-component'], 'bg-4'],
  [['背景色', 'bg-color-secondarycomponent'], 'bg-5'],
];

const FILL_MAP: [string[], string][] = [
  [['背景色', 'bg-color-component-disabled'], 'fill-1'],
  [['背景色', 'bg-color-component'], 'fill-2'],
  [['背景色', 'bg-color-component-hover'], 'fill-3'],
  [['背景色', 'bg-color-component-active'], 'fill-4'],
];

async function syncViaInput(inputDir: string) {
  console.log('Reading Figma Design Tokens export from:', inputDir);
  const data = loadExportData(inputDir);
  const modeCount = Object.keys(data.palettes).length;
  console.log(`Loaded ${modeCount} modes, ${Object.keys(data.semantic).length} semantic sets`);
  const css = generateCSSFromExport(data);
  const outputPath = path.resolve('src', 'theme.css');
  fs.writeFileSync(outputPath, css, 'utf-8');
  console.log(`Written: ${outputPath} (${css.split('\n').length} lines)`);
  console.log('Sync complete!');
}

function loadExportData(inputDir: string): ExportData {
  const palettesFile = findFile(inputDir, ['值.tokens 3.json', 'colors.tokens.json']);
  const palettesRaw: Record<string, unknown> = palettesFile
    ? JSON.parse(fs.readFileSync(palettesFile, 'utf-8'))
    : {};

  const palettes: Record<string, Record<string, string>> = {};
  const modeData = (palettesRaw.mode || palettesRaw) as Record<string, unknown>;
  for (const mode of Object.keys(modeData)) {
    if (mode.startsWith('$')) continue;
    palettes[mode] = {};
    const modeVars = modeData[mode] as Record<string, FigmaVarNode>;
    for (const [key, varNode] of Object.entries(modeVars)) {
      if (key.startsWith('$')) continue;
      const val = varNode.$value;
      if (isColorValue(val)) palettes[mode][key] = val.hex;
    }
  }

  const semantic: Record<string, FigmaTree> = {};
  const basicDir = path.join(inputDir, 'basic 基础');
  for (const mode of ['light', 'dark']) {
    const f = findFile(basicDir, [`${mode}.tokens.json`]);
    if (f) semantic[mode] = JSON.parse(fs.readFileSync(f, 'utf-8'));
  }

  const typoFile = findFile(inputDir, ['值.tokens.json', 'typography.tokens.json']);
  const typography = typoFile
    ? JSON.parse(fs.readFileSync(typoFile, 'utf-8'))
    : {};

  const spacingFile = findFile(inputDir, [
    '值.tokens 2.json',
    'spacing.tokens.json',
  ]);
  const spacing = spacingFile
    ? JSON.parse(fs.readFileSync(spacingFile, 'utf-8'))
    : {};

  const radiusFile = findFile(inputDir, [
    'Mode 1.tokens 3.tokens.json',
    'radius.tokens.json',
  ]);
  const radius = radiusFile
    ? JSON.parse(fs.readFileSync(radiusFile, 'utf-8'))
    : {};

  return { palettes, semantic, typography, spacing, radius };
}

function findFile(
  dir: string,
  candidates: string[],
): string | null {
  if (!fs.existsSync(dir)) return null;
  for (const name of candidates) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
  }
  try {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      for (const cand of candidates) {
        if (entry.includes(cand.replace(/\.json$/, '')) && entry.endsWith('.json')) {
          return path.join(dir, entry);
        }
      }
    }
  } catch { /* ignore */ }
  return null;
}

function generateCSSFromExport(data: ExportData): string {
  const L: string[] = [];
  const now = new Date().toISOString();

  L.push('/* theme.css — Arco native + project CSS variables */');
  L.push('/* Source: Figma Design System V2.0 (light + dark) */');
  L.push(`/* Generated: ${now} via --input mode */`);
  L.push('');

  for (const [mode, selector, bg] of [
    ['light', 'body', LIGHT_BG],
    ['dark', "body[arco-theme='dark']", DARK_BG],
  ] as const) {
    L.push(`${selector} {`);
    L.push('  /* ═══════════════════════════════════════════ */');
    L.push(`  /* ${mode === 'light' ? 'LIGHT' : 'DARK'} MODE */`);
    L.push('  /* ═══════════════════════════════════════════ */');
    L.push('');

    // ── 10-step color palettes ──
    const modePalettes = data.palettes[mode] || {};
    for (const [figmaName, arcoName] of PALETTE_MAP) {
      L.push(`  /* ── Palette: ${arcoName} ── */`);
      let hasAny = false;
      for (let i = 1; i <= 10; i++) {
        const key = `${figmaName}-color-${i}`;
        const altKey = figmaName === 'information' && i === 10 ? 'Color 10' : null;
        const hex = modePalettes[key] || (altKey ? modePalettes[altKey] : null);
        if (hex) {
          L.push(`  --arc-color-${arcoName}-${i}: ${rgbStr(_hexToRgb(hex))};`);
          hasAny = true;
        }
      }
      if (hasAny) L.push('');
    }

    // ── Text ──
    L.push('  /* ── Text ── */');
    for (const [treePath, arcoKey] of TEXT_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --color-${arcoKey}: ${val};`);
    }
    for (const [treePath, arcoKey] of TEXT_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --arc-color-${arcoKey}: ${val};`);
    }
    L.push('');

    // ── Background ──
    L.push('  /* ── Background ── */');
    for (const [treePath, arcoKey] of BG_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --color-${arcoKey}: ${val};`);
    }
    for (const [treePath, arcoKey] of BG_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --arc-color-${arcoKey}: ${val};`);
    }
    L.push('  --color-bg-white: 255, 255, 255;');
    L.push('  --color-bg-popup: 255, 255, 255;');
    L.push('');

    // ── Fill ──
    L.push('  /* ── Fill ── */');
    for (const [treePath, arcoKey] of FILL_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --color-${arcoKey}: ${val};`);
    }
    for (const [treePath, arcoKey] of FILL_MAP) {
      const node = walkTree(data.semantic[mode] || {}, treePath);
      const val = resolveColor(node, bg);
      L.push(`  --arc-color-${arcoKey}: ${val};`);
    }
    L.push('');

    // ── Secondary (component states) ──
    L.push('  /* ── Secondary (component states) ── */');
    const disabledNode = walkTree(data.semantic[mode] || {}, ['背景色', 'bg-color-component-disabled']);
    const activeNode = walkTree(data.semantic[mode] || {}, ['背景色', 'bg-color-component-active']);
    const secondaryBg = resolveColor(disabledNode, bg, '238, 238, 238');
    const secondaryActive = resolveColor(activeNode, bg, '166, 166, 166');
    L.push(`  --color-secondary: ${secondaryBg};`);
    L.push(`  --color-secondary-hover: ${secondaryBg};`);
    L.push(`  --color-secondary-active: ${secondaryActive};`);
    L.push(`  --color-secondary-disabled: ${secondaryBg};`);
    L.push('');

    // ── Border ──
    L.push('  /* ── Border ── */');
    const border1Node = walkTree(data.semantic[mode] || {}, ['分割线', 'border-level-1-color']);
    const border1Val = resolveColor(border1Node, bg, '232, 232, 232');
    L.push('  --color-border-1: var(--color-fill-2);');
    L.push('  --color-border-2: var(--color-fill-2);');
    L.push(`  --color-border-3: ${border1Val};`);
    L.push(`  --color-border-4: ${border1Val};`);
    L.push('  --arc-color-border-1: var(--color-fill-2);');
    L.push('  --arc-color-border-2: var(--color-fill-2);');
    L.push(`  --arc-color-border-3: ${border1Val};`);
    L.push(`  --arc-color-border-4: ${border1Val};`);
    L.push('');

    // ── Border Radius (only in light mode) ──
    if (mode === 'light') {
      L.push('  /* ── Border Radius ── */');
      L.push('  --border-radius-none: 0;');
      const radiusMap: Record<string, string> = {
        'radius-small': 'small',
        'radius-default': 'medium',
        'radius-medium': 'large',
        'radius-large': 'xlarge',
      };
      for (const [figmaKey, arcoName] of Object.entries(radiusMap)) {
        const rNode = data.radius[figmaKey] as FigmaVarNode | undefined;
        if (rNode && typeof rNode.$value === 'number') {
          L.push(`  --border-radius-${arcoName}: ${rNode.$value}px;`);
        }
      }
      L.push('');
    }

    // ── Typography (only in light mode) ──
    if (mode === 'light') {
      L.push('  /* ── Typography ── */');
      const fontChinese =
        ((data.typography.font as FigmaTree)?.chinese as FigmaVarNode)
          ?.$value || 'Noto Sans SC';
      const fontEnglish =
        ((data.typography.font as FigmaTree)?.english as FigmaVarNode)
          ?.$value || 'Poppins';
      const fontNumbers =
        ((data.typography.font as FigmaTree)?.numbers as FigmaVarNode)
          ?.$value || 'Roboto';
      L.push(`  --arc-font-family: "${fontChinese}", "${fontEnglish}", ${fontNumbers}, sans-serif;`);
      L.push('');

      L.push('  /* Font Sizes */');
      const fontSizeMap: Record<string, string> = {
        'body-small': 'body-1',
        'body-medium': 'body-2',
        'body-large': 'body-3',
        'title-large': 'title-1',
        'title-extralarge': 'title-2',
        'headline-medium': 'headline-1',
      };
      const fsNode = (data.typography['font-size'] || {}) as FigmaTree;
      for (const [figmaKey, arcoName] of Object.entries(fontSizeMap)) {
        const n = fsNode[figmaKey] as FigmaVarNode | undefined;
        if (n && typeof n.$value === 'number') {
          L.push(`  --arc-font-size-${arcoName}: ${n.$value}px;`);
        }
      }
      L.push('');

      L.push('  /* Line Heights */');
      const lhNode = (data.typography['line-height'] || {}) as FigmaTree;
      for (const [figmaKey, arcoName] of Object.entries(fontSizeMap)) {
        const n = lhNode[figmaKey] as FigmaVarNode | undefined;
        if (n && typeof n.$value === 'number') {
          L.push(`  --arc-line-height-${arcoName}: ${n.$value}px;`);
        }
      }
      L.push('');
    }

    // ── Spacing (only in light mode) ──
    if (mode === 'light') {
      L.push('  /* ── Spacing ── */');
      const sizeNode = (data.spacing.size || {}) as FigmaTree;
      for (let i = 0; i < 8; i++) {
        const sizeKey = `${i + 2}`;
        const sNode = sizeNode[sizeKey] as FigmaVarNode | undefined;
        if (sNode && typeof sNode.$value === 'number') {
          L.push(`  --arc-spacing-${i + 1}: ${sNode.$value}px;`);
        }
      }
      L.push('');
    }

    // ── Overlay & Special ──
    L.push('  /* ── Overlay & Special ── */');
    const maskNode = walkTree(data.semantic[mode] || {}, ['遮罩', 'mask-background']);
    L.push(`  --color-spin-layer-bg: ${resolveColor(maskNode, bg, '255, 255, 255, 0.96')};`);
    const tooltipBg = resolveColor(
      walkTree(data.semantic[mode] || {}, ['Gray 中性', 'Gray4-边框']),
      bg,
      '75, 75, 75',
    );
    L.push(`  --color-tooltip-bg: ${tooltipBg};`);
    L.push('  --color-menu-dark-bg: #232324;');
    L.push('  --color-menu-light-bg: #ffffff;');
    L.push('  --color-menu-dark-hover: var(--color-fill-2);');
    L.push('  --color-white: #ffffff;');
    L.push('');

    // ── Scrollbar ──
    L.push('  /* ── Scrollbar ── */');
    const sbColor = walkTree(data.semantic[mode] || {}, ['滚动条', 'scrollbar-color']);
    const sbHover = walkTree(data.semantic[mode] || {}, ['滚动条', 'scrollbar-hover-color']);
    const sbTrack = walkTree(data.semantic[mode] || {}, ['滚动条', 'scroll-track-color']);
    const trackVal = sbTrack?.$value;
    let trackRgb: [number, number, number] = [...bg];
    if (isColorValue(trackVal)) {
      const p = _hexToRgb(trackVal.hex);
      trackRgb = [p.r, p.g, p.b];
    } else if (typeof trackVal === 'string') {
      const p = _hexToRgb(trackVal);
      trackRgb = [p.r, p.g, p.b];
    }
    L.push(`  --color-scrollbar: ${resolveColor(sbColor, trackRgb)};`);
    L.push(`  --color-scrollbar-hover: ${resolveColor(sbHover, trackRgb)};`);
    L.push(`  --color-scrollbar-track: ${rgbStr({ r: trackRgb[0], g: trackRgb[1], b: trackRgb[2], a: 1 })};`);
    L.push('');

    L.push('}');
    L.push('');
  }

  return L.join('\n');
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const inputIdx = args.indexOf('--input');

  if (inputIdx !== -1) {
    const inputDir = args[inputIdx + 1];
    if (!inputDir || !fs.existsSync(inputDir)) {
      console.error(`Error: input directory not found: ${inputDir}`);
      process.exit(1);
    }
    await syncViaInput(inputDir);
    return;
  }

  // MCP mode (default)
  console.log('🔌 Connecting to Figma MCP server...');
  await mcpCall('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'starbucks-ui-sync', version: '2.0' },
  });
  await mcpCall('notifications/initialized', {});
  console.log('✅ Connected.\n');

  // Phase 1: Extract global tokens
  console.log(`📋 Phase 1: Extracting global tokens from Styles page (${STYLES_NODE_ID})...`);
  const globalVars = await mcpGetVariableDefs(STYLES_NODE_ID);
  const varCount = Object.keys(globalVars).length;
  console.log(`   Got ${varCount} variables\n`);

  if (varCount === 0) {
    console.error('❌ No variables returned. Is Figma desktop open with the Design System file?');
    process.exit(1);
  }

  // Phase 2: Generate theme.css
  console.log('📝 Phase 2: Generating theme.css...');
  const themePath = path.resolve('src', 'theme.css');
  const existingCSS = fs.existsSync(themePath) ? fs.readFileSync(themePath, 'utf-8') : '';
  const css = generateThemeCSS(globalVars, existingCSS);
  fs.writeFileSync(themePath, css, 'utf-8');
  console.log(`   Written: ${themePath} (${css.split('\n').length} lines)\n`);

  // Phase 3: Generate figma-overrides.less
  console.log('📝 Phase 3: Generating figma-overrides.less...');
  const less = generateLessOverrides(globalVars);
  const lessPath = path.resolve('src', 'figma-overrides.less');
  fs.writeFileSync(lessPath, less, 'utf-8');
  console.log(`   Written: ${lessPath} (${less.split('\n').length} lines)\n`);

  // Phase 4: Extract component tokens
  console.log(`📋 Phase 4: Extracting component tokens (${COMPONENT_LIST.length} components)...`);
  const overridesDir = path.resolve('src', 'overrides');
  if (!fs.existsSync(overridesDir)) fs.mkdirSync(overridesDir, { recursive: true });

  let successCount = 0;
  let emptyCount = 0;

  for (const entry of COMPONENT_LIST) {
    process.stdout.write(`   ${entry.name} (${entry.nodeId})... `);
    try {
      await delay(200); // rate-limit cooldown
      const compVars = await mcpGetVariableDefs(entry.nodeId);
      const overrideContent = generateComponentOverride(entry, compVars, globalVars);
      const overridePath = path.join(overridesDir, `${entry.name}.less`);
      fs.writeFileSync(overridePath, overrideContent, 'utf-8');

      if (Object.keys(compVars).length === 0) {
        console.log('empty (inherits global)');
        emptyCount++;
      } else {
        console.log(`${Object.keys(compVars).length} vars`);
        successCount++;
      }
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  console.log(`\n   Done: ${successCount} with vars, ${emptyCount} inherited from global`);

  // Phase 5: Generate _index.less aggregator
  console.log('\n📝 Phase 5: Generating overrides/_index.less...');
  const indexLines: string[] = [
    '// _index.less — Aggregated component overrides',
    '// Auto-generated via MCP sync. DO NOT EDIT MANUALLY.',
    '',
  ];
  for (const entry of COMPONENT_LIST) {
    indexLines.push(`@import './${entry.name}.less';`);
  }
  fs.writeFileSync(path.join(overridesDir, '_index.less'), indexLines.join('\n'), 'utf-8');
  console.log('   Written: overrides/_index.less\n');

  console.log('✅ Sync complete!');
}

main().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
