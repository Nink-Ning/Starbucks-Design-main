import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const demoUrl = new URL('../../demos/integration/product-crud/', import.meta.url)
const routeUrl = new URL('../../pages/integration-demos/product-crud.astro', import.meta.url)

const [demo, styles, route] = await Promise.all([
  readFile(new URL('ProductCrudDemo.tsx', demoUrl), 'utf8'),
  readFile(new URL('product-crud.css', demoUrl), 'utf8'),
  readFile(routeUrl, 'utf8'),
])

test('isolated route mounts the React integration demo without Starter dependencies', () => {
  assert.match(route, /<ProductCrudDemo client:only="react" \/>/)
  assert.match(route, /<meta name="viewport"/)
  assert.doesNotMatch(route + demo + styles, /distribution\/designkit-starter-v1|starter-v1-r1|Golden Example/)
})

test('demo composes approved Docs Full list, form, detail, navigation, and feedback capabilities', () => {
  for (const capability of [
    'Layout',
    'Menu',
    'Drawer',
    'Breadcrumb',
    'TableToolbar',
    'Table',
    'Pagination',
    'Form',
    'Modal',
    'Message',
    'PageHeader',
    'FormPageLayout',
    'DetailPageLayout',
    'DetailDescriptions',
  ]) {
    assert.match(demo, new RegExp(`\\b${capability}\\b`))
  }
  assert.doesNotMatch(demo, /BasicListPage|BasicFormPage|BasicDetailPage/)
})

test('demo owns deterministic mock data and complete local CRUD behavior', () => {
  assert.equal((demo.match(/id: 'prd-\d{3}'/g) || []).length, 18)
  assert.match(demo, /const openCreate = \(\) =>/)
  assert.match(demo, /const openEdit = \(product: Product\) =>/)
  assert.match(demo, /const openDetail = \(product: Product\) =>/)
  assert.match(demo, /const saveProduct = async \(values: ProductFormValues\) =>/)
  assert.match(demo, /const confirmDelete = \(product: Product\) =>/)
  assert.match(demo, /setProducts\(\(current\) => \[nextProduct, \.\.\.current\]\)/)
  assert.match(demo, /current\.filter\(\(product\) => !ids\.includes\(product\.id\)\)/)
})

test('search, filters, pagination, selection, batch actions, and UI states are explicit', () => {
  assert.match(demo, /type: 'search', name: 'keyword'/)
  assert.match(demo, /type: 'select', name: 'category'/)
  assert.match(demo, /type: 'select', name: 'status'/)
  assert.match(demo, /selectedRowKeys/)
  assert.match(demo, /checkAll: true/)
  assert.match(demo, /checkboxProps: \(product\) => \(\{ 'aria-label': `Select \$\{product\.name\}` \}\)/)
  assert.match(demo, /operationActions=\{batchActions\}/)
  assert.match(demo, /moreActions=\{batchMoreActions\}/)
  assert.match(demo, /<Pagination/)
  for (const state of ['normal', 'loading', 'empty', 'error']) {
    assert.match(demo, new RegExp(`value: '${state}'`))
  }
  assert.match(demo, /onClick=\{\(\) => setPreviewState\('normal'\)\}>Retry/)
})

test('root list uses shell context while child workflows retain meaningful Breadcrumbs', () => {
  assert.match(demo, /Candidate Page Composition Contract/)
  assert.match(demo, /view !== 'list' && <div className="sb-product-crud__breadcrumb-row">\{renderBreadcrumb\(\)\}<\/div>/)
  assert.doesNotMatch(demo, /Local deterministic mock data|Local mock data only/)
  assert.doesNotMatch(demo, /sb-product-crud__table-summary/)
  assert.match(demo, /Product Management information/)
  assert.match(demo, /Back to Product Management/)
  assert.match(demo, /<Breadcrumb\.Item>Product Management<\/Breadcrumb\.Item>/)
  assert.doesNotMatch(demo, /<Breadcrumb\.Item><IconHome \/> Home<\/Breadcrumb\.Item>/)
})

test('list composition and Demo surfaces follow the confirmed spacing and language boundaries', () => {
  assert.match(demo, /aria-label="Product data"/)
  assert.match(demo, /showTotal=\{\(total\) => `\$\{total\} items`\}/)
  assert.match(demo, /more: 'More'/)
  assert.match(demo, /export: 'Export'/)
  assert.match(demo, /refresh: 'Refresh'/)
  assert.match(demo, /sbux-table-row-actions/)
  assert.match(styles, /\.sb-product-crud__table-card\s*\{[^}]*padding: var\(--spacing-2\) var\(--spacing-6\) 0/s)
  assert.match(styles, /\.sb-product-crud__form-card\s*\{[^}]*padding: var\(--spacing-8\) var\(--spacing-6\) var\(--spacing-6\)/s)
  assert.match(styles, /\.sb-product-crud__detail-card\s*\{[^}]*padding: var\(--spacing-8\) var\(--spacing-10\) var\(--spacing-10\)/s)
})

test('create and edit stay in the Basic Form template family', () => {
  assert.equal((demo.match(/<FormGrid>/g) || []).length, 1)
  assert.doesNotMatch(demo, /FormSection/)
  assert.match(demo, /<FormPageLayout maxWidth=\{1040\} padding=\{0\}>/)
  assert.match(demo, /<FormActions align="right">/)
  assert.match(demo, /view === 'edit' \? 'Edit Product' : 'Create Product'/)
})

test('delete is a danger confirmation with both Cancel and Delete actions', () => {
  assert.equal((demo.match(/Modal\.confirm\(\{/g) || []).length, 2)
  assert.equal((demo.match(/okText: 'Delete'/g) || []).length, 2)
  assert.equal((demo.match(/cancelText: 'Cancel'/g) || []).length, 2)
  assert.equal((demo.match(/okButtonProps: \{ status: 'danger' \}/g) || []).length, 2)
})

test('navigation, theme, responsive breakpoints, focus, and overflow contracts are present', () => {
  assert.match(demo, /aria-label="Application top navigation"/)
  assert.match(demo, /aria-label="Quick navigation"/)
  assert.match(demo, /aria-label="Open navigation"/)
  assert.match(demo, /body\.setAttribute\('arco-theme', 'dark'\)/)
  assert.match(demo, /body\.setAttribute\('data-arco-theme', 'dark'\)/)
  assert.match(styles, /overflow-x: hidden/)
  assert.match(styles, /\.sb-product-crud__topbar\s*\{[^}]*background: var\(--color-primary\)/s)
  assert.match(styles, /\.sb-product-crud__table-scroll\s*\{[^}]*min-height: 400px/s)
  assert.match(styles, /@media \(max-width: 899px\)/)
  assert.match(styles, /@media \(max-width: 600px\)/)
  assert.match(styles, /:focus-visible/)
  assert.match(demo, /sb-top-nav-demo--brand/)
  assert.match(demo, /mode="horizontal"/)
  assert.match(demo, /hasCollapseButton={!mobile}/)
  assert.match(demo, /width=\{260\}/)
  assert.match(demo, /collapsedWidth=\{64\}/)
  assert.match(demo, /<Menu\.ItemGroup key="catalog" title="Catalog">/)
  assert.match(demo, /<Menu\.ItemGroup key="operations" title="Operations">/)
  assert.match(styles, /--sb-product-crud-topbar-height: 54px/)
  assert.doesNotMatch(styles, /sb-product-crud__quick-nav button/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(styles, /!important/)
})
