import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../../../../../')
const starterRoot = path.join(repoRoot, 'distribution/designkit-starter-v1')
const readStarter = (relativePath) => readFile(path.join(starterRoot, relativePath), 'utf8')

test('P1.4.5 Starter references harden integrated activity rules', async () => {
  const [baselines, usage, binding, shell, basicList, cardList, pageHeader, breadcrumb] = await Promise.all([
    readStarter('references/default-template-baselines.md'),
    readStarter('references/template-usage-contract.md'),
    readStarter('references/implementation-binding-contract.md'),
    readStarter('references/application-shell.md'),
    readStarter('patterns/basic-list.html'),
    readStarter('patterns/card-list.html'),
    readStarter('patterns/page-header.html'),
    readStarter('patterns/breadcrumb.html'),
  ])

  assert.match(cardList, /data-action-variant="secondary-outlined-only"/)
  assert.match(cardList, /data-primary-action="forbidden"/)
  assert.match(cardList, /data-priority="visible-vs-more"/)
  assert.match(pageHeader, /data-action-hierarchy="secondary-outlined-plus-primary-far-right"/)
  assert.match(pageHeader, /data-primary-action-position="far-right"/)
  assert.match(breadcrumb, /data-header-to-content-gap="shared-approved"/)
  assert.match(basicList, /data-content-surface="approved"/)
  assert.match(basicList, /data-data-region-inset="4px 16px 16px"/)

  const joined = [baselines, usage, binding, shell].join('\n')
  for (const phrase of [
    'highest-priority action',
    'Secondary Outlined',
    'actual Runtime `Link`',
    'Runtime `Table`',
    'level 2 及更深层级默认不使用 icon',
  ]) assert.match(joined, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})

test('P1.4.5 Starter references preserve one Basic List surface and scoped component ownership', async () => {
  const [usage, binding] = await Promise.all([
    readStarter('references/template-usage-contract.md'),
    readStarter('references/implementation-binding-contract.md'),
  ])

  assert.match(usage, /Content Surface\[TableToolbar \(Filter Region \+ Action Region\) → Table → Pagination\]/)
  assert.match(usage, /one approved Content Surface/)
  assert.match(binding, /one approved Content Surface around the continuous/)
  assert.match(binding, /row hover binds to the Runtime `Table` hover selectors and theme tokens/)
  assert.doesNotMatch(binding, /private row-hover CSS.*approved/)
})
