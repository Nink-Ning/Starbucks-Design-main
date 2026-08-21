import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reactStyles = readFileSync(resolve(srcDir, 'overrides/TableToolbar.less'), 'utf8')
const vueStyles = readFileSync(resolve(srcDir, '../../starbucks-design-vue/src/overrides/TableToolbar.less'), 'utf8')

describe('TableToolbar shared styles', () => {
  it('keeps React and Vue business layout styles identical', () => {
    expect(reactStyles).toBe(vueStyles)
  })

  it('stays scoped and uses existing design tokens', () => {
    expect(reactStyles).toContain('.sbux-table-toolbar')
    expect(reactStyles).toContain('gap: var(--spacing-4);')
    expect(reactStyles).toContain('container-type: inline-size;')
    expect(reactStyles).toContain('@container (max-width: 1200px)')
    expect(reactStyles).toContain(".sbux-table-toolbar[data-has-start-content='true']")
    expect(reactStyles).toContain('.sbux-table-toolbar__quick-filters--start')
    expect(reactStyles).toContain('.sbux-table-toolbar__quick-filters--end')
    expect(reactStyles).toContain(".sbux-table-toolbar__quick-filter[data-filter-type='buttonGroup']")
    expect(reactStyles).toContain('flex: 1 1 0;')
    expect(reactStyles).toContain('.sbux-table-toolbar__menu-content')
    expect(reactStyles).toContain('.sbux-table-toolbar__selection-count')
    expect(reactStyles).toContain('color: var(--color-primary);')
    expect(reactStyles).toContain('.sbux-table-toolbar__more-group--standard')
    expect(reactStyles).toContain('.sbux-table-toolbar__more-group--compact')
    expect(reactStyles).toContain('.sbux-table-toolbar__operation-action--priority-2')
    expect(reactStyles).not.toContain('!important')
    expect(reactStyles).not.toMatch(/^\.arco-/m)
  })
})
