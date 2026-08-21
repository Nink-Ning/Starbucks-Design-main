export interface ToolbarStoreRecord {
  id: string
  code: string
  name: string
  status: 'open' | 'closed'
  openedAt: string
}

export const toolbarStores: ToolbarStoreRecord[] = [
  { id: '1', code: 'SH-001', name: '上海烘焙工坊', status: 'open', openedAt: '2026-08-02' },
  { id: '2', code: 'BJ-018', name: '北京三里屯店', status: 'open', openedAt: '2026-08-08' },
  { id: '3', code: 'SZ-026', name: '深圳万象天地店', status: 'closed', openedAt: '2026-08-16' }
]

export const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '启用', value: 'open' },
  { label: '停用', value: 'closed' }
]

export const toolbarColumns = [
  { title: '门店编号', dataIndex: 'code', width: 140 },
  { title: '门店名称', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', width: 120 },
  { title: '开业日期', dataIndex: 'openedAt', width: 160 }
]

export const filterToolbarStores = (values: Record<string, unknown>) => {
  const status = typeof values.status === 'string' ? values.status : 'all'
  const keyword = typeof values.keyword === 'string' ? values.keyword.toLowerCase() : ''

  return toolbarStores.filter(
    (record) =>
      (status === 'all' || record.status === status) &&
      (!keyword || `${record.code}${record.name}`.toLowerCase().includes(keyword))
  )
}
