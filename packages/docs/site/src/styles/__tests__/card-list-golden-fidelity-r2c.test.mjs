import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const site = new URL('../../../', import.meta.url)
const docs = new URL('src/content/docs/templates/data-list/', site)
const mapping = new URL('../../../../../../skills/starbucks-design/references/', import.meta.url)
const golden = new URL('../../../../../../distribution/designkit-starter-v1/examples/', import.meta.url)

const read = (base, file) => readFile(new URL(file, base), 'utf8')

test('Card List Docs expose Golden-first anatomy and invention boundaries', async () => {
  const [doc, map] = await Promise.all([
    read(docs, 'card-list.mdx'),
    read(mapping, 'golden-example-mapping.md'),
  ])

  for (const marker of [
    'Golden Fidelity Contract',
    '紧凑横向媒体',
    'Card Actions 与 Batch Actions',
    '不得自行发明',
    '顶部大图 Banner',
    'Card Body 隐式选择',
    'Example Specific',
    'Normal、Loading、Empty、Error 和 Retry/Recovery',
  ]) {
    assert.match(doc, new RegExp(marker))
  }
  assert.match(map, /### Card List anatomy mapping/)
  assert.match(map, /Export.*Example Specific \/ non-Starter evidence/)
  assert.match(map, /More overflow/)
})

test('Projected Card List Golden contains the approved anatomy and state hooks', async () => {
  const source = await read(golden, 'multi-select-card-list.html')

  for (const marker of [
    '.dk-card-grid',
    '.dk-card__content',
    '.dk-card__media',
    '.dk-card__title',
    '.dk-card__metadata',
    '.dk-card__selection',
    '.dk-card__footer',
    '.dk-card__actions',
    'data-selected',
    'indeterminate={someVisibleSelected}',
    'aria-label={`${product.name} 更多操作`}',
    'Popconfirm',
  ]) {
    assert.match(source, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }
  assert.match(source, /actions\.length <= 3 \? actions : actions\.slice\(0, 2\)/)
  assert.match(source, /onChange=\{\(\) => toggleSelection\(product\.id\)\}/)
  assert.match(source, /\.dk-card\s*\{[\s\S]*?border-radius:\s*12px;/)
  assert.match(source, /\.dk-card__content\s*\{[\s\S]*?border-radius:\s*10px 10px 12px 12px;/)
  assert.match(source, /IconPlus/)
  assert.match(source, /IconSwap/)
  assert.match(source, /IconDelete/)
  assert.match(source, /delete: \{ key: 'delete', label: '删除' \}/)
  assert.match(source, /\{ key: 'delete', label: '删除', icon: <IconDelete \/>\, requiresSelection: true \}/)
  const cardOpening = source.match(/<article[\s\S]*?data-selected=\{isSelected \? 'true' : 'false'\}[\s\S]*?>/)?.[0] ?? ''
  assert.notEqual(cardOpening, '')
  assert.doesNotMatch(cardOpening, /onClick=/)
})

test('Golden Export remains Example Specific and is not a Starter capability assertion', async () => {
  const [map, template] = await Promise.all([
    read(mapping, 'golden-example-mapping.md'),
    read(golden, '../templates/card-list.md'),
  ])

  assert.match(map, /Golden 中的业务名称、图片、Mock 数据、默认选择和操作组合可能是 Example Specific/)
  assert.match(map, /Export.*Example Specific \/ non-Starter evidence/)
  assert.match(template, /Example Specific.*Golden 的业务操作示例/)
})
