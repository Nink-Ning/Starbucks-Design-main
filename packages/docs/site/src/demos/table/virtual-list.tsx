import { useRef } from 'react';
import { Button, Table } from '@sbux/starbucks-design-react';
import type { TableInstance } from '@sbux/starbucks-design-react';

export default function Demo() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const table = useRef<TableInstance>(null);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => table.current.scrollIntoView('500')}
        style={{ marginBottom: 10 }}
      >
        滚动到第 500 条
      </Button>
      <Table
        ref={table}
        virtualized
        scroll={{
          y: 500,
          x: 1000,
        }}
        border
        columns={columns}
        data={data}
        pagination={false}
        rowSelection={{}}
      />
    </div>
  );
}
