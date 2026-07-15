// scripts/figma-to-arco/token-transformer.ts

import type { TokenEntry, MappingConfig, ResolvedToken } from './types';
import { mapTokenName, collectUnmapped } from './mapping-engine';

// ── 别名解析 ──

/**
 * 解析别名链，将所有 alias 引用替换为最终值。
 * 处理环引用检测。
 */
function resolveAliases(entries: TokenEntry[]): TokenEntry[] {
  const resolved: TokenEntry[] = entries.map(e => ({ ...e, valuesByMode: { ...e.valuesByMode } }));

  // 构建 ID → TokenEntry 索引，别名通过 Figma variable ID 引用
  const entriesById = new Map<string, TokenEntry>();
  for (const e of resolved) {
    if (e.id) entriesById.set(e.id, e);
  }

  for (const entry of resolved) {
    for (const [mode, val] of Object.entries(entry.valuesByMode)) {
      const resolvedVal = resolveValue(val, mode, entry.figmaName, entriesById, new Set());
      entry.valuesByMode[mode] = resolvedVal;
    }
    entry.isAlias = false;
  }

  return resolved;
}

function resolveValue(
  val: unknown,
  mode: string,
  currentName: string,
  entriesById: Map<string, TokenEntry>,
  visited: Set<string>
): unknown {
  if (!val || typeof val !== 'object') return val;

  const obj = val as Record<string, unknown>;
  if (!obj.__alias) return val;

  const aliasId = obj.__alias as string;

  // 环引用检测
  if (visited.has(aliasId)) {
    const parts: string[] = [];
    visited.forEach(id => parts.push(id));
    parts.push(aliasId);
    const chain = parts.join(' → ');
    throw new Error(`别名环引用检测: ${chain}`);
  }
  visited.add(aliasId);

  // 通过 ID 查找目标 entry（别名值存储的是 Figma variable UUID）
  const target = entriesById.get(aliasId);
  if (!target) return val;

  const targetVal = target.valuesByMode[mode] ?? Object.values(target.valuesByMode)[0];
  return resolveValue(targetVal, mode, target.figmaName, entriesById, visited);
}

// ── 值格式转换 ──

/** Figma rgba 对象 → hex 字符串 */
function rgbaToHex(rgba: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  const a = rgba.a ?? 1;

  if (a >= 1) {
    return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
  }
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
}

/** Figma rgba 对象 → RGB 分量字符串（用于 alpha 场景如 rgba(var(--primary-6--rgb), 0.2)） */
function rgbaToRgbComponents(rgba: { r: number; g: number; b: number }): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  return `${r}, ${g}, ${b}`;
}

/** 字重名称 → 数字映射 */
const FONT_WEIGHT_MAP: Record<string, string> = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

function fontWeightToNumber(weight: unknown): string {
  if (typeof weight === 'number') return String(weight);
  if (typeof weight === 'string') {
    const lower = weight.toLowerCase().replace(/\s+/g, '');
    return FONT_WEIGHT_MAP[lower] ?? weight;
  }
  return '400';
}

/** 单值转换 */
export function transformValue(
  val: unknown,
  type: TokenEntry['type'],
  transforms: MappingConfig['transforms']
): string {
  if (val === null || val === undefined) return '';

  switch (type) {
    case 'color': {
      if (typeof val === 'object' && 'r' in (val as object) && 'g' in (val as object) && 'b' in (val as object)) {
        const rgba = val as { r: number; g: number; b: number; a?: number };
        if (transforms.rgba_to_hex) {
          return rgbaToHex(rgba);
        }
        return rgbaToRgbComponents(rgba);
      }
      // 已经是 hex 字符串
      return String(val);
    }

    case 'fontSize':
    case 'dimension':
    case 'spacing':
    case 'borderRadius': {
      const num = typeof val === 'object' && val !== null && 'value' in val
        ? (val as { value: number }).value
        : Number(val);
      if (isNaN(num)) return String(val);
      if (transforms.px_to_rem) {
        return `${num / 16}rem`;
      }
      return `${num}px`;
    }

    case 'lineHeight': {
      if (typeof val === 'object' && val !== null) {
        const obj = val as { value: number; unit?: string };
        if (obj.unit === 'PERCENT') {
          return (obj.value / 100).toFixed(2);
        }
        return `${obj.value}px`;
      }
      return String(val);
    }

    case 'fontWeight': {
      return fontWeightToNumber(val);
    }

    case 'fontFamily': {
      return String(val).replace(/"/g, '');
    }

    case 'shadow': {
      if (Array.isArray(val)) {
        return val.map(effect => {
          const x = effect.offset?.x ?? 0;
          const y = effect.offset?.y ?? 0;
          const blur = effect.radius ?? 0;
          const spread = effect.spread ?? 0;
          const color = effect.color
            ? rgbaToHex(effect.color)
            : 'rgba(0,0,0,0.15)';
          return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
        }).join(', ');
      }
      return String(val);
    }

    default:
      return String(val);
  }
}

// ── 组件归属判断 ──

/**
 * 判断 token 是否属于某个组件。
 * 组件级 token 的 Figma 路径以组件名开头（如 "Button/..."）。
 */
function detectComponent(entry: TokenEntry): string | null {
  // 排除明显的全局 collection
  const globalCollections = [
    'Brand Colors', 'Text Colors', 'Background Colors',
    'Border Colors', 'Typography', 'Spacing', 'Radius', 'Shadow', 'Styles',
  ];

  if (globalCollections.includes(entry.collectionName)) {
    return null;
  }

  // 第一段作为可能的组件名
  const firstSegment = entry.figmaPath[0];
  if (firstSegment && !firstSegment.match(/^(color|font|spacing|radius|shadow|text|bg|border)$/i)) {
    return firstSegment.toLowerCase().replace(/\s+/g, '-');
  }

  return null;
}

// ── 公共接口 ──

export interface TransformResult {
  resolved: ResolvedToken[];
  unmapped: TokenEntry[];
}

export function transformTokens(
  entries: TokenEntry[],
  config: MappingConfig
): TransformResult {
  console.log('🔄 转换 tokens...');

  // 1. 解析别名
  console.log('   1/3 解析别名链...');
  const resolvedEntries = resolveAliases(entries);

  // 2. 映射命名 + 转换值
  console.log('   2/3 映射命名 + 转换值...');
  const modeKeys = Object.keys(config.modes);
  const resolved: ResolvedToken[] = [];

  for (const entry of resolvedEntries) {
    const arcoName = mapTokenName(entry, config);
    if (!arcoName) continue; // 未匹配的稍后报告

    // Fix 3: 对于 FLOAT 来源的 dimension 类型，通过名称启发式细化类型
    let effectiveType = entry.type;
    if (effectiveType === 'dimension') {
      const lowerArco = arcoName.toLowerCase();
      const lowerPath = entry.figmaPath.map(p => p.toLowerCase()).join(' ');
      const lowerName = entry.figmaName.toLowerCase();
      // 在 arco 名称、figma 路径、figma 全名中搜索类型关键词
      const searchSpace = `${lowerArco} ${lowerPath} ${lowerName}`;
      if (/\bfont[-_ ]?weight\b/.test(searchSpace)) {
        effectiveType = 'fontWeight';
      } else if (/\bline[-_ ]?height\b/.test(searchSpace)) {
        effectiveType = 'lineHeight';
      } else if (/\bfont[-_ ]?size\b/.test(searchSpace)) {
        effectiveType = 'fontSize';
      }
    }

    const valuesByTheme: Record<string, string> = {};

    for (const [figmaMode, arcoTheme] of Object.entries(config.modes)) {
      const rawVal = entry.valuesByMode[figmaMode];
      if (rawVal !== undefined) {
        valuesByTheme[arcoTheme] = transformValue(rawVal, effectiveType, config.transforms);
      }
    }

    // 如果 mode 映射匹配不上，取第一个可用值
    if (Object.keys(valuesByTheme).length === 0) {
      const firstVal = Object.values(entry.valuesByMode)[0];
      if (firstVal !== undefined) {
        for (const themeName of modeKeys.length > 0 ? Object.values(config.modes) : ['light']) {
          valuesByTheme[themeName] = transformValue(firstVal, effectiveType, config.transforms);
        }
      }
    }

    resolved.push({
      arcoName,
      type: effectiveType,
      valuesByTheme,
      component: detectComponent(entry),
    });
  }

  // 3. 收集未映射的
  console.log('   3/3 收集未映射 token...');
  const unmapped = collectUnmapped(entries, config);

  console.log(`   ✅ ${resolved.length} tokens 已映射，${unmapped.length} 未映射`);

  return { resolved, unmapped };
}
