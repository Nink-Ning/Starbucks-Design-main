import { TableToolbar } from '@sbux/starbucks-design-react'
import type { TableToolbarQuickFilter } from '@sbux/starbucks-design-react'
import './table-toolbar.css'

const filters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '请输入内容' }]

export default function TableToolbarStatesDemo() {
  return (
    <div className="sb-table-toolbar-demo sb-table-toolbar-demo--states">
      <div className="sb-table-toolbar-demo__state">
        <div className="sb-table-toolbar-demo__state-title">Normal</div>
        <TableToolbar quickFilters={filters} tableTools={{ export: true, columnSettings: true, refresh: true }} />
      </div>
      <div className="sb-table-toolbar-demo__state">
        <div className="sb-table-toolbar-demo__state-title">Loading</div>
        <TableToolbar
          quickFilters={filters}
          tableTools={{ export: true, columnSettings: true, refresh: { loading: true } }}
        />
      </div>
      <div className="sb-table-toolbar-demo__state">
        <div className="sb-table-toolbar-demo__state-title">Disabled</div>
        <TableToolbar
          disabled
          quickFilters={filters}
          tableTools={{ export: true, columnSettings: true, refresh: true }}
        />
      </div>
    </div>
  )
}
