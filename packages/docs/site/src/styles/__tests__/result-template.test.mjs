import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const demosDir = new URL('../../demos/template-pages/', import.meta.url)
const docsDir = new URL('../../content/docs/templates/result/', import.meta.url)

const demoPairs = [
  ['result-success.tsx', 'result-success.vue', 'success.svg'],
  ['result-failure.tsx', 'result-failure.vue', 'failure.svg'],
  ['result-network-error.tsx', 'result-network-error.vue', 'network.svg'],
]

test('result page templates render real React and Vue components from one content contract', async () => {
  const shared = await readFile(new URL('result-pages.shared.ts', demosDir), 'utf8')

  assert.match(shared, /title:\s*'创建成功'/)
  assert.match(shared, /title:\s*'创建失败'/)
  assert.match(shared, /title:\s*'网络异常'/)
  assert.match(shared, /primaryAction:\s*'重新加载'/)
  assert.match(shared, /secondaryAction:\s*'返回修改'/)

  for (const [reactFile, vueFile, iconFile] of demoPairs) {
    const [reactSource, vueSource] = await Promise.all([
      readFile(new URL(reactFile, demosDir), 'utf8'),
      readFile(new URL(vueFile, demosDir), 'utf8'),
    ])

    for (const source of [reactSource, vueSource]) {
      assert.match(source, /RESULT_PAGE_CONTENT/)
      assert.match(source, /sb-result-template-page sb-template-page-surface/)
      assert.match(source, /sb-result-template-page__status-icon/)
      assert.match(source, new RegExp(`img/templates/result/${iconFile.replace('.', '\\.')}`))
      assert.match(source, /\bResult\b/)
      assert.match(source, /\bButton\b/)
      assert.match(source, /\bMessage\b/)
      assert.doesNotMatch(source, /PagePreview/)
      assert.doesNotMatch(source, /<button[\s>]/)
    }

    assert.match(reactSource, /status=\{null\}/)
    assert.match(vueSource, /:status="null"/)
  }
})

test('failure and network result templates expose equivalent loading protection', async () => {
  const files = [
    'result-failure.tsx',
    'result-failure.vue',
    'result-network-error.tsx',
    'result-network-error.vue',
  ]
  const sources = await Promise.all(files.map((file) => readFile(new URL(file, demosDir), 'utf8')))

  for (const source of sources) {
    assert.match(source, /RESULT_ACTION_DELAY/)
    assert.match(source, /setTimeout/)
    assert.match(source, /loading/)
  }

  assert.match(sources[0], /if \(submitting\) return/)
  assert.match(sources[1], /if \(submitting\.value\) return/)
  assert.match(sources[2], /if \(reloading\) return/)
  assert.match(sources[3], /if \(reloading\.value\) return/)
})

test('result template styling is scoped, token based, responsive, and free of important overrides', async () => {
  const styles = await readFile(new URL('../demo.css', import.meta.url), 'utf8')
  const start = styles.indexOf(".sb-demo[data-demo='template-pages/result-success']")
  const end = styles.indexOf(".sb-demo[data-demo='template-pages/basic-list']", start)
  const resultStyles = styles.slice(start, end)

  assert.ok(start >= 0)
  assert.ok(end > start)
  assert.match(resultStyles, /\.sb-result-template-page\s*\{[\s\S]*?place-items:\s*center;/)
  assert.match(resultStyles, /width:\s*72px;[\s\S]*?height:\s*72px;/)
  assert.match(resultStyles, /width:\s*48px;[\s\S]*?height:\s*48px;/)
  assert.match(resultStyles, /width:\s*24px;[\s\S]*?height:\s*24px;/)
  assert.match(resultStyles, /var\(--color-success-light-hover\)/)
  assert.match(resultStyles, /var\(--color-danger-focus\)/)
  assert.match(resultStyles, /var\(--color-text-placeholder\)/)
  assert.match(resultStyles, /@media \(max-width:\s*480px\)/)
  assert.doesNotMatch(resultStyles, /!important/)
  assert.doesNotMatch(resultStyles, /(^|\n)\.arco-/)
})

test('result template docs are complete composition references instead of placeholders', async () => {
  const pages = [
    ['success.mdx', 'template-pages/result-success'],
    ['failure.mdx', 'template-pages/result-failure'],
    ['network-error.mdx', 'template-pages/result-network-error'],
  ]

  for (const [file, demoName] of pages) {
    const source = await readFile(new URL(file, docsDir), 'utf8')

    assert.match(source, new RegExp(`<Demo name="${demoName}" />`))
    assert.match(source, /模板定义/)
    assert.match(source, /适用场景/)
    assert.match(source, /不适用场景/)
    assert.match(source, /页面结构/)
    assert.match(source, /使用组件/)
    assert.match(source, /结果页规则/)
    assert.match(source, /页面组合参考/)
    assert.match(source, /React 和 Vue/)
    assert.doesNotMatch(source, /TemplatePagePlaceholder/)
  }
})

test('result status assets preserve the exported Figma glyphs', async () => {
  const assetsDir = new URL('../../../public/img/templates/result/', import.meta.url)
  const [success, failure, network] = await Promise.all([
    readFile(new URL('success.svg', assetsDir), 'utf8'),
    readFile(new URL('failure.svg', assetsDir), 'utf8'),
    readFile(new URL('network.svg', assetsDir), 'utf8'),
  ])

  assert.match(success, /fill="#006C45"/)
  assert.match(failure, /fill="#AD352F"/)
  assert.match(network, /fill-opacity="0\.6"/)
  for (const source of [success, failure, network]) {
    assert.match(source, /width="24" height="24"/)
  }
})
