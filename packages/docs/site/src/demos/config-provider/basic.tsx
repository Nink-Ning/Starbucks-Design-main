import { ConfigProvider, Space, Button, DatePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <ConfigProvider
      componentConfig={{
        Button: {
          type: 'primary',
          shape: 'round',
        },
      }}
    >
      <Space direction="vertical">
        <Space>
          <Button>Button 1</Button>
          <Button status="success">Button 2</Button>
          <Button type="secondary">Button 3</Button>
        </Space>
        <DatePicker showTime style={{ width: 250 }} />
      </Space>
    </ConfigProvider>
  );
}
