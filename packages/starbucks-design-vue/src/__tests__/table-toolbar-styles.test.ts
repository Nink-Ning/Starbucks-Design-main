import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const vueStyles = readFileSync(resolve(srcDir, 'overrides/TableToolbar.less'), 'utf8')
const reactStyles = readFileSync(
  resolve(srcDir, '../../starbucks-design-react/src/overrides/TableToolbar.less'),
  'utf8'
)

describe('TableToolbar shared styles', () => {
  it('keeps Vue and React business layout styles identical', () => {
    expect(vueStyles).toBe(reactStyles)
  })

  it('stays scoped and uses existing design tokens', () => {
    expect(vueStyles).toContain('.sbux-table-toolbar')
    expect(vueStyles).toContain('gap: var(--spacing-4);')
    expect(vueStyles).toContain('container-type: inline-size;')
    expect(vueStyles).toContain('@container (max-width: 1200px)')
    expect(vueStyles).toContain(".sbux-table-toolbar[data-has-start-content='true']")
    expect(vueStyles).toContain('.sbux-table-toolbar__quick-filters--start')
    expect(vueStyles).toContain('.sbux-table-toolbar__quick-filters--end')
    expect(vueStyles).toContain(".sbux-table-toolbar__quick-filter[data-filter-type='buttonGroup']")
    expect(vueStyles).toContain('flex: 1 1 0;')
    expect(vueStyles).toContain('.sbux-table-toolbar__menu-content')
    expect(vueStyles).toContain('.sbux-table-toolbar__selection-count')
    expect(vueStyles).toContain('color: var(--color-primary);')
    expect(vueStyles).toContain('.sbux-table-toolbar__more-group--standard')
    expect(vueStyles).toContain('.sbux-table-toolbar__more-group--compact')
    expect(vueStyles).toContain('.sbux-table-toolbar__operation-action--priority-2')
    expect(vueStyles).not.toContain('!important')
    expect(vueStyles).not.toMatch(/^\.arco-/m)
  })
})
