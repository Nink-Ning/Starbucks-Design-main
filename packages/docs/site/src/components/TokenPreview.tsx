import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '@sbux/starbucks-design-react';
import styles from './TokenPreview.module.css';

type Mode = 'light' | 'dark';

type TokenRow = {
  name: string;
  value: string;
  cssVar: string;
  description: string;
  sample?: 'color' | 'radius' | 'spacing' | 'font';
};

type TokenGroup = {
  title: string;
  rows: TokenRow[];
};

const paletteDescriptions = [
  ['6', '常规'],
  ['5', '悬浮 hover'],
  ['7', '点击 click'],
  ['4', '特殊场景'],
  ['3', '一般禁用'],
  ['2', '文字禁用'],
  ['1', '浅色/白底悬浮'],
] as const;

function paletteGroup(title: string, prefix: string): TokenGroup {
  return {
    title,
    rows: paletteDescriptions.map(([level, description]) => ({
      name: `${prefix}-${level}`,
      value: `rgb(var(--${prefix}-${level}))`,
      cssVar: `--${prefix}-${level}`,
      description,
      sample: 'color',
    })),
  };
}

const groups: TokenGroup[] = [
  paletteGroup('主色', 'primary'),
  paletteGroup('成功色', 'success'),
  paletteGroup('警告色', 'warning'),
  paletteGroup('危险色', 'danger'),
  paletteGroup('链接色', 'link'),
  {
    title: '语义主色',
    rows: [
      ['color-primary', '品牌主色'],
      ['color-primary-hover', '悬浮 hover'],
      ['color-primary-active', '点击 click'],
      ['color-primary-disabled', '禁用'],
      ['color-primary-light', '浅色背景'],
      ['color-primary-focus', '聚焦背景'],
    ].map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      sample: 'color',
    })),
  },
  {
    title: '文本色',
    rows: [
      ['color-text-1', '一级文本'],
      ['color-text-2', '二级文本'],
      ['color-text-3', '辅助文本'],
      ['color-text-4', '禁用文本'],
      ['color-text-brand', '品牌文本'],
      ['color-text-link', '链接文本'],
    ].map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      sample: 'color',
    })),
  },
  {
    title: '背景色',
    rows: [
      ['bg-color-page', '页面背景'],
      ['bg-color-container', '容器背景'],
      ['bg-color-container-hover', '容器悬浮'],
      ['bg-color-secondarycontainer', '次级容器'],
      ['bg-color-component', '组件背景'],
      ['bg-color-component-disabled', '组件禁用'],
    ].map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      sample: 'color',
    })),
  },
  {
    title: '字体',
    rows: [
      ['font-family', '默认字体栈'],
      ['fs-12', '辅助字号'],
      ['fs-14', '默认字号'],
      ['fs-16', '正文大字号'],
      ['fs-20', '小标题字号'],
      ['fs-24', '标题字号'],
      ['fs-36', '展示标题字号'],
      ['lh-20', '紧凑行高'],
      ['lh-22', '默认行高'],
      ['lh-24', '大号正文行高'],
      ['fw-regular', '常规字重'],
      ['fw-medium', '中等字重'],
      ['fw-semibold', '半粗字重'],
      ['fw-bold', '粗体字重'],
    ].map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      sample: 'font',
    })),
  },
  {
    title: '圆角',
    rows: [
      ['border-radius-xs', '极小圆角'],
      ['border-radius-sm', '小圆角'],
      ['border-radius-md', '默认圆角'],
      ['border-radius-lg', '大圆角'],
      ['border-radius-xl', '超大圆角'],
      ['border-radius-round', '胶囊圆角'],
    ].map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      sample: 'radius',
    })),
  },
  {
    title: '间距',
    rows: [1, 2, 3, 4, 5, 6, 8, 10, 12, 13, 15, 16].map((level) => ({
      name: `spacing-${level}`,
      value: `var(--spacing-${level})`,
      cssVar: `--spacing-${level}`,
      description: `尺寸 ${level}`,
      sample: 'spacing',
    })),
  },
];

function getDisplayValue(row: TokenRow) {
  return row.value;
}

function getSampleStyle(row: TokenRow): React.CSSProperties {
  if (row.sample === 'color') {
    return { ['--token-sample' as string]: getDisplayValue(row) };
  }

  if (row.sample === 'radius') {
    return { borderRadius: row.value };
  }

  if (row.sample === 'spacing') {
    return { ['--token-sample-width' as string]: row.value };
  }

  return {};
}

const colorVariableNames = groups.flatMap((group) =>
  group.rows.filter((row) => row.sample === 'color').map((row) => row.cssVar),
);

const previewVariableBindings = [
  ['--sb-docs-bg', '--bg-color-container'],
  ['--sb-docs-surface', '--bg-color-secondarycontainer'],
  ['--sb-docs-border', '--color-border-component'],
  ['--sb-docs-border-soft', '--color-border-1'],
  ['--sb-docs-text-1', '--color-text-primary'],
  ['--sb-docs-text-2', '--color-text-secondary'],
  ['--sl-color-white', '--color-text-primary'],
  ['--sl-color-gray-1', '--color-text-primary'],
  ['--sl-color-gray-2', '--color-text-secondary'],
] as const;

function restoreAttribute(element: HTMLElement, name: string, value: string | null) {
  if (value === null) element.removeAttribute(name);
  else element.setAttribute(name, value);
}

function readThemeVariables(mode: Mode, variableNames: string[]) {
  const root = document.documentElement;
  const body = document.body;
  const previous = {
    rootTheme: root.getAttribute('data-theme'),
    bodyTheme: body.getAttribute('data-theme'),
    bodyArcoTheme: body.getAttribute('data-arco-theme'),
    bodyLegacyArcoTheme: body.getAttribute('arco-theme'),
  };

  // Read the generated component-library variables in the requested mode, then
  // restore the page before the browser paints. The values are copied onto the
  // local Token preview scope; the Docs shell never changes theme.
  root.setAttribute('data-theme', mode);
  body.setAttribute('data-theme', mode);
  if (mode === 'dark') {
    body.setAttribute('data-arco-theme', 'dark');
    body.setAttribute('arco-theme', 'dark');
  } else {
    body.removeAttribute('data-arco-theme');
    body.removeAttribute('arco-theme');
  }

  const computed = getComputedStyle(body);
  const values = new Map(variableNames.map((name) => [name, computed.getPropertyValue(name).trim()]));

  restoreAttribute(root, 'data-theme', previous.rootTheme);
  restoreAttribute(body, 'data-theme', previous.bodyTheme);
  restoreAttribute(body, 'data-arco-theme', previous.bodyArcoTheme);
  restoreAttribute(body, 'arco-theme', previous.bodyLegacyArcoTheme);

  return values;
}

function readThemeColors(mode: Mode) {
  return readThemeVariables(mode, colorVariableNames);
}

function toCssColor(value: string) {
  return CSS.supports('color', value) ? value : `rgb(${value})`;
}

function applyTokenPreviewMode(mode: Mode, root: ParentNode = document) {
  const values = readThemeColors(mode);
  root.querySelectorAll<HTMLElement>('[data-token-preview-swatch]').forEach((swatch) => {
    const variableName = swatch.dataset.tokenVariable;
    const value = variableName ? values.get(variableName) : undefined;
    if (value) swatch.style.backgroundColor = toCssColor(value);
  });
}

function applyPreviewScopeMode(scope: HTMLElement, mode: Mode) {
  const sourceVariableNames = Array.from(new Set(previewVariableBindings.map(([, source]) => source)));
  const values = readThemeVariables(mode, sourceVariableNames);

  previewVariableBindings.forEach(([target, source]) => {
    const value = values.get(source);
    if (value) scope.style.setProperty(target, toCssColor(value));
  });
  scope.dataset.tokenPreviewMode = mode;
  applyTokenPreviewMode(mode, scope);
}

function waitForTransitionLayer(layer: HTMLElement) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    layer.addEventListener('animationend', finish, { once: true });
    window.setTimeout(finish, 1100);
  });
}

async function transitionTokenPreviewMode(mode: Mode, commitMode: () => void) {
  const scope = document.querySelector<HTMLElement>('[data-token-preview-scope]');
  if (!scope) {
    flushSync(commitMode);
    applyTokenPreviewMode(mode);
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  flushSync(commitMode);
  if (reduceMotion) {
    applyPreviewScopeMode(scope, mode);
    return;
  }

  scope.querySelector<HTMLElement>('[data-token-transition-layer]')?.remove();
  const layer = scope.cloneNode(true) as HTMLElement;
  layer.setAttribute('aria-hidden', 'true');
  layer.setAttribute('data-token-transition-layer', '');
  layer.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  layer.classList.add(styles.transitionLayer, mode === 'dark' ? styles.transitionToDark : styles.transitionToLight);
  applyPreviewScopeMode(layer, mode);
  scope.append(layer);

  await waitForTransitionLayer(layer);
  applyPreviewScopeMode(scope, mode);
  layer.remove();
}

export function TokenTable({ title }: { title: string }) {
  const group = groups.find((item) => item.title === title);
  if (!group) return null;

  return (
    <div className={`${styles.tableWrap} not-content`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>变量名</th>
            <th>变量值</th>
            <th>CSS变量</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row) => (
            <tr key={row.name}>
              <td>
                <span className={styles.nameCell}>
                  {row.sample === 'color' && (
                    <span
                      className={styles.swatch}
                      style={getSampleStyle(row)}
                      data-token-preview-swatch
                      data-token-variable={row.cssVar}
                    />
                  )}
                  {row.sample === 'radius' && <span className={styles.radiusSample} style={getSampleStyle(row)} />}
                  {row.sample === 'spacing' && <span className={styles.spacingSample} style={getSampleStyle(row)} />}
                  {row.sample === 'font' && <span className={styles.fontSample}>Aa</span>}
                  <span>{row.name}</span>
                </span>
              </td>
              <td className={styles.value}>{getDisplayValue(row)}</td>
              <td className={styles.cssVar}>{row.cssVar}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TokenPreviewToolbar() {
  const [mode, setMode] = useState<Mode>('light');
  const transitionInProgress = useRef(false);

  useEffect(() => {
    const scope = document.querySelector<HTMLElement>('[data-token-preview-scope]');
    if (scope) applyPreviewScopeMode(scope, 'light');
  }, []);

  const selectMode = async (nextMode: Mode) => {
    if (nextMode === mode || transitionInProgress.current) return;

    transitionInProgress.current = true;
    try {
      await transitionTokenPreviewMode(nextMode, () => setMode(nextMode));
    } finally {
      transitionInProgress.current = false;
    }
  };

  return (
    <div className={styles.toolbar} role="group" aria-label="切换 Token 预览模式">
      <Button.Group>
        <Button
          type={mode === 'light' ? 'primary' : 'default'}
          size="small"
          aria-pressed={mode === 'light'}
          onClick={() => void selectMode('light')}
        >
          Light
        </Button>
        <Button
          type={mode === 'dark' ? 'primary' : 'default'}
          size="small"
          aria-pressed={mode === 'dark'}
          onClick={() => void selectMode('dark')}
        >
          Dark
        </Button>
      </Button.Group>
    </div>
  );
}
