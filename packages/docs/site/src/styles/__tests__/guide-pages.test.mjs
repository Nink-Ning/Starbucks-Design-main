import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

test('the production site uses the internal Pages target by default and supports deployment overrides', async () => {
  const [config, header, rootPage, landing, canonical, compatibility] = await Promise.all([
    read('../astro.config.mjs'),
    read('components/Header.astro'),
    read('pages/index.astro'),
    read('content/docs/index.mdx'),
    read('content/docs/guide/ai-skills-guide.mdx'),
    read('content/docs/guide/ai-skills.mdx'),
  ]);

  assert.match(config, /process\.env\.DOCS_SITE_URL\s*\|\|\s*['"]https:\/\/pages\.scm\.starbucks\.com['"]/);
  assert.match(config, /process\.env\.DOCS_BASE_PATH\s*\|\|\s*['"]\/kning\/starbucks-design-main\/[\'"]/);
  assert.match(config, /normalizeBasePath/);
  assert.match(config, /path\.replace/);
  assert.match(config, /DOCS_SITE_URL/);
  assert.match(config, /DOCS_BASE_PATH/);
  assert.match(config, /base,/);
  assert.match(header, /PUBLIC_DOCS_REPOSITORY_URL/);
  assert.match(header, /https:\/\/scm\.starbucks\.com\/kning\/starbucks-design-main/);
  assert.match(rootPage, /import\.meta\.env\.BASE_URL/);
  assert.match(config, /label:\s*['"]AI 协作指南['"],\s*slug:\s*['"]guide\/ai-skills-guide['"]/);
  assert.doesNotMatch(config, /slug:\s*['"]guide\/ai-skills['"]/);
  assert.match(header, /label:\s*['"]AI 协作指南['"]/);
  assert.match(landing, /href="guide\/ai-skills-guide\//);
  assert.match(canonical, /^title:\s*AI 协作指南$/m);
  assert.match(canonical, /### 产品经理/);
  assert.match(canonical, /### 设计师/);
  assert.match(canonical, /### React 开发者/);
  assert.match(canonical, /### Vue 开发者/);
  assert.match(canonical, /Starter V1 当前为\*\*内部试用版\*\*/);
  assert.match(canonical, /href="\.\.\/\.\.\/downloads\/designkit-starter-v1\.zip" download="designkit-starter-v1\.zip"/);
  assert.doesNotMatch(canonical, /下载即将开放|当前 ZIP 尚未创建/);
  assert.match(canonical, /React 是当前的视觉基准/);
  assert.match(canonical, /Vue 组件工程能力可用，视觉一致性仍在持续优化/);
  assert.match(compatibility, /AI 协作指南.*统一维护/);
  assert.match(compatibility, /\.\.\/ai-skills-guide\//);
  assert.ok(compatibility.length < 500);
  assert.doesNotMatch(
    `${landing}\n${canonical}\n${compatibility}`,
    /\/kning\/starbucks-design-main\/|\/Starbucks-Design-main\/|nink1992\.github\.io|\/china\/bopfui-starbucks-ui\//,
  );
  for (const source of [canonical, compatibility]) {
    assert.doesNotMatch(source, /70 个组件|全部组件|双击即可预览|品牌主题自动注入/);
  }
});

test('the canonical AI collaboration guide is the only full content source', async () => {
  const [config, canonical, compatibility] = await Promise.all([
    read('../astro.config.mjs'),
    read('content/docs/guide/ai-skills-guide.mdx'),
    read('content/docs/guide/ai-skills.mdx'),
  ]);

  assert.equal((config.match(/slug:\s*['"]guide\/ai-skills-guide['"]/g) || []).length, 1);
  assert.doesNotMatch(config, /Skills 下载/);
  assert.match(canonical, /^## 选择你的角色$/m);
  assert.match(canonical, /^## 不同角色如何与 AI 协作$/m);
  assert.match(canonical, /^## Starter 使用流程$/m);
  assert.match(canonical, /^## Starter V1 支持范围$/m);
  assert.match(canonical, /^## Starter V1 暂不支持$/m);
  assert.match(canonical, /^## Preview Skill 边界$/m);
  assert.match(canonical, /^## 使用建议$/m);
  assert.match(canonical, /^## 版本与已知限制$/m);
  assert.doesNotMatch(compatibility, /### 产品经理|### 设计师|### React 开发者|### Vue 开发者/);
});

test('the site root renders the V1 landing page and keeps quick-start documentation available', async () => {
  const [rootPage, legacyLanding, gettingStarted] = await Promise.all([
    read('pages/index.astro'),
    read('content/docs/index.mdx'),
    read('content/docs/guide/getting-started.mdx'),
  ]);

  assert.match(rootPage, /renderLandingPage\(import\.meta\.env\.BASE_URL\)/);
  assert.match(rootPage, /return new Response/);
  assert.doesNotMatch(rootPage, /Astro\.redirect/);
  assert.match(legacyLanding, /template:\s*splash/);
  assert.match(gettingStarted, /^title:\s*快速开始$/m);
  assert.match(gettingStarted, /^## 安装$/m);
  assert.match(gettingStarted, /^## 引入即用$/m);
  assert.match(gettingStarted, /^## UMD 用法$/m);
});

test('top-level docs rely on the shared Starlight page title only', async () => {
  const [globalStyle, changelog, businessComponents] = await Promise.all([
    read('content/docs/guide/global-style.mdx'),
    read('content/docs/guide/changelog.mdx'),
    read('content/docs/business-components.mdx'),
  ]);

  assert.doesNotMatch(globalStyle, /^# 全局样式$/m);
  assert.doesNotMatch(changelog, /^# 更新日志$/m);
  assert.doesNotMatch(businessComponents, /^# 业务组件$/m);
  assert.doesNotMatch(businessComponents, /^tableOfContents:\s*false$/m);
  assert.doesNotMatch(businessComponents, /^## 概述$/m);
  assert.match(businessComponents, /^业务组件用于沉淀高频业务场景中的复合交互模式/m);
  assert.match(businessComponents, /^## 查询与查看$/m);
  assert.match(businessComponents, /筛选栏 FilterBar/);
  assert.match(businessComponents, /^## 新增与编辑$/m);
  assert.match(businessComponents, /创建编辑弹窗 FormModal/);
  assert.match(businessComponents, /^## 导入与导出$/m);
});

test('the weekly changelog summarizes docs and component work', async () => {
  const changelog = await read('content/docs/guide/changelog.mdx');

  assert.match(changelog, /^## 2026-07-24$/m);
  assert.match(changelog, /Astro \+ Starlight 统一 Docs 引擎与组件体验升级/);
  assert.match(changelog, /高分辨率屏幕下正文偏移和预览区留白不均/);
  assert.match(changelog, /Upload 文件列表、头像上传、照片墙和图标列表/);
  assert.match(changelog, /Starbucks Logo 在亮色、暗色和切换动画过程中均保持品牌绿色/);
});

test('multi-line page subtitles push the shared divider down', async () => {
  const css = await read('styles/legacy-docs.css');

  assert.doesNotMatch(
    css,
    /\.main-pane main > \.content-panel \+ \.content-panel::before\s*\{[\s\S]*?top:\s*43px;/,
  );
  assert.match(
    css,
    /\.main-pane main > \.content-panel \+ \.content-panel\s*\{[\s\S]*?container-type:\s*inline-size;/,
  );
  assert.match(
    css,
    /> p:first-child\s*\{[\s\S]*?position:\s*relative;[\s\S]*?padding-bottom:\s*24px;/,
  );
  assert.match(
    css,
    /> p:first-child::after\s*\{[\s\S]*?inset-inline-start:\s*50%;[\s\S]*?width:\s*calc\(100cqw \+ 2 \* var\(--sl-content-pad-x\)\);[\s\S]*?transform:\s*translateX\(-50%\);/,
  );
});

test('wide desktop pages center content between the navigation rails', async () => {
  const css = await read('styles/legacy-docs.css');

  assert.match(
    css,
    /@media \(min-width:\s*72rem\)\s*\{[\s\S]*?html\[data-has-sidebar\]\[data-has-toc\] \.main-pane\s*\{[\s\S]*?--sl-content-margin-inline:\s*auto;/,
  );
});

test('desktop table of contents preserves heading depth', async () => {
  const css = await read('styles/legacy-docs.css');

  assert.match(
    css,
    /\.right-sidebar-panel :where\(a\)\s*\{[\s\S]*?padding:\s*4px 8px 4px calc\(var\(--depth, 0\) \* 16px\);/,
  );
});

test('the Starbucks logo stays brand green in every page theme', async () => {
  const css = await read('styles/legacy-docs.css');

  assert.match(css, /\.sb-docs-logo-image\s*\{[\s\S]*?filter:\s*none;/);
  assert.doesNotMatch(css, /data-theme=['"]dark['"][^{]*\.sb-docs-logo-image\s*\{/);
  assert.doesNotMatch(css, /\.sb-docs-logo-image\s*\{[\s\S]*?brightness\(0\)\s+invert\(1\)/);
});

test('documentation asides reuse the global Alert geometry and semantic tokens', async () => {
  const styles = await read('styles/legacy-docs.css');

  assert.match(
    styles,
    /\.sl-markdown-content \.starlight-aside \{[\s\S]*?padding: var\(--spacing-6, 12px\) var\(--spacing-8, 16px\);[\s\S]*?background: var\(--sb-docs-aside-bg\);[\s\S]*?border: 1px solid var\(--sb-docs-aside-border\);[\s\S]*?border-radius: var\(--border-radius-md, var\(--sb-docs-radius\)\);/,
  );
  assert.match(
    styles,
    /\.starlight-aside--note \{[\s\S]*?--sb-docs-aside-bg: var\(--bg-color-component,[\s\S]*?--sb-docs-aside-accent: var\(--color-primary,/,
  );
  assert.match(
    styles,
    /\.starlight-aside--tip \{[\s\S]*?--sb-docs-aside-bg: var\(--color-success-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-success,/,
  );
  assert.match(
    styles,
    /\.starlight-aside--caution \{[\s\S]*?--sb-docs-aside-bg: var\(--color-warning-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-warning,/,
  );
  assert.match(
    styles,
    /\.starlight-aside--danger \{[\s\S]*?--sb-docs-aside-bg: var\(--color-danger-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-danger,/,
  );
});

test('the global theme toggle uses the TDesign-style diagonal wipe', async () => {
  const [component, css] = await Promise.all([
    read('components/ThemeSelect.astro'),
    read('styles/legacy-docs.css'),
  ]);

  assert.match(component, /async function transitionTheme/);
  assert.match(component, /function waitForThemeCommit/);
  assert.match(component, /const layer = page\.cloneNode\(true\)/);
  assert.match(component, /element\.scrollTop = scrollPositions\[index\]/);
  assert.match(component, /sb-theme-transition-to-\$\{nextTheme\}/);
  assert.match(
    component,
    /querySelectorAll<HTMLElement>\('\.expressive-code'\)[\s\S]*?block\.dataset\.theme = nextTheme/,
  );
  assert.match(component, /classList\.add\('sb-theme-transition-commit'\)/);
  assert.match(component, /applyTheme\(nextTheme, true\);\s*await waitForThemeCommit\(\);/);
  assert.match(component, /layer\.remove\(\);\s*document\.documentElement\.classList\.remove\('sb-theme-transition-commit'\)/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(css, /html\.sb-theme-transition-commit[\s\S]*?transition:\s*none !important;/);
  assert.match(css, /animation:\s*sb-theme-light-to-dark 750ms ease both/);
  assert.match(css, /animation:\s*sb-theme-dark-to-light 750ms ease both/);
  assert.match(css, /clip-path:\s*polygon\(\s*100% 0,\s*100% 0,/);
  assert.match(css, /clip-path:\s*polygon\(\s*-14\.05408vh 0,\s*-14\.05408vh 0,\s*0 100%,\s*0 100%/);
});

test('the sidebar exposes the existing site search with component input styling', async () => {
  const [config, header, sidebar, css] = await Promise.all([
    read('../astro.config.mjs'),
    read('components/Header.astro'),
    read('components/Sidebar.astro'),
    read('styles/legacy-docs.css'),
  ]);

  assert.match(config, /Sidebar:\s*'\.\/src\/components\/Sidebar\.astro'/);
  assert.match(sidebar, /const isGuideSection = Astro\.url\.pathname\.includes\('\/guide\/'\)/);
  assert.match(sidebar, /!isGuideSection &&/);
  assert.match(sidebar, /<div class="sb-sidebar-search"><Search \/><\/div>/);
  assert.match(
    sidebar,
    /\{!shouldRenderSearch && <div class="sb-sidebar-leading-space" aria-hidden="true"><\/div>\}/,
  );
  assert.doesNotMatch(header, /<Search \/>/);
  assert.match(
    css,
    /#starlight__sidebar \.sidebar-content\s*\{[\s\S]*?gap:\s*0 !important;[\s\S]*?padding:\s*0 16px !important;/,
  );
  assert.match(
    css,
    /\.sb-sidebar-leading-space\s*\{[\s\S]*?flex:\s*0 0 24px;[\s\S]*?height:\s*24px;/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?top:\s*0;[\s\S]*?margin-bottom:\s*0;[\s\S]*?padding-block:\s*24px;/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]\s*\{[\s\S]*?width:\s*100%;[\s\S]*?height:\s*36px;[\s\S]*?border:\s*1px solid var\(--color-border-component\);[\s\S]*?border-radius:\s*var\(--border-radius-sm\);[\s\S]*?background:\s*transparent;/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]:hover\s*\{[\s\S]*?background:\s*var\(--bg-color-container-hover\);/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]:focus-visible\s*\{[\s\S]*?border-color:\s*var\(--color-primary\);[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?box-shadow:\s*0 0 0 2px var\(--color-primary-focus\);/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\] > svg\s*\{[\s\S]*?color:\s*var\(--color-text-secondary\);/,
  );
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\] > kbd > kbd\s*\{[\s\S]*?min-width:\s*0;[\s\S]*?height:\s*auto;[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;[\s\S]*?font-family:[\s\S]*?"Segoe UI Symbol"[\s\S]*?"Noto Sans Symbols 2"[\s\S]*?"Apple Symbols"[\s\S]*?font-size:\s*14px;/,
  );
  assert.match(css, /margin-inline-start:\s*auto;/);
});

test('token preview uses the component-library button group', async () => {
  const component = await read('components/TokenPreview.tsx');

  assert.match(component, /import \{ Button \} from '@sbux\/starbucks-design-react'/);
  assert.match(component, /<Button\.Group>/);
  assert.match(component, /type=\{mode === 'light' \? 'primary' : 'default'\}/);
  assert.match(component, /type=\{mode === 'dark' \? 'primary' : 'default'\}/);
});

test('token mode changes only token values and swatches, not the page theme', async () => {
  const [component, css, globalStyle] = await Promise.all([
    read('components/TokenPreview.tsx'),
    read('components/TokenPreview.module.css'),
    read('content/docs/guide/global-style.mdx'),
  ]);

  assert.match(component, /applyTokenPreviewMode\(mode, scope\)/);
  assert.match(component, /data-token-preview-value/);
  assert.match(component, /data-token-preview-swatch/);
  assert.match(component, /restoreAttribute\(root, 'data-theme', previous\.rootTheme\)/);
  assert.match(globalStyle, /<div data-token-preview-scope data-token-preview-mode="light">/);
  assert.doesNotMatch(component, /previewVariableBindings|applyPreviewScopeMode/);
  assert.doesNotMatch(component, /localStorage\.setItem\(['"]starlight-theme/);
  assert.doesNotMatch(css, /:global\(\[data-token-preview-scope\]\)/);
});

test('token mode switches immediately without cloning the long preview page', async () => {
  const [component, css] = await Promise.all([
    read('components/TokenPreview.tsx'),
    read('components/TokenPreview.module.css'),
  ]);

  assert.match(component, /onClick=\{\(\) => setMode\('light'\)\}/);
  assert.match(component, /onClick=\{\(\) => setMode\('dark'\)\}/);
  assert.doesNotMatch(component, /cloneNode|data-token-transition-layer|setTimeout|animationend/);
  assert.doesNotMatch(css, /token-preview-(?:light-to-dark|dark-to-light)|clip-path/);
});

test('global style exposes every token group to the generated page outline', async () => {
  const globalStyle = await read('content/docs/guide/global-style.mdx');
  const headings = [
    '主色',
    '成功色',
    '警告色',
    '危险色',
    '链接色',
    '语义主色',
    '文本色',
    '背景色',
    '字体',
    '圆角',
    '间距',
    '更新 Token',
  ];

  for (const heading of headings) {
    assert.match(globalStyle, new RegExp(`^## ${heading}$`, 'm'));
  }
});

test('token tables opt out of the global table layer to avoid a double border', async () => {
  const component = await read('components/TokenPreview.tsx');

  assert.match(component, /className=\{`\$\{styles\.tableWrap\} not-content`\}/);
});

test('token color swatches render without an outline', async () => {
  const css = await read('components/TokenPreview.module.css');
  const swatchRule = css.match(/\.swatch\s*\{[\s\S]*?\}/)?.[0] ?? '';

  assert.match(swatchRule, /border:\s*0;/);
});

test('token mode toolbar does not add a second page divider', async () => {
  const css = await read('components/TokenPreview.module.css');
  const toolbarRule = css.match(/\.toolbar\s*\{[\s\S]*?\}/)?.[0] ?? '';

  assert.doesNotMatch(toolbarRule, /border-top/);
});

test('token mode toolbar removes spacing before the first token heading', async () => {
  const css = await read('components/TokenPreview.module.css');
  const toolbarRules = css.match(/\.toolbar\s*\{[\s\S]*?\}/g) ?? [];

  for (const toolbarRule of toolbarRules) {
    assert.doesNotMatch(toolbarRule, /margin-bottom/);
    assert.doesNotMatch(toolbarRule, /padding-bottom/);
  }

  assert.match(
    css,
    /:global\(astro-island\):has\(\.toolbar\)\s*\+\s*:global\(h2\)\s*\{[\s\S]*?margin-top:\s*0;/,
  );
});
