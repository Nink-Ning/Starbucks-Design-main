import { Message, TableToolbar } from '@sbux/starbucks-design-react'
import type { TableToolbarAction, TableToolbarQuickFilter } from '@sbux/starbucks-design-react'
import { IconArchive, IconCheckCircle, IconDelete, IconEdit, IconSwap } from '@sbux/starbucks-design-react/icon'
import './table-toolbar.css'

const operationActions: TableToolbarAction[] = [
  { key: 'enable', label: '启用', icon: <IconCheckCircle />, requiresSelection: true },
  { key: 'edit', label: '编辑', icon: <IconEdit />, requiresSelection: true },
  { key: 'move', label: '移动', icon: <IconSwap />, requiresSelection: true },
  { key: 'delete', label: '删除', icon: <IconDelete />, requiresSelection: true, status: 'danger' }
]
const moreActions: TableToolbarAction[] = [
  { key: 'archive', label: '归档', icon: <IconArchive />, requiresSelection: true }
]
const quickFilters: TableToolbarQuickFilter[] = [{ type: 'search', name: 'keyword', placeholder: '请输入内容' }]

export default function ComplexActionsTableToolbarDemo() {
  return (
    <div className="sb-table-toolbar-demo">
      <div className="sb-table-toolbar-demo__scenario">
        <div className="sb-table-toolbar-demo__scenario-title">已选择数据后的复杂操作</div>
        <div className="sb-table-toolbar-demo__surface">
          <TableToolbar
            selectedCount={2}
            operationActions={operationActions}
            moreActions={moreActions}
            quickFilters={quickFilters}
            tableTools={{ export: true, columnSettings: true, refresh: true }}
            onOperation={(key) => Message.info(`触发操作：${key}`)}
          />
        </div>
      </div>
    </div>
  )
}
