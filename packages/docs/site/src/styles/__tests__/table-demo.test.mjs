import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/table/', import.meta.url)
const reactOverrideUrl = new URL('../../../../../starbucks-design-react/src/overrides/Table.less', import.meta.url)
const vueOverrideUrl = new URL('../../../../../starbucks-design-vue/src/overrides/Table.less', import.meta.url)

test('Table basic demos reuse shared components in both frameworks', async () => {
  const [reactDemo, vueDemo, vuePropsDemo] = await Promise.all([
    readFile(new URL('basic.tsx', demoDir), 'utf8'),
    readFile(new URL('basic.vue', demoDir), 'utf8'),
    readFile(new URL('table-props.vue', demoDir), 'utf8')
  ])

  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /<Table\b/)
    assert.match(demo, /<Tag\b/)
    assert.match(demo, /<Link\b/)
    assert.match(demo, /<Space\b/)
    assert.match(demo, /pagination=\{?false\}?|:pagination="false"/)
    assert.match(demo, /sb-table-demo-fill/)
    assert.match(demo, /width:\s*['"]?100%/)
    assert.match(demo, /min-?width:\s*['"]?0/i)
    assert.match(demo, /title:\s*['"]操作['"][\s\S]*?width:\s*140/)
    assert.doesNotMatch(demo, /scroll\s*=|:scroll=|scroll\s*\{\{/)
    assert.doesNotMatch(demo, /<Tag[^>]*size=["']large["']/)
    assert.doesNotMatch(demo, /<Tag[^>]*bordered/)
  }

  assert.match(vuePropsDemo, /:size="form\.size"/)
  assert.match(vuePropsDemo, /'large', 'medium', 'small', 'mini'/)
})

test('React and Vue Table overrides preserve the shared Figma contract', async () => {
  const [reactStyles, vueStyles] = await Promise.all([
    readFile(reactOverrideUrl, 'utf8'),
    readFile(vueOverrideUrl, 'utf8')
  ])

  for (const styles of [reactStyles, vueStyles]) {
    assert.match(styles, /background-color:\s*var\(--bg-color-secondarycontainer\);/)
    assert.match(
      styles,
      /\.arco-table\.arco-table-hover[\s\S]*?background-color:\s*rgba\(var\(--primary-1\),\s*0\.3\);/s
    )
    assert.match(
      styles,
      /\.arco-table-(?:row-checked|tr-checked)[\s\S]*?background-color:\s*rgba\(var\(--primary-1\),\s*0\.3\);/s
    )
    assert.match(
      styles,
      /\.arco-table-(?:expand-content|tr-expand)[\s\S]*?background-color:\s*var\(--bg-color-secondarycontainer\);/s
    )
    assert.match(
      styles,
      /\.arco-table tfoot \.arco-table-td\s*\{[^}]*background-color:\s*var\(--bg-color-secondarycontainer\);/s
    )
    assert.match(
      styles,
      /\.arco-table-tfoot\s*\{[^}]*background-color:\s*var\(--bg-color-secondarycontainer\);/s
    )
    assert.match(styles, /border-bottom-color:\s*var\(--color-border-1\);/)
    assert.match(styles, /border-color:\s*var\(--color-border-component\);/)
    assert.match(
      styles,
      /\.arco-table\.arco-table-border \.arco-table-container\s*\{[^}]*border-top-color:\s*transparent;[^}]*border-right-color:\s*transparent;[^}]*border-bottom-color:\s*var\(--color-border-component\);[^}]*border-left-color:\s*transparent;/s
    )
    assert.match(styles, /padding:\s*9px var\(--spacing-6\);/)
    assert.match(styles, /padding:\s*7px var\(--spacing-6\);/)
    assert.match(styles, /padding:\s*5px var\(--spacing-6\);/)
    assert.match(styles, /padding:\s*2px var\(--spacing-6\);/)
    assert.match(styles, /\.arco-table-sorter\s*\{[^}]*height:\s*16px;/s)
    assert.match(styles, /\.arco-table-sorter-icon\s*\{[^}]*height:\s*8px;/s)
    assert.match(
      styles,
      /width:\s*16px;[^}]*height:\s*16px;[^}]*color:\s*var\(--color-text-placeholder\);/s
    )
    assert.match(
      styles,
      /\.arco-table-cell-expand-icon > \.arco-icon\s*\{[^}]*width:\s*16px;[^}]*height:\s*16px;[^}]*margin-right:\s*var\(--spacing-4\);[^}]*color:\s*var\(--color-text-placeholder\);/s
    )
    assert.match(
      styles,
      /\.arco-table-(?:expand-content|tr-expand) \.arco-table \.arco-table-container,[^}]*border-radius:\s*0;/s
    )
    assert.doesNotMatch(styles, /box-shadow:\s*var\(--shadow-sm\);/)
    assert.doesNotMatch(styles, /!important/)
  }

  assert.match(
    vueStyles,
    /\.arco-table-cell-expand-icon \.arco-table-cell-inline-icon\s*\{[^}]*width:\s*16px;[^}]*height:\s*16px;[^}]*margin-right:\s*var\(--spacing-4\);[^}]*flex:\s*0 0 16px;/s
  )
  assert.match(
    vueStyles,
    /\.arco-table-cell-expand-icon \.arco-table-expand-btn\s*\{[^}]*width:\s*16px;[^}]*height:\s*16px;[^}]*padding:\s*0;[^}]*border:\s*0;/s
  )
})

test('Docs isolates the React Table border model from Vue runtime styles', async () => {
  const [isolationStyles, demoStyles] = await Promise.all([
    readFile(new URL('../arco-isolation.css', import.meta.url), 'utf8'),
    readFile(new URL('../demo.css', import.meta.url), 'utf8')
  ])

  assert.match(
    isolationStyles,
    /html\[data-framework='react'\] \.fw-react \.arco-table-border \.arco-table-container\s*\{[^}]*border-top-color:\s*transparent;[^}]*border-left:\s*0;[^}]*border-bottom:\s*0;[^}]*border-right-color:\s*transparent;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='react'\][\s\S]*?\.arco-table-container::before\s*\{[^}]*top:\s*auto;[^}]*bottom:\s*0;[^}]*width:\s*100%;[^}]*height:\s*1px;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='react'\] \.fw-react \.arco-table-container::after\s*\{[^}]*content:\s*none;/s
  )
  assert.match(
    isolationStyles,
    /thead\s*>\s*\.arco-table-tr:first-child\s*>\s*\.arco-table-th:first-child\s*\{[^}]*border-left-color:\s*transparent;/s
  )
  assert.match(
    isolationStyles,
    /tbody\s*>\s*\.arco-table-tr\s*>\s*\.arco-table-td\.arco-table-col-first\s*\{[^}]*border-left-color:\s*transparent;/s
  )
  const reactContainerRule = isolationStyles.match(
    /html\[data-framework='react'\] \.fw-react \.arco-table-border \.arco-table-container\s*\{[^}]*\}/s
  )?.[0]
  assert.ok(reactContainerRule)
  assert.doesNotMatch(reactContainerRule, /border-top:/)
  assert.match(
    isolationStyles,
    /html\[data-framework='react'\] \.fw-react \.arco-table-border-cell \.arco-table-th,[\s\S]*?border-right:\s*0;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='vue'\] \.fw-vue \.arco-table-border-cell \.arco-table-th,[\s\S]*?border-left:\s*0;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='vue'\] \.fw-vue \.arco-table-border \.arco-table-container\s*\{[^}]*border-top-color:\s*transparent;[^}]*border-right-color:\s*transparent;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='vue'\][\s\S]*?thead\s*>\s*\.arco-table-tr:first-child\s*>\s*\.arco-table-th:first-child\s*\{[^}]*border-radius:\s*var\(--border-radius-medium\) 0 0 0;/s
  )
  assert.match(
    isolationStyles,
    /html\[data-framework='vue'\][\s\S]*?thead\s*>\s*\.arco-table-tr:first-child\s*>\s*\.arco-table-th:last-child\s*\{[^}]*border-radius:\s*0 var\(--border-radius-medium\) 0 0;/s
  )
  assert.match(
    demoStyles,
    /\.sb-demo\[data-demo\^='table\/'\] > \.sb-demo-preview > \.fw-react[^{]*\{[^}]*flex:\s*1 1 100%;[^}]*width:\s*100%;[^}]*min-width:\s*0;/s
  )
})

test('Editable Table uses a transparent icon button for row deletion', async () => {
  const [demo, demoStyles] = await Promise.all([
    readFile(new URL('editable-table.tsx', demoDir), 'utf8'),
    readFile(new URL('../demo.css', import.meta.url), 'utf8')
  ])

  assert.match(demo, /import \{ IconDelete \} from '@sbux\/starbucks-design-react\/icon'/)
  assert.match(
    demo,
    /aria-label="Delete row"[\s\S]*?className="table-demo-delete-button"[\s\S]*?icon=\{<IconDelete \/>\}[\s\S]*?shape="circle"[\s\S]*?status="danger"[\s\S]*?type="text"/
  )
  assert.match(
    demoStyles,
    /\.sb-demo\[data-demo='table\/editable-table'\] \.table-demo-delete-button\.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):hover,[\s\S]*?background-color:\s*transparent;/
  )
  assert.doesNotMatch(demo, /<Button[^>]*type="primary"[^>]*status="danger"[\s\S]*?>\s*Delete\s*<\/Button>/)
})

test('Expandable Table demos reuse Arco circle direction icons', async () => {
  const reactDemos = [
    'expand-row.tsx',
    'expand-props.tsx',
    'nested-table.tsx',
    'fixed-column.tsx',
    'operation-column.tsx',
    'tree-data.tsx'
  ]
  const vueDemos = [
    'expand-row.vue',
    'fixed-column.vue',
    'summary-row.vue',
    'tree-data.vue',
    'lazy-load-tree.vue'
  ]

  const demos = await Promise.all(
    [...reactDemos, ...vueDemos].map((file) =>
      readFile(new URL(file, demoDir), 'utf8')
    )
  )

  for (const demo of demos) {
    assert.match(demo, /IconRightCircle/)
    assert.match(demo, /IconDownCircle/)
    assert.match(demo, /expanded\s*\?\s*<?IconDownCircle/)
  }
})
