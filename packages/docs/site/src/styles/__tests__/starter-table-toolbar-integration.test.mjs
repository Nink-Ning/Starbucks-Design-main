import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const starterDir = new URL('../../../../../../distribution/designkit-starter-v1/', import.meta.url)

async function readStarter(relativePath) {
  return readFile(new URL(relativePath, starterDir), 'utf8')
}

test('Starter manifest registers the TableToolbar knowledge capability', async () => {
  const manifest = JSON.parse(await readStarter('manifest.json'))

  assert.deepEqual(manifest.businessCapabilities, ['table-toolbar'])
  assert.deepEqual(manifest.businessCapabilityFiles, ['business-components/table-toolbar.md'])
  await assert.doesNotReject(() => readStarter(manifest.businessCapabilityFiles[0]))
})

test('TableToolbar knowledge defines selection, ownership, and generation boundaries', async () => {
  const knowledge = await readStarter('business-components/table-toolbar.md')

  for (const heading of [
    '## Trigger',
    '## Do not use',
    '## Selection priority',
    '## State and ownership',
    '## QuickFilters rules',
    '## Selection and action rules',
    '## Starter template profiles',
    '## Accessibility and responsive rules',
    '## Generation rules',
    '## Known pitfalls',
    '## Evaluator checklist',
  ]) {
    assert.match(knowledge, new RegExp(`^${heading}$`, 'm'))
  }

  assert.match(knowledge, /真实 `StarbucksReact\.TableToolbar`/)
  assert.match(knowledge, /1～3 个无 Label、无校验、无复杂联动的轻量筛选/)
  assert.match(knowledge, /Search 输入过程不提交；Enter 提交/)
  assert.match(knowledge, /requiresSelection: true/)
  assert.match(knowledge, /`selectedCount` 必须与页面选择集合一致/)
  assert.match(knowledge, /宽、中、紧凑容器分别最多外露 4、2、1 项/)
  assert.match(knowledge, /确认、数据变更、失败恢复和可感知反馈/)
  assert.match(knowledge, /不修改 Runtime、组件实现、公共 API、Tokens、Golden Example 或发布资产/)
})

test('TableToolbar knowledge preserves Starter template profiles and unsupported boundaries', async () => {
  const knowledge = await readStarter('business-components/table-toolbar.md')

  assert.match(knowledge, /^### Basic List$/m)
  assert.match(knowledge, /Search QuickFilter[\s\S]*?`placement: 'start'`/)
  assert.match(knowledge, /不传 `selectedCount`、`operationActions` 或 `moreActions`/)
  assert.match(knowledge, /^### Card List$/m)
  assert.match(knowledge, /轻量 Search、Select、选择摘要、批量操作、MoreActions 和 Refresh/)
  assert.match(knowledge, /不从 Card List Golden Example 推断跨页选择、真实导出、权限工作流或服务端批量能力/)
  assert.match(knowledge, /TableToolbar 不负责数据请求、分页、跨页选择、权限系统、危险操作确认/)
})

test('Starter references route TableToolbar generation through the explicit knowledge file', async () => {
  const [catalog, contract, checklist] = await Promise.all([
    readStarter('references/component-catalog.md'),
    readStarter('references/template-contract.md'),
    readStarter('references/quality-checklist.md'),
  ])

  for (const source of [catalog, contract, checklist]) {
    assert.match(source, /business-components\/table-toolbar\.md/)
  }

  // The catalog now exposes the TableToolbar capability section directly;
  // routing is proven by the explicit business-component reference link.
  assert.match(catalog, /^## 2\. TableToolbar business capability$/m)
  assert.match(catalog, /TableToolbar Business Component Knowledge/)
  assert.match(contract, /业务组件知识只指导组件选择和组合，不改变页面模板路由/)
  assert.match(checklist, /^### TableToolbar Business Component$/m)
  assert.match(checklist, /QuickFilters 保持 1～3 个轻量条件/)
  assert.match(checklist, /页面负责数据、选择集合、确认、反馈和错误恢复/)
})
