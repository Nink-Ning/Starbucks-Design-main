import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const vueSrcDir = resolve(srcDir, '../../starbucks-design-vue/src')

const expectExactRule = (styles: string, selector: string, declarations: string[]) => {
  expect(styles).toContain(
    `${selector} {\n${declarations.map((declaration) => `  ${declaration}`).join('\n')}\n}`,
  )
}

describe('stylesheet entry', () => {
  it('maintains the FilterBar React/Vue override parity contract', () => {
    const reactFilterBar = readFileSync(resolve(srcDir, 'overrides/FilterBar.less'), 'utf8')
    const vueFilterBar = readFileSync(resolve(vueSrcDir, 'overrides/FilterBar.less'), 'utf8')

    expect(reactFilterBar).toBe(vueFilterBar)
    expect(reactFilterBar).not.toContain('scripts/generate-overrides.py')
    expect(reactFilterBar).toContain('currently maintained manually with shared Design Tokens')
  })

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

  it('keeps circular icon buttons round through hover backgrounds', () => {
    const button = readFileSync(resolve(srcDir, 'overrides/Button.less'), 'utf8')

    expectExactRule(button, '.arco-btn-shape-circle', [
      'border-radius: var(--border-radius-round);',
    ])
  })

  it('keeps the React Dropdown trigger wrapper visually neutral', () => {
    const dropdown = readFileSync(resolve(srcDir, 'overrides/Dropdown.less'), 'utf8')

    expectExactRule(dropdown, '.arco-trigger.arco-dropdown', [
      'padding: 0;',
      'overflow: visible;',
      'background-color: transparent;',
      'border: 0;',
      'border-radius: 0;',
      'box-shadow: none;',
    ])
  })

  it('keeps Progress line background on the track instead of the React root', () => {
    const progress = readFileSync(resolve(srcDir, 'overrides/Progress.less'), 'utf8')

    expectExactRule(progress, '.arco-progress.arco-progress-line', [
      'background-color: transparent;',
    ])
    expectExactRule(progress, '.arco-progress-line-outer', [
      'background-color: var(--bg-color-secondarycomponent);',
      'border-radius: 999px;',
    ])
    expect(progress).not.toMatch(/^\.arco-progress-line\s*\{/m)
  })

  it('keeps React vertical Form.Item layout block when Vue styles are also loaded', () => {
    const form = readFileSync(resolve(srcDir, 'overrides/Form.less'), 'utf8')

    expectExactRule(form, '.arco-form .arco-form-layout-vertical', ['display: block;'])
    expectExactRule(
      form,
      '.arco-form .arco-form-layout-vertical,\n' +
        '.arco-form .arco-form-item-layout-vertical',
      ['margin-bottom: var(--spacing-6);'],
    )
  })

  it('maps React List containers, rows, and meta text to shared tokens', () => {
    const list = readFileSync(resolve(srcDir, 'overrides/List.less'), 'utf8')

    expectExactRule(list, '.arco-list', [
      'overflow: hidden;',
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
      'background-color: var(--bg-color-container);',
      'border-color: var(--color-border-component);',
      'border-radius: var(--border-radius-md);',
    ])
    expectExactRule(list, '.arco-list-header,\n.arco-list-footer', [
      'padding: var(--spacing-5) var(--spacing-6);',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-medium);',
      'line-height: var(--lh-22);',
      'background-color: var(--bg-color-secondarycontainer);',
      'border-color: var(--color-border-1);',
    ])
    expectExactRule(list, '.arco-list-default > .arco-list-header', [
      'padding: var(--spacing-5) var(--spacing-6);',
    ])
    expectExactRule(
      list,
      '.arco-list-default > .arco-list-footer,\n.arco-list-default > .arco-list-content > .arco-list-item,\n.arco-list-default > .arco-list-content .arco-list-row-col > .arco-list-item,\n.arco-list-default > .arco-list-content.arco-list-virtual .arco-list-item',
      ['padding: var(--spacing-5) var(--spacing-6);'],
    )
    expectExactRule(list, '.arco-list-header,\n.arco-list-item:not(:last-child)', [
      'border-bottom-color: var(--color-border-1);',
    ])
    expectExactRule(list, '.arco-list-item', [
      'box-sizing: border-box;',
      'min-height: 48px;',
      'padding: var(--spacing-5) var(--spacing-6);',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border-color: var(--color-border-1);',
    ])
    expectExactRule(list, '.arco-list-item-main', ['flex: 1;', 'min-width: 0;', 'overflow: hidden;'])
    expectExactRule(list, '.arco-list-item-meta-avatar', [
      'flex: 0 0 auto;',
      'margin-right: var(--spacing-5);',
    ])
    expectExactRule(list, '.arco-list-item-meta-title', [
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-medium);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(list, '.arco-list-item-meta-description', [
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(list, '.arco-list-pagination', ['padding-top: var(--spacing-5);'])
    expect(list).not.toContain('!important')
  })

  it('keeps Modal titles left aligned in standard and centered-class DOM', () => {
    const modal = readFileSync(resolve(srcDir, 'overrides/Modal.less'), 'utf8')

    expectExactRule(modal, '.arco-modal', [
      'box-sizing: border-box;',
      'width: 480px;',
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'line-height: var(--lh-22);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--bg-color-component);',
      'border-radius: var(--border-radius-lg);',
      'box-shadow: var(--shadow-lg);',
    ])
    expectExactRule(modal, '.arco-modal-header', [
      'box-sizing: border-box;',
      'height: 72px;',
      'padding: var(--spacing-8) var(--spacing-10);',
      'background-color: var(--bg-color-container);',
      'border-bottom: 1px solid var(--bg-color-component);',
      'border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;',
    ])
    expectExactRule(modal, '.arco-modal-header .arco-modal-title,\n.arco-modal-title', [
      'color: var(--color-text-primary);',
      'font-size: var(--fs-16);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-24);',
      'text-align: left;',
    ])
    expectExactRule(
      modal,
      '.arco-modal .arco-modal-header .arco-modal-title,\n.arco-modal-title.arco-modal-title-align-center',
      ['justify-content: flex-start;', 'text-align: left;'],
    )
    expectExactRule(modal, '.arco-modal-content', [
      'padding: var(--spacing-8) var(--spacing-10);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(modal, '.arco-modal-footer', [
      'box-sizing: border-box;',
      'padding: var(--spacing-8) var(--spacing-10);',
      'background-color: var(--bg-color-container);',
      'border-top: 1px solid var(--bg-color-component);',
      'border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);',
      'text-align: right;',
    ])
    expectExactRule(modal, '.arco-modal .arco-modal-close-icon', [
      'top: 28px;',
      'right: var(--spacing-10);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-16);',
      'line-height: 1;',
    ])
    expect(modal).not.toContain('!important')
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

  it('keeps select-like triggers aligned with TreeSelect interaction states', () => {
    const select = readFileSync(resolve(srcDir, 'overrides/Select.less'), 'utf8')
    const cascader = readFileSync(resolve(srcDir, 'overrides/Cascader.less'), 'utf8')
    const treeSelect = readFileSync(resolve(srcDir, 'overrides/TreeSelect.less'), 'utf8')

    for (const styles of [select, cascader, treeSelect]) {
      expect(styles).toContain('background-color: var(--bg-color-container-hover);')
      expect(styles).toContain('border-color: var(--color-border-component);')
    }
    expect(select).toMatch(
      /\.arco-select-focused[\s\S]*?border-color: var\(--color-primary\);/,
    )
    expect(select).toMatch(
      /\.arco-select-open[\s\S]*?:hover \.arco-select-view[\s\S]*?border-color: var\(--color-primary\);/,
    )
    expect(select).toContain(
      '.arco-select:not(.arco-select-disabled):active .arco-select-view,',
    )
    expect(cascader).toMatch(
      /\.arco-cascader-focused[\s\S]*?border-color: var\(--color-primary\);/,
    )
    expect(cascader).toContain(
      '.arco-cascader-popup-visible:not(.arco-cascader-disabled) .arco-cascader-view,',
    )
    expect(cascader).toContain(
      '.arco-cascader:not(.arco-cascader-disabled) .arco-cascader-view:focus-within',
    )
    expect(cascader).toMatch(
      /\.arco-cascader-open[\s\S]*?:hover \.arco-cascader-view[\s\S]*?border-color: var\(--color-primary\);/,
    )
    expect(cascader).toContain(
      '.arco-cascader:not(.arco-cascader-disabled):active .arco-cascader-view,',
    )
    expect(treeSelect).toMatch(
      /\.arco-tree-select-open[\s\S]*?:hover \.arco-tree-select-view[\s\S]*?border-color: var\(--color-primary\);/,
    )
    expect(treeSelect).toContain(
      '.arco-tree-select:not(.arco-tree-select-disabled):active .arco-tree-select-view,',
    )
    expect(cascader).not.toMatch(
      /:has\(> \.arco-cascader-add(?:before|after)\)[\s\S]*?:hover[\s\S]*?border-(?:left|right)-color: var\(--color-primary\);/,
    )
  })

  it('keeps the DatePicker cell radius aligned with Calendar panel selection', () => {
    const datePicker = readFileSync(resolve(srcDir, 'overrides/DatePicker.less'), 'utf8')

    expect(datePicker).toContain('border-radius: var(--border-radius-round) !important;')
    expect(datePicker).toContain('width: 24px;')
    expect(datePicker).toContain('background-color: var(--color-primary) !important;')
    expect(datePicker).toContain(
      '.arco-picker-cell-in-range:first-child\n  .arco-picker-date',
    )
    expect(datePicker).toContain(
      '.arco-picker-cell-in-range:last-child\n  .arco-picker-date',
    )
    expectExactRule(datePicker, '.arco-picker-date-value', [
      'display: inline-flex;',
      'box-sizing: border-box;',
      'align-items: center;',
      'justify-content: center;',
      'min-width: 24px;',
      'width: 24px;',
      'height: 24px;',
      'padding-bottom: 1px;',
      'color: var(--color-text-disabled);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: 1;',
      'text-align: center;',
      'background-color: transparent;',
      'border: 1px solid transparent;',
      'border-radius: var(--border-radius-round) !important;',
      'transition:\n' +
        '    color 0.12s ease,\n' +
        '    background-color 0.12s ease,\n' +
        '    border-color 0.12s ease;',
    ])
    expectExactRule(datePicker, '.arco-picker-header', [
      'display: flex;',
      'align-items: center;',
      'padding: var(--spacing-2) var(--spacing-4);',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border-bottom: 1px solid var(--color-border-2);',
    ])
    expectExactRule(datePicker, '.arco-picker-body', [
      'padding: 14px var(--spacing-4);',
      'background-color: var(--bg-color-container);',
    ])
    expectExactRule(
      datePicker,
      '.arco-panel-month .arco-picker-date-value,\n' +
        '.arco-panel-quarter .arco-picker-date-value,\n' +
        '.arco-panel-year .arco-picker-date-value',
      [
        'width: 100%;',
        'border-radius: var(--border-radius-round) !important;',
      ],
    )
  })

  it('centers TimePicker numbers inside their filled option surface', () => {
    const timePicker = readFileSync(resolve(srcDir, 'overrides/TimePicker.less'), 'utf8')

    expectExactRule(timePicker, '.arco-timepicker-cell-inner', [
      'display: flex;',
      'align-items: center;',
      'justify-content: center;',
      'box-sizing: border-box;',
      'width: 100%;',
      'height: 28px;',
      'padding: 0 0 1px;',
      'color: inherit;',
      'font-size: inherit;',
      'font-weight: var(--fw-regular);',
      'line-height: 1;',
      'background-color: transparent;',
      'border-radius: var(--border-radius-sm);',
      'transition:',
      '  color 0.12s ease,',
      '  background-color 0.12s ease;',
    ])
  })

  it('maps React Calendar demos and panel cells to the shared Calendar contract', () => {
    const calendar = readFileSync(resolve(srcDir, 'overrides/Calendar.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Calendar.less';")
    expectExactRule(calendar, '.arco-calendar:not(.arco-calendar-panel)', [
      'width: 100%;',
      'min-width: 640px;',
      'overflow: hidden;',
    ])
    expectExactRule(calendar, '.arco-calendar-panel .arco-calendar-header', [
      'padding: var(--spacing-2) var(--spacing-4);',
      'border-color: var(--color-border-2);',
    ])
    expectExactRule(calendar, '.arco-calendar-panel', [
      'overflow: hidden;',
      'background-clip: padding-box;',
      'border-color: var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
    ])
    expectExactRule(calendar, '.arco-calendar-panel .arco-calendar-body', [
      'padding: 14px var(--spacing-4);',
    ])
    expectExactRule(calendar, '.arco-calendar-panel .arco-calendar-cell .arco-calendar-date-value', [
      'min-width: 24px;',
      'height: 24px;',
      'font-size: var(--fs-14);',
      'line-height: 24px;',
    ])
    expect(calendar).not.toContain('!important')
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
      'background-color: var(--bg-color-secondarycontainer);',
      'border-bottom-color: var(--color-border-1);',
    ])
    expectExactRule(table, '.arco-table-size-default .arco-table-th-item', [
      'padding: 9px var(--spacing-6);',
    ])
    expectExactRule(table, '.arco-table-size-middle .arco-table-th-item', [
      'padding: 7px var(--spacing-6);',
    ])
    expectExactRule(
      table,
      '.arco-table-size-small .arco-table-th,\n' +
        '.arco-table-size-small .arco-table-td',
      [
        'font-size: var(--fs-14);',
        'line-height: var(--lh-22);',
      ],
    )
    expectExactRule(table, '.arco-table-size-small .arco-table-th-item', [
      'padding: 5px var(--spacing-6);',
    ])
    expectExactRule(table, '.arco-table-size-mini .arco-table-th-item', [
      'padding: 2px var(--spacing-6);',
    ])
    expect(table).toContain('background-color: var(--bg-color-container-hover);')
    expect(table).toContain('background-color: rgba(var(--primary-1), 0.3);')
    expect(table).toContain('.arco-table-row-checked.arco-table-tr')
    expect(table).toContain('.arco-table-expand-content:not(.arco-table-empty-row):hover')
    expectExactRule(table, '.arco-table-tfoot', [
      'background-color: var(--bg-color-secondarycontainer);',
    ])
    expectExactRule(table, '.arco-table tfoot .arco-table-td', [
      'background-color: var(--bg-color-secondarycontainer);',
    ])
    expect(table).toContain('background-color: var(--bg-color-secondarycontainer);')
    expect(table).toContain('.arco-table-td.arco-table-col-fixed-left::before')
    expect(table).toContain('border-color: var(--color-border-component);')
    expectExactRule(table, '.arco-table.arco-table-border .arco-table-container', [
      'border-top-color: transparent;',
      'border-right-color: transparent;',
      'border-bottom-color: var(--color-border-component);',
      'border-left-color: transparent;',
    ])
    expectExactRule(
      table,
      '.arco-table.arco-table-border .arco-table-th.arco-table-col-first,\n' +
        '.arco-table.arco-table-border .arco-table-td.arco-table-col-first,\n' +
        '.arco-table.arco-table-border .arco-table-expand-fixed-row',
      ['border-left-color: transparent;'],
    )
    expect(table).toContain('.arco-table-td.arco-table-operation')
    expect(table).toContain('height: 8px;')
    expectExactRule(table, '.arco-table-expand-icon-cell > .arco-icon', [
      'width: 16px;',
      'height: 16px;',
      'color: var(--color-text-placeholder);',
      'cursor: pointer;',
    ])
    expect(table).not.toContain('box-shadow: var(--shadow-sm);')
    expect(table).not.toContain('!important')
  })

  it('maps React VerificationCode cells to the Input interaction contract', () => {
    const verificationCode = readFileSync(
      resolve(srcDir, 'overrides/VerificationCode.less'),
      'utf8',
    )
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './VerificationCode.less';")
    expectExactRule(verificationCode, '.arco-verification-code', [
      'display: flex;',
      'align-items: center;',
      'justify-content: space-between;',
      'width: 100%;',
      'column-gap: var(--spacing-2);',
      'font-family: var(--font-family);',
      'font-weight: var(--fw-regular);',
    ])
    expectExactRule(verificationCode, '.arco-verification-code .arco-input', [
      'box-sizing: border-box;',
      'flex: 0 0 30px;',
      'width: 30px;',
      'min-width: 30px;',
      'height: 30px;',
      'padding: 0;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
      'text-align: center;',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
      'transition:',
      '  color 0.2s ease,',
      '  background-color 0.2s ease,',
      '  border-color 0.2s ease,',
      '  box-shadow 0.2s ease;',
    ])
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input:focus,\n' +
        '.arco-verification-code .arco-input-focus',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input-size-mini,\n' +
        '.arco-verification-code .arco-input-size-small',
      [
        'flex-basis: 24px;',
        'width: 24px;',
        'min-width: 24px;',
        'height: 24px;',
        'font-size: var(--fs-12);',
        'line-height: var(--lh-20);',
      ],
    )
    expect(verificationCode).not.toContain('!important')
  })

  it('maps React Slider colors to Starbucks semantic tokens', () => {
    const slider = readFileSync(resolve(srcDir, 'overrides/Slider.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Slider.less';")
    expectExactRule(slider, '.arco-slider-road::before', [
      'background-color: var(--bg-color-component);',
    ])
    expectExactRule(slider, '.arco-slider-bar', [
      'background-color: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-button::after', [
      'background: var(--bg-color-container);',
      'border-color: var(--color-primary);',
    ])
    expectExactRule(
      slider,
      '.arco-slider-button:hover::after,\n' +
        '.arco-slider-button-active::after',
      [
        'border-color: var(--color-primary-hover);',
        'box-shadow: var(--shadow-sm);',
      ],
    )
    expectExactRule(slider, '.arco-slider-button:focus-visible::after', [
      'border-color: var(--color-primary);',
      'box-shadow: 0 0 0 2px var(--color-primary-focus);',
    ])
    expectExactRule(slider, '.arco-slider-dot-active', [
      'border-color: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-tick-active', [
      'background: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-marks-text', [
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-12);',
      'line-height: var(--lh-20);',
    ])
    expect(slider).not.toContain('!important')
  })

  it('maps React Link loading state to Starbucks semantic tokens', () => {
    const link = readFileSync(resolve(srcDir, 'overrides/Link.less'), 'utf8')

    expectExactRule(
      link,
      '.arco-link.arco-link-loading:not(.arco-link-disabled),\n' +
        '.arco-link.arco-link-loading:not(.arco-link-disabled):hover,\n' +
        '.arco-link.arco-link-loading:not(.arco-link-disabled):active',
      [
        'color: var(--color-primary);',
        'background-color: transparent;',
        'cursor: default;',
      ],
    )
    expectExactRule(link, '.arco-link.arco-link-loading:not(.arco-link-disabled) .arco-link-icon', [
      'color: currentColor;',
    ])
    expect(link).not.toContain('!important')
  })

  it('maps React Pagination disabled active page to disabled text tokens', () => {
    const pagination = readFileSync(resolve(srcDir, 'overrides/Pagination.less'), 'utf8')

    expectExactRule(pagination, '.arco-pagination.arco-pagination-disabled .arco-pagination-item-active', [
      'color: var(--color-text-disabled);',
      'background-color: var(--bg-color-component-disabled);',
      'border-color: transparent;',
    ])
    expect(pagination).not.toContain('color: var(--color-primary-disabled);')
  })

  it('maps React Descriptions labels to regular text weight', () => {
    const descriptions = readFileSync(resolve(srcDir, 'overrides/Descriptions.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Descriptions.less';")
    expectExactRule(descriptions, '.arco-descriptions', [
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(
      descriptions,
      '.arco-descriptions-item-label,\n' +
        '.arco-descriptions-item-label-inline',
      [
        'color: var(--color-text-secondary);',
        'font-weight: var(--fw-regular);',
        'line-height: var(--lh-22);',
      ],
    )
    expectExactRule(
      descriptions,
      '.arco-descriptions-item-value,\n' +
        '.arco-descriptions-item-value-inline',
      [
        'color: var(--color-text-primary);',
        'font-weight: var(--fw-regular);',
        'line-height: var(--lh-22);',
      ],
    )
    expectExactRule(
      descriptions,
      '.arco-descriptions:not(.arco-descriptions-border) .arco-descriptions-item-label-inline',
      ['margin-right: var(--spacing-6);'],
    )
    expectExactRule(
      descriptions,
      '.arco-descriptions-layout-inline-vertical:not(.arco-descriptions-border) ' +
        '.arco-descriptions-item-label-inline',
      ['margin-right: 0;', 'margin-bottom: var(--spacing-1);'],
    )
    expectExactRule(descriptions, '.arco-descriptions-size-default .arco-descriptions-title', [
      'margin-bottom: var(--spacing-5);',
    ])
    expectExactRule(
      descriptions,
      '.arco-descriptions-size-default:not(.arco-descriptions-border) .arco-descriptions-item,\n' +
        '.arco-descriptions-size-default:not(.arco-descriptions-border) ' +
        '.arco-descriptions-item-label,\n' +
        '.arco-descriptions-size-default:not(.arco-descriptions-border) ' +
        '.arco-descriptions-item-value',
      ['padding: var(--spacing-5) var(--spacing-2) var(--spacing-5) 0;'],
    )
    expectExactRule(descriptions, '.arco-descriptions-border .arco-descriptions-body', [
      'overflow: hidden;',
      'border-color: var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
    ])
    expect(descriptions).not.toContain('!important')
  })

  it('maps React Statistic typography and colors to Starbucks semantic tokens', () => {
    const statistic = readFileSync(resolve(srcDir, 'overrides/Statistic.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Statistic.less';")
    expectExactRule(statistic, '.arco-statistic', [
      'color: var(--color-text-secondary);',
      'font-family: var(--font-family);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(statistic, '.arco-statistic-title', [
      'margin-bottom: var(--spacing-4);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(statistic, '.arco-statistic-content', [
      'color: var(--color-text-primary);',
    ])
    expectExactRule(statistic, '.arco-statistic-content .arco-statistic-value', [
      'display: inline-flex;',
      'align-items: baseline;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-28);',
      'font-weight: var(--fw-medium);',
      'line-height: var(--lh-36);',
      'white-space: nowrap;',
    ])
    expectExactRule(
      statistic,
      '.arco-statistic-value-prefix,\n' +
        '.arco-statistic-value-suffix',
      [
        'display: inline-flex;',
        'align-items: center;',
        'color: currentColor;',
        'font-size: var(--fs-14);',
        'line-height: var(--lh-22);',
      ],
    )
    expectExactRule(statistic, '.arco-statistic-extra', [
      'margin-top: var(--spacing-4);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
    expect(statistic).not.toContain('!important')
    expect(statistic).not.toContain('.arco-statistic-content {\n  display: inline-flex;')
  })

  it('maps React Avatar colors to Starbucks semantic tokens', () => {
    const avatar = readFileSync(resolve(srcDir, 'overrides/Avatar.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Avatar.less';")
    expectExactRule(avatar, '.arco-avatar', [
      'color: var(--color-white-text-1);',
      'font-family: var(--font-family);',
      'background-color: var(--color-primary);',
    ])
    expectExactRule(avatar, '.arco-avatar-trigger-icon-button', [
      'color: var(--color-primary);',
      'background-color: var(--color-primary-light);',
    ])
    expectExactRule(avatar, '.arco-avatar-with-trigger-icon:hover .arco-avatar-trigger-icon-button', [
      'color: var(--color-primary-hover);',
      'background-color: var(--color-primary-focus);',
    ])
    expectExactRule(avatar, '.arco-avatar-trigger-icon-mask', [
      'color: var(--color-white-text-1);',
      'background-color: rgba(var(--arc-color-primary-6), 0.64);',
    ])
    expectExactRule(avatar, '.arco-avatar-group .arco-avatar', [
      'border-color: var(--bg-color-container);',
    ])
    expectExactRule(avatar, '.arco-avatar-group-max-count-avatar', [
      'color: var(--color-white-text-1);',
      'background-color: var(--color-primary-active);',
    ])
    expect(avatar).not.toContain('!important')
  })

})
