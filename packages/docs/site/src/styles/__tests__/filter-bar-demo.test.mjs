import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/business-components/filter-bar/', import.meta.url)
const docsUrl = new URL(
  '../../content/docs/business-components/query-view/filter-bar.mdx',
  import.meta.url,
)
const demoStylesUrl = new URL('../demo.css', import.meta.url)

const readDemo = (name) => readFile(new URL(name, demoDir), 'utf8')
const extractLayoutContract = (source) => {
  const match = source.match(/FILTER_BAR_LAYOUT_SCHEMA_START([\s\S]*?)FILTER_BAR_LAYOUT_SCHEMA_END/)
  assert.ok(match, 'layout demo must expose comparable schema marker')
  return match[1].replace(/\s+/g, ' ').trim()
}

test('FilterBar docs demos use the real package component in both frameworks', async () => {
  const files = await readdir(demoDir)
  const reactDemos = files.filter((file) => file.endsWith('.tsx'))
  const vueDemos = files.filter((file) => file.endsWith('.vue'))
  const demos = await Promise.all([...reactDemos, ...vueDemos].map((file) => readDemo(file)))
  const docsPage = await readFile(docsUrl, 'utf8')

  for (const name of [
    'basic',
    'layout-integrated',
    'layout-separated',
    'responsive',
    'collapsible',
    'change-mode',
    'validation',
    'states',
    'date-range',
    'cascader',
  ]) {
    assert.match(docsPage, new RegExp(`<Demo name="business-components/filter-bar/${name}" />`))
    assert.ok(reactDemos.includes(`${name}.tsx`), `${name}.tsx exists`)
    assert.ok(vueDemos.includes(`${name}.vue`), `${name}.vue exists`)
  }

  for (const demo of demos) {
    assert.match(demo, /<FilterBar\b/)
    assert.doesNotMatch(demo, /treeSelect|TreeSelect/)
  }

  for (const demo of await Promise.all(reactDemos.map(readDemo))) {
    assert.match(demo, /from '@sbux\/starbucks-design-react'/)
  }

  for (const demo of await Promise.all(vueDemos.map(readDemo))) {
    assert.match(demo, /from '@sbux\/starbucks-design-vue'/)
  }
})

test('FilterBar layout A and B keep the same content contract', async () => {
  const [reactA, reactB, vueA, vueB] = await Promise.all([
    readDemo('layout-integrated.tsx'),
    readDemo('layout-separated.tsx'),
    readDemo('layout-integrated.vue'),
    readDemo('layout-separated.vue'),
  ])

  assert.equal(extractLayoutContract(reactA), extractLayoutContract(reactB))
  assert.equal(extractLayoutContract(vueA), extractLayoutContract(vueB))
  assert.match(reactA, /sb-filter-bar-demo--integrated/)
  assert.match(reactB, /sb-filter-bar-demo--separated/)
  assert.match(vueA, /sb-filter-bar-demo--integrated/)
  assert.match(vueB, /sb-filter-bar-demo--separated/)

  for (const demo of [reactA, reactB, vueA, vueB]) {
    for (const fieldName of [
      'keyword',
      'status',
      'channel',
      'createdAt',
      'region',
      'storeType',
      'city',
      'owner',
      'period',
    ]) {
      assert.match(demo, new RegExp(`name: '${fieldName}'`))
    }
    assert.doesNotMatch(demo, /defaultExpanded|default-expanded/)
    assert.match(demo, /default-visible-count="3"|defaultVisibleCount=\{3\}/)
    assert.match(demo, /:columns="layoutColumns"|columns=\{layoutColumns\}/)
    assert.match(
      demo,
      /layoutColumns = \{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 \}/,
    )
    assert.match(demo, /<Table\b/)
    assert.match(demo, /pagination=\{false\}|:pagination="false"/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__section-head/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__title/)
  }

  assert.match(reactA, /sb-filter-bar-demo__filter-module/)
  assert.match(reactA, /sb-filter-bar-demo__result-module/)
  assert.match(vueA, /sb-filter-bar-demo__filter-module/)
  assert.match(vueA, /sb-filter-bar-demo__result-module/)
})

test('FilterBar basic demos render query results with the real Table component', async () => {
  const [reactDemo, vueDemo] = await Promise.all([
    readDemo('basic.tsx'),
    readDemo('basic.vue'),
  ])

  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /FilterBar, Table/)
    assert.match(demo, /<Table\b/)
    assert.match(demo, /pagination=\{false\}|:pagination="false"/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__row/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__evidence-grid/)
    assert.doesNotMatch(demo, />查询结果</)
    assert.match(demo, /basicColumns = \{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 \}/)
    assert.match(demo, /columns=\{basicColumns\}|:columns="basicColumns"/)
  }
})

test('FilterBar docs separate behavior, layout, responsive, and state demos', async () => {
  const docsPage = await readFile(docsUrl, 'utf8')

  assert.match(
    docsPage,
    /import FrameworkBlock[\s\S]*?筛选栏用于列表、表格或数据内容区域上方的高频条件筛选。\s+## 基本用法/,
  )
  assert.doesNotMatch(docsPage, /## 组件定义/)
  assert.match(docsPage, /<FrameworkBlock framework="react">\s+### React API/)
  assert.match(docsPage, /<FrameworkBlock framework="vue">\s+### Vue API/)
  assert.match(docsPage, /## 容器样式/)
  assert.match(docsPage, /## 响应式分栏/)
  assert.match(docsPage, /## 展开与收起/)
  assert.match(docsPage, /## Manual \/ Change 模式/)
  assert.match(docsPage, /## Validation/)
  assert.match(docsPage, /## Loading \/ Disabled/)
  assert.match(docsPage, /## DateRange \/ Cascader/)
  assert.doesNotMatch(docsPage, /<Demo name="business-components\/filter-bar\/events" \/>/)
  assert.match(docsPage, /TreeSelect 的逻辑和 adapter 已存在，但当前视觉 V1 不计入完成口径/)
})

test('FilterBar responsive demos keep equal widths and vary only the column configuration', async () => {
  const [reactDemo, vueDemo] = await Promise.all([
    readDemo('responsive.tsx'),
    readDemo('responsive.vue'),
  ])

  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /previewColumnCounts = \[4, 3, 2, 1\]/)
    assert.match(demo, /data-preview-columns/)
    assert.match(demo, /columns=\{getColumns\(columnCount\)\}|:columns="getColumns\(columnCount\)"/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__canvas-meta/)
    assert.doesNotMatch(demo, /sb-filter-bar-demo__canvas--cols-/)
    assert.doesNotMatch(demo, /1300px|1144px|900px|520px/)
  }
})

test('FilterBar docs preview containers stay scoped and avoid private Arco overrides', async () => {
  const demoStyles = await readFile(demoStylesUrl, 'utf8')
  const filterBarStyles = demoStyles.slice(
    demoStyles.indexOf(".sb-demo[data-demo^='business-components/filter-bar/']"),
    demoStyles.indexOf('.sb-demo-missing'),
  )

  assert.match(
    filterBarStyles,
    /\.sb-demo\[data-demo\^='business-components\/filter-bar\/'\]\s*\{/,
  )
  assert.doesNotMatch(filterBarStyles, /\.right-sidebar-container/)
  assert.doesNotMatch(filterBarStyles, /body:has\([^)]*filter-bar[^)]*\)\s+\.main-pane/)
  assert.match(filterBarStyles, /max-width:\s*none;/)
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--layout\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*100%;/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo__canvas\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*100%;/,
  )
  assert.doesNotMatch(filterBarStyles, /translateX\(-50%\)/)
  assert.doesNotMatch(filterBarStyles, /\.sb-filter-bar-demo__canvas--cols-/)
  assert.doesNotMatch(filterBarStyles, /\.sb-filter-bar-demo__canvas-meta/)
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--basic\s*\{[\s\S]*?padding:\s*var\(--spacing-6\);[\s\S]*?border-radius:\s*var\(--border-radius-md\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--integrated\s*\{[\s\S]*?gap:\s*var\(--spacing-4\);[\s\S]*?padding:\s*0;[\s\S]*?border-radius:\s*var\(--border-radius-md\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--separated\s*\{[\s\S]*?gap:\s*var\(--spacing-5\);[\s\S]*?padding:\s*var\(--spacing-7\);[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*var\(--border-radius-md\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo__filter-module,[\s\S]*?\.sb-filter-bar-demo__result-module,[\s\S]*?\.sb-filter-bar-demo__state-panel\s*\{[\s\S]*?padding:\s*var\(--spacing-6\);[\s\S]*?border-radius:\s*var\(--border-radius-md\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--separated \.sb-filter-bar-demo__filter-module\s*\{[\s\S]*?background:\s*var\(--bg-color-secondarycontainer\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--integrated \.sb-filter-bar-demo__result-module\s*\{[\s\S]*?overflow:\s*hidden;[\s\S]*?padding:\s*var\(--spacing-6\);/,
  )
  assert.match(
    filterBarStyles,
    /\.sb-filter-bar-demo--separated \.sb-filter-bar-demo__result-module\s*\{[\s\S]*?width:\s*100%;[\s\S]*?padding:\s*0;[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*0;/,
  )
  assert.match(
    filterBarStyles,
    /html\[data-framework='react'\][\s\S]*?body:has\(\.sb-demo\[data-demo\^='business-components\/filter-bar\/'\]\)[\s\S]*?a\[href\$='#vue-api'\]/,
  )
  assert.match(
    filterBarStyles,
    /html\[data-framework='vue'\][\s\S]*?body:has\(\.sb-demo\[data-demo\^='business-components\/filter-bar\/'\]\)[\s\S]*?a\[href\$='#react-api'\]/,
  )
  assert.doesNotMatch(filterBarStyles, /\.arco-/)
  assert.doesNotMatch(filterBarStyles, /!important/)
})

test('FilterBar public API docs stay aligned with the package contract', async () => {
  const docsPage = await readFile(docsUrl, 'utf8')

  assert.match(docsPage, /\| className \| FilterBar Root class \| `string` \|/)
  assert.match(docsPage, /\| style \| FilterBar Root 行内样式 \| `CSSProperties` \|/)
  assert.match(docsPage, /FilterRenderFieldContext/)
  assert.match(docsPage, /renderField` 只负责渲染字段 Control/)
  assert.match(docsPage, /class` 和 `style` 通过 Vue attrs fallthrough/)
  assert.match(docsPage, /Popup 视觉一致性仍依赖基础组件闭环/)
  assert.doesNotMatch(docsPage, /production build 仍有仓库级 Arco React icon ESM/)
  assert.match(docsPage, /## Change Log/)
  assert.match(docsPage, /React UMD 将显式图标入口映射到已有的 `window\.arcoicon`/)
  assert.match(docsPage, /React \/ Vue 主入口公开导出 `FilterRenderFieldContext`/)
})
