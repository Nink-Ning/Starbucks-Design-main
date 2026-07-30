import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/layout/', import.meta.url)
const demoStylesUrl = new URL('../demo.css', import.meta.url)

const readDemo = (name) => readFile(new URL(name, demoDir), 'utf8')

test('Layout demos share the same docs-level visual shell in React and Vue', async () => {
  const [reactBasic, vueBasic, reactCollapse, vueCollapse, styles] = await Promise.all([
    readDemo('basic.tsx'),
    readDemo('basic.vue'),
    readDemo('custom-collapse-button.tsx'),
    readDemo('custom-collapse-button.vue'),
    readFile(demoStylesUrl, 'utf8'),
  ])

  for (const demo of [reactBasic, vueBasic]) {
    assert.match(demo, /sb-layout-demo sb-layout-demo--stack/)
    assert.match(demo, /sb-layout-demo__frame/)
    assert.doesNotMatch(demo, /<br\s*\/>/)
    assert.doesNotMatch(demo, /height:\s*400px/)
  }

  for (const demo of [reactCollapse, vueCollapse]) {
    assert.match(demo, /sb-layout-demo sb-layout-demo--shell/)
    assert.match(demo, /sb-layout-demo__logo/)
    assert.match(demo, /sb-layout-demo__workspace/)
    assert.match(demo, /sb-layout-demo__breadcrumb/)
    assert.match(demo, /sb-layout-demo__trigger/)
    assert.doesNotMatch(
      demo,
      /(?:class|className)=["'](?:layout-collapse-demo|layout-demo|byte-layout-collapse-demo)["']/,
    )
  }

  assert.match(
    styles,
    /\.sb-demo\[data-demo\^='layout\/'\] > \.sb-demo-preview\s*\{[^}]*align-items:\s*stretch;[^}]*overflow-x:\s*auto;[^}]*background:\s*var\(--bg-color-page\);/s,
  )
  assert.match(
    styles,
    /\.sb-layout-demo--shell\s*\{[^}]*min-width:\s*640px;[^}]*height:\s*500px;[^}]*overflow:\s*hidden;[^}]*border:\s*1px solid var\(--color-border-1\);/s,
  )
  assert.match(
    styles,
    /\.sb-layout-demo \.arco-layout-header\s*\{[^}]*min-height:\s*56px;[^}]*background:\s*var\(--bg-color-container\);[^}]*border-bottom:\s*1px solid var\(--color-border-1\);/s,
  )
  assert.match(
    styles,
    /\.sb-layout-demo \.arco-layout-sider-light \.sb-layout-demo__logo\s*\{/,
  )
  assert.doesNotMatch(
    styles,
    /\.(?:layout-demo|layout-basic-demo|layout-collapse-demo|byte-layout-collapse-demo)\b/,
  )
  assert.doesNotMatch(styles, /!important/)
})

test('Vue Layout demos do not carry duplicate scoped styling', async () => {
  const vueDemos = await Promise.all([
    readDemo('basic.vue'),
    readDemo('collapsible-sidebar.vue'),
    readDemo('custom-icon-button.vue'),
    readDemo('custom-collapse-button.vue'),
    readDemo('responsive-sidebar.vue'),
  ])

  for (const demo of vueDemos) {
    assert.doesNotMatch(demo, /<style scoped>/)
    assert.doesNotMatch(demo, /:deep\(\.arco-layout/)
  }
})
