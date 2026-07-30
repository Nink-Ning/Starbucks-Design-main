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

  assert.match(changelog, /^## 2026-07-30$/m);
  assert.match(changelog, /2026-07-27 至 2026-07-30/);
  assert.match(changelog, /本周更新汇总：统一 Docs 架构、组件样式收敛与模板建设/);
  assert.match(changelog, /共确认 7 个已提交 Commit/);
  assert.match(changelog, /约 319 个未提交文件/);
  assert.match(changelog, /191 个为已跟踪修改、128 个为新增文件、0 个为暂存文件/);
  assert.match(changelog, /07-29、07-30 的多项优化仍在本地工作区/);
  assert.match(changelog, /状态标记为 CONDITIONAL/);
  assert.match(changelog, /React、Vue 文档站合并为统一 Docs 架构/);
  assert.match(changelog, /Table 按 Figma 设计稿完成第一轮 React \/ Vue 对齐/);
  assert.match(changelog, /完成两批 Form 文档示例优化/);
  assert.match(changelog, /Select \/ Cascader \/ TreeSelect 统一 Hover、聚焦、展开、错误和禁用状态优先级/);
  assert.match(changelog, /Modal 对话框相关更新已纳入反馈类组件整理/);
  assert.match(changelog, /FilterBar 当前为 CONDITIONAL/);
  assert.match(changelog, /新增基本使用、级联选择、变更模式、展开收起、日期范围、集成布局、分离布局、响应式、状态展示和校验等 10 组双端 Docs 场景/);
  assert.match(changelog, /页面模板当前为 CONDITIONAL/);
  assert.match(changelog, /Skeleton 基本示例不可见、Transfer 操作按钮图标化、Progress Vue 基础示例可见性/);
  assert.match(changelog, /未进入暂存、提交、推送、版本升级或发布流程/);
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
  assert.equal((weeklySection.match(/\bTreeSelect\b/g) ?? []).length, 2);
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
