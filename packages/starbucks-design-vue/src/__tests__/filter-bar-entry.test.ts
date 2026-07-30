import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { FilterBar } from '../index'
import type { FilterRenderFieldContext } from '../index'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const getControlId = (context: FilterRenderFieldContext) => context.controlId

describe('Vue FilterBar public entry', () => {
  it('exports the business component from the package main entry', () => {
    expect(FilterBar).toBeTruthy()
  })

  it('keeps FilterBar internals out of the package main entry', () => {
    const entry = readFileSync(resolve(srcDir, 'index.ts'), 'utf8')

    expect(entry).toContain("export { FilterBar } from './business/filter-bar'")
    expect(entry).toContain('FilterRenderFieldContext')
    expect(entry).not.toContain('use-filter-bar')
    expect(entry).not.toContain('adapters')
    expect(entry).not.toContain('normalize')
    expect(entry).not.toContain('validation')
    expect(entry).not.toContain('layout')
  })

  it('exports the render field context contract from the package main entry', () => {
    expect(
      getControlId({
        field: { type: 'input', name: 'keyword', label: 'Keyword' },
        value: '',
        disabled: false,
        controlId: 'filter-keyword',
        onChange: () => undefined,
      }),
    ).toBe('filter-keyword')
  })
})
