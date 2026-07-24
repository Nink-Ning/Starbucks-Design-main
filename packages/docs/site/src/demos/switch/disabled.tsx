import { Switch, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Switch disabled />
      <Switch checked disabled />
      <Switch type="round" disabled />
      <Switch type="round" checked disabled />
    </Space>
  );
}
