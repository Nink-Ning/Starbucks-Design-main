import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../../../../../')
const starterRoot = path.join(repoRoot, 'distribution/designkit-starter-v1')
const readStarter = (relativePath) => readFile(path.join(starterRoot, relativePath), 'utf8')

test('P1.4.1 candidate contract freezes Shell and page-context bindings', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))
  assert.deepEqual(manifest.candidateHumanReviewContract, {
    phase: 'P1.4.2',
    status: 'HUMAN_REVIEW_FAIL_NEXT_RELEASE_CANDIDATE_NOT_APPROVED',
    sourceBaseline: 'TARGETED_REOPEN_FOR_HUMAN_REPORTED_CORRECTIONS_ONLY',
    defaultShell: {
      reference: 'patterns/default-application-shell.html',
      styleReference: 'assets/default-application-shell.css',
      domStructureReuse: 'required',
      mainSlot: 'approved-template',
      runtimeComposition: ['Menu', 'Cascader', 'Badge', 'Button', 'Avatar', 'Dropdown'],
    },
    pageContext: {
      level1: { title: '20px', back: false, breadcrumb: false },
      level2: { title: '20px', back: 'icon-only', breadcrumb: false },
      depthGte3: { title: false, back: false, breadcrumb: 'approved-only' },
      drawer: { title: true, close: true, fullPageBack: false, breadcrumb: false },
    },
    darkMode: {
      mechanism: 'html[data-theme]+body[arco-theme]+body[data-arco-theme]',
      storageKey: 'designkit-starter-theme',
      sameDomAsLight: true,
      usesExistingRuntimeTokens: true,
      themeProvider: false,
      additionalDependency: false,
    },
    explicitOverrideIsolation: 'H changes media shape only',
  })
  const shellBinding = manifest.referenceImplementations.find(({ id }) => id === 'default-application-shell')
  assert.equal(shellBinding.bindingStrategy, 'reference-dom-structure+approved-runtime-slots')
})

test('P1.4.1 executable references contain approved structure and no external source paths', async () => {
  const shell = await readStarter('patterns/default-application-shell.html')
  assert.match(shell, /data-reference-structure="complete-shell-dom"/)
  assert.match(shell, /data-reference-style="assets\/default-application-shell\.css"/)
  assert.match(shell, /data-reference-subtree="approved-brand-top-navigation"/)
  assert.match(shell, /data-shell-slot="SYSTEM_SWITCH"/)
  assert.match(shell, /data-shell-slot="CURRENT_MENU_TITLE"/)
  assert.match(shell, /data-shell-slot="NOTIFICATION"/)
  assert.match(shell, /data-shell-slot="THEME_TOGGLE"/)
  assert.match(shell, /data-shell-slot="USER_ACCESS"/)
  assert.match(shell, /data-shell-main-slot="approved-template" data-shell-slot-role="complete-template-subtree"/)
  assert.doesNotMatch(shell, /(?:packages\/docs\/site|\/Users\/|\/tmp\/)/)

  const pageHeader = await readStarter('patterns/page-header.html')
  assert.match(pageHeader, /data-level-1="title\+context-help"/)
  assert.match(pageHeader, /data-level-2="icon-back\+title\+context-help"/)
  assert.match(pageHeader, /data-depth-gte-3="breadcrumb-only"/)
  assert.match(pageHeader, /data-depth-gte-3-title="absent"/)
  assert.match(pageHeader, /data-depth-gte-3-back="absent"/)
  assert.match(pageHeader, /data-depth-gte-3-context-help="absent"/)

  const breadcrumb = await readStarter('patterns/breadcrumb.html')
  assert.match(breadcrumb, /data-depth-rule="level-1-title-only-level-2-icon-back-title-depth-gte-3-breadcrumb-only"/)
  assert.match(breadcrumb, /data-depth-gte-3-title="absent"/)
  assert.match(breadcrumb, /data-depth-gte-3-back="absent"/)

  const drawer = await readStarter('patterns/drawer-form.html')
  assert.match(drawer, /data-host-container-border="absent"/)
  assert.match(drawer, /\.p11-surface[^\n]*border: 0/)

  const shellStyle = await readStarter('assets/default-application-shell.css')
  assert.match(shellStyle, /var\(--color-primary/)
  assert.match(shellStyle, /var\(--bg-color-page/)
  assert.match(shellStyle, /\.dk-shell-reference__identity\[data-collapsed='true'\][\s\S]*width: 56px[\s\S]*flex-basis: 56px/)
  assert.match(shellStyle, /\.dk-shell-reference__identity\[data-collapsed='true'\] \+ \.dk-shell-reference__main \.sb-top-nav-demo__menu[\s\S]*display: none/)
  assert.match(shellStyle, /\.sb-top-nav-demo__logo[\s\S]*width: 32px[\s\S]*height: 32px/)
  assert.match(shellStyle, /\.sb-top-nav-system-cascader[\s\S]*flex: 1/)
  assert.match(shellStyle, /\.sb-top-nav-demo__system-copy[\s\S]*justify-content: flex-start/)
  assert.match(shellStyle, /\.sb-top-nav-demo__system-arrows[\s\S]*width: 16px[\s\S]*height: 16px/)
  assert.match(shellStyle, /\.dk-shell-reference \.sb-top-nav-demo__action\.arco-btn[\s\S]*width: 32px[\s\S]*height: 32px/)
  assert.match(shellStyle, /\.sb-top-nav-demo__action\.arco-btn\.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):hover[\s\S]*background: rgba\(255, 255, 255, 0\.12\)/)
  assert.match(shellStyle, /\.dk-shell-reference \.sb-top-nav-demo__action\.arco-btn > \.arco-icon[\s\S]*width: 16px[\s\S]*height: 16px[\s\S]*font-size: 16px/)
  assert.match(shellStyle, /\.sb-top-nav-demo__notification \.arco-badge-number[\s\S]*min-width: 16px[\s\S]*height: 16px[\s\S]*font-size: 10px[\s\S]*box-shadow: 0 0 0 2px var\(--color-primary\)/)
  assert.match(shellStyle, /\.dk-shell-reference \.sb-top-nav-demo__avatar\.arco-avatar[\s\S]*width: 32px[\s\S]*height: 32px/)
  assert.match(shellStyle, /\.sb-top-nav-demo__divider[\s\S]*height: 16px/)
  assert.doesNotMatch(shellStyle, /!important/)
})

test('P1.4.1 scenarios and prompts use depth >= 3 Breadcrumb-only contract', async () => {
  const scenarios = await readStarter('references/validation/p1-clean-room-scenarios.md')
  for (const id of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']) assert.match(scenarios, new RegExp(`\\| ${id} \\|`))
  assert.match(scenarios, /depth >= 3 is approved Breadcrumb-only/)
  assert.match(scenarios, /no independent Page Title, Back or title-level Context Help/)

  const files = [
    'references/default-template-baselines.md',
    'references/implementation-binding-contract.md',
    'references/template-usage-contract.md',
    'references/application-shell.md',
    'templates/detail.md',
    'templates/form.md',
    'prompts/new-demo.md',
    'prompts/refine-demo.md',
    'prompts/review-demo.md',
  ]
  const contents = await Promise.all(files.map(readStarter))
  for (const content of contents) assert.match(content, /depth >= 3/)
  assert.match(contents.join('\n'), /reference DOM\/structure/)
  assert.doesNotMatch(contents.join('\n'), /depth > 2/)
})

test('P1.4.2 references expose the existing theme mechanism and locked surfaces', async () => {
  const files = [
    'patterns/basic-form.html',
    'patterns/grouped-form.html',
    'patterns/step-form.html',
    'patterns/drawer-form.html',
    'examples/detail.html',
    'prompts/new-demo.md',
    'prompts/refine-demo.md',
    'prompts/review-demo.md',
  ]
  const contents = await Promise.all(files.map(readStarter))
  const joined = contents.join('\n')
  assert.match(joined, /designkit-starter-theme/)
  assert.match(joined, /html\[data-theme\]/)
  assert.match(joined, /arco-theme/)
  assert.match(joined, /border-radius: 6px/)
  assert.doesNotMatch(joined, /ThemeProvider/)
})
