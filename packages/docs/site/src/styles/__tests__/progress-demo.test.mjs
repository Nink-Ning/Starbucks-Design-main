import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('Progress demos use the full preview width as their percentage basis', async () => {
  const demoStyles = await readFile(new URL('../demo.css', import.meta.url), 'utf8')

  assert.match(
    demoStyles,
    /\.sb-demo\[data-demo\^='progress\/'\] > \.sb-demo-preview > \.fw-react,[\s\S]*?\.sb-demo\[data-demo\^='progress\/'\] > \.sb-demo-preview > \.fw-vue\s*\{[^}]*flex:\s*1 1 100%;[^}]*width:\s*100%;[^}]*min-width:\s*0;/s
  )
  assert.doesNotMatch(
    demoStyles,
    /\.sb-demo\[data-demo\^='progress\/'\][^{]*\{[^}]*!important/s
  )
})
