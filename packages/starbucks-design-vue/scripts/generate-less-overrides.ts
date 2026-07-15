#!/usr/bin/env tsx
/**
 * Generate figma-overrides.less from Figma Design Tokens export files.
 *
 * Usage: tsx scripts/generate-less-overrides.ts [--input <dir>]
 *
 * Reads Figma Design Tokens JSON exports and produces a Less variable
 * override file that can be used to compile Arco component styles with
 * Figma design values.
 *
 * The script reads:
 *   - 值.tokens 2.json   → size, comp-size, comp-padding, comp-margin → @size-*, @spacing-*
 *   - 值.tokens.json     → font-family, font-size, line-height         → @font-size-*
 *   - Mode 1.tokens 3.tokens.json → border-radius                     → @radius-*
 *
 * IMPORTANT: We only override the SEMANTIC aliases (@size-default, @spacing-*, @font-size-*),
 * NOT the raw numeric scale (@size-1, @size-2, ...). This is because Figma and Arco use
 * different numbering for their size scales, but the semantic values are the same.
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface TokenValue {
  $type?: string
  $value: string | number | { hex: string; alpha?: number }
}

interface TokenNode {
  [key: string]: TokenNode | TokenValue | undefined
  $type?: string
  $value?: string | number
  $extensions?: unknown
}

interface FigmaData {
  size: Record<string, TokenNode>
  typography: TokenNode
  radius: Record<string, TokenNode>
}

// ── Config ───────────────────────────────────────────────────────────

const FIGMA_BASE = '/Users/zwu/Downloads/figma'

// Mapping: Figma font-size key → Arco Less variable (one-to-one, no duplicates)
const FONT_SIZE_MAP: Array<[string, string]> = [
  ['body-small', '@font-size-body-1'],
  ['body-medium', '@font-size-body-3'],
  ['body-large', '@font-size-title-1'],
  ['title-large', '@font-size-title-2'],
  ['title-extralarge', '@font-size-title-2'],
  ['headline-medium', '@font-size-title-3'],
]

// Mapping: Figma radius key → Arco Less border-radius variable (one-to-one)
const RADIUS_MAP: Array<[string, string]> = [
  ['radius-small', '@border-radius-small'],
  ['radius-default', '@border-radius-medium'],
  ['radius-medium', '@border-radius-medium'],
  ['radius-large', '@border-radius-large'],
  ['radius-round', '@border-radius-circle'],
]

// ── Helpers ──────────────────────────────────────────────────────────

function walk(node: TokenNode, ...keys: string[]): TokenNode {
  let current: TokenNode | undefined = node
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key] as TokenNode | undefined
    } else {
      return {}
    }
  }
  return current || {}
}

function getValue(node: TokenNode | undefined): string | number | undefined {
  if (!node) return undefined
  if (typeof node.$value === 'string' || typeof node.$value === 'number') {
    return node.$value
  }
  return undefined
}

function px(val: string | number | undefined): string | undefined {
  if (val === undefined || val === null) return undefined
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(n)) return undefined
  return `${n}px`
}

// ── Load data ────────────────────────────────────────────────────────

function loadData(inputDir: string): FigmaData {
  const sizeFile = path.join(inputDir, '值.tokens 2.json')
  const typoFile = path.join(inputDir, '值.tokens.json')
  const radiusFile = path.join(inputDir, 'Mode 1.tokens 3.tokens.json')

  if (!fs.existsSync(sizeFile)) {
    throw new Error(`Size/spacing file not found: ${sizeFile}`)
  }
  if (!fs.existsSync(typoFile)) {
    throw new Error(`Typography file not found: ${typoFile}`)
  }

  console.log(`Loading: ${sizeFile}`)
  const sizeData = JSON.parse(fs.readFileSync(sizeFile, 'utf-8'))

  console.log(`Loading: ${typoFile}`)
  const typoData = JSON.parse(fs.readFileSync(typoFile, 'utf-8'))

  let radiusData: Record<string, TokenNode> = {}
  if (fs.existsSync(radiusFile)) {
    console.log(`Loading: ${radiusFile}`)
    radiusData = JSON.parse(fs.readFileSync(radiusFile, 'utf-8'))
  }

  return {
    size: sizeData as Record<string, TokenNode>,
    typography: typoData as TokenNode,
    radius: radiusData,
  }
}

// ── Generate Less ─────────────────────────────────────────────────────

function generateLess(data: FigmaData): string {
  const lines: string[] = [
    '// figma-overrides.less',
    '// Auto-generated from Figma Design Tokens export',
    `// Generated: ${new Date().toISOString().split('T')[0]}`,
    '//',
    '// This file overrides Arco Design global Less variables with',
    '// Figma Design System V2.0 values BEFORE component compilation.',
    '// DO NOT EDIT MANUALLY.',
    '',
  ]

  // ── 0. Load size scale first (needed by other sections) ──
  const sizeScale = data.size['size'] as Record<string, TokenNode> | undefined

  // ── 1. Component Size Aliases ──
  // Figma's comp-size scale values can be mapped to Arco size aliases.
  // Default Arco values: mini=24px, small=28px, default=32px, large=36px.
  // Only override if Figma values differ from Arco defaults.
  const compSize = data.size['comp-size'] as Record<string, TokenNode> | undefined
  if (compSize && sizeScale) {
    lines.push('// ── Component Size Aliases (from Figma comp-size) ──')
    lines.push('// Default Arco: mini=24px, small=28px, default=32px, large=36px')
    // Map Figma comp-size keys to their resolved values for reference
    for (const key of ['xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']) {
      const node = compSize[key]
      if (!node) continue
      const val = node.$value as string
      if (!val || !val.startsWith('{')) continue
      const match = val.match(/\{size\.(\d+)\}/)
      if (match) {
        const sizeNode = sizeScale[match[1]]
        if (sizeNode) {
          const resolved = px(sizeNode.$value as number)
          if (resolved) {
            lines.push(`// Figma comp-size.${key}: ${resolved}`)
          }
        }
      }
    }
    lines.push('// Uncomment to override Arco size defaults:')
    lines.push('// @size-mini: 24px;   // Figma comp-size.xxs')
    lines.push('// @size-small: 28px;  // Figma comp-size.s')
    lines.push('// @size-default: 32px; // Figma comp-size.m')
    lines.push('// @size-large: 36px;  // Figma comp-size.l')
    lines.push('')
  }

  // ── 2. Spacing Scale ──
  // Map Figma size.1..16 → Arco @spacing-1..spacing-16
  lines.push('// ── Spacing Scale (from Figma size.*) ──')
  if (sizeScale) {
    for (let i = 1; i <= 16; i++) {
      const node = sizeScale[String(i)]
      if (!node) continue
      const val = px(node.$value as number)
      if (!val) continue
      lines.push(`@spacing-${i}: ${val};  // Figma size.${i}`)
    }
  }
  lines.push('')

  // ── 3. Component Padding ──
  lines.push('// ── Component Padding LR (from Figma comp-paddingLR) ──')
  const padLR = data.size['comp-paddingLR'] as Record<string, TokenNode> | undefined
  if (padLR) {
    for (const [key, node] of Object.entries(padLR)) {
      if (key.startsWith('$')) continue
      const val = node.$value as string
      if (!val) continue
      const match = val.match(/\{size\.(\d+)\}/)
      if (match) {
        const sizeNode = sizeScale?.[match[1]]
        if (sizeNode) {
          const resolved = px(sizeNode.$value as number)
          if (resolved) {
            lines.push(`// @comp-paddingLR-${key}: ${resolved};  // Figma`)
          }
        }
      }
    }
  }
  lines.push('')

  // ── 4. Font Sizes ──
  lines.push('// ── Font Sizes (from Figma font-size) ──')
  const fontSizeNode = walk(data.typography, 'font-size')
  if (fontSizeNode && typeof fontSizeNode === 'object') {
    const seen = new Set<string>()
    for (const [figmaKey, arcoVar] of FONT_SIZE_MAP) {
      if (seen.has(arcoVar)) continue // skip duplicate mappings (keep first)
      const node = (fontSizeNode as Record<string, TokenNode>)[figmaKey]
      if (!node) continue
      const val = px(node.$value as number)
      if (!val) continue
      seen.add(arcoVar)
      lines.push(`${arcoVar}: ${val};  // Figma font-size.${figmaKey}`)
    }
  }
  lines.push('')

  // ── 5. Font Family ──
  lines.push('// ── Font Family (from Figma font) ──')
  const fontZhNode = walk(data.typography, 'font', 'chinese')
  const fontEnNode = walk(data.typography, 'font', 'english')
  const fontNuNode = walk(data.typography, 'font', 'numbers')
  const zhFont = getValue(fontZhNode) || 'Noto Sans SC'
  const enFont = getValue(fontEnNode) || 'Poppins'
  const nuFont = getValue(fontNuNode) || 'Roboto'
  lines.push(`@font-family: "${zhFont}", "${enFont}", ${nuFont}, sans-serif;  // Figma`)
  lines.push('')

  // ── 6. Line Height ──
  lines.push('// ── Line Heights (from Figma line-height) ──')
  const lineHeightNode = walk(data.typography, 'line-height')
  if (lineHeightNode && typeof lineHeightNode === 'object') {
    const lhSize = fontSizeNode as Record<string, TokenNode> | undefined
    for (const figmaKey of Object.keys(FONT_SIZE_MAP)) {
      const node = (lineHeightNode as Record<string, TokenNode>)[figmaKey]
      if (!node) continue
      const val = px(node.$value as number)
      if (!val) continue
      lines.push(`// @line-height-${figmaKey}: ${val};  // Figma (reference only, body line-height is set separately)`)
    }
  }
  lines.push('')

  // ── 7. Border Radius (compile-time override) ──
  lines.push('// ── Border Radius (from Figma) ──')
  const seenRadius = new Set<string>()
  for (const [figmaKey, arcoVar] of RADIUS_MAP) {
    if (seenRadius.has(arcoVar)) continue
    const node = data.radius[figmaKey]
    if (!node) continue
    const val = node.$value as number
    if (val === undefined) continue
    seenRadius.add(arcoVar)
    lines.push(`${arcoVar}: ${val}px;  // Figma ${figmaKey}`)
  }
  lines.push('')

  return lines.join('\n')
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  const inputIdx = args.indexOf('--input')
  const inputDir = inputIdx >= 0 ? args[inputIdx + 1] : FIGMA_BASE

  console.log(`Figma export directory: ${inputDir}`)
  const data = loadData(inputDir)
  const less = generateLess(data)

  const outputPath = path.join(__dirname, '..', 'src', 'figma-overrides.less')
  fs.writeFileSync(outputPath, less, 'utf-8')
  console.log(`✓ Generated: ${outputPath}`)
  console.log(`  ${less.split('\n').length} lines`)
}

main()
