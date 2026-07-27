import { ConfigProvider, Space, Cascader, Select, TreeSelect, List, Table, Empty, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  function renderEmpty(componentName) {
    switch (componentName) {
      case 'Cascader':
        return <Typography.Text>Cascader no data!</Typography.Text>;

      case 'Select':
        return <Typography.Text>Select no data!</Typography.Text>;

      case 'TreeSelect':
        return <Typography.Text>TreeSelect no data!</Typography.Text>;

      case 'List':
        return <Empty description="List no data!" />;

      case 'Table':
        return <Empty description="Table no data!" />;

      default:
        return <Empty />;
    }
  }
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <Space>
        <Cascader style={{ width: 200 }} placeholder="Cascader" />
        <Select style={{ width: 200 }} placeholder="Select" />
        <TreeSelect style={{ width: 200 }} placeholder="TreeSelect" />
      </Space>
      <List header="Empty List" style={{ marginTop: 20 }}/>
      <Table
        data={[]}
        columns={[
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
        ]}
        style={{ marginTop: 20 }} />
    </ConfigProvider>
  );
}
