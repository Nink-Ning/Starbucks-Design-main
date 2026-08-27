import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const starterDir = new URL('../../../../../../distribution/designkit-starter-v1/', import.meta.url)

async function readStarter(relativePath, encoding = 'utf8') {
  return readFile(new URL(relativePath, starterDir), encoding)
}

test('Starter manifest registers Card List without adding a business capability', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))

  assert.ok(manifest.supportedTemplates.includes('card-list'))
  assert.ok(manifest.templateFiles.includes('templates/card-list.md'))
  assert.ok(manifest.examples.includes('examples/multi-select-card-list.html'))
  assert.deepEqual(manifest.businessCapabilities, ['table-toolbar'])
  assert.equal(manifest.status, 'internal-trial')
  assert.ok(manifest.unsupported.includes('cross-page-selection'))
  assert.ok(manifest.unsupported.includes('complex-batch-actions'))
  assert.ok(manifest.unsupported.includes('real-api'))
  assert.ok(manifest.unsupported.includes('permission-system'))
})

test('Card List template and corrected Golden Example exist', async () => {
  const [template, golden] = await Promise.all([
    readStarter('templates/card-list.md'),
    readStarter('examples/multi-select-card-list.html', null),
  ])

  assert.match(template, /^# 卡片列表页模板$/m)
  assert.match(template, /^## Selection model$/m)
  assert.match(template, /^## Responsive rules$/m)
  assert.equal(
    createHash('sha256').update(golden).digest('hex'),
    'e7cba2cc6976fb6fa7d3a78db2231459b61c28902f4ec5c3ef03e5e14be03dd5',
  )
  assert.match((await readStarter('examples/multi-select-card-list.html')), /border-radius:\s*12px/)
})

test('Starter Skill and new-demo prompt route visual object tasks to Card List', async () => {
  const [skill, prompt] = await Promise.all([
    readStarter('SKILL.md'),
    readStarter('prompts/new-demo.md'),
  ])

  // Routing prose belongs to the prompt reference; the entry Skill only needs
  // to expose the supported capability and package-local routing boundary.
  assert.match(skill, /Card List/)
  assert.match(skill, /Package-local Reference Routing/)
  assert.match(prompt, /页面类型：\[基础列表页 \/ 卡片列表页 \/ 基础表单页 \/ 基础详情页\]/)
  assert.match(prompt, /图片或其他视觉特征承担对象识别、浏览、选择和管理任务时，选择卡片列表页/)
  assert.match(prompt, /用户只提出“列表”且没有明确视觉对象需求时，默认选择基础列表页/)
  assert.match(prompt, /templates\/card-list\.md/)
})

test('quality checklist contains Card List rules and preserves Basic List boundaries', async () => {
  const [checklist, basicList] = await Promise.all([
    readStarter('references/quality-checklist.md'),
    readStarter('templates/list.md'),
  ])

  assert.match(checklist, /^## 路由检查$/m)
  assert.match(checklist, /^### Card List$/m)
  assert.match(checklist, /Card List 默认不选择任何 Card/)
  assert.match(checklist, /只有 Checkbox 等 Selection Control 改变选择/)
  assert.match(checklist, /Card 最多展示 3 个操作入口，More 本身计为一个入口/)
  assert.match(checklist, /requiresSelection: true/)
  assert.match(checklist, /Toolbar 与 Grid 使用独立响应式策略/)
  assert.match(checklist, /Selected 状态不只依赖颜色或整体透明度表达/)
  assert.match(checklist, /支持键盘操作并具有可见 Focus/)

  assert.match(checklist, /^### Basic List$/m)
  assert.match(checklist, /Basic List 的关键词 Search[\s\S]*?placement: 'start'/)
  assert.match(checklist, /Basic List 未向 `TableToolbar` 传入 `selectedCount`、`operationActions`、`moreActions`/)
  assert.match(checklist, /Basic List 未出现 FilterBar、批量操作、导出或列设置/)
  assert.match(basicList, /不传 `selectedCount`、`operationActions` 或 `moreActions`/)
  assert.match(basicList, /不启用导出和列设置/)
})

test('Starter entry documentation exposes all four templates and Golden Examples', async () => {
  const [readme, startHere, usageNotice] = await Promise.all([
    readStarter('README.md'),
    readStarter('START-HERE.md'),
    readStarter('USAGE-NOTICE.md'),
  ])

  for (const source of [readme, startHere, usageNotice]) {
    assert.match(source, /卡片列表/)
    assert.match(source, /multi-select-card-list\.html/)
  }
  assert.match(readme, /四个已验证的 Golden Example/)
  assert.match(usageNotice, /不支持跨页选择、复杂服务端批量操作或权限工作流/)
})
