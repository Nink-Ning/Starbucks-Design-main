import { Switch, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large">
      <Switch />
      <Switch size="small" />
      <Switch type="round" />
      <Switch size="small" type="round" />
    </Space>
  );
}
