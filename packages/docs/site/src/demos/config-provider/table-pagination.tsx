import { useState } from 'react';
import { ConfigProvider, Space, Typography, Switch, Table } from '@sbux/starbucks-design-react';

export default function Demo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
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
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
  ];
  const [hideOnSinglePage, setHideOnSinglePage] = useState(true);
  return (
    <ConfigProvider
      tablePagination={{
        hideOnSinglePage,
      }}
    >
      <Space style={{ marginBottom: 10 }}>
        <Typography.Text>tablePagination.hideOnSinglePage</Typography.Text>
        <Switch checked={hideOnSinglePage} onChange={(checked) => setHideOnSinglePage(checked)} />
      </Space>
      <Table columns={columns} data={data} />
    </ConfigProvider>
  );
}
