import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const overridesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../overrides')
const inputTagStyles = readFileSync(resolve(overridesDir, 'InputTag.less'), 'utf8')
const multiSelectTagStyles = readFileSync(
  resolve(overridesDir, 'MultiSelectTag.less'),
  'utf8',
)
const overrideIndex = readFileSync(resolve(overridesDir, '_index.less'), 'utf8')

describe('Vue InputTag shared visual contract', () => {
  it('loads the shared filled selected-tag treatment', () => {
    expect(overrideIndex).toContain("@import './MultiSelectTag.less';")
    expect(multiSelectTagStyles).toContain(
      '.arco-input-tag-tag.arco-tag-checked',
    )
    expect(multiSelectTagStyles).toContain(
      'background-color: var(--bg-color-component);',
    )
    expect(multiSelectTagStyles).toContain('border-color: transparent;')
  })

  it('aligns error and disabled states with the shared Input shell', () => {
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-error,[\s\S]*?background-color: var\(--bg-color-container\);[\s\S]*?border-color: var\(--color-danger\);/,
    )
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-disabled,[\s\S]*?background-color: var\(--bg-color-component-disabled\);[\s\S]*?border-color: var\(--color-border-component\);/,
    )
  })

  it('keeps wrapping layout overrides maintainable without important rules', () => {
    expect(inputTagStyles).toContain(
      '.arco-input-tag .arco-input-tag-inner {',
    )
    expect(inputTagStyles).toContain('gap: var(--spacing-2);')
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-size-medium \.arco-input-tag-inner,[\s\S]*?padding-top: 0;[\s\S]*?padding-bottom: 0;/,
    )
    expect(inputTagStyles).not.toContain('!important')
  })

  it('keeps addon hover neutral and reserves a centered clear-icon slot', () => {
    expect(inputTagStyles).not.toMatch(
      /:has\(> \.arco-input-tag-add(?:before|after)\) > \.arco-input-tag:hover/,
    )
    expect(inputTagStyles).toContain(
      '.arco-input-tag.arco-input-tag-has-suffix {\n  padding-right: var(--spacing-3);',
    )
    expect(inputTagStyles).toContain(
      '.arco-input-tag .arco-input-tag-suffix {\n  flex: 0 0 16px;',
    )
    expect(inputTagStyles).toContain('margin-left: var(--spacing-2);')
  })

  it('wins the native size rules without increasing the component height', () => {
    expect(inputTagStyles).toContain(
      '.arco-input-tag.arco-input-tag-size-mini .arco-input-tag-tag,',
    )
    expect(inputTagStyles).toContain(
      '.arco-input-tag.arco-input-tag-size-large .arco-input-tag-tag,',
    )
    expect(inputTagStyles).toContain(
      '.arco-input-tag.arco-input-tag-size-mini .arco-input-tag-view,',
    )
    expect(inputTagStyles).toContain(
      '.arco-input-tag.arco-input-tag-size-large .arco-input-tag-view {',
    )
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-size-mini[\s\S]*?\.arco-input-tag-inner[\s\S]*?\.arco-input-tag-input,[\s\S]*?height: 20px;[\s\S]*?margin: 0;/,
    )
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-size-large[\s\S]*?\.arco-input-tag-inner[\s\S]*?\.arco-input-tag-input \{[\s\S]*?height: 24px;[\s\S]*?margin: 0;/,
    )
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-size-large \.arco-input-tag-tag,[\s\S]*?height: 24px;[\s\S]*?min-height: 24px;[\s\S]*?margin: 0;/,
    )
  })
})
