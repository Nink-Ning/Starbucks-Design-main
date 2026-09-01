import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourceRoot = new URL('../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, sourceRoot), 'utf8')
}

test('Starter Overview keeps its table inside a focusable local scroll region', async () => {
  const doc = await read('content/docs/guide/ai-skills-starters.mdx')

  assert.match(doc, /\| 启动包 \| 适用对象 \| 状态 \| 可获得内容 \| 管理入口 \| 最新下载 \|/)
  assert.match(doc, /\| 产品经理启动包 \| 产品经理 \/ 非开发者 \| Available \/ V1-r3 \|/)
  assert.doesNotMatch(doc, /<div class="sb-ai-skill-table-scroll"/)
  assert.match(doc, /\[查看产品经理启动包\]\(\.\.\/ai-skills-releases\/\)/)
  assert.match(doc, /\[下载当前生产版 V1-r3\]\(\.\.\/\.\.\/downloads\/designkit-starter-v1-r3\.zip\)/)
})

test('Starter Overview reuses the local table overflow contract without adding a global table patch', async () => {
  const styles = await read('styles/legacy-docs.css')

  assert.match(styles, /\.sb-ai-skill-table-scroll\s*\{[\s\S]*?width:\s*100%;[\s\S]*?overflow-x:\s*auto;/)
  assert.match(styles, /\.sl-markdown-content \.sb-ai-skill-table-scroll table\s*\{[\s\S]*?min-width:\s*720px;/)
  const globalTableRule = styles.match(/\.sl-markdown-content table:not\(:where\(\.not-content \*\)\)\s*\{[^}]*\}/)?.[0] || ''
  assert.doesNotMatch(globalTableRule, /overflow-x:\s*auto;/)
})

test('Product Manager Starter comparison table remains locally scrollable', async () => {
  const doc = await read('content/docs/guide/ai-skills-releases.mdx')

  assert.match(doc, /<div class="sb-ai-skill-table-scroll" role="region" aria-label="DesignKit Starter 版本能力对比" tabindex="0">/)
  assert.match(doc, /<table>[\s\S]*?<th scope="col">能力<\/th>[\s\S]*?<\/table>/)
})
