import { useState } from 'react';
import { ConfigProvider, Switch, Divider, Tabs, Space, Badge, Avatar, Tag, DatePicker, Pagination } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [rtl, setRtl] = useState(true);

  return (
    <div>
      <Switch checkedText='RTL' uncheckedText='LTR' checked={rtl} onChange={(checked) => setRtl(checked)} />
      <Divider />
      <ConfigProvider rtl={rtl} effectGlobalNotice={false}>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <Tabs.TabPane key='1' title='Tab 1' />
          <Tabs.TabPane key='2' title='Tab 2' />
          <Tabs.TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space size="large">
            <Badge count={9}>
              <Avatar shape='square' />
            </Badge>
            <Badge
              count={9}
              dot
              dotStyle={{ width: 10, height: 10 }}
            >
              <Avatar shape='square' />
            </Badge>
            <Tag color="red" closable>red</Tag>
            <Tag color="arcoblue" closable>arcoblue</Tag>
            <Tag color="green" closable>green</Tag>
          </Space>
          <Space>
            <DatePicker />
            <DatePicker.RangePicker style={{ width: 300 }} />
          </Space>
          <Pagination defaultCurrent={5} total={200} sizeCanChange />
        </Space>
      </ConfigProvider>
    </div>
  );
}
