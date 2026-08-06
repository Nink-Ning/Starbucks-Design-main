import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const overridesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../overrides')
const readOverride = (name: string) =>
  readFileSync(resolve(overridesDir, `${name}.less`), 'utf8')

describe('input disabled styles', () => {
  it('uses one Textarea shell when word limits add a wrapper', () => {
    const styles = readOverride('Input')

    expect(styles).toContain('.arco-textarea-wrapper {')
    expect(styles).toContain('border: 1px solid var(--color-border-component);')
    expect(styles).toContain(
      '.arco-textarea-wrapper:focus-within,\n.arco-textarea-wrapper.arco-textarea-focus {',
    )
    expect(styles).toContain(
      '.arco-textarea-wrapper:not(.arco-textarea-disabled, :has(> .arco-textarea-disabled), :focus-within):hover {',
    )
    expect(styles).toContain(
      '.arco-textarea-wrapper .arco-textarea,\n' +
        '.arco-textarea-wrapper .arco-textarea:hover,',
    )
    expect(styles).toMatch(
      /\.arco-textarea-wrapper \.arco-textarea,[\s\S]*?background-color: transparent;[\s\S]*?border: none;[\s\S]*?box-shadow: none;/,
    )
  })

  it.each(['Input', 'InputNumber', 'InputTag'])(
    'keeps the shared component border on disabled %s controls',
    (name) => {
      const styles = readOverride(name)

      expect(styles).toContain('background-color: var(--bg-color-component-disabled);')
      expect(styles).toContain('border-color: var(--color-border-component);')
      expect(styles).not.toContain(
        'border-color: var(--bg-color-component-disabled);',
      )
    },
  )
})

describe('input addon styles', () => {
  it('aligns addBefore and addAfter labels with the Select addon pattern', () => {
    const styles = readOverride('Input')

    expect(styles).toContain(
      '.arco-input-group-addbefore,\n.arco-input-group-addafter {',
    )
    expect(styles).toContain('min-height: 32px;')
    expect(styles).toContain('padding: 0 var(--spacing-6);')
    expect(styles).toContain('font-size: var(--fs-14);')
    expect(styles).toContain('line-height: var(--lh-22);')
    expect(styles).toContain('vertical-align: middle;')
    expect(styles).toContain('border: 1px solid var(--color-border-component);')
    expect(styles).toContain('border-radius: var(--border-radius-sm);')
  })
})
