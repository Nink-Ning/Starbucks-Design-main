import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8')
}

test('the production site keeps deployment overrides and the AI collaboration overview route', async () => {
  const [config, header, rootPage, landing, overview, compatibility] = await Promise.all([
    read('../astro.config.mjs'),
    read('components/Header.astro'),
    read('pages/index.astro'),
    read('content/docs/index.mdx'),
    read('content/docs/guide/ai-skills-guide.mdx'),
    read('content/docs/guide/ai-skills.mdx')
  ])

  assert.match(config, /process\.env\.DOCS_SITE_URL\s*\|\|\s*['"]https:\/\/pages\.scm\.starbucks\.com['"]/)
  assert.match(config, /process\.env\.DOCS_BASE_PATH\s*\|\|\s*['"]\/kning\/starbucks-design-main\/[\'"]/)
  assert.match(config, /normalizeBasePath/)
  assert.match(config, /DOCS_SITE_URL/)
  assert.match(config, /DOCS_BASE_PATH/)
  assert.match(rootPage, /import\.meta\.env\.BASE_URL/)
  assert.match(header, /label:\s*['"]AI 协作指南['"]/)
  assert.match(config, /label:\s*['"]概览['"],\s*slug:\s*['"]guide\/ai-skills-guide['"]/)
  assert.doesNotMatch(config, /slug:\s*['"]guide\/ai-skills['"]/)
  assert.match(landing, /href="guide\/ai-skills-guide\//)
  assert.match(overview, /^title:\s*AI 协作指南$/m)
  assert.match(overview, /^## 什么是 DesignKit Starter$/m)
  assert.match(overview, /^## 从哪里开始$/m)
  assert.match(overview, /^## 协作链路$/m)
  assert.match(overview, /\.\.\/ai-skills-usage\//)
  assert.match(overview, /\.\.\/ai-skills-selection\//)
  assert.match(overview, /\.\.\/ai-skills-starters\//)
  assert.match(overview, /\.\.\/ai-skills-releases\//)
  assert.doesNotMatch(overview, /downloads\/designkit-starter-v1-r[12]\.zip/)
  assert.match(compatibility, /AI 协作入口、使用指南和启动包管理/)
  assert.match(compatibility, /\.\.\/ai-skills-guide\//)
  assert.ok(compatibility.length < 500)
  assert.doesNotMatch(
    `${landing}\n${overview}\n${compatibility}`,
    /\/kning\/starbucks-design-main\/|\/Starbucks-Design-main\/|nink1992\.github\.io|\/china\/bopfui-starbucks-ui\//
  )
})

test('the AI collaboration information architecture exposes all guide and Starter management pages', async () => {
  const [config, usage, selection, starters, productManager, developer] = await Promise.all([
    read('../astro.config.mjs'),
    read('content/docs/guide/ai-skills-usage.mdx'),
    read('content/docs/guide/ai-skills-selection.mdx'),
    read('content/docs/guide/ai-skills-starters.mdx'),
    read('content/docs/guide/ai-skills-releases.mdx'),
    read('content/docs/guide/ai-skills-developer.mdx')
  ])

  assert.equal((config.match(/slug:\s*['"]guide\/ai-skills-guide['"]/g) || []).length, 1)
  assert.match(config, /label:\s*['"]使用指南['"],[\s\S]*label:\s*['"]AI 使用指南['"],[\s\S]*label:\s*['"]如何选择启动包['"]/)
  assert.match(config, /label:\s*['"]启动包管理['"],[\s\S]*label:\s*['"]启动包总览['"],[\s\S]*label:\s*['"]产品经理启动包['"],[\s\S]*label:\s*['"]前端开发启动包 · Coming Soon['"]/)
  assert.doesNotMatch(config, /label:\s*['"](?:V1|V1-r1|V1-r2|启动包版本)['"]/)
  assert.match(usage, /^title:\s*AI 使用指南$/m)
  assert.match(usage, /^## 使用流程$/m)
  assert.match(usage, /用户需求[\s\S]*AI 判断 Profile[\s\S]*Capability Registry[\s\S]*Template Decision[\s\S]*Interaction Decision[\s\S]*Implementation[\s\S]*Validation/)
  assert.match(selection, /^title:\s*如何选择启动包$/m)
  assert.match(starters, /^title:\s*启动包总览$/m)
  assert.match(starters, /产品经理启动包[\s\S]*Available \/ Preview[\s\S]*前端开发启动包[\s\S]*Coming Soon/)
  assert.match(starters, /\.\.\/\.\.\/downloads\/designkit-starter-v1-r2\.zip/)
  assert.match(productManager, /^title:\s*产品经理启动包$/m)
  assert.match(developer, /^title:\s*前端开发启动包$/m)
  assert.match(developer, /^## Coming Soon$/m)
  assert.match(developer, /当前没有可下载 ZIP/)
  assert.doesNotMatch(developer, /download=|downloads\/[^\s"')]+\.zip/)
})

test('the product manager Starter page exposes capability boundaries, comparison, and traceable releases', async () => {
  const [sidebar, releasePage, styles] = await Promise.all([
    read('components/Sidebar.astro'),
    read('content/docs/guide/ai-skills-releases.mdx'),
    read('styles/legacy-docs.css')
  ])

  assert.match(sidebar, /path\.indexOf\('\/guide\/ai-skills'\)\s*>\s*-1/)
  assert.match(releasePage, /^title:\s*产品经理启动包$/m)
  assert.match(releasePage, /^## 当前版本$/m)
  assert.match(releasePage, /^## 支持能力$/m)
  assert.match(releasePage, /^## 当前暂不支持$/m)
  assert.match(releasePage, /^## 版本能力对比$/m)
  assert.match(releasePage, /^## 版本历史$/m)
  assert.match(releasePage, /^\| 能力分类 \| 支持内容 \|$/m)
  assert.match(releasePage, /^\| 页面能力 \|/m)
  assert.match(releasePage, /^\| 交互能力 \|/m)
  assert.match(releasePage, /^\| 页面体验 \|/m)
  assert.match(releasePage, /^\| 企业系统框架 \|/m)
  assert.match(releasePage, /^\| AI 生成能力 \|/m)
  assert.match(releasePage, /使用真实 DesignKit 组件，而不是自行模仿样式/)
  assert.match(releasePage, /\| 本版重点 \|/)
  assert.doesNotMatch(releasePage, /\| 更新内容 \|/)
  assert.match(releasePage, /^### DesignKit Starter V1-r2$/m)
  assert.match(releasePage, /^### DesignKit Starter V1-r1$/m)
  assert.match(releasePage, /^### DesignKit Starter V1 · Initial Baseline$/m)
  assert.match(releasePage, /href="\.\.\/\.\.\/downloads\/designkit-starter-v1-r2\.zip" download="designkit-starter-v1-r2\.zip"/)
  assert.match(releasePage, /更新时间：2026-08-27/)
  assert.doesNotMatch(releasePage, /当前推荐预览版本/)
  assert.match(releasePage, /数据列表和卡片列表；<br \/>创建表单和编辑表单；<br \/>以信息展示为主的基础详情页。/)
  assert.match(releasePage, /DesignKit Starter V1-r2<\/h3><span class="sb-starter-current-version__new">NEW<\/span>/)
  assert.doesNotMatch(releasePage, /<dl>/)
  assert.match(releasePage, /65ab2f82b7192ed276bcddfee8ab8dbc07fd46338e5b960b1f8fa5321bc2fa20/)
  assert.match(releasePage, /href="\.\.\/\.\.\/downloads\/designkit-starter-v1-r1\.zip" download="designkit-starter-v1-r1\.zip"/)
  assert.match(releasePage, /6287895a54ebc0828f9e8250cb05d132ff7712c38fddceb891cfb0126a7302cf/)
  assert.match(releasePage, /Basic List[\s\S]*Card List[\s\S]*TableToolbar[\s\S]*Quick Filter \/ Search[\s\S]*Selection \/ Select All[\s\S]*Validation \/ Evidence/)
  assert.match(releasePage, /Dashboard[\s\S]*Result Page[\s\S]*自定义导航体系 \/ Navigation Shell 工程能力[\s\S]*动态权限菜单[\s\S]*React\/Vue 工程[\s\S]*真实 Export[\s\S]*真实后端\/API/)
  assert.match(releasePage, /Default Application Shell \/ 企业系统框架[\s\S]*暂不支持[\s\S]*暂不支持[\s\S]*支持/)
  assert.match(releasePage, /常规后台页面现在默认使用 DesignKit 标准顶部导航和侧边菜单，并提供全局 Light \/ Dark 切换/)
  assert.match(releasePage, /R2 的“增强”表示[\s\S]*没有把 R1 未登记的能力变为可用/)
  assert.match(releasePage, /\| 版本 \| V1 \|/)
  assert.match(releasePage, /\| 下载文件 \| 历史原始包当前不可验证，不提供下载入口 \|/)
  assert.match(releasePage, /\| 更新时间 \| 2026-08-07 \|/)
  assert.doesNotMatch(releasePage, /cecf8002821d1cafceaf2c289a99d170b4193f0037aa4f73ddbd83b07eb04e8f/)
  assert.doesNotMatch(releasePage, /href="\.\.\/\.\.\/downloads\/designkit-starter-v1\.zip"/)
  assert.match(styles, /\.sb-ai-skill-table-scroll\s*\{[\s\S]*?overflow-x:\s*auto;/)
  assert.match(styles, /\.sb-ai-skill-table-scroll table\s*\{[\s\S]*?min-width:\s*720px;/)
  assert.match(styles, /\.sb-starter-current-version\s*\{[\s\S]*?grid-template-columns:\s*80px minmax\(0, 1fr\);[\s\S]*?border-radius:\s*12px;/)
  assert.doesNotMatch(styles, /\.sb-starter-current-version\s*\{[^}]*box-shadow:/)
  assert.match(styles, /\.sb-starter-current-version__cover\s*\{[\s\S]*?background:\s*linear-gradient/)
  assert.match(styles, /\.sb-starter-current-version__new\s*\{[\s\S]*?background:\s*var\(--color-danger, #e02b20\);/)
  assert.match(styles, /h2#支持能力 \+ table th:first-child\s*\{[\s\S]*?width:\s*112px;/)
  assert.match(styles, /@media \(max-width:\s*35rem\)[\s\S]*?\.sb-starter-current-version\s*\{[\s\S]*?grid-template-columns:\s*1fr;/)
})

test('the site root renders the V1 landing page and keeps quick-start documentation available', async () => {
  const [rootPage, legacyLanding, gettingStarted] = await Promise.all([
    read('pages/index.astro'),
    read('content/docs/index.mdx'),
    read('content/docs/guide/getting-started.mdx')
  ])

  assert.match(rootPage, /renderLandingPage\(import\.meta\.env\.BASE_URL\)/)
  assert.match(rootPage, /return new Response/)
  assert.doesNotMatch(rootPage, /Astro\.redirect/)
  assert.match(legacyLanding, /template:\s*splash/)
  assert.match(gettingStarted, /^title:\s*快速开始$/m)
  assert.match(gettingStarted, /^## 安装$/m)
  assert.match(gettingStarted, /^## 引入即用$/m)
  assert.match(gettingStarted, /^## UMD 用法$/m)
})

test('top-level docs rely on the shared Starlight page title only', async () => {
  const [globalStyle, changelog, businessComponents] = await Promise.all([
    read('content/docs/guide/global-style.mdx'),
    read('content/docs/guide/changelog.mdx'),
    read('content/docs/business-components.mdx')
  ])

  assert.doesNotMatch(globalStyle, /^# 全局样式$/m)
  assert.doesNotMatch(changelog, /^# 更新日志$/m)
  assert.doesNotMatch(businessComponents, /^# 业务组件$/m)
  assert.doesNotMatch(businessComponents, /^tableOfContents:\s*false$/m)
  assert.doesNotMatch(businessComponents, /^## 概述$/m)
  assert.match(businessComponents, /^业务组件用于沉淀高频业务场景中的复合交互模式/m)
  assert.match(businessComponents, /^## 查询与查看$/m)
  assert.match(businessComponents, /筛选栏 FilterBar/)
  assert.match(businessComponents, /^## 新增与编辑$/m)
  assert.match(businessComponents, /创建编辑弹窗 FormModal/)
  assert.match(businessComponents, /^## 导入与导出$/m)
})

test('the weekly changelog summarizes docs and component work', async () => {
  const changelog = await read('content/docs/guide/changelog.mdx')

  assert.match(changelog, /^## 2026-07-24$/m)
  assert.match(changelog, /Astro \+ Starlight 统一 Docs 引擎与组件体验升级/)
  assert.match(changelog, /高分辨率屏幕下正文偏移和预览区留白不均/)
  assert.match(changelog, /Upload 文件列表、头像上传、照片墙和图标列表/)
  assert.match(changelog, /Starbucks Logo 在亮色、暗色和切换动画过程中均保持品牌绿色/)
})

test('multi-line page subtitles push the shared divider down', async () => {
  const css = await read('styles/legacy-docs.css')

  assert.doesNotMatch(css, /\.main-pane main > \.content-panel \+ \.content-panel::before\s*\{[\s\S]*?top:\s*43px;/)
  assert.match(css, /\.main-pane main > \.content-panel \+ \.content-panel\s*\{[\s\S]*?container-type:\s*inline-size;/)
  assert.match(css, /> p:first-child\s*\{[\s\S]*?position:\s*relative;[\s\S]*?padding-bottom:\s*24px;/)
  assert.match(
    css,
    /> p:first-child::after\s*\{[\s\S]*?inset-inline-start:\s*50%;[\s\S]*?width:\s*calc\(100cqw \+ 2 \* var\(--sl-content-pad-x\)\);[\s\S]*?transform:\s*translateX\(-50%\);/
  )
})

test('wide desktop pages center content between the navigation rails', async () => {
  const css = await read('styles/legacy-docs.css')

  assert.match(
    css,
    /@media \(min-width:\s*72rem\)\s*\{[\s\S]*?html\[data-has-sidebar\]\[data-has-toc\] \.main-pane\s*\{[\s\S]*?--sl-content-margin-inline:\s*auto;/
  )
})

test('desktop table of contents preserves heading depth', async () => {
  const css = await read('styles/legacy-docs.css')

  assert.match(
    css,
    /\.right-sidebar-panel :where\(a\)\s*\{[\s\S]*?padding:\s*4px 8px 4px calc\(var\(--depth, 0\) \* 16px\);/
  )
})

test('the Starbucks logo stays brand green in every page theme', async () => {
  const css = await read('styles/legacy-docs.css')

  assert.match(css, /\.sb-docs-logo-image\s*\{[\s\S]*?filter:\s*none;/)
  assert.doesNotMatch(css, /data-theme=['"]dark['"][^{]*\.sb-docs-logo-image\s*\{/)
  assert.doesNotMatch(css, /\.sb-docs-logo-image\s*\{[\s\S]*?brightness\(0\)\s+invert\(1\)/)
})

test('documentation asides reuse the global Alert geometry and semantic tokens', async () => {
  const styles = await read('styles/legacy-docs.css')

  assert.match(
    styles,
    /\.sl-markdown-content \.starlight-aside \{[\s\S]*?padding: var\(--spacing-6, 12px\) var\(--spacing-8, 16px\);[\s\S]*?background: var\(--sb-docs-aside-bg\);[\s\S]*?border: 1px solid var\(--sb-docs-aside-border\);[\s\S]*?border-radius: var\(--border-radius-md, var\(--sb-docs-radius\)\);/
  )
  assert.match(
    styles,
    /\.starlight-aside--note \{[\s\S]*?--sb-docs-aside-bg: var\(--bg-color-component,[\s\S]*?--sb-docs-aside-accent: var\(--color-primary,/
  )
  assert.match(
    styles,
    /\.starlight-aside--tip \{[\s\S]*?--sb-docs-aside-bg: var\(--color-success-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-success,/
  )
  assert.match(
    styles,
    /\.starlight-aside--caution \{[\s\S]*?--sb-docs-aside-bg: var\(--color-warning-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-warning,/
  )
  assert.match(
    styles,
    /\.starlight-aside--danger \{[\s\S]*?--sb-docs-aside-bg: var\(--color-danger-focus,[\s\S]*?--sb-docs-aside-accent: var\(--color-danger,/
  )
})

test('the global theme toggle uses the TDesign-style diagonal wipe', async () => {
  const [component, css] = await Promise.all([read('components/ThemeSelect.astro'), read('styles/legacy-docs.css')])

  assert.match(component, /async function transitionTheme/)
  assert.match(component, /function waitForThemeCommit/)
  assert.match(component, /const layer = page\.cloneNode\(true\)/)
  assert.match(component, /element\.scrollTop = scrollPositions\[index\]/)
  assert.match(component, /sb-theme-transition-to-\$\{nextTheme\}/)
  assert.match(
    component,
    /querySelectorAll<HTMLElement>\('\.expressive-code'\)[\s\S]*?block\.dataset\.theme = nextTheme/
  )
  assert.match(component, /classList\.add\('sb-theme-transition-commit'\)/)
  assert.match(component, /applyTheme\(nextTheme, true\);\s*await waitForThemeCommit\(\);/)
  assert.match(
    component,
    /layer\.remove\(\);\s*document\.documentElement\.classList\.remove\('sb-theme-transition-commit'\)/
  )
  assert.match(component, /prefers-reduced-motion: reduce/)
  assert.match(css, /html\.sb-theme-transition-commit[\s\S]*?transition:\s*none !important;/)
  assert.match(css, /animation:\s*sb-theme-light-to-dark 750ms ease both/)
  assert.match(css, /animation:\s*sb-theme-dark-to-light 750ms ease both/)
  assert.match(css, /clip-path:\s*polygon\(\s*100% 0,\s*100% 0,/)
  assert.match(css, /clip-path:\s*polygon\(\s*-14\.05408vh 0,\s*-14\.05408vh 0,\s*0 100%,\s*0 100%/)
})

test('the sidebar exposes the existing site search with component input styling', async () => {
  const [config, header, sidebar, css] = await Promise.all([
    read('../astro.config.mjs'),
    read('components/Header.astro'),
    read('components/Sidebar.astro'),
    read('styles/legacy-docs.css')
  ])

  assert.match(config, /Sidebar:\s*'\.\/src\/components\/Sidebar\.astro'/)
  assert.match(sidebar, /const isGuideSection = Astro\.url\.pathname\.includes\('\/guide\/'\)/)
  assert.match(sidebar, /!isGuideSection &&/)
  assert.match(sidebar, /<div class="sb-sidebar-search"><Search \/><\/div>/)
  assert.match(sidebar, /\{!shouldRenderSearch && <div class="sb-sidebar-leading-space" aria-hidden="true"><\/div>\}/)
  assert.doesNotMatch(header, /<Search \/>/)
  assert.match(
    css,
    /#starlight__sidebar \.sidebar-content\s*\{[\s\S]*?gap:\s*0 !important;[\s\S]*?padding:\s*0 16px !important;/
  )
  assert.match(css, /\.sb-sidebar-leading-space\s*\{[\s\S]*?flex:\s*0 0 24px;[\s\S]*?height:\s*24px;/)
  assert.match(
    css,
    /\.sb-sidebar-search\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?top:\s*0;[\s\S]*?margin-bottom:\s*0;[\s\S]*?padding-block:\s*24px;/
  )
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]\s*\{[\s\S]*?width:\s*100%;[\s\S]*?height:\s*36px;[\s\S]*?border:\s*1px solid var\(--color-border-component\);[\s\S]*?border-radius:\s*var\(--border-radius-sm\);[\s\S]*?background:\s*transparent;/
  )
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]:hover\s*\{[\s\S]*?background:\s*var\(--bg-color-container-hover\);/
  )
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\]:focus-visible\s*\{[\s\S]*?border-color:\s*var\(--color-primary\);[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?box-shadow:\s*0 0 0 2px var\(--color-primary-focus\);/
  )
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\] > svg\s*\{[\s\S]*?color:\s*var\(--color-text-secondary\);/
  )
  assert.match(
    css,
    /\.sb-sidebar-search site-search > button\[data-open-modal\] > kbd > kbd\s*\{[\s\S]*?min-width:\s*0;[\s\S]*?height:\s*auto;[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;[\s\S]*?font-family:[\s\S]*?"Segoe UI Symbol"[\s\S]*?"Noto Sans Symbols 2"[\s\S]*?"Apple Symbols"[\s\S]*?font-size:\s*14px;/
  )
  assert.match(css, /margin-inline-start:\s*auto;/)
})

test('token preview uses the component-library button group', async () => {
  const component = await read('components/TokenPreview.tsx')

  assert.match(component, /import \{ Button \} from '@sbux\/starbucks-design-react'/)
  assert.match(component, /<Button\.Group>/)
  assert.match(component, /type=\{mode === 'light' \? 'primary' : 'default'\}/)
  assert.match(component, /type=\{mode === 'dark' \? 'primary' : 'default'\}/)
})

test('token mode changes only token values and swatches, not the page theme', async () => {
  const [component, css, globalStyle] = await Promise.all([
    read('components/TokenPreview.tsx'),
    read('components/TokenPreview.module.css'),
    read('content/docs/guide/global-style.mdx')
  ])

  assert.match(component, /applyTokenPreviewMode\(mode, scope\)/)
  assert.match(component, /data-token-preview-value/)
  assert.match(component, /data-token-preview-swatch/)
  assert.match(component, /restoreAttribute\(root, 'data-theme', previous\.rootTheme\)/)
  assert.match(globalStyle, /<div data-token-preview-scope data-token-preview-mode="light">/)
  assert.doesNotMatch(component, /previewVariableBindings|applyPreviewScopeMode/)
  assert.doesNotMatch(component, /localStorage\.setItem\(['"]starlight-theme/)
  assert.doesNotMatch(css, /:global\(\[data-token-preview-scope\]\)/)
})

test('token mode switches immediately without cloning the long preview page', async () => {
  const [component, css] = await Promise.all([
    read('components/TokenPreview.tsx'),
    read('components/TokenPreview.module.css')
  ])

  assert.match(component, /onClick=\{\(\) => setMode\('light'\)\}/)
  assert.match(component, /onClick=\{\(\) => setMode\('dark'\)\}/)
  assert.doesNotMatch(component, /cloneNode|data-token-transition-layer|setTimeout|animationend/)
  assert.doesNotMatch(css, /token-preview-(?:light-to-dark|dark-to-light)|clip-path/)
})

test('global style exposes every token group to the generated page outline', async () => {
  const globalStyle = await read('content/docs/guide/global-style.mdx')
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
    '更新 Token'
  ]

  for (const heading of headings) {
    assert.match(globalStyle, new RegExp(`^## ${heading}$`, 'm'))
  }
})

test('token tables opt out of the global table layer to avoid a double border', async () => {
  const component = await read('components/TokenPreview.tsx')

  assert.match(component, /className=\{`\$\{styles\.tableWrap\} not-content`\}/)
})

test('token color swatches render without an outline', async () => {
  const css = await read('components/TokenPreview.module.css')
  const swatchRule = css.match(/\.swatch\s*\{[\s\S]*?\}/)?.[0] ?? ''

  assert.match(swatchRule, /border:\s*0;/)
})

test('token mode toolbar does not add a second page divider', async () => {
  const css = await read('components/TokenPreview.module.css')
  const toolbarRule = css.match(/\.toolbar\s*\{[\s\S]*?\}/)?.[0] ?? ''

  assert.doesNotMatch(toolbarRule, /border-top/)
})

test('token mode toolbar removes spacing before the first token heading', async () => {
  const css = await read('components/TokenPreview.module.css')
  const toolbarRules = css.match(/\.toolbar\s*\{[\s\S]*?\}/g) ?? []

  for (const toolbarRule of toolbarRules) {
    assert.doesNotMatch(toolbarRule, /margin-bottom/)
    assert.doesNotMatch(toolbarRule, /padding-bottom/)
  }

  assert.match(css, /:global\(astro-island\):has\(\.toolbar\)\s*\+\s*:global\(h2\)\s*\{[\s\S]*?margin-top:\s*0;/)
})
