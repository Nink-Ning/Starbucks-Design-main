import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { TableToolbar } from '../index'
import type { TableToolbarQuickFilterPlacement, TableToolbarQuickFilterSource } from '../index'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source: TableToolbarQuickFilterSource = 'searchSubmit'
const placement: TableToolbarQuickFilterPlacement = 'start'

describe('React TableToolbar public entry', () => {
  it('exports the public component and contract', () => {
    expect(typeof TableToolbar).toBe('function')
    expect(source).toBe('searchSubmit')
    expect(placement).toBe('start')
    const entry = readFileSync(resolve(srcDir, 'index.ts'), 'utf8')
    expect(entry).toContain("export { TableToolbar } from './business/table-toolbar'")
    expect(entry).not.toContain('use-table-toolbar')
    expect(entry).not.toContain('normalizeToolConfig')
  })
})
