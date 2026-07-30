import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const listDemoDir = new URL('../../demos/list/', import.meta.url)
const demoStyles = new URL('../demo.css', import.meta.url)

test('Vue vertical List demo uses Vue class syntax for the extra image area', async () => {
  const source = await readFile(new URL('vertical-list.vue', listDemoDir), 'utf8')

  assert.match(source, /<div class="image-area">/)
  assert.doesNotMatch(source, /className="image-area"/)
})

test('basic List demos fill the preview container in React and Vue', async () => {
  const [reactSource, vueSource] = await Promise.all([
    readFile(new URL('basic-usage.tsx', listDemoDir), 'utf8'),
    readFile(new URL('basic-usage.vue', listDemoDir), 'utf8'),
  ])

  assert.match(reactSource, /style=\{\{ width: '100%' \}\}/)
  assert.doesNotMatch(reactSource, /width:\s*622/)
  assert.match(vueSource, /<List style="width: 100%">/)
})

test('basic List preview gives React and Vue framework wrappers full width', async () => {
  const styles = await readFile(demoStyles, 'utf8')

  assert.match(
    styles,
    /\.sb-demo\[data-demo='list\/basic-usage'\] > \.sb-demo-preview > \.fw-react,[\s\S]*?\.sb-demo\[data-demo='list\/basic-usage'\] > \.sb-demo-preview > \.fw-vue\s*\{[\s\S]*?flex:\s*1 1 100%;[\s\S]*?width:\s*100%;[\s\S]*?min-width:\s*0;[\s\S]*?\}/,
  )
})
