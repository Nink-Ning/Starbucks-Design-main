import { Input, Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: 350 }} addAfter="RMB" placeholder="Enter amount" />
        <Input style={{ width: 350 }} addBefore="+86" placeholder="Enter phone number" />
      </Space>
      <Space wrap>
        <Input
          style={{ width: 350 }}
          addBefore="http://"
          addAfter={
            <Select defaultValue=".com" showSearch style={{ width: 80 }}>
              <Select.Option value=".com">.com</Select.Option>
              <Select.Option value=".cn">.cn</Select.Option>
              <Select.Option value=".net">.net</Select.Option>
              <Select.Option value=".org">.org</Select.Option>
            </Select>
          }
          allowClear
          placeholder="Enter host"
        />
        <Input style={{ width: 350 }} addBefore="www." addAfter=".com" placeholder="Enter host" />
      </Space>
    </Space>
  );
}
