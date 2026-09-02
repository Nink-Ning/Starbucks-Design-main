import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../../../../../../', import.meta.url)

const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('R2-F.2 Basic List projection uses the confirmed template-specific inset', async () => {
  const [source, template, rules, checklist] = await Promise.all([
    read('distribution/designkit-starter-v1/examples/list.html'),
    read('distribution/designkit-starter-v1/templates/list.md'),
    read('distribution/designkit-starter-v1/references/design-rules.md'),
    read('distribution/designkit-starter-v1/references/quality-checklist.md'),
  ])

  assert.match(source, /--dk-page-gutter:\s*16px/)
  assert.match(source, /\.dk-page__section\s*\{[\s\S]*?gap:\s*0;[\s\S]*?padding:\s*4px var\(--dk-page-gutter\) var\(--dk-page-gutter\);/)
  assert.doesNotMatch(source, /padding:\s*var\(--spacing-5[^;]*\)\s+var\(--dk-page-gutter\)/)
  assert.match(template, /Continuous Data Region[\s\S]*?4px 16px 16px/)
  assert.match(rules, /Continuous Data Region[\s\S]*?4px 16px 16px/)
  assert.match(checklist, /Continuous Data Region[\s\S]*?4px \/ 16px/)
})

test('R2-F.2 Card List projection restores the approved light baseline and runtime actions', async () => {
  const source = await read('distribution/designkit-starter-v1/examples/multi-select-card-list.html')

  assert.match(source, /--dk-page-gutter:\s*16px/)
  assert.match(source, /\.dk-card\s*\{[\s\S]*?border-radius:\s*12px;/)
  assert.match(source, /\.dk-card__content\s*\{[\s\S]*?border-radius:\s*10px 10px 12px 12px;/)
  assert.match(source, /\.dk-card\s*\{[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;/)
  assert.match(source, /const requiredRuntimeExports = \[[\s\S]*?'Button',[\s\S]*?'Popconfirm',[\s\S]*?'TableToolbar'/)
  assert.match(source, /const \{[\s\S]*?Button,[\s\S]*?Popconfirm,[\s\S]*?TableToolbar,[\s\S]*?\} = StarbucksReact/)
  assert.match(source, /const \{ IconPlus, IconSwap, IconDelete, IconMore \} = window\.arcoicon/)
  const cardActionConfig = source.match(/const cardActionConfig = \{[\s\S]*?\n      \};/)?.[0] ?? ''
  const batchActions = source.match(/const batchActions = \[[\s\S]*?\n      \];/)?.[0] ?? ''
  assert.notEqual(cardActionConfig, '')
  assert.notEqual(batchActions, '')
  assert.match(cardActionConfig, /delete: \{ key: 'delete', label: '删除' \}/)
  assert.doesNotMatch(cardActionConfig, /status:\s*['"]danger['"]/)
  assert.match(batchActions, /key: 'publish',[\s\S]*?icon: <IconPlus \/>, requiresSelection: true/)
  assert.match(batchActions, /key: 'move',[\s\S]*?icon: <IconSwap \/>, requiresSelection: true/)
  assert.match(batchActions, /key: 'delete',[\s\S]*?icon: <IconDelete \/>, requiresSelection: true/)
  assert.doesNotMatch(batchActions, /status:\s*['"]danger['"]/)
  assert.match(source, /type=\{isSelected \? 'text' : 'secondary'\}/)
  assert.match(source, /<Popconfirm[\s\S]*?title="确认删除卡片"[\s\S]*?okText="删除"[\s\S]*?cancelText="取消"[\s\S]*?onOk=\{\(\) => removeProducts\(new Set\(\[product\.id\]\)\)\}/)
  assert.match(source, /Modal\.confirm\(\{[\s\S]*?title,[\s\S]*?content,[\s\S]*?okText: '删除',[\s\S]*?cancelText: '取消',[\s\S]*?onOk: \(\) => removeProducts\(productIds\)/)
  assert.match(source, /\.dk-card \.arco-tag\.dk-card__status-tag--offline \{[\s\S]*?color: var\(--color-danger/)
  assert.match(source, /icon=\{<IconMore \/>\}/)
})
