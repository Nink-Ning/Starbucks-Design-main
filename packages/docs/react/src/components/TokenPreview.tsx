import React, { useState } from 'react';
import { Radio } from '@sbux/starbucks-design-react';
import styles from './TokenPreview.module.css';

type Mode = 'light' | 'dark';

type TokenRow = {
  name: string;
  value: string;
  cssVar: string;
  description: string;
  color?: string;
  sample?: 'color' | 'radius' | 'spacing' | 'font';
};

type TokenGroup = {
  title: string;
  rows: TokenRow[];
};

const tokenValues: Record<string, Record<Mode, string>> = {
  'primary-1': { light: '230, 247, 241', dark: '9, 26, 19' },
  'primary-2': { light: '207, 240, 228', dark: '12, 43, 31' },
  'primary-3': { light: '184, 233, 214', dark: '16, 64, 46' },
  'primary-4': { light: '139, 219, 187', dark: '23, 115, 82' },
  'primary-5': { light: '26, 145, 98', dark: '23, 115, 82' },
  'primary-6': { light: '0, 117, 74', dark: '0, 117, 74' },
  'primary-7': { light: '0, 106, 68', dark: '59, 181, 139' },
  'success-1': { light: '227, 249, 233', dark: '25, 58, 42' },
  'success-2': { light: '198, 243, 215', dark: '26, 66, 48' },
  'success-3': { light: '146, 218, 178', dark: '23, 83, 61' },
  'success-4': { light: '43, 164, 113', dark: '5, 148, 101' },
  'success-5': { light: '0, 136, 88', dark: '67, 175, 138' },
  'success-6': { light: '0, 108, 69', dark: '70, 191, 150' },
  'success-7': { light: '0, 83, 52', dark: '128, 210, 182' },
  'warning-1': { light: '255, 241, 233', dark: '79, 42, 29' },
  'warning-2': { light: '255, 217, 194', dark: '88, 47, 33' },
  'warning-3': { light: '255, 185, 140', dark: '115, 60, 35' },
  'warning-4': { light: '227, 115, 24', dark: '207, 110, 45' },
  'warning-5': { light: '190, 90, 0', dark: '220, 118, 51' },
  'warning-6': { light: '149, 69, 0', dark: '232, 147, 92' },
  'warning-7': { light: '113, 51, 0', dark: '236, 191, 145' },
  'danger-1': { light: '255, 240, 237', dark: '71, 35, 36' },
  'danger-2': { light: '255, 216, 210', dark: '94, 42, 45' },
  'danger-3': { light: '255, 185, 176', dark: '112, 52, 57' },
  'danger-4': { light: '246, 104, 93', dark: '160, 63, 70' },
  'danger-5': { light: '213, 73, 65', dark: '198, 71, 81' },
  'danger-6': { light: '173, 53, 47', dark: '222, 102, 112' },
  'danger-7': { light: '136, 31, 28', dark: '236, 136, 142' },
  'link-1': { light: '242, 243, 255', dark: '27, 47, 81' },
  'link-2': { light: '217, 225, 255', dark: '23, 52, 99' },
  'link-3': { light: '181, 199, 255', dark: '20, 57, 117' },
  'link-4': { light: '97, 141, 255', dark: '13, 66, 154' },
  'link-5': { light: '54, 110, 244', dark: '5, 75, 190' },
  'link-6': { light: '0, 82, 217', dark: '38, 103, 212' },
  'link-7': { light: '0, 60, 171', dark: '69, 130, 230' },
  'color-primary': { light: 'rgb(0, 117, 74)', dark: 'rgb(0, 117, 74)' },
  'color-primary-hover': { light: 'rgb(26, 145, 98)', dark: 'rgb(23, 115, 82)' },
  'color-primary-active': { light: 'rgb(0, 106, 68)', dark: 'rgb(59, 181, 139)' },
  'color-primary-disabled': { light: 'rgb(184, 233, 214)', dark: 'rgb(16, 64, 46)' },
  'color-primary-light': { light: 'rgb(230, 247, 241)', dark: 'rgb(9, 26, 19)' },
  'color-primary-focus': { light: 'rgb(207, 240, 228)', dark: 'rgb(12, 43, 31)' },
  'color-text-1': { light: 'rgb(26, 26, 26)', dark: 'rgb(233, 233, 233)' },
  'color-text-2': { light: 'rgb(102, 102, 102)', dark: 'rgb(156, 156, 156)' },
  'color-text-3': { light: 'rgb(153, 153, 153)', dark: 'rgb(113, 113, 113)' },
  'color-text-4': { light: 'rgb(189, 189, 189)', dark: 'rgb(84, 84, 84)' },
  'color-text-brand': { light: 'rgb(0, 117, 74)', dark: 'rgb(0, 117, 74)' },
  'color-text-link': { light: 'rgb(0, 106, 68)', dark: 'rgb(59, 181, 139)' },
  'bg-color-page': { light: 'rgb(238, 238, 238)', dark: 'rgb(44, 44, 44)' },
  'bg-color-container': { light: 'rgb(255, 255, 255)', dark: 'rgb(36, 36, 36)' },
  'bg-color-container-hover': { light: 'rgb(243, 243, 243)', dark: 'rgb(44, 44, 44)' },
  'bg-color-secondarycontainer': { light: 'rgb(243, 243, 243)', dark: 'rgb(44, 44, 44)' },
  'bg-color-component': { light: 'rgb(232, 232, 232)', dark: 'rgb(57, 57, 57)' },
  'bg-color-component-disabled': { light: 'rgb(238, 238, 238)', dark: 'rgb(44, 44, 44)' },
};

const stateRows = [
  ['6', '常规'],
  ['5', '悬浮 (hover)'],
  ['7', '点击 (click)'],
  ['4', '特殊场景'],
  ['3', '一般禁用'],
  ['2', '文字禁用'],
  ['1', '浅色/白底悬浮'],
] as const;

const semanticRows = [
  ['color-primary', '品牌主色'],
  ['color-primary-hover', '悬浮 (hover)'],
  ['color-primary-active', '点击 (click)'],
  ['color-primary-disabled', '禁用'],
  ['color-primary-light', '浅色背景'],
  ['color-primary-focus', '聚焦背景'],
] as const;

function paletteGroup(title: string, prefix: string): TokenGroup {
  return {
    title,
    rows: stateRows.map(([level, description]) => ({
      name: `${prefix}-${level}`,
      value: `rgb(var(--${prefix}-${level}))`,
      cssVar: `--${prefix}-${level}`,
      description,
      color: `rgb(var(--${prefix}-${level}))`,
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
    rows: semanticRows.map(([name, description]) => ({
      name,
      value: `var(--${name})`,
      cssVar: `--${name}`,
      description,
      color: `var(--${name})`,
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
      color: `var(--${name})`,
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
      color: `var(--${name})`,
      sample: 'color',
    })),
  },
  {
    title: '字体',
    rows: [
      ['font-family', '"Noto Sans SC", "Poppins", Roboto, sans-serif', '默认字体栈'],
      ['fs-12', '12px', '辅助字号'],
      ['fs-14', '14px', '默认字号'],
      ['fs-16', '16px', '正文大字号'],
      ['fs-20', '20px', '小标题字号'],
      ['fs-24', '24px', '标题字号'],
      ['fs-36', '36px', '展示标题字号'],
      ['fs-link-sm', '12px', '小号链接字号'],
      ['fs-link-md', '14px', '默认链接字号'],
      ['fs-link-lg', '16px', '大号链接字号'],
      ['lh-20', '20px', '紧凑行高'],
      ['lh-22', '22px', '默认行高'],
      ['lh-24', '24px', '大号正文行高'],
      ['lh-32', '32px', '标题行高'],
      ['lh-link-md', '22px', '默认链接行高'],
      ['fw-regular', '400', '常规字重'],
      ['fw-medium', '500', '中等字重'],
      ['fw-semibold', '600', '半粗字重'],
      ['fw-bold', '700', '粗体字重'],
    ].map(([name, value, description]) => ({
      name,
      value,
      cssVar: `--${name}`,
      description,
      sample: 'font',
    })),
  },
  {
    title: '圆角',
    rows: [
      ['border-radius-xs', '2px', '极小圆角'],
      ['border-radius-sm', '4px', '小圆角'],
      ['border-radius-md', '6px', '默认圆角'],
      ['border-radius-lg', '8px', '大圆角'],
      ['border-radius-xl', '12px', '超大圆角'],
      ['border-radius-round', '999px', '胶囊圆角'],
    ].map(([name, value, description]) => ({
      name,
      value,
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

function getTokenValue(row: TokenRow, mode: Mode) {
  const value = tokenValues[row.name]?.[mode];

  if (!value) {
    return row.value;
  }

  return value.startsWith('rgb') ? value : `rgb(${value})`;
}

function getSampleStyle(row: TokenRow, mode: Mode): React.CSSProperties {
  if (row.sample === 'radius') {
    return { borderRadius: `var(${row.cssVar})` };
  }

  if (row.sample === 'spacing') {
    return { ['--sample-width' as string]: `var(${row.cssVar})` };
  }

  if (row.sample === 'font') {
    if (row.name.startsWith('fs-')) {
      return { fontSize: `var(${row.cssVar})` };
    }

    if (row.name.startsWith('lh-')) {
      return { lineHeight: `var(${row.cssVar})` };
    }

    if (row.name.startsWith('fw-')) {
      return { fontWeight: `var(${row.cssVar})` };
    }

    return { fontFamily: `var(${row.cssVar})` };
  }

  return { ['--token-color' as string]: getTokenValue(row, mode) };
}

function TokenTable({ group, mode }: { group: TokenGroup; mode: Mode }) {
  return (
    <section className={styles.group}>
      <h2 className={styles.groupTitle}>{group.title}</h2>
      <div className={styles.tableWrap}>
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
                      <span className={styles.swatch} style={getSampleStyle(row, mode)} />
                    )}
                    {row.sample === 'radius' && (
                      <span className={styles.radiusSample} style={getSampleStyle(row, mode)} />
                    )}
                    {row.sample === 'spacing' && (
                      <span className={styles.spacingSample} style={getSampleStyle(row, mode)} />
                    )}
                    {row.sample === 'font' && (
                      <span className={styles.fontSample} style={getSampleStyle(row, mode)}>
                        Aa
                      </span>
                    )}
                    <span>{row.name}</span>
                  </span>
                </td>
                <td className={styles.value}>{getTokenValue(row, mode)}</td>
                <td className={styles.cssVar}>{row.cssVar}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function TokenPreview() {
  const [mode, setMode] = useState<Mode>('light');

  return (
    <div className={styles.tokenPreview}>
      <div className={styles.toolbar}>
        <Radio.Group
          type="button"
          value={mode}
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
          onChange={(value) => setMode(value as Mode)}
        />
      </div>

      {groups.map((group) => (
        <TokenTable key={group.title} group={group} mode={mode} />
      ))}
    </div>
  );
}
