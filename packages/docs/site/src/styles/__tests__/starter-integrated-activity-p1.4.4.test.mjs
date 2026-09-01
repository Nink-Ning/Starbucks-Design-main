import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../../../../../')
const starterRoot = path.join(repoRoot, 'distribution/designkit-starter-v1')
const readStarter = (relativePath) => readFile(path.join(starterRoot, relativePath), 'utf8')

test('P1.4.4 package projection exposes the integrated activity reference chain', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))
  const implementationIds = new Set(manifest.referenceImplementations.map(({ id }) => id))

  for (const id of [
    'default-application-shell',
    'basic-list',
    'card-list',
    'basic-detail',
    'page-header',
    'breadcrumb',
    'grouped-form',
    'step-form',
  ]) assert.ok(implementationIds.has(id), `${id} must remain manifest-discoverable`)

  for (const relativePath of [
    'patterns/default-application-shell.html',
    'patterns/basic-list.html',
    'patterns/card-list.html',
    'patterns/basic-detail.html',
    'patterns/page-header.html',
    'patterns/breadcrumb.html',
    'patterns/grouped-form.html',
    'patterns/step-form.html',
    'examples/multi-select-card-list.html',
    'runtime/starbucks-react.css',
  ]) await readStarter(relativePath)
})

test('P1.4.4 package references encode shared component ownership', async () => {
  const [shell, list, card, header, breadcrumb, grouped, step, cardExample, runtimeCss] = await Promise.all([
    readStarter('patterns/default-application-shell.html'),
    readStarter('patterns/basic-list.html'),
    readStarter('patterns/card-list.html'),
    readStarter('patterns/page-header.html'),
    readStarter('patterns/breadcrumb.html'),
    readStarter('patterns/grouped-form.html'),
    readStarter('patterns/step-form.html'),
    readStarter('examples/multi-select-card-list.html'),
    readStarter('runtime/starbucks-react.css'),
  ])

  assert.match(shell, /data-reference-structure="complete-shell-dom"/)
  for (const slot of ['SYSTEM_SWITCH', 'CURRENT_MENU_TITLE', 'NOTIFICATION', 'THEME_TOGGLE', 'DIVIDER', 'USER_ACCESS']) {
    assert.match(shell, new RegExp(`data-shell-slot="${slot}"`))
  }
  assert.match(shell, /data-shell-main-slot="approved-template" data-shell-slot-role="complete-template-subtree"/)

  assert.match(list, /sb-basic-list-page__table-module[\s\S]*data-template-region="continuous-data-region"/)
  assert.match(card, /data-selection-summary-policy="exactly-one-canonical-summary"/)
  assert.match(card, /data-hide-generic-selection-summary="true"/)
  assert.match(card, /data-template-slot="CARD_BATCH_ACTIONS" data-selection-owner="page" data-action-owner="card-list"/)
  assert.match(header, /data-back-control="Button\[type=secondary\]\[shape=square\]"/)
  assert.match(breadcrumb, /data-depth-rule="level-1-title-only-level-2-icon-back-title-depth-gte-3-breadcrumb-only"/)
  assert.match(grouped, /data-runtime-binding="native-section\+FormGrid\+FormActions"/)
  assert.match(step, /data-runtime-binding="Steps\+native-layout\+FormGrid\+FormActions"/)

  assert.match(cardExample, /className="dk-card-toolbar__select-all"/)
  assert.match(cardExample, /selectedCount=\{selectedIds\.size\}/)
  assert.match(cardExample, /operationActions=\{batchActions\}/)
  assert.match(cardExample, /sbux-table-toolbar__selection[\s\S]*display: none/)
  assert.match(runtimeCss, /\.sbux-table-row-actions/)
})

test('P1.4.4 shell reference preserves approved geometry without private overrides', async () => {
  const shellCss = await readStarter('assets/default-application-shell.css')
  assert.match(shellCss, /\.dk-shell-reference__identity\[data-collapsed='true'\][\s\S]*?width: 56px[\s\S]*?flex-basis: 56px/)
  assert.match(shellCss, /\.sb-top-nav-demo__menu\.arco-menu-horizontal[\s\S]*?min-width: 102px[\s\S]*?height: 32px/)
  assert.match(shellCss, /\.sb-top-nav-demo__action\.arco-btn[\s\S]*?width: 32px[\s\S]*?height: 32px/)
  assert.match(shellCss, /\.sb-top-nav-demo__notification \.arco-badge-number[\s\S]*?min-width: 16px[\s\S]*?height: 16px/)
  assert.match(shellCss, /\.sb-top-nav-demo__avatar\.arco-avatar[\s\S]*?width: 32px[\s\S]*?height: 32px/)
  assert.doesNotMatch(shellCss, /!important/)
})
