import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const changelogUrl = new URL(
  '../../content/docs/guide/changelog.mdx',
  import.meta.url,
);
const legacyStylesUrl = new URL('../legacy-docs.css', import.meta.url);

test('the weekly changelog includes component work and verification', async () => {
  const changelog = await readFile(changelogUrl, 'utf8');

  assert.match(changelog, /^## 2026-07-24$/m);
  assert.match(changelog, /React 基础组件视觉一致性/);
  assert.match(changelog, /Tree 放大展开箭头和节点图标/);
  assert.match(changelog, /TreeSelect 触发框复用 Select/);
  assert.match(changelog, /前置标签组合态的双分隔线和聚焦左圆角/);
  assert.match(changelog, /PageHeader 将默认文案替换为 Starbucks/);
  assert.match(changelog, /Select 自定义标签垂直偏移/);
  assert.match(changelog, /Upload 文件列表、头像上传、照片墙和图标列表/);
  assert.match(changelog, /批量图片、批量文件、手动上传与文件流展示/);
  assert.match(changelog, /React 43 项测试、Docs 41 项测试及 92 个页面/);
  assert.match(changelog, /更新人：宁凯Nink、吴塔鹏Zero/);

  const weeklySection = changelog.split(/^## 2026-07-17$/m)[0];
  const listItems = [...weeklySection.matchAll(/<li>(.*?)<\/li>/gs)].map(
    ([, item]) => item.replace(/\s+/g, ' ').trim(),
  );

  assert.equal(new Set(listItems).size, listItems.length);
  assert.equal((weeklySection.match(/\bUpload\b/g) ?? []).length, 1);
  assert.equal((weeklySection.match(/\bTreeSelect\b/g) ?? []).length, 1);
});

test('the changelog timeline connects entries and aligns dates with dots', async () => {
  const styles = await readFile(legacyStylesUrl, 'utf8');

  assert.match(
    styles,
    /\.sl-markdown-content > h2:has\(\+ \.sbux-changelog\) \{\s*display: none;/s,
  );
  assert.match(
    styles,
    /\.sbux-changelog:has\(~ \.sbux-changelog\) \.sbux-changelog-item::before \{[^}]*top: 12px;[^}]*bottom: -12px;/s,
  );
  assert.match(
    styles,
    /\.sbux-changelog-date,\s*\.sbux-changelog-author \{\s*margin-top: 0 !important;/s,
  );
  assert.match(
    styles,
    /\.sbux-changelog-dot \{[^}]*box-sizing: border-box;[^}]*top: 7px;/s,
  );
});
