import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const docsDir = new URL('../../content/docs/templates/', import.meta.url)
const demosDir = new URL('../../demos/template-pages/', import.meta.url)

const pages = [
  ['data-list/basic-list.mdx', 'template-pages/basic-list'],
  ['data-list/filter-list.mdx', 'template-pages/filter-list'],
  ['data-list/tree-filter-list.mdx', 'template-pages/tree-filter-list'],
  ['data-list/tag-list.mdx', 'template-pages/tag-list'],
  ['form/basic-form.mdx', 'template-pages/basic-form'],
  ['form/grouped-form.mdx', 'template-pages/grouped-form'],
  ['form/step-form.mdx', 'template-pages/step-form'],
  ['detail/basic-detail.mdx', 'template-pages/basic-detail'],
  ['detail/card-detail.mdx', 'template-pages/card-detail'],
  ['detail/data-detail.mdx', 'template-pages/data-detail'],
  ['result/success.mdx', 'template-pages/result-success'],
  ['result/failure.mdx', 'template-pages/result-failure'],
  ['result/network-error.mdx', 'template-pages/result-network-error'],
]

const placeholderPages = [
]

const goldenExamplePages = [
  ['data-list/card-list.mdx', '卡片列表'],
]

test('page template sidebar follows the requested information architecture', async () => {
  const [config, header] = await Promise.all([
    readFile(new URL('../../../astro.config.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../../components/Header.astro', import.meta.url), 'utf8'),
  ])

  assert.match(config, /label:\s*['"]页面模板['"][\s\S]*?label:\s*['"]列表页['"]/)
  assert.match(config, /label:\s*['"]基础列表['"],\s*slug:\s*['"]templates\/data-list\/basic-list['"]/)
  assert.match(config, /label:\s*['"]卡片列表['"],\s*slug:\s*['"]templates\/data-list\/card-list['"]/)
  assert.match(config, /label:\s*['"]筛选列表['"],\s*slug:\s*['"]templates\/data-list\/filter-list['"]/)
  assert.match(config, /label:\s*['"]树状筛选列表['"],\s*slug:\s*['"]templates\/data-list\/tree-filter-list['"]/)
  assert.match(config, /label:\s*['"]标签管理列表['"],\s*slug:\s*['"]templates\/data-list\/tag-list['"]/)
  assert.match(config, /label:\s*['"]表单页['"][\s\S]*?label:\s*['"]基础表单['"]/)
  assert.match(config, /label:\s*['"]分组表单['"],\s*slug:\s*['"]templates\/form\/grouped-form['"]/)
  assert.match(config, /label:\s*['"]分步表单['"],\s*slug:\s*['"]templates\/form\/step-form['"]/)
  assert.match(config, /label:\s*['"]详情页['"][\s\S]*?label:\s*['"]基础详情页['"],\s*slug:\s*['"]templates\/detail\/basic-detail['"]/)
  assert.match(config, /label:\s*['"]卡片详情页['"],\s*slug:\s*['"]templates\/detail\/card-detail['"]/)
  assert.match(config, /label:\s*['"]数据详情页['"],\s*slug:\s*['"]templates\/detail\/data-detail['"]/)
  assert.match(config, /label:\s*['"]二级详情页['"],\s*slug:\s*['"]templates\/detail\/secondary-detail['"]/)
  assert.match(config, /label:\s*['"]结果页['"][\s\S]*?label:\s*['"]成功页['"],\s*slug:\s*['"]templates\/result\/success['"]/)
  assert.match(config, /label:\s*['"]失败页['"],\s*slug:\s*['"]templates\/result\/failure['"]/)
  assert.match(config, /label:\s*['"]网络异常['"],\s*slug:\s*['"]templates\/result\/network-error['"]/)
  assert.doesNotMatch(config, /label:\s*['"]Dashboard['"][\s\S]*?slug:\s*['"]templates\/dashboard['"]/)
  assert.doesNotMatch(config, /label:\s*['"]登录页['"][\s\S]*?slug:\s*['"]templates\/login['"]/)
  assert.match(header, /templates\/data-list\/basic-list\//)
})

test('page template sidebar groups use semantic Arco icons', async () => {
  const sidebar = await readFile(new URL('../../components/Sidebar.astro', import.meta.url), 'utf8')

  assert.match(sidebar, /require\('@arco-design\/web-react\/icon'\)/)
  assert.match(sidebar, /data-sb-sidebar-icon="templates-list-page"[\s\S]*?<IconOrderedList/)
  assert.match(sidebar, /data-sb-sidebar-icon="templates-form-page"[\s\S]*?<IconEdit/)
  assert.match(sidebar, /data-sb-sidebar-icon="templates-detail-page"[\s\S]*?<IconFile/)
  assert.match(sidebar, /data-sb-sidebar-icon="templates-result-page"[\s\S]*?<IconExclamationCircle/)
  assert.match(sidebar, /li:nth-child\(4\) > details > ul > li:nth-child\(1\) > details > summary', 'templates-list-page'/)
  assert.match(sidebar, /li:nth-child\(4\) > details > ul > li:nth-child\(2\) > details > summary', 'templates-form-page'/)
  assert.match(sidebar, /li:nth-child\(4\) > details > ul > li:nth-child\(3\) > details > summary', 'templates-detail-page'/)
  assert.match(sidebar, /li:nth-child\(4\) > details > ul > li:nth-child\(4\) > details > summary', 'templates-result-page'/)
})

test('page template docs render completed demos and keep unfinished pages as placeholders', async () => {
  for (const [docPath, demoName] of pages) {
    const doc = await readFile(new URL(docPath, docsDir), 'utf8')

    assert.match(doc, /import TemplatePageBreadcrumb from/)
    assert.match(doc, /<TemplatePageBreadcrumb \/>/)
    assert.match(doc, new RegExp(`<Demo name="${demoName}" />`))
    assert.match(doc, /tableOfContents:\s*false/)
    assert.doesNotMatch(doc, /TemplatePagePlaceholder/)
    assert.doesNotMatch(doc, /内容建设中|API/)
  }

  for (const [docPath, title] of placeholderPages) {
    const doc = await readFile(new URL(docPath, docsDir), 'utf8')

    assert.match(doc, /import TemplatePageBreadcrumb from/)
    assert.match(doc, /import TemplatePagePlaceholder from/)
    assert.match(doc, /<TemplatePageBreadcrumb \/>/)
    assert.match(doc, new RegExp(`<TemplatePagePlaceholder title="${title}"`))
    assert.match(doc, /tableOfContents:\s*false/)
    assert.doesNotMatch(doc, /<Demo name="template-pages\//)
    assert.doesNotMatch(doc, /内容建设中|API|属性/)
  }

  for (const [docPath, title] of goldenExamplePages) {
    const doc = await readFile(new URL(docPath, docsDir), 'utf8')

    assert.match(doc, /import TemplatePageBreadcrumb from/)
    assert.match(doc, /import GoldenExamplePreview from/)
    assert.match(doc, /<TemplatePageBreadcrumb \/>/)
    assert.match(doc, new RegExp(`<GoldenExamplePreview title="${title} Golden Example" />`))
    assert.match(doc, /multi-select-card-list\.html/)
    assert.match(doc, /tableOfContents:\s*false/)
    assert.doesNotMatch(doc, /TemplatePagePlaceholder|卡片列表模板预留中/)
  }
})

test('card list docs loads the corrected Golden Example and runtime through same-origin preview routes', async () => {
  const [preview, route, runtimeCssRoute, runtimeJsRoute] = await Promise.all([
    readFile(new URL('../../components/GoldenExamplePreview.astro', import.meta.url), 'utf8'),
    readFile(new URL('../../pages/golden-examples/card-list.html.ts', import.meta.url), 'utf8'),
    readFile(new URL('../../pages/golden-examples/runtime/starbucks-react.css.ts', import.meta.url), 'utf8'),
    readFile(new URL('../../pages/golden-examples/runtime/starbucks-react.umd.js.ts', import.meta.url), 'utf8'),
  ])

  assert.match(preview, /golden-examples\/card-list\.html/)
  assert.match(preview, /data-golden-example-frame/)
  assert.match(preview, /querySelector<HTMLElement>\('#root'\)/)
  assert.match(preview, /new ResizeObserver\(resize\)\.observe\(content\)/)
  assert.match(preview, /new ResizeObserver\(resize\)\.observe\(frame\.parentElement \?\? frame\)/)
  assert.match(preview, /GOLDEN_EXAMPLE_VIEWPORT_GUTTER = 20/)
  assert.match(preview, /window\.innerHeight - frameTop - GOLDEN_EXAMPLE_VIEWPORT_GUTTER/)
  assert.match(preview, /--dk-docs-preview-min-height/)
  assert.match(preview, /window\.addEventListener\('resize', resize\)/)
  assert.match(preview, /new MutationObserver\(resize\)\.observe\(content/)
  assert.match(preview, /doc\.body\.setAttribute\(attribute, 'dark'\)/)
  assert.match(preview, /attributeFilter: \['data-theme'\]/)
  assert.doesNotMatch(preview, /stopImmediatePropagation/)
  assert.match(route, /distribution\/designkit-starter-v1\/examples\/multi-select-card-list\.html\?raw/)
  assert.match(route, /runtime\/starbucks-react\.css/)
  assert.match(route, /runtime\/starbucks-react\.umd\.js/)
  assert.match(route, /designkit-docs-card-list-theme-bootstrap/)
  assert.match(route, /closest\('\.sb-theme-transition-layer'\)/)
  assert.match(route, /transitionTheme \|\| docsTheme/)
  assert.match(route, /filter\(\(rule\) => !\(rule instanceof CSSFontFaceRule\)\)/)
  assert.match(route, /\.join\('\\\\n'\)/)
  assert.match(route, /sourceRoot\.outerHTML/)
  assert.match(route, /window\.stop\(\)/)
  assert.match(route, /replace\('<head>', `<head>\$\{docsThemeBootstrap\}`\)/)
  assert.match(route, /replace\('<\/head>', `\$\{docsEmbedStyles\}<\/head>`\)\s*\.replace\('<head>', `<head>\$\{docsThemeBootstrap\}`\)/)
  assert.match(route, /bodyObserver\.observe\(document\.documentElement, \{ childList: true \}\)/)
  assert.match(route, /useState\(\(\) => new Set\(\)\)/)
  assert.match(route, /designkit-docs-card-list-embed/)
  assert.match(route, /--dk-page-max-width:\s*100%/)
  assert.match(route, /--dk-card-min-width:\s*360px/)
  assert.match(route, /--dk-page-gutter:\s*16px/)
  assert.match(route, /repeat\([\s\S]*?auto-fill,[\s\S]*?minmax\(min\(100%, var\(--dk-card-min-width\)\), 1fr\)/)
  assert.doesNotMatch(route, /repeat\([\s\S]*?auto-fit,[\s\S]*?minmax\(min\(100%, var\(--dk-card-min-width\)\), 1fr\)/)
  assert.match(route, /\.dk-card-grid\s*\{[\s\S]*?align-content:\s*start;[\s\S]*?align-items:\s*start;[\s\S]*?grid-auto-rows:\s*max-content;/)
  assert.match(route, /\.dk-page__section\s*\{[\s\S]*?align-content:\s*start;[\s\S]*?min-height:\s*var\(--dk-docs-preview-min-height, 0px\)/)
  assert.match(route, /\.dk-card\s*\{[\s\S]*?border-radius:\s*12px;/)
  assert.match(route, /\.dk-card__content\s*\{[\s\S]*?border-top-left-radius:\s*10px;[\s\S]*?border-top-right-radius:\s*10px;[\s\S]*?border-bottom-left-radius:\s*12px;[\s\S]*?border-bottom-right-radius:\s*12px;/)
  assert.match(route, /body\[arco-theme='dark'\]\s+\.dk-card__price\s*\{[\s\S]*?color:\s*var\(--color-text-1/)
  assert.doesNotMatch(route, /\.sbux-table-toolbar__operation-button\s*\{/)
  assert.doesNotMatch(route, /docsArcoIcons/)
  assert.doesNotMatch(route, /publishIcon|moveIcon|deleteIcon/)
  assert.doesNotMatch(route, /\.dk-card-toolbar \.dk-toolbar-action-icon\s*\{/)
  assert.match(route, /@media \(max-width: 920px\)[\s\S]*?\.dk-card-toolbar-row[\s\S]*?flex-wrap:\s*wrap/)
  assert.doesNotMatch(route, /!important/)
  assert.match(runtimeCssRoute, /distribution\/designkit-starter-v1\/runtime\/starbucks-react\.css\?raw/)
  assert.match(runtimeJsRoute, /distribution\/designkit-starter-v1\/runtime\/starbucks-react\.umd\.js\?raw/)
  assert.doesNotMatch(route, /TemplatePagePlaceholder/)
})

test('card list template documents its component boundary and responsive rules', async () => {
  const doc = await readFile(new URL('data-list/card-list.mdx', docsDir), 'utf8')

  const headings = [...doc.matchAll(/<h2>(.*?)<\/h2>/g)].map((match) => match[1])
  assert.deepEqual(headings, ['页面结构', '使用组件', '设计规则', 'Golden Fidelity Contract'])
  assert.doesNotMatch(doc, /<p>/)

  assert.match(doc, /不是公共 <code>CardListPage<\/code> 或 <code>CheckCard<\/code> 组件/)
  assert.match(doc, /Table \/ Basic List/)
  assert.match(doc, /只有 Selection Control 改变选择状态/)
  assert.match(doc, /首次进入时默认不选择任何 Card/)
  assert.match(doc, /Card Actions 与 Batch Actions 独立配置/)
  assert.match(doc, /More 本身计为一个入口/)
  assert.match(doc, /至少 14 个中文字符/)
  assert.match(doc, /当前模板校准值为 360px/)
  assert.match(doc, /保留当前宽度已经能够容纳的列轨道/)
  assert.match(doc, /1、2 或 5 张结果仍使用三列卡宽/)
  assert.match(doc, /不根据当前筛选结果数量重新分配卡片宽度/)
  assert.match(doc, /至少占满当前首屏剩余高度/)
  assert.match(doc, /20px 底部 gutter/)
  assert.match(doc, /首屏剩余空间保留在列表下方/)
  assert.match(doc, /Card Grid 行高由卡片内容决定并保持顶对齐/)
  assert.match(doc, /页面内容容器四周统一使用 16px padding/)
  assert.match(doc, /标题优先单行展示/)
  assert.match(doc, /Card 四周圆角和内容区下方圆角均为 12px/)
  assert.match(doc, /内容区顶部圆角为 10px/)
  assert.match(doc, /直接复用 TableToolbar/)
  assert.match(doc, /内部 Button 处理启用、禁用和主题样式/)
  assert.match(doc, /IconPlus/)
  assert.match(doc, /IconSwap/)
  assert.match(doc, /IconDelete/)
  assert.match(doc, /IconMore/)
  assert.match(doc, /图标按钮/)
  assert.match(doc, /currentColor/)
  assert.match(doc, /Toolbar 与 Grid 使用独立响应式策略/)
  assert.match(doc, /跟随 Docs 亮色或暗色主题/)
  assert.match(doc, /主题动画层使用已渲染内容的轻量快照/)
  assert.match(doc, /\.dk-card.*不代表仓库已经发布公共/)
})

test('card list Golden Example keeps the corrected geometry and title overflow contract', async () => {
  const golden = await readFile(
    new URL('../../../../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html', import.meta.url),
  )
  const source = golden.toString('utf8')
  const digest = createHash('sha256').update(golden).digest('hex')

  assert.equal(digest, 'e7cba2cc6976fb6fa7d3a78db2231459b61c28902f4ec5c3ef03e5e14be03dd5')
  assert.match(source, /\.dk-card\s*\{[\s\S]*?border-radius:\s*12px;/)
  assert.match(source, /\.dk-card__content\s*\{[\s\S]*?border-radius:\s*10px 10px 12px 12px;/)
  assert.match(source, /const \{ IconPlus, IconSwap, IconDelete, IconMore \} = window\.arcoicon/)
  assert.match(source, /key: 'publish',[\s\S]*?icon: <IconPlus \/>/)
  assert.match(source, /key: 'move',[\s\S]*?icon: <IconSwap \/>/)
  assert.match(source, /delete: \{ key: 'delete', label: '删除' \}/)
  assert.doesNotMatch(source, /key: 'delete',[\s\S]*?status:\s*['"]danger['"]/)
  assert.match(source, /<Popconfirm[\s\S]*?title="确认删除卡片"[\s\S]*?okText="删除"[\s\S]*?cancelText="取消"[\s\S]*?onOk=\{\(\) => removeProducts\(new Set\(\[product\.id\]\)\)\}/)
  assert.match(source, /type=\{isSelected \? 'text' : 'secondary'\}/)
  assert.match(source, /\.dk-card__title\s*\{[\s\S]*?overflow:\s*hidden;[\s\S]*?text-overflow:\s*ellipsis;[\s\S]*?white-space:\s*nowrap;/)
})

test('completed page templates document the shared header action rules', async () => {
  const docsToCheck = [
    'data-list/basic-list.mdx',
    'data-list/filter-list.mdx',
    'data-list/tree-filter-list.mdx',
    'data-list/tag-list.mdx',
    'form/basic-form.mdx',
    'form/grouped-form.mdx',
    'form/step-form.mdx',
    'detail/basic-detail.mdx',
    'detail/card-detail.mdx',
    'detail/data-detail.mdx',
    'detail/secondary-detail.mdx',
  ]

  const sources = await Promise.all(docsToCheck.map((path) => readFile(new URL(path, docsDir), 'utf8')))

  for (const source of sources) {
    assert.match(source, /左侧(?:有意义的)?面包屑或页面标题、右侧业务核心操作或全局功能操作/)
    assert.match(source, /最多展示 4 个按钮；超过 4 个时，前 3 个保留，剩余操作统一收进第 4 个“更多”下拉菜单/)
    assert.match(source, /最多保留 1 个主按钮，放在操作区最优位置；其他按钮使用白色填充的描边样式/)
  }
})

test('page template docs hide document chrome and use filled content area', async () => {
  const [
    demoCss,
    breadcrumb,
    placeholder,
    reactBasicList,
    vueBasicList,
    reactRowActionStyles,
    vueRowActionStyles,
  ] = await Promise.all([
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
    readFile(new URL('../../components/TemplatePageBreadcrumb.astro', import.meta.url), 'utf8'),
    readFile(new URL('../../components/TemplatePagePlaceholder.astro', import.meta.url), 'utf8'),
    readFile(new URL('../../demos/template-pages/basic-list.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../../demos/template-pages/basic-list.vue', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-react/src/overrides/TableRowActions.less', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-vue/src/overrides/TableRowActions.less', import.meta.url), 'utf8'),
  ])

  assert.match(breadcrumb, /sb-template-page-breadcrumb/)
  assert.match(breadcrumb, /页面模板/)
  assert.match(breadcrumb, /templates\/data-list\/card-list/)
  assert.match(breadcrumb, /templates\/detail\/basic-detail/)
  assert.match(breadcrumb, /templates\/result\/network-error/)
  assert.match(breadcrumb, /templates\/form\/step-form/)
  assert.match(breadcrumb, /data-template-action-host="basic-list"/)
  assert.match(breadcrumb, /data-template-action-host="filter-list"/)
  assert.match(breadcrumb, /data-template-action-host="tree-filter-list"/)
  assert.match(breadcrumb, /data-template-action-host="tag-list"/)
  assert.match(breadcrumb, /data-template-action-host="basic-detail"/)
  assert.match(placeholder, /sb-template-page-placeholder/)
  assert.match(placeholder, /预留位/)
  assert.match(demoCss, /\.main-pane:has\(\.sb-template-page-breadcrumb\) main > \.content-panel:first-child\s*\{[\s\S]*?display:\s*none;/)
  assert.match(demoCss, /\.sl-container:has\(\.sb-template-page-breadcrumb\),[\s\S]*?\.sl-container:has\(\.sb-demo\[data-demo\^='template-'\]\)\s*\{[\s\S]*?max-width:\s*none;/)
  assert.match(demoCss, /\.main-pane:has\(\.sb-template-page-breadcrumb\) main > \.content-panel \+ \.content-panel\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\)\);[\s\S]*?padding-inline:\s*20px;[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.match(demoCss, /\.main-pane:has\(\.sb-template-page-breadcrumb\) main > \.content-panel \+ \.content-panel > \.sl-container\s*\{[\s\S]*?width:\s*100%;[\s\S]*?max-width:\s*none;[\s\S]*?min-height:\s*inherit;[\s\S]*?padding-inline:\s*0;/)
  assert.match(demoCss, /\.main-pane:has\(\.sb-template-page-breadcrumb\) main\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.match(demoCss, /\.main-pane:has\(\.sb-template-page-breadcrumb\) footer\.sl-flex\s*\{[\s\S]*?display:\s*none;/)
  assert.match(demoCss, /\.sb-template-page-placeholder\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 48px\);[\s\S]*?padding:\s*0;[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.match(demoCss, /\.sb-demo\[data-demo\^='template-pages\/'\]\s*\{[\s\S]*?border:\s*0;[\s\S]*?margin:\s*0;/)
  assert.match(demoCss, /\.sb-demo\[data-demo\^='template-pages\/'\] > \.sb-demo-preview\s*\{[\s\S]*?padding:\s*0;[\s\S]*?min-height:\s*0;/)
  assert.match(demoCss, /\.sb-template-page-breadcrumb__actions\s*\{[\s\S]*?margin-inline-start:\s*auto;/)
  assert.match(demoCss, /\.sb-template-page-breadcrumb\s*\{[\s\S]*?width:\s*100%;/)
  assert.match(demoCss, /\.sb-basic-list-page__breadcrumb-actions\s*\{[\s\S]*?gap:\s*16px;/)
  assert.match(demoCss, /\.sb-filter-list-page__breadcrumb-actions\s*\{[\s\S]*?gap:\s*16px;/)
  assert.match(demoCss, /\.sb-tag-list-page__breadcrumb-actions\s*\{[\s\S]*?gap:\s*16px;/)
  assert.match(demoCss, /\.sb-demo\[data-demo\^='template-pages\/'\] > \.sb-demo-code\s*\{[\s\S]*?display:\s*none;/)
  assert.match(demoCss, /\.sb-demo\[data-demo='template-pages\/basic-list'\]\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.match(demoCss, /\.sb-demo\[data-demo='template-pages\/basic-list'\] > \.sb-demo-preview\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);/)
  for (const source of [reactBasicList, vueBasicList]) {
    assert.match(source, /sb-basic-list-page sb-template-page-surface/)
  }
  assert.match(demoCss, /\.sb-basic-list-page\.sb-template-page-surface,[\s\S]*?\.sb-tag-list-page\.sb-template-page-surface\s*\{[\s\S]*?align-content:\s*start;[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*var\(--border-radius-md\);[\s\S]*?padding-top:\s*var\(--spacing-2\);/)
  assert.match(demoCss, /\.sb-basic-list-page\s*\{[\s\S]*?gap:\s*12px;/)
  const basicListModuleRule = demoCss.match(/\.sb-basic-list-page__module\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  assert.match(basicListModuleRule, /overflow:\s*hidden;/)
  assert.doesNotMatch(basicListModuleRule, /background:\s*var\(--bg-color-container\);/)
  assert.doesNotMatch(basicListModuleRule, /border-radius:\s*6px;/)
  assert.match(demoCss, /\.sb-basic-list-page__module\s*\{[\s\S]*?padding:\s*0 var\(--spacing-6\) var\(--spacing-6\);/)
  assert.doesNotMatch(demoCss, /\.sb-basic-list-page__table-module\s*\{[^}]*padding-(?:inline|top):/)
  assert.match(demoCss, /\.sb-basic-list-page\.sb-template-page-surface\s*\{[\s\S]*?align-content:\s*stretch;/)
  assert.match(demoCss, /@media \(min-width: 1024px\)[\s\S]*?\.sb-basic-list-page\.sb-template-page-surface\s*\{[\s\S]*?height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 96px\);[\s\S]*?overflow:\s*hidden;/)
  assert.match(demoCss, /\.sb-basic-list-page__table-module\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;[\s\S]*?gap:\s*0;/)
  assert.match(demoCss, /\.sb-basic-list-page__table-viewport\s*\{[\s\S]*?flex:\s*1 1 auto;[\s\S]*?min-height:\s*0;[\s\S]*?overflow:\s*hidden;/)
  assert.doesNotMatch(demoCss, /\.sb-basic-list-page__table-module > \.arco-table thead/)
  assert.match(demoCss, /\.sb-basic-list-page__pagination\s*\{[\s\S]*?margin-top:\s*auto;/)
  assert.match(demoCss, /\.sb-filter-list-page\s*\{[\s\S]*?gap:\s*var\(--spacing-4\);/)
  assert.match(demoCss, /\.sb-filter-list-page\.sb-template-page-surface\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);[\s\S]*?border-radius:\s*0;[\s\S]*?padding-top:\s*0;/)
  assert.match(demoCss, /\.sb-filter-list-page__module\s*\{[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*6px;/)
  assert.match(demoCss, /\.sb-filter-list-page__table-module\s*\{[\s\S]*?padding-top:\s*var\(--spacing-2\);/)
  assert.doesNotMatch(demoCss, /\.sb-basic-list-page__toolbar\s*\{/)
  assert.doesNotMatch(demoCss, /\.sb-filter-list-page__toolbar\s*\{/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions\s*\{[\s\S]*?gap:\s*4px;/)
  assert.doesNotMatch(demoCss, /\.sb-basic-list-page__row-actions \.arco-(?:v-)?btn/)
  for (const source of [reactBasicList, vueBasicList]) {
    assert.match(source, /sb-basic-list-page__row-actions sbux-table-row-actions/)
  }
  assert.equal(reactRowActionStyles, vueRowActionStyles)
  assert.match(reactRowActionStyles, /\.sbux-table-row-actions/)
  assert.match(reactRowActionStyles, /color:\s*var\(--color-text-brand\);/)
  assert.match(reactRowActionStyles, /background-color:\s*var\(--color-primary-light\);/)
  assert.match(reactRowActionStyles, /background-color:\s*var\(--color-primary-light-hover\);/)
  assert.doesNotMatch(reactRowActionStyles, /!important/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__breadcrumb-actions\s*\{[\s\S]*?gap:\s*16px;/)
  assert.match(demoCss, /\.sb-basic-list-page__modal-title\s*\{[\s\S]*?text-align:\s*left;/)
  assert.match(demoCss, /\.sb-template-docs-card\s*\{[\s\S]*?margin-top:\s*12px;[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*6px;/)
  assert.match(demoCss, /\.sl-markdown-content > \.sb-template-docs-card\s*\{[\s\S]*?margin-top:\s*12px;/)
  assert.doesNotMatch(demoCss, /@media \(max-width:\s*860px\)[\s\S]*?\.sb-basic-list-page__toolbar\s*\{/)
  assert.doesNotMatch(demoCss, /@media \(max-width:\s*860px\)[\s\S]*?\.sb-filter-list-page__toolbar\s*\{/)
})

test('tag management template is a real React and Vue page composition', async () => {
  const [doc, reactDemo, vueDemo, demoCss] = await Promise.all([
    readFile(new URL('data-list/tag-list.mdx', docsDir), 'utf8'),
    readFile(new URL('tag-list.tsx', demosDir), 'utf8'),
    readFile(new URL('tag-list.vue', demosDir), 'utf8'),
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
  ])

  assert.match(doc, /<Demo name="template-pages\/tag-list" \/>/)
  assert.match(doc, /<section class="sb-template-docs-card">/)
  assert.match(doc, /<section class="sb-template-docs-section">/)
  assert.match(doc, /<div class="sb-template-docs-component-list">/)
  assert.match(doc, /页面模板只负责组合和本地交互，不新增公共标签管理业务组件/)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /sb-tag-list-page sb-template-page-surface/)
    assert.match(source, /sb-tag-list-page__breadcrumb-actions/)
    assert.match(source, /核心操作[\s\S]*?全局操作/)
    assert.doesNotMatch(source, /sb-tag-list-page__header/)
    assert.doesNotMatch(source, /客户标签/)
    assert.match(source, /基础属性/)
    assert.match(source, /会员等级/)
    assert.match(source, /系统标签/)
    assert.match(source, /编辑名称/)
    assert.match(source, /确认删除标签组/)
    assert.match(source, /Popover|a-popover/)
    assert.match(source, /Popconfirm|a-popconfirm/)
    assert.match(source, /Modal|a-modal/)
    assert.match(source, /添加标签/)
    assert.match(source, /type="outline"/)
    assert.match(source, /Table|a-table/)
    assert.match(source, /Pagination|a-pagination/)
    assert.match(source, /const pageSize = 5/)
    assert.match(source, /sb-tag-list-page__row-actions/)
    assert.match(source, /sb-tag-list-page__group-action/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
    assert.doesNotMatch(source, /#[0-9a-f]{3,8}/i)
  }

  assert.match(demoCss, /\.sb-tag-list-page__card\s*\{[\s\S]*?grid-template-columns:\s*268px minmax\(0, 1fr\);[\s\S]*?border-radius:\s*6px;/)
  assert.match(demoCss, /\.sb-tag-list-page__table\s*\{[\s\S]*?overflow-x:\s*auto;/)
  assert.match(demoCss, /\.sb-tag-list-page\.sb-template-page-surface\s*\{[\s\S]*?align-content:\s*stretch;/)
  assert.match(demoCss, /\.sb-tag-list-page__pagination\s*\{[\s\S]*?margin-top:\s*auto;[\s\S]*?margin-inline:\s*calc\(-1 \* var\(--spacing-6\)\);[\s\S]*?margin-bottom:\s*calc\(-1 \* var\(--spacing-5\)\);[\s\S]*?padding:\s*var\(--spacing-6\) var\(--spacing-6\) var\(--spacing-5\);[\s\S]*?border-top:\s*1px solid var\(--color-border-1\);/)
  assert.match(demoCss, /\.sb-tag-list-page__group\.is-active\s*\{[\s\S]*?background:\s*var\(--color-primary-light\);/)
  assert.match(demoCss, /\.sb-tag-list-page \.sb-tag-list-page__group-actions \.sb-tag-list-page__group-action,[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/)
  assert.match(demoCss, /\.sb-tag-list-page__toolbar-right\s*\{[\s\S]*?flex-wrap:\s*nowrap;/)
  assert.match(demoCss, /\.sb-template-docs-card\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\);/)
  assert.match(demoCss, /\.sb-template-docs-card h2\s*\{[\s\S]*?font-size:\s*var\(--fs-16\);/)
  assert.match(demoCss, /\.sb-template-docs-component-list\s*\{[\s\S]*?row-gap:\s*var\(--spacing-3\);/)
  assert.match(demoCss, /\.sb-template-docs-component-list code\s*\{[\s\S]*?margin:\s*0;/)
  assert.match(demoCss, /\.sb-tag-list-page__row-actions \.arco-btn-text:not\(\.arco-btn-disabled\),[\s\S]*?color:\s*var\(--color-text-brand\);/)
  assert.match(demoCss, /\.sb-tag-list-page__row-actions \.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):hover,[\s\S]*?background:\s*var\(--color-primary-light\);/)
  assert.match(demoCss, /@media \(max-width:\s*860px\)[\s\S]*?\.sb-tag-list-page__card\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/)
})

test('tree filter list template keeps React and Vue query contracts equivalent', async () => {
  const [doc, shared, reactDemo, vueDemo, demoCss] = await Promise.all([
    readFile(new URL('data-list/tree-filter-list.mdx', docsDir), 'utf8'),
    readFile(new URL('tree-filter-list.shared.ts', demosDir), 'utf8'),
    readFile(new URL('tree-filter-list.tsx', demosDir), 'utf8'),
    readFile(new URL('tree-filter-list.vue', demosDir), 'utf8'),
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
  ])

  assert.match(doc, /<Demo name="template-pages\/tree-filter-list" \/>/)
  assert.match(doc, /左侧区域树作为固定筛选面板/)
  assert.match(doc, /Tree 勾选只更新 Draft/)
  assert.match(doc, /不新增公共树筛选业务组件/)

  assert.match(shared, /export type TreeFilterListQuery/)
  assert.match(shared, /export const getFilterDefaultVisibleCount/)
  assert.match(shared, /containerWidth < 576\)\s*return 1/)
  assert.match(shared, /containerWidth < 768\)\s*return 2/)
  assert.match(shared, /export function getSelectedLeafKeys/)
  assert.match(shared, /export function filterStoreRows/)
  assert.match(shared, /export function paginateRows/)
  assert.match(shared, /export const treeDataByType/)
  assert.match(shared, /export const initialStoreRows/)
  assert.match(shared, /children/)
  assert.doesNotMatch(shared, /from ['"]react['"]|from ['"]vue['"]|JSX|createElement|document\./)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /sb-tree-filter-list-page sb-template-page-surface/)
    assert.match(source, /tree-filter-list\.shared/)
    assert.match(source, /FilterBar/)
    assert.match(source, /submitMode="manual"|submit-mode="manual"/)
    assert.match(source, /defaultVisibleCount=\{filterVisibleCount\}|default-visible-count="filterVisibleCount"/)
    assert.match(source, /getFilterDefaultVisibleCount/)
    assert.match(source, /setFilterVisibleCount\(getFilterDefaultVisibleCount\(filterBar\.clientWidth\)\)|filterVisibleCount\.value = getFilterDefaultVisibleCount\(filterBar\.clientWidth\)/)
    assert.match(source, /ResizeObserver/)
    assert.match(source, /const filterColumns = \{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 \}/)
    assert.match(source, /keyword/)
    assert.match(source, /businessStatus/)
    assert.match(source, /storeType/)
    assert.match(source, /channel/)
    assert.match(source, /openingDate/)
    assert.match(source, /Tree|<Tree/)
    assert.match(source, /checkStrictly=\{false\}|check-strictly="false"/)
    assert.match(source, /showLine|show-line/)
    assert.match(source, /IconDown/)
    assert.match(source, /IconDriveFile/)
    assert.match(source, /checkedKeys|checked-keys/)
    assert.match(source, /expandedKeys|expanded-keys/)
    assert.match(source, /onCheck|@check/)
    assert.match(source, /onExpand|@expand/)
    assert.match(source, /Radio\.Group|RadioGroup/)
    assert.doesNotMatch(source, /Tabs|<Tabs/)
    assert.match(source, /treeSelectedKeys/)
    assert.match(source, /getSelectedLeafKeys/)
    assert.match(source, /Table|<Table/)
    assert.doesNotMatch(source, /<table(?:\s|>)/)
    assert.match(source, /Pagination|<Pagination/)
    assert.doesNotMatch(source, /rowSelection|row-selection|selectedRowKeys|selected-keys/)
    assert.doesNotMatch(source, /Modal\.warning|批量启用|批量停用|清除选择/)
    assert.match(source, /门店列表/)
    assert.match(source, /Normal|Loading|Empty|Error/)
    assert.match(source, /Select/)
    assert.match(source, /aria-label="页面状态"/)
    assert.doesNotMatch(source, /<span>页面状态<\/span>/)
    assert.match(source, /Spin|<Spin/)
    assert.match(source, /Result|<Result/)
    assert.match(source, /aria-label/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
    assert.doesNotMatch(source, /sb-tree-filter-list-page__header/)
  }

  assert.match(reactDemo, /expandProps=\{\{/)
  assert.match(reactDemo, /switcherIcon:\s*node\.isLeaf\s*\?\s*<IconDriveFile\s*\/>\s*:\s*<IconDown\s*\/>/)
  assert.match(reactDemo, /expanded\s*\?\s*<IconDownCircle\s*\/>\s*:\s*<IconRightCircle\s*\/>/)
  assert.match(vueDemo, /:expandable="expandable"/)
  assert.match(vueDemo, /#switcher-icon="_node, \{ isLeaf \}"/)
  assert.match(vueDemo, /<IconDown v-if="!isLeaf"\s*\/>/)
  assert.match(vueDemo, /<IconDriveFile v-else\s*\/>/)
  assert.match(vueDemo, /h\(expanded\s*\?\s*IconDownCircle\s*:\s*IconRightCircle\)/)
  assert.doesNotMatch(shared, /updateStoreStatus/)

  assert.match(demoCss, /\.sb-tree-filter-list-page__layout\s*\{[\s\S]*?grid-template-columns:\s*280px minmax\(0, 1fr\);[\s\S]*?gap:\s*0;[\s\S]*?background:\s*transparent;/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__layout\.is-sidebar-collapsed\s*\{[\s\S]*?grid-template-columns:\s*88px minmax\(0, 1fr\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__sidebar\s*\{[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-right:\s*1px solid var\(--color-border-1\);[\s\S]*?border-radius:\s*var\(--border-radius-md\) 0 0 var\(--border-radius-md\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page \.sb-tree-filter-list-page__sidebar-header > h2\s*\{[\s\S]*?font-size:\s*var\(--fs-14\);[\s\S]*?line-height:\s*var\(--lh-22\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__filter-module\s*\{[\s\S]*?background:\s*var\(--bg-color-secondarycontainer\);[\s\S]*?border-radius:\s*var\(--border-radius-md\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__table-module\s*\{[\s\S]*?background:\s*transparent;/)
  assert.match(demoCss, /\.sb-tree-filter-list-page > \.sb-tree-filter-list-page__layout > \.sb-tree-filter-list-page__content\s*\{[\s\S]*?margin:\s*0;[\s\S]*?padding:\s*var\(--spacing-6\);[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*0 var\(--border-radius-md\) var\(--border-radius-md\) 0;/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__tree-scroll\s*\{[\s\S]*?overflow-y:\s*auto;/)
  assert.doesNotMatch(demoCss, /\.sb-tree-filter-list-page__tree-scroll[\s\S]*?\.arco-tree-node-switcher::before/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__table-scroll\s*\{[\s\S]*?overflow-x:\s*auto;/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__row-actions\s*\{[\s\S]*?gap:\s*4px;/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__list-title\s*\{[\s\S]*?font-size:\s*var\(--fs-14\);[\s\S]*?line-height:\s*var\(--lh-22\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__tree-type\s*\{[\s\S]*?display:\s*flex;[\s\S]*?width:\s*100%;[\s\S]*?padding:\s*0 var\(--spacing-6\);/)
  assert.match(demoCss, /\.sb-tree-filter-list-page__tree-type \.arco-radio-group-button,[\s\S]*?width:\s*100%;/)
  assert.doesNotMatch(demoCss, /\.sb-tree-filter-list-page__sidebar-header\s*\{[^}]*border-bottom:/)
  assert.doesNotMatch(demoCss, /\.sb-tree-filter-list-page__tree-type\s*\{[^}]*border-bottom:/)
  assert.doesNotMatch(demoCss, /\.sb-tree-filter-list-page__header\s*\{/)
  assert.doesNotMatch(demoCss, /\.sb-tree-filter-list-page__table-scroll \.arco-(?:v-)?table-cell-expand-icon/)
  assert.match(demoCss, /@media \(max-width:\s*860px\)[\s\S]*?\.sb-tree-filter-list-page__layout,[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/)
})

test('basic form template keeps React and Vue form contracts equivalent', async () => {
  const [doc, shared, reactDemo, vueDemo, demoCss, reactIndex, vueIndex] = await Promise.all([
    readFile(new URL('form/basic-form.mdx', docsDir), 'utf8'),
    readFile(new URL('basic-form.shared.ts', demosDir), 'utf8'),
    readFile(new URL('basic-form.tsx', demosDir), 'utf8'),
    readFile(new URL('basic-form.vue', demosDir), 'utf8'),
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-react/src/pro/index.ts', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-vue/src/pro/index.ts', import.meta.url), 'utf8'),
  ])

  assert.match(doc, /<Demo name="template-pages\/basic-form" \/>/)
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/)
  assert.match(doc, /共用表单布局能力/)
  assert.match(doc, /不是公共 <code>BasicFormPage<\/code> 组件/)

  assert.match(shared, /export type BasicFormValues/)
  assert.match(shared, /createBasicFormBaseline/)
  assert.match(shared, /businessStatus: 'preparing'/)
  assert.match(shared, /deliveryEnabled: false/)
  assert.match(shared, /serviceChannels: \[\]/)
  assert.match(shared, /STORE_CODE_PATTERN/)
  assert.doesNotMatch(shared, /from ['"]react['"]|from ['"]vue['"]|JSX|document\./)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /BasicFormValues|createBasicFormBaseline/)
    assert.match(source, /storeName/)
    assert.match(source, /storeCode/)
    assert.match(source, /storeType/)
    assert.match(source, /businessStatus/)
    assert.match(source, /openingDate/)
    assert.match(source, /serviceChannels/)
    assert.match(source, /deliveryEnabled/)
    assert.match(source, /manager/)
    assert.match(source, /description/)
    assert.match(source, /STORE_TYPE_OPTIONS/)
    assert.match(source, /BUSINESS_STATUS_OPTIONS/)
    assert.match(source, /SERVICE_CHANNEL_OPTIONS/)
    assert.match(source, /STORE_CODE_PATTERN/)
    assert.match(source, /Form|<Form/)
    assert.doesNotMatch(source, /PageHeader/)
    assert.match(source, /FormPageLayout/)
    assert.match(source, /FormGrid/)
    assert.match(source, /FormGridItem/)
    assert.match(source, /FormControlArea/)
    assert.match(source, /FormActions/)
    assert.match(source, /Input|<Input/)
    assert.match(source, /Select|<Select/)
    assert.match(source, /Radio|<Radio/)
    assert.match(source, /Checkbox|<Checkbox/)
    assert.match(source, /Switch|<Switch/)
    assert.match(source, /DatePicker|<DatePicker/)
    assert.match(source, /Textarea|TextArea/)
    assert.match(source, /Button|<Button/)
    assert.match(source, /submitting/)
    assert.match(source, /submitSuccess/)
    assert.match(source, /resetFields|reset-fields/)
    assert.match(source, /Message\.success/)
    assert.match(source, /maxLength|max-length/)
    assert.match(source, /showWordLimit|show-word-limit/)
    assert.match(source, /scrollToFirstError|scroll-to-first-error/)
    assert.doesNotMatch(source, /PageContainer/)
    assert.doesNotMatch(source, /填写门店基础信息并保存/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
    assert.doesNotMatch(source, /BasicFormPage/)
    assert.doesNotMatch(source, /sb-basic-form-page__form/)
  }

  assert.match(reactDemo, /Form\.useForm/)
  assert.match(reactDemo, /style=\{\{ resize: 'none' \}\}/)
  assert.match(reactDemo, /wrapperStyle=\{\{ width: '100%' \}\}/)
  assert.match(reactDemo, /triggerPropName="checked"/)
  assert.match(reactDemo, /htmlType="submit"/)
  assert.match(vueDemo, /:model="form"/)
  assert.match(vueDemo, /@submit="handleSubmit"/)
  assert.match(vueDemo, /html-type="submit"/)
  assert.match(vueDemo, /style="width: 100%"/)
  assert.match(demoCss, /\.sb-basic-form-page \.arco-form-item-wrapper,[\s\S]*?\.sb-grouped-form-page \.arco-form-item-wrapper,[\s\S]*?\.sb-step-form-page \.arco-form-item-wrapper,[\s\S]*?width:\s*100%;/)
  const sharedFormPageRule = demoCss.match(/\.sb-basic-form-page,[\s\S]*?\.sb-grouped-form-page,[\s\S]*?\.sb-step-form-page\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  assert.match(sharedFormPageRule, /width:\s*100%;[\s\S]*?padding:\s*var\(--spacing-8\) var\(--spacing-6\) var\(--spacing-6\)[\s\S]*?font-family:\s*var\(--font-family\);[\s\S]*?background:\s*var\(--bg-color-container\)[\s\S]*?border-radius:\s*var\(--border-radius-md\)/)
  assert.doesNotMatch(demoCss, /\.sb-(?:basic|grouped|step)-form-page__header/)
  assert.match(demoCss, /\.sb-step-form-page__summary\s*\{[\s\S]*?background:\s*var\(--bg-color-secondarycontainer\);/)
  for (const entry of [reactIndex, vueIndex]) {
    assert.match(entry, /FormPageLayout/)
    assert.match(entry, /FormGridItem/)
    assert.doesNotMatch(entry, /BasicFormPage|GroupedFormPage|StepFormPage/)
  }
})

test('grouped and step form templates use the shared layout contract', async () => {
  const [groupedDoc, stepDoc, groupedReact, groupedVue, stepReact, stepVue, shared] = await Promise.all([
    readFile(new URL('form/grouped-form.mdx', docsDir), 'utf8'),
    readFile(new URL('form/step-form.mdx', docsDir), 'utf8'),
    readFile(new URL('grouped-form.tsx', demosDir), 'utf8'),
    readFile(new URL('grouped-form.vue', demosDir), 'utf8'),
    readFile(new URL('step-form.tsx', demosDir), 'utf8'),
    readFile(new URL('step-form.vue', demosDir), 'utf8'),
    readFile(new URL('grouped-step-form.shared.ts', demosDir), 'utf8'),
  ])

  assert.match(groupedDoc, /<Demo name="template-pages\/grouped-form" \/>/)
  assert.match(groupedDoc, /FormSection/)
  assert.doesNotMatch(groupedDoc, /PageHeader/)
  assert.match(stepDoc, /<Demo name="template-pages\/step-form" \/>/)
  assert.match(stepDoc, /StepFormLayout/)
  assert.doesNotMatch(stepDoc, /PageHeader/)
  assert.match(shared, /createGroupedFormBaseline/)
  assert.match(shared, /createStepFormBaseline/)
  assert.match(shared, /ACTIVITY_CITY_OPTIONS/)
  assert.match(shared, /ACTIVITY_COUPON_SELECT_OPTIONS/)

  for (const source of [groupedReact, groupedVue]) {
    assert.doesNotMatch(source, /PageHeader/)
    assert.match(source, /FormPageLayout/)
    assert.match(source, /FormSection/)
    assert.match(source, /FormGrid/)
    assert.match(source, /FormControlArea/)
    assert.match(source, /FormActions/)
    assert.match(source, /scrollToFirstError|scroll-to-first-error/)
    assert.match(source, /Message\.success/)
    assert.match(source, /resetFields|reset-fields/)
    assert.doesNotMatch(source, /PageContainer/)
    assert.doesNotMatch(source, /BasicFormPage|GroupedFormPage|StepFormPage/)
  }

  assert.match(groupedReact, /maxLength=\{200\}/)
  assert.match(groupedReact, /showWordLimit/)
  assert.match(groupedVue, /:max-length="200"/)
  assert.match(groupedVue, /show-word-limit/)
  for (const source of [groupedReact, groupedVue]) {
    assert.doesNotMatch(source, /按业务分组填写门店资料、营业规则和负责人信息/)
    assert.doesNotMatch(source, /<FormSection[^>]*\bdivider(?:\s|>)/)
  }

  for (const source of [stepReact, stepVue]) {
    assert.doesNotMatch(source, /PageHeader/)
    assert.match(source, /FormPageLayout/)
    assert.match(source, /StepFormLayout/)
    assert.match(source, /Steps|<Steps/)
    assert.match(source, /FormSection/)
    assert.doesNotMatch(source, /<FormSection[^>]*\btitle=/)
    assert.match(source, /FormGrid/)
    assert.match(source, /FormControlArea/)
    assert.match(source, /FormActions/)
    assert.match(source, /validate\(|validateField|validate-field/)
    assert.match(source, /currentStep|current-step/)
    assert.match(source, /handlePrevious|handle-previous/)
    assert.match(source, /stickyActions|sticky-actions/)
    assert.match(source, /取消/)
    assert.match(source, /下一步/)
    assert.match(source, /上一步/)
    assert.match(source, /提交/)
    assert.doesNotMatch(source, /PageContainer/)
    assert.doesNotMatch(source, /changeable/)
  }

  assert.match(stepReact, /选择活动城市/)
  assert.match(stepReact, /mode="multiple"/)
  assert.match(stepReact, /选择活动券/)
  assert.match(stepReact, /Form\.List/)
  assert.match(stepVue, /选择活动城市/)
  assert.match(stepVue, /multiple/)
  assert.match(stepVue, /选择活动券/)
  assert.match(stepVue, /v-for=.*form\.outputResults/)
  for (const source of [stepReact, stepVue]) {
    assert.doesNotMatch(source, /设置参与会员范围、城市和指定人群/)
    assert.doesNotMatch(source, /填写活动名称、时间和归属团队/)
    assert.doesNotMatch(source, /设置任务类型、券范围和活动输出结果/)
    assert.doesNotMatch(source, /选择城市\/查看|已选城市：2/)
    assert.doesNotMatch(source, /例1：输入 -1|例2：输入 0|例3：输入 1/)
    assert.doesNotMatch(source, /按步骤完成活动创建，已填写内容会在步骤间保留/)
  }
})

test('step form keeps actions at the bottom of the page surface', async () => {
  const demoCss = await readFile(new URL('../demo.css', import.meta.url), 'utf8')

  assert.match(demoCss, /\.sb-step-form-page\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;/)
  assert.match(demoCss, /\.sb-demo\[data-demo='template-pages\/step-form'\] > \.sb-demo-preview\s*\{[\s\S]*?container-type:\s*inline-size;/)
  assert.match(demoCss, /\.sb-step-form-page > \.sbux-pro-form-page-layout,[\s\S]*?\.sb-step-form-page \.sbux-pro-step-form-layout\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex:\s*1 1 auto;[\s\S]*?flex-direction:\s*column;/)
  assert.match(demoCss, /\.sb-step-form-page > \.sbux-pro-form-page-layout\s*\{[\s\S]*?container-type:\s*normal;/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-actions\s*\{[\s\S]*?width:\s*100cqw;[\s\S]*?margin-left:\s*calc\(50% - 50cqw/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-steps\s*\{[\s\S]*?position:\s*relative;[\s\S]*?width:\s*auto;[\s\S]*?padding-bottom:\s*var\(--spacing-8\);/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-steps::after\s*\{[\s\S]*?left:\s*calc\(50% - 50cqw\);[\s\S]*?width:\s*100cqw;[\s\S]*?border-bottom:\s*1px solid var\(--color-border-1\);/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-actions\s*\{[\s\S]*?margin-top:\s*auto;[\s\S]*?border-top-color:\s*var\(--color-border-1\);/)
  assert.match(demoCss, /\.sb-step-form-page[\s\S]*?sbux-pro-step-form-layout-sticky-actions[\s\S]*?\.sbux-pro-step-form-layout-actions\s*\{[\s\S]*?margin-left:\s*calc\(50% - 50cqw\);[\s\S]*?padding-right:\s*0;[\s\S]*?padding-left:\s*0;/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-actions > \.sbux-pro-form-actions\s*\{[\s\S]*?padding-right:\s*var\(--spacing-6\);[\s\S]*?padding-left:\s*var\(--spacing-6\);/)
  assert.match(demoCss, /\.sb-step-form-page \.sbux-pro-step-form-layout-actions > \.sbux-pro-form-actions\s*\{[\s\S]*?width:\s*calc\(100% - var\(--spacing-6\) - var\(--spacing-6\)\);[\s\S]*?max-width:\s*1120px;[\s\S]*?margin-right:\s*auto;[\s\S]*?margin-left:\s*auto;[\s\S]*?padding-right:\s*var\(--spacing-6\);[\s\S]*?padding-left:\s*var\(--spacing-6\);/)
})

test('shared form layout owns container responsiveness and theme-safe defaults', async () => {
  const [reactStyle, vueStyle, reactVariables, vueVariables, selectionGuide] = await Promise.all([
    readFile(new URL('../../../../../starbucks-design-react/src/pro/form-layout/style.less', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-vue/src/pro/form-layout/style.less', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-react/src/pro/style/variables.less', import.meta.url), 'utf8'),
    readFile(new URL('../../../../../starbucks-design-vue/src/pro/style/variables.less', import.meta.url), 'utf8'),
    readFile(new URL('../../content/docs/guide/ai-skills-selection.mdx', import.meta.url), 'utf8'),
  ])

  for (const style of [reactStyle, vueStyle]) {
    assert.match(style, /container-type:\s*inline-size/)
    assert.match(style, /grid-column:\s*span var\(--sbux-pro-form-grid-item-span, 1\) \/ span var\(--sbux-pro-form-grid-item-span, 1\)/)
    assert.match(style, /@container\s*\(max-width:\s*@sbux-pro-form-breakpoint\)/)
    assert.match(style, /@media\s*\(max-width:\s*@sbux-pro-form-breakpoint\)/)
    assert.match(style, /background:\s*var\(--bg-color-container\)/)
    assert.match(style, /&-divider\s*\{[\s\S]*?\.sbux-pro-form-section-header\s*\{[\s\S]*?padding-bottom:\s*var\(--spacing-3\);[\s\S]*?border-bottom:\s*1px solid var\(--color-border-1\);/)
    assert.doesNotMatch(style, /&-divider\s*\{\s*padding-bottom:/)
    assert.doesNotMatch(style, /--color-bg-2/)
  }

  assert.equal(reactVariables, vueVariables)
  for (const variable of [
    '@sbux-pro-form-page-max-width: 1120px',
    '@sbux-pro-form-page-padding: 0',
    '@sbux-pro-form-grid-gap: 24px',
    '@sbux-pro-form-section-gap: 32px',
    '@sbux-pro-form-section-header-gap: 16px',
    '@sbux-pro-form-step-actions-gap: 16px',
    '@sbux-pro-form-control-height: 32px',
    '@sbux-pro-form-breakpoint: 880px',
  ]) {
    assert.match(reactVariables, new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(selectionGuide, /页面方案、HTML Demo、模板选择或产品评审/)
  assert.match(selectionGuide, /React\/Vue 工程、组件 API 集成和生产配置不能作为产品经理 Starter 的能力使用/)
})

test('basic list template is a real React and Vue page composition', async () => {
  const [doc, reactDemo, vueDemo] = await Promise.all([
    readFile(new URL('data-list/basic-list.mdx', docsDir), 'utf8'),
    readFile(new URL('basic-list.tsx', demosDir), 'utf8'),
    readFile(new URL('basic-list.vue', demosDir), 'utf8'),
  ])

  assert.match(doc, /<Demo name="template-pages\/basic-list" \/>/)
  assert.match(doc, /<section class="sb-template-docs-card">/)
  assert.match(doc, /<section class="sb-template-docs-section">/)
  assert.match(doc, /<div class="sb-template-docs-component-list">/)
  assert.match(doc, /<\/section>/)
  assert.match(doc, /页面模板负责组合，不重复实现业务组件内部能力/)
  assert.match(doc, /具体 List padding 依 Profile、Template 和已批准的 spacing evidence 决定/)
  assert.match(doc, /连续 Data Region/)
  assert.match(doc, /选择型筛选.*Search.*Utility Actions/)
  assert.match(doc, /sbux-table-row-actions/)
  assert.match(doc, /<code>TableToolbar<\/code>/)
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/)
  assert.doesNotMatch(doc, /基础列表用于展示标准数据列表页面的组合方式/)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /sb-basic-list-page sb-template-page-surface/)
    assert.doesNotMatch(source, /FilterBar/)
    assert.doesNotMatch(source, /FilterFieldSchema|\bFilterValue\b|filterStores|draftValues|activeValues/)
    assert.match(source, /const initialStores: StoreRecord\[\]/)
    assert.match(source, /搜索门店/)
    assert.match(source, /TableToolbar/)
    assert.match(source, /type:\s*['"]search['"]/)
    assert.match(source, /onQuickFilterChange|@update:quick-filter-values/)
    assert.match(source, /onOperation|@operation/)
    assert.match(source, /onExport|@export/)
    assert.match(source, /onColumnSettings|@column-settings/)
    assert.match(source, /onRefresh|@refresh/)
    assert.match(source, /keyword/)
    assert.match(source, /visibleStores/)
    assert.match(source, /rowSelection|row-selection/)
    assert.match(source, /selectedRowKeys/)
    assert.match(source, /changeStatusForSelected/)
    assert.match(source, /openBatchConfirm/)
    assert.match(source, /Modal\.warning/)
    assert.match(source, /确认后将立即更新/)
    assert.match(source, /okText:\s*'确定'/)
    assert.match(source, /visibleColumnKeys/)
    assert.match(source, /downloadCsv/)
    assert.match(source, /viewMode/)
    assert.match(source, /createStore/)
    assert.match(source, /const pageSize = 20/)
    const initialStoreBlock = source.match(/const initialStores: StoreRecord\[\] = \[([\s\S]*?)\n\];/)
    assert.ok(initialStoreBlock)
    assert.equal((initialStoreBlock[1].match(/\{ id:/g) ?? []).length, 20)
    assert.match(source, /fixed:\s*'left'/)
    assert.match(source, /sb-basic-list-page__table-viewport/)
    assert.match(source, /ResizeObserver/)
    assert.match(source, /scroll=\{\{ x: 1160, y: tableBodyHeight \}\}|:scroll="\{ x: 1160, y: tableBodyHeight \}"/)
    assert.match(source, /sb-basic-list-page__row-actions/)
    assert.match(source, /aria-label=.*record\.name|:aria-label=.*record\.name/)
    assert.match(source, /size=\{4\}|:size="4"/)
    assert.match(source, /Select/)
    assert.match(source, /aria-label="页面状态"/)
    assert.doesNotMatch(source, /Radio\.Group|RadioGroup/)
    assert.doesNotMatch(source, /<span>页面状态<\/span>/)
    assert.match(source, /Button/)
    assert.match(source, /operationActions|operation-actions/)
    assert.match(source, /moreActions|more-actions/)
    assert.match(source, /tableTools|table-tools/)
    assert.match(source, /requiresSelection|requires-selection/)
    assert.doesNotMatch(source, /sb-basic-list-page__toolbar-(?:left|right)/)
    assert.doesNotMatch(source, /<button[\s>]/)
    assert.doesNotMatch(source, /sb-basic-list-page__header/)
    assert.doesNotMatch(source, /sb-basic-list-page__feedback/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
  }

  assert.match(reactDemo, /sb-basic-list-page__modal-title/)
  assert.match(vueDemo, /title-align="start"/)
})

test('filter list template keeps the current filter-enabled basic list composition', async () => {
  const [doc, reactDemo, vueDemo] = await Promise.all([
    readFile(new URL('data-list/filter-list.mdx', docsDir), 'utf8'),
    readFile(new URL('filter-list.tsx', demosDir), 'utf8'),
    readFile(new URL('filter-list.vue', demosDir), 'utf8'),
  ])

  assert.match(doc, /<Demo name="template-pages\/filter-list" \/>/)
  assert.match(doc, /筛选区直接调用业务组件 <code>FilterBar<\/code>/)
  assert.match(doc, /筛选区卡片与顶部面包屑保持 16px 间距/)
  assert.match(doc, /<code>TableToolbar<\/code>/)
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /sb-filter-list-page sb-template-page-surface/)
    assert.match(source, /FilterBar/)
    assert.match(source, /TableToolbar/)
    assert.match(source, /submitMode="manual"|submit-mode="manual"/)
    assert.match(source, /defaultVisibleCount=\{3\}|default-visible-count="3"/)
    assert.match(source, /const fields: FilterFieldSchema\[\]/)
    assert.match(source, /keyword/)
    assert.match(source, /status/)
    assert.match(source, /city/)
    assert.match(source, /storeType/)
    assert.match(source, /openingDate/)
    assert.match(source, /const initialStores: StoreRecord\[\]/)
    assert.match(source, /rowSelection|row-selection/)
    assert.match(source, /selectedRowKeys/)
    assert.match(source, /changeStatusForSelected/)
    assert.match(source, /openBatchConfirm/)
    assert.match(source, /Modal\.warning/)
    assert.match(source, /确认后将立即更新/)
    assert.match(source, /visibleColumnKeys/)
    assert.match(source, /downloadCsv/)
    assert.match(source, /viewMode/)
    assert.match(source, /createStore/)
    assert.match(source, /const pageSize = 10/)
    assert.match(source, /fixed:\s*'left'/)
    assert.match(source, /sb-filter-list-page__row-actions/)
    assert.match(source, /size=\{4\}|:size="4"/)
    assert.match(source, /Select/)
    assert.match(source, /aria-label="页面状态"/)
    assert.doesNotMatch(source, /Radio\.Group|RadioGroup/)
    assert.doesNotMatch(source, /<span>页面状态<\/span>/)
    assert.match(source, /Button/)
    assert.match(source, /onOperation|@operation/)
    assert.match(source, /onExport|@export/)
    assert.match(source, /onColumnSettings|@column-settings/)
    assert.match(source, /onRefresh|@refresh/)
    assert.match(source, /operationActions|operation-actions/)
    assert.match(source, /moreActions|more-actions/)
    assert.match(source, /tableTools|table-tools/)
    assert.doesNotMatch(source, /sb-filter-list-page__toolbar-(?:left|right)/)
    assert.doesNotMatch(source, /<button[\s>]/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
  }
})

test('detail and form demos share the desktop surface height rule', async () => {
  const demoFiles = [
    'basic-detail.tsx',
    'basic-detail.vue',
    'card-detail.tsx',
    'card-detail.vue',
    'data-detail.tsx',
    'data-detail.vue',
    'secondary-detail.tsx',
    'secondary-detail.vue',
    'basic-form.tsx',
    'basic-form.vue',
    'grouped-form.tsx',
    'grouped-form.vue',
    'step-form.tsx',
    'step-form.vue',
  ]
  const [sources, styles] = await Promise.all([
    Promise.all(demoFiles.map((file) => readFile(new URL(file, demosDir), 'utf8'))),
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
  ])

  for (const source of sources) {
    assert.match(source, /sb-template-page-surface/)
  }
  assert.match(styles, /\.sb-template-page-surface\s*\{[\s\S]*?min-height:\s*0;/)
  assert.match(styles, /@media \(min-width: 1024px\)[\s\S]*?\.sb-template-page-surface\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 96px\);/)
  assert.doesNotMatch(styles, /\.sb-basic-list-page\s*\{[\s\S]*?min-height:\s*calc\(100dvh/)
})
