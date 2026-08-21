import { useState } from 'react'
import { TableToolbar } from '@sbux/starbucks-design-react'
import type { TableToolbarQuickFilter, TableToolbarQuickFilterValues } from '@sbux/starbucks-design-react'
import { statusOptions } from './shared'
import './table-toolbar.css'

const searchOnlyFilters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '请输入内容' }]
const statusOnlyFilters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', placeholder: '全部状态', options: statusOptions }
]
const channelAndSearchFilters: TableToolbarQuickFilter[] = [
  {
    type: 'select',
    name: 'channel',
    placeholder: '全部渠道',
    options: [
      { label: '全部渠道', value: 'all' },
      { label: '堂食', value: 'dine-in' },
      { label: '外送', value: 'delivery' }
    ]
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容' }
]

const tableTools = { export: true, columnSettings: true, refresh: true } as const

export default function ReadOnlyTableToolbarDemo() {
  const [searchValues, setSearchValues] = useState<TableToolbarQuickFilterValues>({})
  const [statusValues, setStatusValues] = useState<TableToolbarQuickFilterValues>({ status: 'all' })
  const [channelValues, setChannelValues] = useState<TableToolbarQuickFilterValues>({ channel: 'all' })

  return (
    <div className="sb-table-toolbar-demo">
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">仅搜索</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            quickFilters={searchOnlyFilters}
            quickFilterValues={searchValues}
            tableTools={tableTools}
            onQuickFilterChange={setSearchValues}
          />
        </div>
      </div>
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">下拉筛选</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            quickFilters={statusOnlyFilters}
            quickFilterValues={statusValues}
            tableTools={tableTools}
            onQuickFilterChange={setStatusValues}
          />
        </div>
      </div>
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">下拉筛选与搜索</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            quickFilters={channelAndSearchFilters}
            quickFilterValues={channelValues}
            tableTools={tableTools}
            onQuickFilterChange={setChannelValues}
          />
        </div>
      </div>
    </div>
  )
}
