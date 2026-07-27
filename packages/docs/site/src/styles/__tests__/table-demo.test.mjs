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
    assert.match(styles, /background-color:\s*var\(--bg-color-container\);/)
    assert.match(styles, /background-color:\s*var\(--bg-color-container-hover\);/)
    assert.match(styles, /border-bottom-color:\s*var\(--color-border-1\);/)
    assert.match(styles, /border-color:\s*var\(--color-border-component\);/)
    assert.match(styles, /height:\s*54px;/)
    assert.match(styles, /height:\s*46px;/)
    assert.match(styles, /height:\s*36px;/)
    assert.match(styles, /box-shadow:\s*var\(--shadow-sm\);/)
    assert.doesNotMatch(styles, /!important/)
  }
})
