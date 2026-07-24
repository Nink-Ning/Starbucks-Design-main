import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const overridesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../overrides')
const styles = readFileSync(resolve(overridesDir, 'MultiSelectTag.less'), 'utf8')
const overrideIndex = readFileSync(resolve(overridesDir, '_index.less'), 'utf8')

describe('shared multi-select tag styles', () => {
  it('loads the shared selected-tag override for every InputTag-backed component', () => {
    expect(overrideIndex).toContain("@import './MultiSelectTag.less';")
    expect(styles).toContain('.arco-input-tag-tag.arco-tag-checked')
  })

  it('uses filled component tokens instead of an outlined tag treatment', () => {
    expect(styles).toContain('background-color: var(--bg-color-component);')
    expect(styles).toContain('background-color: var(--bg-color-component-hover);')
    expect(styles).toContain('background-color: var(--bg-color-component-disabled);')
    expect(styles).toContain('border-color: transparent;')
    expect(styles).toContain('border-radius: var(--border-radius-sm);')
    expect(styles).not.toContain('background-color: transparent;')
    expect(styles).not.toContain('var(--color-border-component)')
  })
})
