import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const repoRoot = new URL('../../../../', new URL('../../', import.meta.url))
const starterDir = new URL('distribution/designkit-starter-v1/', repoRoot)
const docsRoot = new URL('packages/docs/site/src/demos/template-pages/', repoRoot)

async function readStarter(relativePath) {
  return readFile(new URL(relativePath, starterDir), 'utf8')
}

test('P1.1 Form family references are executable and use only fixed Runtime bindings', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))
  const references = await Promise.all(['basic-form', 'grouped-form', 'step-form', 'drawer-form'].map(async (id) => [id, await readStarter(`patterns/${id}.html`)]))

  for (const [id, source] of references) {
    const variant = manifest.templateVariants.find((item) => item.id === id)
    const implementation = manifest.referenceImplementations.find((item) => item.id === id)
    assert.equal(variant?.starterEnabled ?? implementation?.defaultEnabled, true, `${id} must be enabled only after binding closure`)
    assert.equal(implementation?.defaultEnabled, true, `${id} must be a default-enabled reference`)
    assert.match(source, /^<!doctype html>/i)
    assert.match(source, /data-reference-executable="true"/)
    assert.match(source, /\.\.\/runtime\/starbucks-react\.umd\.js/)
    assert.match(source, /@arco-design\/web-react@2\.66\.15/)
    assert.doesNotMatch(source, /data-starter-binding="reference-only"|BLOCKED/i)
  }

  const basic = references.find(([id]) => id === 'basic-form')[1]
  assert.match(basic, /data-template-context="FULL-PAGE-FORM"/)
  assert.match(basic, /data-shell-main-padding="24px"/)
  assert.match(basic, /data-surface-width="available-main"/)
  assert.match(basic, /data-horizontal-padding="32px-min"/)
  assert.match(basic, /FormPageLayout maxWidth="none" padding=\{0\}/)

  const grouped = references.find(([id]) => id === 'grouped-form')[1]
  assert.match(grouped, /data-runtime-binding="native-section\+FormGrid\+FormActions"/)
  assert.match(grouped, /data-layout-composition="native-section"/)
  assert.doesNotMatch(grouped, /FormSection/)

  const step = references.find(([id]) => id === 'step-form')[1]
  assert.match(step, /data-runtime-binding="Steps\+native-layout\+FormGrid\+FormActions"/)
  assert.match(step, /data-layout-composition="native-steps"/)
  assert.doesNotMatch(step, /StepFormLayout/)

  const drawer = references.find(([id]) => id === 'drawer-form')[1]
  assert.match(drawer, /data-template-context="DRAWER-FORM"/)
  assert.match(drawer, /data-padding="24px"/)
  assert.match(drawer, /data-runtime-binding="Drawer\+Form"/)
  assert.match(drawer, /<Drawer[\s\S]*?<Form data-p11-drawer-form-body/)
  assert.doesNotMatch(drawer, /Breadcrumb|persistent subtitle|standalone Back/i)
})

test('P1.1 Docs Basic Form explicitly removes the narrow FormPageLayout default in both frameworks', async () => {
  const [reactSource, vueSource] = await Promise.all([
    readFile(new URL('basic-form.tsx', docsRoot), 'utf8'),
    readFile(new URL('basic-form.vue', docsRoot), 'utf8'),
  ])
  assert.match(reactSource, /<FormPageLayout maxWidth="none" padding=\{0\}>/)
  assert.match(vueSource, /<FormPageLayout max-width="none" :padding="0">/)
})

test('P1.1 enabled variants remain package-local composition references, not new public exports', async () => {
  const [manifest, grouped, step, drawer] = await Promise.all([
    readStarter('manifest.json'),
    readStarter('patterns/grouped-form.html'),
    readStarter('patterns/step-form.html'),
    readStarter('patterns/drawer-form.html'),
  ])
  const parsed = JSON.parse(manifest)
  assert.equal(parsed.templateVariants.length, 3)
  assert.match(grouped, /native-section/)
  assert.match(step, /native-step-content/)
  assert.match(drawer, /Drawer\+Form/)
  assert.doesNotMatch(manifest, /"exports"\s*:/)
  assert.doesNotMatch(manifest, /"dependencies"\s*:/)
})
