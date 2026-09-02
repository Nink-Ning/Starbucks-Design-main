import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/business-components/tag-group-management/', import.meta.url)
const docsUrl = new URL('../../content/docs/business-components/list-batch/tag-group-management.mdx', import.meta.url)
const catalogUrl = new URL('../../content/docs/business-components.mdx', import.meta.url)
const reactEntryUrl = new URL('../../../../../starbucks-design-react/src/index.ts', import.meta.url)
const vueEntryUrl = new URL('../../../../../starbucks-design-vue/src/index.ts', import.meta.url)

test('TagGroupManagement docs load real React and Vue demos', async () => {
  const [files, docs, catalog, reactEntry, vueEntry] = await Promise.all([
    readdir(demoDir),
    readFile(docsUrl, 'utf8'),
    readFile(catalogUrl, 'utf8'),
    readFile(reactEntryUrl, 'utf8'),
    readFile(vueEntryUrl, 'utf8')
  ])

  for (const name of ['basic', 'management', 'controlled', 'states', 'long-list']) {
    assert.ok(files.includes(`${name}.tsx`), `${name}.tsx exists`)
    assert.ok(files.includes(`${name}.vue`), `${name}.vue exists`)
    assert.match(docs, new RegExp(`<Demo name="business-components/tag-group-management/${name}" />`))
  }

  const reactDemos = await Promise.all(
    files.filter((file) => file.endsWith('.tsx')).map((file) => readFile(new URL(file, demoDir), 'utf8'))
  )
  const vueDemos = await Promise.all(
    files.filter((file) => file.endsWith('.vue')).map((file) => readFile(new URL(file, demoDir), 'utf8'))
  )

  for (const demo of reactDemos) {
    assert.match(demo, /from '@sbux\/starbucks-design-react'/)
    assert.match(demo, /<TagGroupManagement\b/)
    assert.doesNotMatch(demo, /from ['"][^'"]*tag-group-management\/(?:use|normalize|selection|permissions)/)
  }
  for (const demo of vueDemos) {
    assert.match(demo, /from '@sbux\/starbucks-design-vue'/)
    assert.match(demo, /<TagGroupManagement\b/)
    assert.doesNotMatch(demo, /from ['"][^'"]*tag-group-management\/(?:use|normalize|selection|permissions)/)
  }

  assert.match(catalog, /标签与分组管理 TagGroupManagement/)
  assert.match(reactEntry, /export \{ TagGroupManagement \} from '\.\/business\/tag-group-management'/)
  assert.match(vueEntry, /export \{ TagGroupManagement \} from '\.\/business\/tag-group-management'/)
})

test('TagGroupManagement docs cover the business boundary and evaluation contract', async () => {
  const docs = await readFile(docsUrl, 'utf8')

  for (const heading of [
    '## 组件定义',
    '## 基本用法',
    '## 分组管理',
    '## 受控模式',
    '## 状态场景',
    '## 长列表与独立滚动',
    '## 暂不支持',
    '## Anatomy',
    '## 适用场景',
    '## 不适用场景',
    '## API',
    '## AI Contract',
    '## Evaluator',
    '## 当前限制',
    '## Change Log'
  ]) {
    assert.match(docs, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(docs, /renderContent/)
  assert.match(docs, /content.*slot/)
  assert.match(docs, /class.*style.*attrs fallthrough/)
  assert.match(docs, /不内置表格、分页、导出、请求/)
  assert.match(docs, /不发请求、不持久化数据/)
  assert.match(docs, /维度分类模式暂未进入 V1/)
  assert.match(docs, /批量管理模式暂未进入 V1/)
  assert.match(docs, /不支持 readonly/)
  assert.doesNotMatch(docs, /Production Build.*限制|生产构建.*阻断/)
})

test('TagGroupManagement docs demos keep preview styles scoped', async () => {
  const styles = await readFile(new URL('../demo.css', import.meta.url), 'utf8')
  const start = styles.indexOf(".sb-demo[data-demo^='business-components/tag-group-management/']")
  assert.notEqual(start, -1)
  const end = styles.indexOf(".sb-demo[data-demo='template-pages/basic-form']", start)
  const scoped = styles.slice(start, end === -1 ? styles.length : end)

  assert.match(scoped, /sb-tag-group-management-demo/)
  assert.match(scoped, /table-wrap/)
  assert.match(scoped, /long-list/)
  assert.doesNotMatch(scoped, /\.arco-[\w-]+\s*\{/)
  assert.doesNotMatch(scoped, /!important/)
})
