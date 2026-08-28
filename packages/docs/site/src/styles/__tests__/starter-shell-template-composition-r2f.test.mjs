import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const repoRoot = new URL('../../../../../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, repoRoot), 'utf8')
}

test('R2-R.3.2 binds the approved Shell and Basic List references without Golden or source leakage', async () => {
  const manifest = JSON.parse(await read('distribution/designkit-starter-v1/manifest.json'))
  const shellReference = await read('distribution/designkit-starter-v1/patterns/default-application-shell.html')
  const listReference = await read('distribution/designkit-starter-v1/patterns/basic-list.html')

  assert.deepEqual(manifest.referenceImplementations, [
    {
      id: 'default-application-shell',
      capability: 'starter.pattern.default-application-shell',
      path: 'patterns/default-application-shell.html',
      status: 'approved reference implementation',
      golden: false,
      mainSlot: 'approved-template',
    },
    {
      id: 'basic-list',
      capability: 'starter.template.basic-list',
      path: 'patterns/basic-list.html',
      status: 'approved template reference',
      golden: false,
    },
  ])
  assert.equal(shellReference.includes('Golden: NO'), true)
  assert.equal(listReference.includes('Golden: NO'), true)
  assert.match(shellReference, /data-shell-main-slot="approved-template"/)
  assert.match(shellReference, /data-shell-region="top"[\s\S]*data-shell-region="side"[\s\S]*data-shell-region="main"/)
  assert.match(listReference, /data-template-region="page-header"[\s\S]*data-template-slot="CONTEXT_HELP"[\s\S]*data-toolbar-region="filter"[\s\S]*data-toolbar-region="actions"[\s\S]*data-template-region="table"[\s\S]*data-template-region="pagination"/)
  for (const source of [shellReference, listReference]) {
    assert.doesNotMatch(source, /packages\/|docs\/site|\.codex|\/Users\/|\/tmp\//)
    assert.doesNotMatch(source, /<svg[\s>]/)
  }
})

test('R2-R.3.2 keeps the approved Brand Top Navigation subtree and fixed Starbucks asset', async () => {
  const [reference, shellContract, binding, approvedTopNav, approvedTopNavStyles, logoAsset, fixture] = await Promise.all([
    read('distribution/designkit-starter-v1/patterns/default-application-shell.html'),
    read('distribution/designkit-starter-v1/references/application-shell.md'),
    read('distribution/designkit-starter-v1/references/implementation-binding-contract.md'),
    read('packages/docs/site/src/demos/menu/top-nav-menu.tsx'),
    read('packages/docs/site/src/demos/menu/top-nav-menu.css'),
    read('distribution/designkit-starter-v1/assets/starbucks-system-logo.svg'),
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html'),
  ])
  assert.match(reference, /data-reference-subtree="approved-brand-top-navigation"/)
  assert.match(reference, /assets\/starbucks-system-logo\.svg/)
  assert.match(reference, /sb-top-nav-demo__menu[\s\S]*sb-top-nav-demo__quick-actions[\s\S]*sb-top-nav-demo__divider[\s\S]*sb-top-nav-demo__user-area/)
  assert.match(shellContract, /整体绑定 approved Brand Top Navigation subtree[\s\S]*不得重新定义 Menu item/)
  assert.match(binding, /complete approved Brand Top Navigation subtree[\s\S]*fixed Starbucks logo/)
  for (const className of ['sb-top-nav-demo__menu', 'sb-top-nav-demo__quick-actions', 'sb-top-nav-demo__notification', 'sb-top-nav-demo__action', 'sb-top-nav-demo__divider', 'sb-top-nav-demo__user-area', 'sb-top-nav-demo__avatar', 'sb-top-nav-demo__user']) {
    assert.match(approvedTopNav, new RegExp(className))
    assert.match(approvedTopNavStyles, new RegExp(className.replaceAll('__', '\\__')))
  }
  assert.match(approvedTopNavStyles, /sb-top-nav-demo--brand[\s\S]*background: rgba\(255, 255, 255, 0\.12\)/)
  assert.match(approvedTopNavStyles, /sb-top-nav-demo__action\.arco-btn[\s\S]*width: var\(--spacing-10\)/)
  assert.match(logoAsset, /<svg[\s\S]*circle[\s\S]*fill="white"[\s\S]*fill="#006241"/)
  assert.match(fixture, /data-reference-subtree="approved-brand-top-navigation"[\s\S]*data-shell-slot="CURRENT_MENU_TITLE"/)
  assert.match(fixture, /<Avatar className="dk-shell-fixture__avatar" size=\{32\}>N<\/Avatar>[\s\S]*<button className="dk-shell-fixture__user"/)
})

test('R2-R.3.2 Icon Binding keeps fixed mappings and validates every runtime name', async () => {
  const [manifestSource, binding, shellContract, starterShell] = await Promise.all([
    read('distribution/designkit-starter-v1/manifest.json'),
    read('distribution/designkit-starter-v1/references/implementation-binding-contract.md'),
    read('distribution/designkit-starter-v1/references/application-shell.md'),
    read('distribution/designkit-starter-v1/patterns/default-application-shell.html'),
  ])
  const manifest = JSON.parse(manifestSource)
  assert.deepEqual(manifest.iconBinding.fixedPatternIcons, {
    notification: 'IconNotification',
    lightToDark: 'IconMoon',
    darkToLight: 'IconSun',
    create: 'IconPlus',
    more: 'IconMore',
    delete: 'IconDelete',
  })
  assert.equal(manifest.brandAssets.starbucksSystemLogo, 'assets/starbucks-system-logo.svg')
  assert.equal(manifest.iconBinding.source, 'window.arcoicon')
  for (const iconName of ['IconNotification', 'IconMoon', 'IconSun', 'IconPlus', 'IconMore', 'IconDelete']) {
    assert.match(binding, new RegExp(iconName))
    assert.match(shellContract, new RegExp(iconName))
    assert.match(starterShell, new RegExp(iconName))
  }
  assert.match(binding, /typeof window\.arcoicon\[iconName\] !== 'undefined'/)
  assert.match(binding, /IconProductCenter|IconInventoryManagement/)
  assert.match(binding, /emoji.*hand-drawn SVG.*CSS-drawn icons|Emoji、手绘 SVG、CSS Icon、第三方 Icon/i)
})

test('R2-R.3.2 keeps Basic List chrome in the real React/Vue template and restores Context Help', async () => {
  const [reactDemo, vueDemo, breadcrumb, docs, templateBinding] = await Promise.all([
    read('packages/docs/site/src/demos/template-pages/basic-list.tsx'),
    read('packages/docs/site/src/demos/template-pages/basic-list.vue'),
    read('packages/docs/site/src/components/TemplatePageBreadcrumb.astro'),
    read('packages/docs/site/src/content/docs/templates/data-list/basic-list.mdx'),
    read('distribution/designkit-starter-v1/references/template-usage-contract.md'),
  ])
  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /sb-basic-list-page__header/)
    assert.match(source, /IconInfoCircle/)
    assert.match(source, /aria-label="门店列表说明"/)
    assert.match(source, /TableToolbar/)
    assert.match(source, /sbux-table-row-actions/)
    assert.match(source, /Pagination/)
    assert.doesNotMatch(source, /persistent page subtitle|<p className=.*subtitle|className="[^"]*subtitle/)
    assert.doesNotMatch(source, /createPortal|Teleport.*basic-list|data-template-action-host="basic-list"/)
  }
  assert.doesNotMatch(breadcrumb, /data-template-action-host="basic-list"/)
  assert.match(docs, /Context Help|上下文帮助/)
  assert.match(templateBinding, /patterns\/basic-list\.html[\s\S]*Page Header[\s\S]*Context Help[\s\S]*persistent page subtitle/)
})

test('R2-R.3.2 fixture binds Side icons from arcoicon and validates existence before render', async () => {
  const [fixture, styles] = await Promise.all([
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html'),
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.css'),
  ])
  assert.match(fixture, /const \{[\s\S]*?IconHome,[\s\S]*?IconInfoCircle,[\s\S]*?IconMore,[\s\S]*?IconNotification,[\s\S]*?IconPlus,[\s\S]*?IconSun,[\s\S]*?\} = window\.arcoicon/)
  assert.match(fixture, /const requiredIconNames = \[[\s\S]*?'IconHome'[\s\S]*?'IconPlus'[\s\S]*?'IconSun'/)
  assert.match(fixture, /typeof window\.arcoicon\[iconName\] === 'undefined'/)
  assert.match(fixture, /IconHome|IconApps|IconOrderedList|IconDashboard/)
  assert.match(fixture, /data-shell-region="side"[\s\S]*?collapse=\{collapsed\}/)
  assert.match(fixture, /data-shell-region="main"[\s\S]*?data-template="basic-list"[\s\S]*?<TableToolbar[\s\S]*?<Table[\s\S]*?<Pagination/)
  assert.match(styles, /dk-shell-fixture__page-title-help[\s\S]*?focus-visible/)
  assert.doesNotMatch(fixture, /IconProductCenter|IconInventoryManagement|<svg|😀|🔔/)
})
