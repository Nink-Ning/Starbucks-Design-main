import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const repoRoot = new URL('../../../../../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, repoRoot), 'utf8')
}

test('canonical and Starter registries register only the narrow Default Application Shell capability', async () => {
  const [canonical, sourceRegistry, starterRegistry, manifestSource, readme, startHere] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('skills/starbucks-design/references/capability-registry.md'),
    read('distribution/designkit-starter-v1/references/capability-registry.md'),
    read('distribution/designkit-starter-v1/manifest.json'),
    read('distribution/designkit-starter-v1/README.md'),
    read('distribution/designkit-starter-v1/START-HERE.md'),
  ])
  const manifest = JSON.parse(manifestSource)

  for (const source of [canonical, sourceRegistry, starterRegistry]) {
    assert.match(source, /starter\.pattern\.default-application-shell/)
    assert.match(source, /Support state[^\n]*`SUPPORTED`/i)
    assert.match(source, /fixed|restricted/i)
  }

  assert.match(sourceRegistry, /docs\.pattern\.navigation-shell[^\n]*Docs Full/)
  assert.deepEqual(manifest.patternCapabilities, ['starter.pattern.default-application-shell'])
  assert.deepEqual(manifest.patternCapabilityFiles, ['references/application-shell.md'])
  assert.equal(manifest.knowledge.capabilitySummary.total, 12)
  assert.equal(manifest.knowledge.capabilitySummary.categories.patterns, 1)
  assert.equal(manifest.validation.phase, 'starter-v1-r2-formal-starter-integration')
  assert.equal(
    [...starterRegistry.matchAll(/^\| `starter\./gm)].length,
    manifest.knowledge.capabilitySummary.total,
  )
  for (const reference of manifest.knowledge.referenceInventory) {
    await assert.doesNotReject(() =>
      read(`distribution/designkit-starter-v1/${reference.file}`),
    )
  }

  for (const boundary of [
    'custom-navigation-shell',
    'navigation-api',
    'dynamic-permission-menu',
    'backend-driven-navigation',
    'real-router',
    'permission-routing',
    'system-switch-backend-logic',
    'react-vue-project-navigation-integration',
  ]) {
    assert.ok(manifest.unsupported.includes(boundary), boundary)
  }
  assert.match(readme, /企业系统框架[\s\S]*默认使用 DesignKit 标准顶部导航和可折叠侧边菜单[\s\S]*全局 Light \/ Dark/)
  assert.match(startHere, /常规后台页面默认使用 `default`[\s\S]*已有系统框架[\s\S]*`content-only`[\s\S]*独立 Demo[\s\S]*`none`/)
  assert.doesNotMatch(readme, /Navigation Shell\s*[：:：]\s*暂不支持/)
})

test('Shell modes and decision order are canonical and default is the Starter default', async () => {
  const [canonical, sourceSelection, starterSelection, starterSkill] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('skills/starbucks-design/references/decisions/template-selection.md'),
    read('distribution/designkit-starter-v1/references/decisions/template-selection.md'),
    read('distribution/designkit-starter-v1/SKILL.md'),
  ])

  for (const source of [canonical, sourceSelection, starterSelection, starterSkill]) {
    assert.match(source, /`default`/)
    assert.match(source, /`content-only`/)
    assert.match(source, /`none`/)
  }

  for (const source of [canonical, sourceSelection, starterSelection]) {
    assert.match(source, /不得创建第四种|不得创建.*第四种|只允许三个/)
  }

  assert.match(canonical, /Product Manager[\s\S]*Starter[^\n]*默认值/)
  assert.match(
    canonical,
    /User Request[\s\S]*Profile Routing[\s\S]*Capability Boundary[\s\S]*Template Decision[\s\S]*Shell Mode Decision[\s\S]*Implementation Binding[\s\S]*Generated Page[\s\S]*Validation/,
  )
  assert.match(starterSkill, /没有用户覆盖时使用 `default`/)
})

test('Top, Side, icon, theme, and persistence bindings are explicit without a Theme Provider', async () => {
  const [canonical, binding, projectedBinding] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('skills/starbucks-design/references/implementation-binding-contract.md'),
    read('distribution/designkit-starter-v1/references/implementation-binding-contract.md'),
  ])

  assert.match(
    canonical,
    /Store \/ System Switch[\s\S]*Notification[\s\S]*Theme Toggle[\s\S]*Divider[\s\S]*Avatar \/ User/,
  )
  assert.match(canonical, /Light[^\n]*window\.arcoicon\.IconMoon[^\n]*切换到深色模式/)
  assert.match(canonical, /Dark[^\n]*window\.arcoicon\.IconSun[^\n]*切换到浅色模式/)
  assert.match(canonical, /window\.arcoicon\.IconNotification/)
  assert.match(canonical, /禁止从 `window\.StarbucksReact` 解构 icon/)
  assert.match(canonical, /data-theme="light"[\s\S]*移除 `arco-theme` 和 `data-arco-theme`/)
  assert.match(canonical, /data-theme="dark"[\s\S]*arco-theme="dark"[^\n]*data-arco-theme="dark"/)
  assert.match(canonical, /designkit-starter-theme/)
  assert.match(canonical, /explicit local choice[^\n]*prefers-color-scheme[^\n]*light/)

  for (const source of [canonical, binding, projectedBinding]) {
    assert.match(source, /StarbucksReact\.Menu/)
    assert.match(source, /window\.arcoicon/)
    assert.match(source, /Theme Provider/)
    assert.match(source, /不得新增 Theme API|Do not add a Theme API|Theme API, Theme Provider/)
  }
})

test('Shell ownership preserves Breadcrumb and Basic List spacing', async () => {
  const [canonical, usage, projectedUsage] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('skills/starbucks-design/references/template-usage-contract.md'),
    read('distribution/designkit-starter-v1/references/template-usage-contract.md'),
  ])

  for (const source of [canonical, usage, projectedUsage]) {
    assert.match(source, /Shell[^\n]*(?:must not|不得|不能)[^\n]*Template anatomy/i)
    assert.match(source, /4px \/ 16px \/ 16px/)
    assert.match(source, /Side Navigation[^\n]*(?:不等于|does not make)[^\n]*Breadcrumb/i)
  }

  assert.match(canonical, /Root List[^\n]*不显示/)
  assert.match(canonical, /Create、Edit、Detail[^\n]*真实父级/)
})

test('human-approved Shell remediation decisions are projected without adding template capabilities', async () => {
  const [canonical, projected] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('distribution/designkit-starter-v1/references/application-shell.md'),
  ])

  for (const source of [canonical, projected]) {
    assert.match(source, /Brand \/ System Region[\s\S]*System Switch/)
    assert.match(source, /(?:same|同一份).*collapsed state[\s\S]*260px[\s\S]*56px/i)
    assert.match(source, /fixed `24px` horizontal padding[\s\S]*width: `?100%`?/i)
    assert.doesNotMatch(source, /sbux-table-row-actions|QuickFilter.*row|row.*QuickFilter/i)
  }
})

test('responsive contract closes 1280, 768, and 390 without inventing mobile navigation', async () => {
  const [canonical, projected, validation, goldenMapping] = await Promise.all([
    read('skills/starbucks-design/references/application-shell.md'),
    read('distribution/designkit-starter-v1/references/application-shell.md'),
    read('distribution/designkit-starter-v1/references/validation/validation-contract.md'),
    read('distribution/designkit-starter-v1/references/golden-example-mapping.md'),
  ])

  for (const source of [canonical, projected]) {
    assert.match(source, />= ?1024px|>= 1024px/)
    assert.match(source, /768[–-]1023px/)
    assert.match(source, /260px/)
    assert.match(source, /56px/)
    assert.match(source, /390px/)
    assert.match(source, /Brand \/ system identity[\s\S]*Notification[\s\S]*Theme Toggle[\s\S]*User access/)
    assert.match(source, /Drawer[\s\S]*Hamburger[\s\S]*Bottom Navigation/)
    assert.match(source, /RESPONSIVE CONTRACT BLOCKED/)
  }

  assert.match(validation, /1280\/768\/390/)
  assert.match(validation, /document-level overflow/)
  assert.match(goldenMapping, /IMPLEMENTATION REFERENCE/)
  assert.match(goldenMapping, /Starter Golden：`None`/)
  assert.match(goldenMapping, /test-only composition fixture/)
})

test('Starter prompts default, preserve, and review the approved Shell contract', async () => {
  const [newDemo, refineDemo, reviewDemo] = await Promise.all([
    read('distribution/designkit-starter-v1/prompts/new-demo.md'),
    read('distribution/designkit-starter-v1/prompts/refine-demo.md'),
    read('distribution/designkit-starter-v1/prompts/review-demo.md'),
  ])

  assert.match(newDemo, /未填写时为 default/)
  assert.match(newDemo, /常规后台页默认使用 `default`/)
  assert.match(refineDemo, /refinement 不得重新设计 Shell/)
  assert.match(reviewDemo, /是否使用批准.*Top\/Side Menu|是否使用批准的 Brand Top Menu|是否整体复用批准的 Brand Top Navigation subtree/)
  assert.match(reviewDemo, /是否泄漏 Custom Navigation Shell/)
})
