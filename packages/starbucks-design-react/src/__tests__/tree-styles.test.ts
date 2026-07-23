import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const treeStyles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../overrides/Tree.less'),
  'utf8',
)

describe('Tree Figma overrides', () => {
  it('keeps switcher glyphs readable inside the 16px interaction target', () => {
    expect(treeStyles).toContain('font-size: var(--fs-12);')
    expect(treeStyles).toContain(
      '.arco-tree-node-switcher-icon svg {\n' +
        '  width: 12px;\n' +
        '  height: 12px;\n' +
        '  font-size: var(--fs-12);\n' +
        '}',
    )
  })
})
