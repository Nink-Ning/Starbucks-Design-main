import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const changelogUrl = new URL(
  '../../content/docs/guide/changelog.mdx',
  import.meta.url,
);
const legacyStylesUrl = new URL('../legacy-docs.css', import.meta.url);

test('the weekly changelog presents the unified docs engine as the main workstream', async () => {
  const changelog = await readFile(changelogUrl, 'utf8');

  assert.match(changelog, /^## 2026-07-24$/m);
  assert.match(changelog, /Astro \+ Starlight 统一 Docs 引擎与组件体验升级/);
  assert.match(changelog, /React Docusaurus 与 Vue VitePress 的启动入口、文档内容、组件 Demo 和构建流程/);
  assert.match(changelog, /系统优化 Docs 信息架构、搜索与响应式布局/);
  assert.match(changelog, /完善基础组件及 React \/ Vue 示例/);
  assert.match(changelog, /亮暗主题切换和内容展示问题/);
  assert.match(changelog, /dev:docs/);
  assert.match(changelog, /build:docs/);
  assert.match(changelog, /pack:skills/);
  assert.match(changelog, /@astrojs\/react/);
  assert.match(changelog, /@astrojs\/vue/);
  assert.match(changelog, /Astro Islands 与 Vue 集成的 Demo Runtime/);
  assert.match(changelog, /Show code \/ Hide code/);
  assert.match(changelog, /实时编辑、Reset、Copy、代码高亮、组件注册和图标组件解析/);
  assert.match(changelog, /全局配置与 Skills 等公共内容保持不变/);
  assert.match(changelog, /确定旧站废弃方向/);
  assert.match(changelog, /生产构建/);
  assert.match(changelog, /当前阶段优先保证 React 组件视觉一致性/);
  assert.match(changelog, /Tree 放大展开箭头和节点图标/);
  assert.match(changelog, /TreeSelect 触发框复用 Select/);
  assert.match(changelog, /前置标签组合态的双分隔线和聚焦左圆角/);
  assert.match(changelog, /PageHeader 将默认文案替换为 Starbucks/);
  assert.match(changelog, /Select 自定义标签垂直偏移/);
  assert.match(changelog, /Upload 文件列表、头像上传、照片墙和图标列表/);
  assert.match(changelog, /批量图片、批量文件、手动上传与文件流展示/);
  assert.match(changelog, /React 43 项测试、Vue 63 项测试、Docs 43 项测试及 92 个页面/);
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
