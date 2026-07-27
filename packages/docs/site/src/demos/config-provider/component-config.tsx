import { ConfigProvider, Space, Button, Radio, DatePicker, InputNumber, Tag, Table } from '@sbux/starbucks-design-react';

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
  const componentConfig = {
    Button: {
      type: 'primary',
      shape: 'round',
    },
    DatePicker: {
      dayStartOfWeek: 2,
      utcOffset: 0,
    },
    InputNumber: {
      mode: 'button',
    },
    'Radio.Group': {
      type: 'button',
    },
    Space: {
      size: 'large',
    },
    Table: {
      border: false,
      noDataElement: 'Oops, no data ~',
    },
    Tag: {
      color: 'arcoblue',
      size: 'large',
    },
  };
  return (
    <ConfigProvider componentConfig={componentConfig}>
      <Space direction="vertical">
        <Space>
          <Button>Button 1</Button>
          <Button status="success">Button 2</Button>
          <Button type="secondary">Button 2</Button>
        </Space>
        <Space>
          <Radio.Group options={['JavaScript', 'CSS', 'React', 'Vue']} defaultValue="JavaScript" />
          <Radio.Group options={['Light', 'Dark']} defaultValue="Light" />
        </Space>
        <Space>
          <DatePicker showTime />
          <DatePicker.RangePicker />
        </Space>
        <Space>
          <InputNumber defaultValue={2} />
          <InputNumber defaultValue={3} />
        </Space>
        <Space>
          <Tag>ArcoDesign</Tag>
          <Tag>Design System</Tag>
          <Tag>Component</Tag>
          <Tag>Design Lab</Tag>
        </Space>
        <Table columns={columns} data={[]} />
      </Space>
    </ConfigProvider>
  );
}
