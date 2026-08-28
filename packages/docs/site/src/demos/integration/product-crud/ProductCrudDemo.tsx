import { useEffect, useMemo, useState } from 'react'
import enUS from '@arco-design/web-react/es/locale/en-US'
import {
  Avatar,
  Breadcrumb,
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Message,
  Modal,
  Pagination,
  Radio,
  Result,
  Select,
  Space,
  Table,
  TableToolbar,
  Tag,
} from '@sbux/starbucks-design-react'
import type {
  TableColumnProps,
  TableToolbarAction,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterValues,
} from '@sbux/starbucks-design-react'
import {
  IconCheckCircle,
  IconCopy,
  IconDashboard,
  IconDelete,
  IconEdit,
  IconList,
  IconMenu,
  IconMoon,
  IconMore,
  IconNotification,
  IconPlus,
  IconQuestionCircle,
  IconSettings,
  IconStorage,
  IconSun,
  IconUser,
} from '@sbux/starbucks-design-react/icon'
import {
  DetailDescriptions,
  DetailPageHeader,
  DetailPageLayout,
  DetailSection,
  FormActions,
  FormControlArea,
  FormGrid,
  FormGridItem,
  FormPageLayout,
  PageHeader,
} from '@sbux/starbucks-design-react/pro'
import './product-crud.css'
import '../../menu/top-nav-menu.css'

type ProductStatus = 'active' | 'draft' | 'inactive'
type ProductCategory = 'beverage' | 'food' | 'merchandise' | 'equipment'
type PreviewState = 'normal' | 'loading' | 'empty' | 'error'
type ThemeMode = 'light' | 'dark'
type View = 'list' | 'create' | 'edit' | 'detail'

type Product = {
  id: string
  sku: string
  name: string
  category: ProductCategory
  owner: string
  market: string
  status: ProductStatus
  price: number
  inventory: number
  updatedAt: string
  description: string
}

type ProductFormValues = {
  sku: string
  name: string
  category: ProductCategory
  owner: string
  market: string
  status: ProductStatus
  price: number
  inventory: number
  description?: string
}

const initialProducts: Product[] = [
  { id: 'prd-001', sku: 'BEV-1024', name: 'Reserve Cold Brew Concentrate', category: 'beverage', owner: 'Mia Chen', market: 'East China', status: 'active', price: 68, inventory: 842, updatedAt: '2026-08-25 16:42', description: 'Small-batch cold brew concentrate for Reserve stores and premium retail channels.' },
  { id: 'prd-002', sku: 'BEV-1031', name: 'Oat Latte Base', category: 'beverage', owner: 'Noah Wang', market: 'National', status: 'active', price: 42, inventory: 1260, updatedAt: '2026-08-25 14:08', description: 'Barista-ready oat latte base for consistent beverage preparation.' },
  { id: 'prd-003', sku: 'FOD-2208', name: 'Truffle Mushroom Focaccia', category: 'food', owner: 'Ella Zhou', market: 'North China', status: 'draft', price: 39, inventory: 0, updatedAt: '2026-08-25 11:36', description: 'Seasonal warm food item in recipe validation.' },
  { id: 'prd-004', sku: 'MER-4102', name: 'Siren Stainless Tumbler 16oz', category: 'merchandise', owner: 'Leo Zhang', market: 'National', status: 'active', price: 219, inventory: 418, updatedAt: '2026-08-24 18:20', description: 'Reusable stainless tumbler with engraved Siren detail.' },
  { id: 'prd-005', sku: 'EQP-5107', name: 'Digital Pour-over Scale', category: 'equipment', owner: 'Ava Liu', market: 'Reserve Stores', status: 'inactive', price: 499, inventory: 76, updatedAt: '2026-08-24 15:12', description: 'Precision brewing scale for Reserve store manual brew stations.' },
  { id: 'prd-006', sku: 'FOD-2234', name: 'Matcha Red Bean Roll', category: 'food', owner: 'Ivy Sun', market: 'East China', status: 'active', price: 32, inventory: 356, updatedAt: '2026-08-24 10:54', description: 'Soft roll cake combining matcha sponge and red bean cream.' },
  { id: 'prd-007', sku: 'BEV-1078', name: 'Yuzu Sparkling Espresso', category: 'beverage', owner: 'Ryan Gu', market: 'South China', status: 'draft', price: 46, inventory: 0, updatedAt: '2026-08-23 17:30', description: 'Seasonal espresso beverage with yuzu and sparkling water.' },
  { id: 'prd-008', sku: 'MER-4160', name: 'City Collection Shanghai Mug', category: 'merchandise', owner: 'Sophie Hu', market: 'Shanghai', status: 'active', price: 159, inventory: 628, updatedAt: '2026-08-23 13:05', description: 'Shanghai city collection ceramic mug for tourism locations.' },
  { id: 'prd-009', sku: 'EQP-5189', name: 'Compact Cold Foam Blender', category: 'equipment', owner: 'Daniel Li', market: 'National', status: 'active', price: 1380, inventory: 94, updatedAt: '2026-08-22 19:48', description: 'Compact commercial blender for cold foam preparation.' },
  { id: 'prd-010', sku: 'FOD-2291', name: 'Almond Butter Overnight Oats', category: 'food', owner: 'Nina Xu', market: 'Tier 1 Cities', status: 'inactive', price: 36, inventory: 112, updatedAt: '2026-08-22 15:16', description: 'Chilled breakfast oats with almond butter and fruit topping.' },
  { id: 'prd-011', sku: 'BEV-1112', name: 'Single-Origin Ethiopia Beans', category: 'beverage', owner: 'Chris Wu', market: 'Reserve Stores', status: 'active', price: 168, inventory: 286, updatedAt: '2026-08-22 09:40', description: 'Whole bean coffee with floral aroma and citrus acidity.' },
  { id: 'prd-012', sku: 'MER-4217', name: 'Recycled Canvas Coffee Tote', category: 'merchandise', owner: 'Grace Lin', market: 'National', status: 'active', price: 99, inventory: 910, updatedAt: '2026-08-21 16:02', description: 'Daily tote made with recycled canvas and reinforced handles.' },
  { id: 'prd-013', sku: 'FOD-2310', name: 'Black Sesame Basque Cheesecake', category: 'food', owner: 'Tina Ma', market: 'East China', status: 'draft', price: 45, inventory: 0, updatedAt: '2026-08-21 11:27', description: 'Basque-style cheesecake with roasted black sesame.' },
  { id: 'prd-014', sku: 'BEV-1156', name: 'Peach Oolong Cold Tea', category: 'beverage', owner: 'Eric Qian', market: 'South China', status: 'active', price: 41, inventory: 738, updatedAt: '2026-08-20 18:33', description: 'Cold tea blend with white peach and oolong notes.' },
  { id: 'prd-015', sku: 'EQP-5236', name: 'Store Bean Display Canister', category: 'equipment', owner: 'Jade Yang', market: 'National', status: 'inactive', price: 320, inventory: 58, updatedAt: '2026-08-20 13:14', description: 'Airtight counter display canister for whole bean products.' },
  { id: 'prd-016', sku: 'MER-4255', name: 'Holiday Gradient Bottle 20oz', category: 'merchandise', owner: 'Ben Zhao', market: 'National', status: 'draft', price: 189, inventory: 0, updatedAt: '2026-08-19 17:58', description: 'Holiday bottle with gradient finish and locking lid.' },
  { id: 'prd-017', sku: 'FOD-2358', name: 'Smoked Chicken Ciabatta', category: 'food', owner: 'Olivia Feng', market: 'North China', status: 'active', price: 42, inventory: 264, updatedAt: '2026-08-19 10:46', description: 'Warm ciabatta sandwich with smoked chicken and vegetables.' },
  { id: 'prd-018', sku: 'BEV-1190', name: 'Brown Sugar Shaken Espresso', category: 'beverage', owner: 'Lucas Gao', market: 'National', status: 'active', price: 43, inventory: 1054, updatedAt: '2026-08-18 16:25', description: 'Shaken espresso with brown sugar syrup and oat milk.' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Inactive', value: 'inactive' },
]

const categoryOptions = [
  { label: 'Beverage', value: 'beverage' },
  { label: 'Food', value: 'food' },
  { label: 'Merchandise', value: 'merchandise' },
  { label: 'Equipment', value: 'equipment' },
]

const marketOptions = [
  { label: 'National', value: 'National' },
  { label: 'East China', value: 'East China' },
  { label: 'North China', value: 'North China' },
  { label: 'South China', value: 'South China' },
  { label: 'Reserve Stores', value: 'Reserve Stores' },
  { label: 'Tier 1 Cities', value: 'Tier 1 Cities' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const quickFilters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', placeholder: 'All statuses', options: statusOptions, width: 150 },
  { type: 'select', name: 'category', placeholder: 'All categories', options: categoryOptions, width: 170 },
  { type: 'search', name: 'keyword', placeholder: 'Search name or SKU', width: 250 },
]

const batchActions: TableToolbarAction[] = [
  { key: 'activate', label: 'Activate', icon: <IconCheckCircle />, requiresSelection: true },
  { key: 'deactivate', label: 'Deactivate', requiresSelection: true },
]

const batchMoreActions: TableToolbarAction[] = [
  { key: 'delete', label: 'Delete', icon: <IconDelete />, status: 'danger', requiresSelection: true },
]

const pageSize = 8

function statusLabel(status: ProductStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status
}

function categoryLabel(category: ProductCategory) {
  return categoryOptions.find((option) => option.value === category)?.label ?? category
}

function statusTag(status: ProductStatus) {
  if (status === 'active') return <Tag color="green">Active</Tag>
  if (status === 'draft') return <Tag color="arcoblue">Draft</Tag>
  return <Tag color="gray">Inactive</Tag>
}

function currentTimestamp() {
  return '2026-08-26 10:30'
}

export default function ProductCrudDemo() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [view, setView] = useState<View>('list')
  const [activeProductId, setActiveProductId] = useState(initialProducts[0].id)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [filterValues, setFilterValues] = useState<TableToolbarQuickFilterValues>({ keyword: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [previewState, setPreviewState] = useState<PreviewState>('normal')
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  const [siderCollapsed, setSiderCollapsed] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm<ProductFormValues>()

  useEffect(() => {
    if (view === 'list') {
      const helpIcon = document.querySelector<SVGElement>('.sb-product-crud__root-page-header .sbux-pro-page-header-help')
      helpIcon?.setAttribute('aria-label', 'Product Management information')
      helpIcon?.setAttribute('role', 'img')
      helpIcon?.setAttribute('tabindex', '0')
    }
    if (view === 'detail') {
      document.querySelector<HTMLButtonElement>('.sbux-pro-detail-page-header-back')?.setAttribute('aria-label', 'Back to Product Management')
    }
  }, [view])

  const activeProduct = products.find((product) => product.id === activeProductId) ?? products[0]
  const filteredProducts = useMemo(() => {
    if (previewState === 'empty') return []
    const keyword = String(filterValues.keyword ?? '').trim().toLowerCase()
    const category = filterValues.category as ProductCategory | undefined
    const status = filterValues.status as ProductStatus | undefined
    return products.filter((product) => {
      const matchesKeyword = !keyword || product.name.toLowerCase().includes(keyword) || product.sku.toLowerCase().includes(keyword)
      const matchesCategory = !category || product.category === category
      const matchesStatus = !status || product.status === status
      return matchesKeyword && matchesCategory && matchesStatus
    })
  }, [filterValues, previewState, products])
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pageProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize)
  const isLoading = previewState === 'loading' || refreshing

  const applyTheme = (nextTheme: ThemeMode) => {
    setTheme(nextTheme)
    if (nextTheme === 'dark') {
      document.body.setAttribute('arco-theme', 'dark')
      document.body.setAttribute('data-arco-theme', 'dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.body.removeAttribute('arco-theme')
      document.body.removeAttribute('data-arco-theme')
      document.documentElement.style.colorScheme = 'light'
    }
  }

  const goToList = () => {
    setView('list')
    setEditingProductId(null)
    form.resetFields()
  }

  const openCreate = () => {
    setEditingProductId(null)
    form.resetFields()
    form.setFieldsValue({
      category: 'beverage',
      market: 'National',
      status: 'draft',
      price: 0,
      inventory: 0,
    })
    setView('create')
  }

  const openEdit = (product: Product) => {
    setEditingProductId(product.id)
    form.setFieldsValue({
      sku: product.sku,
      name: product.name,
      category: product.category,
      owner: product.owner,
      market: product.market,
      status: product.status,
      price: product.price,
      inventory: product.inventory,
      description: product.description,
    })
    setView('edit')
  }

  const openDetail = (product: Product) => {
    setActiveProductId(product.id)
    setView('detail')
  }

  const saveProduct = async (values: ProductFormValues) => {
    if (submitting) return
    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 450))
    if (editingProductId) {
      setProducts((current) => current.map((product) => product.id === editingProductId
        ? { ...product, ...values, description: values.description ?? '', updatedAt: currentTimestamp() }
        : product))
      Message.success('Product updated successfully')
    } else {
      const nextNumber = products.length + 1
      const nextProduct: Product = {
        id: `prd-${String(nextNumber).padStart(3, '0')}-${Date.now()}`,
        ...values,
        description: values.description ?? '',
        updatedAt: currentTimestamp(),
      }
      setProducts((current) => [nextProduct, ...current])
      setCurrentPage(1)
      Message.success('Product created successfully')
    }
    setSubmitting(false)
    goToList()
  }

  const deleteProducts = (ids: string[]) => {
    setProducts((current) => current.filter((product) => !ids.includes(product.id)))
    setSelectedRowKeys([])
    if (ids.includes(activeProductId)) setActiveProductId(products.find((product) => !ids.includes(product.id))?.id ?? '')
    setView('list')
    Message.success(ids.length === 1 ? 'Product deleted' : `${ids.length} products deleted`)
  }

  const confirmDelete = (product: Product) => {
    Modal.confirm({
      title: 'Delete product?',
      content: `Delete “${product.name}”? This local demo action cannot be undone.`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { status: 'danger' },
      onOk: () => deleteProducts([product.id]),
    })
  }

  const confirmBatchDelete = () => {
    if (selectedRowKeys.length === 0) return
    Modal.confirm({
      title: 'Delete selected products?',
      content: `Delete ${selectedRowKeys.length} selected products? This local demo action cannot be undone.`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { status: 'danger' },
      onOk: () => deleteProducts(selectedRowKeys),
    })
  }

  const updateSelectedStatus = (status: ProductStatus) => {
    if (selectedRowKeys.length === 0) return
    setProducts((current) => current.map((product) => selectedRowKeys.includes(product.id)
      ? { ...product, status, updatedAt: currentTimestamp() }
      : product))
    Message.success(`${selectedRowKeys.length} products set to ${statusLabel(status).toLowerCase()}`)
    setSelectedRowKeys([])
  }

  const toggleProductStatus = (product: Product) => {
    const status: ProductStatus = product.status === 'active' ? 'inactive' : 'active'
    setProducts((current) => current.map((item) => item.id === product.id
      ? { ...item, status, updatedAt: currentTimestamp() }
      : item))
    Message.success(`${product.name} is now ${statusLabel(status).toLowerCase()}`)
  }

  const copyProductId = (product: Product) => {
    void navigator.clipboard?.writeText(product.id)
    Message.success('Product ID copied')
  }

  const handleBatchOperation = (key: string) => {
    if (key === 'activate') updateSelectedStatus('active')
    if (key === 'deactivate') updateSelectedStatus('inactive')
    if (key === 'delete') confirmBatchDelete()
  }

  const refreshProducts = () => {
    setRefreshing(true)
    window.setTimeout(() => {
      setRefreshing(false)
      Message.success('Product list refreshed')
    }, 650)
  }

  const rowMenu = (product: Product) => (
    <Menu onClickMenuItem={(key) => {
      if (key === 'copy') copyProductId(product)
      if (key === 'status') toggleProductStatus(product)
      if (key === 'delete') confirmDelete(product)
    }}>
      <Menu.Item key="copy"><IconCopy /> Copy product ID</Menu.Item>
      <Menu.Item key="status">{product.status === 'active' ? 'Deactivate' : 'Activate'}</Menu.Item>
      <Menu.Item key="delete"><IconDelete /> Delete</Menu.Item>
    </Menu>
  )

  const columns: TableColumnProps<Product>[] = [
    { title: 'SKU', dataIndex: 'sku', width: 124, fixed: 'left' },
    {
      title: 'Product',
      dataIndex: 'name',
      width: 250,
      fixed: 'left',
      render: (_, product) => (
        <button className="sb-product-crud__product-link" type="button" onClick={() => openDetail(product)}>
          {product.name}
        </button>
      ),
    },
    { title: 'Category', dataIndex: 'category', width: 140, render: (value: ProductCategory) => categoryLabel(value) },
    { title: 'Market', dataIndex: 'market', width: 150 },
    { title: 'Owner', dataIndex: 'owner', width: 140 },
    { title: 'Status', dataIndex: 'status', width: 110, render: (value: ProductStatus) => statusTag(value) },
    { title: 'Price', dataIndex: 'price', width: 100, align: 'right', render: (value: number) => `¥${value.toFixed(2)}` },
    { title: 'Inventory', dataIndex: 'inventory', width: 110, align: 'right' },
    { title: 'Updated', dataIndex: 'updatedAt', width: 174 },
    {
      title: 'Actions',
      width: 180,
      fixed: 'right',
      render: (_, product) => (
        <Space className="sb-product-crud__row-actions sbux-table-row-actions" size={4}>
          <Button size="mini" type="text" onClick={() => openDetail(product)}>View</Button>
          <Button size="mini" type="text" onClick={() => openEdit(product)}>Edit</Button>
          <Dropdown droplist={rowMenu(product)} trigger="click" position="br">
            <Button size="mini" type="text" shape="square" icon={<IconMore />} aria-label={`${product.name} more actions`} />
          </Dropdown>
        </Space>
      ),
    },
  ]

  const sideMenu = (mobile = false) => (
    <Menu
      className="sb-product-crud__side-menu"
      selectedKeys={['products']}
      collapse={!mobile && siderCollapsed}
      hasCollapseButton={!mobile}
      defaultOpenKeys={['catalog', 'operations']}
      onCollapseChange={!mobile ? setSiderCollapsed : undefined}
      onClickMenuItem={(key) => {
        if (key === 'products') goToList()
        else Message.info(`${String(key)} is outside this focused CRUD demo`)
        setMobileNavVisible(false)
      }}
    >
      <Menu.Item key="dashboard" renderItemInTooltip={() => 'Dashboard'}><IconDashboard /> <span>Dashboard</span></Menu.Item>
      <Menu.ItemGroup key="catalog" title="Catalog">
        <Menu.Item key="products" renderItemInTooltip={() => 'Product Management'}><IconList /> <span>Product Management</span></Menu.Item>
        <Menu.Item key="inventory" renderItemInTooltip={() => 'Inventory'}><IconStorage /> <span>Inventory</span></Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="operations" title="Operations">
        <Menu.Item key="workflows" renderItemInTooltip={() => 'Workflows'}><IconCheckCircle /> <span>Workflows</span></Menu.Item>
      </Menu.ItemGroup>
      <Menu.Item key="settings" renderItemInTooltip={() => 'Settings'}><IconSettings /> <span>Settings</span></Menu.Item>
    </Menu>
  )

  const renderBreadcrumb = () => {
    const label = view === 'create' ? 'Create Product' : view === 'edit' ? 'Edit Product' : view === 'detail' ? 'Product Detail' : 'Product Management'
    return (
      <Breadcrumb>
        <Breadcrumb.Item>Product Management</Breadcrumb.Item>
        <Breadcrumb.Item>{label}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  const renderList = () => (
    <>
      <PageHeader
        className="sb-product-crud__root-page-header"
        title="Product Management"
        helpText="Manage the complete local product lifecycle in this integration demo."
        extra={
          <div className="sb-product-crud__page-actions">
            <Select
              aria-label="Preview state"
              value={previewState}
              options={[
                { label: 'Normal state', value: 'normal' },
                { label: 'Loading state', value: 'loading' },
                { label: 'Empty state', value: 'empty' },
                { label: 'Error state', value: 'error' },
              ]}
              onChange={(value) => {
                setPreviewState(value as PreviewState)
                setSelectedRowKeys([])
                setCurrentPage(1)
              }}
            />
            <Button type="primary" icon={<IconPlus />} onClick={openCreate}>Create Product</Button>
          </div>
        }
      />
      <section className="sb-product-crud__table-card" aria-label="Product data">
        <TableToolbar
          ariaLabel="Product list toolbar"
          quickFilters={quickFilters}
          quickFilterValues={filterValues}
          selectedCount={selectedRowKeys.length}
          operationActions={batchActions}
          moreActions={batchMoreActions}
          texts={{
            selected: (count) => `${count} selected`,
            more: 'More',
            batchActions: 'Batch actions',
            export: 'Export',
            columnSettings: 'Column settings',
            refresh: 'Refresh',
            selectionRequired: 'Select at least one product',
            ariaLabel: 'Product list toolbar',
          }}
          tableTools={{ export: true, refresh: { loading: refreshing } }}
          disabled={previewState === 'error'}
          onQuickFilterChange={(values) => {
            setFilterValues(values)
            setSelectedRowKeys([])
            setCurrentPage(1)
          }}
          onOperation={handleBatchOperation}
          onExport={() => Message.info(`Export prepared for ${filteredProducts.length} products`)}
          onRefresh={refreshProducts}
        />

        {previewState === 'error' ? (
          <div className="sb-product-crud__state-panel">
            <Result
              status="error"
              title="Product data could not be loaded"
              subTitle="The simulated request failed. Retry to restore the normal list state."
              extra={<Button type="primary" onClick={() => setPreviewState('normal')}>Retry</Button>}
            />
          </div>
        ) : (
          <>
            <div className="sb-product-crud__table-scroll">
              <Table
                rowKey="id"
                columns={columns}
                data={pageProducts}
                pagination={false}
                loading={isLoading}
                scroll={{ x: 1494 }}
                noDataElement={<Empty description="No products match the current view" />}
                rowSelection={{
                  type: 'checkbox',
                  checkAll: true,
                  columnTitle: <span className="sb-product-crud__sr-only">Select products</span>,
                  checkboxProps: (product) => ({ 'aria-label': `Select ${product.name}` }),
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys.map(String)),
                }}
              />
            </div>
            <div className="sb-product-crud__pagination">
              <Pagination
                current={safePage}
                pageSize={pageSize}
                total={filteredProducts.length}
                showTotal={(total) => `${total} items`}
                sizeCanChange={false}
                disabled={isLoading || filteredProducts.length === 0}
                onChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </section>
    </>
  )

  const renderForm = () => (
    <>
      <PageHeader
        title={view === 'edit' ? 'Edit Product' : 'Create Product'}
        backable
        onBack={goToList}
        extra={<Button onClick={goToList}>Cancel</Button>}
      />
      <p className="sb-product-crud__page-description">
        {view === 'edit' ? 'Update product ownership, market, commercial, and lifecycle information.' : 'Add a product to the local enterprise catalog.'}
      </p>
      <section className="sb-product-crud__form-card" aria-label={view === 'edit' ? 'Edit product form' : 'Create product form'}>
        <FormPageLayout maxWidth={1040} padding={0}>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            disabled={submitting}
            scrollToFirstError
            onSubmit={saveProduct}
          >
            <FormGrid>
                <FormGridItem>
                  <Form.Item label="Product name" field="name" required rules={[{ required: true, message: 'Enter a product name' }, { minLength: 3, maxLength: 64, message: 'Use 3–64 characters' }]}>
                    <Input maxLength={64} placeholder="Enter product name" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="SKU" field="sku" required rules={[{ required: true, message: 'Enter a SKU' }, { match: /^[A-Z]{3}-\d{4}$/, message: 'Use the format ABC-1234' }]}>
                    <Input maxLength={8} placeholder="ABC-1234" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Category" field="category" required rules={[{ required: true, message: 'Select a category' }]}>
                    <Select options={categoryOptions} placeholder="Select category" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Owner" field="owner" required rules={[{ required: true, message: 'Enter an owner' }]}>
                    <Input placeholder="Enter product owner" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Market" field="market" required rules={[{ required: true, message: 'Select a market' }]}>
                    <Select options={marketOptions} placeholder="Select market" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Lifecycle status" field="status" required rules={[{ required: true, message: 'Select a status' }]}>
                    <FormControlArea>
                      <Radio.Group options={statusOptions} />
                    </FormControlArea>
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Unit price (CNY)" field="price" required rules={[{ required: true, message: 'Enter a unit price' }]}>
                    <InputNumber min={0} precision={2} prefix="¥" placeholder="0.00" style={{ width: '100%' }} />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem>
                  <Form.Item label="Available inventory" field="inventory" required rules={[{ required: true, message: 'Enter inventory' }]}>
                    <InputNumber min={0} precision={0} placeholder="0" style={{ width: '100%' }} />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem span={2}>
                  <Form.Item label="Description" field="description" rules={[{ maxLength: 240, message: 'Use 240 characters or fewer' }]}>
                    <Input.TextArea maxLength={240} showWordLimit autoSize={{ minRows: 4, maxRows: 7 }} placeholder="Describe product scope and operational notes" />
                  </Form.Item>
                </FormGridItem>
                <FormGridItem span={2}>
                  <FormActions align="right">
                    <Button disabled={submitting} onClick={goToList}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                      {view === 'edit' ? 'Save Changes' : 'Create Product'}
                    </Button>
                  </FormActions>
                </FormGridItem>
            </FormGrid>
          </Form>
        </FormPageLayout>
      </section>
    </>
  )

  const renderDetail = () => activeProduct ? (
    <section className="sb-product-crud__detail-card" aria-label="Product detail">
      <DetailPageLayout maxWidth={1120}>
        <DetailPageHeader
          title={activeProduct.name}
          status={statusTag(activeProduct.status)}
          description={activeProduct.description || 'No product description provided.'}
          meta={<><span>{activeProduct.sku}</span><span>Updated {activeProduct.updatedAt}</span></>}
          backable
          onBack={goToList}
          actions={
            <Space wrap>
              <Button icon={<IconCopy />} onClick={() => copyProductId(activeProduct)}>Copy ID</Button>
              <Button status="danger" icon={<IconDelete />} onClick={() => confirmDelete(activeProduct)}>Delete</Button>
              <Button type="primary" icon={<IconEdit />} onClick={() => openEdit(activeProduct)}>Edit Product</Button>
            </Space>
          }
        />
        <DetailSection title="Product information" divider>
          <DetailDescriptions
            border
            emptyValue="—"
            data={[
              { label: 'Product ID', value: activeProduct.id },
              { label: 'SKU', value: activeProduct.sku },
              { label: 'Category', value: categoryLabel(activeProduct.category) },
              { label: 'Market', value: activeProduct.market },
              { label: 'Owner', value: activeProduct.owner },
              { label: 'Status', value: statusLabel(activeProduct.status) },
              { label: 'Unit price', value: `¥${activeProduct.price.toFixed(2)}` },
              { label: 'Available inventory', value: activeProduct.inventory.toLocaleString() },
              { label: 'Last updated', value: activeProduct.updatedAt },
            ]}
          />
        </DetailSection>
        <DetailSection title="Operational notes">
          <p className="sb-product-crud__detail-note">{activeProduct.description || '—'}</p>
        </DetailSection>
      </DetailPageLayout>
    </section>
  ) : null

  return (
    <ConfigProvider locale={enUS}>
      <div className="sb-product-crud" data-theme-mode={theme}>
      <header className="sb-product-crud__topbar sb-top-nav-demo--brand" aria-label="Application top navigation">
        <div className="sb-product-crud__brand-area">
          <Button
            className="sb-product-crud__mobile-trigger"
            type="text"
            shape="square"
            icon={<IconMenu />}
            aria-label="Open navigation"
            onClick={() => setMobileNavVisible(true)}
          />
          <div className="sb-product-crud__brand-mark" aria-hidden="true">DK</div>
          <div className="sb-product-crud__brand-copy">
            <strong>DesignKit Operations</strong>
            <span>Product workspace</span>
          </div>
        </div>

        <Menu
          className="sb-product-crud__quick-nav sb-top-nav-demo__menu"
          mode="horizontal"
          selectedKeys={['products']}
          ellipsis={false}
          aria-label="Quick navigation"
          onClickMenuItem={(key) => {
            if (key === 'products') goToList()
            else Message.info(`${String(key)} are outside this focused CRUD demo`)
          }}
        >
          <Menu.Item key="overview">Overview</Menu.Item>
          <Menu.Item key="products">Product</Menu.Item>
          <Menu.Item key="reports">Reports</Menu.Item>
        </Menu>

        <div className="sb-product-crud__top-actions">
          <Button
            type="text"
            icon={theme === 'light' ? <IconMoon /> : <IconSun />}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            onClick={() => applyTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <span className="sb-product-crud__action-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </Button>
          <Button type="text" shape="square" icon={<IconQuestionCircle />} aria-label="Help" onClick={() => Message.info('Help center opened')} />
          <Button type="text" shape="square" icon={<IconNotification />} aria-label="Notifications" onClick={() => Message.info('No new notifications')} />
          <div className="sb-product-crud__user">
            <Avatar size={30}><IconUser /></Avatar>
            <span>Alex Morgan</span>
          </div>
        </div>
      </header>

      <Layout className="sb-product-crud__shell">
        <Layout.Sider
          className="sb-product-crud__desktop-sider"
          width={260}
          collapsedWidth={64}
          collapsed={siderCollapsed}
        >
          {sideMenu()}
        </Layout.Sider>

        <Layout.Content className="sb-product-crud__content">
          {/* Candidate Page Composition Contract: module root pages rely on shell context; deeper workflows keep Breadcrumb. */}
          {view !== 'list' && <div className="sb-product-crud__breadcrumb-row">{renderBreadcrumb()}</div>}
          <main className="sb-product-crud__main" id="main-content">
            {view === 'list' && renderList()}
            {(view === 'create' || view === 'edit') && renderForm()}
            {view === 'detail' && renderDetail()}
          </main>
        </Layout.Content>
      </Layout>

      <Drawer
        className="sb-product-crud__mobile-drawer"
        title="DesignKit Operations"
        width={280}
        placement="left"
        visible={mobileNavVisible}
        footer={null}
        onCancel={() => setMobileNavVisible(false)}
      >
        {sideMenu(true)}
      </Drawer>
      </div>
    </ConfigProvider>
  )
}
