import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../../../../../')
const starterRoot = path.join(repoRoot, 'distribution/designkit-starter-v1')
const readStarter = (relativePath) => readFile(path.join(starterRoot, relativePath), 'utf8')

test('P1.4.6 Starter references close Basic List spacing and Table structure', async () => {
  const [basicList, baselines, usage, binding] = await Promise.all([
    readStarter('patterns/basic-list.html'),
    readStarter('references/default-template-baselines.md'),
    readStarter('references/template-usage-contract.md'),
    readStarter('references/implementation-binding-contract.md'),
  ])

  for (const marker of [
    'data-toolbar-own-vertical-padding="12px"',
    'data-toolbar-table-gap="0"',
    'data-table-columns-fixed="first-two-left+operation-right"',
    'data-operation-column-width="180px"',
    'data-row-actions="approved-table-row-actions"',
    'data-row-action-align="center"',
    'data-row-action-gap="4px"',
  ]) assert.match(basicList, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

  const joined = [baselines, usage, binding].join('\n')
  for (const phrase of [
    'Toolbar 与 Table 之间没有额外外部 gap',
    'the external Toolbar→Table gap is `0`',
    'fixed: \'left\'',
    'fixed: \'right\'',
    'approved centered `4px`-gap layout',
  ]) assert.match(joined, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})

test('P1.4.6 Drawer reference gives action ownership to the Drawer footer', async () => {
  const [drawer, drawerForm, baselines, usage, binding] = await Promise.all([
    readStarter('patterns/drawer.html'),
    readStarter('patterns/drawer-form.html'),
    readStarter('references/default-template-baselines.md'),
    readStarter('references/template-usage-contract.md'),
    readStarter('references/implementation-binding-contract.md'),
  ])

  assert.match(drawer, /data-footer="approved-drawer-footer"/)
  assert.match(drawer, /data-action-region-owner="drawer"/)
  assert.match(drawer, /data-action-region-count="1"/)
  assert.match(drawerForm, /data-action-owner="drawer-footer"/)
  assert.match(drawerForm, /data-form-action-region="suppressed-in-drawer"/)
  assert.match(drawerForm, /data-form-action-region="absent"/)
  assert.match(drawerForm, /data-action-region-count="1"/)
  assert.doesNotMatch(drawerForm, /<FormActions\b/)

  const joined = [baselines, usage, binding].join('\n')
  assert.match(joined, /Drawer owns exactly one action region/)
  assert.match(joined, /nested Form.*omit FormActions/)
})
