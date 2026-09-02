import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { TagGroupManagement } from '../index'
import type { TagGroupContentContext, TagGroupManagementProps } from '../index'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('React TagGroupManagement public entry', () => {
  it('exports the business component from the package main entry', () => {
    expect(typeof TagGroupManagement).toBe('function')
  })

  it('exports the public context and props types through the package main entry', () => {
    const renderContent: NonNullable<TagGroupManagementProps['renderContent']> = (context: TagGroupContentContext) =>
      context.activeGroup?.name ?? null

    expect(renderContent({ activeGroupId: null, activeGroup: null })).toBeNull()
  })

  it('keeps TagGroupManagement internals out of the package main entry', () => {
    const entry = readFileSync(resolve(srcDir, 'index.ts'), 'utf8')

    expect(entry).toContain("export { TagGroupManagement } from './business/tag-group-management'")
    expect(entry).toContain('TagGroupManagementProps')
    expect(entry).not.toContain('use-tag-group-management')
    expect(entry).not.toContain('normalize')
    expect(entry).not.toContain('selection')
    expect(entry).not.toContain('permissions')
  })
})
