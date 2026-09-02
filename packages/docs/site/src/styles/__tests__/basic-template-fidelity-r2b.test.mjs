import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const site = new URL('../../../', import.meta.url)
const demos = new URL('src/demos/template-pages/', site)
const docs = new URL('src/content/docs/templates/', site)
const styles = new URL('src/styles/demo.css', site)

const read = (base, file) => readFile(new URL(file, base), 'utf8')

test('Basic List preserves continuous data-region and approved row actions', async () => {
  const [react, vue, doc, css] = await Promise.all([
    read(demos, 'basic-list.tsx'),
    read(demos, 'basic-list.vue'),
    read(docs, 'data-list/basic-list.mdx'),
    readFile(styles, 'utf8'),
  ])

  for (const source of [react, vue]) {
    assert.match(source, /TableToolbar/)
    assert.match(source, /table-viewport/)
    assert.match(source, /pagination/)
    assert.match(source, /aria-label=.*record\.name|:aria-label=.*record\.name/)
  }
  assert.match(doc, /连续 Data Region/)
  assert.match(doc, /不插入独立 Summary Card 或 Debug Metadata 行/)
  const moduleRule = css.match(/\.sb-basic-list-page__module\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  assert.doesNotMatch(moduleRule, /background:\s*var\(--bg-color-container\)/)
  assert.doesNotMatch(moduleRule, /border-radius:/)
  assert.match(css, /\.sb-basic-list-page__table-module\s*\{[\s\S]*?gap:\s*0;/)
})

test('Basic Form documents one Create/Edit family and keeps template actions', async () => {
  const [doc, react, vue] = await Promise.all([
    read(docs, 'form/basic-form.mdx'),
    read(demos, 'basic-form.tsx'),
    read(demos, 'basic-form.vue'),
  ])

  assert.match(doc, /完整的单区块 Page Template Family/)
  assert.match(doc, /新建或编辑门店场景/)
  assert.match(doc, /Cancel 与 Primary Submit\/Save/)
  for (const source of [react, vue]) {
    assert.match(source, /FormPageLayout/)
    assert.match(source, /FormGrid/)
    assert.match(source, /FormActions/)
    assert.match(source, /取消/)
    assert.match(source, /保存/)
  }
})

test('Basic Detail documents focused read-only anatomy and renders a page header', async () => {
  const [doc, react, vue] = await Promise.all([
    read(docs, 'detail/basic-detail.mdx'),
    read(demos, 'basic-detail.tsx'),
    read(demos, 'basic-detail.vue'),
  ])

  assert.match(doc, /focused read-only object page template/)
  assert.match(doc, /depth 2 使用 icon-only Back、20px 标题和可选 Context Help，不显示文字 Back、Breadcrumb/)
  for (const source of [react, vue]) {
    assert.match(source, /PageHeader/)
    assert.match(source, /DetailPageLayout/)
    assert.match(source, /DetailSection/)
    assert.match(source, /DetailDescriptions/)
    assert.match(source, /couponBasicInfoColumns/)
    assert.match(source, /column=\{1\}|:column="1"/)
    assert.match(source, /tableLayout="auto"|table-layout="auto"/)
    assert.match(source, /labelStyle|label-style/)
  }
})
