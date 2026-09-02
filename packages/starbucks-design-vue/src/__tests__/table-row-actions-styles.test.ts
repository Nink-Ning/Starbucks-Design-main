import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const vueStyles = readFileSync(resolve(srcDir, 'overrides/TableRowActions.less'), 'utf8')
const reactStyles = readFileSync(resolve(srcDir, '../../starbucks-design-react/src/overrides/TableRowActions.less'), 'utf8')

describe('TableRowActions shared styles', () => {
  it('keeps Vue and React styles identical', () => {
    expect(vueStyles).toBe(reactStyles)
  })

  it('keeps brand text Button visuals scoped to table row actions', () => {
    const entry = readFileSync(resolve(srcDir, 'components.less'), 'utf8')

    expect(entry).toContain("@import './overrides/TableRowActions.less';")
    expect(vueStyles).toContain('.sbux-table-row-actions')
    expect(vueStyles).toContain('color: var(--color-text-brand);')
    expect(vueStyles).toContain('background-color: var(--color-primary-light);')
    expect(vueStyles).toContain('background-color: var(--color-primary-light-hover);')
    expect(vueStyles).toContain(':focus-visible')
    expect(vueStyles).not.toContain('!important')
    expect(vueStyles).not.toMatch(/^\.arco-/m)
  })
})
