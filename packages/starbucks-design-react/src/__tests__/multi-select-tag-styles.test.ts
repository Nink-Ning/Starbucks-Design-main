import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const overridesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../overrides')
const styles = readFileSync(resolve(overridesDir, 'MultiSelectTag.less'), 'utf8')
const inputTagStyles = readFileSync(resolve(overridesDir, 'InputTag.less'), 'utf8')
const selectStyles = readFileSync(resolve(overridesDir, 'Select.less'), 'utf8')
const overrideIndex = readFileSync(resolve(overridesDir, '_index.less'), 'utf8')
const theme = readFileSync(resolve(overridesDir, '../theme.css'), 'utf8')

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

  it('keeps the rendered distance between adjacent tags at 4px', () => {
    expect(inputTagStyles).toContain('gap: var(--spacing-2);')
    expect(theme).toContain('--spacing-2: 4px;')
    expect(styles).toContain('margin: 0;')
  })

  it('keeps InputTag states aligned with the shared Input shell', () => {
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-error,[\s\S]*?background-color: var\(--bg-color-container\);[\s\S]*?border-color: var\(--color-danger\);/,
    )
    expect(inputTagStyles).toMatch(
      /\.arco-input-tag\.arco-input-tag-disabled,[\s\S]*?background-color: var\(--bg-color-component-disabled\);[\s\S]*?border-color: var\(--color-border-component\);/,
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

  it('centers default and compact tags inside the Select content area', () => {
    expect(selectStyles).toContain(
      '.arco-select-multiple .arco-input-tag {\n  height: 24px;\n  min-height: 24px;',
    )
    expect(selectStyles).toContain(
      '.arco-select-multiple .arco-input-tag-inner {\n  align-items: center;\n  height: 24px;',
    )
    expect(selectStyles).toContain(
      '.arco-select-size-small.arco-select-multiple .arco-input-tag-inner {\n  height: 20px;',
    )
    expect(selectStyles).toContain('margin: 0 !important;')
  })
})
