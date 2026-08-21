import { useMemo, useState } from 'react'
import { Message, Table, TableToolbar } from '@sbux/starbucks-design-react'
import type { TableToolbarQuickFilter, TableToolbarQuickFilterValues } from '@sbux/starbucks-design-react'
import { IconArchive, IconCheckCircle, IconDelete, IconMinusCircle, IconSwap } from '@sbux/starbucks-design-react/icon'
import { filterToolbarStores, statusOptions, toolbarColumns } from './shared'
import './table-toolbar.css'

const quickFilters: TableToolbarQuickFilter[] = [
  { type: 'select', name: 'status', placeholder: '全部状态', options: statusOptions },
  { type: 'search', name: 'keyword', placeholder: '请输入内容' }
]

export default function BasicTableToolbarDemo() {
  const [values, setValues] = useState<TableToolbarQuickFilterValues>({ status: 'all' })
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const visibleRows = useMemo(() => filterToolbarStores(values), [values])

  return (
    <div className="sb-table-toolbar-demo">
      <div className="sb-table-toolbar-demo__surface">
        <TableToolbar
          selectedCount={selectedRowKeys.length}
          quickFilters={quickFilters}
          quickFilterValues={values}
          operationActions={[
            { key: 'enable', label: '启用', icon: <IconCheckCircle />, requiresSelection: true },
            { key: 'disable', label: '停用', icon: <IconMinusCircle />, requiresSelection: true },
            { key: 'delete', label: '删除', icon: <IconDelete />, requiresSelection: true, status: 'danger' }
          ]}
          moreActions={[
            { key: 'move', label: '移动', icon: <IconSwap />, requiresSelection: true },
            { key: 'archive', label: '归档', icon: <IconArchive />, requiresSelection: true }
          ]}
          tableTools={{ export: true, columnSettings: true, refresh: true }}
          onQuickFilterChange={setValues}
          onOperation={(key) => Message.info(`触发操作：${key}`)}
          onExport={() => Message.info('触发导出')}
          onColumnSettings={() => Message.info('打开列设置')}
          onRefresh={() => Message.info('刷新列表')}
        />
        <div className="sb-table-toolbar-demo__table">
          <Table
            rowKey="id"
            columns={toolbarColumns}
            data={visibleRows}
            pagination={false}
            scroll={{ x: 560 }}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys as string[])
            }}
          />
        </div>
      </div>
    </div>
  )
}
