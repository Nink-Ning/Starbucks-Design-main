import { Table } from '@sbux/starbucks-design-react';
import type { TableColumnProps } from '@sbux/starbucks-design-react';

export default function Demo() {

  const columns: TableColumnProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const data = [];

  return <Table columns={columns} data={data} noDataElement={<div>No data available</div>} />;
}
