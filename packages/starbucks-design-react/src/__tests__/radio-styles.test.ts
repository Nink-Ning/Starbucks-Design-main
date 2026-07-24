import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('Radio styles', () => {
  it('uses the shared 4px radius token for button groups', () => {
    const styles = readFileSync(resolve(srcDir, 'overrides/Radio.less'), 'utf8')
    const groupRule = styles.match(/\.arco-radio-group-type-button\s*\{[\s\S]*?\}/)?.[0] ?? ''

    expect(groupRule).toContain('border-radius: var(--border-radius-sm);')
    expect(groupRule).not.toContain('border-radius: var(--border-radius-md);')
  })

  it('provides outline, primary-filled, and default-filled button group variants', () => {
    const styles = readFileSync(resolve(srcDir, 'overrides/Radio.less'), 'utf8')

    expect(styles).toContain('.arco-radio-group-variant-outline')
    expect(styles).toContain('.arco-radio-group-variant-primary-filled')
    expect(styles).toContain('.arco-radio-group-variant-default-filled')
    expect(styles).not.toMatch(/\.starbucks-[A-Za-z0-9_-]+/)
    expect(styles).toMatch(
      /\.arco-radio-group-variant-primary-filled,\s*\.arco-radio-group-type-button\.arco-radio-group-variant-default-filled\s*\{[\s\S]*?border-radius: var\(--border-radius-sm\);/,
    )
  })
})
