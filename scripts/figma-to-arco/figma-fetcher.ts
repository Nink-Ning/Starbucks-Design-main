// scripts/figma-to-arco/figma-fetcher.ts

import type {
  FigmaVariablesResponse,
  FigmaStyle,
  FigmaStyleDetail,
  FigmaVariableCollection,
  TokenEntry,
} from './types';

const FIGMA_API = 'https://api.figma.com/v1';

interface FetchOptions {
  retries?: number;
}

async function figmaGet(
  path: string,
  token: string,
  opts: FetchOptions = {}
): Promise<unknown> {
  const maxRetries = opts.retries ?? 3;
  let lastErr: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(`${FIGMA_API}${path}`, {
        headers: { 'X-Figma-Token': token },
      });

      if (res.status === 403) {
        const body = await res.text().catch(() => '');
        throw new Error(
          `Figma API 鉴权失败 (403): ${body}\n` +
            '请检查 FIGMA_TOKEN 环境变量是否正确，以及 token 是否有所需权限。\n' +
            '获取 token: https://www.figma.com/developers/api#access-tokens'
        );
      }

      if (!res.ok) {
        throw new Error(`Figma API 返回 ${res.status}: ${res.statusText}`);
      }

      return await res.json();
    } catch (err) {
      lastErr = err as Error;
      // 403 is a permanent auth failure — retrying won't help
      if (lastErr.message.includes('鉴权失败')) throw lastErr;
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`  ⚠ 请求失败，${delay / 1000}s 后重试 (${attempt + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

// ── Styles ──

function inferTokenType(styleType: string): TokenEntry['type'] {
  switch (styleType) {
    case 'FILL': return 'color';
    case 'TEXT': return 'fontSize';
    case 'EFFECT': return 'shadow';
    default: return 'string';
  }
}

function extractStyleValues(style: FigmaStyleDetail): Record<string, unknown> {
  switch (style.styleType) {
    case 'FILL': {
      // Figma Styles API 返回 node 详情时，fillPaints 在节点数据里
      // 我们只需要颜色信息
      return { fillPaints: style.fillPaints };
    }
    case 'TEXT': {
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: {
          value: style.lineHeightPercent ?? style.lineHeightPx,
          unit: style.lineHeightPercent ? 'PERCENT' : 'PIXELS',
        },
        fontFamily: style.fontPostScriptName,
        letterSpacing: style.letterSpacing,
      };
    }
    case 'EFFECT': {
      return { effects: style.effects };
    }
    default:
      return {};
  }
}

async function fetchStyles(
  fileKey: string,
  token: string
): Promise<TokenEntry[]> {
  console.log('📦 拉取 Figma Styles...');

  // Step 1: 列出所有 styles
  const stylesList = (await figmaGet(
    `/styles/${fileKey}`,
    token
  )) as { meta?: { styles: FigmaStyle[] } };

  const styles = stylesList.meta?.styles ?? [];
  console.log(`   找到 ${styles.length} 个 styles`);

  // Step 2: 逐个获取 style 详情（Styles API 需要单独请求每个 style 的节点）
  const entries: TokenEntry[] = [];
  for (const style of styles) {
    try {
      const nodeData = (await figmaGet(
        `/files/${fileKey}/nodes?ids=${style.node_id}`,
        token,
        { retries: 1 }
      )) as { nodes?: Record<string, { document: FigmaStyleDetail }> };

      const detail = nodeData.nodes?.[style.node_id]?.document;
      if (!detail) continue;

      // 跳过图片填充类型（不是 token）
      const isImageFill = detail.fillPaints?.some(
        p => p.type === 'IMAGE'
      );
      if (isImageFill) continue;

      const nameParts = style.name.split('/');
      entries.push({
        figmaName: style.name,
        figmaPath: nameParts,
        collectionName: nameParts.length > 1 ? nameParts[0] : 'Styles',
        type: inferTokenType(style.style_type),
        valuesByMode: { default: extractStyleValues(detail) },
        modeMap: { default: 'default' },
        isAlias: false,
        source: 'styles',
      });
      console.log(`   ✓ ${style.name}`);
    } catch (err) {
      console.warn(`   ⚠ 跳过 "${style.name}": ${(err as Error).message}`);
    }
  }

  return entries;
}

// ── Variables ──

function resolveVariableType(
  variable: { resolvedType: string }
): TokenEntry['type'] {
  switch (variable.resolvedType) {
    case 'COLOR': return 'color';
    case 'FLOAT': return 'dimension';
    case 'STRING': return 'string';
    default: return 'string';
  }
}

async function fetchVariables(
  fileKey: string,
  token: string
): Promise<TokenEntry[]> {
  console.log('📦 拉取 Figma Variables...');

  const data = (await figmaGet(
    `/files/${fileKey}/variables/local`,
    token
  )) as FigmaVariablesResponse;

  if (data.error) {
    throw new Error(`Figma Variables API 错误: ${data.message}`);
  }

  const variables = data.meta?.variables ?? [];
  const collections = data.meta?.variableCollections ?? {};

  console.log(`   找到 ${variables.length} 个 variables，${Object.keys(collections).length} 个 collections`);

  const entries: TokenEntry[] = [];

  for (const v of variables) {
    const collection: FigmaVariableCollection | undefined =
      collections[v.variableCollectionId];
    if (!collection) continue;

    // 构建 mode ID → mode 名称映射
    const modeMap: Record<string, string> = {};
    for (const mode of collection.modes) {
      modeMap[mode.modeId] = mode.name;
    }

    // 提取各 mode 的值
    const valuesByMode: Record<string, unknown> = {};
    const resolvedValues = v.resolvedValuesByMode ?? {};
    for (const [modeId, val] of Object.entries(resolvedValues)) {
      const modeName = modeMap[modeId] ?? modeId;
      if (val && typeof val === 'object' && 'type' in val && val.type === 'VARIABLE_ALIAS') {
        // 标记别名，稍后展开
        valuesByMode[modeName] = { __alias: val.id };
      } else {
        valuesByMode[modeName] = val;
      }
    }

    const nameParts = v.name.split('/');
    entries.push({
      id: v.id,
      figmaName: v.name,
      figmaPath: nameParts,
      collectionName: collection.name,
      figmaResolvedType: v.resolvedType,
      type: resolveVariableType(v),
      valuesByMode,
      modeMap,
      isAlias: Object.values(valuesByMode).some(
        v => typeof v === 'object' && v !== null && '__alias' in v
      ),
      source: 'variables',
    });
  }

  return entries;
}

// ── 去重合并 ──

function dedupeAndMerge(
  variables: TokenEntry[],
  styles: TokenEntry[]
): TokenEntry[] {
  // Variables 优先，Styles 补充
  const varNames = new Set(variables.map(v => v.figmaName));
  const styleSupplement = styles.filter(s => !varNames.has(s.figmaName));

  console.log(
    `   合并: ${variables.length} variables + ${styleSupplement.length} styles (去重后)`
  );
  return [...variables, ...styleSupplement];
}

// ── 公共接口 ──

export interface FigmaRawData {
  entries: TokenEntry[];
  variableCount: number;
  styleCount: number;
}

export async function fetchFigmaTokens(
  fileKey: string,
  token: string
): Promise<FigmaRawData> {
  // Fetch variables and styles in parallel; variables failure is non-fatal
  let variables: TokenEntry[] = [];
  const [variablesResult, styles] = await Promise.all([
    fetchVariables(fileKey, token).catch(err => {
      console.warn(`   ⚠ Variables API 跳过: ${(err as Error).message}`);
      return [] as TokenEntry[];
    }),
    fetchStyles(fileKey, token),
  ]);
  variables = variablesResult;

  const entries = dedupeAndMerge(variables, styles);

  return {
    entries,
    variableCount: variables.length,
    styleCount: styles.length,
  };
}
