// scripts/figma-to-arco/mapping-engine.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import type { MappingConfig, TokenEntry } from './types';

/** 加载 YAML 映射配置 */
export function loadMapping(configPath: string): MappingConfig {
  if (!fs.existsSync(configPath)) {
    throw new Error(
      `映射配置文件不存在: ${configPath}\n` +
        `请参考模板创建: scripts/figma-to-arco/arco-theme-mapping.example.yml`
    );
  }

  const raw = fs.readFileSync(configPath, 'utf-8');
  const config = yaml.load(raw) as MappingConfig;

  // 验证必填字段
  if (!config.output?.packageName) {
    throw new Error('映射配置缺少 output.packageName');
  }

  return config;
}

/**
 * 将 Figma 路径转换为 kebab-case token 名称片段
 * 例: "Text Colors/text/primary" → ["color-text", "primary"]
 */
function figmaPathToArcoParts(
  entry: TokenEntry,
  collectionRule: string | undefined
): string[] {
  // 取 collection 名之后的路径部分
  const parts = [...entry.figmaPath];

  // 如果有 collection fallback 规则，用它替换第一段
  if (collectionRule && parts.length > 0) {
    parts[0] = collectionRule;
  }

  // 全部转 kebab-case
  return parts.map(p =>
    p
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

/**
 * 将 Figma token 名称映射为 Arco token 名称。
 * 返回 null 表示无法映射（需要用户补充配置）。
 */
export function mapTokenName(
  entry: TokenEntry,
  config: MappingConfig
): string | null {
  // 1. 精确映射优先
  if (config.tokens[entry.figmaName]) {
    return config.tokens[entry.figmaName];
  }

  // 也尝试匹配不区分大小写
  const exactKey = Object.keys(config.tokens).find(
    k => k.toLowerCase() === entry.figmaName.toLowerCase()
  );
  if (exactKey) {
    return config.tokens[exactKey];
  }

  // 2. collections fallback
  const collectionRule = config.collections[entry.collectionName];
  if (collectionRule) {
    const parts = figmaPathToArcoParts(entry, collectionRule);
    return parts.join('-');
  }

  // 3. 无法映射
  return null;
}

/** 收集所有未匹配的 token */
export function collectUnmapped(
  entries: TokenEntry[],
  config: MappingConfig
): TokenEntry[] {
  return entries.filter(entry => mapTokenName(entry, config) === null);
}
