import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const repoRoot = new URL('../../../../../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, repoRoot), 'utf8')
}

async function digest(relativePath) {
  const contents = await readFile(new URL(relativePath, repoRoot))
  return createHash('sha256').update(contents).digest('hex')
}

test('runtime-backed fixture binds real Runtime navigation and arco icons', async () => {
  const fixture = await read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html')

  assert.match(fixture, /const \{[\s\S]*?Menu,[\s\S]*?\} = window\.StarbucksReact/)
  assert.match(fixture, /<Menu className="dk-shell-fixture__top-menu" mode="horizontal"/)
  assert.match(fixture, /collapse=\{collapsed\}/)
  assert.match(fixture, /onCollapseChange=/)
  assert.match(fixture, /const \{[\s\S]*?IconMoon,[\s\S]*?IconNotification,[\s\S]*?IconSun,[\s\S]*?\} = window\.arcoicon/)
  const runtimeDestructure = fixture.match(/const \{([\s\S]*?)\} = window\.StarbucksReact/)
  assert.ok(runtimeDestructure)
  assert.doesNotMatch(runtimeDestructure[1], /Icon(?:Moon|Sun|Notification)/)

  for (const component of ['Button', 'Badge', 'Cascader', 'Dropdown', 'Empty', 'Input', 'Space', 'Avatar', 'TableToolbar', 'Table', 'Pagination']) {
    assert.match(fixture, new RegExp(`<${component}(?:\\s|>)`), component)
  }
})

test('theme DOM contract, target icon labels, persistence, and action order are explicit', async () => {
  const fixture = await read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html')

  assert.match(fixture, /designkit-starter-theme/)
  assert.ok(fixture.indexOf('window.localStorage.getItem') < fixture.indexOf('window.matchMedia'))
  assert.match(fixture, /document\.documentElement\.setAttribute\('data-theme', nextTheme\)/)
  assert.match(fixture, /document\.body\.setAttribute\('arco-theme', 'dark'\)/)
  assert.match(fixture, /document\.body\.setAttribute\('data-arco-theme', 'dark'\)/)
  assert.match(fixture, /document\.body\.removeAttribute\('arco-theme'\)/)
  assert.match(fixture, /document\.body\.removeAttribute\('data-arco-theme'\)/)
  assert.match(fixture, /theme === 'light' \? '切换到深色模式' : '切换到浅色模式'/)
  assert.match(fixture, /theme === 'light' \? IconMoon : IconSun/)

  const order = ['system-switch', 'notification', 'theme-toggle', 'divider', 'user']
  const positions = order.map((action) => fixture.indexOf(`data-shell-action="${action}"`))
  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
  assert.doesNotMatch(fixture, /starlight-theme|ThemeProvider|Theme API/)
})

test('human-review remediation binds the real System Switch to the shared Side collapse state', async () => {
  const [fixture, styles] = await Promise.all([
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html'),
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.css'),
  ])

  assert.match(fixture, /data-shell-action="system-switch"/)
  assert.match(fixture, /<Cascader[\s\S]*?popupVisible=\{switcherVisible\}/)
  assert.match(fixture, /style=\{\{ width: collapsed \? 56 : 260, flexBasis: collapsed \? 56 : 260 \}\}/)
  assert.match(fixture, /style=\{\{ width: collapsed \? 56 : 260 \}\}[\s\S]*?collapse=\{collapsed\}/)
  assert.match(fixture, /data-collapsed=\{String\(collapsed\)\}/)
  assert.match(fixture, /aria-label=\{`当前系统：\$\{currentSystemLabel\}`\}/)
  assert.match(styles, /identity\[data-collapsed='true'\][\s\S]*?padding-right:\s*0[\s\S]*?padding-left:\s*0/)
  assert.match(styles, /identity\[data-collapsed='true'\][\s\S]*?justify-content:\s*center/)
  assert.match(styles, /identity\[data-collapsed='true'\]\s*>\s*\.dk-shell-fixture__system-trigger[\s\S]*?padding:\s*0[\s\S]*?visibility:\s*hidden/)
})

test('human-review remediation keeps Main spacing, Basic List row actions, and QuickFilter ownership canonical', async () => {
  const [fixture, styles] = await Promise.all([
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html'),
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.css'),
  ])

  assert.match(styles, /\.dk-shell-fixture__main\s*\{[\s\S]*?padding:\s*var\(--spacing-6\) var\(--spacing-8\) var\(--spacing-12\)/)
  assert.match(styles, /\.dk-shell-fixture__page\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*none/)
  assert.match(fixture, /<Space className="sbux-table-row-actions" size=\{4\}>[\s\S]*?<Button type="text" size="mini"[\s\S]*?<Dropdown[\s\S]*?<IconMore \/>/)
  assert.doesNotMatch(`${fixture}\n${styles}`, /dk-shell-fixture__row-actions|size="small"|删除商品|color="red"/)
  assert.doesNotMatch(fixture, /<Select(?:\s|>)/)
  assert.match(fixture, /<TableToolbar[\s\S]*?type: 'select'[\s\S]*?name: 'category'[\s\S]*?type: 'search'[\s\S]*?\/>[\s\S]*?<Table[\s\S]*?<Pagination/)
})

test('fixture preserves shell ownership, Basic List anatomy, and responsive geometry', async () => {
  const [fixture, styles] = await Promise.all([
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html'),
    read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.css'),
  ])

  assert.match(fixture, /defaultSelectedKeys=\{\['product-list'\]\}/)
  assert.match(fixture, /data-template="basic-list"[\s\S]*?<TableToolbar[\s\S]*?<Table[\s\S]*?<Pagination/)
  assert.doesNotMatch(fixture, /Breadcrumb/)
  assert.match(styles, /--dk-shell-top-height:\s*54px/)
  assert.match(styles, /--dk-shell-side-expanded:\s*260px/)
  assert.match(styles, /--dk-shell-side-collapsed:\s*var\(--spacing-14\)/)
  assert.match(styles, /body\s*\{[\s\S]*?--dk-page-gutter:\s*var\(--spacing-6\)/)
  assert.match(styles, /\.dk-shell-fixture__main\s*\{[\s\S]*?min-width:\s*0/)
  assert.doesNotMatch(styles, /\.dk-shell-fixture__(?:body|main|side|top)[^{]*\{[^}]*overflow:\s*hidden/)
  assert.match(styles, /\.dk-shell-fixture__data-region\s*\{[\s\S]*?padding:\s*4px var\(--dk-page-gutter\) var\(--dk-page-gutter\)/)
  assert.match(styles, /\.dk-shell-fixture__data-region\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/)
  assert.match(styles, /\.dk-shell-fixture__table-wrap\s*\{[\s\S]*?overflow-x:\s*auto/)
  assert.match(styles, /@media \(max-width: 1023px\)/)
  assert.match(styles, /@media \(max-width: 767px\)/)
  assert.doesNotMatch(`${fixture}\n${styles}`, /Drawer|Hamburger|Bottom Navigation|BottomNavigation|Overlay Sidebar/)
  assert.doesNotMatch(styles, /!important/)
  assert.doesNotMatch(styles, /#00754a|rgb\(44, 44, 44\)|rgb\(36, 36, 36\)/)
})

test('clean-room decisions keep default, content-only, and none mutually exclusive', async () => {
  const fixture = await read('packages/docs/site/src/styles/__tests__/fixtures/default-application-shell.html')

  assert.match(fixture, /帮我做一个商品管理列表页[\s\S]*?template: 'Basic List'[\s\S]*?shellMode: 'default'[\s\S]*?'Brand Top Menu'[\s\S]*?'Collapsible Side Menu'[\s\S]*?'Theme Toggle'/)
  assert.match(fixture, /已经有顶部和侧边导航[\s\S]*?shellMode: 'content-only'[\s\S]*?output: Object\.freeze\(\['Basic List'\]\)/)
  assert.match(fixture, /独立的 Card List Demo[\s\S]*?shellMode: 'none'[\s\S]*?output: Object\.freeze\(\['Card List'\]\)/)
  assert.doesNotMatch(fixture, /Navigation Shell engineering capability|custom-navigation-shell/)
})

test('Golden, Runtime, and R2 ZIP protected artifacts remain byte-identical', async () => {
  assert.equal(
    await digest('distribution/designkit-starter-v1/examples/multi-select-card-list.html'),
    'e7cba2cc6976fb6fa7d3a78db2231459b61c28902f4ec5c3ef03e5e14be03dd5',
  )
  assert.equal(
    await digest('distribution/designkit-starter-v1/runtime/starbucks-react.umd.js'),
    'b9bdcb4185b796a430144841de030959c5730c2a912cc58557134bca3448bddd',
  )
  assert.equal(
    await digest('distribution/designkit-starter-v1/runtime/starbucks-react.css'),
    'f96f234dfb0768ffdcca74b7764ecc24a926fd078a5db74255e8d9780e9564a7',
  )
  assert.equal(
    await digest('distribution/releases/designkit-starter-v1-r2.zip'),
    '1fcebf2e53658c756c6e6d69eed45c67abb79c48a4800d60877b421c40729203',
  )
})
