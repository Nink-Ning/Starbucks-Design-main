import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const changelogUrl = new URL(
  '../../content/docs/guide/changelog.mdx',
  import.meta.url,
);

test('the weekly changelog includes component work and verification', async () => {
  const changelog = await readFile(changelogUrl, 'utf8');

  assert.match(changelog, /^## 2026-07-24$/m);
  assert.match(changelog, /React 基础组件视觉一致性/);
  assert.match(changelog, /Tree 放大展开箭头和节点图标/);
  assert.match(changelog, /PageHeader 将默认文案替换为 Starbucks/);
  assert.match(changelog, /Select 自定义标签垂直偏移/);
  assert.match(changelog, /React 41 项测试、Docs 40 项测试及 92 个页面/);
});
