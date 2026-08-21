import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/business-components/table-toolbar/', import.meta.url)
const docsUrl = new URL('../../content/docs/business-components/list-batch/table-toolbar.mdx', import.meta.url)
const reactEntryUrl = new URL('../../../../../starbucks-design-react/src/index.ts', import.meta.url)
const vueEntryUrl = new URL('../../../../../starbucks-design-vue/src/index.ts', import.meta.url)

test('TableToolbar docs use real React and Vue package components', async () => {
  const [files, docs, reactEntry, vueEntry] = await Promise.all([
    readdir(demoDir),
    readFile(docsUrl, 'utf8'),
    readFile(reactEntryUrl, 'utf8'),
    readFile(vueEntryUrl, 'utf8')
  ])

  for (const name of ['basic', 'read-only', 'quick-filters', 'complex-actions', 'states']) {
    assert.ok(files.includes(`${name}.tsx`))
    assert.ok(files.includes(`${name}.vue`))
    assert.match(docs, new RegExp(`<Demo name="business-components/table-toolbar/${name}" />`))
  }

  const demos = await Promise.all(
    files
      .filter((file) => file.endsWith('.tsx') || file.endsWith('.vue'))
      .map((file) => readFile(new URL(file, demoDir), 'utf8'))
  )
  for (const demo of demos) {
    assert.match(demo, /<TableToolbar\b/)
    assert.match(demo, /from '@sbux\/starbucks-design-(?:react|vue)'/)
  }
  assert.match(reactEntry, /export \{ TableToolbar \} from '\.\/business\/table-toolbar'/)
  assert.match(vueEntry, /export \{ TableToolbar \} from '\.\/business\/table-toolbar'/)
})

test('TableToolbar docs cover boundaries, behavior, AI contract, and evaluation', async () => {
  const docs = await readFile(docsUrl, 'utf8')
  for (const heading of [
    '## 基本用法',
    '## 无批量操作',
    '## 筛选功能强调',
    '## 复杂操作与折叠',
    '## 适用场景',
    '## 不适用场景',
    '## Anatomy',
    '## 行为规则',
    '## QuickFilters 与 FilterBar',
    '## API',
    '## AI Contract',
    '## Evaluator',
    '## 当前限制',
    '## Change Log'
  ]) {
    assert.match(docs, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  assert.doesNotMatch(docs, /## 组件定义/)
  assert.match(docs, /Search 输入不提交；Enter 提交/)
  assert.match(docs, /Select、ButtonGroup 和完整 DateRange 变化立即提交/)
  assert.match(docs, /selectedCount > 0/)
  assert.match(docs, /导出、列设置和刷新只发出语义事件/)
  assert.match(docs, /数组顺序就是业务优先级/)
  assert.match(docs, /4 \/ 2 \/ 1/)
  assert.match(docs, /紧凑态的 `batchActions`/)
  assert.match(docs, /`placement` 默认为 `end`/)
  assert.match(docs, /导入、新增等创建数据入口不放入/)
  assert.match(docs, /一种或多种能力/)
  assert.match(docs, /品牌色加粗强调数字/)
  assert.match(docs, /折叠菜单内的操作全部禁用/)
  assert.match(docs, /默认填充型样式/)
  assert.match(docs, /单行最多外露 4 项/)
})

test('TableToolbar demo styles stay local and avoid private Arco overrides', async () => {
  const [styles, reactBasic, vueBasic, reactReadOnly, vueReadOnly, reactQuickFilters, vueQuickFilters] =
    await Promise.all([
      readFile(new URL('../../demos/business-components/table-toolbar/table-toolbar.css', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/basic.tsx', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/basic.vue', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/read-only.tsx', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/read-only.vue', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/quick-filters.tsx', import.meta.url), 'utf8'),
      readFile(new URL('../../demos/business-components/table-toolbar/quick-filters.vue', import.meta.url), 'utf8')
    ])
  assert.match(styles, /\.sb-table-toolbar-demo/)
  assert.match(styles, /\.sb-table-toolbar-demo__surface/)
  assert.match(styles, /data-demo\^='business-components\/table-toolbar\/'/)
  assert.match(styles, /> \.sb-demo-preview > \.fw-react/)
  assert.match(styles, /flex:\s*1 1 100%/)
  assert.match(styles, /width:\s*100%/)
  assert.match(styles, /> \.sb-demo-preview\s*\{[^}]*padding:\s*0/s)
  assert.match(styles, /background:\s*var\(--bg-color-secondarycontainer\)/)
  assert.doesNotMatch(styles, /\.sb-table-toolbar-demo__surface\s*\{[^}]*border:/s)
  assert.doesNotMatch(styles, /\.sb-table-toolbar-demo__state\s*\{[^}]*border:/s)
  assert.match(styles, /\.sb-table-toolbar-demo__surface\s*\{[^}]*gap:\s*0/s)
  assert.match(
    styles,
    /\.sb-table-toolbar-demo__surface\s*\{[^}]*padding:\s*var\(--spacing-2\) var\(--spacing-6\) var\(--spacing-6\)/s
  )
  assert.match(styles, /\.sb-table-toolbar-demo--states\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/s)
  for (const demo of [reactBasic, vueBasic]) {
    assert.match(demo, /IconSwap/)
    assert.match(demo, /label: '移动'/)
    assert.doesNotMatch(demo, /IconImport|label: '导入'/)
    assert.match(demo, /IconArchive/)
  }
  for (const demo of [reactReadOnly, vueReadOnly]) {
    assert.match(demo, /仅搜索/)
    assert.match(demo, /下拉筛选/)
    assert.match(demo, /下拉筛选与搜索/)
    assert.match(demo, /statusOnlyFilters/)
    assert.doesNotMatch(demo, /statusAndSearchFilters|快捷状态与搜索/)
  }
  for (const demo of [reactQuickFilters, vueQuickFilters]) {
    assert.match(demo, /已上架/)
    assert.match(demo, /已下架/)
    assert.match(demo, /近30天/)
    assert.match(demo, /近90天/)
    assert.match(demo, /近1年/)
    assert.match(demo, /近3年/)
    assert.doesNotMatch(demo, /自定义|customRange|value: 'custom'/)
  }
  assert.doesNotMatch(styles, /\.arco-[\w-]+\s*\{/)
  assert.doesNotMatch(styles, /!important/)
})
