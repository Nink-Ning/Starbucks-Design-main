import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const styles = readFileSync(resolve(srcDir, 'overrides/Tag.less'), 'utf8')

describe('Vue Tag visual contract', () => {
  it('matches the shared size and typography metrics', () => {
    expect(styles).toContain('height: 20px;')
    expect(styles).toContain('height: 24px;')
    expect(styles).toContain('height: 30px;')
    expect(styles).not.toContain('font-size: var(--fs-14);\n  line-height: var(--lh-22);')
  })

  it('contains the compatible Figma state mapping', () => {
    expect(styles).toContain('.arco-tag.arco-tag-bordered:not(.arco-tag-checkable)')
    expect(styles).toContain('.arco-tag-checkable:not(.arco-tag-checked)')
    expect(styles).toContain('.arco-tag-checkable.arco-tag-checked')
    expect(styles).toContain('background-color: var(--color-primary);')
    expect(styles).toContain('background-color: var(--color-warning);')
    expect(styles).toContain('background-color: var(--color-danger);')
  })

  it('keeps compound selected-tag adapters outside the base Tag override', () => {
    expect(styles).not.toContain('.arco-input-tag')
    expect(styles).not.toContain('.arco-select')
  })
})
