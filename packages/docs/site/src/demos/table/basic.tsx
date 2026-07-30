import { Link, Space, Table, Tag } from '@sbux/starbucks-design-react'
import type { TableColumnProps } from '@sbux/starbucks-design-react'

type TableRecord = {
  key: string
  task: string
  status: string
  createdAt: string
}

const columns: TableColumnProps<TableRecord>[] = [
  {
    title: '任务名称',
    dataIndex: 'task'
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    render: (_, record) => (
      <Tag color="green">
        {record.status}
      </Tag>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 200
  },
  {
    title: '操作',
    width: 140,
    render: () => (
      <Space size={24}>
        <Link>管理</Link>
        <Link status="error">删除</Link>
      </Space>
    )
  }
]

const data: TableRecord[] = [
  {
    key: '1',
    task: '门店库存盘点',
    status: '已完成',
    createdAt: '2026-07-24 10:30'
  },
  {
    key: '2',
    task: '夏季新品配置',
    status: '已完成',
    createdAt: '2026-07-23 15:20'
  },
  {
    key: '3',
    task: '伙伴培训计划',
    status: '已完成',
    createdAt: '2026-07-22 09:15'
  }
]

export default function Demo() {
  return (
    <div className="sb-table-demo-fill" style={{ width: '100%', minWidth: 0 }}>
      <Table
        style={{ width: '100%' }}
        columns={columns}
        data={data}
        pagination={false}
      />
    </div>
  )
}
