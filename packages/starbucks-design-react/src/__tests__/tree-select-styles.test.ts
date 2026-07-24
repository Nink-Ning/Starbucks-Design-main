import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const expectExactRule = (styles: string, selector: string, declarations: string[]) => {
  expect(styles).toContain(
    `${selector} {\n${declarations.map((declaration) => `  ${declaration}`).join('\n')}\n}`,
  )
}

describe('TreeSelect stylesheet', () => {
  it('composes the shared Select field and Tree popup contracts', () => {
    const treeSelect = readFileSync(resolve(srcDir, 'overrides/TreeSelect.less'), 'utf8')

    expectExactRule(treeSelect, '.arco-tree-select .arco-tree-select-view', [
      'box-sizing: border-box;',
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
    expectExactRule(
      treeSelect,
      '.arco-tree-select-focused:not(.arco-tree-select-disabled) .arco-tree-select-view,\n' +
        '.arco-tree-select:not(.arco-tree-select-disabled) .arco-tree-select-view:focus-within',
      [
        'color: var(--color-text-primary);',
        'background-color: var(--bg-color-container);',
        'border-color: var(--color-primary);',
        'box-shadow: 0 0 0 2px var(--color-primary-focus);',
      ],
    )
    expectExactRule(treeSelect, '.arco-tree-select-popup', [
      'box-sizing: border-box;',
      'margin-top: var(--spacing-2);',
      'padding: var(--spacing-3);',
      'color: var(--color-text-primary);',
      'background-color: var(--bg-color-container);',
      'border: 1px solid var(--color-border-component);',
      'border-radius: var(--border-radius-md);',
      'box-shadow: var(--shadow-md);',
    ])
    expectExactRule(treeSelect, '.arco-tree-select-popup .arco-tree-node', [
      'padding-left: var(--spacing-4);',
    ])
    expectExactRule(treeSelect, '.arco-tree-select-multiple .arco-tree-select-suffix', [
      'height: 24px;',
      'padding: 0 !important;',
    ])
  })

  it('uses one square seam between addBefore and the focused field', () => {
    const treeSelect = readFileSync(resolve(srcDir, 'overrides/TreeSelect.less'), 'utf8')

    expectExactRule(
      treeSelect,
      '.arco-tree-select-wrapper > .arco-tree-select-addbefore',
      [
        'padding: 0 var(--spacing-6);',
        'color: var(--color-text-secondary);',
        'background-color: var(--bg-color-component);',
        'border-color: var(--color-border-component);',
        'border-right: 0;',
        'border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);',
      ],
    )
    expectExactRule(
      treeSelect,
      '.arco-tree-select-wrapper\n' +
        '  > .arco-tree-select:not(:first-child)\n' +
        '  .arco-tree-select-view',
      ['border-top-left-radius: 0;', 'border-bottom-left-radius: 0;'],
    )
  })
})
