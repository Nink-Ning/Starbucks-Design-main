// scripts/figma-to-arco/types.ts

// ── Figma API 原始数据类型 ──

export interface FigmaVariableValue {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  // 数字变量
  value?: number;
  // 字符串变量
  text?: string;
  // 别名引用
  type?: 'VARIABLE_ALIAS';
  id?: string;
}

export interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: Record<string, FigmaVariableValue>;
  resolvedValuesByMode?: Record<string, FigmaVariableValue>;
  variableCollectionId: string;
}

export interface FigmaVariableMode {
  modeId: string;
  name: string;
}

export interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: FigmaVariableMode[];
}

export interface FigmaVariablesResponse {
  status: number;
  error?: boolean;
  message?: string;
  meta?: {
    variables: FigmaVariable[];
    variableCollections: Record<string, FigmaVariableCollection>;
  };
}

export interface FigmaStyle {
  key: string;
  node_id: string;
  name: string;
  style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  description: string;
}

export interface FigmaStyleDetail {
  key: string;
  name: string;
  styleType: string;
  fillPaints?: Array<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
    opacity?: number;
  }>;
  // 文字样式
  fontSize?: number;
  fontWeight?: number;
  fontPostScriptName?: string;
  lineHeightPx?: number;
  lineHeightPercent?: number;
  letterSpacing?: number;
  textDecoration?: string;
  // 效果样式
  effects?: Array<{
    type: string;
    radius?: number;
    offset?: { x: number; y: number };
    color?: { r: number; g: number; b: number; a: number };
    spread?: number;
    visible?: boolean;
  }>;
}

// ── 内部数据结构 ──

/** 提取并扁平化后的 token */
export interface TokenEntry {
  /** Figma 原始名称（如 "Brand Colors/brand/primary/600"） */
  figmaName: string;
  /** Figma 原始路径片段 */
  figmaPath: string[];
  /** Figma collection 名称 */
  collectionName: string;
  /** Figma variable ID（仅 variables 来源有值，用于别名解析） */
  id?: string;
  /** Figma 原始 resolvedType（如 'COLOR' | 'FLOAT' | 'STRING'，用于类型消歧） */
  figmaResolvedType?: string;
  /** token 类型 */
  type: 'color' | 'dimension' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'fontFamily' | 'shadow' | 'borderRadius' | 'spacing' | 'string';
  /** 各 mode 下的原始值（modeName → rawValue） */
  valuesByMode: Record<string, unknown>;
  /** 父 collection 的 mode 映射（modeId → modeName） */
  modeMap: Record<string, string>;
  /** 是否为别名引用 */
  isAlias: boolean;
  /** 别名目标 ID（如果是别名） */
  aliasTargetId?: string;
  /** 来源：variables 还是 styles */
  source: 'variables' | 'styles';
}

// ── 映射配置类型 ──

export interface MappingConfig {
  /** Figma collection → Arco token 前缀（fallback 规则） */
  collections: Record<string, string>;
  /** 精确映射：Figma 全路径 → Arco token 名称 */
  tokens: Record<string, string>;
  /** 值转换选项 */
  transforms: {
    rgba_to_hex: boolean;
    px_to_rem: boolean;
    opacity_to_alpha: boolean;
  };
  /** Figma mode 名称 → Arco 主题标识 */
  modes: Record<string, string>;
  /** 输出配置 */
  output: {
    /** 主题包名称 */
    packageName: string;
    /** 输出目录 */
    dir: string;
  };
}

// ── 输出类型 ──

/** 转换后的 token（Arco 命名，已解析值） */
export interface ResolvedToken {
  /** Arco token 名称（如 "primary-6"、"color-text-1"） */
  arcoName: string;
  /** 类型 */
  type: TokenEntry['type'];
  /** 各主题模式下的解析值（theme → CSS 值字符串） */
  valuesByTheme: Record<string, string>;
  /** 属于哪个组件（全局 token 为 null，组件 token 为组件名） */
  component: string | null;
}
