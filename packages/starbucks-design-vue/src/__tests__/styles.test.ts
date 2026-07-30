import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Cascader, Select, TreeSelect } from '@arco-design/web-vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const finalAuditStatus = /^(matched|fixed)$/

const expectFinalAuditStatus = (status: string) => {
  expect(status).toMatch(finalAuditStatus)
}

const expectExactRule = (styles: string, selector: string, declarations: string[]) => {
  expect(styles).toContain(
    `${selector} {\n${declarations.map((declaration) => `  ${declaration}`).join('\n')}\n}`,
  )
}

describe('stylesheet entry', () => {
  it('does not permit pending as a final visual audit status', () => {
    expect(() => expectFinalAuditStatus('pending')).toThrow()
  })

  it('shares the bare SelectView contract across Cascader and TreeSelect only', () => {
    const sharedSelector = '.arco-select-view:not(.arco-select)'
    const variants: Array<Record<string, boolean>> = [
      {},
      { multiple: true },
      { disabled: true },
      { error: true },
    ]

    for (const props of variants) {
      const renderedConsumers: Array<{ component: Component; expectedMatch: boolean }> = [
        { component: Cascader, expectedMatch: true },
        { component: TreeSelect, expectedMatch: true },
        { component: Select, expectedMatch: false },
      ]

      for (const { component, expectedMatch } of renderedConsumers) {
        const wrapper = mount(component, { props })
        const selectView = wrapper.find('.arco-select-view')

        expect(selectView.exists()).toBe(true)
        expect(
          selectView.element.matches(sharedSelector),
          `${component.name}: ${selectView.attributes('class')}`,
        ).toBe(expectedMatch)
        wrapper.unmount()
      }
    }
  })

  it('tracks every imported override in the Vue-to-React visual audit ledger', () => {
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')
    const auditPath = resolve(srcDir, '../../../artifacts/vue-react-visual-audit.md')
    const audit = existsSync(auditPath) ? readFileSync(auditPath, 'utf8') : ''
    const importedComponents = [...index.matchAll(/@import\s+['"]\.\/([^'"/]+)\.less['"];?/g)]
      .map((match) => match[1])
      .sort()
    const supportPrimitives = ['MultiSelectTag', 'Shared']
    const auditHeader = '| Component | Status | Evidence |'
    expect(audit).toContain(auditHeader)
    const auditRows = [...audit.slice(audit.indexOf(auditHeader)).matchAll(
      /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/gm,
    )]
      .slice(2)
      .map((match) => ({
        component: match[1].trim(),
        status: match[2].trim(),
        evidence: match[3].trim(),
      }))
    const auditedComponents = auditRows
      .map((row) => row.component)
      .sort()
    const componentOverrides = importedComponents.filter(
      (component) => !supportPrimitives.includes(component),
    )

    for (const supportPrimitive of supportPrimitives) {
      expect(importedComponents).toContain(supportPrimitive)
      expect(existsSync(resolve(srcDir, `overrides/${supportPrimitive}.less`))).toBe(true)
    }
    expect(auditRows).toHaveLength(55)
    expect(auditedComponents).toEqual(componentOverrides)
    for (const row of auditRows) {
      expectFinalAuditStatus(row.status)
      expect(row.evidence).not.toBe('')
      expect(row.evidence).not.toBe('—')
    }
  })

  it('loads the designer compile-time theme and overrides after Arco', () => {
    const entry = readFileSync(resolve(srcDir, 'components.less'), 'utf8')
    const arcoImport = "@import '@arco-design/web-vue/es/index.less';"
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
    const shared = readFileSync(resolve(srcDir, 'overrides/Shared.less'), 'utf8')

    expectExactRule(
      select,
      '.arco-select:not(.arco-select-disabled):hover .arco-select-view',
      [
        'background-color: var(--bg-color-container-hover);',
        'border-color: var(--color-border-component);',
      ],
    )
    expectExactRule(
      cascader,
      '.arco-cascader:not(.arco-cascader-disabled):hover .arco-cascader-view',
      [
        'background-color: var(--bg-color-container-hover);',
        'border-color: var(--color-border-component);',
      ],
    )
    expectExactRule(
      cascader,
      '.arco-cascader-focused:not(.arco-cascader-disabled) .arco-cascader-view,\n' +
        '.arco-cascader-open:not(.arco-cascader-disabled) .arco-cascader-view,\n' +
        '.arco-cascader-popup-visible:not(.arco-cascader-disabled) .arco-cascader-view,\n' +
        '.arco-cascader:not(.arco-cascader-disabled):active .arco-cascader-view,\n' +
        '.arco-cascader:not(.arco-cascader-disabled) .arco-cascader-view:focus-within',
      [
        'color: var(--color-text-primary);',
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(
      cascader,
      '.arco-cascader-focused:not(.arco-cascader-disabled):hover .arco-cascader-view,\n' +
        '.arco-cascader-open:not(.arco-cascader-disabled):hover .arco-cascader-view,\n' +
        '.arco-cascader-popup-visible:not(.arco-cascader-disabled):hover .arco-cascader-view,\n' +
        '.arco-cascader:not(.arco-cascader-disabled):active:hover .arco-cascader-view,\n' +
        '.arco-cascader:not(.arco-cascader-disabled) .arco-cascader-view:focus-within:hover',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select):not(.arco-select-view-disabled):hover',
      [
        'background-color: var(--bg-color-container-hover);',
        'border-color: var(--color-border-component);',
      ],
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

  it('maps Vue Calendar demos and panel cells to the shared Calendar contract', () => {
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

  it('maps Vue Select multiple DOM to React visual metrics', () => {
    const select = readFileSync(resolve(srcDir, 'overrides/Select.less'), 'utf8')
    const expectExactRule = (selector: string, declarations: string[]) => {
      expect(select).toContain(
        `${selector} {\n${declarations.map((declaration) => `  ${declaration}`).join('\n')}\n}`,
      )
    }

    expect(select).not.toMatch(/^\.arco-select-view-multiple(?:[.:\s{])/m)
    expect(select).not.toMatch(/^\.arco-select-dropdown(?:[\s{])/m)
    expect(select).not.toContain('.arco-select-view-warning')

    expectExactRule('.arco-select.arco-select-view-multiple', [
      'box-sizing: border-box;',
      'height: 32px;',
      'min-height: 32px;',
      'padding: 3px var(--spacing-4) 3px var(--spacing-2);',
      'overflow: hidden;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'line-height: 0;',
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
      '.arco-select.arco-select-view-multiple:not(.arco-select-view-disabled):hover',
      [
        'background-color: var(--bg-color-container-hover);',
        'border-color: var(--color-border-component);',
      ],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple:focus-within,\n' +
        '.arco-select.arco-select-view-multiple.arco-select-view-focus',
      [
        'color: var(--color-text-primary);',
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple.arco-select-view-error,\n' +
        '.arco-select.arco-select-view-multiple.arco-select-view-error:hover',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-danger);',
      ],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple.arco-select-view-error:focus-within,\n' +
        '.arco-select.arco-select-view-multiple.arco-select-view-error.arco-select-view-focus',
      ['box-shadow: 0 0 0 2px var(--color-danger-focus);'],
    )
    expectExactRule(
      '.arco-form-item-status-warning .arco-select.arco-select-view-multiple,\n' +
        '.arco-form-item-status-warning .arco-select.arco-select-view-multiple:hover',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-warning);',
      ],
    )
    expectExactRule(
      '.arco-form-item-status-warning .arco-select.arco-select-view-multiple:focus-within,\n' +
        '.arco-form-item-status-warning ' +
        '.arco-select.arco-select-view-multiple.arco-select-view-focus',
      ['box-shadow: 0 0 0 2px var(--color-warning-focus);'],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple.arco-select-view-disabled,\n' +
        '.arco-select.arco-select-view-multiple.arco-select-view-disabled:hover',
      [
        'color: var(--color-text-disabled);',
        'background-color: var(--bg-color-component-disabled);',
        'border-color: var(--color-border-component);',
        'box-shadow: none;',
      ],
    )
    expectExactRule(
      '.arco-select.arco-select-view-size-mini.arco-select-view-multiple,\n' +
        '.arco-select.arco-select-view-size-small.arco-select-view-multiple',
      [
        'height: 28px;',
        'min-height: 24px;',
        'padding: 1px 3px;',
        'font-size: var(--fs-12);',
      ],
    )
    expectExactRule('.arco-select.arco-select-view-size-medium.arco-select-view-multiple', [
      'height: 32px;',
      'min-height: 32px;',
      'padding: 3px var(--spacing-4) 3px var(--spacing-2);',
      'font-size: var(--fs-14);',
    ])
    expectExactRule('.arco-select.arco-select-view-size-large.arco-select-view-multiple', [
      'height: 56px;',
      'min-height: 40px;',
      'padding: 7px var(--spacing-4);',
      'font-size: var(--fs-16);',
    ])
    expectExactRule(
      '.arco-select.arco-select-view-multiple .arco-select-view-inner .arco-select-view-tag',
      [
        'height: 24px;',
        'min-height: 24px;',
        'margin: 0 var(--spacing-2) 0 0;',
        'padding: 0 var(--spacing-4);',
        'color: var(--color-text-primary);',
        'font-size: var(--fs-12);',
        'line-height: var(--lh-20);',
        'background-color: var(--bg-color-container);',
        'border: 1px solid var(--color-fill-3);',
        'border-radius: var(--border-radius-sm);',
      ],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple .arco-select-view-tag:hover',
      ['background-color: var(--bg-color-component-hover);'],
    )
    expectExactRule(
      '.arco-select.arco-select-view-multiple.arco-select-view-disabled .arco-select-view-tag',
      [
        'color: var(--color-text-disabled);',
        'background-color: var(--bg-color-component-disabled);',
      ],
    )
    expectExactRule('.arco-select-dropdown:has(.arco-select-option-multiple)', [
      'margin-top: var(--spacing-2);',
      'padding: var(--spacing-3);',
      'overflow: hidden;',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(
      '.arco-select-dropdown:has(.arco-select-option-multiple) .arco-select-option-multiple',
      [
        'display: flex;',
        'align-items: center;',
        'box-sizing: border-box;',
        'min-height: 28px;',
        'margin: 0 0 var(--spacing-1);',
        'padding: 3px var(--spacing-4);',
        'overflow: hidden;',
        'color: var(--color-text-primary);',
        'font-size: var(--fs-14);',
        'font-weight: var(--fw-regular);',
        'line-height: var(--lh-22);',
        'background-color: transparent;',
        'border-radius: var(--border-radius-sm);',
      ],
    )
    expectExactRule(
      '.arco-select-dropdown:has(.arco-select-option-multiple) .arco-select-option-selected',
      [
        'color: var(--color-primary);',
        'font-weight: var(--fw-medium);',
        'background-color: var(--color-primary-light);',
      ],
    )
    expectExactRule(
      '.arco-select-dropdown:has(.arco-select-option-multiple) .arco-select-option-active,\n' +
        '.arco-select-dropdown:has(.arco-select-option-multiple) ' +
        '.arco-select-option-multiple:not(.arco-select-option-disabled):hover',
      [
        'color: var(--color-text-primary);',
        'background-color: var(--bg-color-container-hover);',
      ],
    )
    expectExactRule(
      '.arco-select-dropdown:has(.arco-select-option-multiple) .arco-select-option-disabled,\n' +
        '.arco-select-dropdown:has(.arco-select-option-multiple) .arco-select-option-disabled:hover',
      [
        'color: var(--color-text-disabled);',
        'font-weight: var(--fw-regular);',
        'background-color: transparent;',
        'cursor: not-allowed;',
      ],
    )
  })

  it('scopes Vue Cascader visual adapters to component-owned popup DOM', () => {
    const cascader = readFileSync(resolve(srcDir, 'overrides/Cascader.less'), 'utf8')

    expect(cascader).not.toMatch(/^\.arco-select-view/m)
    expectExactRule(cascader, '.arco-cascader-panel', [
      'box-sizing: border-box;',
      'overflow: hidden;',
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'font-weight: var(--fw-regular);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(cascader, '.arco-cascader-panel .arco-cascader-option', [
      'box-sizing: border-box;',
      'min-height: 28px;',
      'margin: 0 0 var(--spacing-1);',
      'padding: 3px var(--spacing-4);',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
      'background-color: transparent;',
      'border-radius: var(--border-radius-sm);',
    ])
  })

  it('maps shared Vue Cascader and TreeSelect triggers without overriding Select', () => {
    const shared = readFileSync(resolve(srcDir, 'overrides/Shared.less'), 'utf8')

    expect(shared).not.toMatch(/^\.arco-select-view(?!:not\(\.arco-select\))/m)
    expect(shared).not.toMatch(/^\.arco-select(?:[.:\s{])/m)
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-size-medium.arco-select-view-single',
      [
        'box-sizing: border-box;',
        'height: 32px;',
        'padding: 0 var(--spacing-4);',
        'color: var(--color-text-primary);',
        'font-size: var(--fs-14);',
        'line-height: var(--lh-22);',
        'background-color: var(--bg-color-container);',
        'border: 1px solid var(--color-border-component);',
        'border-radius: var(--border-radius-sm);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-size-medium.arco-select-view-multiple',
      [
        'box-sizing: border-box;',
        'height: 32px;',
        'min-height: 32px;',
        'padding: 3px var(--spacing-4) 3px var(--spacing-2);',
        'overflow: hidden;',
        'color: var(--color-text-primary);',
        'font-size: var(--fs-14);',
        'line-height: 0;',
        'background-color: var(--bg-color-container);',
        'border: 1px solid var(--color-border-component);',
        'border-radius: var(--border-radius-sm);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select):not(.arco-select-view-disabled):hover',
      [
        'background-color: var(--bg-color-container-hover);',
        'border-color: var(--color-border-component);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-focus,\n' +
        '.arco-select-view:not(.arco-select).arco-select-view-open,\n' +
        '.arco-select-view:not(.arco-select):not(.arco-select-view-disabled):active,\n' +
        '.arco-select-view:not(.arco-select):focus-within',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-focus:hover,\n' +
        '.arco-select-view:not(.arco-select).arco-select-view-open:hover,\n' +
        '.arco-select-view:not(.arco-select):not(.arco-select-view-disabled):active:hover,\n' +
        '.arco-select-view:not(.arco-select):focus-within:hover',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-error,\n' +
        '.arco-select-view:not(.arco-select).arco-select-view-error:hover',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-danger);',
      ],
    )
    expectExactRule(
      shared,
      '.arco-select-view:not(.arco-select).arco-select-view-disabled,\n' +
        '.arco-select-view:not(.arco-select).arco-select-view-disabled:hover',
      [
        'color: var(--color-text-disabled);',
        'background-color: var(--bg-color-component-disabled);',
        'border-color: var(--color-border-component);',
        'box-shadow: none;',
      ],
    )
  })

  it('maps Vue Checkbox icon and label DOM to React metrics', () => {
    const checkbox = readFileSync(resolve(srcDir, 'overrides/Checkbox.less'), 'utf8')

    expect(checkbox).not.toMatch(/^\.arco-checkbox-(?:icon|label)\s*\{/m)
    expectExactRule(checkbox, '.arco-checkbox .arco-checkbox-icon', [
      'box-sizing: border-box;',
      'width: 16px;',
      'height: 16px;',
      'color: #fff;',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
    ])
    expectExactRule(checkbox, '.arco-checkbox .arco-checkbox-label', [
      'margin-left: var(--spacing-4);',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
  })

  it('maps Vue Input wrapper DOM to the React field shell', () => {
    const input = readFileSync(resolve(srcDir, 'overrides/Input.less'), 'utf8')

    expect(input).not.toMatch(/^\.arco-input \.arco-input-wrapper\s*\{/m)
    expectExactRule(input, '.arco-input-wrapper', [
      'box-sizing: border-box;',
      'min-height: 32px;',
      'padding: 0 var(--spacing-4);',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
      'transition:',
      '  color 0.2s ease,',
      '  background-color 0.2s ease,',
      '  border-color 0.2s ease,',
      '  box-shadow 0.2s ease;',
    ])
    expectExactRule(input, '.arco-input-wrapper.arco-input-error', [
      'background-color: var(--bg-color-container);',
      'border-color: var(--color-danger);',
    ])
  })

  it('maps Vue InputSearch outer DOM to React joined-field metrics', () => {
    const inputSearch = readFileSync(resolve(srcDir, 'overrides/InputSearch.less'), 'utf8')

    expect(inputSearch).not.toMatch(/^\.arco-input-search-button\s*\{/m)
    expectExactRule(inputSearch, '.arco-input-search .arco-input-wrapper', [
      'border-right-color: transparent;',
      'border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);',
    ])
    expectExactRule(inputSearch, '.arco-input-search .arco-input-append', [
      'padding: 0;',
      'background-color: transparent;',
      'border-left: 0;',
      'border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;',
    ])
  })

  it('maps Vue InputNumber wrapper DOM to the React field shell', () => {
    const inputNumber = readFileSync(resolve(srcDir, 'overrides/InputNumber.less'), 'utf8')

    expect(inputNumber).not.toMatch(/^\.arco-input-number-wrapper\s*\{/m)
    expectExactRule(inputNumber, '.arco-input-number.arco-input-wrapper', [
      'min-height: 32px;',
      'padding: 0 var(--spacing-4);',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-sm);',
    ])
    expectExactRule(inputNumber, '.arco-input-number.arco-input-outer .arco-input-wrapper', [
      'min-height: inherit;',
      'background-color: var(--bg-color-container);',
      'border-color: var(--color-border-component);',
      'border-radius: 0;',
    ])
  })

  it('maps Vue InputTag medium size and wrapping DOM to React flow metrics', () => {
    const inputTag = readFileSync(resolve(srcDir, 'overrides/InputTag.less'), 'utf8')

    expect(inputTag).not.toMatch(/\.arco-input-tag-size-medium\s*\{[^}]*\n\s*height:\s*32px;/s)
    expect(inputTag).not.toContain('flex-wrap: nowrap;')
    expectExactRule(inputTag, '.arco-input-tag-size-medium', [
      'box-sizing: border-box;',
      'min-height: 32px;',
      'padding-top: 2px;',
      'padding-bottom: 2px;',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(inputTag, '.arco-input-tag .arco-draggable', [
      'display: inline-flex;',
      'align-items: center;',
      'flex-wrap: wrap;',
      'gap: var(--spacing-2);',
    ])
    expectExactRule(inputTag, '.arco-input-tag .arco-overflow', [
      'display: inline-flex;',
      'align-items: center;',
      'flex-wrap: wrap;',
      'gap: var(--spacing-2);',
      'max-width: 100%;',
    ])
  })

  it('maps Vue Radio icon and label DOM to React metrics', () => {
    const radio = readFileSync(resolve(srcDir, 'overrides/Radio.less'), 'utf8')

    expect(radio).not.toMatch(/^\.arco-radio-(?:icon|label)\s*\{/m)
    expectExactRule(radio, '.arco-radio .arco-radio-icon', [
      'box-sizing: border-box;',
      'width: 16px;',
      'height: 16px;',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--bg-color-secondarycomponent);',
    ])
    expectExactRule(radio, '.arco-radio .arco-radio-label', [
      'margin-left: var(--spacing-4);',
      'color: var(--color-text-primary);',
    ])
  })

  it('maps Vue Switch handle DOM to the React dot metrics', () => {
    const switchStyles = readFileSync(resolve(srcDir, 'overrides/Switch.less'), 'utf8')

    expect(switchStyles).not.toMatch(/^\.arco-switch-large(?:[.:\s{])/m)
    expectExactRule(switchStyles, '.arco-switch-handle', [
      'top: 4px;',
      'left: 4px;',
      'width: 12px;',
      'height: 12px;',
      'color: var(--bg-color-secondarycomponent);',
      'background-color: var(--color-white);',
      'box-shadow: var(--shadow-sm);',
    ])
    expectExactRule(switchStyles, '.arco-switch-checked .arco-switch-handle', [
      'top: 2.5px;',
      'left: calc(100% - 15px - 2.5px);',
      'width: 15px;',
      'height: 15px;',
      'color: var(--color-primary);',
    ])
    expectExactRule(switchStyles, '.arco-switch-small .arco-switch-handle', [
      'top: 3px;',
      'left: 3px;',
      'width: 10px;',
      'height: 10px;',
    ])
    expectExactRule(switchStyles, '.arco-switch-small.arco-switch-checked .arco-switch-handle', [
      'top: 2px;',
      'left: calc(100% - 12px - 2px);',
      'width: 12px;',
      'height: 12px;',
    ])
  })

  it('maps Vue Anchor link DOM to React title states', () => {
    const anchor = readFileSync(resolve(srcDir, 'overrides/Anchor.less'), 'utf8')

    expectExactRule(anchor, '.arco-anchor .arco-anchor-link', [
      'margin-bottom: var(--spacing-1);',
      'padding: var(--spacing-2) var(--spacing-4);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
      'text-decoration: none;',
      'border-radius: var(--border-radius-sm);',
    ])
    expectExactRule(anchor, '.arco-anchor .arco-anchor-link:hover', [
      'color: var(--color-text-primary);',
      'font-weight: var(--fw-medium);',
      'background-color: var(--bg-color-secondarycontainer-hover);',
    ])
    expectExactRule(
      anchor,
      '.arco-anchor .arco-anchor-link-item.arco-anchor-link-active > .arco-anchor-link',
      ['color: var(--color-primary);', 'font-weight: var(--fw-medium);'],
    )
  })

  it('maps Vue BackTop hyphenated DOM to React button metrics', () => {
    const backTop = readFileSync(resolve(srcDir, 'overrides/BackTop.less'), 'utf8')

    expectExactRule(backTop, '.arco-back-top', ['z-index: 100;'])
    expectExactRule(backTop, '.arco-back-top-btn', [
      'width: 40px;',
      'height: 40px;',
      'color: var(--color-white-text-1);',
      'font-size: var(--fs-12);',
      'background-color: var(--color-primary);',
      'border: none;',
      'border-radius: 50%;',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(backTop, '.arco-back-top-btn:focus-visible', [
      'box-shadow: 0 0 0 2px var(--color-primary-focus);',
    ])
  })

  it('maps Vue Button medium and nested-icon DOM to React metrics', () => {
    const button = readFileSync(resolve(srcDir, 'overrides/Button.less'), 'utf8')

    expectExactRule(button, '.arco-btn-size-medium', [
      'height: 32px;',
      'padding: 0 15px;',
      'font-size: var(--fs-14);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(button, '.arco-btn > .arco-btn-icon > svg', [
      'width: 16px;',
      'height: 16px;',
    ])
    expect(button).not.toContain('.arco-btn > .arco-btn-icon + span')
    expect(button).not.toContain('.arco-btn > span + .arco-btn-icon')
    expect(button).not.toMatch(/\.arco-btn[^{}]*\.arco-btn-icon[^{}]*\{[^}]*margin-(?:left|right):/s)
    expectExactRule(button, '.arco-btn-size-medium.arco-btn-only-icon', ['width: 32px;'])
    expectExactRule(button, '.arco-btn-shape-circle', [
      'border-radius: var(--border-radius-round);',
    ])
  })

  it('maps Vue Dropdown popup DOM to React menu metrics', () => {
    const dropdown = readFileSync(resolve(srcDir, 'overrides/Dropdown.less'), 'utf8')

    expectExactRule(dropdown, '.arco-dropdown', [
      'box-sizing: border-box;',
      'max-height: 240px;',
      'padding: var(--spacing-3);',
      'overflow: auto;',
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'background-color: var(--bg-color-container);',
      'border: 0.5px solid var(--bg-color-secondarycomponent);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expect(dropdown).not.toContain('.arco-dropdown .arco-dropdown-submenu')
    expectExactRule(dropdown, '.arco-dropdown .arco-dropdown-option', [
      'position: relative;',
      'box-sizing: border-box;',
      'width: 100%;',
      'height: 36px;',
      'padding: 0 var(--spacing-5);',
      'overflow: hidden;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: 36px;',
      'text-align: left;',
      'text-overflow: ellipsis;',
      'white-space: nowrap;',
      'background-color: transparent;',
      'border-radius: var(--border-radius-md);',
      'cursor: pointer;',
    ])
    expectExactRule(dropdown, '.arco-dropdown .arco-dropdown-option-disabled', [
      'color: var(--color-text-disabled);',
      'background-color: transparent;',
      'cursor: not-allowed;',
    ])
  })

  it('maps Vue Link status classes to React semantic colors', () => {
    const link = readFileSync(resolve(srcDir, 'overrides/Link.less'), 'utf8')

    expectExactRule(link, '.arco-link-status-success', ['color: var(--color-success);'])
    expectExactRule(link, '.arco-link-status-warning', ['color: var(--color-warning);'])
    expectExactRule(link, '.arco-link-status-danger', ['color: var(--color-danger);'])
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
    expectExactRule(
      link,
      '.arco-link-status-danger.arco-link-disabled,\n' +
        '.arco-link-status-danger.arco-link-disabled:hover,\n' +
        '.arco-link-status-danger.arco-link-disabled:active',
      ['color: var(--color-danger-disabled);'],
    )
  })

  it('maps Vue Pagination wrapper and previous-button DOM to React metrics', () => {
    const pagination = readFileSync(resolve(srcDir, 'overrides/Pagination.less'), 'utf8')

    expectExactRule(
      pagination,
      '.arco-pagination-options,\n.arco-pagination-total',
      ['display: inline-flex;', 'align-items: center;', 'flex: none;'],
    )
    expectExactRule(pagination, '.arco-pagination-options', [
      'margin-left: var(--spacing-4);',
    ])
    expectExactRule(
      pagination,
      '.arco-pagination-item-next,\n.arco-pagination-item-previous',
      ['color: var(--color-text-secondary);', 'background-color: transparent;'],
    )
  })

  it('maps Vue Pagination disabled active page to disabled text tokens', () => {
    const pagination = readFileSync(resolve(srcDir, 'overrides/Pagination.less'), 'utf8')

    expectExactRule(pagination, '.arco-pagination.arco-pagination-disabled .arco-pagination-item-active', [
      'color: var(--color-text-disabled);',
      'background-color: var(--bg-color-component-disabled);',
      'border-color: transparent;',
    ])
    expect(pagination).not.toContain('color: var(--color-primary-disabled);')
  })

  it('maps Vue changeable Steps DOM to React hover states', () => {
    const steps = readFileSync(resolve(srcDir, 'overrides/Steps.less'), 'utf8')

    expectExactRule(
      steps,
      '.arco-steps-changeable ' +
        '.arco-steps-item:not(.arco-steps-item-active):not(.arco-steps-item-disabled):hover ' +
        '.arco-steps-item-content .arco-steps-item-description,\n' +
        '.arco-steps-changeable ' +
        '.arco-steps-item:not(.arco-steps-item-active):not(.arco-steps-item-disabled):hover ' +
        '.arco-steps-item-content .arco-steps-item-title',
      ['color: var(--color-primary);'],
    )
  })

  it('maps Vue Badge status names to React semantic dots', () => {
    const badge = readFileSync(resolve(srcDir, 'overrides/Badge.less'), 'utf8')

    expectExactRule(badge, '.arco-badge-status-normal', [
      'background-color: var(--bg-color-secondarycomponent-active);',
    ])
    expectExactRule(badge, '.arco-badge-status-danger', [
      'background-color: var(--color-danger);',
    ])
  })

  it('maps Vue Collapse medium DOM to React header and content insets', () => {
    const collapse = readFileSync(resolve(srcDir, 'overrides/Collapse.less'), 'utf8')

    expectExactRule(collapse, '.arco-collapse-item-header', [
      'font-size: var(--fs-14);',
      'line-height: var(--lh-24);',
    ])
    expectExactRule(
      collapse,
      '.arco-collapse-item-header:not(.arco-collapse-item-header-disabled)',
      ['color: var(--color-text-primary);', 'background-color: var(--bg-color-container);'],
    )
    expectExactRule(collapse, '.arco-collapse-item-header-left', [
      'padding-right: 13px;',
      'padding-left: var(--spacing-10);',
    ])
    expectExactRule(collapse, '.arco-collapse-item-content', [
      'padding: 0 13px 0 34px;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'background-color: var(--bg-color-container);',
    ])
    expectExactRule(collapse, '.arco-collapse-item-content-box', [
      'padding: var(--spacing-4) 0;',
    ])
    expectExactRule(collapse, '.arco-collapse-item:not(:last-of-type)', [
      'border-bottom-color: var(--color-border-1);',
    ])
    expect(collapse).not.toContain(
      '.arco-collapse-item-header {\n  color: var(--color-text-primary);',
    )
    expect(collapse).not.toContain(
      '.arco-collapse-item-content-box {\n' +
        '  padding: var(--spacing-4) 13px var(--spacing-4) 34px;',
    )
  })

  it('maps Vue Descriptions medium size to React default density', () => {
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
    expectExactRule(
      descriptions,
      '.arco-descriptions.arco-descriptions-size-medium .arco-descriptions-title',
      ['margin-bottom: var(--spacing-5);'],
    )
    expectExactRule(
      descriptions,
      '.arco-descriptions.arco-descriptions-size-medium:not(.arco-descriptions-border) ' +
        '.arco-descriptions-item,\n' +
        '.arco-descriptions.arco-descriptions-size-medium:not(.arco-descriptions-border) ' +
        '.arco-descriptions-item-label,\n' +
        '.arco-descriptions.arco-descriptions-size-medium:not(.arco-descriptions-border) ' +
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

  it('maps Vue Empty direct children to React empty-state tokens', () => {
    const empty = readFileSync(resolve(srcDir, 'overrides/Empty.less'), 'utf8')

    expectExactRule(empty, '.arco-empty > .arco-empty-image', [
      'margin-bottom: var(--spacing-3);',
      'color: var(--color-text-disabled);',
      'font-size: 48px;',
      'line-height: 1;',
    ])
    expectExactRule(empty, '.arco-empty > .arco-empty-image img', ['height: 80px;'])
  })

  it('maps Vue List wrappers and medium size to React list flow', () => {
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
    expectExactRule(list, '.arco-list-medium .arco-list-content-wrapper .arco-list-header', [
      'padding: var(--spacing-5) var(--spacing-6);',
    ])
    expectExactRule(
      list,
      '.arco-list-medium .arco-list-content-wrapper .arco-list-footer,\n.arco-list-medium .arco-list-content-wrapper .arco-list-content > .arco-list-item,\n.arco-list-medium .arco-list-content-wrapper .arco-list-content .arco-list-col > .arco-list-item,\n.arco-list-medium .arco-list-content-wrapper .arco-list-content.arco-list-virtual .arco-list-item',
      ['padding: var(--spacing-5) var(--spacing-6);'],
    )
    expectExactRule(list, '.arco-list-split .arco-list-header,\n.arco-list-split .arco-list-item:not(:last-child)', [
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

  it('maps Vue Progress bars, statuses, and circles to React tokens', () => {
    const progress = readFileSync(resolve(srcDir, 'overrides/Progress.less'), 'utf8')

    expectExactRule(progress, '.arco-progress-line-wrapper .arco-progress-line', [
      'background-color: var(--bg-color-secondarycomponent);',
      'border-radius: 999px;',
    ])
    expectExactRule(progress, '.arco-progress-line-wrapper .arco-progress-line-bar', [
      'background-color: var(--color-primary);',
      'border-radius: 999px;',
    ])
    expect(progress).not.toMatch(/^\.arco-progress-line(?:\s*\{|,)/m)
    expect(progress).not.toMatch(/^\.arco-progress-line-bar(?:\s*\{|,)/m)
    expect(progress).not.toMatch(/\.arco-progress-line-outer,\n\.arco-progress-line\s*\{/)
    expectExactRule(progress, '.arco-progress-circle-bg', [
      'stroke: var(--bg-color-secondarycomponent);',
    ])
    expectExactRule(progress, '.arco-progress-circle-bar', ['stroke: var(--color-primary);'])
    expectExactRule(
      progress,
      '.arco-progress-type-circle .arco-progress-circle-text',
      [
        'color: var(--color-text-primary);',
        'font-size: var(--fs-14);',
        'font-weight: var(--fw-regular);',
        'line-height: var(--lh-22);',
      ],
    )
    expectExactRule(progress, '.arco-progress-size-small .arco-progress-circle-text', [
      'font-size: var(--fs-12);',
      'line-height: var(--lh-20);',
    ])
    expectExactRule(progress, '.arco-progress-size-large .arco-progress-circle-text', [
      'font-size: var(--fs-16);',
      'line-height: var(--lh-24);',
    ])
    expectExactRule(progress, '.arco-progress-size-mini .arco-progress-circle-bg', [
      'stroke: var(--color-primary-focus);',
    ])

    const statuses = [
      { name: 'warning', color: 'warning' },
      { name: 'success', color: 'success' },
      { name: 'danger', color: 'danger' },
    ]
    for (const { name, color } of statuses) {
      expectExactRule(
        progress,
        `.arco-progress-status-${name} .arco-progress-line-wrapper .arco-progress-line-bar,\n` +
          `.arco-progress-status-${name} .arco-progress-steps-item-active`,
        [`background-color: var(--color-${color});`],
      )
      expectExactRule(
        progress,
        `.arco-progress-status-${name} .arco-progress-line-text .arco-icon,\n` +
          `.arco-progress-status-${name} .arco-progress-steps-text .arco-icon,\n` +
          `.arco-progress-status-${name} .arco-icon`,
        [`color: var(--color-${color});`],
      )
      expectExactRule(
        progress,
        `.arco-progress-status-${name} .arco-progress-circle-bar`,
        [`stroke: var(--color-${color});`],
      )
      expectExactRule(
        progress,
        `.arco-progress-size-mini.arco-progress-status-${name} .arco-progress-circle-bg`,
        [`stroke: var(--color-${color}-focus);`],
      )
    }

    expect(progress).not.toMatch(
      /^\.arco-progress-(?:small|large|mini|is-warning|is-success|is-error)(?:[.:\s{])/m,
    )
  })

  it('maps Vue Skeleton line and shape DOM to React loading tokens', () => {
    const skeleton = readFileSync(resolve(srcDir, 'overrides/Skeleton.less'), 'utf8')

    expectExactRule(
      skeleton,
      '.arco-skeleton .arco-skeleton-line-row,\n.arco-skeleton .arco-skeleton-shape',
      ['background-color: var(--bg-color-secondarycomponent);'],
    )
    expectExactRule(skeleton, '.arco-skeleton .arco-skeleton-line-row', [
      'height: 16px;',
      'border-radius: var(--border-radius-md);',
    ])
    expectExactRule(skeleton, '.arco-skeleton .arco-skeleton-line-row:not(:last-child)', [
      'margin-bottom: var(--spacing-5);',
    ])
    expectExactRule(
      skeleton,
      '.arco-skeleton-animation .arco-skeleton-shape,\n' +
        '.arco-skeleton-animation .arco-skeleton-line-row',
      [
        'background: linear-gradient(',
        '  90deg,',
        '  var(--bg-color-secondarycomponent) 25%,',
        '  var(--bg-color-component-hover) 37%,',
        '  var(--bg-color-secondarycomponent) 63%',
        ');',
        'background-size: 400% 100%;',
      ],
    )
    expect(skeleton).not.toContain('.arco-skeleton-animate')
  })

  it('maps Vue Table geometry and visual states to the Figma contract', () => {
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
    expectExactRule(table, '.arco-table-size-large .arco-table-cell', [
      'padding: 9px var(--spacing-6);',
    ])
    expectExactRule(table, '.arco-table-size-medium .arco-table-cell', [
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
    expectExactRule(table, '.arco-table-size-small .arco-table-cell', [
      'padding: 5px var(--spacing-6);',
    ])
    expectExactRule(table, '.arco-table-size-mini .arco-table-cell', [
      'padding: 2px var(--spacing-6);',
    ])
    expect(table).toContain('background-color: var(--bg-color-container-hover);')
    expect(table).toContain('background-color: rgba(var(--primary-1), 0.3);')
    expect(table).toContain('.arco-table-tr-checked')
    expect(table).toContain('.arco-table-tr-expand:not(.arco-table-tr-empty):hover')
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
    expectExactRule(table, '.arco-table-border .arco-table-scroll-y', [
      'border-color: transparent;',
    ])
    expect(table).toContain('height: 8px;')
    expectExactRule(table, '.arco-table-expand-btn .arco-icon', [
      'width: 16px;',
      'height: 16px;',
      'color: var(--color-text-placeholder);',
    ])
    expect(table).not.toContain('box-shadow: var(--shadow-sm);')
    expect(table).not.toContain('!important')
  })

  it('maps Vue Tabs nav and tab DOM to React tab states', () => {
    const tabs = readFileSync(resolve(srcDir, 'overrides/Tabs.less'), 'utf8')

    expectExactRule(tabs, '.arco-tabs-tab', [
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(tabs, '.arco-tabs-tab:hover', [
      'color: var(--color-primary-hover);',
      'font-weight: var(--fw-regular);',
    ])
    expectExactRule(tabs, '.arco-tabs-tab-active,\n.arco-tabs-tab-active:hover', [
      'color: var(--color-primary);',
      'font-weight: var(--fw-medium);',
    ])
    expectExactRule(tabs, '.arco-tabs-tab-disabled,\n.arco-tabs-tab-disabled:hover', [
      'color: var(--color-text-disabled);',
    ])
    expectExactRule(tabs, '.arco-tabs-nav-ink', ['background-color: var(--color-primary);'])
    expectExactRule(
      tabs,
      '.arco-tabs-nav-type-line .arco-tabs-tab:focus-visible .arco-tabs-tab-title::before',
      ['box-shadow: inset 0 0 0 2px var(--color-primary-focus);'],
    )
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

  it('maps Vue Alert icon DOM to React alert icon metrics', () => {
    const alert = readFileSync(resolve(srcDir, 'overrides/Alert.less'), 'utf8')

    expectExactRule(alert, '.arco-alert-icon', [
      'display: flex;',
      'align-items: center;',
      'height: 22px;',
      'margin-right: var(--spacing-4);',
      'color: var(--color-primary);',
    ])
    expectExactRule(alert, '.arco-alert-icon svg', [
      'color: inherit;',
      'font-size: 20px;',
    ])
    expectExactRule(alert, '.arco-alert-with-title .arco-alert-icon', [
      'align-items: flex-start;',
      'height: 22px;',
      'padding-top: 1px;',
    ])
    expectExactRule(alert, '.arco-alert-success .arco-alert-icon', [
      'color: var(--color-success);',
    ])
    expectExactRule(alert, '.arco-alert-warning .arco-alert-icon', [
      'color: var(--color-warning);',
    ])
    expectExactRule(alert, '.arco-alert-error .arco-alert-icon', [
      'color: var(--color-danger);',
    ])
  })

  it('maps Vue Drawer portal DOM to React drawer regions', () => {
    const drawer = readFileSync(resolve(srcDir, 'overrides/Drawer.less'), 'utf8')

    expectExactRule(drawer, '.arco-drawer-title', [
      'color: var(--color-text-primary);',
      'font-size: var(--fs-16);',
      'font-weight: var(--fw-semibold);',
      'line-height: var(--lh-24);',
      'text-align: left;',
    ])
    expectExactRule(drawer, '.arco-drawer-body', [
      'box-sizing: border-box;',
      'flex: 1 1 auto;',
      'padding: var(--spacing-8);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
      'background-color: var(--bg-color-container);',
    ])
    expectExactRule(drawer, '.arco-drawer .arco-drawer-close-btn', [
      'position: absolute;',
      'top: 18px;',
      'right: var(--spacing-8);',
      'margin: 0;',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'line-height: 1;',
    ])
    expectExactRule(drawer, '.arco-drawer .arco-drawer-close-btn:hover', [
      'color: var(--color-text-primary);',
    ])
    expectExactRule(drawer, '.arco-drawer .arco-drawer-close-btn:hover::before', [
      'background-color: var(--bg-color-secondarycontainer-hover);',
    ])
  })

  it('maps Vue Message list portal to React wrapper placement', () => {
    const message = readFileSync(resolve(srcDir, 'overrides/Message.less'), 'utf8')

    expectExactRule(message, '.arco-message-list', [
      'box-sizing: border-box;',
      'width: 100%;',
      'padding: 0 var(--spacing-4);',
      'pointer-events: none;',
    ])
    expectExactRule(message, '.arco-message-list-top', ['top: var(--spacing-7);'])
    expectExactRule(message, '.arco-message-list-bottom', ['bottom: var(--spacing-7);'])
    expectExactRule(message, '.arco-message-list .arco-message', [
      'display: inline-flex;',
    ])
  })

  it('maps Vue Modal body and close DOM to React modal regions', () => {
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
    expectExactRule(modal, '.arco-modal-body', [
      'padding: var(--spacing-8) var(--spacing-10);',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
    ])
    expectExactRule(modal, '.arco-modal .arco-modal-close-btn', [
      'position: absolute;',
      'top: 28px;',
      'right: var(--spacing-10);',
      'margin: 0;',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-16);',
      'line-height: 1;',
    ])
    expectExactRule(modal, '.arco-modal .arco-modal-close-btn:hover', [
      'color: var(--color-text-primary);',
    ])
    expectExactRule(modal, '.arco-modal .arco-modal-close-btn:hover::before', [
      'background-color: var(--bg-color-secondarycontainer-hover);',
    ])
    expectExactRule(
      modal,
      '.arco-modal .arco-modal-header .arco-modal-title,\n.arco-modal-title.arco-modal-title-align-center',
      ['justify-content: flex-start;', 'text-align: left;'],
    )
    expectExactRule(modal, '.arco-modal-simple .arco-modal-body', [
      'padding: 0;',
      'color: var(--color-text-secondary);',
    ])
    expect(modal).not.toContain('!important')
  })

  it('maps Vue Notification list portal to React placement offsets', () => {
    const notification = readFileSync(resolve(srcDir, 'overrides/Notification.less'), 'utf8')

    expectExactRule(notification, '.arco-notification-list', [
      'position: fixed;',
      'z-index: 1003;',
    ])
    expectExactRule(notification, '.arco-notification-list-top-left', [
      'top: var(--spacing-7);',
      'left: var(--spacing-7);',
    ])
    expectExactRule(notification, '.arco-notification-list-top-right', [
      'top: var(--spacing-7);',
      'right: var(--spacing-7);',
    ])
    expectExactRule(notification, '.arco-notification-list-bottom-left', [
      'bottom: var(--spacing-7);',
      'left: var(--spacing-7);',
    ])
    expectExactRule(notification, '.arco-notification-list-bottom-right', [
      'right: var(--spacing-7);',
      'bottom: var(--spacing-7);',
    ])
  })

  it('scopes Vue Popconfirm panel styles to its popup portal', () => {
    const popconfirm = readFileSync(resolve(srcDir, 'overrides/Popconfirm.less'), 'utf8')

    expectExactRule(popconfirm, '.arco-popconfirm-popup-content', [
      'box-sizing: border-box;',
      'min-width: 160px;',
      'max-width: 360px;',
      'padding: var(--spacing-6);',
      'color: var(--color-text-primary);',
      'font-family: var(--font-family);',
      'background-color: var(--bg-color-container);',
      'border: 0.5px solid var(--bg-color-secondarycomponent);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(popconfirm, '.arco-popconfirm-popup-content .arco-popconfirm-body', [
      'display: grid;',
      'grid-template-columns: 20px minmax(0, 1fr);',
      'column-gap: var(--spacing-4);',
      'margin-bottom: var(--spacing-6);',
    ])
    expectExactRule(
      popconfirm,
      '.arco-popconfirm-popup-content .arco-popconfirm-body .arco-popconfirm-icon',
      [
      'display: inline-flex;',
      'align-items: flex-start;',
      'justify-content: center;',
      'width: 20px;',
      'height: 20px;',
      'margin-right: 0;',
      'padding-top: 1px;',
      'color: var(--color-warning);',
      'font-size: 20px;',
      'line-height: 20px;',
      ],
    )
    expectExactRule(
      popconfirm,
      '.arco-popconfirm-popup-content .arco-popconfirm-body .arco-popconfirm-content',
      [
      'min-width: 0;',
      'padding: 0;',
      'color: var(--color-text-primary);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-semibold);',
      'line-height: var(--lh-22);',
      'background: transparent;',
      'border: 0;',
      'border-radius: 0;',
      'box-shadow: none;',
      'word-break: break-word;',
      ],
    )
    expectExactRule(popconfirm, '.arco-popconfirm-popup-content .arco-popconfirm-footer', [
      'display: flex;',
      'justify-content: flex-end;',
      'gap: var(--spacing-4);',
      'height: 24px;',
      'text-align: right;',
    ])
    expectExactRule(
      popconfirm,
      '.arco-popconfirm-popup-content .arco-popconfirm-footer > button',
      ['margin-left: 0;'],
    )
    expectExactRule(popconfirm, '.arco-trigger-arrow.arco-popconfirm-popup-arrow', [
      'z-index: 1;',
      'width: 8.69px;',
      'height: 8.69px;',
      'background-color: var(--bg-color-container);',
      'border-color: var(--bg-color-secondarycomponent);',
      'border-style: solid;',
      'border-width: 0.5px 0.5px 0 0;',
    ])
  })

  it('scopes Vue Popover panel styles to its popup portal', () => {
    const popover = readFileSync(resolve(srcDir, 'overrides/Popover.less'), 'utf8')

    expectExactRule(popover, '.arco-popover-popup-content', [
      'box-sizing: border-box;',
      'width: 100%;',
      'max-width: none;',
      'padding: var(--spacing-6);',
      'color: var(--color-text-secondary);',
      'font-family: var(--font-family);',
      'font-size: var(--fs-14);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-22);',
      'background-color: var(--bg-color-container);',
      'border: 0.5px solid var(--bg-color-secondarycomponent);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(
      popover,
      '.arco-popover-popup-content .arco-popover-title + .arco-popover-content',
      ['margin-top: 0;'],
    )
    expectExactRule(popover, '.arco-popover-popup-content .arco-popover-content', [
      'padding: 0;',
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-12);',
      'font-weight: var(--fw-regular);',
      'line-height: var(--lh-20);',
      'background: transparent;',
      'border: 0;',
      'border-radius: 0;',
      'box-shadow: none;',
    ])
    expectExactRule(popover, '.arco-trigger-arrow.arco-popover-popup-arrow', [
      'z-index: 1;',
      'width: 8.69px;',
      'height: 8.69px;',
      'background-color: var(--bg-color-container);',
      'border-color: var(--bg-color-secondarycomponent);',
      'border-style: solid;',
      'border-width: 0.5px 0.5px 0 0;',
    ])
  })

  it('maps Vue Spin mask DOM to React loading overlay', () => {
    const spin = readFileSync(resolve(srcDir, 'overrides/Spin.less'), 'utf8')

    expectExactRule(spin, '.arco-spin-loading > .arco-spin-mask', [
      'background-color: color-mix(in srgb, var(--bg-color-container) 72%, transparent);',
    ])
  })

  it('maps Vue Tooltip popup arrow to the React panel color', () => {
    const tooltip = readFileSync(resolve(srcDir, 'overrides/Tooltip.less'), 'utf8')

    expectExactRule(tooltip, '.arco-trigger-arrow.arco-tooltip-popup-arrow', [
      'z-index: 1;',
      'background-color: var(--bg-color-container);',
      'border: none !important;',
    ])
    expectExactRule(
      tooltip,
      ".arco-tooltip-content[style*='background'] + .arco-trigger-arrow.arco-tooltip-popup-arrow,\n" +
        ".arco-trigger-arrow.arco-tooltip-popup-arrow[style*='background']",
      ['border-color: transparent !important;'],
    )
  })

  it('maps Vue VerificationCode cells to the Input interaction contract', () => {
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
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input,\n' +
        '.arco-verification-code .arco-input-wrapper',
      [
        'box-sizing: border-box;',
        'flex: 0 0 30px;',
        'width: 30px;',
        'min-width: 30px;',
        'height: 30px;',
        'min-height: 30px;',
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
      ],
    )
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input:focus,\n' +
        '.arco-verification-code .arco-input-focus,\n' +
        '.arco-verification-code .arco-input-wrapper:focus-within',
      [
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input-wrapper .arco-input,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input:hover,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input:focus,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input-focus,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input-error,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input-error:hover,\n' +
        '.arco-verification-code .arco-input-wrapper .arco-input-error:focus',
      [
        'width: 100%;',
        'min-width: 0;',
        'height: auto;',
        'min-height: 0;',
        'color: inherit;',
        'text-align: center;',
        'background: transparent;',
        'border: 0;',
        'box-shadow: none;',
      ],
    )
    expectExactRule(
      verificationCode,
      '.arco-verification-code .arco-input-size-mini,\n' +
        '.arco-verification-code .arco-input-size-small,\n' +
        '.arco-verification-code .arco-input-wrapper-size-mini,\n' +
        '.arco-verification-code .arco-input-wrapper-size-small',
      [
        'flex-basis: 24px;',
        'width: 24px;',
        'min-width: 24px;',
        'height: 24px;',
        'min-height: 24px;',
        'font-size: var(--fs-12);',
        'line-height: var(--lh-20);',
      ],
    )
    expect(verificationCode).not.toContain('!important')
  })

  it('maps Vue Slider colors to Starbucks semantic tokens', () => {
    const slider = readFileSync(resolve(srcDir, 'overrides/Slider.less'), 'utf8')
    const index = readFileSync(resolve(srcDir, 'overrides/_index.less'), 'utf8')

    expect(index).toContain("@import './Slider.less';")
    expectExactRule(slider, '.arco-slider-track::before', [
      'background-color: var(--bg-color-component);',
    ])
    expectExactRule(slider, '.arco-slider-bar', [
      'background-color: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-btn::after', [
      'background: var(--bg-color-container);',
      'border-color: var(--color-primary);',
    ])
    expectExactRule(
      slider,
      '.arco-slider-btn:hover::after,\n' +
        '.arco-slider-btn-active::after',
      [
        'border-color: var(--color-primary-hover);',
        'box-shadow: var(--shadow-sm);',
      ],
    )
    expectExactRule(slider, '.arco-slider-btn:focus-visible::after', [
      'border-color: var(--color-primary);',
      'box-shadow: 0 0 0 2px var(--color-primary-focus);',
    ])
    expectExactRule(slider, '.arco-slider-dot-active', [
      'border-color: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-tick-active', [
      'background: var(--color-primary);',
    ])
    expectExactRule(slider, '.arco-slider-mark', [
      'color: var(--color-text-secondary);',
      'font-size: var(--fs-12);',
      'line-height: var(--lh-20);',
    ])
    expect(slider).not.toContain('!important')
  })

  it('maps Vue Avatar colors to Starbucks semantic tokens', () => {
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

  it('maps Vue Statistic typography and colors to Starbucks semantic tokens', () => {
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
      '.arco-statistic-prefix,\n' +
        '.arco-statistic-suffix',
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
})
