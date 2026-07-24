import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const stepsStyles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../overrides/Steps.less'),
  'utf8',
)

describe('Steps semantic token overrides', () => {
  it('uses shared semantic variables for error states and typography', () => {
    expect(stepsStyles).not.toContain('rgb(var(--danger-4))')
    expect(stepsStyles).toContain('background-color: var(--color-danger);')
    expect(stepsStyles).toContain('color: var(--color-danger);')
    expect(stepsStyles).toContain('border-color: var(--color-danger);')
    expect(stepsStyles).toContain('border-left-color: var(--color-danger);')
    expect(stepsStyles).toContain('line-height: var(--lh-28);')
    expect(stepsStyles).toContain('line-height: var(--lh-24);')
  })
})
