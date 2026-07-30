import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const docsDir = new URL('../../content/docs/templates/', import.meta.url)
const demosDir = new URL('../../demos/template-pages/', import.meta.url)

const pages = [
  ['data-list/basic-list.mdx', 'template-pages/basic-list'],
  ['data-list/tag-list.mdx', 'template-pages/tag-list'],
]

const placeholderPages = [
  ['data-list/card-list.mdx', '卡片列表'],
  ['data-list/filter-list.mdx', '筛选列表'],
  ['data-list/tree-filter-list.mdx', '树状筛选列表'],
  ['form/basic-form.mdx', '基础表单'],
  ['form/step-form.mdx', '分步表单'],
  ['detail/basic-detail.mdx', '基础详情页'],
  ['detail/card-detail.mdx', '卡片详情页'],
  ['detail/data-detail.mdx', '数据详情页'],
  ['detail/secondary-detail.mdx', '二级详情页'],
  ['result/success.mdx', '成功页'],
  ['result/failure.mdx', '失败页'],
  ['result/network-error.mdx', '网络异常'],
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
    assert.doesNotMatch(doc, /内容建设中|API|属性/)
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
})

test('page template docs hide document chrome and use filled content area', async () => {
  const [demoCss, breadcrumb, placeholder] = await Promise.all([
    readFile(new URL('../demo.css', import.meta.url), 'utf8'),
    readFile(new URL('../../components/TemplatePageBreadcrumb.astro', import.meta.url), 'utf8'),
    readFile(new URL('../../components/TemplatePagePlaceholder.astro', import.meta.url), 'utf8'),
  ])

  assert.match(breadcrumb, /sb-template-page-breadcrumb/)
  assert.match(breadcrumb, /页面模板/)
  assert.match(breadcrumb, /templates\/data-list\/card-list/)
  assert.match(breadcrumb, /templates\/detail\/basic-detail/)
  assert.match(breadcrumb, /templates\/result\/network-error/)
  assert.match(breadcrumb, /templates\/form\/step-form/)
  assert.match(breadcrumb, /data-template-action-host="basic-list"/)
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
  assert.match(demoCss, /\.sb-demo\[data-demo\^='template-pages\/'\] > \.sb-demo-code\s*\{[\s\S]*?display:\s*none;/)
  assert.match(demoCss, /\.sb-demo\[data-demo='template-pages\/basic-list'\]\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.match(demoCss, /\.sb-demo\[data-demo='template-pages\/basic-list'\] > \.sb-demo-preview\s*\{[\s\S]*?background:\s*var\(--bg-color-page\);/)
  assert.doesNotMatch(demoCss, /\.sb-basic-list-page\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 48px\);/)
  assert.match(demoCss, /\.sb-basic-list-page\s*\{[\s\S]*?gap:\s*12px;/)
  assert.match(demoCss, /\.sb-basic-list-page__module\s*\{[\s\S]*?overflow:\s*hidden;[\s\S]*?border-radius:\s*6px;/)
  assert.match(demoCss, /\.sb-basic-list-page__toolbar\s*\{[\s\S]*?justify-content:\s*space-between;/)
  assert.match(demoCss, /\.sb-basic-list-page__toolbar-left \.arco-btn-disabled,[\s\S]*?\.sb-basic-list-page__toolbar-left \.arco-v-btn-disabled\s*\{[\s\S]*?color:\s*var\(--color-text-disabled\);[\s\S]*?background-color:\s*var\(--bg-color-component-disabled\);/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions \.arco-btn,[\s\S]*?\.sb-basic-list-page__row-actions \.arco-v-btn\s*\{[\s\S]*?padding-inline:\s*var\(--spacing-1\);/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions\s*\{[\s\S]*?gap:\s*4px;/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions \.arco-btn-text:not\(\.arco-btn-disabled\),[\s\S]*?\.sb-basic-list-page__row-actions \.arco-v-btn-text:not\(\.arco-v-btn-disabled\)\s*\{[\s\S]*?color:\s*var\(--color-text-brand\);[\s\S]*?font-size:\s*var\(--fs-14\);/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions \.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):hover,[\s\S]*?background-color:\s*var\(--color-primary-light\);/)
  assert.match(demoCss, /\.sb-basic-list-page__row-actions \.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):active,[\s\S]*?background-color:\s*var\(--color-primary-light-hover\);/)
  assert.match(demoCss, /\.sb-basic-list-page__modal-title\s*\{[\s\S]*?text-align:\s*left;/)
  assert.match(demoCss, /\.sb-template-docs-card\s*\{[\s\S]*?margin-top:\s*12px;[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:\s*6px;/)
  assert.match(demoCss, /\.sl-markdown-content > \.sb-template-docs-card\s*\{[\s\S]*?margin-top:\s*12px;/)
  assert.match(demoCss, /@media \(max-width:\s*860px\)[\s\S]*?\.sb-basic-list-page__toolbar\s*\{[\s\S]*?flex-direction:\s*column;/)
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
    assert.match(source, /客户标签/)
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
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/)
  assert.doesNotMatch(doc, /基础列表用于展示标准数据列表页面的组合方式/)

  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /FilterBar/)
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
    assert.match(source, /okText:\s*'确定'/)
    assert.match(source, /visibleColumnKeys/)
    assert.match(source, /downloadCsv/)
    assert.match(source, /viewMode/)
    assert.match(source, /createStore/)
    assert.match(source, /const pageSize = 8/)
    assert.match(source, /fixed:\s*'left'/)
    assert.match(source, /sb-basic-list-page__row-actions/)
    assert.match(source, /size=\{4\}|:size="4"/)
    assert.match(source, /Button/)
    assert.match(source, /Tooltip/)
    assert.match(source, /aria-label="刷新"/)
    assert.match(source, /aria-label="列设置"/)
    assert.match(source, /aria-label="导出"/)
    assert.doesNotMatch(source, /<button[\s>]/)
    assert.doesNotMatch(source, /sb-basic-list-page__header/)
    assert.doesNotMatch(source, /sb-basic-list-page__feedback/)
    assert.doesNotMatch(source, /PagePreview/)
    assert.doesNotMatch(source, /from '@sbux\/starbucks-design-(?:react|vue)\/business/)
  }

  assert.match(reactDemo, /sb-basic-list-page__modal-title/)
  assert.match(vueDemo, /title-align="start"/)
})
