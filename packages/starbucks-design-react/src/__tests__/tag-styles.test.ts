import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reactStyles = readFileSync(resolve(srcDir, 'overrides/Tag.less'), 'utf8')
const vueStyles = readFileSync(
  resolve(srcDir, '../../starbucks-design-vue/src/overrides/Tag.less'),
  'utf8',
)

describe('React Tag visual contract', () => {
  it('keeps the React and Vue overrides identical', () => {
    expect(reactStyles).toBe(vueStyles)
  })

  it('matches the Figma size and typography metrics', () => {
    expect(reactStyles).toMatch(
      /\.arco-tag-size-small\s*\{[^}]*height: 20px;[^}]*padding: 0 var\(--spacing-2\);[^}]*font-size: var\(--fs-12\);[^}]*line-height: var\(--lh-20\);/s,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-size-medium,[\s\S]*?\.arco-tag-size-default\s*\{[^}]*height: 24px;[^}]*padding: 0 var\(--spacing-4\);[^}]*font-size: var\(--fs-12\);[^}]*line-height: var\(--lh-20\);/,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-size-large\s*\{[^}]*height: 30px;[^}]*padding: 0 var\(--spacing-5\);[^}]*font-size: var\(--fs-12\);[^}]*line-height: var\(--lh-20\);/s,
    )
  })

  it('maps the existing API to light, light-outline, outline, and dark treatments', () => {
    expect(reactStyles).toMatch(
      /\.arco-tag\s*\{[^}]*background-color: var\(--bg-color-container-hover\);[^}]*border: 1px solid transparent;/s,
    )
    expect(reactStyles).toContain(
      '.arco-tag.arco-tag-bordered:not(.arco-tag-checkable)',
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-checkable:not\(\.arco-tag-checked\)\s*\{[^}]*background-color: transparent;[^}]*border-color: var\(--color-border-1\);/s,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-checkable\.arco-tag-checked\s*\{[^}]*background-color: var\(--color-border-1\);[^}]*border-color: transparent;/s,
    )
    expect(reactStyles).toContain('background-color: var(--color-success-focus);')
    expect(reactStyles).toContain('background-color: var(--color-warning-light);')
    expect(reactStyles).toContain('background-color: var(--color-danger-light);')
  })

  it('uses the Figma icon, close-button, and gap metrics', () => {
    expect(reactStyles).toMatch(
      /\.arco-tag-icon\s*\{[^}]*margin-right: var\(--spacing-2\);[^}]*font-size: var\(--fs-14\);/s,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-size-large \.arco-tag-icon\s*\{[^}]*margin-right: var\(--spacing-4\);[^}]*font-size: var\(--fs-16\);/s,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-size-small \.arco-tag-close-btn,[\s\S]*?margin-left: var\(--spacing-2\);[\s\S]*?font-size: var\(--fs-14\);/,
    )
    expect(reactStyles).toMatch(
      /\.arco-tag-size-large \.arco-tag-close-btn,[\s\S]*?margin-left: var\(--spacing-5\);[\s\S]*?font-size: var\(--fs-16\);/,
    )
  })

  it('does not override InputTag or Select selected-tag adapters', () => {
    expect(reactStyles).not.toContain('.arco-input-tag')
    expect(reactStyles).not.toContain('.arco-select')
  })
})
