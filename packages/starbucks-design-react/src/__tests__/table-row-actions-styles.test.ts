import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reactStyles = readFileSync(resolve(srcDir, 'overrides/TableRowActions.less'), 'utf8')
const vueStyles = readFileSync(resolve(srcDir, '../../starbucks-design-vue/src/overrides/TableRowActions.less'), 'utf8')

describe('TableRowActions shared styles', () => {
  it('keeps React and Vue styles identical', () => {
    expect(reactStyles).toBe(vueStyles)
  })

  it('keeps brand text Button visuals scoped to table row actions', () => {
    const entry = readFileSync(resolve(srcDir, 'components.less'), 'utf8')

    expect(entry).toContain("@import './overrides/TableRowActions.less';")
    expect(reactStyles).toContain('.sbux-table-row-actions')
    expect(reactStyles).toContain('color: var(--color-text-brand);')
    expect(reactStyles).toContain('background-color: var(--color-primary-light);')
    expect(reactStyles).toContain('background-color: var(--color-primary-light-hover);')
    expect(reactStyles).toContain(':focus-visible')
    expect(reactStyles).not.toContain('!important')
    expect(reactStyles).not.toMatch(/^\.arco-/m)
  })
})
