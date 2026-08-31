import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const repoRoot = new URL('../../../../', new URL('../../', import.meta.url))
const starterDir = new URL('distribution/designkit-starter-v1/', repoRoot)
const r1Zip = new URL('distribution/releases/designkit-starter-v1-r1.zip', repoRoot)
const r2Zip = new URL('distribution/releases/designkit-starter-v1-r2.zip', repoRoot)
const cardGolden = new URL('examples/multi-select-card-list.html', starterDir)

async function readStarter(relativePath, encoding = 'utf8') {
  return readFile(new URL(relativePath, starterDir), encoding)
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex')
}

function archiveText(archive, member) {
  return execFileSync('unzip', ['-p', fileURLToPath(archive), `designkit-starter-v1/${member}`]).toString('utf8')
}

test('P1.1 manifest resolves every enabled reference and executable variant', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))

  assert.equal(manifest.defaultTemplateContract.defaultIsStandardAnswer, true)
  assert.deepEqual(manifest.defaultTemplateContract.authorityChain, [
    'Docs approved implementation',
    'Starter authoritative reference',
    'Generated output',
  ])

  for (const entry of manifest.knowledge.referenceInventory) {
    await readStarter(entry.file)
  }
  for (const entry of manifest.referenceImplementations) {
    await readStarter(entry.path)
  }

  for (const id of ['card-list', 'basic-form', 'basic-detail', 'page-header', 'breadcrumb', 'drawer']) {
    const entry = manifest.referenceImplementations.find((item) => item.id === id)
    assert.ok(entry, `${id} reference is missing`)
    assert.equal(entry.defaultEnabled, true, `${id} should be enabled`)
  }

  for (const id of ['grouped-form', 'step-form', 'drawer-form']) {
    const entry = manifest.templateVariants.find((item) => item.id === id)
    assert.ok(entry, `${id} variant is missing`)
    assert.equal(entry.starterEnabled, true, `${id} should be enabled after P1.1 binding closure`)
    assert.equal(entry.status, 'approved-executable-reference')
    assert.ok(manifest.supportedTemplates.includes(id), `${id} should be discoverable as supported`)
  }
})

test('P1 references encode the standard answer and context-specific hard rules', async () => {
  const [baseline, card, form, grouped, step, detail, drawerForm, header, breadcrumb, drawer] = await Promise.all([
    readStarter('references/default-template-baselines.md'),
    readStarter('patterns/card-list.html'),
    readStarter('patterns/basic-form.html'),
    readStarter('patterns/grouped-form.html'),
    readStarter('patterns/step-form.html'),
    readStarter('patterns/basic-detail.html'),
    readStarter('patterns/drawer-form.html'),
    readStarter('patterns/page-header.html'),
    readStarter('patterns/breadcrumb.html'),
    readStarter('patterns/drawer.html'),
  ])

  assert.match(baseline, /APPROVED DEFAULT TEMPLATE = STANDARD ANSWER/)
  assert.match(baseline, /默认允许适配：[\s\S]*业务字段、标签、值、状态、Mock 数据和筛选选项/)
  assert.match(baseline, /Card List[\s\S]*?圆形/)
  assert.match(baseline, /一个 canonical visible selection summary/)
  assert.match(baseline, /FULL-PAGE FORM[\s\S]*?24px[\s\S]*?32px/)
  assert.match(baseline, /FULL-PAGE DETAIL[\s\S]*?二级 Page Header 为 icon-only Back \+ 20px Page Title \+ optional Context Help/)
  assert.match(baseline, /DRAWER FORM[\s\S]*?24px\/24px/)
  assert.match(baseline, /SUPPORTED CAPABILITY != CAPABILITY ENABLED BY DEFAULT/)

  assert.match(card, /data-media-shape="circle"/)
  assert.match(card, /data-template-slot="CONTEXT_HELP"[\s\S]*?data-optional="true"/)
  assert.match(card, /data-selection-summary-policy="exactly-one-canonical-summary"/)
  assert.match(card, /data-hide-generic-selection-summary="true"/)
  assert.match(card, /data-template-slot="CARD_BATCH_ACTIONS" data-selection-owner="page" data-action-owner="card-list"/)
  assert.match(card, /data-card-anatomy="approved-only"/)
  assert.match(card, /data-media-override="explicit-only"/)
  assert.match(card, /data-metadata-policy="approved-only"/)
  assert.match(card, /CARD_FOOTER_ACTIONS/)
  assert.match(form, /data-template-context="FULL-PAGE-FORM"/)
  assert.match(form, /data-template-slot="CONTEXT_HELP"[\s\S]*?data-optional="true"/)
  assert.match(form, /data-surface-width="available-main"/)
  assert.match(form, /data-horizontal-padding="32px-min"/)
  assert.match(grouped, /data-reference-executable="true"/)
  assert.match(grouped, /data-runtime-binding="native-section\+FormGrid\+FormActions"/)
  assert.match(step, /data-reference-executable="true"/)
  assert.match(step, /data-runtime-binding="Steps\+native-layout\+FormGrid\+FormActions"/)
  assert.match(detail, /data-template-context="FULL-PAGE-DETAIL"/)
  assert.match(detail, /data-template-slot="CONTEXT_HELP"[\s\S]*?data-optional="true"/)
  assert.match(drawerForm, /data-template-context="DRAWER-FORM"/)
  assert.match(drawerForm, /data-padding="24px"/)
  assert.match(header, /data-title-font-size="20px"/)
  assert.match(header, /data-level-2="icon-back\+title\+context-help"/)
  assert.match(header, /data-back-control="Button\[type=secondary\]\[shape=square\]"/)
  assert.match(header, /data-context-help-icon="IconQuestionCircle"/)
  assert.match(header, /data-subtitle-default="false"/)
  assert.match(breadcrumb, /depth-1-no-back-depth-2-icon-back-depth-gt-2-approved-breadcrumb/)
  assert.match(drawer, /data-body-padding="24px"/)
})

test('P1 prompt and template contracts audit default drift without changing Goldens', async () => {
  const [newPrompt, refinePrompt, reviewPrompt, cardTemplate, formTemplate, detailTemplate, quality] = await Promise.all([
    readStarter('prompts/new-demo.md'),
    readStarter('prompts/refine-demo.md'),
    readStarter('prompts/review-demo.md'),
    readStarter('templates/card-list.md'),
    readStarter('templates/form.md'),
    readStarter('templates/detail.md'),
    readStarter('references/quality-checklist.md'),
  ])
  assert.match(newPrompt, /APPROVED DEFAULT TEMPLATE = STANDARD ANSWER/)
  assert.match(refinePrompt, /reference 是标准答案/)
  assert.match(reviewPrompt, /default contract/)
  assert.match(cardTemplate, /APPROVED DEFAULT TEMPLATE = STANDARD ANSWER/)
  assert.match(cardTemplate, /square、rounded-square、rect hero 或新的媒体 banner 只能来自明确 override/)
  assert.match(formTemplate, /APPROVED DEFAULT TEMPLATE = STANDARD ANSWER/)
  assert.match(detailTemplate, /APPROVED DEFAULT TEMPLATE = STANDARD ANSWER/)
  assert.match(quality, /default-template-baselines\.md/)
  assert.match(newPrompt, /starterEnabled/)
  assert.match(newPrompt, /circular media/)
  assert.match(newPrompt, /canonical visible selection summary/)
  assert.match(newPrompt, /FULL-PAGE FORM/)
  assert.match(newPrompt, /DRAWER FORM/)
  assert.match(refinePrompt, /reference 是标准答案/)
  assert.match(reviewPrompt, /media shape/)
  assert.match(reviewPrompt, /duplicate title/)
  assert.match(quality, /canonical visible selection summary/)
  assert.match(quality, /depth 2.*icon-only Back.*Breadcrumb/)
  assert.match(quality, /starterEnabled: true/)
})

test('Docs authority still contains the real paired implementations and approved context bindings', async () => {
  const docsRoot = new URL('packages/docs/site/src/', repoRoot)
  const sources = await Promise.all([
    readFile(new URL('demos/template-pages/basic-form.tsx', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/basic-form.vue', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/grouped-form.tsx', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/grouped-form.vue', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/step-form.tsx', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/step-form.vue', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/basic-detail.tsx', docsRoot), 'utf8'),
    readFile(new URL('demos/template-pages/basic-detail.vue', docsRoot), 'utf8'),
    readFile(new URL('packages/starbucks-design-react/src/pro/page-header/PageHeader.tsx', repoRoot), 'utf8'),
    readFile(new URL('packages/starbucks-design-vue/src/pro/page-header/PageHeader.vue', repoRoot), 'utf8'),
    readFile(new URL('packages/starbucks-design-react/src/pro/page-header/style.less', repoRoot), 'utf8'),
    readFile(new URL('packages/starbucks-design-vue/src/pro/page-header/style.less', repoRoot), 'utf8'),
    readFile(new URL('packages/starbucks-design-react/src/overrides/Drawer.less', repoRoot), 'utf8'),
    readFile(new URL('demos/drawer/drawer-form.tsx', docsRoot), 'utf8'),
  ])
  const [basicFormReact, basicFormVue, groupedReact, groupedVue, stepReact, stepVue, detailReact, detailVue, pageHeaderReact, pageHeaderVue, pageHeaderReactStyle, pageHeaderVueStyle, drawerStyle, drawerDemo] = sources

  for (const source of [basicFormReact, basicFormVue]) {
    assert.match(source, /FormPageLayout/)
    assert.match(source, /FormGrid/)
    assert.match(source, /FormActions/)
  }
  for (const source of [groupedReact, groupedVue]) assert.match(source, /FormSection/)
  for (const source of [stepReact, stepVue]) assert.match(source, /StepFormLayout/)
  for (const source of [basicFormReact, basicFormVue, groupedReact, groupedVue, stepReact, stepVue, detailReact, detailVue]) {
    assert.match(source, /PageHeader/)
  }
  for (const source of [detailReact, detailVue]) {
    assert.match(source, /DetailPageLayout/)
    assert.match(source, /DetailDescriptions/)
    assert.match(source, /couponBasicInfoColumns/)
    assert.match(source, /column=\{1\}|:column="1"/)
    assert.match(source, /tableLayout="auto"|table-layout="auto"/)
    assert.match(source, /labelStyle|label-style/)
    assert.doesNotMatch(source, /description\s*=/)
  }
  assert.match(pageHeaderReact, /<Button[\s\S]*?aria-label="返回上一级"/)
  assert.match(pageHeaderVue, /<AButton[\s\S]*?aria-label="返回上一级"/)
  assert.match(pageHeaderReactStyle, /font-size:\s*var\(--fs-20\)/)
  assert.match(pageHeaderVueStyle, /font-size:\s*var\(--fs-20\)/)
  assert.match(drawerStyle, /arco-drawer-(?:content|body)[\s\S]*?var\(--spacing-8\)/)
  assert.match(drawerDemo, /<Drawer[\s\S]*?<Form/)
  assert.doesNotMatch(drawerDemo, /Breadcrumb|backable|persistent subtitle/i)
})

test('frozen R1, R2 and Card List Golden hashes remain unchanged', async () => {
  const [r1, r2, golden] = await Promise.all([readFile(r1Zip), readFile(r2Zip), readFile(cardGolden)])

  assert.equal(sha256(r1), '6287895a54ebc0828f9e8250cb05d132ff7712c38fddceb891cfb0126a7302cf')
  assert.equal(sha256(r2), '65ab2f82b7192ed276bcddfee8ab8dbc07fd46338e5b960b1f8fa5321bc2fa20')
  assert.equal(sha256(golden), 'e7cba2cc6976fb6fa7d3a78db2231459b61c28902f4ec5c3ef03e5e14be03dd5')

  const r2Manifest = JSON.parse(archiveText(r2Zip, 'manifest.json'))
  assert.equal(r2Manifest.releaseRevision, 2)
  assert.equal(r2Manifest.releaseId, 'designkit-starter-v1-r2')
  const r2Members = execFileSync('unzip', ['-Z1', fileURLToPath(r2Zip)]).toString('utf8').split('\n')
  assert.ok(!r2Members.includes('designkit-starter-v1/references/default-template-baselines.md'))
})

test('P1.1 clean-room scenarios are explicit about enabled bindings', async () => {
  const baseline = await readStarter('references/default-template-baselines.md')
  const scenarios = await readStarter('references/validation/p1-clean-room-scenarios.md')
  const manifest = JSON.parse(await readStarter('manifest.json'))

  assert.match(baseline, /Card List[\s\S]*?APPROVED/)
  assert.match(baseline, /Basic Form[\s\S]*?APPROVED/)
  for (const id of ['A', 'B', 'C', 'D', 'E', 'F']) {
    assert.match(scenarios, new RegExp(`\\| ${id} \\|`))
  }
  assert.match(scenarios, /UNVERIFIED/)
  for (const id of ['grouped-form', 'step-form', 'drawer-form']) {
    const variant = manifest.templateVariants.find((item) => item.id === id)
    assert.equal(variant.starterEnabled, true)
    assert.match(baseline, new RegExp(id.replace('-', '[ -]'), 'i'))
  }
})
