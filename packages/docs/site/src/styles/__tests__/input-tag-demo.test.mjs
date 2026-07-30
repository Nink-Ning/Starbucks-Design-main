import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const demoDir = new URL('../../demos/input-tag/', import.meta.url)

test('InputTag basic demos show the same focused default use case', async () => {
  const [reactDemo, vueDemo] = await Promise.all([
    readFile(new URL('basic.tsx', demoDir), 'utf8'),
    readFile(new URL('basic.vue', demoDir), 'utf8')
  ])

  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /InputTag/)
    assert.match(demo, /default-?value|defaultValue/)
    assert.match(demo, /['"]test['"]/)
    assert.match(demo, /width:\s*['"]?320/)
    assert.match(demo, /allow-?clear|allowClear/)
    assert.doesNotMatch(demo, /disabled|readOnly|readonly|status=|error/)
  }
})

test('custom tag demo relies on the component 4px gap without extra tag margins', async () => {
  const customTagDemo = await readFile(new URL('custom-tag.tsx', demoDir), 'utf8')

  assert.doesNotMatch(customTagDemo, /margin/)
})
