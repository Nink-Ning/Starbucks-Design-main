import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const overridesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../overrides')
const readOverride = (name: string) =>
  readFileSync(resolve(overridesDir, `${name}.less`), 'utf8')

describe('input disabled styles', () => {
  it('removes the Textarea wrapper fill behind word limits', () => {
    expect(readOverride('Input')).toContain(
      '.arco-textarea-wrapper {\n  background-color: transparent;\n}',
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
