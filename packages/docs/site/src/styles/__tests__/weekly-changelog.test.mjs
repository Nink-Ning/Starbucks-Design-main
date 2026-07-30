import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const changelogUrl = new URL(
  '../../content/docs/guide/changelog.mdx',
  import.meta.url,
);
const legacyStylesUrl = new URL('../legacy-docs.css', import.meta.url);

test('the weekly changelog presents a concise summary of the shipped work', async () => {
  const changelog = await readFile(changelogUrl, 'utf8');

  assert.match(changelog, /^## 2026-07-30$/m);
  assert.match(changelog, /<div class="sbux-changelog-date">2026-07-30<\/div>/);
  assert.match(changelog, /基础组件优化、业务组件、页面模板结构搭建与 Docs 更新/);
  assert.match(changelog, /本周发布 React \/ Vue FilterBar V1/);
  assert.match(changelog, /相关代码已推送至 GitHub，Docs 已完成部署/);
  assert.doesNotMatch(changelog, /Codex 任务记录/);
  assert.doesNotMatch(changelog, /319 个待合并文件/);
  assert.match(changelog, /统一字段适配、数据归一化、校验、布局、状态及对外 API/);
  assert.match(changelog, /复用 Input、Select、Cascader、DatePicker、Button 等基础组件/);
  assert.match(changelog, /Manual \/ Change 查询模式/);
  assert.match(changelog, /4 \/ 3 \/ 2 \/ 1 列响应式布局/);
  assert.match(changelog, /基本使用、级联选择、变更模式、展开收起、日期范围、集成布局、分离布局、响应式、状态展示和校验 10 组双框架 Demo/);
  assert.match(changelog, /<strong>Table：<\/strong>统一中性表头、边框、圆角、图标与复选框对齐/);
  assert.match(changelog, /<strong>Form：<\/strong>统一 Label 与控件 16px、表单项 24px、按钮 16px 间距/);
  assert.match(changelog, /<strong>Select \/ Cascader \/ TreeSelect：<\/strong>统一 Hover、聚焦、展开、错误和禁用状态优先级/);
  assert.match(changelog, /<strong>InputTag：<\/strong>统一 4px 标签间距/);
  assert.match(changelog, /<strong>Calendar \/ DatePicker \/ TimePicker：<\/strong>优化满宽布局与卡片圆角/);
  assert.match(changelog, /<strong>Descriptions：<\/strong>取消 Label 加粗并统一 16px 内容间距/);
  assert.match(changelog, /Avatar、Slider、VerificationCode、ColorPicker、Button、MultiSelectTag/);
  assert.match(changelog, /Badge、Link、Statistic、Divider、Pagination、Mentions、Timeline、Typography、Watermark/);
  assert.match(changelog, /重构 FilterBar 文档/);
  assert.match(changelog, /AI Contract 和 Evaluator/);
  assert.match(changelog, /双框架 Demo 均使用真实组件/);
  assert.match(changelog, /完成基础列表、标签管理页面 Demo/);
  assert.match(changelog, /20 个模板文档路由和 13 个页面 Demo/);
  assert.match(changelog, /部分内容仍为占位结构/);
  assert.match(changelog, /统一 React \/ Vue 文档入口/);
  assert.match(changelog, /调整 Astro 配置、Docs 依赖与锁文件/);
  assert.match(changelog, /Arco 样式隔离/);
  assert.match(changelog, /Demo Code、Guide、Table、InputTag、ColorPicker \/ Mentions、FilterBar、Progress 和页面模板/);
  assert.match(changelog, /修复 Astro SSR 与 UMD 图标入口兼容问题/);
  assert.match(changelog, /Docs 成功生成 134 个页面/);
  assert.match(changelog, /FilterBar 的 TreeSelect 视觉与弹层交互仍需完善/);
  assert.match(changelog, /Skeleton、Transfer、Progress 及部分 Vue 页面模板仍待最终复核/);
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
  assert.ok((weeklySection.match(/\bTreeSelect\b/g) ?? []).length >= 2);
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
