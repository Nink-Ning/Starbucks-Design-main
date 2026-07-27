import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const expectExactRule = (styles: string, selector: string, declarations: string[]) => {
  expect(styles).toContain(
    `${selector} {\n${declarations.map((declaration) => `  ${declaration}`).join('\n')}\n}`,
  )
}

describe('stylesheet entry', () => {
  it('loads the designer compile-time theme and overrides after Arco', () => {
    const entry = readFileSync(resolve(srcDir, 'components.less'), 'utf8')
    const arcoImport = "@import '@arco-design/web-react/es/Watermark/style/index.less';"
    const overridesImport = "@import './overrides/_index.less';"

    expect(entry).toContain("@import './figma-overrides.less';")
    expect(entry).not.toContain('@sbux/design-tokens')
    expect(entry).toContain(overridesImport)
    expect(entry.indexOf(overridesImport)).toBeGreaterThan(entry.indexOf(arcoImport))
  })

  it('resolves every designer override imported by the override index', () => {
    const indexPath = resolve(srcDir, 'overrides/_index.less')
    const index = readFileSync(indexPath, 'utf8')
    const imports = [...index.matchAll(/@import\s+['"](.+?)['"];?/g)].map((match) => match[1])

    expect(imports.length).toBeGreaterThan(0)
    for (const importedFile of imports) {
      const overridePath = resolve(dirname(indexPath), importedFile)
      expect(existsSync(overridePath)).toBe(true)
      expect(readFileSync(overridePath, 'utf8')).not.toMatch(/\.starbucks-[A-Za-z0-9_-]+/)
    }
  })

  it('loads only the designer runtime theme', () => {
    const packageEntry = readFileSync(resolve(srcDir, 'index.ts'), 'utf8')

    expect(packageEntry.indexOf("import './theme.css'")).toBeGreaterThan(
      packageEntry.indexOf("import './components.less'"),
    )
    expect(packageEntry).not.toContain("import './theme/starbucks.less'")
    expect(existsSync(resolve(srcDir, 'theme'))).toBe(false)
  })

  it('provides the runtime variables required by Cascader overrides', () => {
    const designerTheme = readFileSync(resolve(srcDir, 'theme.css'), 'utf8')
    const cascader = readFileSync(resolve(srcDir, 'overrides/Cascader.less'), 'utf8')
    const requiredVariables = [...cascader.matchAll(/var\((--[A-Za-z0-9_-]+)/g)].map(
      (match) => match[1],
    )

    expect(requiredVariables.length).toBeGreaterThan(0)
    for (const variable of requiredVariables) {
      expect(designerTheme).toMatch(new RegExp(`${variable}\\s*:`))
    }
  })

  it('keeps the DatePicker cell radius override above Arco specificity', () => {
    const datePicker = readFileSync(resolve(srcDir, 'overrides/DatePicker.less'), 'utf8')

    expect(datePicker).toContain('border-radius: var(--border-radius-sm) !important;')
  })

  it('maps Tree geometry and interaction states to the Figma contract', () => {
    const tree = readFileSync(resolve(srcDir, 'overrides/Tree.less'), 'utf8')

    expectExactRule(tree, '.arco-tree-node', [
      'box-sizing: border-box;',
      'align-items: center;',
      'padding-left: var(--spacing-4);',
      'color: var(--color-text-primary);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(tree, '.arco-tree-node-switcher', [
      'flex: 0 0 16px;',
      'width: 16px;',
      'margin-right: var(--spacing-2);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-12);',
      'line-height: 0;',
    ])
    expectExactRule(tree, '.arco-tree-node-switcher-icon svg', [
      'width: 12px;',
      'height: 12px;',
      'font-size: var(--fs-12);',
    ])
    expectExactRule(tree, '.arco-tree-node-indent-block', [
      'width: 16px;',
      'margin-right: var(--spacing-4);',
    ])
    expectExactRule(
      tree,
      '.arco-tree-node-selected .arco-tree-node-title,\n' +
        '.arco-tree-node-selected .arco-tree-node-title:hover,\n' +
        '.arco-tree-node-title-highlight',
      [
        'color: var(--color-primary);',
        'background-color: var(--color-primary-light);',
      ],
    )
    expectExactRule(tree, '.arco-tree .arco-checkbox', [
      'flex: 0 0 auto;',
      'margin-right: var(--spacing-4);',
      'margin-left: var(--spacing-2);',
    ])
  })

  it('maps React Table geometry and visual states to the Figma contract', () => {
    const table = readFileSync(resolve(srcDir, 'overrides/Table.less'), 'utf8')

    expectExactRule(table, '.arco-table', [
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(table, '.arco-table-th', [
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
      'vertical-align: middle;',
      'background-color: var(--bg-color-container);',
      'border-bottom-color: var(--color-border-1);',
    ])
    expectExactRule(
      table,
      '.arco-table-size-default .arco-table-th,\n' +
        '.arco-table-size-default .arco-table-td',
      ['height: 54px;'],
    )
    expectExactRule(
      table,
      '.arco-table-size-middle .arco-table-th,\n' +
        '.arco-table-size-middle .arco-table-td',
      ['height: 46px;'],
    )
    expectExactRule(
      table,
      '.arco-table-size-small .arco-table-th,\n' +
        '.arco-table-size-small .arco-table-td',
      [
        'height: 36px;',
        'font-size: var(--fs-12);',
        'line-height: var(--lh-20);',
      ],
    )
    expect(table).toContain('background-color: var(--bg-color-container-hover);')
    expect(table).toContain('border-color: var(--color-border-component);')
    expect(table).toContain('box-shadow: var(--shadow-sm);')
    expect(table).not.toContain('!important')
  })

})
