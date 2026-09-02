import { useState } from 'react'
import { TableToolbar } from '@sbux/starbucks-design-react'
import type { TableToolbarQuickFilter, TableToolbarQuickFilterValues } from '@sbux/starbucks-design-react'
import './table-toolbar.css'

const statusFirstFilters: TableToolbarQuickFilter[] = [
  {
    type: 'buttonGroup',
    name: 'productStatus',
    options: [
      { label: '全部', value: 'all' },
      { label: '已上架', value: 'listed' },
      { label: '已下架', value: 'unlisted' }
    ],
    placement: 'start',
    width: 234
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容', width: 250 }
]

const timeFirstFilters: TableToolbarQuickFilter[] = [
  {
    type: 'buttonGroup',
    name: 'timePreset',
    options: [
      { label: '近30天', value: '30d' },
      { label: '近90天', value: '90d' },
      { label: '近1年', value: '1y' },
      { label: '近3年', value: '3y' }
    ],
    placement: 'start',
    width: 312
  },
  { type: 'search', name: 'keyword', placeholder: '请输入内容', width: 250 }
]

export default function TableToolbarQuickFiltersDemo() {
  const [statusValues, setStatusValues] = useState<TableToolbarQuickFilterValues>({ productStatus: 'all' })
  const [timeValues, setTimeValues] = useState<TableToolbarQuickFilterValues>({ timePreset: '30d' })

  return (
    <div className="sb-table-toolbar-demo">
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">商品状态快捷筛选前置</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            quickFilters={statusFirstFilters}
            quickFilterValues={statusValues}
            tableTools={{ export: true, columnSettings: true, refresh: true }}
            onQuickFilterChange={setStatusValues}
          />
        </div>
      </div>
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">时间快捷筛选</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            quickFilters={timeFirstFilters}
            quickFilterValues={timeValues}
            tableTools={{ export: true, columnSettings: true, refresh: true }}
            onQuickFilterChange={setTimeValues}
          />
        </div>
      </div>
    </div>
  )
}
