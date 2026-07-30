import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'

const demosRoot = new URL('../../demos/', import.meta.url)

async function readDemoGroup(name) {
  const directory = new URL(`${name}/`, demosRoot)
  const files = (await readdir(directory)).filter(
    (file) => file.endsWith('.tsx') || file.endsWith('.vue')
  )
  return Promise.all(
    files.map(async (file) => ({
      file,
      source: await readFile(new URL(file, directory), 'utf8')
    }))
  )
}

test('ColorPicker primary examples use Starbucks brand green', async () => {
  const demos = await readDemoGroup('color-picker')
  const combined = demos.map(({ source }) => source).join('\n')

  assert.match(combined, /#00754A/)
  assert.doesNotMatch(combined, /#165DFF/i)
})

test('Mentions examples use Nink and remove legacy ByteDance references', async () => {
  const demos = await readDemoGroup('mentions')
  const combined = demos.map(({ source }) => source).join('\n')

  assert.match(combined, /@Nink/)
  assert.match(combined, /['"]Nink['"]/)
  assert.doesNotMatch(combined, /Byte(?:dance|design|numner)/i)
  assert.doesNotMatch(combined, /Plato(?:n)?/i)
})
